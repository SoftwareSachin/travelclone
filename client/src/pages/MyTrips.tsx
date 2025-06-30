import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { generalApi } from "@/lib/api";
import { ROUTES } from "@/lib/constants";
import { Link, useLocation } from "wouter";

export default function MyTrips() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to view your trips.",
        variant: "destructive",
      });
      setLocation(ROUTES.LOGIN);
    }
  }, [isAuthenticated, setLocation, toast]);

  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['/api/bookings/my-trips'],
    queryFn: generalApi.getMyTrips,
    enabled: isAuthenticated,
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-mmt-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your trips...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Trips</h2>
              <p className="text-gray-600">Unable to load your bookings. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const hasBookings = bookings && (
    bookings.flights.length > 0 || 
    bookings.hotels.length > 0 || 
    bookings.cabs.length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-gray-600">
            Welcome back, {user?.firstName || user?.email}! Manage all your bookings here.
          </p>
        </div>

        {!hasBookings ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-suitcase-rolling text-gray-400 text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No trips yet!</h2>
              <p className="text-gray-600 mb-6">
                Start planning your next adventure. Book flights, hotels, and more.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href={ROUTES.FLIGHTS}>
                  <Button className="bg-mmt-blue hover:bg-blue-700 text-white">
                    <i className="fas fa-plane mr-2"></i>
                    Book Flights
                  </Button>
                </Link>
                <Link href={ROUTES.HOTELS}>
                  <Button className="bg-mmt-red hover:bg-red-700 text-white">
                    <i className="fas fa-bed mr-2"></i>
                    Book Hotels
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="flights">Flights ({bookings.flights.length})</TabsTrigger>
              <TabsTrigger value="hotels">Hotels ({bookings.hotels.length})</TabsTrigger>
              <TabsTrigger value="cabs">Cabs ({bookings.cabs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {/* All Bookings */}
              {[...bookings.flights, ...bookings.hotels, ...bookings.cabs]
                .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
                .map((booking) => (
                  <Card key={`${booking.id}-all`} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-mmt-blue rounded-lg flex items-center justify-center">
                            <i className={`fas fa-${'flightId' in booking ? 'plane' : 'hotelId' in booking ? 'bed' : 'car'} text-white`}></i>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{booking.bookingReference}</h3>
                            <p className="text-gray-600">
                              {'flightId' in booking ? 'Flight Booking' : 'hotelId' in booking ? 'Hotel Booking' : 'Cab Booking'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Booked on {formatDate(booking.bookingDate)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-mmt-blue mb-2">
                            ₹{booking.totalAmount}
                          </div>
                          <Badge className={getStatusColor(booking.bookingStatus)}>
                            {booking.bookingStatus.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="flights" className="space-y-4">
              {/* Flight Bookings */}
              {bookings.flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-mmt-blue rounded-lg flex items-center justify-center">
                          <i className="fas fa-plane text-white"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{flight.bookingReference}</h3>
                          <p className="text-gray-600">Flight Booking</p>
                          <p className="text-sm text-gray-500">
                            Travel Date: {formatDate(flight.travelDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Passengers: {Array.isArray(flight.passengers) ? flight.passengers.length : 1}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-mmt-blue mb-2">
                          ₹{flight.totalAmount}
                        </div>
                        <Badge className={getStatusColor(flight.bookingStatus)}>
                          {flight.bookingStatus.toUpperCase()}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="hotels" className="space-y-4">
              {/* Hotel Bookings */}
              {bookings.hotels.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-mmt-red rounded-lg flex items-center justify-center">
                          <i className="fas fa-bed text-white"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{hotel.bookingReference}</h3>
                          <p className="text-gray-600">Hotel Booking</p>
                          <p className="text-sm text-gray-500">
                            Check-in: {formatDate(hotel.checkInDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Check-out: {formatDate(hotel.checkOutDate)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {hotel.rooms} room(s), {hotel.guests} guest(s)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-mmt-red mb-2">
                          ₹{hotel.totalAmount}
                        </div>
                        <Badge className={getStatusColor(hotel.bookingStatus)}>
                          {hotel.bookingStatus.toUpperCase()}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="cabs" className="space-y-4">
              {/* Cab Bookings */}
              {bookings.cabs.map((cab) => (
                <Card key={cab.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-mmt-orange rounded-lg flex items-center justify-center">
                          <i className="fas fa-car text-white"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{cab.bookingReference}</h3>
                          <p className="text-gray-600">Cab Booking</p>
                          <p className="text-sm text-gray-500">
                            From: {cab.fromLocation}
                          </p>
                          <p className="text-sm text-gray-500">
                            To: {cab.toLocation || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Date: {formatDate(cab.pickupDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-mmt-orange mb-2">
                          ₹{cab.totalAmount}
                        </div>
                        <Badge className={getStatusColor(cab.bookingStatus)}>
                          {cab.bookingStatus.toUpperCase()}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}

        {/* Quick Actions */}
        {hasBookings && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={ROUTES.FLIGHTS}>
                  <Button className="w-full bg-mmt-blue hover:bg-blue-700 text-white">
                    <i className="fas fa-plane mr-2"></i>
                    Book New Flight
                  </Button>
                </Link>
                <Link href={ROUTES.HOTELS}>
                  <Button className="w-full bg-mmt-red hover:bg-red-700 text-white">
                    <i className="fas fa-bed mr-2"></i>
                    Book New Hotel
                  </Button>
                </Link>
                <Button className="w-full bg-mmt-orange hover:bg-orange-600 text-white">
                  <i className="fas fa-download mr-2"></i>
                  Download All Tickets
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
