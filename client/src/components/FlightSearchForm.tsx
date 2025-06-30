import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROUTES, TRIP_TYPES, FLIGHT_CLASSES } from "@/lib/constants";
import type { FlightSearchParams } from "@/types";

interface FlightSearchFormProps {
  onSearch?: (params: FlightSearchParams) => void;
}

export function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    from: "NYC",
    to: "LAX",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    class: FLIGHT_CLASSES.ECONOMY,
    tripType: TRIP_TYPES.ONE_WAY,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchParams);
    } else {
      // Navigate to flight results page with search params
      const queryParams = new URLSearchParams({
        from: searchParams.from,
        to: searchParams.to,
        departureDate: searchParams.departureDate,
        passengers: searchParams.passengers.toString(),
        class: searchParams.class,
        tripType: searchParams.tripType,
        ...(searchParams.returnDate && { returnDate: searchParams.returnDate }),
      });
      
      setLocation(`${ROUTES.FLIGHT_RESULTS}?${queryParams}`);
    }
  };

  const updateSearchParams = (updates: Partial<FlightSearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...updates }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trip Type Selection */}
      <RadioGroup
        value={searchParams.tripType}
        onValueChange={(value) => updateSearchParams({ tripType: value as any })}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={TRIP_TYPES.ONE_WAY} id="one-way" />
          <Label htmlFor="one-way" className="font-medium cursor-pointer">One Way</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={TRIP_TYPES.ROUND_TRIP} id="round-trip" />
          <Label htmlFor="round-trip" className="font-medium cursor-pointer">Round Trip</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={TRIP_TYPES.MULTI_CITY} id="multi-city" />
          <Label htmlFor="multi-city" className="font-medium cursor-pointer">Multi City</Label>
        </div>
      </RadioGroup>

      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* From */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">From</Label>
          <div className="relative">
            <Input
              type="text"
              value={searchParams.from}
              onChange={(e) => updateSearchParams({ from: e.target.value })}
              placeholder="Delhi, India"
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-plane text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* To */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">To</Label>
          <div className="relative">
            <Input
              type="text"
              value={searchParams.to}
              onChange={(e) => updateSearchParams({ to: e.target.value })}
              placeholder="Mumbai, India"
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-plane text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Departure</Label>
          <div className="relative">
            <Input
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => updateSearchParams({ departureDate: e.target.value })}
              className="pr-10"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-calendar text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Return Date */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Return</Label>
          <div className="relative">
            <Input
              type="date"
              value={searchParams.returnDate}
              onChange={(e) => updateSearchParams({ returnDate: e.target.value })}
              placeholder="Tap to add return date"
              className="pr-10"
              disabled={searchParams.tripType === TRIP_TYPES.ONE_WAY}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-calendar text-gray-400"></i>
            </div>
          </div>
          {searchParams.tripType === TRIP_TYPES.ROUND_TRIP && (
            <div className="text-xs text-gray-500 mt-1">for bigger discounts</div>
          )}
        </div>

        {/* Travellers & Class */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Travellers & Class</Label>
          <div className="relative">
            <Input
              type="number"
              min="1"
              max="9"
              value={searchParams.passengers}
              onChange={(e) => updateSearchParams({ passengers: parseInt(e.target.value) || 1 })}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-user text-gray-400"></i>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <select
              value={searchParams.class}
              onChange={(e) => updateSearchParams({ class: e.target.value as any })}
              className="text-xs bg-transparent border-none outline-none"
            >
              <option value={FLIGHT_CLASSES.ECONOMY}>Economy</option>
              <option value={FLIGHT_CLASSES.BUSINESS}>Business</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-gradient-to-r from-mmt-blue to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Search Flights
        </Button>
      </div>

      {/* Trending Searches */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Trending Searches:</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
            Delhi → Mumbai
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
            Mumbai → Bangalore
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
            Delhi → Goa
          </span>
        </div>
      </div>
    </form>
  );
}
