export interface VehicleTariff {
  id: string;
  name: string;
  category: 'sedan' | 'suv' | 'tempo' | 'bus';
  models: string;
  seats: string;
  luggage: string;
  ac: boolean;
  perKmRate: number; // in INR
  minKmPerDayOutstation: number;
  driverBataPerDay: number; // in INR
  nightAllowancePerNight: number;
  description: string;
  hourlyPackages: {
    durationHours: number;
    baseFare: number;
    freeKm: number;
    extraKmRate: number;
    extraTimeRate: string; // e.g., '₹2/min' or '₹250/hr'
    extraTimeCostPerHour: number;
  }[];
}

export interface TourPackage {
  id: string;
  title: string;
  category: 'hill-station' | 'pilgrimage' | 'heritage' | 'nature-wildlife';
  tag: string;
  duration: string;
  durationDays: number;
  distanceFromCoimbatore: string;
  routeHighlight: string;
  overview: string;
  keyAttractions: string[];
  suggestedItinerary: {
    day: number;
    title: string;
    description: string;
    places: string[];
  }[];
  vehiclePricing: {
    sedanEstimate: number;
    innovaEstimate: number;
    tempoTravellerEstimate: number;
  };
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit: string;
}

export interface PointToPointRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  estDuration: string;
  highwayRoute: string;
  sedanFareEst: number;
  innovaFareEst: number;
  tempoFareEst: number;
  tollNote: string;
}

export interface ContactInfo {
  brandName: string;
  domain: string;
  contactPerson: string;
  phonePrimary: string;
  phoneFormatted: string;
  whatsappNumber: string;
  emailPrimary: string;
  address: {
    line1: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    geoCoordinates: {
      latitude: number;
      longitude: number;
    };
  };
  operatingHours: string;
  paymentMethods: string[];
  serviceZones: {
    zoneName: string;
    areas: string[];
  }[];
}

export interface CorporatePlan {
  planType: string;
  duration: string;
  typicalUse: string;
  billingType: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  category: 'general' | 'pricing' | 'tours' | 'airport' | 'corporate';
  question: string;
  answer: string;
}
