import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const offers = [
  {
    id: 1,
    type: "HOTELS",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    title: "UNLOCK BIG SAVING:",
    description: "Grab Up to 25% OFF* on Hotels!",
    code: "MMTINTUS",
    hasCode: true,
  },
  {
    id: 2,
    type: "HOTELS",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    title: "For Your Getaways to India:",
    description: "Grab Up to 35% OFF* on Hotels & Homestays",
    hasCode: false,
  },
  {
    id: 3,
    type: "FLIGHTS",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    title: "For Your Upcoming Holidays:",
    description: "Get Up to 15% OFF* on Flights!",
    code: "MMTINTLUS",
    hasCode: true,
  },
  {
    id: 4,
    type: "PACKAGES",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    title: "Holiday Packages:",
    description: "Save Up to 30% OFF* on International Packages!",
    code: "HOLIDAY30",
    hasCode: true,
  },
];

export function SuperOffers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Super Offers</h2>
          <div className="flex justify-center space-x-6">
            <button className="text-mmt-blue border-b-2 border-mmt-blue pb-2 font-semibold">
              All Offers
            </button>
            <button className="text-gray-600 hover:text-mmt-blue transition-colors">
              Flights
            </button>
            <button className="text-gray-600 hover:text-mmt-blue transition-colors">
              Hotels
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold text-white ${
                      offer.type === "HOTELS"
                        ? "bg-mmt-red"
                        : offer.type === "FLIGHTS"
                        ? "bg-mmt-blue"
                        : "bg-green-600"
                    }`}
                  >
                    {offer.type}
                  </span>
                  <span className="text-xs text-gray-500">T&C's Apply</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-3">{offer.description}</p>
                <div className="flex items-center justify-between">
                  {offer.hasCode && (
                    <span className="text-mmt-blue font-semibold">
                      Code: {offer.code}
                    </span>
                  )}
                  <Button className="bg-mmt-orange hover:bg-orange-600 text-white">
                    BOOK NOW
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
