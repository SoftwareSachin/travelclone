import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/constants";

interface BookingDetails {
  type: 'flight' | 'hotel' | 'cab';
  bookingReference: string;
  totalAmount: string;
  bookingDate: string;
  status: string;
  details: any;
}

export default function BookingConfirmation() {
  const [location] = useLocation();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const bookingRef = urlParams.get('ref');
    const type = urlParams.get('type') as 'flight' | 'hotel' | 'cab';
    
    // In a real app, fetch booking details from API using bookingRef
    if (bookingRef && type) {
      // Mock booking details for demo
      setBookingDetails({
        type,
        bookingReference: bookingRef,
        totalAmount: '15,299',
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        details: {
          // Mock details based on type
          ...(type === 'flight' && {
            from: 'Delhi',
            to: 'Mumbai',
            date: '2024-01-15',
            passengers: 1,
            airline: 'IndiGo',
            flightNumber: '6E-123',
          }),
          ...(type === 'hotel' && {
            hotelName: 'The Taj Mahal Hotel',
            checkIn: '2024-01-15',
            checkOut: '2024-01-17',
            rooms: 1,
            guests: 2,
            city: 'Mumbai',
          }),
          ...(type === 'cab' && {
            from: 'Airport',
            to: 'Hotel',
            date: '2024-01-15',
            cabType: 'Sedan',
            tripType: 'One Way',
          }),
        },
      });
    }
  }, [location]);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h2>
              <p className="text-gray-600 mb-6">The booking confirmation could not be found.</p>
              <Link href={ROUTES.HOME}>
                <Button className="bg-mmt-blue hover:bg-blue-700 text-white">
                  Go to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const getBookingIcon = () => {
    switch (bookingDetails.type) {
      case 'flight':
        return 'fas fa-plane';
      case 'hotel':
        return 'fas fa-bed';
      case 'cab':
        return 'fas fa-car';
      default:
        return 'fas fa-check';
    }
  };

  const getBookingTitle = () => {
    switch (bookingDetails.type) {
      case 'flight':
        return 'Flight Booking Confirmed';
      case 'hotel':
        return 'Hotel Booking Confirmed';
      case 'cab':
        return 'Cab Booking Confirmed';
      default:
        return 'Booking Confirmed';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-green-500 text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getBookingTitle()}</h1>
          <p className="text-gray-600">Your booking has been successfully confirmed!</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className={`${getBookingIcon()} text-mmt-blue mr-3`}></i>
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Reference:</span>
                    <span className="font-bold">{bookingDetails.bookingReference}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date:</span>
                    <span className="font-medium">
                      {new Date(bookingDetails.bookingDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className="bg-green-100 text-green-800">
                      {bookingDetails.status.toUpperCase()}
                    </Badge>
                  </div>

                  <Separator />

                  {/* Type-specific details */}
                  {bookingDetails.type === 'flight' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Flight Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600 text-sm">From</span>
                          <div className="font-medium">{bookingDetails.details.from}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">To</span>
                          <div className="font-medium">{bookingDetails.details.to}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Flight</span>
                          <div className="font-medium">{bookingDetails.details.airline} {bookingDetails.details.flightNumber}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Date</span>
                          <div className="font-medium">{bookingDetails.details.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingDetails.type === 'hotel' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Hotel Details</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 text-sm">Hotel</span>
                          <div className="font-medium">{bookingDetails.details.hotelName}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600 text-sm">Check-in</span>
                            <div className="font-medium">{bookingDetails.details.checkIn}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">Check-out</span>
                            <div className="font-medium">{bookingDetails.details.checkOut}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">Rooms</span>
                            <div className="font-medium">{bookingDetails.details.rooms}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">Guests</span>
                            <div className="font-medium">{bookingDetails.details.guests}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingDetails.type === 'cab' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Cab Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600 text-sm">From</span>
                          <div className="font-medium">{bookingDetails.details.from}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">To</span>
                          <div className="font-medium">{bookingDetails.details.to}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Date</span>
                          <div className="font-medium">{bookingDetails.details.date}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Cab Type</span>
                          <div className="font-medium">{bookingDetails.details.cabType}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-2xl font-bold text-mmt-blue">₹{bookingDetails.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Payment Status:</span>
                    <Badge className="bg-green-100 text-green-800">PAID</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-mmt-blue hover:bg-blue-700 text-white">
                  <i className="fas fa-download mr-2"></i>
                  Download E-Ticket
                </Button>
                <Button variant="outline" className="w-full">
                  <i className="fas fa-share mr-2"></i>
                  Share Booking
                </Button>
                <Link href={ROUTES.MY_TRIPS} className="block">
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-list mr-2"></i>
                    View All Bookings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-info-circle text-mmt-blue mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Important Information</h4>
                    <p className="text-xs text-gray-600">
                      Please keep your booking reference handy. You'll need it for check-in and any modifications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Section */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is available 24/7 to assist you with your booking.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-mmt-orange hover:bg-orange-600 text-white">
                <i className="fas fa-phone mr-2"></i>
                Call Support
              </Button>
              <Button variant="outline">
                <i className="fas fa-comments mr-2"></i>
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
