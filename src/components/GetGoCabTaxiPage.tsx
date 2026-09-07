import { useState } from 'react';
import {
  Car,
  Check,
  CheckCircle2,
  Clock,
  Fuel,
  Info,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

interface GetGoCabTaxiPageProps {
  onOpenBooking: () => void;
}

export default function GetGoCabTaxiPage({ onOpenBooking }: GetGoCabTaxiPageProps) {
  const [activeTab, setActiveTab] = useState<'outstation' | 'hourly' | 'airport'>('outstation');

  const fleet = [
    {
      name: 'Sedan (Swift Dzire / Toyota Etios)',
      image: '/assets/img/hero/h2.jpg',
      type: 'Sedan',
      seats: '4 Passengers + 1 Driver',
      luggage: '2 Large Bags + 2 Hand Bags',
      ac: true,
      perKmOutstation: '₹ 16 / km',
      driverBata: '₹ 500 / day',
      hourlyPackages: [
        { hours: '4 Hrs / 40 Km', rate: '₹ 1,400' },
        { hours: '8 Hrs / 80 Km', rate: '₹ 2,800' },
        { hours: '12 Hrs / 120 Km', rate: '₹ 4,200' },
      ],
      airportTransfer: '₹ 950 (Coimbatore Airport to City / RS Puram / Gandhipuram)',
      idealFor: 'Couples, solo travelers, small families, airport and corporate drops',
    },
    {
      name: 'Innova SUV / Ertiga',
      image: '/assets/img/categories/c5.jpg',
      type: 'SUV',
      seats: '6 - 7 Passengers + 1 Driver',
      luggage: '4 Large Bags',
      ac: true,
      perKmOutstation: '₹ 16 / km',
      driverBata: '₹ 500 / day',
      hourlyPackages: [
        { hours: '4 Hrs / 40 Km', rate: '₹ 1,700' },
        { hours: '8 Hrs / 80 Km', rate: '₹ 3,200' },
        { hours: '12 Hrs / 120 Km', rate: '₹ 4,200' },
      ],
      airportTransfer: '₹ 1,450 (Coimbatore Airport to City)',
      idealFor: 'Family hill trips, Ooty ghat climbs, pilgrimage journeys, luggage room',
    },
    {
      name: 'Innova Crysta Premium',
      image: '/assets/img/hero/h1.jpg',
      type: 'Luxury SUV',
      seats: '6 - 7 Captain Seats + 1 Driver',
      luggage: '4 Large Bags',
      ac: true,
      perKmOutstation: '₹ 19 / km',
      driverBata: '₹ 600 / day',
      hourlyPackages: [
        { hours: '4 Hrs / 40 Km', rate: '₹ 2,200' },
        { hours: '8 Hrs / 80 Km', rate: '₹ 4,200' },
        { hours: '12 Hrs / 120 Km', rate: '₹ 5,400' },
      ],
      airportTransfer: '₹ 1,800 (Executive Transfer)',
      idealFor: 'VIP delegates, corporate executives, premium weddings, long distance outstation',
    },
    {
      name: 'Tempo Traveller (12 - 20 Seater)',
      image: '/assets/img/hero/h3.jpg',
      type: 'Mini Bus / Van',
      seats: '12 to 20 Recliner Seats + 1 Driver',
      luggage: 'Dedicated rear luggage boot',
      ac: true,
      perKmOutstation: '₹ 22 - ₹ 26 / km',
      driverBata: '₹ 700 / day',
      hourlyPackages: [
        { hours: '4 Hrs / 40 Km', rate: '₹ 2,800' },
        { hours: '8 Hrs / 80 Km', rate: '₹ 5,400' },
        { hours: '12 Hrs / 120 Km', rate: '₹ 7,200' },
      ],
      airportTransfer: '₹ 2,600 (Group Airport Transfer)',
      idealFor: 'College excursions, wedding guest transfers, joint family temple tours',
    },
  ];

  const popularRoutes = [
    { from: 'Coimbatore', to: 'Ooty / Coonoor', distance: '86 km', time: '2.5 hrs', sedan: '₹ 2,400', innova: '₹ 3,500' },
    { from: 'Coimbatore', to: 'Isha Yoga Adiyogi', distance: '32 km', time: '50 mins', sedan: '₹ 1,300', innova: '₹ 1,900' },
    { from: 'Coimbatore', to: 'Munnar', distance: '160 km', time: '4.5 hrs', sedan: '₹ 4,200', innova: '₹ 5,800' },
    { from: 'Coimbatore', to: 'Valparai', distance: '105 km', time: '3.5 hrs', sedan: '₹ 3,100', innova: '₹ 4,400' },
    { from: 'Coimbatore', to: 'Palani Temple', distance: '105 km', time: '2.5 hrs', sedan: '₹ 2,800', innova: '₹ 3,900' },
    { from: 'Coimbatore', to: 'Kodaikanal', distance: '175 km', time: '4.5 hrs', sedan: '₹ 4,500', innova: '₹ 6,200' },
    { from: 'Tiruppur', to: 'Coimbatore Airport', distance: '45 km', time: '1 hr', sedan: '₹ 1,400', innova: '₹ 2,100' },
    { from: 'Tiruppur', to: 'Ooty', distance: '110 km', time: '3 hrs', sedan: '₹ 3,200', innova: '₹ 4,500' },
  ];

  const handleBookCab = (cabName: string) => {
    const text = `*Cab Booking Enquiry - ${cabName}*%0A` +
      `Hello GetGo Taxi, I would like to book this vehicle. Please let me know availability and estimated tariff.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/assets/img/hero/h2.jpg" alt="Fleet" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C62139] text-white text-xs font-bold uppercase">
            <span>Official Fleet & Tariff Rates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Cab & Taxi Services in Coimbatore
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
            Guaranteed clean, sanitized vehicles with certified ghat-road drivers for local hourly rentals, airport transfers, and outstation trips across South India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Fleet Pricing Cards */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Choose The Right Vehicle
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Transparent Fleet Tariffs
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Clear upfront pricing with no hidden surcharges.
            </p>
          </div>

          {/* Toll, Permit, Parking Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <span className="font-bold">⚠️ Note:</span>
              <span className="font-medium">Toll, state permit & parking charges extra if applicable for outstation and one-way drops.</span>
            </div>
            <span className="hidden sm:inline-block font-bold text-2xs uppercase tracking-wider text-amber-950 bg-amber-100 px-2 py-0.5 rounded">
              Government Receipts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fleet.map((car, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition bg-white flex flex-col justify-between"
              >
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-[#C62139] text-2xs font-bold uppercase">
                        {car.type}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{car.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xs text-slate-700 block font-bold uppercase">Outstation</span>
                      <span className="text-lg font-black text-[#C62139]">{car.perKmOutstation}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{car.seats}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span>{car.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Chilled AC & Music</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Driver Bata: {car.driverBata}</span>
                    </div>
                  </div>

                  <p className="text-2xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong>Best suited for:</strong> {car.idealFor}
                  </p>

                  {/* Hourly Packages Table */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-2xs font-bold uppercase text-slate-400">Local Hourly Rates</span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {car.hourlyPackages.map((pkg, pIdx) => (
                        <div key={pIdx} className="p-2 rounded-lg bg-slate-100/70 border border-slate-200">
                          <div className="text-2xs text-slate-500 font-medium">{pkg.hours}</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">{pkg.rate}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div className="text-2xs text-slate-600">
                    <span className="font-bold text-slate-900">Airport transfer:</span> {car.airportTransfer}
                  </div>
                  <button
                    onClick={() => handleBookCab(car.name)}
                    className="px-4 py-2 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Book Cab</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Routes Matrix */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Most Popular Cabs Routes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular Routes from Coimbatore & Tiruppur
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              One-way and round-trip indicative tariffs with door-to-door pickup.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5">From</th>
                  <th className="p-3.5">Destination</th>
                  <th className="p-3.5">Approx Distance</th>
                  <th className="p-3.5">Driving Time</th>
                  <th className="p-3.5">Sedan Fare</th>
                  <th className="p-3.5">Innova Fare</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {popularRoutes.map((route, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">{route.from}</td>
                    <td className="p-3.5 font-bold text-[#C62139]">{route.to}</td>
                    <td className="p-3.5 text-slate-600">{route.distance}</td>
                    <td className="p-3.5 text-slate-600">{route.time}</td>
                    <td className="p-3.5 font-bold text-slate-800">{route.sedan}</td>
                    <td className="p-3.5 font-bold text-slate-800">{route.innova}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => {
                          const text = `*Booking Inquiry:* Cab from ${route.from} to ${route.to} (${route.distance})`;
                          window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#C62139] text-white font-bold text-2xs hover:bg-[#9E1B2E] transition"
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
