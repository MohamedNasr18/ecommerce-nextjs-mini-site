export interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  price: number;
  category: string;
  image: string;
  description_en: string;
  description_ar: string;
  inStock: boolean;
}

export interface Category {
  slug: string;
  name_en: string;
  name_ar: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ShippingForm {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
}