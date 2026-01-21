
export interface Booking {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}

export type View = 'customer' | 'admin';
