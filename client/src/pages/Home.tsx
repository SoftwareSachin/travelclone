import { useState } from "react";
import { Header } from "@/components/Header";
import { BookingTabs } from "@/components/BookingTabs";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { HotelSearchForm } from "@/components/HotelSearchForm";
import { SuperOffers } from "@/components/SuperOffers";
import { TrustIndicators } from "@/components/TrustIndicators";
import { PopularDestinations } from "@/components/PopularDestinations";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { AppDownload } from "@/components/AppDownload";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [activeTab, setActiveTab] = useState("flights");

  const renderBookingForm = () => {
    switch (activeTab) {
      case "flights":
        return <FlightSearchForm />;
      case "hotels":
        return <HotelSearchForm />;
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Booking
            </h3>
            <p className="text-gray-500">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} booking functionality coming soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-8">
        <div className="container mx-auto px-4">
          {/* Booking Widget */}
          <Card className="max-w-6xl mx-auto shadow-lg">
            <CardContent className="p-6">
              {/* Booking Tabs */}
              <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              {/* Booking Form */}
              {renderBookingForm()}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Super Offers */}
      <SuperOffers />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* App Download */}
      <AppDownload />

      {/* Footer */}
      <Footer />
    </div>
  );
}
