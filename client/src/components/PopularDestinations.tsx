import { POPULAR_DESTINATIONS } from "@/lib/constants";

export function PopularDestinations() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-gray-600">Discover amazing places around the world</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((destination) => (
            <div
              key={destination.id}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm opacity-90">Starting from {destination.startingPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
