import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  MapPin,
  Phone,
  Shield,
  Trophy,
  Users,
} from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

export default function GetGoAboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What services does GetGo Taxi offer?',
      a: 'We offer hill station holiday tour packages (Ooty, Munnar, Valparai, Kodaikanal), devotional temple circuits (Palani, Thiruchendur, Rameswaram, Isha Yoga), local city hourly cab rentals in Coimbatore and Tiruppur, outstation one-way drops, and corporate/student group transit.',
    },
    {
      q: 'How do I book a tour package or cab from Coimbatore?',
      a: `You can book instantly via WhatsApp or phone call at ${GETGO_CONTACT.phoneFormatted}. Simply share your travel date, pickup location, group size, and destination. We provide upfront all-inclusive quotes with zero hidden surcharges.`,
    },
    {
      q: 'Which destinations do you cover from Coimbatore?',
      a: 'We operate across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh. Popular regular routes include Ooty, Coonoor, Munnar, Valparai, Kodaikanal, Wayanad, Palani, Madurai, Rameswaram, Bangalore, Mysore, and Tirupati.',
    },
    {
      q: 'What types of vehicles can I hire?',
      a: 'Our well-maintained fleet includes Swift Dzire & Toyota Etios (Sedans), Toyota Innova & Innova Crysta (SUVs), Force Tempo Travellers (12-20 seaters), and Mini Buses & Coaches (25-45 seaters).',
    },
    {
      q: 'Are cab fares quoted upfront with no hidden charges?',
      a: 'Yes, 100%! We provide clear, transparent billing. All toll charges, parking allowances, driver batta, and state interstate permits are clearly stated beforehand.',
    },
    {
      q: 'Are your drivers trained for mountain ghat roads?',
      a: 'Yes. All our mountain tour drivers have extensive commercial experience navigating the 36 hairpin bends of the Ooty Kallar ghat, 40 hairpin bends of Valparai, and steep Munnar mist roads with safety as priority.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/assets/img/about/a2.jpg" alt="About" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C62139] text-white text-xs font-bold uppercase">
            <span>Our Journey & Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            About GetGo Taxi
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
            Providing reliable, safe, and memorable road travel experiences from Coimbatore, Tiruppur, and Palladam across South India via {GETGO_CONTACT.domain}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Core Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Leading Tour Service Provider
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Crafting Safe & Unforgettable Journeys Since 2017
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded with a passion for quality hospitality and punctual service, GetGo Taxi ({GETGO_CONTACT.domain}) has grown into one of the most trusted names for taxi rentals and holiday packages in Coimbatore, Tiruppur, and the Kongu region.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether navigating steep hairpin bends to Ooty, conducting early morning pilgrimage darshans at Palani, providing reliable airport pickups, or running daily corporate shuttles for Saravanampatti IT employees, our focus remains on clean vehicles, courteous mountain-certified chauffeurs, and 100% transparent billing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-lg font-black text-[#C62139]">2,000+ Trips</div>
                <div className="text-xs font-medium text-slate-600">Successfully completed family & corporate tours</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-lg font-black text-[#C62139]">150+ Cabs</div>
                <div className="text-xs font-medium text-slate-600">Active fleet of Sedans, SUVs & Tempo Travellers</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/assets/img/about/a2.jpg"
                alt="GetGo Taxi fleet"
                className="w-full h-80 sm:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/img/hero/h1.jpg';
                }}
              />
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quick answers about booking tours, cabs, and patient travel.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#C62139] transition text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C62139] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center space-y-2">
            <div className="text-sm font-bold text-slate-900">Have a custom question or specific itinerary?</div>
            <p className="text-xs text-slate-600">
              Our travel specialists are available 24 hours a day to assist you.
            </p>
            <div className="pt-2">
              <a
                href={`tel:${GETGO_CONTACT.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C62139] text-white font-bold text-xs hover:bg-[#9E1B2E] transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {GETGO_CONTACT.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
