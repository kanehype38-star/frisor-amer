
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Booking } from '../types';

/**
 * Project ID: ehiaenxchdrtnvypiszo
 * Anon Key: sb_publishable_nLj3Am3Qg7Hg4qamEp6ZzA_JZC82Ow6
 */
const VITE_SUPABASE_URL = 'ehiaenxchdrtnvypiszo';
const DEFAULT_URL = `https://${PROJECT_ID}.supabase.co`;
const VITE_SUPABASE_ANON_KEY = 'sb_publishable_nLj3Am3Qg7Hg4qamEp6ZzA_JZC82Ow6';

const getEnv = (key: string): string | undefined => {
  const value = (typeof process !== 'undefined' && process.env) ? process.env[key] : undefined;
  if (!value || value === 'undefined' || value === 'null' || value.trim() === '') {
    return undefined;
  }
  return value;
};

const supabaseUrl = getEnv('SUPABASE_URL') || DEFAULT_URL;
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || DEFAULT_KEY;

const isValidUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith('http');
};

/**
 * Supabase-klienten initieras nu med din tillhandahållna nyckel.
 */
export const supabase: SupabaseClient | null = (isValidUrl(supabaseUrl) && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const ensureClient = () => {
  if (!supabase) {
    throw new Error("Supabase är inte konfigurerat korrekt.");
  }
  return supabase;
};

export const db = {
  async getBookings(): Promise<Booking[]> {
    const client = ensureClient();
    const { data, error } = await client
      .from('bookings')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) {
      console.error('Kunde inte hämta bokningar:', error);
      throw error;
    }
    return data || [];
  },

  async addBooking(booking: Booking): Promise<void> {
    const client = ensureClient();
    const { error } = await client
      .from('bookings')
      .insert([booking]);
    
    if (error) {
      console.error('Kunde inte spara bokning:', error);
      throw error;
    }
  },

  async deleteBooking(id: string): Promise<void> {
    const client = ensureClient();
    const { error } = await client
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Kunde inte radera bokning:', error);
      throw error;
    }
  }
};
