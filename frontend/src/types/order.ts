export interface OrderItem {
  id?: number;
  product_id: number;
  quantity: number;
  price: number;
  name: string;
  image?: string;
  description?: string;
}

export interface Order {
  id: string; // uuid
  user_id?: number | null;
  total: number;
  status: string;
  created_at: string; // ISO timestamp
  guest_name?: string | null;
  guest_email?: string | null;
  payment_method?: string | null;
  mp_payment_id?: string | null;
  mp_preference_id?: string | null;
  updated_at?: string | null; // ISO timestamp, may be undefined if not fetched
  guest_address?: string | null;
  items: OrderItem[];
}