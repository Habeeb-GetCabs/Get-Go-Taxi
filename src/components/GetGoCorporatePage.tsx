import { useState, type FormEvent } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { CORPORATE_STUDENT_DATA, GETGO_CONTACT } from '../data/tourData';

export default function GetGoCorporatePage() {
  const [groupSize, setGroupSize] = useState('25-35');
  const [serviceCategory, setServiceCategory] = useState('Daily Corporate Shift');
  const [routeDetails, setRouteDetails] = useState('Saravanampatti to Gandhipuram');

  const handleSubmitQuote = (e: FormEvent) => {
    e.preventDefault();
    const text = `*Corporate / Student Transport Inquiry*%0A%0A` +
      `*Service Type:* ${serviceCategory}%0A` +
      `*Group Size:* ${groupSize} passengers%0A` +
      `*Route Details:* ${routeDetails}%0A%0A` +
      `Hello GetGo Taxi, please provide a corporate monthly contract / trip quotation.`;
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/assets/img/hero/h1.jpg" alt="Corporate" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C62139] text-white text-xs font-bold uppercase">
            <span>Enterprise & Institutional Transit</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Corporate & Student Travel Packages
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
            Guaranteed punctuality for IT companies, manufacturing units, colleges, and schools across Coimbatore, Tiruppur, and Palladam.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Core Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORPORATE_STUDENT_DATA.keyBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-red-200 transition"
            >
              <CheckCircle2 className="w-5 h-5 text-[#C62139] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* 4-Step Booking Process from Cousin Site */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Hassle-Free Implementation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our 4-Step Group Booking Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              How we set up employee shuttles and student excursions smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {CORPORATE_STUDENT_DATA.bookingSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs relative space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C62139] text-white font-black text-lg flex items-center justify-center">
                  0{step.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Request Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold">Request a Corporate or College Transit Proposal</h3>
            <p className="text-xs text-slate-400">
              Submit your requirements for a prompt contract rate sheet.
            </p>
          </div>

          <form onSubmit={handleSubmitQuote} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase text-slate-400 mb-1">
                  Service Category
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                >
                  <option value="Daily Corporate Employee Shuttle">Daily Corporate Employee Shuttle</option>
                  <option value="College / School Daily Bus Route">College / School Daily Bus Route</option>
                  <option value="One-Time Student Industrial Visit (IV)">Student Industrial Visit (IV)</option>
                  <option value="Corporate Offsite & Team Outing">Corporate Offsite & Team Outing</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase text-slate-400 mb-1">
                  Estimated Group Size
                </label>
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                >
                  <option value="7-12">7 - 12 Passengers (Innova / Mini TT)</option>
                  <option value="12-20">12 - 20 Passengers (Tempo Traveller)</option>
                  <option value="25-35">25 - 35 Passengers (Mini Bus)</option>
                  <option value="40-50+">40 - 50+ Passengers (Luxury Air Bus)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase text-slate-400 mb-1">
                Route / Hub Details
              </label>
              <input
                type="text"
                value={routeDetails}
                onChange={(e) => setRouteDetails(e.target.value)}
                placeholder="e.g. Saravanampatti IT Park to Coimbatore Gandhipuram"
                required
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>Send WhatsApp Corporate Enquiry</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
