import { Car, Download, FileText, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/getgoData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: 'calculator', label: 'Price Maths Calculator' },
    { id: 'tariffs', label: 'Fleet & Tariff Rates' },
    { id: 'tours', label: 'Tours & Destinations' },
    { id: 'routes', label: 'Popular Routes' },
    { id: 'contacts', label: 'Address & Contacts' },
    { id: 'corporate', label: 'Corporate & Student' },
    { id: 'terms-faq', label: 'Terms & FAQs' },
    { id: 'github-export', label: 'GitHub Data Export', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-inner">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">{CONTACT_INFO.brandName}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                  {CONTACT_INFO.domain}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="text-emerald-700 font-medium">Official Rate Card & Booking Portal</span>
              </p>
            </div>
          </div>

          {/* Mobile GitHub Export Shortcut */}
          <button
            onClick={() => setActiveTab('github-export')}
            className="lg:hidden flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950"
          >
            <Download className="w-3.5 h-3.5" />
            Export Data
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? item.highlight
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-900 text-white shadow-xs'
                    : item.highlight
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
