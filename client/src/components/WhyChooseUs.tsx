const features = [
  {
    icon: "globe",
    title: "Largest Travel Network",
    description: "Access to 500+ airlines, 60,000+ hotels, and thousands of destinations worldwide",
    color: "bg-mmt-blue",
  },
  {
    icon: "percentage",
    title: "Best Price Guarantee",
    description: "We guarantee the lowest prices on flights and hotels with our exclusive deals",
    color: "bg-mmt-red",
  },
  {
    icon: "clock",
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance in multiple languages for all your travel needs",
    color: "bg-green-600",
  },
  {
    icon: "mobile-alt",
    title: "Mobile-First Experience",
    description: "Seamless booking experience across all devices with our award-winning mobile app",
    color: "bg-mmt-orange",
  },
  {
    icon: "star",
    title: "MMT Select Rewards",
    description: "Earn rewards on every booking and enjoy exclusive member benefits",
    color: "bg-purple-600",
  },
  {
    icon: "shield-alt",
    title: "Secure Payments",
    description: "Multiple secure payment options with 100% safe and encrypted transactions",
    color: "bg-indigo-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 bg-mmt-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MakeMyTrip?</h2>
          <p className="text-gray-600">India's leading travel booking platform trusted by millions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <i className={`fas fa-${feature.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
