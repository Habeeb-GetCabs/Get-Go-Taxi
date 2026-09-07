import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Zap } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import { POINT_TO_POINT_ROUTES } from '../data/getgoData';
import AddressAutocomplete from './AddressAutocomplete';
import { trackWhatsAppClick, trackPhoneCall, trackBookingSubmit } from '../utils/analytics';

export default function GetGoOneWayPage() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('sedan');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleOneWaySubmit = (e: FormEvent) => {
    e.preventDefault();
    trackBookingSubmit('oneway_page', { pickup, destination, vehicle, date });
    const text = `*One Way Drop Taxi Request*%0A` +
      `*From:* ${pickup}%0A` +
      `*To:* ${destination}%0A` +
      `*Cab:* ${vehicle.toUpperCase()}%0A` +
      `*Date:* ${date}%0A` +
      `Hello GetGo Taxi, I want to book a one-way drop taxi. Please share the net price.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-slate-950" />
              Pay Only For One Way — Save up to 50%
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              One-Way Drop Taxi — Coimbatore & Tiruppur
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Why pay for return charges when traveling one-way? GetGo Taxi offers low-cost drop taxis from Coimbatore, Tiruppur, and Erode to Bangalore, Chennai, Salem, Madurai, Trichy, and Kochi with clean AC cabs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${GETGO_CONTACT.phone}`}
                onClick={() => trackPhoneCall('oneway_hero')}
                className="px-6 py-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call {GETGO_CONTACT.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-2">
            Instant One-Way Drop Booking
          </h2>
          <form onSubmit={handleOneWaySubmit} className="space-y-4">
            <AddressAutocomplete
              label="Pickup Location"
              value={pickup}
              onChange={setPickup}
              placeholder="e.g. Coimbatore Railway Station"
            />
            <AddressAutocomplete
              label="Drop Location"
              value={destination}
              onChange={setDestination}
              placeholder="e.g. Bangalore Airport / Silk Board"
            />
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Select Cab</label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white font-medium"
              >
                <option value="sedan">AC Dzire / Etios (4 Seater)</option>
                <option value="innova">Innova / Ertiga (6 Seater)</option>
                <option value="crysta">Innova Crysta (7 Seater)</option>
              </select>
            </div>
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Date of Journey</label>
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
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition"
            >
              Book One-Way Drop via WhatsApp
            </button>
          </form>
        </div>

        {/* Popular One-Way Fixed Fares List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-black text-slate-900">Popular One-Way Fixed Fares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POINT_TO_POINT_ROUTES.slice(0, 6).map((route) => (
              <div key={route.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#C62139] transition space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{route.from} to {route.to}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold">{route.distanceKm} km</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                  <span className="text-slate-500 font-medium">Sedan Fare:</span>
                  <span className="font-extrabold text-[#C62139]">₹{route.sedanFareEst.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Innova Fare:</span>
                  <span className="font-extrabold text-slate-900">₹{route.innovaFareEst.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    trackWhatsAppClick(`oneway_${route.id}`);
                    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20I%20want%20to%20book%20one-way%20drop%20from%20${route.from}%20to%20${route.to}.`, '_blank');
                  }}
                  className="w-full mt-2 py-2 rounded-xl bg-slate-900 hover:bg-[#C62139] text-white font-bold text-2xs transition"
                >
                  Book This Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
