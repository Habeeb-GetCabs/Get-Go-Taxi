import { useState, type FormEvent } from 'react';
import { Building2, CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send, ShieldCheck, User } from 'lucide-react';
import { CONTACT_INFO } from '../data/getgoData';

export default function ContactsDirectory() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Tour Package');
  const [pickupLocation, setPickupLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const waText = encodeURIComponent(
      `*New Inquiry from ${CONTACT_INFO.domain}*\nName: ${name}\nMobile: ${mobile}\nEmail: ${email || 'N/A'}\nType: ${enquiryType}\nPickup: ${pickupLocation}\nMessage: ${message || 'Please send quotation'}`
    );
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=${waText}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Direct Operations Desk · 24/7 Available
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Address & Contact Directory</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Verified corporate address, direct dispatch numbers, operating hubs, and branch coverage for {CONTACT_INFO.brandName} ({CONTACT_INFO.domain}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CONTACT_INFO.phonePrimary}`}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition"
          >
            <Phone className="w-4 h-4" />
            {CONTACT_INFO.phoneFormatted}
          </a>
        </div>
      </div>

      {/* Main Grid: Contact Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Contact Details & Service Zones */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary Operating Details Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Key Operational Credentials</span>
              <span className="text-xs font-normal text-slate-500">Ugayanur / Tiruppur Hub</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  Key Contact Person
                </div>
                <div className="font-bold text-slate-900 text-base">{CONTACT_INFO.contactPerson}</div>
                <div className="text-xs text-slate-500 mt-0.5">Operations Head & Booking Manager</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  24/7 Hotline & WhatsApp
                </div>
                <div className="font-bold text-slate-900 text-base">{CONTACT_INFO.phoneFormatted}</div>
                <div className="text-xs text-emerald-700 font-medium mt-0.5">Instant dispatch & quotes</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  Primary Inquiries Email
                </div>
                <div className="font-semibold text-slate-900">{CONTACT_INFO.emailPrimary}</div>
                <div className="text-2xs text-slate-400 mt-0.5">24/7 Response Guaranteed</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  Service Working Hours
                </div>
                <div className="font-semibold text-slate-900">{CONTACT_INFO.operatingHours}</div>
                <div className="text-xs text-slate-500 mt-0.5">Including national holidays</div>
              </div>
            </div>

            {/* Physical Address Block */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Main Registered & Dispatch Office
                  </div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">
                    {CONTACT_INFO.address.line1}, {CONTACT_INFO.address.area}, {CONTACT_INFO.address.city},{' '}
                    {CONTACT_INFO.address.state} - {CONTACT_INFO.address.pincode}, {CONTACT_INFO.address.country}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                    <span>GPS Coordinates: {CONTACT_INFO.address.geoCoordinates.latitude}° N, {CONTACT_INFO.address.geoCoordinates.longitude}° E</span>
                    <span>•</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${CONTACT_INFO.address.geoCoordinates.latitude},${CONTACT_INFO.address.geoCoordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 font-semibold underline hover:text-amber-900"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Zones Directory */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Doorstep Pickup Localities & Branch Zones
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_INFO.serviceZones.map((zone, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wide text-amber-700 mb-2">
                    {zone.zoneName}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.areas.map((area, i) => (
                      <span key={i} className="text-2xs bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Send Inquiry Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Send Booking or Quote Request</h3>
            <p className="text-xs text-slate-500 mt-1">
              Submit your trip requirement to receive an instant WhatsApp or callback quotation.
            </p>
          </div>

          {submitted && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Opening WhatsApp with your filled inquiry...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email ID (Optional)</label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enquiry Type *</label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option>Tour Package (Ooty, Munnar, etc.)</option>
                  <option>Local Hourly Cab (4hr / 8hr / 12hr)</option>
                  <option>Airport Transfer (CJB)</option>
                  <option>Outstation One-Way or Round Trip</option>
                  <option>Corporate Employee Cab</option>
                  <option>Student School/College Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Area / City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saravanampatti / Tiruppur"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date & Special Requirements</label>
              <textarea
                rows={3}
                placeholder="Mention travel dates, number of passengers (e.g. 4 adults, 2 kids), preferred car (Sedan/Innova/TT)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-xs"
            >
              <Send className="w-4 h-4 text-amber-400" />
              Submit & Connect on WhatsApp
            </button>

            <p className="text-2xs text-slate-400 text-center">
              Direct connection with Prakash M. No third-party commissions or intermediaries.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
