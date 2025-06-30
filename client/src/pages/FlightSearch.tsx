import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";
import type { FlightSearchParams } from "@/types";

const popularRoutes = [
  { from: "Delhi", to: "Mumbai", price: "₹3,499" },
  { from: "Mumbai", to: "Bangalore", price: "₹4,299" },
  { from: "Delhi", to: "Bangalore", price: "₹4,899" },
  { from: "Mumbai", to: "Goa", price: "₹3,799" },
  { from: "Delhi", to: "Goa", price: "₹5,199" },
  { from: "Bangalore", to: "Chennai", price: "₹2,899" },
];

const offers = [
  {
    title: "First Booking Offer",
    description: "Get up to ₹2000 OFF on your first flight booking",
    code: "FIRSTFLIGHT",
    discount: "Up to ₹2000 OFF",
  },
  {
    title: "Weekend Special",
    description: "Extra savings on weekend flights",
    code: "WEEKEND",
    discount: "Up to 15% OFF",
  },
  {
    title: "Early Bird Discount",
    description: "Book 30 days in advance and save more",
    code: "EARLYBIRD",
    discount: "Up to 20% OFF",
  },
];

export default function FlightSearch() {
  const [, setLocation] = useLocation();

  const handleSearch = (params: FlightSearchParams) => {
    const queryParams = new URLSearchParams({
      from: params.from,
      to: params.to,
      departureDate: params.departureDate,
      passengers: params.passengers.toString(),
      class: params.class,
      tripType: params.tripType,
      ...(params.returnDate && { returnDate: params.returnDate }),
    });
    
    setLocation(`${ROUTES.FLIGHT_RESULTS}?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Flights</h1>
          <p className="text-xl text-gray-600">Find the best deals on domestic and international flights</p>
        </div>

        {/* Search Widget */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Search Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <FlightSearchForm onSearch={handleSearch} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Routes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-fire text-mmt-orange mr-2"></i>
                  Popular Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularRoutes.map((route, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-mmt-blue cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {route.from} → {route.to}
                          </h3>
                          <p className="text-sm text-gray-500">Starting from</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-mmt-blue">{route.price}</div>
                          <Badge variant="secondary" className="text-xs">per person</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Offers & Deals */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-tags text-mmt-red mr-2"></i>
                  Flight Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg">
                      <h4 className="font-semibold text-lg mb-1">{offer.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-mmt-orange text-white">{offer.discount}</Badge>
                        <span className="text-sm font-mono text-mmt-blue">{offer.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flight Features */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Why Book Flights with Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">500+ Airlines Worldwide</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Instant Confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Secure Payment Gateway</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
