# MakeMyTrip Travel Booking Platform

## Overview

This is a full-stack travel booking platform inspired by MakeMyTrip, built with modern web technologies. The application allows users to search and book flights, hotels, and other travel services. It features a React TypeScript frontend with shadcn/ui components and an Express.js backend using Drizzle ORM with PostgreSQL.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state, React Context for authentication
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful API with structured error handling

### Database Schema
- **Database**: PostgreSQL (via Neon serverless)
- **Tables**: Users, Airlines, Airports, Flights, Hotels, Bookings (Flight, Hotel, Cab), Bus/Train routes, Holiday packages
- **Schema Management**: Drizzle migrations with shared schema definitions

## Key Components

### Authentication System
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- User registration and login endpoints
- Context-based authentication state management

### Search and Booking System
- Multi-service search (flights, hotels, cabs, trains, buses)
- Advanced filtering and sorting capabilities
- Real-time availability checking
- Booking confirmation and management
- Trip history and status tracking

### Payment Integration
- Stripe integration for payment processing
- Multiple payment method support
- Secure payment handling

### User Interface
- Responsive design with mobile-first approach
- Accessible components using Radix UI primitives
- Toast notifications for user feedback
- Loading states and error handling
- Multi-step booking forms

## Data Flow

1. **User Authentication**: Users authenticate via JWT tokens stored in localStorage
2. **Search Flow**: Frontend sends search parameters to backend API, which queries the database and returns filtered results
3. **Booking Flow**: Selected items are sent to booking endpoints, which create database records and process payments
4. **State Management**: TanStack Query manages server state with automatic caching and refetching

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM)
- UI Components (Radix UI primitives, Lucide React icons)
- State Management (TanStack Query)
- Form Handling (React Hook Form with Zod validation)
- Payment (Stripe React components)
- Styling (Tailwind CSS, class-variance-authority)

### Backend Dependencies
- Server (Express.js, bcrypt, jsonwebtoken)
- Database (Drizzle ORM, Neon serverless PostgreSQL)
- Development (tsx for TypeScript execution, esbuild for production builds)

### Build Tools
- Vite for frontend bundling and development server
- TypeScript compiler for type checking
- PostCSS for CSS processing
- Replit-specific plugins for development environment

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: tsx for TypeScript execution with auto-reload
- Database: Neon serverless PostgreSQL with connection pooling

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single deployment artifact serving both frontend and API

### Environment Configuration
- Database URL from environment variables
- JWT secret configuration
- Stripe API keys for payment processing

## Changelog
- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.