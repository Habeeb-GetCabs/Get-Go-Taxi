import { useState, FormEvent } from 'react';
import { Plane, Clock, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import AddressAutocomplete from './AddressAutocomplete';
import { trackWhatsAppClick, trackPhoneCall, trackBookingSubmit } from '../utils/analytics';

export default function GetGoAirportPage() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('sedan');
  const [flightNo, setFlightNo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAirportSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackBookingSubmit('airport_page', { pickup, destination, vehicle, flightNo });
    const text = `*Coimbatore Airport Taxi Booking Request*%0A` +
      `*Pickup:* ${pickup}%0A` +
      `*Drop:* ${destination}%0A` +
      `*Vehicle:* ${vehicle.toUpperCase()}%0A` +
      `*Flight No / Time:* ${flightNo || 'N/A'} on ${date}%0A` +
      `Hello GetGo Taxi, please confirm my airport transfer cab.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-[#C62139] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Plane className="w-4 h-4" />
              Coimbatore Airport (CJB) 24/7 Taxi Service
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Reliable Coimbatore Airport Taxi Pickups & Drops
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Arrive stress-free! On-time doorstep pickups & airport transfers across Gandhipuram, Peelamedu, RS Puram, Saravanampatti, Tiruppur, Pollachi, Mettupalayam, and Ooty. Flight tracking & driver assistance included.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${GETGO_CONTACT.phone}`}
                onClick={() => trackPhoneCall('airport_hero')}
                className="px-6 py-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Airport Desk {GETGO_CONTACT.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-2">
            Book 24/7 Airport Taxi
          </h2>
          <form onSubmit={handleAirportSubmit} className="space-y-4">
            <AddressAutocomplete
              label="Pickup Location"
              value={pickup}
              onChange={setPickup}
              placeholder="e.g. Coimbatore Airport / Hotel"
            />
            <AddressAutocomplete
              label="Drop Location"
              value={destination}
              onChange={setDestination}
              placeholder="e.g. RS Puram / Peelamedu / Tiruppur"
            />
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Flight Number / Arrival Time</label>
              <input
                type="text"
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
                placeholder="e.g. 6E-241 @ 10:30 AM"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Vehicle Class</label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium"
              >
                <option value="sedan">Sedan (AC Dzire / Etios) — Up to 4 Pax</option>
                <option value="innova">Innova SUV — Up to 7 Pax</option>
                <option value="crysta">Innova Crysta Executive</option>
              </select>
            </div>
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-black text-xs sm:text-sm shadow-md transition"
            >
              Confirm Airport Cab via WhatsApp
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Why Travelers Choose GetGo Airport Cabs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Clock className="w-4 h-4 text-[#C62139]" />
                <span>Zero Flight Delay Penalty</span>
              </div>
              <p className="text-xs text-slate-600">
                We track your incoming flight status live. Even if your flight is delayed, your chauffeur will be waiting inside the arrival zone.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Fixed Transparent Pricing</span>
              </div>
              <p className="text-xs text-slate-600">
                No meter tampering, no midnight surge charges. Flat transparent fares for all city drops and outstation transfers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Sanitized Executive Fleet</span>
              </div>
              <p className="text-xs text-slate-600">
                Clean, AC vehicles equipped with spacious boot space for international & domestic heavy luggage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
