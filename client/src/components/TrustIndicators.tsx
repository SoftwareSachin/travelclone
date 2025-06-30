import { TRUST_INDICATORS } from "@/lib/constants";

export function TrustIndicators() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {TRUST_INDICATORS.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${indicator.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`fas fa-${indicator.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">{indicator.title}</h3>
              <p className="text-gray-600 text-sm">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
