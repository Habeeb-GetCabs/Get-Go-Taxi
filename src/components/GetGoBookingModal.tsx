import { useState, useMemo, type FormEvent } from 'react';
import { Calendar, Car, Clock, MapPin, Phone, Users, X } from 'lucide-react';
import { GETGO_CONTACT } from '../data/tourData';
import AddressAutocomplete from './AddressAutocomplete';
import { calculateFinalFare } from '../utils/fareCalculation';

interface GetGoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'local' | 'hourly' | 'oneway' | 'outstation';
  initialPackage?: string;
}

export default function GetGoBookingModal({
  isOpen,
  onClose,
  initialType = 'local',
  initialPackage = '8 Hours / 80 Km (Full Day)',
}: GetGoBookingModalProps) {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const [tripType, setTripType] = useState<'local' | 'hourly' | 'oneway' | 'outstation'>(initialType);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [hourlyPackage, setHourlyPackage] = useState(initialPackage);
  const [date, setDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);
  const [vehicle, setVehicle] = useState('Sedan (Dzire / Etios)');
  const [passengers, setPassengers] = useState('4');

  // Compute duration in days between departure and return calendar dates
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 1;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    if (isNaN(diffTime) || diffTime < 0) return 1;
    return Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
  };

  const outstationDays = useMemo(() => {
    return calculateDays(date, returnDate);
  }, [date, returnDate]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (returnDate && returnDate < newDate) {
      setReturnDate(newDate);
    }
  };

  // Compute final fare without exposing internal tariff formulas
  const fareResult = useMemo(() => {
    let days = 1;
    if (tripType === 'outstation') {
      days = outstationDays;
    }
    return calculateFinalFare({
      tripType,
      pickup,
      drop,
      hourlyPackage,
      days,
      vehicleType: vehicle,
    });
  }, [tripType, pickup, drop, hourlyPackage, outstationDays, vehicle]);

  const hasLocations = tripType === 'hourly'
    ? Boolean(pickup.trim())
    : Boolean(pickup.trim() && drop.trim());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let details = '';
    if (tripType === 'hourly') {
      details = `*Package:* ${hourlyPackage}%0A*Pickup City:* ${pickup}%0A`;
    } else if (tripType === 'oneway') {
      details = `*Pickup City:* ${pickup}%0A*Drop Destination:* ${drop || 'City Center'} (Zero Return Fare)%0A`;
    } else if (tripType === 'outstation') {
      details = `*Pickup City:* ${pickup}%0A*Destination:* ${drop || 'Outstation'} (Round Trip)%0A*Departure Date:* ${date}%0A*Return Date:* ${returnDate} (${outstationDays} Day${outstationDays > 1 ? 's' : ''} Round Trip)%0A`;
    } else {
      // local
      details = `*Pickup Area:* ${pickup}%0A*Drop Area:* ${drop || 'Local City'}%0A`;
    }

    const text = `*Cab Booking Request - GetGo Taxi*%0A%0A` +
      `*Trip Category:* ${tripType.toUpperCase()} CAB%0A` +
      details +
      (tripType !== 'outstation' ? `*Travel Date:* ${date}%0A` : '') +
      `*Preferred Vehicle:* ${vehicle}%0A` +
      `*Estimated Final Fare:* ₹${fareResult.finalFare.toLocaleString('en-IN')}%0A` +
      `*Note:* ${fareResult.disclaimer.replace('*', '')}%0A` +
      `*Passengers:* ${passengers} Persons%0A%0A` +
      `Hello GetGo Taxi, please confirm cab booking and driver dispatch details.`;

    window.open(`https://wa.me/${GETGO_CONTACT.whatsappNumber.replace('+', '')}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="text-base font-black">Book Cabs & Hourly Rentals</h3>
            <p className="text-2xs text-amber-300 font-bold">GetGo Taxi</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Trip Category Tabs */}
          <div>
            <label className="block text-2xs font-bold uppercase text-slate-700 mb-1">
              Trip Category
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
              {[
                { id: 'local', label: 'Local' },
                { id: 'hourly', label: 'Hourly' },
                { id: 'oneway', label: 'One Way' },
                { id: 'outstation', label: 'Outstation' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTripType(tab.id as any)}
                  className={`py-2 px-1 rounded-lg text-xs transition text-center ${
                    tripType === tab.id
                      ? 'bg-[#C62139] text-white shadow-xs font-black'
                      : 'hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {tripType === 'hourly' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <AddressAutocomplete
                  id="modal-pickup-hourly"
                  label="Pickup Location"
                  value={pickup}
                  onChange={setPickup}
                  placeholder="e.g. Gandhipuram / Airport / Ukkadam"
                  required
                  tripType={tripType}
                />
              </div>
              <div>
                <label htmlFor="modal-hourly-pkg-select" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                  Hourly Package
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#C62139] absolute left-3 top-3 pointer-events-none" />
                  <select
                    id="modal-hourly-pkg-select"
                    aria-label="Hourly Package"
                    value={hourlyPackage}
                    onChange={(e) => setHourlyPackage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  >
                    <option value="2 Hours / 20 Km">2 Hours / 20 Km (City Errands)</option>
                    <option value="4 Hours / 40 Km">4 Hours / 40 Km (Half Day)</option>
                    <option value="8 Hours / 80 Km (Full Day)">8 Hours / 80 Km (Full Day)</option>
                    <option value="12 Hours / 120 Km">12 Hours / 120 Km (Extended Day)</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <AddressAutocomplete
                  id="modal-pickup-location"
                  label={
                    tripType === 'oneway'
                      ? 'Pickup City'
                      : tripType === 'outstation'
                      ? 'Starting City'
                      : 'Pickup Area'
                  }
                  value={pickup}
                  onChange={setPickup}
                  placeholder={
                    tripType === 'local'
                      ? 'e.g. Gandhipuram / RS Puram / Ukkadam'
                      : 'e.g. Coimbatore / Airport / Tiruppur'
                  }
                  required
                  tripType={tripType}
                />
              </div>
              <div>
                <AddressAutocomplete
                  id="modal-drop-location"
                  label={
                    tripType === 'oneway'
                      ? 'Drop City (Zero Return)'
                      : tripType === 'outstation'
                      ? 'Destination'
                      : 'Drop Area'
                  }
                  value={drop}
                  onChange={setDrop}
                  placeholder={
                    tripType === 'oneway'
                      ? 'e.g. Bangalore / Chennai / Salem / Madurai'
                      : tripType === 'outstation'
                      ? 'e.g. Munnar / Kodaikanal / Mysore'
                      : 'e.g. Saravanampatti / Airport / Peelamedu'
                  }
                  required
                  isDestination
                  tripType={tripType}
                  iconColor="text-red-500"
                />
              </div>
            </div>
          )}

          {tripType === 'outstation' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-departure-date" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                    Departure Date (Calendar)
                  </label>
                  <input
                    id="modal-departure-date"
                    aria-label="Departure Date"
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="modal-return-date" className="block text-2xs font-bold uppercase text-slate-700">
                      Return Date (Calendar)
                    </label>
                    <span className="text-3xs font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {outstationDays} Day{outstationDays > 1 ? 's' : ''} Round Trip
                    </span>
                  </div>
                  <input
                    id="modal-return-date"
                    aria-label="Return Date"
                    type="date"
                    min={date}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-passengers-outstation" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                    Passengers
                  </label>
                  <input
                    id="modal-passengers-outstation"
                    aria-label="Passengers Count"
                    type="number"
                    min="1"
                    max="40"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label htmlFor="modal-vehicle-outstation" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    id="modal-vehicle-outstation"
                    aria-label="Vehicle Type"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                  >
                    <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios - Up to 4 pax)</option>
                    <option value="Innova SUV (6-7 Seater)">Innova SUV (6 - 7 pax)</option>
                    <option value="Innova Crysta Luxury">Innova Crysta Luxury</option>
                    <option value="Tempo Traveller (12-20 Seater)">Tempo Traveller (12 - 20 pax)</option>
                    <option value="Mini Bus (25-35 Seater)">Mini Bus / Coach (25 - 35 pax)</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="modal-travel-date-local" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                  Travel Date
                </label>
                <input
                  id="modal-travel-date-local"
                  aria-label="Travel Date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                />
              </div>
              <div>
                <label htmlFor="modal-passengers-local" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                  Passengers
                </label>
                <input
                  id="modal-passengers-local"
                  aria-label="Passengers Count"
                  type="number"
                  min="1"
                  max="40"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                />
              </div>
              <div>
                <label htmlFor="modal-vehicle-local" className="block text-2xs font-bold uppercase text-slate-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  id="modal-vehicle-local"
                  aria-label="Vehicle Type"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#C62139] focus:outline-hidden"
                >
                  <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios - Up to 4 pax)</option>
                  <option value="Innova SUV (6-7 Seater)">Innova SUV (6 - 7 pax)</option>
                  <option value="Innova Crysta Luxury">Innova Crysta Luxury</option>
                  <option value="Tempo Traveller (12-20 Seater)">Tempo Traveller (12 - 20 pax)</option>
                  <option value="Mini Bus (25-35 Seater)">Mini Bus / Coach (25 - 35 pax)</option>
                </select>
              </div>
            </div>
          )}

          {/* Clean Final Fare Card - No math formula shown */}
          <div className="p-3.5 bg-gradient-to-r from-red-50 to-amber-50/60 border border-red-200 rounded-xl">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-3xs font-black uppercase tracking-wider text-slate-500 block">
                  Estimated Final Fare
                </span>
                <div className="text-[#C62139] tracking-tight font-black">
                  {hasLocations ? (
                    <span className="text-xl sm:text-2xl">₹{fareResult.finalFare.toLocaleString('en-IN')}</span>
                  ) : (
                    <span className="text-2xs sm:text-xs font-bold text-slate-500 block pt-0.5">
                      Enter pickup & drop location to estimate
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block text-3xs font-semibold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded leading-tight">
                  {fareResult.disclaimer}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#C62139] hover:bg-[#9E1B2E] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>
              {hasLocations
                ? `Confirm & Book at ₹${fareResult.finalFare.toLocaleString('en-IN')}`
                : 'Confirm & Book via WhatsApp'}
            </span>
          </button>

          <a
            href={`tel:${GETGO_CONTACT.phone}`}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <span>Or Call Directly: {GETGO_CONTACT.phoneFormatted}</span>
          </a>
        </form>
      </div>
    </div>
  );
}
