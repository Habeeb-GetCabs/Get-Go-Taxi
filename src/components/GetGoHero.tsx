import { useState, useEffect, useMemo, type FormEvent } from 'react';
import {
  Calendar,
  Car,
  ChevronRight,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import AddressAutocomplete from './AddressAutocomplete';
import { calculateFinalFare } from '../utils/fareCalculation';

interface GetGoHeroProps {
  onSelectTour?: (tourId: string) => void;
  onNavigate: (page: string) => void;
}

const SLIDES = [
  {
    image: '/assets/img/hero/h1.jpg',
    tag: 'Flexible City Rentals',
    subTag: 'Hourly Cab Packages',
    title: 'Local & Hourly Cab Rentals in Coimbatore & Tiruppur.',
    desc: 'Hire a sanitized AC cab with a courteous chauffeur for 2, 4, 8, or 12 hours. Unlimited local stops for shopping, hospital visits, client meetings, and city errands.',
    primaryBtn: 'Explore Hourly Packages',
    targetPage: 'hourly-packages',
  },
  {
    image: '/assets/img/hero/h2.jpg',
    tag: 'Safe Local & Outstation Rides',
    subTag: 'One-Way & Round-Trip',
    title: 'One-Way Drop Taxi & Outstation Cabs — Zero Return Fare.',
    desc: 'Book one-way drop cabs from Coimbatore and Tiruppur to Bangalore, Chennai, Salem, Madurai, and Kerala. Pay only for distance travelled with transparent per-km billing.',
    primaryBtn: 'View Cab Tariffs',
    targetPage: 'cab-services',
  },
  {
    image: '/assets/img/hero/h3.jpg',
    tag: 'Group & Corporate Travel',
    subTag: 'Tempo Travellers & Corporate Shuttles',
    title: 'Spacious 12 to 20-Seater Tempo Travellers & Corporate Transit.',
    desc: 'Comfortable push-back seats, ample luggage space, and professional chauffeurs for family weddings, corporate team outings, and group excursions.',
    primaryBtn: 'Explore Group Cabs',
    targetPage: 'corporate-student',
  },
];

export default function GetGoHero({ onNavigate }: GetGoHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Booking Form State: local | hourly | oneway | outstation
  const today = new Date().toISOString().split('T')[0];
  const [tripType, setTripType] = useState<'local' | 'hourly' | 'oneway' | 'outstation'>('local');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [hourlyPackage, setHourlyPackage] = useState('8 Hours / 80 Km (Full Day)');
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);
  const [vehicleChoice, setVehicleChoice] = useState('Sedan (Dzire / Etios)');

  // Helper to compute calendar days difference for outstation round trip (min 1 day)
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    if (isNaN(diffTime) || diffTime < 0) return 1;
    return Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
  };

  const outstationDays = useMemo(() => {
    return calculateDays(pickupDate, returnDate);
  }, [pickupDate, returnDate]);

  const handlePickupDateChange = (newDate: string) => {
    setPickupDate(newDate);
    if (returnDate && returnDate < newDate) {
      setReturnDate(newDate);
    }
  };

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Calculate final fare using the centralized utility (hiding all math & tariff formulas)
  const fareResult = useMemo(() => {
    let days = 1;
    if (tripType === 'outstation') {
      days = outstationDays;
    }
    return calculateFinalFare({
      tripType,
      pickup: pickupLocation,
      drop: dropLocation,
      hourlyPackage,
      days,
      vehicleType: vehicleChoice,
    });
  }, [tripType, pickupLocation, dropLocation, hourlyPackage, outstationDays, vehicleChoice]);

  const hasLocations = tripType === 'hourly'
    ? Boolean(pickupLocation.trim())
    : Boolean(pickupLocation.trim() && dropLocation.trim());

  const slide = SLIDES[currentSlide];

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    let details = '';
    if (tripType === 'hourly') {
      details = `*Package:* ${hourlyPackage}%0A*Pickup City:* ${pickupLocation}%0A`;
    } else if (tripType === 'oneway') {
      details = `*Pickup City:* ${pickupLocation}%0A*Drop Destination:* ${dropLocation || 'City Center'} (Zero Return Fare)%0A`;
    } else if (tripType === 'outstation') {
      details = `*Pickup City:* ${pickupLocation}%0A*Destination:* ${dropLocation || 'Outstation'} (Round Trip)%0A*Departure Date:* ${pickupDate}%0A*Return Date:* ${returnDate} (${outstationDays} Day${outstationDays > 1 ? 's' : ''} Round Trip)%0A`;
    } else {
      // local
      details = `*Pickup Area:* ${pickupLocation}%0A*Drop Area:* ${dropLocation || 'Local City'}%0A`;
    }

    const fareLine = fareResult.isCustomQuote
      ? `*Rate Request:* Call / WhatsApp for Best Discount Rate on ${vehicleChoice}%0A`
      : `*Estimated Final Fare (Sedan):* ₹${fareResult.finalFare.toLocaleString('en-IN')}%0A`;

    const text = `*Cab Booking Request - GetGo Taxi*%0A%0A` +
      `*Trip Category:* ${tripType.toUpperCase()} CAB%0A` +
      details +
      (tripType !== 'outstation' ? `*Date:* ${pickupDate}%0A` : '') +
      `*Vehicle:* ${vehicleChoice}%0A` +
      fareLine +
      `*Note:* ${fareResult.disclaimer.replace('*', '')}%0A%0A` +
      `Hello GetGo Taxi, please confirm cab availability and dispatch details.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Image Carousel with Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105"
        />
        {/* Deep Gradient Overlays for crisp contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:py-20 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Slide Typography & Badges */}
          <div className="lg:col-span-7 text-white space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/90 backdrop-blur-xs text-white text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{slide.tag}</span>
              <span className="text-amber-300">•</span>
              <span className="text-amber-300">{slide.subTag}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {slide.title}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
              {slide.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate(slide.targetPage)}
                className="px-6 py-3.5 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm sm:text-base shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>{slide.primaryBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${GETGO_CONTACT.phone}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-bold text-sm sm:text-base transition border border-white/30 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call {GETGO_CONTACT.phoneFormatted}</span>
              </a>
            </div>

            {/* Quick Feature Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-400" />
                <span>Ghat Road Expert Drivers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Guaranteed On-Time Pickup</span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Booking & Quote Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 border border-slate-100 text-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Book Cabs & Hourly Rentals</h2>
                  <p className="text-xs text-slate-700 font-medium">Local • Hourly • One-Way • Outstation</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-[#C62139] text-xs font-bold">
                  24/7 Active
                </span>
              </div>

              <form onSubmit={handleBookingSubmit} className="mt-4 space-y-3.5">
                {/* Trip Type Selector: local, hourly, oneway, outstation */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">
                  {[
                    { id: 'local', label: 'Local' },
                    { id: 'hourly', label: 'Hourly' },
                    { id: 'oneway', label: 'One Way' },
                    { id: 'outstation', label: 'Outstation' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTripType(tab.id as any)}
                      className={`py-1.5 px-1 rounded-md text-xs transition text-center ${
                        tripType === tab.id
                          ? 'bg-[#C62139] text-white shadow-xs font-black'
                          : 'hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Inputs based on tripType */}
                {tripType === 'hourly' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <AddressAutocomplete
                        id="hero-pickup-hourly"
                        label="Pickup Location"
                        value={pickupLocation}
                        onChange={setPickupLocation}
                        placeholder="e.g. Gandhipuram / Airport / Ukkadam"
                        required
                        tripType={tripType}
                      />
                    </div>

                    <div>
                      <label htmlFor="hero-hourly-package-select" className="block text-2xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Select Hourly Package
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-[#C62139] absolute left-3 top-3 pointer-events-none" />
                        <select
                          id="hero-hourly-package-select"
                          aria-label="Select Hourly Package"
                          value={hourlyPackage}
                          onChange={(e) => setHourlyPackage(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139] focus:outline-hidden bg-white text-slate-800 font-medium"
                        >
                          <option value="2 Hours / 20 Km (City Errands)">2 Hours / 20 Km (City Errands)</option>
                          <option value="4 Hours / 40 Km (Half Day)">4 Hours / 40 Km (Half Day)</option>
                          <option value="8 Hours / 80 Km (Full Day)">8 Hours / 80 Km (Full Day - Popular)</option>
                          <option value="12 Hours / 120 Km (Extended Full Day)">12 Hours / 120 Km (Extended Day)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <AddressAutocomplete
                        id="hero-pickup-location"
                        label={
                          tripType === 'oneway'
                            ? 'Pickup City'
                            : tripType === 'outstation'
                            ? 'Starting City'
                            : 'Pickup Area'
                        }
                        value={pickupLocation}
                        onChange={setPickupLocation}
                        placeholder={
                          tripType === 'local'
                            ? 'e.g. Gandhipuram / RS Puram / Ukkadam'
                            : 'e.g. Coimbatore / Airport / Tiruppur'
                        }
                        required
                        tripType={tripType}
                      />
                    </div>

                    <div>
                      <AddressAutocomplete
                        id="hero-drop-location"
                        label={
                          tripType === 'oneway'
                            ? 'Drop City (Zero Return)'
                            : tripType === 'outstation'
                            ? 'Outstation Destination'
                            : 'Drop Area'
                        }
                        value={dropLocation}
                        onChange={setDropLocation}
                        placeholder={
                          tripType === 'oneway'
                            ? 'e.g. Bangalore / Chennai / Salem / Madurai'
                            : tripType === 'outstation'
                            ? 'e.g. Munnar / Kodaikanal / Mysore'
                            : 'e.g. Saravanampatti / Airport / Peelamedu'
                        }
                        required
                        isDestination
                        tripType={tripType}
                        iconColor="text-red-500"
                      />
                    </div>
                  </div>
                )}

                {/* Date & Vehicle Selector */}
                {tripType === 'outstation' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hero-departure-date" className="block text-2xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Departure Date (Calendar)
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                          <input
                            id="hero-departure-date"
                            aria-label="Departure Date"
                            type="date"
                            min={today}
                            value={pickupDate}
                            onChange={(e) => handlePickupDateChange(e.target.value)}
                            required
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139] focus:outline-hidden bg-white text-slate-800 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label htmlFor="hero-return-date" className="block text-2xs font-bold uppercase tracking-wider text-slate-700">
                            Return Date (Calendar)
                          </label>
                          <span className="text-3xs font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {outstationDays} Day{outstationDays > 1 ? 's' : ''} Round Trip
                          </span>
                        </div>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                          <input
                            id="hero-return-date"
                            aria-label="Return Date"
                            type="date"
                            min={pickupDate}
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            required
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139] focus:outline-hidden bg-white text-slate-800 font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hero-vehicle-choice" className="block text-2xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Preferred Vehicle
                      </label>
                      <div className="relative">
                        <Car className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                        <select
                          id="hero-vehicle-choice"
                          aria-label="Preferred Vehicle"
                          value={vehicleChoice}
                          onChange={(e) => setVehicleChoice(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139] focus:outline-hidden bg-white text-slate-800 font-medium"
                        >
                          <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios - 4 Seater) — Instant Quote</option>
                          <option value="Innova SUV">Innova SUV (6-7 Seater) — Call/WhatsApp for Rates</option>
                          <option value="Innova Crysta">Innova Crysta Luxury — Call/WhatsApp for Rates</option>
                          <option value="Tempo Traveller">Tempo Traveller (12-20 Seater) — Call/WhatsApp for Rates</option>
                          <option value="Mini Bus / Coach">Mini Bus / Coach (25-35 Seater) — Call/WhatsApp for Rates</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="hero-local-travel-date" className="block text-2xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Travel Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                        <input
                          id="hero-local-travel-date"
                          aria-label="Travel Date"
                          type="date"
                          min={today}
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          required
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139] focus:outline-hidden bg-white text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hero-local-vehicle-choice" className="block text-2xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Preferred Vehicle
                      </label>
                      <div className="relative">
                        <Car className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                        <select
                          id="hero-local-vehicle-choice"
                          aria-label="Preferred Vehicle"
                          value={vehicleChoice}
                          onChange={(e) => setVehicleChoice(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C62139] focus:outline-hidden bg-white text-slate-800 font-medium"
                        >
                          <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios - 4 Seater) — Instant Quote</option>
                          <option value="Innova SUV">Innova SUV (6-7 Seater) — Call/WhatsApp for Rates</option>
                          <option value="Innova Crysta">Innova Crysta Luxury — Call/WhatsApp for Rates</option>
                          <option value="Tempo Traveller">Tempo Traveller (12-20 Seater) — Call/WhatsApp for Rates</option>
                          <option value="Mini Bus / Coach">Mini Bus / Coach (25-35 Seater) — Call/WhatsApp for Rates</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fare Display Card */}
                {fareResult.isCustomQuote ? (
                  /* Non-Sedan vehicles: Call or WhatsApp for best rate */
                  <div className="space-y-2">
                    <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-300/80 rounded-xl">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-3xs font-black uppercase tracking-wider text-amber-900 block">
                            Direct Fleet Tariff
                          </span>
                          <div className="text-amber-950 tracking-tight font-black text-base sm:text-lg pt-0.5">
                            Call or WhatsApp for Best Rates
                          </div>
                          <span className="text-2xs text-amber-800 font-medium block pt-0.5">
                            Special discount rates available for {vehicleChoice}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="inline-block text-3xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded leading-tight">
                            Best Rate Guaranteed
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-100" />
                        <span>WhatsApp for Best Rate</span>
                      </button>
                      <a
                        href={`tel:${GETGO_CONTACT.phone}`}
                        className="w-full py-3 px-3 bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-4 h-4 text-amber-300" />
                        <span>Call Dispatch Desk</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Sedan Instant Quote */
                  <div className="space-y-2">
                    <div className="p-3.5 bg-gradient-to-r from-red-50 to-amber-50/50 border border-red-200/80 rounded-xl">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-3xs font-black uppercase tracking-wider text-slate-700 block">
                            Estimated Final Fare (Sedan)
                          </span>
                          <div className="text-[#C62139] tracking-tight font-black">
                            {hasLocations ? (
                              <span className="text-xl sm:text-2xl">₹{fareResult.finalFare.toLocaleString('en-IN')}</span>
                            ) : (
                              <span className="text-2xs sm:text-xs font-bold text-slate-500 block pt-0.5">
                                Enter pickup & drop location to estimate
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block text-3xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded leading-tight">
                            {fareResult.disclaimer}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2"
                    >
                      <Phone className="w-4 h-4 text-amber-300" />
                      <span>
                        {hasLocations
                          ? `Book Sedan at ₹${fareResult.finalFare.toLocaleString('en-IN')}`
                          : 'Book Cab via WhatsApp'}
                      </span>
                    </button>
                  </div>
                )}

                <p className="text-center text-2xs text-slate-700 font-medium">
                  Or call directly:{' '}
                  <a
                    href={`tel:${GETGO_CONTACT.phone}`}
                    className="font-bold text-[#C62139] hover:underline"
                  >
                    {GETGO_CONTACT.phoneFormatted}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
