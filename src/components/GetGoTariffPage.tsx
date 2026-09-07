import PricingMatrix from './PricingMatrix';
import { ShieldCheck, Phone, MessageSquare } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';

export default function GetGoTariffPage() {
  return (
    <div className="py-10 bg-slate-50 min-h-screen space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#C62139] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Official Rate Card & Per-KM Tariff Matrix
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            GetGo Taxi — Complete Tariff & Fare Matrix
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-3xl">
            Detailed fare rates for Local City Rentals, One-Way Drop Taxis, Outstation Hill Station Tours, and Corporate Bus Rentals across Coimbatore and Tiruppur. No surge prices or hidden fees.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`tel:${GETGO_CONTACT.phone}`}
              onClick={() => trackPhoneCall('tariff_hero')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#C62139] font-black text-xs sm:text-sm hover:bg-slate-100 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-[#C62139]" />
              <span>Call For Quote</span>
            </a>
            <button
              onClick={() => {
                trackWhatsAppClick('tariff_hero');
                window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20please%20send%20full%20tariff%20details.`, '_blank');
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Rates on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <PricingMatrix />
      </div>
    </div>
  );
}
