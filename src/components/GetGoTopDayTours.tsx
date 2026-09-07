import { type MouseEvent } from 'react';
import { Calendar, CheckCircle2, ChevronRight, Eye, MapPin, Phone, Star, Users } from 'lucide-react';
import { TourPackageItem, TOP_DAY_TOURS, GETGO_CONTACT } from '../data/tourData';

interface GetGoTopDayToursProps {
  onSelectTour: (tour: TourPackageItem) => void;
  onNavigate: (page: string) => void;
}

export default function GetGoTopDayTours({ onSelectTour, onNavigate }: GetGoTopDayToursProps) {
  const handleQuickBook = (tour: TourPackageItem, e: MouseEvent) => {
    e.stopPropagation();
    const text = `*Booking Inquiry for ${tour.title}*%0A` +
      `*Duration:* ${tour.duration}%0A` +
      `*Starting Price:* ₹${tour.priceFrom.toLocaleString('en-IN')}%0A%0A` +
      `Hello GetGo Taxi, I want to book this day tour. Please confirm cab availability and driver details.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Many Tourists Choose
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Top Coimbatore Day Tours
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Same-day sightseeing getaways from Coimbatore, Tiruppur, and Palladam with dedicated AC cab and local chauffeur.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('hill-stations')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#C62139] border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            >
              Hill Stations
            </button>
            <button
              onClick={() => onNavigate('devotional')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#C62139] border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            >
              Devotional
            </button>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_DAY_TOURS.map((tour) => (
            <div
              key={tour.id}
              onClick={() => onSelectTour(tour)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={tour.cardImage}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/img/hero/h1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                {/* Duration Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-2xs font-bold">
                    {tour.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-slate-800 text-2xs font-bold">
                    {tour.destinationsCount} Destinations
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-amber-400 text-slate-900 text-2xs font-black flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-slate-900" />
                  <span>{tour.rating}</span>
                  <span className="font-normal text-slate-800">({tour.reviewCount})</span>
                </div>

                {/* Starting Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#C62139] text-white text-xs font-black shadow-md flex items-center gap-1">
                  <span>₹ {tour.priceFrom.toLocaleString('en-IN')}</span>
                  <span className="text-2xs font-normal opacity-90">/ cab</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#C62139] transition leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {tour.overview}
                  </p>
                </div>

                {/* Highlights preview */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  {tour.keyHighlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-2xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTour(tour)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Itinerary</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickBook(tour, e)}
                    className="py-2 px-4 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
