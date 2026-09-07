import { useState, type FormEvent } from 'react';
import { Clock, Mail, MapPin, MessageSquare, Phone, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import AddressAutocomplete from './AddressAutocomplete';

export default function GetGoContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `*New Travel Enquiry - GetGo Taxi*%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Pickup:* ${pickup}%0A` +
      `*Destination:* ${destination}%0A` +
      `*Travel Date:* ${date}%0A` +
      `*Message / Notes:* ${message}%0A%0A` +
      `Please provide the best quote and vehicle options.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C62139] text-white text-xs font-bold uppercase">
            <span>24/7 Booking & Support Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Talk to Our Travel Team
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
            Book a cab, get a custom hill station holiday quote, or plan corporate & family travel anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
                Get In Touch
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Office & Dispatch Hubs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Our fleet is strategically stationed across Coimbatore, Tiruppur, and Palladam for swift response.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 text-[#C62139] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Registered Office Address</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {GETGO_CONTACT.address.line1}, {GETGO_CONTACT.address.area},<br />
                    {GETGO_CONTACT.address.city} - {GETGO_CONTACT.address.pincode},<br />
                    {GETGO_CONTACT.address.state}, {GETGO_CONTACT.address.country}
                  </p>
                  <div className="text-2xs text-slate-400 mt-1">
                    Hubs: Coimbatore Gandhipuram • Peelamedu • Tiruppur Old Bus Stand • Palladam
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">24/7 Phone & Hotline</h3>
                  <a
                    href={`tel:${GETGO_CONTACT.phone}`}
                    className="text-base font-black text-[#C62139] hover:underline block mt-0.5"
                  >
                    {GETGO_CONTACT.phoneFormatted}
                  </a>
                  <p className="text-2xs text-slate-500 mt-0.5">
                    Contact Person: {GETGO_CONTACT.contactPerson} • Available 24 Hours
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Official Email</h3>
                  <a
                    href={`mailto:${GETGO_CONTACT.email}`}
                    className="text-sm font-bold text-slate-800 hover:text-[#C62139] block mt-0.5"
                  >
                    {GETGO_CONTACT.email}
                  </a>
                  <p className="text-2xs text-slate-500 mt-0.5">
                    For corporate tenders, hotel affiliations & long-term agreements
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Clock className="w-4 h-4 text-[#C62139]" />
                <span>Operating Hours: 24 Hours / 7 Days a Week (365 Days)</span>
              </div>
              <p className="text-2xs text-slate-500">
                Night travel pickups, express airport departures, and early morning temple circuits accommodated around the clock.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">Send a Travel Enquiry</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out this short form to receive a quote with cab options via WhatsApp.
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Enquiry dispatched! We will connect on WhatsApp within minutes.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                      Contact Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <AddressAutocomplete
                      id="contact-pickup"
                      label="Pickup Hub / City"
                      value={pickup}
                      onChange={setPickup}
                      placeholder="e.g. Gandhipuram / Airport / Ukkadam"
                      required
                    />
                  </div>

                  <div>
                    <AddressAutocomplete
                      id="contact-destination"
                      label="Destination / Tour"
                      value={destination}
                      onChange={setDestination}
                      placeholder="e.g. Ooty / Munnar / Bangalore / Airport"
                      required
                      isDestination
                      iconColor="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                    Expected Travel Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                    Trip Notes / Passenger Count
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. 4 Adults + 1 Child, looking for Innova with hotel recommendations in Ooty"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send WhatsApp Travel Enquiry</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
