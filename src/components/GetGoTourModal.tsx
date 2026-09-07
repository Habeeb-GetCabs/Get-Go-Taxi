import { useState, type FormEvent } from 'react';
import {
  Calendar,
  Car,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Phone,
  Share2,
  Shield,
  Star,
  Users,
  X,
} from 'lucide-react';
import { TourPackageItem, GETGO_CONTACT } from '../data/tourData';

interface GetGoTourModalProps {
  tour: TourPackageItem | null;
  onClose: () => void;
}

export default function GetGoTourModal({ tour, onClose }: GetGoTourModalProps) {
  if (!tour) return null;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'innova' | 'tempoTraveller'>('innova');
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [travelersCount, setTravelersCount] = useState('4');

  const photos = tour.galleryImages.length > 0 ? tour.galleryImages : [tour.cardImage];

  const handleBookNow = (e: FormEvent) => {
    e.preventDefault();
    const vehicleName =
      selectedVehicle === 'sedan'
        ? 'Sedan (Dzire/Etios)'
        : selectedVehicle === 'innova'
        ? 'Innova SUV'
        : 'Tempo Traveller';

    const price = tour.vehiclePricing[selectedVehicle];

    const message =
      `*Booking Inquiry - ${tour.title}*%0A%0A` +
      `*Duration:* ${tour.duration}%0A` +
      `*Vehicle:* ${vehicleName}%0A` +
      `*Estimated Fare:* ₹${price.toLocaleString('en-IN')}%0A` +
      `*Travel Date:* ${travelDate}%0A` +
      `*Travelers:* ${travelersCount} passengers%0A%0A` +
      `Hello GetGo Taxi, please confirm driver details and availability.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-[#C62139] text-white text-2xs font-bold uppercase tracking-wider">
              {tour.category === 'hill-station' ? 'Hill Station Tour' : tour.category === 'devotional' ? 'Devotional Tour' : 'Day Tour'}
            </span>
            <span className="text-xs text-slate-300">
              {tour.duration} • {tour.destinationsCount} Destinations
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close tour details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 flex-1">
          {/* Main Title & Rating */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {tour.title}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-1 text-amber-600 font-bold" aria-label={`Rating: ${tour.rating} out of 5 stars`}>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{tour.rating}</span>
                  <span className="text-slate-700 font-medium">({tour.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C62139]" />
                  Starting from Coimbatore / Tiruppur Hub
                </span>
                <span>•</span>
                <span className="text-emerald-800 font-bold">Instant Confirmation Available</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-2xs uppercase tracking-wider text-slate-700 font-extrabold block">
                Starting from
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#C62139]">
                ₹ {tour.priceFrom.toLocaleString('en-IN')}
                <span className="text-xs font-semibold text-slate-700"> / cab</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={photos[selectedPhotoIndex]}
                alt={tour.title}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/img/hero/h1.jpg';
                }}
              />
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) => (prev + 1) % photos.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      selectedPhotoIndex === idx ? 'border-[#C62139] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Grid: Left Tour Details, Right Booking Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              {/* Tour Overview */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Tour Overview</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tour.overview}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tour.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-[#C62139] shrink-0 mt-0.5" />
                      <span className="font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                  Suggested Itinerary
                </h3>
                <div className="space-y-4">
                  {tour.suggestedItinerary.map((day) => (
                    <div
                      key={day.day}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2 relative"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#C62139] text-white text-xs font-black flex items-center justify-center">
                          {day.day}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{day.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {day.description}
                      </p>
                      <div className="pl-8 flex flex-wrap gap-1.5 pt-1">
                        {day.places.map((place, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-2xs font-semibold"
                          >
                            📍 {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    What's Included
                  </h4>
                  <ul className="space-y-1 text-2xs text-emerald-950">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-slate-500" />
                    Not Included
                  </h4>
                  <ul className="space-y-1 text-2xs text-slate-600">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing By Vehicle & Booking Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-200">
                  Select Vehicle & Fare
                </h3>

                {/* Vehicle Selection Cards */}
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedVehicle('sedan')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedVehicle === 'sedan'
                        ? 'border-[#C62139] bg-white ring-2 ring-red-100'
                        : 'border-slate-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Car className="w-4 h-4 text-[#C62139]" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">AC Sedan (Dzire / Etios)</div>
                        <div className="text-2xs text-slate-500">Up to 4 Passengers • 2 Luggage</div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      ₹ {tour.vehiclePricing.sedan.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedVehicle('innova')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedVehicle === 'innova'
                        ? 'border-[#C62139] bg-white ring-2 ring-red-100'
                        : 'border-slate-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Car className="w-4 h-4 text-[#C62139]" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Innova SUV / Crysta</div>
                        <div className="text-2xs text-slate-500">6 - 7 Passengers • Ideal for Ghats</div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      ₹ {tour.vehiclePricing.innova.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedVehicle('tempoTraveller')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedVehicle === 'tempoTraveller'
                        ? 'border-[#C62139] bg-white ring-2 ring-red-100'
                        : 'border-slate-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-[#C62139]" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Tempo Traveller (12-14S)</div>
                        <div className="text-2xs text-slate-500">Group Comfort • Reclining Seats</div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      ₹ {tour.vehiclePricing.tempoTraveller.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Booking Inputs */}
                <form onSubmit={handleBookNow} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                      Number of Passengers
                    </label>
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="1-2">1 - 2 Persons</option>
                      <option value="3-4">3 - 4 Persons</option>
                      <option value="5-7">5 - 7 Persons</option>
                      <option value="8-12">8 - 12 Persons</option>
                      <option value="13+">13+ Persons (Tempo Traveller)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 mt-2"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Book via WhatsApp ({GETGO_CONTACT.phoneFormatted})</span>
                  </button>

                  <a
                    href={`tel:${GETGO_CONTACT.phone}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 text-center"
                  >
                    <span>Instant Call Booking: {GETGO_CONTACT.phoneFormatted}</span>
                  </a>
                </form>

                {/* Trust Badges */}
                <div className="pt-3 border-t border-slate-200 text-2xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free cancellation up to 12 hours before pickup</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Car className="w-3.5 h-3.5 text-[#C62139]" />
                    <span>Sanitized vehicle with verified mountain driver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
