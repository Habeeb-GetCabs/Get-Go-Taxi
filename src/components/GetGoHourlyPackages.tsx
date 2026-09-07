import { useState } from 'react';
import {
  Car,
  Check,
  Clock,
  HelpCircle,
  Info,
  Phone,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';

interface GetGoHourlyPackagesProps {
  onOpenBooking?: (packageType?: string) => void;
}

export const HOURLY_TIERS = [
  {
    id: '2hrs-20km',
    duration: '2 Hours',
    kms: '20 Km',
    name: '2 Hrs / 20 Km Package',
    tag: 'City Errands',
    popular: false,
    description: 'Ideal for railway station transfers, doctor clinic visits, or local meetings in Coimbatore or Tiruppur.',
    rates: {
      sedan: { price: 700, vehicle: 'Swift Dzire / Etios', extraKm: 28, extraHr: 350 },
      suv: { price: 1050, vehicle: 'Innova / Ertiga', extraKm: 28, extraHr: 450 },
      crysta: { price: 1400, vehicle: 'Innova Crysta Luxury', extraKm: 28, extraHr: 550 },
      tempo: { price: 1850, vehicle: 'Tempo Traveller (12 Seater)', extraKm: 28, extraHr: 650 },
    },
    features: [
      'Doorstep pickup anywhere in Coimbatore/Tiruppur',
      'Multiple short stops included',
      'AC on throughout the trip',
      'Trained courteous chauffeur',
    ],
  },
  {
    id: '4hrs-40km',
    duration: '4 Hours',
    kms: '40 Km',
    name: '4 Hrs / 40 Km Package',
    tag: 'Half-Day Rental',
    popular: false,
    description: 'Perfect for shopping in RS Puram & Cross Cut Road, business meetings across Peelamedu & Gandhipuram, or family visits.',
    rates: {
      sedan: { price: 1400, vehicle: 'Swift Dzire / Etios', extraKm: 28, extraHr: 350 },
      suv: { price: 1900, vehicle: 'Innova / Ertiga', extraKm: 28, extraHr: 450 },
      crysta: { price: 2400, vehicle: 'Innova Crysta Luxury', extraKm: 28, extraHr: 550 },
      tempo: { price: 3000, vehicle: 'Tempo Traveller (12 Seater)', extraKm: 28, extraHr: 650 },
    },
    features: [
      '4 hours dedicated chauffeur at your disposal',
      'Unlimited local stops within 40 kms',
      'Clean & sanitized sanitized vehicles',
      'Zero cancellation charges up to 1 hr before',
    ],
  },
  {
    id: '8hrs-80km',
    duration: '8 Hours',
    kms: '80 Km',
    name: '8 Hrs / 80 Km Package',
    tag: 'Most Popular • Full Day',
    popular: true,
    description: 'The premier choice for full day city sightseeing, visiting Marudhamalai temple & Perur Patteeswarar, TIDEL Park IT visits, and client tours.',
    rates: {
      sedan: { price: 2800, vehicle: 'Swift Dzire / Etios', extraKm: 28, extraHr: 350 },
      suv: { price: 3600, vehicle: 'Innova / Ertiga', extraKm: 28, extraHr: 450 },
      crysta: { price: 4600, vehicle: 'Innova Crysta Luxury', extraKm: 28, extraHr: 550 },
      tempo: { price: 5800, vehicle: 'Tempo Traveller (12 Seater)', extraKm: 28, extraHr: 650 },
    },
    features: [
      'Full 8-hour city disposal for flexible scheduling',
      '80 km included (Coimbatore city & outer ring)',
      'Free waiting time within the 8-hour window',
      'Fuel & chauffeur allowance included',
    ],
  },
  {
    id: '12hrs-120km',
    duration: '12 Hours',
    kms: '120 Km',
    name: '12 Hrs / 120 Km Package',
    tag: 'Extended Day & Industrial',
    popular: false,
    description: 'Designed for extensive business rounds across Coimbatore, Tiruppur knitwear clusters, Palladam, and Pollachi with zero rush.',
    rates: {
      sedan: { price: 4200, vehicle: 'Swift Dzire / Etios', extraKm: 28, extraHr: 350 },
      suv: { price: 4800, vehicle: 'Innova / Ertiga', extraKm: 28, extraHr: 450 },
      crysta: { price: 5800, vehicle: 'Innova Crysta Luxury', extraKm: 28, extraHr: 550 },
      tempo: { price: 7600, vehicle: 'Tempo Traveller (12 Seater)', extraKm: 28, extraHr: 650 },
    },
    features: [
      '12 hours complete city & suburban coverage',
      '120 free km included with low extra km slab',
      'Perfect for multi-factory visits & weddings',
      'Night allowance included if completed before 10 PM',
    ],
  },
];

export default function GetGoHourlyPackages({ onOpenBooking }: GetGoHourlyPackagesProps) {
  const [selectedVehicleType, setSelectedVehicleType] = useState<'sedan' | 'suv' | 'crysta' | 'tempo'>('sedan');

  const handleBookPackage = (tierName: string, price: number, vehicleName: string) => {
    const text = `*Hourly Cab Booking Request*%0A%0A` +
      `*Package:* ${tierName}%0A` +
      `*Vehicle Type:* ${vehicleName}%0A` +
      `*Base Rate:* ₹${price.toLocaleString('en-IN')}%0A` +
      `*Pickup Location:* Coimbatore / Tiruppur%0A%0A` +
      `Hello GetGo Taxi, please confirm availability and dispatch for this hourly rental package.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <section id="hourly-packages" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#C62139] text-xs font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Hourly Rental Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Flexible Local Hourly Cabs in Coimbatore & Tiruppur
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Hire a private AC cab with an experienced chauffeur for a few hours or the whole day. Keep the car with you, make unlimited stops, and pay transparent fixed rates with no surge pricing.
          </p>
        </div>

        {/* Vehicle Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 gap-1 sm:gap-2">
            {[
              { id: 'sedan', label: 'Sedan (Dzire / Etios)', subtitle: '4 Seater' },
              { id: 'suv', label: 'SUV (Innova / Ertiga)', subtitle: '6-7 Seater' },
              { id: 'crysta', label: 'Innova Crysta Luxury', subtitle: 'VIP 6 Seater' },
              { id: 'tempo', label: 'Tempo Traveller', subtitle: '12 Seater' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicleType(v.id as any)}
                className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex flex-col items-center cursor-pointer ${
                  selectedVehicleType === v.id
                    ? 'bg-[#C62139] text-white shadow-md'
                    : 'text-slate-800 hover:bg-slate-200'
                }`}
              >
                <span>{v.label}</span>
                <span className={`text-2xs font-medium ${selectedVehicleType === v.id ? 'text-red-100' : 'text-slate-600'}`}>
                  {v.subtitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hourly Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOURLY_TIERS.map((tier) => {
            const currentRate = tier.rates[selectedVehicleType];
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'border-[#C62139] shadow-xl bg-gradient-to-b from-red-50/40 via-white to-white ring-2 ring-[#C62139]/30'
                    : 'border-slate-200 shadow-sm hover:shadow-lg bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C62139] text-white text-2xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  {/* Duration Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-2xs font-black uppercase tracking-wider text-[#C62139] block">
                      {tier.tag}
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <h3 className="text-xl font-black text-slate-900">{tier.duration}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {tier.kms} included
                      </span>
                    </div>
                    <p className="text-2xs text-slate-700 font-medium mt-2 line-clamp-2">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-2">
                    <div className="text-2xs text-slate-700 font-bold uppercase">Fixed Package Fare</div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{currentRate.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-2xs text-slate-700 font-medium">all inclusive</span>
                    </div>
                    <div className="mt-2 text-2xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1">
                      <div className="flex justify-between">
                        <span>Extra Km:</span>
                        <span className="font-bold text-slate-800">₹{currentRate.extraKm} / km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extra Hour:</span>
                        <span className="font-bold text-slate-800">₹{currentRate.extraHr} / hr</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 pt-1 text-xs text-slate-700">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-2xs leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleBookPackage(tier.name, currentRate.price, currentRate.vehicle)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Book {tier.duration} on WhatsApp</span>
                  </button>
                  {onOpenBooking && (
                    <button
                      type="button"
                      onClick={() => onOpenBooking(tier.name)}
                      className="w-full py-1.5 text-center text-2xs text-slate-500 hover:text-slate-800 transition font-medium"
                    >
                      Or customize booking form
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency Banner */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
              ✓
            </div>
            <div>
              <div className="font-bold text-slate-900">Fuel & Chauffeur Included</div>
              <p className="text-2xs text-slate-500 mt-0.5">
                All hourly rates cover vehicle fuel, AC operation, and driver service fee. No hidden surcharge.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
              ⏱
            </div>
            <div>
              <div className="font-bold text-slate-900">Unlimited Stops Within City</div>
              <p className="text-2xs text-slate-500 mt-0.5">
                Stop at any shop, hospital, office, or relative's home. Time is calculated from garage arrival to drop.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
              ₹
            </div>
            <div>
              <div className="font-bold text-slate-900">Tolls & Parking at Actuals</div>
              <p className="text-2xs text-slate-500 mt-0.5">
                Airport entry parking, mall parking, or toll booth charges (if route entails) are payable as per receipt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
