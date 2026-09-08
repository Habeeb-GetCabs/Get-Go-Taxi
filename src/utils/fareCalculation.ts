/**
 * Official Fare & Tariff Calculation Module for GetGo Taxi (getgotaxi.online)
 * 
 * Rules:
 * - Local City Trips: Base fare ₹80 + ₹28/km based on actual driving distance
 * - Outstation One-Way Drop: ₹26/km with minimum 100 km coverage
 * - Outstation Round Trip: ₹15/km, Driver batta ₹500/day, Minimum 250 km/day coverage
 * - Hill Station Surcharge: ₹400 additional charge for hill destinations (Ooty, Munnar, Kodaikanal, etc.)
 * - Hourly Rental: ₹350/hour (2h: ₹700, 4h: ₹1,400, 8h: ₹2,800, 12h: ₹4,200)
 * - Toll, state permit & parking charges extra if applicable
 */

export interface FareCalculationResult {
  finalFare: number;
  tripType: 'local' | 'hourly' | 'oneway' | 'outstation';
  disclaimer: string;
  isCustomQuote?: boolean;
  estimatedKm?: number;
  isHillStation?: boolean;
  hillCharge?: number;
  baseFare?: number;
  perKmRate?: number;
  driverBata?: number;
}

/**
 * Recognised Hill Stations in Tamil Nadu, Kerala, Karnataka and nearby Western Ghats
 * which incur the ₹400 hill station additional charge (ghat roads, hill permits, cooling/climb engine load).
 */
export const HILL_STATIONS = [
  'ooty',
  'udhagamandalam',
  'nilgiris',
  'coonoor',
  'kotagiri',
  'munnar',
  'kodaikanal',
  'valparai',
  'yercaud',
  'wayanad',
  'topslip',
  'thekkady',
  'kumily',
  'gudalur',
  'kolli hills',
  'yelagiri',
  'vagamon',
  'peermade',
  'vattavada',
  'chinna kallar',
  'manjolai',
  'sholayar',
  'masinagudi',
  'bandipur',
  'mudumalai',
];

/**
 * Checks if a given location string matches any recognized hill station.
 */
