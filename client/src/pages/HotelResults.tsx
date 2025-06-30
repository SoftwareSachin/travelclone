import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hotelApi } from "@/lib/api";
import type { Hotel, HotelSearchParams } from "@/types";

export default function HotelResults() {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<HotelSearchParams | null>(null);
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    
    const params: HotelSearchParams = {
      city: urlParams.get('city') || '',
      checkIn: urlParams.get('checkIn') || '',
      checkOut: urlParams.get('checkOut') || '',
      rooms: parseInt(urlParams.get('rooms') || '1'),
      guests: parseInt(urlParams.get('guests') || '2'),
    };

    if (params.city && params.checkIn && params.checkOut) {
      setSearchParams(params);
    }
  }, [location]);

  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ['/api/hotels/search', searchParams],
    queryFn: () => searchParams ? hotelApi.search(searchParams) : Promise.resolve([]),
    enabled: !!searchParams,
  });

  const handleBookHotel = (hotel: Hotel) => {
    // Navigate to booking page or show booking modal
    console.log('Booking hotel:', hotel);
  };

  const calculateNights = () => {
    if (!searchParams) return 0;
    const checkIn = new Date(searchParams.checkIn);
    const checkOut = new Date(searchParams.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
  };

  const sortedHotels = hotels?.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return parseFloat(a.pricePerNight || '0') - parseFloat(b.pricePerNight || '0');
      case 'rating':
        return (b.starRating || 0) - (a.starRating || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (!searchParams) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Search</h2>
              <p className="text-gray-600">Please go back and search for hotels again.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{searchParams.city} Hotels</h1>
                <p className="text-gray-600">
                  {searchParams.checkIn} - {searchParams.checkOut} • {nights} night{nights !== 1 ? 's' : ''} • {searchParams.rooms} room{searchParams.rooms !== 1 ? 's' : ''} • {searchParams.guests} guest{searchParams.guests !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="rating">Star Rating</SelectItem>
                    <SelectItem value="name">Hotel Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Results */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-mmt-red border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for hotels...</p>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-bold text-red-600 mb-4">Search Failed</h2>
              <p className="text-gray-600">Unable to search hotels. Please try again later.</p>
            </CardContent>
          </Card>
        ) : !sortedHotels || sortedHotels.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">No Hotels Found</h2>
              <p className="text-gray-600">No hotels available for your search criteria.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedHotels.map((hotel) => (
              <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    {/* Hotel Image */}
                    <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {hotel.images && hotel.images.length > 0 ? (
                        <img
                          src={hotel.images[0] as string}
                          alt={hotel.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <i className="fas fa-hotel text-gray-400 text-3xl"></i>
                      )}
                    </div>

                    {/* Hotel Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                            {hotel.starRating && (
                              <div className="flex">
                                {[...Array(hotel.starRating)].map((_, i) => (
                                  <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-2">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span className="text-sm">{hotel.address}</span>
                          </div>

                          {hotel.amenities && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {(hotel.amenities as string[]).slice(0, 4).map((amenity, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {(hotel.amenities as string[]).length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{(hotel.amenities as string[]).length - 4} more
                                </Badge>
                              )}
                            </div>
                          )}

                          {hotel.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
                          )}
                        </div>

                        {/* Price and Booking */}
                        <div className="text-right ml-6">
                          <div className="mb-2">
                            <span className="text-sm text-gray-500">Starting from</span>
                          </div>
                          <div className="text-3xl font-bold text-mmt-red mb-1">
                            ₹{hotel.pricePerNight}
                          </div>
                          <div className="text-sm text-gray-500 mb-1">per night</div>
                          <div className="text-sm text-gray-700 mb-4">
                            ₹{hotel.pricePerNight ? (parseFloat(hotel.pricePerNight) * nights).toLocaleString() : '0'} for {nights} night{nights !== 1 ? 's' : ''}
                          </div>
                          
                          <Button
                            onClick={() => handleBookHotel(hotel)}
                            className="bg-mmt-red hover:bg-red-600 text-white w-full mb-2"
                          >
                            Book Now
                          </Button>
                          
                          <div className="flex items-center justify-center text-xs text-gray-500">
                            <i className="fas fa-shield-alt mr-1"></i>
                            <span>Free Cancellation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
