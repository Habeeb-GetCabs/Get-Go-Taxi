import { useState, useMemo, FormEvent } from 'react';
import { ShieldCheck, Phone, Car, MapPin, CheckCircle2, Star, Clock, Shield, MessageSquare } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import AddressAutocomplete from './AddressAutocomplete';
import { trackWhatsAppClick, trackPhoneCall, trackBookingSubmit } from '../utils/analytics';
import { calculateFinalFare } from '../utils/fareCalculation';

export default function GetGoOutstationPage() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('sedan');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const hasLocations = Boolean(pickup.trim() && destination.trim());

  const fareResult = useMemo(() => {
    return calculateFinalFare({
      tripType: tripType === 'roundtrip' ? 'outstation' : 'oneway',
      pickup,
      drop: destination,
      vehicleType: vehicle === 'sedan' ? 'Sedan' : (vehicle === 'innova' ? 'Innova' : 'Tempo Traveller'),
      days: 1,
    });
  }, [tripType, pickup, destination, vehicle]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackBookingSubmit('outstation_page', { pickup, destination, vehicle, tripType });

    const fareLine = fareResult.isCustomQuote
      ? `*Rate Request:* Call / WhatsApp for Best Discount Rate%0A`
      : `*Estimated Final Fare (Sedan):* ₹${fareResult.finalFare.toLocaleString('en-IN')}%0A`;

    const text = `*Outstation Taxi Booking Request*%0A` +
      `*Trip:* ${pickup} to ${destination} (${tripType === 'roundtrip' ? 'Round Trip' : 'One Way Drop'})%0A` +
      `*Vehicle:* ${vehicle.toUpperCase()}%0A` +
      `*Travel Date:* ${date}%0A` +
      fareLine +
      `Hello GetGo Taxi, please send estimated fare & confirm driver availability.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-12">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C62139] text-white text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              Nilgiris & Ghat Road Certified Outstation Cabs
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              GetGo Outstation Cabs — Round Trip & Outstation Drops
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Safe, comfortable, and affordable outstation taxis from Coimbatore and Tiruppur to Ooty, Coonoor, Kodaikanal, Munnar, Bangalore, Chennai, Mysore, and Madurai. Zero surge pricing with experienced mountain drivers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${GETGO_CONTACT.phone}`}
                onClick={() => trackPhoneCall('outstation_hero')}
                className="px-6 py-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm shadow-lg transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call {GETGO_CONTACT.phoneFormatted}</span>
              </a>
              <button
                onClick={() => {
                  trackWhatsAppClick('outstation_hero');
                  window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20I%20need%20an%20outstation%20cab%20quote.`, '_blank');
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition flex items-center gap-2"
              >
                <span>WhatsApp Instant Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form & Tariff Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quick Outstation Estimator */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900">Instant Outstation Booking</h2>
            <p className="text-2xs text-slate-500">Get guaranteed driver & vehicle assignment in 5 minutes</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                  tripType === 'roundtrip'
                    ? 'bg-[#C62139] text-white border-[#C62139]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                  tripType === 'oneway'
                    ? 'bg-[#C62139] text-white border-[#C62139]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                One Way Drop
              </button>
            </div>

            <AddressAutocomplete
              label="Pickup Location"
              value={pickup}
              onChange={setPickup}
              placeholder="e.g. Coimbatore Airport / Gandhipuram"
            />

            <AddressAutocomplete
              label="Destination City"
              value={destination}
              onChange={setDestination}
              placeholder="e.g. Ooty / Kodaikanal / Bangalore"
            />

            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Select Cab Type</label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium"
              >
                <option value="sedan">AC Dzire / Etios (4 Seats) — ₹16/km (Instant Quote)</option>
                <option value="innova">Innova SUV / Crysta (6-7 Seats) — Call/WhatsApp for Rates</option>
                <option value="tempo">Tempo Traveller (12-14 Seats) — Call/WhatsApp for Rates</option>
              </select>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Travel Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>

            {fareResult.isCustomQuote ? (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl">
                  <span className="text-3xs font-black uppercase text-amber-900 block">Fleet Direct Tariff</span>
                  <div className="text-amber-950 font-bold text-sm">Call or WhatsApp for Best Rates</div>
                  <span className="text-2xs text-amber-800">Special discount rates available for {vehicle.toUpperCase()}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-100" />
                    <span>WhatsApp for Rate</span>
                  </button>
                  <a
                    href={`tel:${GETGO_CONTACT.phone}`}
                    className="w-full py-3 px-2 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Call Dispatch</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-3xs font-black uppercase text-slate-500 block">Estimated Final Fare (Sedan)</span>
                    <div className="text-lg font-black text-[#C62139]">
                      {hasLocations ? `₹${fareResult.finalFare.toLocaleString('en-IN')}` : 'Enter pickup & drop'}
                    </div>
                  </div>
                  <span className="text-3xs bg-amber-100 border border-amber-300 px-2 py-0.5 rounded font-bold text-amber-900">
                    {fareResult.disclaimer}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>
                    {hasLocations
                      ? `Book Sedan at ₹${fareResult.finalFare.toLocaleString('en-IN')}`
                      : 'Get Fare & Book via WhatsApp'}
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right: Tariff Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Outstation Rate Card & Minimum Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#C62139]">Sedan Cabs</span>
                <span className="text-lg font-black text-slate-900">₹16 / km</span>
              </div>
              <p className="text-xs text-slate-600">Swift Dzire, Toyota Etios. Instant automated quote for 4 passengers.</p>
              <div className="text-2xs text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Min 250km/day limit • ₹500 Driver Batta/day</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#C62139]">Innova Crysta</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900">Call / WhatsApp</span>
              </div>
              <p className="text-xs text-slate-600">Premium 6-7 seater SUV. Contact dispatch for special seasonal rates.</p>
              <div className="text-2xs text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Min 300km/day limit • ₹500 Driver Batta/day</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#C62139]">Tempo Traveller</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900">Call / WhatsApp</span>
              </div>
              <p className="text-xs text-slate-600">12, 14, 20 seater luxury pushback seats for large families and groups.</p>
              <div className="text-2xs text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>Min 300km/day limit • ₹700 Driver Batta/day</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Transparent Guarantee</span>
              </div>
              <p className="text-2xs text-emerald-800 leading-relaxed">
                Zero surge pricing, zero hidden charges. Toll and state permit fees charged at actual government rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
