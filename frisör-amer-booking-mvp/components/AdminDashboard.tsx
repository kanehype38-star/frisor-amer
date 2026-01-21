
import React, { useEffect, useState } from 'react';
import { db } from '../services/db';
import { Booking } from '../types';

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    const data = await db.getBookings();
    setBookings(data.sort((a, b) => {
      const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      return a.time.localeCompare(b.time);
    }));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Vill du ta bort bokningen?')) {
      await db.deleteBooking(id);
      fetchBookings();
    }
  };

  return (
    <div className="glass-card p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white/60 min-h-[500px]">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Bokningar</h1>
        <button 
          onClick={fetchBookings}
          className="p-3 bg-zinc-100 rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 text-zinc-400 font-bold uppercase text-xs tracking-widest">
          Inga bokningar ännu
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl border border-zinc-100 bg-white/50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center gap-6 w-full">
                <div className="bg-zinc-900 text-white p-3 rounded-2xl flex flex-col items-center min-w-[64px] shadow-lg">
                  <span className="text-[9px] uppercase font-black opacity-60">
                    {new Date(booking.date).toLocaleDateString('sv-SE', { month: 'short' })}
                  </span>
                  <span className="text-xl font-black">
                    {new Date(booking.date).getDate()}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-zinc-900">{booking.name}</h3>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-wider">
                      {booking.service}
                    </span>
                  </div>
                  <div className="flex gap-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span className="text-zinc-900">{booking.time}</span>
                    <span>{booking.phone}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(booking.id!)}
                  className="p-3 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
