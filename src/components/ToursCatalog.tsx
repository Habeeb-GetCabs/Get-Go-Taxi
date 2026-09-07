import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Clock, Compass, MapPin, MessageSquare, Phone, ShieldCheck, Tag } from 'lucide-react';
import { CONTACT_INFO, TOUR_PACKAGES } from '../data/getgoData';
import { TourPackage } from '../types';

export default function ToursCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTourId, setExpandedTourId] = useState<string | null>('ooty-queen-of-hills');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Destinations (11)' },
    { id: 'hill-station', label: 'Hill Stations (5)' },
    { id: 'pilgrimage', label: 'Pilgrimage & Sacred (4)' },
    { id: 'heritage', label: 'Heritage & Palaces (1)' },
    { id: 'nature-wildlife', label: 'Wildlife & Nature (1)' },
  ];

  const filteredTours = TOUR_PACKAGES.filter((tour) => {
    const matchesCat = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.keyAttractions.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTourId(expandedTourId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Doorstep Pickup from Coimbatore, Tiruppur & Palladam
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tours & Outstation Holiday Packages</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Customizable 1-day, 2-day, and multi-day holiday packages with hill-experienced drivers in AC Sedan, Innova, and Tempo Traveller cabs.
          </p>
        </div>

        {/* Quick Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search Ooty, Munnar, Temple..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition border ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tours List */}
      <div className="space-y-4">
        {filteredTours.map((tour) => {
          const isExpanded = expandedTourId === tour.id;
          const whatsappTourLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20package.%20Please%20share%20availability%20and%20details!`;

          return (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs transition-all hover:border-slate-300 overflow-hidden"
            >
              {/* Tour Summary Row */}
              <div
                onClick={() => toggleExpand(tour.id)}
                className="p-5 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                      {tour.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {tour.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {tour.distanceFromCoimbatore}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{tour.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{tour.overview}</p>
                </div>

                {/* Price Pill & Expand Button */}
                <div className="flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <div className="text-2xs text-slate-400 font-bold uppercase">Sedan Package From</div>
                    <div className="text-xl font-extrabold text-amber-600">
                      ₹{tour.vehiclePricing.sedanEstimate.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                    aria-label="Expand tour details"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Detailed Itinerary and Pricing Expansion */}
              {isExpanded && (
                <div className="p-6 bg-slate-50/60 border-t border-slate-200 space-y-6">
                  {/* Route & Best Time Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <strong className="text-slate-900">Ghat & Highway Route:</strong>
                      <span className="text-slate-600 ml-1">{tour.routeHighlight}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900">Recommended Season:</strong>
                      <span className="text-slate-600 ml-1">{tour.bestTimeToVisit}</span>
                    </div>
                  </div>

                  {/* Key Attractions Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Sightseeing Attractions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.keyAttractions.map((attr, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                        >
                          📍 {attr}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Day by Day Itinerary */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Suggested Day-by-Day Itinerary
                    </h4>
                    <div className="space-y-2.5">
                      {tour.suggestedItinerary.map((itinerary) => (
                        <div
                          key={itinerary.day}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3"
                        >
                          <div className="sm:w-24 shrink-0">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900 text-white font-bold text-xs">
                              Day {itinerary.day}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="font-bold text-slate-900 text-sm">{itinerary.title}</div>
                            <p className="text-xs text-slate-600 leading-relaxed">{itinerary.description}</p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {itinerary.places.map((place, i) => (
                                <span key={i} className="text-2xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                  {place}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Pricing Tier Comparison */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Vehicle Class Pricing Estimates
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="text-xs font-bold text-slate-500">AC Sedan Taxi (Dzire/Etios)</div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">
                          ₹{tour.vehiclePricing.sedanEstimate.toLocaleString('en-IN')}
                        </div>
                        <div className="text-2xs text-slate-500 mt-1">Up to 4 passengers · AC included</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-amber-300 ring-1 ring-amber-300 shadow-2xs">
                        <div className="text-xs font-bold text-amber-800">Toyota Innova / SUV (6-7 Seats)</div>
                        <div className="text-lg font-black text-amber-700 mt-0.5">
                          ₹{tour.vehiclePricing.innovaEstimate.toLocaleString('en-IN')}
                        </div>
                        <div className="text-2xs text-amber-800 mt-1">Spacious family comfort & luggage</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <div className="text-xs font-bold text-slate-500">12-Seater Tempo Traveller</div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">
                          ₹{tour.vehiclePricing.tempoTravellerEstimate.toLocaleString('en-IN')}
                        </div>
                        <div className="text-2xs text-slate-500 mt-1">Group travel & high roof push-back</div>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions & Exclusions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900">
                      <div className="font-bold flex items-center gap-1.5 mb-1.5 text-emerald-950">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Package Inclusions
                      </div>
                      <ul className="space-y-1 list-disc list-inside">
                        {tour.inclusions.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
                      <div className="font-bold mb-1.5 text-slate-900">Exclusions (Charged at actuals)</div>
                      <ul className="space-y-1 list-disc list-inside">
                        {tour.exclusions.map((exc, i) => (
                          <li key={i}>{exc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-slate-500">
                      Doorstep pickup from anywhere in Coimbatore, Tiruppur, or Palladam.
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={whatsappTourLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Book on WhatsApp
                      </a>
                      <a
                        href={`tel:${CONTACT_INFO.phonePrimary}`}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call +91 90801 51265
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
