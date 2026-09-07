import { useState } from 'react';
import { Award, CheckCircle2, ChevronRight, Download, FileSpreadsheet, Info, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, VEHICLE_TARIFFS } from '../data/getgoData';

export default function PricingMatrix() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sedan');
  const activeVehicle = VEHICLE_TARIFFS.find((v) => v.id === selectedVehicle) || VEHICLE_TARIFFS[0];

  return (
    <div className="space-y-8">
      {/* Header and overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Official Rate Card · GetGo Taxi Coimbatore
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Fleet Tariffs & Hourly Package Matrix</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Complete pricing tables for local city rentals, outstation trips, airport transfers, and corporate shuttles in Coimbatore, Tiruppur, and Palladam.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500">Sedan starting from</div>
            <div className="text-xl font-extrabold text-amber-600">₹16 / KM</div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Innova & Tempo</div>
            <div className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded">Call / WhatsApp</div>
          </div>
        </div>
      </div>

      {/* Vehicle Category Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {VEHICLE_TARIFFS.map((vehicle) => {
          const isActive = selectedVehicle === vehicle.id;
          return (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle.id)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition flex items-center gap-2.5 border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{vehicle.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
                }`}
              >
                ₹{vehicle.perKmRate}/km
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Vehicle In-Depth Tariff Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header Details */}
        <div className="p-6 bg-slate-50/70 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900">{activeVehicle.name}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {activeVehicle.ac ? 'Full AC' : 'Non-AC'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Models: {activeVehicle.models}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
              <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                👥 {activeVehicle.seats}
              </span>
              <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                🧳 {activeVehicle.luggage}
              </span>
              <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                🚙 Outstation Bata: ₹{activeVehicle.driverBataPerDay}/day
              </span>
            </div>
          </div>
        </div>

        {/* Hourly Rentals & City Tariff Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/75 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Package Duration</th>
                <th className="py-3.5 px-6">Base Fare (GST Inc.)</th>
                <th className="py-3.5 px-6">Free Kilometers</th>
                <th className="py-3.5 px-6">Extra KM Fare</th>
                <th className="py-3.5 px-6">Extra Time Fare</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {activeVehicle.hourlyPackages.map((pkg, idx) => (
                <tr key={idx} className="hover:bg-amber-50/30 transition">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {pkg.durationHours} Hours
                  </td>
                  <td className="py-4 px-6 font-extrabold text-amber-700 text-base">
                    ₹{pkg.baseFare.toLocaleString('en-IN')}/-*
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{pkg.freeKm} KM</td>
                  <td className="py-4 px-6 text-slate-700 font-medium">₹{pkg.extraKmRate}/km</td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{pkg.extraTimeRate}</td>
                  <td className="py-4 px-6 text-right">
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20I%20want%20to%20book%20${encodeURIComponent(activeVehicle.name)}%20for%20${pkg.durationHours}%20hours%20package.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition"
                    >
                      Book Now
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Notes */}
        <div className="p-4 bg-slate-50 text-xs text-slate-500 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>*GST included. Toll charges, state border permits & parking fees are charged at actuals.</span>
          <span className="text-slate-600 font-medium">
            Night driving allowance (10 PM to 6 AM): ₹{activeVehicle.nightAllowancePerNight}/night
          </span>
        </div>
      </div>

      {/* Outstation Tariff Comparison Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Outstation Per-Kilometer Rate Grid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VEHICLE_TARIFFS.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{v.category}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {v.seats}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">{v.name}</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹{v.perKmRate}</span>
                  <span className="text-xs text-slate-500 font-medium">/ KM</span>
                </div>
                <div className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span>Min KM / Day:</span>
                    <strong className="text-slate-800">{v.minKmPerDayOutstation} KM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Driver Bata:</span>
                    <strong className="text-slate-800">₹{v.driverBataPerDay} / Day</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Night Halt:</span>
                    <strong className="text-slate-800">₹{v.nightAllowancePerNight} / Night</strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={`tel:${CONTACT_INFO.phonePrimary}`}
                  className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  Call for Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
