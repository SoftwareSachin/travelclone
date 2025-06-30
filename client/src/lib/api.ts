import { apiRequest } from "./queryClient";
import type { 
  FlightSearchParams, 
  HotelSearchParams, 
  Flight, 
  Hotel, 
  User, 
  Airline, 
  Airport 
} from "../types";

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiRequest("POST", "/api/auth/login", { email, password });
    return response.json();
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    const response = await apiRequest("POST", "/api/auth/register", userData);
    return response.json();
  },

  getMe: async (): Promise<User> => {
    const response = await apiRequest("GET", "/api/auth/me");
    return response.json();
  },
};

// Flight API
export const flightApi = {
  search: async (params: FlightSearchParams): Promise<Flight[]> => {
    const queryParams = new URLSearchParams({
      from: params.from,
      to: params.to,
      departureDate: params.departureDate,
      passengers: params.passengers.toString(),
      class: params.class,
      ...(params.returnDate && { returnDate: params.returnDate }),
    });

    const response = await apiRequest("GET", `/api/flights/search?${queryParams}`);
    return response.json();
  },

  getById: async (id: number): Promise<Flight> => {
    const response = await apiRequest("GET", `/api/flights/${id}`);
    return response.json();
  },

  book: async (bookingData: {
    flightId: number;
    passengers: any[];
    class: string;
    totalAmount: number;
    travelDate: string;
  }) => {
    const response = await apiRequest("POST", "/api/bookings/flight", bookingData);
    return response.json();
  },
};

// Hotel API
export const hotelApi = {
  search: async (params: HotelSearchParams): Promise<Hotel[]> => {
    const queryParams = new URLSearchParams({
      city: params.city,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      rooms: params.rooms.toString(),
      guests: params.guests.toString(),
    });

    const response = await apiRequest("GET", `/api/hotels/search?${queryParams}`);
    return response.json();
  },

  getById: async (id: number): Promise<Hotel> => {
    const response = await apiRequest("GET", `/api/hotels/${id}`);
    return response.json();
  },

  book: async (bookingData: {
    hotelId: number;
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    rooms: number;
    guests: number;
    totalAmount: number;
    specialRequests?: string;
  }) => {
    const response = await apiRequest("POST", "/api/bookings/hotel", bookingData);
    return response.json();
  },
};

// General API
export const generalApi = {
  getAirlines: async (): Promise<Airline[]> => {
    const response = await apiRequest("GET", "/api/airlines");
    return response.json();
  },

  getAirports: async (): Promise<Airport[]> => {
    const response = await apiRequest("GET", "/api/airports");
    return response.json();
  },

  getMyTrips: async () => {
    const response = await apiRequest("GET", "/api/bookings/my-trips");
    return response.json();
  },

  searchBuses: async (from: string, to: string) => {
    const queryParams = new URLSearchParams({ from, to });
    const response = await apiRequest("GET", `/api/buses/search?${queryParams}`);
    return response.json();
  },

  searchTrains: async (from: string, to: string) => {
    const queryParams = new URLSearchParams({ from, to });
    const response = await apiRequest("GET", `/api/trains/search?${queryParams}`);
    return response.json();
  },

  getHolidayPackages: async () => {
    const response = await apiRequest("GET", "/api/packages");
    return response.json();
  },
};
