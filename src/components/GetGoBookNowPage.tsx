import { useState, FormEvent } from 'react';
import { Calendar, Phone, MessageSquare, ShieldCheck, Car, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import AddressAutocomplete from './AddressAutocomplete';
import { trackWhatsAppClick, trackPhoneCall, trackBookingSubmit } from '../utils/analytics';

export default function GetGoBookNowPage() {
  const [bookingType, setBookingType] = useState<'local' | 'hourly' | 'oneway' | 'outstation'>('local');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [passengerCount, setPassengerCount] = useState('1');
  const [vehicle, setVehicle] = useState('sedan');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [hourlyPackage, setHourlyPackage] = useState('4hr-40km');

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackBookingSubmit('book_now_page', { bookingType, pickup, destination, vehicle, date, time });

    const text = `*GetGo Taxi Online Booking*%0A` +
      `*Type:* ${bookingType.toUpperCase()}%0A` +
      `*Pickup:* ${pickup || 'Not Specified'}%0A` +
      `*Destination / Package:* ${bookingType === 'hourly' ? hourlyPackage : (destination || 'Coimbatore Local')}%0A` +
      `*Cab:* ${vehicle.toUpperCase()}%0A` +
      `*Passengers:* ${passengerCount}%0A` +
      `*Date & Time:* ${date} @ ${time}%0A` +
      `Hello GetGo Taxi, please confirm my booking instantly.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#C62139] text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          Instant Online Taxi & Cab Booking
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Book Your GetGo Taxi Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          Fill out the quick booking form below for immediate driver assignment and instant fare calculation with zero hidden charges.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          {/* Booking Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setBookingType('local')}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                bookingType === 'local'
                  ? 'bg-[#C62139] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Local Drop
            </button>
            <button
              type="button"
              onClick={() => setBookingType('hourly')}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                bookingType === 'hourly'
                  ? 'bg-[#C62139] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Hourly Rental
            </button>
            <button
              type="button"
              onClick={() => setBookingType('oneway')}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                bookingType === 'oneway'
                  ? 'bg-[#C62139] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              One-Way Drop
            </button>
            <button
              type="button"
              onClick={() => setBookingType('outstation')}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                bookingType === 'outstation'
                  ? 'bg-[#C62139] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Outstation
            </button>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AddressAutocomplete
                label="Pickup Address / Landmark"
                value={pickup}
                onChange={setPickup}
                placeholder="e.g. Gandhipuram / Airport / RS Puram"
              />

              {bookingType !== 'hourly' ? (
                <AddressAutocomplete
                  label="Destination Address / City"
                  value={destination}
                  onChange={setDestination}
                  placeholder="e.g. Ooty / Tiruppur / Bangalore"
                />
              ) : (
                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Hourly Package</label>
                  <select
                    value={hourlyPackage}
                    onChange={(e) => setHourlyPackage(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white font-medium"
                  >
                    <option value="2hr-20km">2 Hours / 20 KM — ₹599</option>
                    <option value="4hr-40km">4 Hours / 40 KM — ₹1,199</option>
                    <option value="8hr-80km">8 Hours / 80 KM — ₹2,299</option>
                    <option value="12hr-120km">12 Hours / 120 KM — ₹3,299</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Select Cab</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white font-medium"
                >
                  <option value="sedan">AC Dzire / Etios (4 Seats)</option>
                  <option value="innova">Innova SUV (6-7 Seats)</option>
                  <option value="crysta">Innova Crysta Executive</option>
                  <option value="tempo">Tempo Traveller (12-20 Seats)</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Pickup Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl bg-white font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-black text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 fill-white text-[#C62139]" />
                <span>Book Now & Get Driver Confirmation via WhatsApp</span>
              </button>
            </div>
          </form>

          <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between text-2xs text-slate-500 gap-2">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Cancellation Fee</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>24/7 Phone Desk Available</span>
            </div>
            <a
              href={`tel:${GETGO_CONTACT.phone}`}
              onClick={() => trackPhoneCall('book_now_direct_call')}
              className="text-[#C62139] font-bold hover:underline"
            >
              Or Call {GETGO_CONTACT.phoneFormatted}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
