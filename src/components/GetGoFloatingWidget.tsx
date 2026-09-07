import { Phone, MessageSquare } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

export default function GetGoFloatingWidget() {
  const handleWhatsApp = () => {
    const text = 'Hello GetGo Taxi, I would like to book a cab / tour package.';
    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Mobile Sticky Bottom CTA Bar (visible on mobile < sm) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-2 sm:hidden shadow-2xl">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          {/* Direct Call Button */}
          <a
            href={`tel:${GETGO_CONTACT.phone}`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#C62139] active:bg-[#9E1B2E] text-white font-black text-xs shadow-md transition"
            aria-label="Call GetGo Taxi Now"
          >
            <Phone className="w-4 h-4 fill-white animate-bounce text-amber-300" />
            <span>Call Now</span>
          </a>

          {/* Instant WhatsApp Booking */}
          <a
            href={`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hello GetGo Taxi, I want to book a cab.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-black text-xs shadow-md transition"
            aria-label="Book Cab on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Desktop & Tablet Floating Widget (visible on sm+) */}
      <aside aria-label="Quick contact" className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        {/* Floating Call Button */}
        <a
          href={`tel:${GETGO_CONTACT.phone}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#C62139] hover:bg-[#9E1B2E] text-white shadow-2xl transition-all transform hover:scale-105 group border-2 border-white"
          aria-label="Call Now"
        >
          <Phone className="w-4 h-4 text-amber-300 animate-bounce" />
          <span className="text-xs font-black tracking-wide">
            {GETGO_CONTACT.phoneFormatted}
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all transform hover:scale-110 active:scale-95 border-2 border-white focus:outline-hidden cursor-pointer"
          aria-label="Chat on WhatsApp with GetGo Taxi"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
        </button>
      </aside>
    </>
  );
}
