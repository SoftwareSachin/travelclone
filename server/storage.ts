import {
  users,
  flights,
  hotels,
  airlines,
  airports,
  flightBookings,
  hotelBookings,
  cabBookings,
  busRoutes,
  busOperators,
  trainRoutes,
  holidayPackages,
  type User,
  type InsertUser,
  type Flight,
  type InsertFlight,
  type Hotel,
  type InsertHotel,
  type FlightBooking,
  type InsertFlightBooking,
  type HotelBooking,
  type InsertHotelBooking,
  type CabBooking,
  type InsertCabBooking,
  type Airline,
  type Airport,
  type BusRoute,
  type TrainRoute,
  type HolidayPackage,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, like, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;

  // Flight operations
  searchFlights(params: {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    class: string;
  }): Promise<Flight[]>;
  getFlight(id: number): Promise<Flight | undefined>;
  getAllAirlines(): Promise<Airline[]>;
  getAllAirports(): Promise<Airport[]>;

  // Hotel operations
  searchHotels(params: {
    city: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  }): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;

  // Booking operations
  createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking>;
  createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking>;
  createCabBooking(booking: InsertCabBooking): Promise<CabBooking>;
  getUserBookings(userId: number): Promise<{
    flights: FlightBooking[];
    hotels: HotelBooking[];
    cabs: CabBooking[];
  }>;

  // Other services
  getBusRoutes(from: string, to: string): Promise<BusRoute[]>;
  getTrainRoutes(from: string, to: string): Promise<TrainRoute[]>;
  getHolidayPackages(): Promise<HolidayPackage[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async searchFlights(params: {
    from: string;
    to: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    class: string;
  }): Promise<Flight[]> {
    const departureStart = new Date(params.departureDate);
    const departureEnd = new Date(params.departureDate);
    departureEnd.setDate(departureEnd.getDate() + 1);

    const flightsData = await db
      .select({
        flight: flights,
        airline: airlines,
        departureAirport: airports,
        arrivalAirport: airports,
      })
      .from(flights)
      .leftJoin(airlines, eq(flights.airlineId, airlines.id))
      .leftJoin(airports, eq(flights.departureAirportId, airports.id))
      .leftJoin(airports, eq(flights.arrivalAirportId, airports.id))
      .where(
        and(
          like(airports.city, `%${params.from}%`),
          like(airports.city, `%${params.to}%`),
          gte(flights.departureTime, departureStart),
          lte(flights.departureTime, departureEnd),
          eq(flights.isActive, true)
        )
      )
      .orderBy(asc(flights.departureTime));

    return flightsData.map(row => row.flight);
  }

  async getFlight(id: number): Promise<Flight | undefined> {
    const [flight] = await db.select().from(flights).where(eq(flights.id, id));
    return flight || undefined;
  }

  async getAllAirlines(): Promise<Airline[]> {
    return await db.select().from(airlines).where(eq(airlines.isActive, true));
  }

  async getAllAirports(): Promise<Airport[]> {
    return await db.select().from(airports).where(eq(airports.isActive, true));
  }

  async searchHotels(params: {
    city: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  }): Promise<Hotel[]> {
    return await db
      .select()
      .from(hotels)
      .where(
        and(
          like(hotels.city, `%${params.city}%`),
          eq(hotels.isActive, true)
        )
      )
      .orderBy(desc(hotels.starRating));
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel || undefined;
  }

  async createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking> {
    const [newBooking] = await db
      .insert(flightBookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    const [newBooking] = await db
      .insert(hotelBookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async createCabBooking(booking: InsertCabBooking): Promise<CabBooking> {
    const [newBooking] = await db
      .insert(cabBookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async getUserBookings(userId: number): Promise<{
    flights: FlightBooking[];
    hotels: HotelBooking[];
    cabs: CabBooking[];
  }> {
    const [flightBookingsData, hotelBookingsData, cabBookingsData] = await Promise.all([
      db.select().from(flightBookings).where(eq(flightBookings.userId, userId)).orderBy(desc(flightBookings.bookingDate)),
      db.select().from(hotelBookings).where(eq(hotelBookings.userId, userId)).orderBy(desc(hotelBookings.bookingDate)),
      db.select().from(cabBookings).where(eq(cabBookings.userId, userId)).orderBy(desc(cabBookings.bookingDate)),
    ]);

    return {
      flights: flightBookingsData,
      hotels: hotelBookingsData,
      cabs: cabBookingsData,
    };
  }

  async getBusRoutes(from: string, to: string): Promise<BusRoute[]> {
    return await db
      .select()
      .from(busRoutes)
      .where(
        and(
          like(busRoutes.fromCity, `%${from}%`),
          like(busRoutes.toCity, `%${to}%`),
          eq(busRoutes.isActive, true)
        )
      )
      .orderBy(asc(busRoutes.departureTime));
  }

  async getTrainRoutes(from: string, to: string): Promise<TrainRoute[]> {
    return await db
      .select()
      .from(trainRoutes)
      .where(
        and(
          like(trainRoutes.fromStation, `%${from}%`),
          like(trainRoutes.toStation, `%${to}%`),
          eq(trainRoutes.isActive, true)
        )
      )
      .orderBy(asc(trainRoutes.departureTime));
  }

  async getHolidayPackages(): Promise<HolidayPackage[]> {
    return await db
      .select()
      .from(holidayPackages)
      .where(eq(holidayPackages.isActive, true))
      .orderBy(desc(holidayPackages.createdAt));
  }
}

export const storage = new DatabaseStorage();
