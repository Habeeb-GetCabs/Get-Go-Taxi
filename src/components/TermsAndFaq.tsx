import { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, FileText, HelpCircle, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, FAQS } from '../data/getgoData';

export default function TermsAndFaq() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQS.filter(
    (faq) => selectedCategory === 'all' || faq.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            Clear & Legally Compliant Policies
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Booking Terms, Policies & FAQs</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Everything you need to know regarding cancellation rules, waiting time, payments, driver allowance, and outstation permits on {CONTACT_INFO.domain}.
          </p>
        </div>
      </div>

      {/* Core Booking & Cancellation Policy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            Free Cancellation (6 Hours Prior)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cancel free of charge if informed at least 6 hours before scheduled pickup time. No cancellation penalty or cancellation booking fee is charged.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            Toll, Permits & Parking at Actuals
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All highway toll plaza charges, parking tickets, and interstate border entry permits (e.g., Kerala / Karnataka) are billed transparently on government receipts.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <HelpCircle className="w-4 h-4" />
            24/7 Operations & Replacement SLA
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If an assigned cab suffers any technical failure, a replacement vehicle of equivalent or superior class is dispatched immediately under our operational SLA.
          </p>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['all', 'pricing', 'general', 'tours', 'airport', 'corporate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
