import { pgTable, text, serial, integer, boolean, timestamp, decimal, json, varchar, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  dateOfBirth: timestamp("date_of_birth"),
  profileImage: text("profile_image"),
  isVerified: boolean("is_verified").default(false),
  mmtSelectMember: boolean("mmt_select_member").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Airlines table
export const airlines = pgTable("airlines", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: text("logo"),
  country: varchar("country", { length: 100 }),
  isActive: boolean("is_active").default(true),
});

// Airports table
export const airports = pgTable("airports", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  timezone: varchar("timezone", { length: 50 }),
  isActive: boolean("is_active").default(true),
});

// Flights table
export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: varchar("flight_number", { length: 20 }).notNull(),
  airlineId: integer("airline_id").notNull().references(() => airlines.id),
  departureAirportId: integer("departure_airport_id").notNull().references(() => airports.id),
  arrivalAirportId: integer("arrival_airport_id").notNull().references(() => airports.id),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  duration: integer("duration"), // in minutes
  aircraft: varchar("aircraft", { length: 100 }),
  economyPrice: decimal("economy_price", { precision: 10, scale: 2 }),
  businessPrice: decimal("business_price", { precision: 10, scale: 2 }),
  economySeats: integer("economy_seats").default(0),
  businessSeats: integer("business_seats").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hotels table
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  starRating: integer("star_rating"),
  amenities: json("amenities"), // array of amenities
  images: json("images"), // array of image URLs
  checkInTime: varchar("check_in_time", { length: 10 }),
  checkOutTime: varchar("check_out_time", { length: 10 }),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }),
  totalRooms: integer("total_rooms").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Flight bookings table
export const flightBookings = pgTable("flight_bookings", {
  id: serial("id").primaryKey(),
  bookingReference: varchar("booking_reference", { length: 20 }).notNull().unique(),
  userId: integer("user_id").notNull().references(() => users.id),
  flightId: integer("flight_id").notNull().references(() => flights.id),
  passengers: json("passengers"), // array of passenger details
  class: varchar("class", { length: 20 }).notNull(), // economy, business
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),
  bookingStatus: varchar("booking_status", { length: 20 }).default("confirmed"),
  bookingDate: timestamp("booking_date").defaultNow(),
  travelDate: timestamp("travel_date").notNull(),
});

// Hotel bookings table
export const hotelBookings = pgTable("hotel_bookings", {
  id: serial("id").primaryKey(),
  bookingReference: varchar("booking_reference", { length: 20 }).notNull().unique(),
  userId: integer("user_id").notNull().references(() => users.id),
  hotelId: integer("hotel_id").notNull().references(() => hotels.id),
  checkInDate: timestamp("check_in_date").notNull(),
  checkOutDate: timestamp("check_out_date").notNull(),
  nights: integer("nights").notNull(),
  rooms: integer("rooms").default(1),
  guests: integer("guests").default(1),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),
  bookingStatus: varchar("booking_status", { length: 20 }).default("confirmed"),
  specialRequests: text("special_requests"),
  bookingDate: timestamp("booking_date").defaultNow(),
});

// Bus operators table
export const busOperators = pgTable("bus_operators", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: text("logo"),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  isActive: boolean("is_active").default(true),
});

// Bus routes table
export const busRoutes = pgTable("bus_routes", {
  id: serial("id").primaryKey(),
  operatorId: integer("operator_id").notNull().references(() => busOperators.id),
  fromCity: varchar("from_city", { length: 100 }).notNull(),
  toCity: varchar("to_city", { length: 100 }).notNull(),
  departureTime: varchar("departure_time", { length: 10 }).notNull(),
  arrivalTime: varchar("arrival_time", { length: 10 }).notNull(),
  duration: varchar("duration", { length: 20 }),
  busType: varchar("bus_type", { length: 50 }),
  totalSeats: integer("total_seats").default(0),
  price: decimal("price", { precision: 10, scale: 2 }),
  amenities: json("amenities"),
  isActive: boolean("is_active").default(true),
});

// Train routes table (IRCTC integration simulation)
export const trainRoutes = pgTable("train_routes", {
  id: serial("id").primaryKey(),
  trainNumber: varchar("train_number", { length: 20 }).notNull(),
  trainName: varchar("train_name", { length: 255 }).notNull(),
  fromStation: varchar("from_station", { length: 100 }).notNull(),
  toStation: varchar("to_station", { length: 100 }).notNull(),
  departureTime: varchar("departure_time", { length: 10 }).notNull(),
  arrivalTime: varchar("arrival_time", { length: 10 }).notNull(),
  duration: varchar("duration", { length: 20 }),
  sleeperPrice: decimal("sleeper_price", { precision: 10, scale: 2 }),
  acPrice: decimal("ac_price", { precision: 10, scale: 2 }),
  classes: json("classes"), // available classes
  runsOn: json("runs_on"), // days of week
  isActive: boolean("is_active").default(true),
});

