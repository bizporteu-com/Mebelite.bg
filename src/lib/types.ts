export type Category = {
  slug: string;
  name: string;
  parent?: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  room?: string;
  style?: string;
  brand?: string;
  sku?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  deliveryDays: number;
  colors: { name: string; hex: string }[];
  materials: string[];
  dimensions: { w: number; d: number; h: number };
  images: string[];
  model?: { glb?: string; usdz?: string };
  description: string;
  features: string[];
  badge?: "new" | "sale" | "bestseller";
};
