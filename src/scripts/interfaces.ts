export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  group: number;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: ProductRating;
}
