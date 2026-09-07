/**
 * Official Fare & Tariff Calculation Module for GetGo Taxi (getgotaxi.online)
 * 
 * Rules:
 * - Automated Quotes ONLY for Sedans (Maruti Swift Dzire, Toyota Etios)
 * - For ALL other vehicles (Innova, Innova Crysta, Tempo Traveller, Mini Bus, Coach):
 *   Display "Call or WhatsApp for Best Rates"
 * - Sedan Tariffs:
 *   - Local City Trips: Base fare ₹80 + ₹28/km based on actual driving distance
 *   - Hourly Rental: ₹350/hour (2h: ₹700, 4h: ₹1,400, 8h: ₹2,800, 12h: ₹4,200)
 *   - One-Way Drop Taxi: ₹16/km, Minimum 130 km coverage, Driver bata ₹500
 *   - Outstation Round Trip: ₹16/km, Minimum 250 km/day, Driver bata ₹500/day
 *   - Toll, state permit & parking charges extra if applicable
 */

export interface FareCalculationResult {
  finalFare: number;
  tripType: 'local' | 'hourly' | 'oneway' | 'outstation';
  disclaimer: string;
  isCustomQuote?: boolean;
  estimatedKm?: number;
}

/**
 * Checks if a vehicle is a Sedan (or default)
 */
export function isSedanVehicle(vehicle: string = ''): boolean {
  const v = vehicle.toLowerCase().trim();
  if (!v) return true;
  if (
    v.includes('innova') ||
    v.includes('suv') ||
    v.includes('crysta') ||
    v.includes('tempo') ||
    v.includes('traveller') ||
    v.includes('bus') ||
    v.includes('coach') ||
    v.includes('urbania') ||
    v === 'innova' ||
    v === 'tempo' ||
    v === 'crysta'
  ) {
    return false;
  }
  return true;
}

// Prominent Coimbatore & regional geographic coordinate hubs
export const COIMBATORE_COORDINATES: Record<string, { lat: number; lon: number }> = {
  'airport': { lat: 11.0300, lon: 77.0434 },
  'cjb': { lat: 11.0300, lon: 77.0434 },
  'gandhipuram': { lat: 11.0168, lon: 76.9676 },
  'junction': { lat: 10.9980, lon: 76.9634 },
  'railway station': { lat: 10.9980, lon: 76.9634 },
  'north railway station': { lat: 11.0267, lon: 76.9535 },
  'podanur': { lat: 10.9636, lon: 76.9858 },
  'rs puram': { lat: 11.0125, lon: 76.9450 },
  'r.s. puram': { lat: 11.0125, lon: 76.9450 },
  'saibaba colony': { lat: 11.0290, lon: 76.9430 },
  'race course': { lat: 11.0060, lon: 76.9740 },
  'peelamedu': { lat: 11.0250, lon: 77.0050 },
  'hope college': { lat: 11.0250, lon: 77.0050 },
  'psg': { lat: 11.0250, lon: 77.0050 },
  'fun republic': { lat: 11.0240, lon: 77.0120 },
  'fun mall': { lat: 11.0240, lon: 77.0120 },
  'tidel park': { lat: 11.0270, lon: 77.0280 },
  'singanallur': { lat: 10.9985, lon: 77.0260 },
  'ramanathapuram': { lat: 10.9950, lon: 76.9930 },
  'ukkadam': { lat: 10.9890, lon: 76.9610 },
  'saravanampatti': { lat: 11.0797, lon: 76.9995 },
  'chil sez': { lat: 11.0850, lon: 77.0050 },
  'kalapatti': { lat: 11.0710, lon: 77.0380 },
  'ganapathy': { lat: 11.0370, lon: 76.9820 },
  'thudiyalur': { lat: 11.0760, lon: 76.9380 },
  'vadavalli': { lat: 11.0300, lon: 76.9030 },
  'kovaipudur': { lat: 10.9380, lon: 76.9350 },
  'sundarapuram': { lat: 10.9420, lon: 76.9810 },
  'eachanari': { lat: 10.9250, lon: 76.9800 },
  'kuniyamuthur': { lat: 10.9640, lon: 76.9470 },
  'ondipudur': { lat: 11.0020, lon: 77.0540 },
  'sulur': { lat: 11.0260, lon: 77.1260 },
  'perur': { lat: 10.9730, lon: 76.9170 },
  'marudhamalai': { lat: 11.0450, lon: 76.8520 },
  'isha': { lat: 10.9760, lon: 76.7380 },
  'velliangiri': { lat: 10.9760, lon: 76.7380 },
  'alandurai': { lat: 10.9350, lon: 76.7440 },
  'karunya': { lat: 10.9350, lon: 76.7440 },
  'pollachi': { lat: 10.6600, lon: 77.0060 },
  'mettupalayam': { lat: 11.3010, lon: 76.9440 },
  'annur': { lat: 11.2330, lon: 77.1330 },
  'palladam': { lat: 11.0060, lon: 77.2880 },
  'tiruppur': { lat: 11.1085, lon: 77.3411 },
  'kinathukadavu': { lat: 10.8210, lon: 77.0200 },
  'malumichampatti': { lat: 10.8980, lon: 76.9880 },
  'madukkarai': { lat: 10.9020, lon: 76.9580 },
  'karumathampatti': { lat: 11.1090, lon: 77.1810 },
  'avinashi': { lat: 11.1920, lon: 77.2690 },
  'brookefields': { lat: 11.0110, lon: 76.9580 },
  'prozone': { lat: 11.0540, lon: 76.9930 },
  'codissia': { lat: 11.0360, lon: 77.0370 },
};

