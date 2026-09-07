import { Award, CheckCircle2, HeartHandshake, Smile, Trophy, Users } from 'lucide-react';

export default function GetGoStats() {
  const stats = [
    {
      number: '2,000+',
      label: 'Happy Travellers',
      sub: 'Families, tourists & corporate professionals',
      icon: Smile,
    },
    {
      number: '150+',
      label: 'Customised Tours',
      sub: 'Hill stations, temples & day excursions',
      icon: Award,
    },
    {
      number: '9+ Years',
      label: 'Ghat Experience',
      sub: 'Serving Coimbatore & Tiruppur since 2017',
      icon: Trophy,
    },
    {
      number: '98%',
      label: 'On-Time Trips',
      sub: 'Guaranteed pickups & transparent billing',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-red-200 transition group"
              >
                <div className="p-2.5 rounded-lg bg-red-100 text-[#C62139] mb-3 group-hover:scale-110 transition">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-[#C62139] mt-0.5">
                  {stat.label}
                </div>
                <div className="text-2xs text-slate-500 mt-1">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
