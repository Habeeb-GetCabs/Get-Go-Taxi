import { Briefcase, Building, CheckCircle2, GraduationCap, Shield, Users } from 'lucide-react';
import { CONTACT_INFO, CORPORATE_PLANS } from '../data/getgoData';

export default function CorporateSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-700" />
            B2B Logistics & Educational Transport
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Corporate & Student Transport Solutions</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Dedicated monthly cab contracts, fixed employee route shuttles, and safe door-to-door student pickups across Coimbatore, Tiruppur, and Palladam.
          </p>
        </div>

        <a
          href={`tel:${CONTACT_INFO.phonePrimary}`}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 transition"
        >
          Discuss Corporate Contract
        </a>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CORPORATE_PLANS.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-slate-900">{plan.planType}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {plan.duration}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Typical Use:</strong> {plan.typicalUse}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <strong>Billing Structure:</strong> {plan.billingType}
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Service Standards</div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20we%20are%20interested%20in%20a%20quote%20for%20${encodeURIComponent(plan.planType)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                Request Custom RFQ on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Safety & Compliance Highlight */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <Shield className="w-4 h-4" />
              Verified & PSV Licensed Drivers
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Every driver undergoes complete background verification, police verification, and holds commercial Public Service Vehicle badges with child safety orientation.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <GraduationCap className="w-4 h-4" />
              Safe Student Transport
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              GPS tracked vehicles, speed governors strictly capped under 50 km/h, lady drivers available on request for female students, and instant arrival alerts for parents.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <Building className="w-4 h-4" />
              TIDEL Park & IT Corridor Presence
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Fixed multi-route fleets covering Saravanampatti, Peelamedu, TIDEL Park, and Avinashi Road IT complexes with 24/7 replacement vehicle guarantees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