// Distance lookup for popular intercity routes from/to Coimbatore/Tiruppur (in KM)
export const KNOWN_INTERCITY_DISTANCES: Record<string, number> = {
  bangalore: 360,
  bengaluru: 360,
  chennai: 505,
  salem: 165,
  madurai: 215,
  trichy: 215,
  tiruchirappalli: 215,
  kochi: 190,
  cochin: 190,
  ernakulam: 190,
  palani: 105,
  ooty: 86,
  udhagamandalam: 86,
  nilgiris: 86,
  coonoor: 72,
  kotagiri: 72,
  munnar: 160,
  kodaikanal: 175,
  tiruppur: 55,
  erode: 100,
  mysore: 200,
  mysuru: 200,
  coorg: 275,
  madikeri: 275,
  dindigul: 155,
  palakkad: 55,
  pollachi: 45,
  valparai: 105,
  vellore: 370,
  pondicherry: 380,
  puducherry: 380,
  calicut: 180,
  kozhikode: 180,
  wayanad: 210,
  thanjavur: 270,
  tanjore: 270,
  rameswaram: 385,
  kanyakumari: 435,
  thrissur: 115,
  guruvayur: 140,
  alleppey: 240,
  alappuzha: 240,
  thekkady: 220,
  kumily: 220,
  trivandrum: 380,
  thiruvananthapuram: 380,
  tirunelveli: 340,
  kumbakonam: 310,
  hosur: 325,
  krishnagiri: 270,
  dharmapuri: 220,
  namakkal: 150,
  karur: 135,
  theni: 175,
  topslip: 75,
  anamalai: 75,
  yercaud: 195,
};

// Hourly rental package rates for Sedan (₹350 / hour base)
export const HOURLY_PACKAGE_RATES: Record<string, number> = {
  '2 Hours / 20 Km': 700,
  '2 Hours / 20 Km (City Errands)': 700,
  '4 Hours / 40 Km': 1400,
  '4 Hours / 40 Km (Half Day)': 1400,
  '8 Hours / 80 Km (Full Day)': 2800,
  '8 Hours / 80 Km': 2800,
  '8 Hours / 80 Km (Full Day - Popular)': 2800,
  '12 Hours / 120 Km': 4200,
  '12 Hours / 120 Km (Extended Day)': 4200,
  '12 Hours / 120 Km (Extended Full Day)': 4200,
};

/**
 * Calculates road kilometers using Haversine formula scaled by standard road tortuosity (1.32x)
 */
function haversineRoadDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1.32 * 10) / 10;
}

function findCoordinate(text: string): { lat: number; lon: number } | null {
  const lower = text.toLowerCase();
  for (const [key, coords] of Object.entries(COIMBATORE_COORDINATES)) {
    if (lower.includes(key)) {
      return coords;
    }
  }
  return null;
}

/**
 * Accurately estimates road distance between pickup and drop points
 */