export function isHillStation(location: string = ''): boolean {
  if (!location) return false;
  const loc = location.toLowerCase().trim();
  return HILL_STATIONS.some((hill) => loc.includes(hill));
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
  'kovai kondattam': { lat: 10.9575, lon: 76.8835 },
  'kondattam': { lat: 10.9575, lon: 76.8835 },
  'theethipalayam': { lat: 10.9575, lon: 76.8835 },
  'kalampalayam': { lat: 10.9650, lon: 76.8950 },
  'black thunder': { lat: 11.3190, lon: 76.9380 },
  'blackthunder': { lat: 11.3190, lon: 76.9380 },
  'siruvani': { lat: 10.9400, lon: 76.6900 },
  'kovai kutralam': { lat: 10.9350, lon: 76.6900 },
  'kutralam': { lat: 10.9350, lon: 76.6900 },
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
  'town hall': { lat: 10.9960, lon: 76.9610 },
  'townhall': { lat: 10.9960, lon: 76.9610 },
  'selvapuram': { lat: 10.9900, lon: 76.9400 },
  'telungupalayam': { lat: 10.9950, lon: 76.9250 },
  'peelamedu': { lat: 11.0250, lon: 77.0050 },
  'hope college': { lat: 11.0250, lon: 77.0050 },
  'hopes': { lat: 11.0250, lon: 77.0050 },
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
  'koundampalayam': { lat: 11.0450, lon: 76.9380 },
  'thudiyalur': { lat: 11.0760, lon: 76.9380 },
  'periyanaickenpalayam': { lat: 11.1400, lon: 76.9350 },
  'karamadai': { lat: 11.2400, lon: 76.9550 },
  'vadavalli': { lat: 11.0300, lon: 76.9030 },
  'kovaipudur': { lat: 10.9380, lon: 76.9350 },
  'sundarapuram': { lat: 10.9420, lon: 76.9810 },
  'eachanari': { lat: 10.9250, lon: 76.9800 },
  'kuniyamuthur': { lat: 10.9640, lon: 76.9470 },
  'ondipudur': { lat: 11.0020, lon: 77.0540 },
  'irugur': { lat: 11.0150, lon: 77.0750 },
  'sulur': { lat: 11.0260, lon: 77.1260 },
  'neelambur': { lat: 11.0650, lon: 77.0900 },
  'kaniyur': { lat: 11.0850, lon: 77.1250 },
  'perur': { lat: 10.9730, lon: 76.9170 },
  'thondamuthur': { lat: 10.9980, lon: 76.8300 },
  'narasipuram': { lat: 10.9850, lon: 76.7850 },
  'pooluvapatti': { lat: 10.9600, lon: 76.7900 },
  'marudhamalai': { lat: 11.0450, lon: 76.8520 },
  'maruthamalai': { lat: 11.0450, lon: 76.8520 },
  'isha': { lat: 10.9760, lon: 76.7380 },
  'adiyogi': { lat: 10.9760, lon: 76.7380 },
  'dhyanalinga': { lat: 10.9760, lon: 76.7380 },
  'velliangiri': { lat: 10.9760, lon: 76.7380 },
  'alandurai': { lat: 10.9350, lon: 76.7440 },
  'karunya': { lat: 10.9350, lon: 76.7440 },
  'pollachi': { lat: 10.6600, lon: 77.0060 },
  'aliyar': { lat: 10.4900, lon: 76.9700 },
  'monkey falls': { lat: 10.4800, lon: 76.9800 },
  'valparai': { lat: 10.3200, lon: 76.9500 },
  'topslip': { lat: 10.4700, lon: 76.8500 },
  'mettupalayam': { lat: 11.3010, lon: 76.9440 },
  'annur': { lat: 11.2330, lon: 77.1330 },
  'kovilpalayam': { lat: 11.1450, lon: 77.0450 },
  'kurumbapalayam': { lat: 11.1100, lon: 77.0250 },
  'palladam': { lat: 11.0060, lon: 77.2880 },
  'tiruppur': { lat: 11.1085, lon: 77.3411 },
  'kinathukadavu': { lat: 10.8210, lon: 77.0200 },
  'malumichampatti': { lat: 10.8980, lon: 76.9880 },
  'othakkalmandapam': { lat: 10.8800, lon: 76.9800 },
  'chettipalayam': { lat: 10.9100, lon: 77.0400 },
  'madukkarai': { lat: 10.9020, lon: 76.9580 },
  'walayar': { lat: 10.8400, lon: 76.8600 },
  'karumathampatti': { lat: 11.1090, lon: 77.1810 },
  'avinashi': { lat: 11.1920, lon: 77.2690 },
  'brookefields': { lat: 11.0110, lon: 76.9580 },
  'prozone': { lat: 11.0540, lon: 76.9930 },
  'codissia': { lat: 11.0360, lon: 77.0370 },
  'kmch': { lat: 11.0450, lon: 77.0450 },
  'ganga hospital': { lat: 11.0260, lon: 76.9450 },
  'gknm': { lat: 11.0110, lon: 76.9830 },
};

