export type ThemeDirection = 'teal-sand';

export type PropertyCategory = 'all' | 'buy' | 'rent' | 'apartment' | 'villa' | 'plot' | 'commercial';

export interface Property {
  id: string;
  title: string;
  category: 'apartment' | 'villa' | 'plot' | 'commercial';
  transactionType: 'buy' | 'rent';
  price: number; // in INR
  priceDisplay: string;
  pricePerSqFt?: string;
  location: {
    locality: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
    mapX: number; // percentage on custom vector map (0-100)
    mapY: number;
  };
  specs: {
    bedrooms?: number;
    bathrooms?: number;
    areaSqFt: number;
    parking?: number;
    furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
    facing?: 'East' | 'North' | 'North-East' | 'West';
    floor?: string;
  };
  features: string[];
  amenities: string[];
  images: string[];
  tag?: 'Featured' | 'New' | 'Hot Deal' | 'Verified' | 'Luxury Choice';
  verified: boolean;
  virtualTourUrl?: string;
  description: string;
  agent: Agent;
  status: 'available' | 'under_offer' | 'sold';
  postedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  agency: string;
  phone: string;
  whatsapp: string;
  email: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  activeListingsCount: number;
  dealsClosed: number;
  avatar: string;
  verified: boolean;
  languages: string[];
  specialization: string;
  location: string;
  bio: string;
}

export interface EnquiryLead {
  id: string;
  propertyTitle: string;
  propertyId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  message: string;
  visitDate?: string;
  status: 'new' | 'contacted' | 'visit_scheduled' | 'converted' | 'closed';
  date: string;
  assignedAgent: string;
  budget?: string;
}
