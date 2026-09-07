import { useState } from 'react';
import { HeartPulse, Mail, MapPin, Phone, ShieldCheck, X, FileText, Lock, RefreshCw } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

interface GetGoFooterProps {
  onNavigate: (page: string) => void;
}

export default function GetGoFooter({ onNavigate }: GetGoFooterProps) {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#C62139] text-white font-black text-lg shadow-md">
                <span className="text-amber-300">G</span>G
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  GetGo Taxi
                </span>
                <span className="text-2xs text-slate-400 font-medium tracking-wider uppercase">
                  Tours & Cabs
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted tours and cabs partner in Coimbatore, Tiruppur, and Palladam. Offering hill station tours, local & outstation cabs, airport transfers, and corporate rentals since 2017.
            </p>
            <div className="pt-2 flex items-center gap-2 text-2xs text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ghat Road Certified Mountain Drivers</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cab-services')}
                  className="hover:text-white transition hover:underline"
                >
                  Cab & Taxi Tariffs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hourly-packages')}
                  className="hover:text-white transition hover:underline flex items-center gap-1 font-semibold text-amber-300"
                >
                  <span>Hourly Rental Packages</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('popular-routes')}
                  className="hover:text-white transition hover:underline"
                >
                  One-Way Drop & Outstation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corporate-student')}
                  className="hover:text-white transition hover:underline"
                >
                  Corporate & Student Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-us')}
                  className="hover:text-white transition hover:underline"
                >
                  About Us & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact-us')}
                  className="hover:text-white transition hover:underline"
                >
                  Contact & Office
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Hourly & Outstation Routes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Hourly & Outstation Routes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('hourly-packages')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  2 Hrs / 20 Km Local Errands (₹650)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hourly-packages')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  4 Hrs / 40 Km Shopping & Hospital (₹1,150)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hourly-packages')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  8 Hrs / 80 Km Full Day City Rental (₹1,950)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hourly-packages')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  12 Hrs / 120 Km Extended Day Hire (₹2,650)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('popular-routes')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  Coimbatore to Bangalore One-Way Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('popular-routes')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  Coimbatore to Chennai One-Way Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('popular-routes')}
                  className="hover:text-white transition hover:underline text-left"
                >
                  Coimbatore to Salem & Madurai Drop
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info With User's Address and Phone */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Contact & Address
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C62139] shrink-0 mt-0.5" />
                <span>
                  {GETGO_CONTACT.address.line1}, {GETGO_CONTACT.address.area},<br />
                  {GETGO_CONTACT.address.city} - {GETGO_CONTACT.address.pincode},<br />
                  {GETGO_CONTACT.address.state}, {GETGO_CONTACT.address.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${GETGO_CONTACT.phone}`}
                  className="text-white hover:text-amber-300 font-bold"
                >
                  {GETGO_CONTACT.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${GETGO_CONTACT.email}`}
                  className="hover:text-white transition"
                >
                  {GETGO_CONTACT.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Policy Links for Strict Google Ads Compliance */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition underline flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy Policy</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition underline flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Terms of Service</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('refund')}
              className="hover:text-white transition underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>Cancellation & Refunds</span>
            </button>
          </div>
          <div className="text-slate-300 font-medium">
            Licensed Taxi Operator • GST Compliant
          </div>
        </div>

        {/* Bottom Copyright & Verification Line */}
        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} GetGo Taxi ({GETGO_CONTACT.domain}). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-2xs text-slate-400">
            <span>24/7 Customer Support</span>
            <span>•</span>
            <span>Tiruppur • Coimbatore • Palladam Hubs</span>
            <span>•</span>
            <span>Safe & Sanitized Vehicles</span>
          </div>
        </div>
      </div>

      {/* Legal Policy Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Lock className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  At GetGo Taxi ({GETGO_CONTACT.domain}), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you request a taxi booking or contact us.
                </p>
                <h4 className="text-sm font-bold text-white pt-2">1. Information We Collect</h4>
                <p className="text-xs text-slate-300">
                  We collect user-provided details including Name, Phone Number, Pickup Location, Destination, Travel Date, and Vehicle Preference strictly for processing your taxi booking request.
                </p>
                <h4 className="text-sm font-bold text-white pt-2">2. How We Use Information</h4>
                <p className="text-xs text-slate-300">
                  Your information is used solely to assign drivers, send trip confirmations via SMS/WhatsApp, and provide customer support. We NEVER sell, lease, or share your data with third parties for marketing purposes.
                </p>
                <h4 className="text-sm font-bold text-white pt-2">3. Data Security & Contact</h4>
                <p className="text-xs text-slate-300">
                  We employ standard encryption and security practices. For questions regarding your personal data, contact us at {GETGO_CONTACT.email} or call {GETGO_CONTACT.phoneFormatted}.
                </p>
              </div>
            )}

            {legalModal === 'terms' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <FileText className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Terms of Service</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  Welcome to GetGo Taxi. By booking a ride through our website or phone support, you agree to the following operational terms:
                </p>
                <h4 className="text-sm font-bold text-white pt-2">1. Billing & Tariff Rules</h4>
                <p className="text-xs text-slate-300">
                  • Outstation round-trips require a minimum billing of 250 km per calendar day.<br />
                  • Driver Batta (₹500/day for Outstation), Toll Fees, Interstate Permit charges, and Parking charges are billed as actuals.<br />
                  • Day fare hours apply from 06:00 AM to 10:00 PM. Night driving allowance applies between 10:00 PM and 06:00 AM.
                </p>
                <h4 className="text-sm font-bold text-white pt-2">2. Passenger Safety & Vehicle Care</h4>
                <p className="text-xs text-slate-300">
                  • Smoking and alcohol consumption inside taxis are strictly prohibited.<br />
                  • Our drivers reserve the right to refuse service to passengers engaging in unlawful behavior.
                </p>
              </div>
            )}

            {legalModal === 'refund' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <RefreshCw className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Cancellation & Refund Policy</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  GetGo Taxi provides flexible cancellation policies to ensure customer satisfaction:
                </p>
                <h4 className="text-sm font-bold text-white pt-2">1. Free Cancellation</h4>
                <p className="text-xs text-slate-300">
                  Cancellations requested at least 2 hours prior to scheduled pickup time incur ZERO cancellation fee.
                </p>
                <h4 className="text-sm font-bold text-white pt-2">2. Advance Refunds</h4>
                <p className="text-xs text-slate-300">
                  Any advance payment collected for outstation or hill tours will be refunded 100% via the original payment method within 2-3 business days upon timely cancellation.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
