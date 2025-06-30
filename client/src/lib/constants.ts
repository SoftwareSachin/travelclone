export const ROUTES = {
  HOME: '/',
  FLIGHTS: '/flights',
  HOTELS: '/hotels',
  BUSES: '/buses',
  TRAINS: '/trains',
  CABS: '/cabs',
  PACKAGES: '/packages',
  MY_TRIPS: '/my-trips',
  LOGIN: '/login',
  REGISTER: '/register',
  FLIGHT_SEARCH: '/flights/search',
  HOTEL_SEARCH: '/hotels/search',
  FLIGHT_RESULTS: '/flights/results',
  HOTEL_RESULTS: '/hotels/results',
  BOOKING_CONFIRMATION: '/booking/confirmation',
} as const;

export const TRIP_TYPES = {
  ONE_WAY: 'one-way',
  ROUND_TRIP: 'round-trip',
  MULTI_CITY: 'multi-city',
} as const;

export const FLIGHT_CLASSES = {
  ECONOMY: 'economy',
  BUSINESS: 'business',
} as const;

export const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const POPULAR_DESTINATIONS = [
  {
    id: 1,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    startingPrice: '$299',
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    startingPrice: '$599',
  },
  {
    id: 3,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    startingPrice: '$899',
  },
  {
    id: 4,
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    startingPrice: '$699',
  },
];

export const TRUST_INDICATORS = [
  {
    icon: 'route',
    title: 'MMT Connect',
    description: 'Best Flight Connections & Cheapest Fares',
    color: 'bg-mmt-blue',
  },
  {
    icon: 'headset',
    title: '24*7 Customer Support',
    description: 'Call Support in less than 2 minutes',
    color: 'bg-mmt-red',
  },
  {
    icon: 'shield-alt',
    title: 'Secured Payments',
    description: 'Visa, Mastercard and more',
    color: 'bg-green-600',
  },
  {
    icon: 'crown',
    title: 'MMT Select',
    description: 'The Most-Rewarding Loyalty Program Globally',
    color: 'bg-mmt-orange',
  },
  {
    icon: 'tag',
    title: 'MMT Exclusive Hotels',
    description: 'Avail Lowest Price Guarantee on select hotels',
    color: 'bg-purple-600',
  },
];
