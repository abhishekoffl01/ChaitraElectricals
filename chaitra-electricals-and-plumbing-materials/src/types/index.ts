export type ProductCategory = 
  | 'all'
  | 'electrical'
  | 'plumbing'
  | 'pumps'
  | 'lighting'
  | 'switchgear'
  | 'tools';

export interface Product {
  id: string;
  name: string;
  category: 'electrical' | 'plumbing' | 'pumps' | 'lighting' | 'switchgear' | 'tools';
  categoryLabel: string;
  brand: string;
  sku: string;
  shortDesc: string;
  fullDesc: string;
  unit: string;
  estimatedPrice: number;
  priceNote?: string;
  stockStatus: 'In Stock' | 'Ready Stock' | 'Wholesale Lot Available';
  specifications: Record<string, string>;
  applications: string[];
  image?: string;
  popular?: boolean;
  hsnCode?: string;
}

export interface QuoteCartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export interface CustomRequirement {
  id: string;
  itemDescription: string;
  quantity: string;
  unit: string;
}

export interface QuoteSubmission {
  quoteId: string;
  customerName: string;
  phone: string;
  email: string;
  location: string;
  customerType: 'General Contractor' | 'Licensed Electrician' | 'Plumbing Technician' | 'Homeowner' | 'Farmer / Estate Owner' | 'Other';
  items: QuoteCartItem[];
  customRequirements: CustomRequirement[];
  additionalNotes: string;
  deliveryNeeded: boolean;
  createdAt: string;
  totalEstimatedAmount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  projectType: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
  verifiedCustomer: boolean;
  date: string;
}

export interface StoreLocationInfo {
  name: string;
  address: string;
  landmark: string;
  town: string;
  taluk: string;
  district: string;
  pincode: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phonePrimary: string;
  phoneSecondary: string;
  whatsapp: string;
  email: string;
  gstin: string;
  establishedYear: number;
  hours: {
    weekdays: string;
    sunday: string;
  };
}

export interface BrandPartner {
  name: string;
  tier: string;
  categories: string;
  certification: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  estimatedBudget: string;
  recommendedProductIds: string[];
  materialsBreakdown: {
    item: string;
    qty: string;
    spec: string;
  }[];
}
