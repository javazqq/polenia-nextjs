export interface OrderItem {
  id?: number;
  product_id: number;
  quantity: number;
  price: number;
  name: string;
  image?: string;
  description?: string;
}

export interface Address {
  street1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string; // uuid
  user_id?: number | null;
  total: number;
  status: string;
  created_at: string; // ISO timestamp
  guest_name?: string | null;
  guest_email?: string | null;
  guest_address?: Address | string | null;
  updated_at?: string | null; // ISO timestamp, may be undefined if not fetched
  items: OrderItem[];
  shipping_price: number;
}