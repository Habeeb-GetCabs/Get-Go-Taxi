import { useState } from 'react';
import { ArrowRight, Clock, MapPin, Navigation, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, POINT_TO_POINT_ROUTES } from '../data/getgoData';

export default function PopularRoutes() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('cbe-ooty');
  const activeRoute = POINT_TO_POINT_ROUTES.find((r) => r.id === selectedRouteId) || POINT_TO_POINT_ROUTES[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2">
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            Fixed Route Fare Index
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Popular Outstation & Airport Routes</h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            High-demand daily routes from Coimbatore, Tiruppur, and Palladam with transparent kilometer distance, highway routing, and estimated fares.
          </p>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {POINT_TO_POINT_ROUTES.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-amber-500/50'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold opacity-75 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {route.distanceKm} KM
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {route.estDuration}
                  </span>
                </div>

                <div className="font-bold text-base flex items-center gap-2">
                  <span>{route.from}</span>
                  <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{route.to}</span>
                </div>

                <div className="text-xs mt-2 opacity-80 line-clamp-1">{route.highwayRoute}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/20 flex items-baseline justify-between">
                <span className="text-2xs uppercase tracking-wider font-semibold opacity-80">Sedan From</span>
                <span className={`text-lg font-extrabold ${isSelected ? 'text-amber-400' : 'text-amber-600'}`}>
                  ₹{route.sedanFareEst.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Route Spotlight Card */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Route Details & Pricing Breakdown
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {activeRoute.from} to {activeRoute.to} ({activeRoute.distanceKm} Kilometers)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              <strong>Highway Route:</strong> {activeRoute.highwayRoute} • <strong>Estimated Time:</strong> {activeRoute.estDuration}
            </p>
            <p className="text-xs text-slate-500 font-medium">{activeRoute.tollNote}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
              <div className="text-2xs text-slate-500 font-bold uppercase">Sedan AC</div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                ₹{activeRoute.sedanFareEst.toLocaleString('en-IN')}
              </div>
              <div className="text-2xs text-slate-400">Up to 4 seats</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500 text-slate-950 text-center shadow-xs">
              <div className="text-2xs font-bold uppercase opacity-90">Innova SUV</div>
              <div className="text-base sm:text-lg font-extrabold mt-0.5">
                ₹{activeRoute.innovaFareEst.toLocaleString('en-IN')}
              </div>
              <div className="text-2xs opacity-90 font-medium">6–7 seats</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
              <div className="text-2xs text-slate-500 font-bold uppercase">Tempo Traveller</div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                ₹{activeRoute.tempoFareEst.toLocaleString('en-IN')}
              </div>
              <div className="text-2xs text-slate-400">12 seats</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Need a custom pickup point in Ganapathy, Peelamedu, RS Puram, or Tiruppur? Doorstep pickup included.
          </span>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=Hello%20GetGo%20Taxi,%20I%20want%20to%20book%20the%20${encodeURIComponent(activeRoute.from)}%20to%20${encodeURIComponent(activeRoute.to)}%20route.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
          >
            Confirm Route on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
