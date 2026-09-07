import { ArrowRight, Car, Check, ChevronRight, Clock, Shield, Star, Users } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

interface GetGoServicesProps {
  onNavigate: (page: string) => void;
}

export default function GetGoServices({ onNavigate }: GetGoServicesProps) {
  const services = [
    {
      id: 'cab-services',
      title: 'Cab & Taxi Services',
      tag: 'Local & Outstation',
      desc: 'Reliable cab and taxi hire across Coimbatore, Tiruppur, and Palladam for local city rides, airport pickups, railway transfers, and outstation trips with Sedans, SUVs, and Innova Crysta.',
      image: '/assets/img/hero/h2.jpg',
      icon: Car,
      features: ['Airport & Railway Station Transfers', 'One-Way Drop Taxi with Zero Return Fare', 'Outstation Round-Trips at Lowest Rates', 'Fixed transparent per-km tariffs'],
      actionText: 'View Fleet & Cab Tariffs',
      color: 'border-red-500',
    },
    {
      id: 'hourly-packages',
      title: 'Hourly Rental Packages',
      tag: '2hr / 4hr / 8hr / 12hr Packages',
      desc: 'Hire a dedicated AC cab with chauffeur for local shopping, hospital visits, business rounds, and client meetings. Unlimited stops with fuel and chauffeur allowance included.',
      image: '/assets/img/hero/h1.jpg',
      icon: Clock,
      features: ['2 Hr, 4 Hr, 8 Hr & 12 Hr Flexible Packages', 'Unlimited Local City & Suburban Stops', 'Fuel & Chauffeur Allowance Included', 'Available in Dzire, Innova, Crysta & Tempo'],
      actionText: 'Explore Hourly Packages',
      color: 'border-blue-500',
    },
    {
      id: 'corporate-student',
      title: 'Corporate & Group Transit',
      tag: 'Daily Shuttles & Trips',
      desc: 'Dedicated employee transportation for IT parks (TIDEL Park, Saravanampatti) and industrial hubs, plus safe school and college transport shuttles with GPS tracking.',
      image: '/assets/img/hero/h3.jpg',
      icon: Users,
      features: ['Daily Employee Commute & Roster Routes', 'College & School Excursions', 'Tempo Travellers & Luxury Buses', 'Monthly Consolidated Corporate Billing'],
      actionText: 'Request Corporate Quote',
      color: 'border-emerald-500',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Our Services Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#C62139]">
              Coimbatore & Tiruppur Travel Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Core Cab Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Complete fleet options tailored for daily city commutes, flexible hourly packages, airport transfers, and outstation drop taxi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-amber-300 text-2xs font-bold uppercase">
                      {srv.tag}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 text-white">
                      <div className="p-2 rounded-lg bg-[#C62139] text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold leading-tight">{srv.title}</h3>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {srv.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-2xs font-medium text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#C62139] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate(srv.id)}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#C62139] text-white font-bold text-xs transition flex items-center justify-center gap-2 group-hover:bg-[#C62139]"
                    >
                      <span>{srv.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
