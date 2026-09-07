import { useState } from 'react';
import {
  Calendar,
  Calculator,
  Car,
  Check,
  Clock,
  Compass,
  Copy,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO, VEHICLE_TARIFFS } from '../data/getgoData';
import { calculateFinalFare } from '../utils/fareCalculation';
import AddressAutocomplete from './AddressAutocomplete';

export default function FareCalculator() {
  const [tripType, setTripType] = useState<'local' | 'hourly' | 'oneway' | 'outstation' | 'airport'>('local');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('sedan');

  const today = new Date().toISOString().split('T')[0];

  // Local state
  const [localDistanceKm, setLocalDistanceKm] = useState<number>(12);
  const [localPickup, setLocalPickup] = useState<string>('');
  const [localDrop, setLocalDrop] = useState<string>('');

  // Hourly state
  const [packageHours, setPackageHours] = useState<number>(4);

  // One-Way state
  const [oneWayKm, setOneWayKm] = useState<number>(165);
  const [oneWayPickup, setOneWayPickup] = useState<string>('');
  const [oneWayDrop, setOneWayDrop] = useState<string>('');

  // Outstation state
  const [estimatedKm, setEstimatedKm] = useState<number>(300);
  const [tripDays, setTripDays] = useState<number>(1);
  const [outstationDepartureDate, setOutstationDepartureDate] = useState<string>(today);
  const [outstationReturnDate, setOutstationReturnDate] = useState<string>(today);
  const [outstationDest, setOutstationDest] = useState<string>('');

  const hasLocations = tripType === 'hourly' || tripType === 'airport'
    ? true
    : (tripType === 'local' ? Boolean(localPickup.trim() && localDrop.trim()) :
       tripType === 'oneway' ? Boolean(oneWayPickup.trim() && oneWayDrop.trim()) :
       Boolean(outstationDest.trim()));

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    if (isNaN(diffTime) || diffTime < 0) return 1;
    return Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
  };

  const handleOutstationDepartureChange = (newDate: string) => {
    setOutstationDepartureDate(newDate);
    if (outstationReturnDate < newDate) {
      setOutstationReturnDate(newDate);
      setTripDays(1);
    } else {
      setTripDays(calculateDays(newDate, outstationReturnDate));
    }
  };

  const handleOutstationReturnChange = (newDate: string) => {
    setOutstationReturnDate(newDate);
    setTripDays(calculateDays(outstationDepartureDate, newDate));
  };

  // Airport state
  const [airportZone, setAirportZone] = useState<'city-core' | 'saravanampatti' | 'tiruppur' | 'palladam'>('city-core');

  // Copy state
  const [copied, setCopied] = useState<boolean>(false);

  const currentVehicle = VEHICLE_TARIFFS.find((v) => v.id === selectedVehicleId) || VEHICLE_TARIFFS[0];

  // Compute final fare without exposing internal tariff formulas to the user
  let finalFare = 0;
  let disclaimer = '';
  let tripTitle = '';
  let tripSummaryText = '';
  const isCustomQuote = selectedVehicleId !== 'sedan';

  if (tripType === 'local') {
    const result = calculateFinalFare({
      tripType: 'local',
      distanceKm: localDistanceKm,
      vehicleType: currentVehicle.name,
      pickup: localPickup,
      drop: localDrop,
    });
    finalFare = result.finalFare;
    disclaimer = result.disclaimer;
    tripTitle = `${currentVehicle.name} - Local City Ride (${localDistanceKm} km)`;
    tripSummaryText = `Pickup: ${localPickup || 'Coimbatore'} → Drop: ${localDrop || 'Local'}`;
  } else if (tripType === 'hourly') {
    const pkgString = `${packageHours} Hours / ${packageHours * 10} Km`;
    const result = calculateFinalFare({
      tripType: 'hourly',
      hourlyPackage: pkgString,
      vehicleType: currentVehicle.name,
    });
    finalFare = result.finalFare;
    disclaimer = result.disclaimer;
    tripTitle = `${currentVehicle.name} - ${packageHours} Hours City Rental`;
    tripSummaryText = `Dedicated chauffeur at disposal for ${packageHours} hours with unlimited local stops.`;
  } else if (tripType === 'oneway') {
    const result = calculateFinalFare({
      tripType: 'oneway',
      distanceKm: oneWayKm,
      vehicleType: currentVehicle.name,
      pickup: oneWayPickup,
      drop: oneWayDrop,
    });
    finalFare = result.finalFare;
    disclaimer = result.disclaimer;
    tripTitle = `${currentVehicle.name} - One-Way Drop (${oneWayKm} km)`;
    tripSummaryText = `${oneWayPickup || 'Origin'} → ${oneWayDrop || 'Destination'} (Zero return penalty)`;
  } else if (tripType === 'outstation') {
    const result = calculateFinalFare({
      tripType: 'outstation',
      distanceKm: estimatedKm,
      days: tripDays,
      vehicleType: currentVehicle.name,
      pickup: 'Coimbatore',
      drop: outstationDest,
    });
    finalFare = result.finalFare;
    disclaimer = result.disclaimer;
    tripTitle = `${currentVehicle.name} - Outstation Round Trip (${tripDays} Day${tripDays > 1 ? 's' : ''})`;
    tripSummaryText = `Coimbatore ⇄ ${outstationDest || 'Outstation Destination'} (${estimatedKm} km estimated)`;
  } else {
    // Airport transfers
    let fare = 950;
    let distNote = 'Coimbatore Core (RS Puram / Gandhipuram)';
    if (selectedVehicleId === 'innova-suv') fare = 1450;
    if (selectedVehicleId === 'tempo-traveller') fare = 2400;

    if (airportZone === 'saravanampatti') {
      fare += selectedVehicleId === 'sedan' ? 150 : 250;
      distNote = 'Saravanampatti / IT Corridor';
    } else if (airportZone === 'tiruppur') {
      fare = selectedVehicleId === 'sedan' ? 1600 : selectedVehicleId === 'innova-suv' ? 2400 : 3600;
      distNote = 'Tiruppur City to CJB Airport';
    } else if (airportZone === 'palladam') {
      fare = selectedVehicleId === 'sedan' ? 1500 : selectedVehicleId === 'innova-suv' ? 2200 : 3400;
      distNote = 'Palladam & Sulur Corridor';
    }

    finalFare = fare;
    disclaimer = '*Parking & toll charges extra if applicable';
    tripTitle = `${currentVehicle.name} - Airport Transfer (${distNote})`;
    tripSummaryText = `Prompt doorstep airport pickup / drop with flight tracking.`;
  }

  let tripDateInfo = '';
  if (tripType === 'outstation') {
    tripDateInfo = `\nDeparture: ${outstationDepartureDate}\nReturn: ${outstationReturnDate} (${tripDays} Day${tripDays > 1 ? 's' : ''} Round Trip)`;
  }

  const handleCopyQuote = () => {
    const fareLine = isCustomQuote
      ? `Rate Quote: Call or WhatsApp for Best Rates`
      : `Estimated Final Fare: ₹${finalFare.toLocaleString('en-IN')}`;

    const text = `🚖 *GetGo Taxi Booking Summary*
Vehicle: ${currentVehicle.name}
Trip Type: ${tripType.toUpperCase()}
Route / Package: ${tripTitle}
Details: ${tripSummaryText}${tripDateInfo}
${fareLine}
Note: ${disclaimer.replace('*', '')}
📞 24/7 Helpline: ${CONTACT_INFO.phoneFormatted}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    isCustomQuote
      ? `Hello GetGo Taxi, I would like to request the best rate quote for:\n\nVehicle: ${currentVehicle.name}\nTrip Category: ${tripType.toUpperCase()}\nDetails: ${tripSummaryText}${tripDateInfo}\n\nPlease share your discounted fleet tariff!`
      : `Hello GetGo Taxi, I would like to book this trip:\n\nVehicle: ${currentVehicle.name}\nTrip Category: ${tripType.toUpperCase()}\nDetails: ${tripSummaryText}${tripDateInfo}\nEstimated Final Fare: ₹${finalFare.toLocaleString('en-IN')}\nNote: ${disclaimer.replace('*', '')}\n\nPlease confirm availability!`
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#C62139] text-white text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Instant Final Fare Estimator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Fare & Booking Calculator</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Get an instant, guaranteed upfront final fare quote for local rides, hourly rentals, one-way drops, and outstation round trips.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phonePrimary}`}
              className="px-4 py-2.5 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              Call 24/7: +91 90801 51265
            </a>
          </div>
        </div>

        {/* Trip Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setTripType('local')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              tripType === 'local' ? 'bg-[#C62139] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Local City</span>
          </button>
          <button
            onClick={() => setTripType('hourly')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              tripType === 'hourly' ? 'bg-[#C62139] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Hourly Rental</span>
          </button>
          <button
            onClick={() => setTripType('oneway')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              tripType === 'oneway' ? 'bg-[#C62139] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>One-Way Drop</span>
          </button>
          <button
            onClick={() => setTripType('outstation')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              tripType === 'outstation' ? 'bg-[#C62139] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Outstation Round</span>
          </button>
          <button
            onClick={() => setTripType('airport')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 ${
              tripType === 'airport' ? 'bg-[#C62139] text-white shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Airport (CJB)</span>
          </button>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          {/* 1. Vehicle Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              1. Select Vehicle Model
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VEHICLE_TARIFFS.map((vehicle) => {
                const isSelected = selectedVehicleId === vehicle.id;
                return (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicleId(vehicle.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'border-[#C62139] bg-red-50/40 ring-1 ring-[#C62139] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{vehicle.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{vehicle.models}</div>
                      </div>
                      <span className={`text-3xs font-bold px-2 py-0.5 rounded-md ${
                        vehicle.id === 'sedan' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {vehicle.id === 'sedan' ? 'Instant Quote (₹16/km)' : 'Call/WhatsApp for Rates'}
                      </span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>👥 {vehicle.seats}</span>
                      <span>🧳 {vehicle.category === 'sedan' ? '2-3 Bags' : vehicle.category === 'suv' ? '4-5 Bags' : '10+ Bags'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Local City Ride Controls */}
          {tripType === 'local' && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Local City Trip Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AddressAutocomplete
                  id="fare-calc-local-pickup"
                  label="Pickup Location"
                  value={localPickup}
                  onChange={setLocalPickup}
                  placeholder="Type min. 3 letters (e.g. Gandhipuram)..."
                  tripType="local"
                />
                <AddressAutocomplete
                  id="fare-calc-local-drop"
                  label="Drop Location"
                  value={localDrop}
                  onChange={setLocalDrop}
                  placeholder="Type min. 3 letters (e.g. Airport)..."
                  isDestination
                  tripType="local"
                  iconColor="text-red-500"
                />
              </div>

              {/* Distance Slider */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                  <span>Estimated Local Distance</span>
                  <strong className="text-[#C62139] font-bold">{localDistanceKm} KM</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={localDistanceKm}
                  onChange={(e) => setLocalDistanceKm(Number(e.target.value))}
                  className="w-full accent-[#C62139]"
                />
                <div className="text-2xs text-slate-500 mt-1 flex justify-between">
                  <span>2 km (Short Ride)</span>
                  <span>Average City Ride: ~12 km</span>
                  <span>50 km (Across City)</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Hourly Rental Controls */}
          {tripType === 'hourly' && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Choose City Rental Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { hours: 2, label: '2 Hours / 20 Km' },
                  { hours: 4, label: '4 Hours / 40 Km' },
                  { hours: 8, label: '8 Hours / 80 Km' },
                  { hours: 12, label: '12 Hours / 120 Km' },
                ].map((pkg) => (
                  <button
                    key={pkg.hours}
                    onClick={() => setPackageHours(pkg.hours)}
                    className={`p-3 rounded-xl border text-center transition ${
                      packageHours === pkg.hours
                        ? 'border-[#C62139] bg-[#C62139] text-white font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-sm font-bold">{pkg.hours} Hours</div>
                    <div className="text-2xs opacity-90 mt-0.5">{pkg.hours * 10} Free Km</div>
                  </button>
                ))}
              </div>
              <p className="text-2xs text-slate-500">
                Chauffeur and fuel included. Unlimited stops within city limits.
              </p>
            </div>
          )}

          {/* 4. One-Way Drop Controls */}
          {tripType === 'oneway' && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                2. One-Way Drop Route
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-2xs font-semibold text-slate-600 block mb-1">Pickup City</label>
                  <input
                    type="text"
                    value={oneWayPickup}
                    onChange={(e) => setOneWayPickup(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-2xs font-semibold text-slate-600 block mb-1">Destination City</label>
                  <input
                    type="text"
                    value={oneWayDrop}
                    onChange={(e) => setOneWayDrop(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Presets */}
              <div>
                <span className="text-2xs text-slate-500 block mb-1.5">Popular One-Way Routes:</span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { label: 'Salem (165 km)', km: 165, to: 'Salem' },
                    { label: 'Madurai (215 km)', km: 215, to: 'Madurai' },
                    { label: 'Bangalore (360 km)', km: 360, to: 'Bangalore' },
                    { label: 'Chennai (505 km)', km: 505, to: 'Chennai' },
                    { label: 'Kochi (190 km)', km: 190, to: 'Kochi' },
                    { label: 'Palani (105 km)', km: 105, to: 'Palani' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setOneWayKm(preset.km);
                        setOneWayDrop(preset.to);
                      }}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-2xs font-medium"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                  <span>Trip Distance</span>
                  <strong className="text-[#C62139] font-bold">{oneWayKm} KM</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="5"
                  value={oneWayKm}
                  onChange={(e) => setOneWayKm(Number(e.target.value))}
                  className="w-full accent-[#C62139]"
                />
                <div className="text-2xs text-slate-500 mt-1 flex justify-between">
                  <span>50 km</span>
                  <span>Minimum Coverage: 130 km</span>
                  <span>600 km</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. Outstation Round-Trip Controls */}
          {tripType === 'outstation' && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Outstation Route & Calendar Dates
              </label>

              <div>
                <AddressAutocomplete
                  id="calc-outstation-destination"
                  label="Destination City / Hill Station"
                  value={outstationDest}
                  onChange={setOutstationDest}
                  placeholder="e.g. Ooty / Munnar / Kodaikanal / Mysore / Madurai"
                  required
                  isDestination
                  tripType="outstation"
                  iconColor="text-red-500"
                />
              </div>

              {/* Calendar Date Pickers for Outstation Round Trip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Departure Date (Calendar)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="date"
                      min={today}
                      value={outstationDepartureDate}
                      onChange={(e) => handleOutstationDepartureChange(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500">
                      Return Date (Calendar)
                    </label>
                    <span className="text-3xs font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {tripDays} Day{tripDays > 1 ? 's' : ''} Round Trip
                    </span>
                  </div>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="date"
                      min={outstationDepartureDate}
                      value={outstationReturnDate}
                      onChange={(e) => handleOutstationReturnChange(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Distance Slider */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                  <span>Estimated Total Distance (KM)</span>
                  <strong className="text-[#C62139] font-bold">{estimatedKm} KM</strong>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1200"
                  step="20"
                  value={estimatedKm}
                  onChange={(e) => setEstimatedKm(Number(e.target.value))}
                  className="w-full accent-[#C62139]"
                />
                <div className="text-2xs text-slate-500 mt-1 flex justify-between">
                  <span>150 km</span>
                  <span>Min Coverage: {250 * tripDays} km ({tripDays} day{tripDays > 1 ? 's' : ''} × 250 km)</span>
                  <span>1200 km</span>
                </div>
              </div>
            </div>
          )}

          {/* 6. Airport Transfers */}
          {tripType === 'airport' && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Select Your Coimbatore Pickup / Drop Locality
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'city-core',
                    title: 'Coimbatore Core City',
                    desc: 'RS Puram, Peelamedu, Gandhipuram, Race Course, Singanallur',
                  },
                  {
                    id: 'saravanampatti',
                    title: 'Saravanampatti & Northern Suburbs',
                    desc: 'Saravanampatti IT belt, Kalapatti, Thudiyalur, Vadavalli',
                  },
                  {
                    id: 'tiruppur',
                    title: 'Tiruppur City to CJB Airport',
                    desc: 'Tiruppur Old/New Bus Stand, Ugayanur, Railway Station',
                  },
                  {
                    id: 'palladam',
                    title: 'Palladam & Pollachi Corridor',
                    desc: 'Palladam Bus Stand, Pollachi Road, Sulur',
                  },
                ].map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setAirportZone(zone.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition ${
                      airportZone === zone.id
                        ? 'border-[#C62139] bg-red-50/50 ring-1 ring-[#C62139]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{zone.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{zone.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Output: Clean Final Fare Display (Zero Math / Tariff Formula Revealed) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm tracking-wide uppercase text-slate-400">Confirmed Booking Quote</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Guaranteed Upfront Fare
              </span>
            </div>

            <div className="mb-5">
              <span className="text-2xs font-bold uppercase tracking-wider text-[#C62139] bg-red-100/10 px-2 py-0.5 rounded">
                {tripType.toUpperCase()}
              </span>
              <h3 className="text-xl font-bold text-white mt-1.5">{tripTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">{tripSummaryText}</p>
            </div>

            {/* Total Highlight Card */}
            {isCustomQuote ? (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-inner space-y-3">
                <div className="text-2xs font-bold uppercase tracking-wider text-amber-400">
                  Fleet Direct Tariff
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                  Call / WhatsApp for Best Rates
                </div>
                <p className="text-xs text-slate-300">
                  Automated instant quoting is reserved for Sedans. For {currentVehicle.name}, please contact our 24/7 dispatch desk for special seasonal discounts and group packages.
                </p>
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span>⚡</span>
                    <span>Best Price Guarantee</span>
                  </div>
                  <p className="mt-0.5 text-2xs leading-relaxed text-amber-100">
                    Direct operator pricing with zero agent commission.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-inner space-y-3">
                <div className="text-2xs font-bold uppercase tracking-wider text-amber-400">
                  Final Estimated Fare
                </div>
                <div className="flex items-baseline gap-2">
                  {hasLocations ? (
                    <>
                      <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                        ₹{finalFare.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Fixed Quote</span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-slate-300">
                      Enter pickup & drop locations above to estimate fare
                    </span>
                  )}
                </div>

                {/* Disclaimer Notice */}
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <span>⚠️</span>
                    <span>Notice</span>
                  </div>
                  <p className="mt-0.5 text-2xs leading-relaxed text-amber-100">
                    {disclaimer.replace('*', '')}
                  </p>
                </div>
              </div>
            )}

            {/* Ride Assurances */}
            <div className="space-y-2 pt-5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero return kilometer penalty for one-way drops</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sanitized AC vehicle with professional chauffeur</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Doorstep pickup with live driver dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pay chauffeur post-trip via Cash or UPI</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2.5">
            {isCustomQuote ? (
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-100" />
                  <span>WhatsApp for Best Rates</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phonePrimary}`}
                  className="w-full py-3 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Call Dispatch: {CONTACT_INFO.phoneFormatted}</span>
                </a>
              </div>
            ) : (
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber.replace('+', '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>
                  {hasLocations
                    ? `Book Sedan via WhatsApp at ₹${finalFare.toLocaleString('en-IN')}`
                    : 'Book Sedan via WhatsApp'}
                </span>
              </a>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleCopyQuote}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Booking Summary'}
              </button>

              <a
                href={`tel:${CONTACT_INFO.phonePrimary}`}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5" />
                Call 24/7
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
