export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  is_vendor: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  video_url?: string;
  vendor_id: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  vendor_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  rating: number;
  comment: string;
  created_at: string;
}