export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  mmtSelectMember?: boolean;
}

export interface Flight {
  id: number;
  flightNumber: string;
  airlineId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureTime: string;
  arrivalTime: string;
  duration?: number;
  aircraft?: string;
  economyPrice?: string;
  businessPrice?: string;
  economySeats: number;
  businessSeats: number;
}

export interface Hotel {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  starRating?: number;
  amenities?: string[];
  images?: string[];
  pricePerNight?: string;
  totalRooms: number;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: 'economy' | 'business';
  tripType: 'one-way' | 'round-trip' | 'multi-city';
}

export interface HotelSearchParams {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

export interface BookingData {
  id: number;
  bookingReference: string;
  totalAmount: string;
  paymentStatus: string;
  bookingStatus: string;
  bookingDate: string;
}

export interface Airline {
  id: number;
  code: string;
  name: string;
  logo?: string;
  country?: string;
}

export interface Airport {
  id: number;
  code: string;
  name: string;
  city: string;
  country: string;
}
