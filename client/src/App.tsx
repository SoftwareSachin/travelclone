import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";

// Import pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import FlightSearch from "@/pages/FlightSearch";
import HotelSearch from "@/pages/HotelSearch";
import FlightResults from "@/pages/FlightResults";
import HotelResults from "@/pages/HotelResults";
import BookingConfirmation from "@/pages/BookingConfirmation";
import MyTrips from "@/pages/MyTrips";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.REGISTER} component={Register} />
      <Route path={ROUTES.FLIGHTS} component={FlightSearch} />
      <Route path={ROUTES.HOTELS} component={HotelSearch} />
      <Route path={ROUTES.FLIGHT_RESULTS} component={FlightResults} />
      <Route path={ROUTES.HOTEL_RESULTS} component={HotelResults} />
      <Route path={ROUTES.BOOKING_CONFIRMATION} component={BookingConfirmation} />
      <Route path={ROUTES.MY_TRIPS} component={MyTrips} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
