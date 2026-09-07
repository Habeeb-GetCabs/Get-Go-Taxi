import { useState } from 'react';
import {
  ArrowRight,
  Car,
  CheckCircle,
  Clock,
  Compass,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

interface GetGoPopularRoutesProps {
  onOpenBooking: (routeInfo?: string) => void;
}

export default function GetGoPopularRoutes({ onOpenBooking }: GetGoPopularRoutesProps) {
  const [activeCategory, setActiveCategory] = useState<'oneway' | 'outstation'>('oneway');

  const onewayRoutes = [
    { from: 'Coimbatore', to: 'Bangalore', distance: '360 km', duration: '6.5 hrs', sedan: '₹ 6,260', suv: '₹ 7,700', popular: true },
    { from: 'Coimbatore', to: 'Chennai', distance: '505 km', duration: '8.5 hrs', sedan: '₹ 8,580', suv: '₹ 10,600', popular: true },
    { from: 'Coimbatore', to: 'Salem', distance: '165 km', duration: '3.0 hrs', sedan: '₹ 3,140', suv: '₹ 4,100', popular: false },
    { from: 'Coimbatore', to: 'Madurai', distance: '215 km', duration: '4.0 hrs', sedan: '₹ 3,940', suv: '₹ 5,100', popular: false },
    { from: 'Coimbatore', to: 'Tiruchirappalli (Trichy)', distance: '215 km', duration: '4.2 hrs', sedan: '₹ 3,940', suv: '₹ 5,100', popular: false },
    { from: 'Coimbatore', to: 'Kochi / Ernakulam', distance: '190 km', duration: '4.5 hrs', sedan: '₹ 3,540', suv: '₹ 4,600', popular: false },
    { from: 'Coimbatore', to: 'Palani', distance: '105 km', duration: '2.5 hrs', sedan: '₹ 2,580', suv: '₹ 3,400', popular: false },
    { from: 'Coimbatore', to: 'Ooty (Drop)', distance: '86 km', duration: '2.5 hrs', sedan: '₹ 2,580', suv: '₹ 3,400', popular: true },
  ];

  const outstationFleets = [
    {
      name: 'Sedan (Swift Dzire / Etios)',
      seats: '4 Passengers',
      perKm: '₹ 16 / km',
      minKm: '250 km / day',
      bata: '₹ 500 / day',
      ideal: 'Budget outstation travel, family weekend trips, interstate business visits',
      tag: 'Best Economy • Fixed ₹16/km',
    },
    {
      name: 'SUV (Toyota Innova / Ertiga)',
      seats: '6-7 Passengers',
      perKm: '₹ 18 / km',
      minKm: '250 km / day',
      bata: '₹ 500 / day',
      ideal: 'Families with luggage, pilgrimage temple yatras, hill driving comfort',
      tag: 'Most Popular',
    },
    {
      name: 'Innova Crysta Luxury',
      seats: '6-7 Passengers (Captain Seats)',
      perKm: '₹ 21 / km',
      minKm: '250 km / day',
      bata: '₹ 600 / day',
      ideal: 'Executive VIP business, wedding family transit, ultra comfortable long journeys',
      tag: 'Premium Luxury',
    },
    {
      name: 'Tempo Traveller (12 - 20 Seater)',
      seats: '12 to 20 Recliner Seats',
      perKm: '₹ 24 - ₹ 28 / km',
      minKm: '300 km / day',
      bata: '₹ 700 / day',
      ideal: 'Joint families, college tours, wedding party travel, corporate retreats',
      tag: 'Group Travel',
    },
  ];

  const handleRouteBook = (from: string, to: string, sedanPrice: string) => {
    const text = `*One-Way Drop Taxi Booking*%0A%0A` +
      `*Pickup:* ${from}%0A` +
      `*Drop:* ${to}%0A` +
      `*Estimated Final Fare:* ${sedanPrice}%0A` +
      `*Note:* Toll, state permit & parking charges extra if applicable%0A%0A` +
      `Hello GetGo Taxi, please confirm cab booking with zero return fare charges.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header with Category Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#C62139] text-xs font-black uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5" />
              <span>Transparent Inter-City Fares</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular One-Way & Outstation Cab Tariffs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Guaranteed lowest one-way drop fares across South India with zero return kilometer penalty.
            </p>
          </div>

          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveCategory('oneway')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeCategory === 'oneway'
                  ? 'bg-[#C62139] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>One-Way Drop Taxi</span>
            </button>
            <button
              onClick={() => setActiveCategory('outstation')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeCategory === 'outstation'
                  ? 'bg-[#C62139] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Outstation Round-Trip</span>
            </button>
          </div>
        </div>

        {/* Toll, Permit, Parking Note Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <span className="font-bold">⚠️ Note:</span>
            <span>Toll, state permit & parking charges extra if applicable for outstation and one-way trips.</span>
          </div>
          <span className="hidden sm:inline-block font-semibold text-2xs uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            Receipt-Based Charges
          </span>
        </div>

        {/* Category 1: One-Way Routes Table / Cards */}
        {activeCategory === 'oneway' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {onewayRoutes.map((route, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs text-slate-400 font-bold mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {route.duration}
                    </span>
                    <span>{route.distance}</span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span>{route.from}</span>
                    </div>
                    <div className="w-0.5 h-3 bg-slate-200 ml-1"></div>
                    <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                      <div className="w-2 h-2 rounded-full bg-[#C62139]"></div>
                      <span>{route.to}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 mb-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-2xs">Sedan (Dzire):</span>
                      <span className="font-black text-slate-900">{route.sedan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-2xs">SUV (Innova):</span>
                      <span className="font-black text-[#C62139]">{route.suv}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRouteBook(route.from, route.to, route.sedan)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-[#C62139] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>Book One-Way Cab</span>
                  <ArrowRight className="w-3 h-3 text-amber-300" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Category 2: Outstation Round-Trip Fleet Tariffs */}
        {activeCategory === 'outstation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outstationFleets.map((fleet, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-[#C62139] text-2xs font-black uppercase tracking-wider inline-block mb-3">
                    {fleet.tag}
                  </span>
                  <h3 className="text-base font-black text-slate-900">{fleet.name}</h3>
                  <p className="text-2xs text-slate-500 mt-0.5">{fleet.seats}</p>

                  <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-500">Per Km:</span>
                      <span className="text-lg font-black text-slate-900">{fleet.perKm}</span>
                    </div>
                    <div className="flex justify-between text-2xs text-slate-600">
                      <span>Min Coverage:</span>
                      <span className="font-semibold text-slate-800">{fleet.minKm}</span>
                    </div>
                    <div className="flex justify-between text-2xs text-slate-600">
                      <span>Driver Bata:</span>
                      <span className="font-semibold text-slate-800">{fleet.bata}</span>
                    </div>
                  </div>

                  <p className="text-2xs text-slate-500 leading-relaxed">
                    {fleet.ideal}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(fleet.name)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white text-xs font-bold transition"
                  >
                    Calculate Outstation Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits bar */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pay Only for Distance Travelled</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Zero Return Fare for One-Way Drops</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Experienced Highway & Ghat Chauffeurs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>24/7 Verified Customer Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
