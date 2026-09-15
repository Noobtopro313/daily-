export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Audio' | 'Smart Wearables' | 'Gaming' | 'Mobile Accessories' | 'Smart Home' | 'Work & Productivity';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge?: 'Sale' | 'New' | 'Bestseller' | 'Popular';
  inStock: boolean;
  stockCount?: number;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specs: ProductSpec[];
  colors: ProductColor[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface BenefitItem {
  iconName: string;
  title: string;
  subtitle: string;
}

export type ActivePage = 'home' | 'shop' | 'about' | 'contact' | 'product-detail';

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}
