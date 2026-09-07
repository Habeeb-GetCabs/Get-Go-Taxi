import { useState } from 'react';
import GetGoHeader from './components/GetGoHeader';
import GetGoHero from './components/GetGoHero';
import GetGoStats from './components/GetGoStats';
import GetGoServices from './components/GetGoServices';
import GetGoHourlyPackages from './components/GetGoHourlyPackages';
import GetGoPopularRoutes from './components/GetGoPopularRoutes';
import GetGoCabTaxiPage from './components/GetGoCabTaxiPage';
import GetGoCorporatePage from './components/GetGoCorporatePage';
import GetGoAboutPage from './components/GetGoAboutPage';
import GetGoContactPage from './components/GetGoContactPage';
import GetGoTestimonials from './components/GetGoTestimonials';
import GetGoFooter from './components/GetGoFooter';
import GetGoTourModal from './components/GetGoTourModal';
import GetGoBookingModal from './components/GetGoBookingModal';
import GetGoFloatingWidget from './components/GetGoFloatingWidget';
import { TourPackageItem } from './data/tourData';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedTour, setSelectedTour] = useState<TourPackageItem | null>(null);
  const [bookingModalState, setBookingModalState] = useState<{
    isOpen: boolean;
    initialType: 'local' | 'hourly' | 'oneway' | 'outstation';
    initialPackage?: string;
  }>({
    isOpen: false,
    initialType: 'local',
  });

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBooking = (
    type: 'local' | 'hourly' | 'oneway' | 'outstation' = 'local',
    pkg?: string
  ) => {
    setBookingModalState({
      isOpen: true,
      initialType: type,
      initialPackage: pkg,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-[#C62139] selection:text-white">
      {/* Universal Header */}
      <GetGoHeader
        activePage={activePage}
        setActivePage={handleNavigate}
        onOpenBooking={() => openBooking('local')}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            {/* Hero Slider & 4-Tab Booking Form (Local, Hourly, One Way, Outstation) */}
            <GetGoHero onNavigate={handleNavigate} />

            {/* Quick Stats Banner */}
            <GetGoStats />

            {/* Core Services Section with Direct Links */}
            <GetGoServices onNavigate={handleNavigate} />

            {/* Dedicated Hourly Rental Packages Section (2hr, 4hr, 8hr, 12hr) */}
            <GetGoHourlyPackages
              onOpenBooking={(pkg) => openBooking('hourly', pkg)}
            />

            {/* Popular One-Way Drop & Outstation Routes */}
            <GetGoPopularRoutes
              onOpenBooking={(route) => openBooking('oneway', route)}
            />

            {/* Testimonials */}
            <GetGoTestimonials />
          </>
        )}

        {activePage === 'cab-services' && (
          <GetGoCabTaxiPage onOpenBooking={() => openBooking('local')} />
        )}

        {activePage === 'hourly-packages' && (
          <div className="py-6">
            <GetGoHourlyPackages
              onOpenBooking={(pkg) => openBooking('hourly', pkg)}
            />
          </div>
        )}

        {activePage === 'popular-routes' && (
          <div className="py-6">
            <GetGoPopularRoutes
              onOpenBooking={(route) => openBooking('oneway', route)}
            />
          </div>
        )}

        {activePage === 'corporate-student' && (
          <GetGoCorporatePage />
        )}

        {activePage === 'about-us' && (
          <GetGoAboutPage />
        )}

        {activePage === 'contact-us' && (
          <GetGoContactPage />
        )}
      </main>

      {/* Universal Footer */}
      <GetGoFooter onNavigate={handleNavigate} />

      {/* Floating Call & WhatsApp Button */}
      <GetGoFloatingWidget />

      {/* Tour Itinerary & Photo Gallery Modal */}
      <GetGoTourModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
      />

      {/* Direct Booking Modal */}
      <GetGoBookingModal
        isOpen={bookingModalState.isOpen}
        onClose={() => setBookingModalState((prev) => ({ ...prev, isOpen: false }))}
        initialType={bookingModalState.initialType}
        initialPackage={bookingModalState.initialPackage}
      />
    </div>
  );
}