// Known exact road distances for highly queried local routes
export const KNOWN_EXACT_ROUTES: Record<string, number> = {
  'gandhipuram|kovai kondattam': 16,
  'kovai kondattam|gandhipuram': 16,
  'gandhipuram|kondattam': 16,
  'kondattam|gandhipuram': 16,
  'junction|kovai kondattam': 15,
  'kovai kondattam|junction': 15,
  'railway station|kovai kondattam': 15,
  'kovai kondattam|railway station': 15,
  'airport|kovai kondattam': 25,
  'kovai kondattam|airport': 25,
  'rs puram|kovai kondattam': 13,
  'kovai kondattam|rs puram': 13,
  'ukkadam|kovai kondattam': 12,
  'kovai kondattam|ukkadam': 12,
  'peelamedu|kovai kondattam': 20,
  'kovai kondattam|peelamedu': 20,
  'saravanampatti|kovai kondattam': 26,
  'kovai kondattam|saravanampatti': 26,
  'singanallur|kovai kondattam': 20,
  'kovai kondattam|singanallur': 20,
  'gandhipuram|isha': 32,
  'isha|gandhipuram': 32,
  'junction|isha': 30,
  'isha|junction': 30,
  'airport|isha': 42,
  'isha|airport': 42,
  'gandhipuram|marudhamalai': 15,
  'marudhamalai|gandhipuram': 15,
  'gandhipuram|black thunder': 42,
  'black thunder|gandhipuram': 42,
  'gandhipuram|perur': 10,
  'perur|gandhipuram': 10,
  'gandhipuram|eachanari': 12,
  'eachanari|gandhipuram': 12,
  'gandhipuram|airport': 11,
  'airport|gandhipuram': 11,
  'junction|airport': 11,
  'airport|junction': 11,
  'gandhipuram|junction': 4,
  'junction|gandhipuram': 4,
  'gandhipuram|rs puram': 4,
  'rs puram|gandhipuram': 4,
  'gandhipuram|peelamedu': 6,
  'peelamedu|gandhipuram': 6,
  'gandhipuram|singanallur': 8,
  'singanallur|gandhipuram': 8,
  'gandhipuram|saravanampatti': 10,
  'saravanampatti|gandhipuram': 10,
  'gandhipuram|thudiyalur': 10,
  'thudiyalur|gandhipuram': 10,
  'gandhipuram|sulur': 20,
  'sulur|gandhipuram': 20,
  'gandhipuram|podanur': 10,
  'podanur|gandhipuram': 10,
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
 * Calculates road kilometers using Haversine formula scaled by standard city road tortuosity (1.38x)
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
  return Math.round(R * c * 1.38 * 10) / 10;
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
export function getEstimatedTripDistance(
  pickup: string,
  drop: string,
  defaultTripType: 'local' | 'hourly' | 'oneway' | 'outstation' = 'local',
  pickupCoords?: { lat: number; lon: number },
  dropCoords?: { lat: number; lon: number }
): number {
  // If exact coordinates are provided from Geoapify, calculate road distance directly
  if (pickupCoords && dropCoords && pickupCoords.lat && dropCoords.lat) {
    const rawDist = haversineRoadDistanceKm(pickupCoords.lat, pickupCoords.lon, dropCoords.lat, dropCoords.lon);
    if (rawDist > 0) {
      return Math.max(3, Math.round(rawDist));
    }
  }

  const pLower = pickup.toLowerCase().trim();
  const dLower = drop.toLowerCase().trim();

  // 1. Check direct known pair routes first
  for (const [routeKey, km] of Object.entries(KNOWN_EXACT_ROUTES)) {
    const [orig, dest] = routeKey.split('|');
    if ((pLower.includes(orig) && dLower.includes(dest)) || (pLower.includes(dest) && dLower.includes(orig))) {
      return km;
    }
  }

  // 2. Check if either location matches an intercity destination
  for (const [city, km] of Object.entries(KNOWN_INTERCITY_DISTANCES)) {
    if (dLower.includes(city) || pLower.includes(city)) {
      return km;
    }
  }

  // 3. Check coordinates for Coimbatore city & suburban locations
  const coord1 = findCoordinate(pLower);
  const coord2 = findCoordinate(dLower);

  if (coord1 && coord2) {
    const rawDist = haversineRoadDistanceKm(coord1.lat, coord1.lon, coord2.lat, coord2.lon);
    return Math.max(4, Math.round(rawDist));
  }

  if (coord1 || coord2) {
    // One location recognized
    if (defaultTripType === 'outstation') return 160;
    if (defaultTripType === 'oneway') return 120;
    return 14;
  }

  // Fallback defaults if names are unlisted
  if (defaultTripType === 'outstation') return 160;
  if (defaultTripType === 'oneway') return 120;
  return 12;
}

export interface VehicleRateProfile {
  name: string;
  perKmOutstation: number;
  minKmOutstationPerDay: number;
  perKmOneWay: number;
  minKmOneWay: number;
  driverBataPerDay: number;
  localBaseFare: number;
  localPerKmRate: number;
  hourlyPackages: Record<string, number>;
}

export function getVehicleRateProfile(vehicleType: string = ''): VehicleRateProfile {
  const v = vehicleType.toLowerCase().trim();

  if (v.includes('crysta')) {
    return {
      name: 'Innova Crysta',
      perKmOutstation: 22,
      minKmOutstationPerDay: 250,
      perKmOneWay: 36,
      minKmOneWay: 100,
      driverBataPerDay: 700,
      localBaseFare: 150,
      localPerKmRate: 40,
      hourlyPackages: {
        '2 Hours / 20 Km': 1200,
        '4 Hours / 40 Km': 2400,
        '8 Hours / 80 Km': 4200,
        '12 Hours / 120 Km': 5500,
      },
    };
  }

  if (v.includes('innova') || v.includes('suv') || v.includes('ertiga')) {
    return {
      name: 'Innova / SUV',
      perKmOutstation: 19,
      minKmOutstationPerDay: 250,
      perKmOneWay: 32,
      minKmOneWay: 100,
      driverBataPerDay: 600,
      localBaseFare: 120,
      localPerKmRate: 35,
      hourlyPackages: {
        '2 Hours / 20 Km': 1000,
        '4 Hours / 40 Km': 2000,
        '8 Hours / 80 Km': 3600,
        '12 Hours / 120 Km': 4800,
      },
    };
  }

  if (v.includes('tempo') || v.includes('traveller') || v.includes('bus') || v.includes('coach')) {
    return {
      name: 'Tempo Traveller (12-Seater)',
      perKmOutstation: 25,
      minKmOutstationPerDay: 300,
      perKmOneWay: 40,
      minKmOneWay: 100,
      driverBataPerDay: 800,
      localBaseFare: 200,
      localPerKmRate: 45,
      hourlyPackages: {
        '2 Hours / 20 Km': 1600,
        '4 Hours / 40 Km': 3000,
        '8 Hours / 80 Km': 5200,
        '12 Hours / 120 Km': 6800,
      },
    };
  }

  // Default: Sedan Taxi (Maruti Swift Dzire / Toyota Etios)
  return {
    name: 'Sedan Taxi',
    perKmOutstation: 15,          // ₹15/km for outstation round trip
    minKmOutstationPerDay: 250,   // Min 250 km coverage per day
    perKmOneWay: 26,              // ₹26/km for outstation one-way
    minKmOneWay: 100,             // Min 100 km coverage for one-way
    driverBataPerDay: 500,        // Driver Batta ₹500/day
    localBaseFare: 80,            // Local base fare ₹80
    localPerKmRate: 28,           // Local ₹28/km
    hourlyPackages: {
      '2 Hours / 20 Km': 700,
      '4 Hours / 40 Km': 1400,
      '8 Hours / 80 Km': 2800,
      '12 Hours / 120 Km': 4200,
    },
  };
}

/**
 * Computes the Final Fare for all vehicles (Sedan, Innova, Crysta, Tempo Traveller)
 * across all trip types (Local, Hourly, One-Way, Outstation).
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
  const profile = getVehicleRateProfile(vehicleType);

  // Check for Hill Station destination or pickup (e.g. Ooty, Munnar, Kodaikanal)
  const isHill = isHillStation(pickup) || isHillStation(drop);
  const hillCharge = isHill ? 400 : 0;

  // 1. HOURLY RENTAL
  if (tripType === 'hourly') {
    let matchedRate = profile.hourlyPackages[hourlyPackage];

    if (!matchedRate) {
      if (hourlyPackage.includes('2')) matchedRate = profile.hourlyPackages['2 Hours / 20 Km'] || 700;
      else if (hourlyPackage.includes('4')) matchedRate = profile.hourlyPackages['4 Hours / 40 Km'] || 1400;
      else if (hourlyPackage.includes('12')) matchedRate = profile.hourlyPackages['12 Hours / 120 Km'] || 4200;
      else matchedRate = profile.hourlyPackages['8 Hours / 80 Km'] || 2800;
    }

    return {
      finalFare: matchedRate,
      tripType: 'hourly',
      isCustomQuote: false,
      disclaimer: '*Local city package • Toll, parking & extra hours charged at actuals',
    };
  }

  // Determine actual trip distance
  const routeDistance = distanceKm !== undefined
    ? distanceKm
    : getEstimatedTripDistance(pickup, drop, tripType);

  // 2. ONE WAY DROP TAXI: ₹26/km with minimum 100 km coverage (+ ₹400 for hill stations)
  if (tripType === 'oneway') {
    const billableKm = Math.max(profile.minKmOneWay, routeDistance);
    const finalFare = Math.round(billableKm * profile.perKmOneWay) + hillCharge;

    return {
      finalFare,
      tripType: 'oneway',
      isCustomQuote: false,
      estimatedKm: routeDistance,
      isHillStation: isHill,
      hillCharge,
      perKmRate: profile.perKmOneWay,
      disclaimer: `*Direct point-to-point drop (~${routeDistance} km) • Toll & state permit extra if applicable`,
    };
  }

  // 3. OUTSTATION ROUND TRIP: ₹15/km, Driver Batta ₹500/day, Minimum 250 km/day (+ ₹400 for hill stations)
  if (tripType === 'outstation') {
    const tripDays = Math.max(1, Number(days) || 1);
    const totalTripDistance = routeDistance * 2; // round trip
    const minBillableKm = profile.minKmOutstationPerDay * tripDays;
    const billableKm = Math.max(minBillableKm, totalTripDistance);
    const finalFare = Math.round(billableKm * profile.perKmOutstation + profile.driverBataPerDay * tripDays) + hillCharge;

    return {
      finalFare,
      tripType: 'outstation',
      isCustomQuote: false,
      estimatedKm: routeDistance,
      isHillStation: isHill,
      hillCharge,
      perKmRate: profile.perKmOutstation,
      driverBata: profile.driverBataPerDay * tripDays,
      disclaimer: `*Round trip package (${tripDays} Day${tripDays > 1 ? 's' : ''}) • Toll, permit & parking extra if applicable`,
    };
  }

  // 4. LOCAL CAB: Base fare ₹80 + ₹28/km (+ ₹400 if hill destination)
  if (routeDistance >= 45) {
    const billableKm = Math.max(profile.minKmOneWay, routeDistance);
    const finalFare = Math.round(billableKm * profile.perKmOneWay) + hillCharge;
    return {
      finalFare,
      tripType: 'local',
      isCustomQuote: false,
      estimatedKm: routeDistance,
      isHillStation: isHill,
      hillCharge,
      perKmRate: profile.perKmOneWay,
      disclaimer: `*Estimated for ~${routeDistance} km • Toll & state permit extra if applicable`,
    };
  }

  // Real local in-city distance: Base fare ₹80 + ₹28/km
  const localFare = Math.round(profile.localBaseFare + routeDistance * profile.localPerKmRate) + hillCharge;
  return {
    finalFare: localFare,
    tripType: 'local',
    isCustomQuote: false,
    estimatedKm: routeDistance,
    isHillStation: isHill,
    hillCharge,
    baseFare: profile.localBaseFare,
    perKmRate: profile.localPerKmRate,
    disclaimer: `*Estimated for ~${routeDistance} km • Toll & parking extra if applicable`,
  };
}
