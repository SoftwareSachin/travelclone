import { Link } from "wouter";
import { ROUTES } from "@/lib/constants";

const footerLinks = {
  quickLinks: [
    { label: "Book Flights", href: ROUTES.FLIGHTS },
    { label: "Book Hotels", href: ROUTES.HOTELS },
    { label: "Holiday Packages", href: ROUTES.PACKAGES },
    { label: "Train Tickets", href: ROUTES.TRAINS },
    { label: "Bus Tickets", href: ROUTES.BUSES },
    { label: "Cab Booking", href: ROUTES.CABS },
  ],
  support: [
    { label: "Customer Support", href: "/support" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href={ROUTES.HOME} className="text-2xl font-bold mb-4 inline-block">
              <span className="text-mmt-red">Make</span>
              <span className="text-mmt-blue">MyTrip</span>
            </Link>
            <p className="text-gray-400 mb-4">
              India's leading travel booking platform trusted by millions of travelers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <i className="fas fa-phone mr-3"></i>
                <span>+1-800-MAKEMYTRIP</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                <span>support@makemytrip.com</span>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1"></i>
                <span>
                  MakeMyTrip (India) Pvt. Ltd.<br />
                  Building No. 5, Tower B<br />
                  DLF Cyber City, Gurgaon - 122002
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 MakeMyTrip. All rights reserved.
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-mmt-blue text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
          <i className="fas fa-comments text-xl"></i>
        </button>
      </div>
    </footer>
  );
}
