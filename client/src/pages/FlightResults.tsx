import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { flightApi } from "@/lib/api";
import type { Flight, FlightSearchParams } from "@/types";

export default function FlightResults() {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    
    const params: FlightSearchParams = {
      from: urlParams.get('from') || '',
      to: urlParams.get('to') || '',
      departureDate: urlParams.get('departureDate') || '',
      returnDate: urlParams.get('returnDate') || '',
      passengers: parseInt(urlParams.get('passengers') || '1'),
      class: urlParams.get('class') as any || 'economy',
      tripType: urlParams.get('tripType') as any || 'one-way',
    };

    if (params.from && params.to && params.departureDate) {
      setSearchParams(params);
    }
  }, [location]);

  const { data: flights, isLoading, error } = useQuery({
    queryKey: ['/api/flights/search', searchParams],
    queryFn: () => searchParams ? flightApi.search(searchParams) : Promise.resolve([]),
    enabled: !!searchParams,
  });

  const handleBookFlight = (flight: Flight) => {
    // Navigate to booking page or show booking modal
    console.log('Booking flight:', flight);
  };

  if (!searchParams) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Search</h2>
              <p className="text-gray-600">Please go back and search for flights again.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {searchParams.from} → {searchParams.to}
                </h1>
                <p className="text-gray-600">
                  {searchParams.departureDate} • {searchParams.passengers} passenger(s) • {searchParams.class}
                </p>
              </div>
              <Badge variant="secondary">
                {searchParams.tripType}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Flight Results */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-mmt-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for flights...</p>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-bold text-red-600 mb-4">Search Failed</h2>
              <p className="text-gray-600">Unable to search flights. Please try again later.</p>
            </CardContent>
          </Card>
        ) : !flights || flights.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">No Flights Found</h2>
              <p className="text-gray-600">No flights available for your search criteria.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {flights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="w-12 h-12 bg-mmt-blue rounded-lg flex items-center justify-center">
                          <i className="fas fa-plane text-white"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{flight.flightNumber}</h3>
                          <p className="text-gray-600">{flight.aircraft}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {new Date(flight.departureTime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </div>
                          <div className="text-sm text-gray-500">{searchParams.from}</div>
                        </div>
                        
                        <div className="flex-1 text-center">
                          <div className="border-t border-gray-300 relative">
                            <i className="fas fa-plane absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-400"></i>
                          </div>
                          <div className="text-sm text-gray-500 mt-2">
                            {flight.duration ? `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m` : 'Direct'}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {new Date(flight.arrivalTime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            })}
                          </div>
                          <div className="text-sm text-gray-500">{searchParams.to}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-8">
                      <div className="text-2xl font-bold text-mmt-blue mb-2">
                        ₹{searchParams.class === 'economy' ? flight.economyPrice : flight.businessPrice}
                      </div>
                      <Button
                        onClick={() => handleBookFlight(flight)}
                        className="bg-mmt-orange hover:bg-orange-600 text-white"
                      >
                        Book Now
                      </Button>
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
