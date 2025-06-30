import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";
import type { HotelSearchParams } from "@/types";

interface HotelSearchFormProps {
  onSearch?: (params: HotelSearchParams) => void;
}

export function HotelSearchForm({ onSearch }: HotelSearchFormProps) {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<HotelSearchParams>({
    city: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    guests: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchParams);
    } else {
      // Navigate to hotel results page with search params
      const queryParams = new URLSearchParams({
        city: searchParams.city,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        rooms: searchParams.rooms.toString(),
        guests: searchParams.guests.toString(),
      });
      
      setLocation(`${ROUTES.HOTEL_RESULTS}?${queryParams}`);
    }
  };

  const updateSearchParams = (updates: Partial<HotelSearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...updates }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* City */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">City</Label>
          <div className="relative">
            <Input
              type="text"
              value={searchParams.city}
              onChange={(e) => updateSearchParams({ city: e.target.value })}
              placeholder="Enter city name"
              className="pr-10"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-map-marker-alt text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Check-in Date */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Check-in</Label>
          <div className="relative">
            <Input
              type="date"
              value={searchParams.checkIn}
              onChange={(e) => updateSearchParams({ checkIn: e.target.value })}
              className="pr-10"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-calendar text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Check-out</Label>
          <div className="relative">
            <Input
              type="date"
              value={searchParams.checkOut}
              onChange={(e) => updateSearchParams({ checkOut: e.target.value })}
              className="pr-10"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-calendar text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Rooms & Guests */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Rooms & Guests</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type="number"
                min="1"
                max="10"
                value={searchParams.rooms}
                onChange={(e) => updateSearchParams({ rooms: parseInt(e.target.value) || 1 })}
                className="pr-10"
              />
              <div className="text-xs text-gray-500 mt-1">Rooms</div>
            </div>
            <div className="relative flex-1">
              <Input
                type="number"
                min="1"
                max="20"
                value={searchParams.guests}
                onChange={(e) => updateSearchParams({ guests: parseInt(e.target.value) || 1 })}
                className="pr-10"
              />
              <div className="text-xs text-gray-500 mt-1">Guests</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-gradient-to-r from-mmt-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Search Hotels
        </Button>
      </div>

      {/* Popular Cities */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Cities:</h3>
        <div className="flex flex-wrap gap-2">
          {['Mumbai', 'Delhi', 'Bangalore', 'Goa', 'Dubai', 'Bangkok'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => updateSearchParams({ city })}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
