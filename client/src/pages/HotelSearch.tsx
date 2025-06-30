import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HotelSearchForm } from "@/components/HotelSearchForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/lib/constants";
import type { HotelSearchParams } from "@/types";

const popularDestinations = [
  { city: "Mumbai", hotels: "2000+", startingPrice: "₹1,200" },
  { city: "Delhi", hotels: "1800+", startingPrice: "₹1,500" },
  { city: "Bangalore", hotels: "1500+", startingPrice: "₹1,100" },
  { city: "Goa", hotels: "800+", startingPrice: "₹2,000" },
  { city: "Dubai", hotels: "500+", startingPrice: "₹3,500" },
  { city: "Bangkok", hotels: "600+", startingPrice: "₹2,800" },
];

const hotelTypes = [
  {
    type: "Luxury Hotels",
    description: "5-star properties with premium amenities",
    icon: "crown",
    color: "text-yellow-600",
  },
  {
    type: "Business Hotels",
    description: "Perfect for corporate travelers",
    icon: "briefcase",
    color: "text-blue-600",
  },
  {
    type: "Budget Hotels",
    description: "Comfortable stays at affordable prices",
    icon: "wallet",
    color: "text-green-600",
  },
  {
    type: "Resort Hotels",
    description: "Complete vacation experience",
    icon: "umbrella-beach",
    color: "text-orange-600",
  },
];

const offers = [
  {
    title: "Weekend Getaway",
    description: "Special rates for weekend bookings",
    code: "WEEKEND25",
    discount: "Up to 25% OFF",
  },
  {
    title: "Extended Stay",
    description: "Book for 3+ nights and save more",
    code: "STAY3",
    discount: "Up to 30% OFF",
  },
  {
    title: "Early Check-in",
    description: "Free early check-in on select hotels",
    code: "EARLY",
    discount: "Free Upgrade",
  },
];

export default function HotelSearch() {
  const [, setLocation] = useLocation();

  const handleSearch = (params: HotelSearchParams) => {
    const queryParams = new URLSearchParams({
      city: params.city,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      rooms: params.rooms.toString(),
      guests: params.guests.toString(),
    });
    
    setLocation(`${ROUTES.HOTEL_RESULTS}?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Hotels</h1>
          <p className="text-xl text-gray-600">60,000+ properties worldwide • Best prices guaranteed</p>
        </div>

        {/* Search Widget */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Search Hotels</CardTitle>
          </CardHeader>
          <CardContent>
            <HotelSearchForm onSearch={handleSearch} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Destinations */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-map-marker-alt text-mmt-red mr-2"></i>
                  Popular Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularDestinations.map((destination, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-mmt-blue cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{destination.city}</h3>
                          <p className="text-sm text-gray-500">{destination.hotels} hotels</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-mmt-red">{destination.startingPrice}</div>
                          <Badge variant="secondary" className="text-xs">per night</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hotel Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-bed text-mmt-blue mr-2"></i>
                  Hotel Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotelTypes.map((type, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-shadow"
                    >
                      <div className="flex items-center mb-2">
                        <i className={`fas fa-${type.icon} ${type.color} mr-3 text-xl`}></i>
                        <h3 className="font-semibold text-lg">{type.type}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Offers & Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-percent text-mmt-orange mr-2"></i>
                  Hotel Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                      <h4 className="font-semibold text-lg mb-1">{offer.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-mmt-red text-white">{offer.discount}</Badge>
                        <span className="text-sm font-mono text-mmt-blue">{offer.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hotel Features */}
            <Card>
              <CardHeader>
                <CardTitle>Why Book Hotels with Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">60,000+ Hotels Worldwide</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Lowest Price Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Free Cancellation</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Instant Confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-3"></i>
                    <span className="text-sm">Pay at Hotel Option</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MMT Exclusive */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-star text-purple-600 mr-2"></i>
                  MMT Exclusive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  Get access to exclusive hotel deals and member-only rates with MMT Select.
                </p>
                <Badge className="bg-purple-600 text-white">Members Save More</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
