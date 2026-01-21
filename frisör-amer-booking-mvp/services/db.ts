import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Booking } from '../types';

/**
 * Supabase-klienten initieras med dina miljövariabler.
 * 
 * OBS: Lägg till dessa i Vercel → Settings → Environment Variables:
 * 
 * VITE_SUPABASE_URL=https://ehiaenxchdrtnvypiszo.supabase.co
 * VITE_SUPABASE_ANON_KEY=sb_publishable_nLj3Am3Qg7Hg4qamEp6ZzA_JZC82Ow6
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL eller ANON key saknas. Lägg till VITE_SUPABASE_URL och VITE_SUPABASE_ANON_KEY i Vercel Environment Variables."
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  async getBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
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
    const { error } = await supabase
      .from('bookings')
      .insert([booking]);

    if (error) {
      console.error('Kunde inte spara bokning:', error);
      throw error;
    }
  },

  async deleteBooking(id: string): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Kunde inte radera bokning:', error);
      throw error;
    }
  }
};
