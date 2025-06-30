import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUserSchema, insertFlightBookingSchema, insertHotelBookingSchema, insertCabBookingSchema } from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "makemytrip-secret-key";

// Middleware to verify JWT token
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          mmtSelectMember: user.mmtSelectMember,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        mmtSelectMember: user.mmtSelectMember,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  // Flight search and booking routes
  app.get("/api/flights/search", async (req, res) => {
    try {
      const { from, to, departureDate, returnDate, passengers = 1, class: flightClass = 'economy' } = req.query;

      if (!from || !to || !departureDate) {
        return res.status(400).json({ message: "From, to, and departure date are required" });
      }

      const flights = await storage.searchFlights({
        from: from as string,
        to: to as string,
        departureDate: departureDate as string,
        returnDate: returnDate as string,
        passengers: parseInt(passengers as string),
        class: flightClass as string,
      });

      res.json(flights);
    } catch (error: any) {
      res.status(500).json({ message: "Flight search failed" });
    }
  });

  app.get("/api/flights/:id", async (req, res) => {
    try {
      const flight = await storage.getFlight(parseInt(req.params.id));
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }
      res.json(flight);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch flight details" });
    }
  });

  app.get("/api/airlines", async (req, res) => {
    try {
      const airlines = await storage.getAllAirlines();
      res.json(airlines);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch airlines" });
    }
  });

  app.get("/api/airports", async (req, res) => {
    try {
      const airports = await storage.getAllAirports();
      res.json(airports);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch airports" });
    }
  });

  // Hotel search and booking routes
  app.get("/api/hotels/search", async (req, res) => {
    try {
      const { city, checkIn, checkOut, rooms = 1, guests = 1 } = req.query;

      if (!city || !checkIn || !checkOut) {
        return res.status(400).json({ message: "City, check-in, and check-out dates are required" });
      }

      const hotels = await storage.searchHotels({
        city: city as string,
        checkIn: checkIn as string,
        checkOut: checkOut as string,
        rooms: parseInt(rooms as string),
        guests: parseInt(guests as string),
      });

      res.json(hotels);
    } catch (error: any) {
      res.status(500).json({ message: "Hotel search failed" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotel = await storage.getHotel(parseInt(req.params.id));
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch hotel details" });
    }
  });

  // Booking routes
  app.post("/api/bookings/flight", authenticateToken, async (req: any, res) => {
    try {
      const bookingData = insertFlightBookingSchema.parse({
        ...req.body,
        userId: req.user.userId,
        bookingReference: `MMT${Date.now()}`,
      });

      const booking = await storage.createFlightBooking(bookingData);
      res.status(201).json({
        message: "Flight booking created successfully",
        booking,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/bookings/hotel", authenticateToken, async (req: any, res) => {
    try {
      const bookingData = insertHotelBookingSchema.parse({
        ...req.body,
        userId: req.user.userId,
        bookingReference: `MMT${Date.now()}`,
      });

      const booking = await storage.createHotelBooking(bookingData);
      res.status(201).json({
        message: "Hotel booking created successfully",
        booking,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/bookings/cab", authenticateToken, async (req: any, res) => {
    try {
      const bookingData = insertCabBookingSchema.parse({
        ...req.body,
        userId: req.user.userId,
        bookingReference: `MMT${Date.now()}`,
      });

      const booking = await storage.createCabBooking(bookingData);
      res.status(201).json({
        message: "Cab booking created successfully",
        booking,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/bookings/my-trips", authenticateToken, async (req: any, res) => {
    try {
      const bookings = await storage.getUserBookings(req.user.userId);
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Other services
  app.get("/api/buses/search", async (req, res) => {
    try {
      const { from, to } = req.query;
      
      if (!from || !to) {
        return res.status(400).json({ message: "From and to cities are required" });
      }

      const routes = await storage.getBusRoutes(from as string, to as string);
      res.json(routes);
    } catch (error: any) {
      res.status(500).json({ message: "Bus search failed" });
    }
  });

  app.get("/api/trains/search", async (req, res) => {
    try {
      const { from, to } = req.query;
      
      if (!from || !to) {
        return res.status(400).json({ message: "From and to stations are required" });
      }

      const routes = await storage.getTrainRoutes(from as string, to as string);
      res.json(routes);
    } catch (error: any) {
      res.status(500).json({ message: "Train search failed" });
    }
  });

  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getHolidayPackages();
      res.json(packages);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch holiday packages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
