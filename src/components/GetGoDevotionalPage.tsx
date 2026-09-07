import { type MouseEvent } from 'react';
import { CheckCircle2, Eye, MapPin, Phone, Star } from 'lucide-react';
import { DEVOTIONAL_TOURS, TourPackageItem, GETGO_CONTACT } from '../data/tourData';

interface GetGoDevotionalPageProps {
  onSelectTour: (tour: TourPackageItem) => void;
}

export default function GetGoDevotionalPage({ onSelectTour }: GetGoDevotionalPageProps) {
  const handleQuickBook = (tour: TourPackageItem, e: MouseEvent) => {
    e.stopPropagation();
    const text = `*Devotional Tour Booking Inquiry - ${tour.title}*%0A` +
      `*Duration:* ${tour.duration}%0A` +
      `*Starting Fare:* ₹${tour.priceFrom.toLocaleString('en-IN')}%0A%0A` +
      `Hello GetGo Taxi, I am planning a pilgrimage trip for my family. Please share details.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src="/assets/img/tours/devotional/isha-yoga-centre/card.jpg" alt="Devotional" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C62139] text-white text-xs font-bold uppercase">
            <span>Spiritual & Temple Pilgrimages</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Devotional Tour Packages from Coimbatore
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
            Customised spiritual journeys to the Arupadaiveedu of Lord Murugan (Palani, Thiruchendur), the holy Jyotirlinga of Rameswaram, Madurai Meenakshi Amman, and Isha Adiyogi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Popular Temple Circuits
            </h2>
            <p className="text-xs text-slate-500">
              Comfortable AC Sedans, Innovas, and Tempo Travellers with patient drivers for elderly family members.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-bold">
            {DEVOTIONAL_TOURS.length} Pilgrimage Circuits
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVOTIONAL_TOURS.map((tour) => (
            <div
              key={tour.id}
              onClick={() => onSelectTour(tour)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
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

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-2xs font-bold">
                    {tour.duration}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-amber-400 text-slate-900 text-2xs font-black flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-slate-900" />
                  <span>{tour.rating}</span>
                  <span className="font-normal text-slate-800">({tour.reviewCount})</span>
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#C62139] text-white text-xs font-black shadow-md">
                  ₹ {tour.priceFrom.toLocaleString('en-IN')} <span className="text-2xs font-normal opacity-90">/ cab</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#C62139] transition leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {tour.overview}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  {tour.keyHighlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-2xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>

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
    </div>
  );
}
