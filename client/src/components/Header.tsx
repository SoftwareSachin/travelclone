import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";

export function Header() {
  const [location] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navigationItems = [
    { href: ROUTES.FLIGHTS, label: "Flights" },
    { href: ROUTES.HOTELS, label: "Hotels" },
    { href: "/homestays", label: "Homestays" },
    { href: ROUTES.PACKAGES, label: "Holiday Packages" },
    { href: ROUTES.TRAINS, label: "Trains" },
    { href: ROUTES.BUSES, label: "Buses" },
    { href: ROUTES.CABS, label: "Cabs" },
    { href: "/forex", label: "Forex" },
    { href: "/travel-insurance", label: "Travel Insurance" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex justify-between items-center py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <Link href={ROUTES.MY_TRIPS} className="text-gray-600 hover:text-mmt-blue transition-colors">
              My Trips
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Manage your bookings</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Welcome, {user?.firstName || user?.email}
                  {user?.mmtSelectMember && (
                    <span className="ml-1 text-xs bg-mmt-orange text-white px-2 py-1 rounded">
                      SELECT
                    </span>
                  )}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-mmt-blue hover:text-mmt-red transition-colors"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm" className="text-mmt-blue hover:text-mmt-red transition-colors">
                  Login or Create Account
                </Button>
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">USD</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">English</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="text-2xl font-bold mr-8">
              <span className="text-mmt-red">Make</span>
              <span className="text-mmt-blue">MyTrip</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  location === item.href
                    ? "text-mmt-blue"
                    : "text-gray-700 hover:text-mmt-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <i className="fas fa-bars text-gray-700"></i>
          </Button>
        </div>
      </div>
    </header>
  );
}
