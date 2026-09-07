/**
 * Official Fare & Tariff Calculation Module for GetGo Taxi
 * Configured with current verified tariffs:
 * - Local: Base fare ₹80, Per km ₹28
 * - Hourly Rental: ₹350 / hour (2h: ₹700, 4h: ₹1,400, 8h: ₹2,800, 12h: ₹4,200)
 * - One Way: ₹16 / km, Minimum 130 km coverage, Driver bata ₹500
 * - Outstation: ₹15 / km, Minimum 250 km coverage / day, Driver bata ₹500 / day
 * - Toll, state permit & parking charges extra if applicable for Outstation and One-Way
 */

export interface FareCalculationResult {
  finalFare: number;
  tripType: 'local' | 'hourly' | 'oneway' | 'outstation';
  disclaimer: string;
  isCustomQuote?: boolean;
}

// Distance lookup for popular intercity routes from/to Coimbatore (in KM)
export const KNOWN_INTERCITY_DISTANCES: Record<string, number> = {
  bangalore: 360,
  bengaluru: 360,
  chennai: 505,
  salem: 165,
  madurai: 215,
  trichy: 215,
  tiruchirappalli: 215,
  'kochi / ernakulam': 190,
  kochi: 190,
  ernakulam: 190,
  palani: 105,
  ooty: 86,
  'ooty / nilgiris': 86,
  nilgiris: 86,
  coonoor: 72,
  munnar: 160,
  'munnar / kerala': 160,
  kodaikanal: 175,
  tiruppur: 55,
  erode: 100,
  mysore: 200,
  mysuru: 200,
  coorg: 275,
  dindigul: 155,
  palakkad: 55,
  pollachi: 45,
  valparai: 105,
  vellore: 370,
  pondicherry: 380,
  puducherry: 380,
  calicut: 180,
  kozhikode: 180,
  thanjavaur: 270,
  thanjavur: 270,
  rameswaram: 385,
  kanyakumari: 435,
};

// Hourly rental package rates (₹350 / hour)
export const HOURLY_PACKAGE_RATES: Record<string, number> = {
  '2 Hours / 20 Km': 700,
  '4 Hours / 40 Km': 1400,
  '8 Hours / 80 Km (Full Day)': 2800,
  '8 Hours / 80 Km': 2800,
  '12 Hours / 120 Km': 4200,
  '12 Hours / 120 Km (Extended Day)': 4200,
};

/**
 * Finds known distance from text input or defaults
 */
export function getRouteDistance(pickup: string, drop: string, defaultKm = 130): number {
  const pLower = pickup.toLowerCase();
  const dLower = drop.toLowerCase();

  for (const [city, km] of Object.entries(KNOWN_INTERCITY_DISTANCES)) {
    if (dLower.includes(city) || pLower.includes(city)) {
      return km;
    }
  }

  return defaultKm;
}

/**
 * Estimate local Coimbatore in-city distance based on location names
 */
export function getLocalEstimatedDistance(pickup: string, drop: string): number {
  const p = pickup.toLowerCase();
  const d = drop.toLowerCase();

  if (!p || !d) return 10; // default average city trip 10 km

  // Airport transfers
  if (p.includes('airport') || d.includes('airport')) {
    if (p.includes('gandhipuram') || d.includes('gandhipuram')) return 12;
    if (p.includes('rs puram') || d.includes('rs puram')) return 15;
    if (p.includes('saravanampatti') || d.includes('saravanampatti')) return 14;
    if (p.includes('ukkadam') || d.includes('ukkadam')) return 14;
    if (p.includes('peelamedu') || d.includes('peelamedu')) return 6;
    return 12;
  }

  // Marudhamalai or Isha
  if (p.includes('isha') || d.includes('isha')) return 32;
  if (p.includes('marudhamalai') || d.includes('marudhamalai')) return 16;
  if (p.includes('perur') || d.includes('perur')) return 10;

  // Between distant suburbs
  if (
    (p.includes('saravanampatti') && (d.includes('ukkadam') || d.includes('sundarapuram') || d.includes('kovaipudur'))) ||
    (d.includes('saravanampatti') && (p.includes('ukkadam') || p.includes('sundarapuram') || p.includes('kovaipudur')))
  ) {
    return 18;
  }

  // Cross city (Gandhipuram to Ukkadam or RS Puram)
  if (
    (p.includes('gandhipuram') && d.includes('ukkadam')) ||
    (d.includes('gandhipuram') && p.includes('ukkadam'))
  ) {
    return 6;
  }

  return 10;
}

/**
 * Computes ONLY the Final Fare without exposing formulas or math steps
 */
export function calculateFinalFare({
  tripType,
  pickup = '',
  drop = '',
  hourlyPackage = '8 Hours / 80 Km (Full Day)',
  days = 1,
  vehicleType = 'Sedan Taxi',
  distanceKm,
}: {
  tripType: 'local' | 'hourly' | 'oneway' | 'outstation';
  pickup?: string;
  drop?: string;
  hourlyPackage?: string;
  days?: number;
  vehicleType?: string;
  distanceKm?: number;
}): FareCalculationResult {
  // 1. LOCAL CAB
  // Base fare ₹80, Per km charges ₹28
  if (tripType === 'local') {
    const estKm = distanceKm !== undefined ? distanceKm : getLocalEstimatedDistance(pickup, drop);
    const finalFare = 80 + estKm * 28;
    return {
      finalFare,
      tripType: 'local',
      disclaimer: '*Parking & entry charges extra if applicable',
    };
  }

  // 2. HOURLY RENTAL
  // ₹350 / hour
  if (tripType === 'hourly') {
    // Look up package price
    const matchedRate =
      HOURLY_PACKAGE_RATES[hourlyPackage] ||
      (hourlyPackage.includes('2')
        ? 700
        : hourlyPackage.includes('4')
        ? 1400
        : hourlyPackage.includes('12')
        ? 4200
        : 2800);

    return {
      finalFare: matchedRate,
      tripType: 'hourly',
      disclaimer: '*Parking & toll charges extra if applicable',
    };
  }

  // 3. ONE WAY DROP TAXI
  // ₹16 per km, minimum 130 km coverage, driver bata ₹500
  // Toll, permit, parking charges extra if applicable
  if (tripType === 'oneway') {
    const routeKm = distanceKm !== undefined ? distanceKm : getRouteDistance(pickup, drop, 130);
    const billableKm = Math.max(130, routeKm);
    const finalFare = billableKm * 16 + 500;

    return {
      finalFare,
      tripType: 'oneway',
      disclaimer: '*Toll, state permit & parking charges extra if applicable',
    };
  }

  // 4. OUTSTATION ROUND TRIP
  // ₹15 per km, minimum 250 km coverage per day, driver bata ₹500 per day
  // Toll, permit, parking charges extra if applicable
  const tripDays = Math.max(1, Number(days) || 1);
  const totalTripDistance = distanceKm !== undefined ? distanceKm : (getRouteDistance(pickup, drop, 150) * 2);
  const minBillableKm = 250 * tripDays;
  const billableKm = Math.max(minBillableKm, totalTripDistance);

  const finalFare = billableKm * 15 + 500 * tripDays;

  return {
    finalFare,
    tripType: 'outstation',
    disclaimer: '*Toll, state permit & parking charges extra if applicable',
  };
}