export function getEstimatedTripDistance(pickup: string, drop: string, defaultTripType: 'local' | 'hourly' | 'oneway' | 'outstation' = 'local'): number {
  const pLower = pickup.toLowerCase().trim();
  const dLower = drop.toLowerCase().trim();

  // 1. Check if either location matches an intercity destination
  for (const [city, km] of Object.entries(KNOWN_INTERCITY_DISTANCES)) {
    if (dLower.includes(city) || pLower.includes(city)) {
      return km;
    }
  }

  // 2. Check coordinates for Coimbatore city & suburban locations
  const coord1 = findCoordinate(pLower);
  const coord2 = findCoordinate(dLower);

  if (coord1 && coord2) {
    const rawDist = haversineRoadDistanceKm(coord1.lat, coord1.lon, coord2.lat, coord2.lon);
    return Math.max(4, Math.round(rawDist));
  }

  if (coord1 || coord2) {
    // One location matched (e.g. Airport to unknown street, or Gandhipuram to an office)
    const known = coord1 || coord2!;
    const center = COIMBATORE_COORDINATES['gandhipuram'];
    const distToCenter = haversineRoadDistanceKm(known.lat, known.lon, center.lat, center.lon);
    return Math.max(6, Math.round(distToCenter + 5));
  }

  // Fallback defaults if names are unlisted
  if (defaultTripType === 'outstation') return 160;
  if (defaultTripType === 'oneway') return 130;
  return 12;
}

/**
 * Computes the Final Fare for Sedan ONLY.
 * For any other vehicle, flags isCustomQuote: true with "Call or WhatsApp for Best Rates".
 */
export function calculateFinalFare({
  tripType,
  pickup = '',
  drop = '',
  hourlyPackage = '8 Hours / 80 Km (Full Day)',
  days = 1,
  vehicleType = 'Sedan (Dzire / Etios)',
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
  // RULE 1: ONLY QUOTE FOR SEDANS. ALL OTHER VEHICLES REQUIRE CALL OR WHATSAPP FOR BEST RATES.
  if (!isSedanVehicle(vehicleType)) {
    return {
      finalFare: 0,
      tripType,
      isCustomQuote: true,
      disclaimer: 'Call or WhatsApp for our best negotiated rates on SUVs & Travellers',
    };
  }

  // 2. HOURLY RENTAL (SEDAN)
  if (tripType === 'hourly') {
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
      disclaimer: '*Toll, parking & extra hours (₹150/hr) charged at actuals',
    };
  }

  // Determine actual trip distance
  const routeDistance = distanceKm !== undefined
    ? distanceKm
    : getEstimatedTripDistance(pickup, drop, tripType);

  // 3. ONE WAY DROP TAXI (SEDAN)
  // Rate: ₹16/km, Minimum 130 km coverage, Driver bata ₹500
  if (tripType === 'oneway') {
    const billableKm = Math.max(130, routeDistance);
    const finalFare = Math.round(billableKm * 16 + 500);

    return {
      finalFare,
      tripType: 'oneway',
      estimatedKm: routeDistance,
      disclaimer: '*Toll, state permit & parking charges extra if applicable',
    };
  }

  // 4. OUTSTATION ROUND TRIP (SEDAN)
  // Rate: ₹16/km, Minimum 250 km coverage per day, Driver bata ₹500 per day
  if (tripType === 'outstation') {
    const tripDays = Math.max(1, Number(days) || 1);
    const totalTripDistance = routeDistance * 2; // round trip
    const minBillableKm = 250 * tripDays;
    const billableKm = Math.max(minBillableKm, totalTripDistance);
    const finalFare = Math.round(billableKm * 16 + 500 * tripDays);

    return {
      finalFare,
      tripType: 'outstation',
      estimatedKm: routeDistance,
      disclaimer: `*Min ${minBillableKm} km billable (${tripDays} Day${tripDays > 1 ? 's' : ''}) • Toll & permit extra`,
    };
  }

  // 5. LOCAL CAB (SEDAN)
  // Check if destination is actually an intercity route (>= 45 km)
  if (routeDistance >= 45) {
    const billableKm = Math.max(130, routeDistance);
    const finalFare = Math.round(billableKm * 16 + 500);
    return {
      finalFare,
      tripType: 'local',
      estimatedKm: routeDistance,
      disclaimer: `*Outstation route detected (${routeDistance} km) • ₹16/km + ₹500 Driver Bata`,
    };
  }

  // Real local in-city distance: Base fare ₹80 + ₹28 per km (rounded to nearest 10)
  const localFare = Math.round((80 + routeDistance * 28) / 10) * 10;
  return {
    finalFare: localFare,
    tripType: 'local',
    estimatedKm: routeDistance,
    disclaimer: `*Estimated distance: ${routeDistance} km • Parking & entry charges extra if applicable`,
  };
}
