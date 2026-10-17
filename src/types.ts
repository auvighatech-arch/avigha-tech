export type PlatformType =
  | 'facebook'
  | 'whatsapp'
  | 'telegram'
  | 'instagram'
  | 'phone'
  | 'maps'
  | 'website'
  | 'email'
  | 'tiktok'
  | 'ouedkniss'
  | 'custom';

export interface LinkItem {
  id: string;
  platform: PlatformType;
  title: string;
  subtitle: string;
  url: string;
  accentColor: string;
  badgeText?: string;
  active: boolean;
  order: number;
  clicks: number;
}

export interface StoreInfo {
  name: string;
  nameArabic: string;
  tagline: string;
  taglineArabic: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  wilaya: string;
  workingHours: string;
  deliveryNote: string;
  adminPin: string;
}

export type ProductCategory =
  | 'all'
  | 'laptops'
  | 'desktops'
  | 'screens'
  | 'printers'
  | 'peripherals'
  | 'accessories';

export interface ProductItem {
  id: string;
  title: string;
  category: 'laptops' | 'desktops' | 'screens' | 'printers' | 'peripherals' | 'accessories';
  price: number; // in DZD (دج)
  originalPrice?: number;
  description: string;
  specs: string[];
  condition: 'neuf' | 'occasion';
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  image?: string;
  order: number;
}

export type ReviewServiceType =
  | 'all'
  | 'maintenance'
  | 'cctv'
  | 'networks'
  | 'hardware'
  | 'general';

export interface CustomerReview {
  id: string;
  authorName: string;
  authorCity: string;
  rating: number; // 1 to 5
  serviceType: ReviewServiceType;
  serviceLabel: string;
  comment: string;
  suggestion?: string; // اقتراح لتطوير المحل
  date: string;
  verifiedPurchase: boolean;
  likesCount: number;
  adminReply?: {
    text: string;
    date: string;
    author: string;
  };
}