// Cab bookings table
export const cabBookings = pgTable("cab_bookings", {
  id: serial("id").primaryKey(),
  bookingReference: varchar("booking_reference", { length: 20 }).notNull().unique(),
  userId: integer("user_id").notNull().references(() => users.id),
  tripType: varchar("trip_type", { length: 20 }).notNull(), // outstation, local
  fromLocation: varchar("from_location", { length: 255 }).notNull(),
  toLocation: varchar("to_location", { length: 255 }),
  pickupDate: timestamp("pickup_date").notNull(),
  returnDate: timestamp("return_date"),
  cabType: varchar("cab_type", { length: 50 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),
  bookingStatus: varchar("booking_status", { length: 20 }).default("confirmed"),
  bookingDate: timestamp("booking_date").defaultNow(),
});

// Holiday packages table
export const holidayPackages = pgTable("holiday_packages", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  destination: varchar("destination", { length: 100 }).notNull(),
  duration: varchar("duration", { length: 50 }),
  packageType: varchar("package_type", { length: 50 }), // domestic, international
  inclusions: json("inclusions"),
  itinerary: json("itinerary"),
  images: json("images"),
  price: decimal("price", { precision: 10, scale: 2 }),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  discount: integer("discount").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  flightBookings: many(flightBookings),
  hotelBookings: many(hotelBookings),
  cabBookings: many(cabBookings),
}));

export const airlinesRelations = relations(airlines, ({ many }) => ({
  flights: many(flights),
}));

export const airportsRelations = relations(airports, ({ many }) => ({
  departureFlights: many(flights, { relationName: "departureAirport" }),
  arrivalFlights: many(flights, { relationName: "arrivalAirport" }),
}));

export const flightsRelations = relations(flights, ({ one, many }) => ({
  airline: one(airlines, {
    fields: [flights.airlineId],
    references: [airlines.id],
  }),
  departureAirport: one(airports, {
    fields: [flights.departureAirportId],
    references: [airports.id],
    relationName: "departureAirport",
  }),
  arrivalAirport: one(airports, {
    fields: [flights.arrivalAirportId],
    references: [airports.id],
    relationName: "arrivalAirport",
  }),
  bookings: many(flightBookings),
}));

export const hotelsRelations = relations(hotels, ({ many }) => ({
  bookings: many(hotelBookings),
}));

export const flightBookingsRelations = relations(flightBookings, ({ one }) => ({
  user: one(users, {
    fields: [flightBookings.userId],
    references: [users.id],
  }),
  flight: one(flights, {
    fields: [flightBookings.flightId],
    references: [flights.id],
  }),
}));

export const hotelBookingsRelations = relations(hotelBookings, ({ one }) => ({
  user: one(users, {
    fields: [hotelBookings.userId],
    references: [users.id],
  }),
  hotel: one(hotels, {
    fields: [hotelBookings.hotelId],
    references: [hotels.id],
  }),
}));

export const busOperatorsRelations = relations(busOperators, ({ many }) => ({
  routes: many(busRoutes),
}));

export const busRoutesRelations = relations(busRoutes, ({ one }) => ({
  operator: one(busOperators, {
    fields: [busRoutes.operatorId],
    references: [busOperators.id],
  }),
}));

export const cabBookingsRelations = relations(cabBookings, ({ one }) => ({
  user: one(users, {
    fields: [cabBookings.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFlightSchema = createInsertSchema(flights).omit({
  id: true,
  createdAt: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
  createdAt: true,
});

export const insertFlightBookingSchema = createInsertSchema(flightBookings).omit({
  id: true,
  bookingDate: true,
});

export const insertHotelBookingSchema = createInsertSchema(hotelBookings).omit({
  id: true,
  bookingDate: true,
});

export const insertCabBookingSchema = createInsertSchema(cabBookings).omit({
  id: true,
  bookingDate: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Flight = typeof flights.$inferSelect;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type FlightBooking = typeof flightBookings.$inferSelect;
export type InsertFlightBooking = z.infer<typeof insertFlightBookingSchema>;
export type HotelBooking = typeof hotelBookings.$inferSelect;
export type InsertHotelBooking = z.infer<typeof insertHotelBookingSchema>;
export type CabBooking = typeof cabBookings.$inferSelect;
export type InsertCabBooking = z.infer<typeof insertCabBookingSchema>;
export type Airline = typeof airlines.$inferSelect;
export type Airport = typeof airports.$inferSelect;
export type BusOperator = typeof busOperators.$inferSelect;
export type BusRoute = typeof busRoutes.$inferSelect;
export type TrainRoute = typeof trainRoutes.$inferSelect;
export type HolidayPackage = typeof holidayPackages.$inferSelect;
