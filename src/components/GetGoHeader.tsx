import { useState } from 'react';
import {
  Car,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

interface GetGoHeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
}

export default function GetGoHeader({ activePage, setActivePage, onOpenBooking }: GetGoHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand Identity */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            aria-label="GetGo Taxi Home"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 text-left border-0 bg-transparent p-0"
          >
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#C62139] to-[#9E1B2E] text-white font-black text-base sm:text-lg shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <span className="text-amber-300 font-black">G</span>G
            </div>
            <div>
              <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-[#C62139] block leading-none">
                GetGo Taxi
              </span>
              <p className="text-[10px] sm:text-2xs text-slate-700 font-medium tracking-tight mt-0.5 hidden xs:block">
                Coimbatore • Tiruppur • Palladam
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg transition ${
                activePage === 'home'
                  ? 'text-[#C62139] bg-red-50 font-bold'
                  : 'hover:text-[#C62139] hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Our Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`px-3 py-2 rounded-lg transition flex items-center gap-1 ${
                  ['cab-services', 'corporate-student', 'hourly-packages', 'popular-routes'].includes(activePage)
                    ? 'text-[#C62139] bg-red-50 font-bold'
                    : 'hover:text-[#C62139] hover:bg-slate-50'
                }`}
              >
                <span>Our Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                >
                  <button
                    onClick={() => navigateTo('cab-services')}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-[#C62139] flex items-center gap-2.5 transition"
                  >
                    <Car className="w-4 h-4 text-[#C62139]" />
                    <div>
                      <div className="font-bold">Cab & Taxi Tariffs</div>
                      <div className="text-2xs text-slate-600 font-medium">Sedan, Innova, Tempo per-km rates</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('hourly-packages')}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-[#C62139] flex items-center gap-2.5 transition"
                  >
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold">Hourly Rental Packages</div>
                      <div className="text-2xs text-slate-600 font-medium">2hr, 4hr, 8hr & 12hr city rentals</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('popular-routes')}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-[#C62139] flex items-center gap-2.5 transition"
                  >
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">One-Way Drop & Outstation</div>
                      <div className="text-2xs text-slate-600 font-medium">Bangalore, Chennai, Salem drop taxi</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigateTo('corporate-student')}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-[#C62139] flex items-center gap-2.5 transition"
                  >
                    <Users className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-bold">Corporate & Group Transit</div>
                      <div className="text-2xs text-slate-600 font-medium">Daily IT Shuttles & Tempo Travellers</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('hourly-packages')}
              className={`px-3 py-2 rounded-lg transition ${
                activePage === 'hourly-packages'
                  ? 'text-[#C62139] bg-red-50 font-bold'
                  : 'hover:text-[#C62139] hover:bg-slate-50'
              }`}
            >
              Hourly Packages
            </button>

            <button
              onClick={() => navigateTo('popular-routes')}
              className={`px-3 py-2 rounded-lg transition ${
                activePage === 'popular-routes'
                  ? 'text-[#C62139] bg-red-50 font-bold'
                  : 'hover:text-[#C62139] hover:bg-slate-50'
              }`}
            >
              One-Way & Outstation
            </button>

            <button
              onClick={() => navigateTo('about-us')}
              className={`px-3 py-2 rounded-lg transition ${
                activePage === 'about-us'
                  ? 'text-[#C62139] bg-red-50 font-bold'
                  : 'hover:text-[#C62139] hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => navigateTo('contact-us')}
              className={`px-3 py-2 rounded-lg transition ${
                activePage === 'contact-us'
                  ? 'text-[#C62139] bg-red-50 font-bold'
                  : 'hover:text-[#C62139] hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Header Actions: Phone Number + Booking CTA + Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Direct Mobile Phone Number Button */}
            <a
              href={`tel:${GETGO_CONTACT.phone}`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-red-50 hover:bg-red-100 text-[#C62139] font-bold text-xs sm:text-sm border border-red-200/80 transition shadow-2xs group"
              title={`Call ${GETGO_CONTACT.phoneFormatted}`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C62139] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span className="font-extrabold tracking-tight whitespace-nowrap hidden xs:inline">
                {GETGO_CONTACT.phoneFormatted}
              </span>
              <span className="font-extrabold tracking-tight whitespace-nowrap xs:hidden text-2xs">
                90801 51265
              </span>
            </a>

            {/* Desktop Booking CTA */}
            <div className="hidden sm:flex items-center">
              <button
                onClick={onOpenBooking}
                className="px-3.5 py-2 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-xs"
              >
                <Car className="w-4 h-4 text-amber-300" />
                <span>Book a Cab</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100/80 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-3 space-y-1.5 text-sm font-semibold shadow-xl">
          <button
            onClick={() => navigateTo('home')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70 font-bold"
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('cab-services')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70"
          >
            🚕 Cab & Taxi Tariffs
          </button>
          <button
            onClick={() => navigateTo('hourly-packages')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70 font-bold text-[#C62139]"
          >
            ⏱️ Hourly Rental Packages (2hr, 4hr, 8hr, 12hr)
          </button>
          <button
            onClick={() => navigateTo('popular-routes')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70"
          >
            🛣️ One-Way Drop & Outstation Routes
          </button>
          <button
            onClick={() => navigateTo('corporate-student')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70"
          >
            🏢 Corporate & Group Transit
          </button>
          <button
            onClick={() => navigateTo('about-us')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70"
          >
            About Us
          </button>
          <button
            onClick={() => navigateTo('contact-us')}
            className="w-full text-left py-2 px-3 rounded-lg text-slate-800 hover:bg-slate-100/70"
          >
            Contact Us
          </button>

          <div className="pt-2.5 border-t border-slate-200/60 flex flex-col gap-2">
            <a
              href={`tel:${GETGO_CONTACT.phone}`}
              className="w-full py-2.5 rounded-xl bg-[#C62139] text-white font-bold text-center flex items-center justify-center gap-2 text-xs shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              Call {GETGO_CONTACT.phoneFormatted}
            </a>
            <a
              href={`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-center flex items-center justify-center gap-2 text-xs shadow-xs"
            >
              Connect on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
