import React, { useEffect, useState } from 'react';
import { Booking } from '../types';

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const password = prompt('Ange admin-lösenord:');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'GET',
        headers: {
          'x-admin-password': password || ''
        }
      });
      if (!res.ok) throw new Error('Fel lösenord eller serverproblem');
      const data: Booking[] = await res.json();
      setBookings(data.sort((a, b) => {
        const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return a.time.localeCompare(b.time);
      }));
    } catch (error) {
      console.error(error);
      alert('Kunde inte hämta bokningar.');
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!password) return;
    if (!confirm('Vill du ta bort bokningen?')) return;
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password
        },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Kunde inte radera bokningen');
      fetchBookings();
    } catch (error) {
      console.error(error);
      alert('Fel vid radering av bokning');
    }
  };

  useEffect(() => {
    if (password) fetchBookings();
  }, []);

  return (
    <div className="glass-card p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white/60 min-h-[500px]">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Bokningar</h1>
        <button onClick={fetchBookings} className="p-3 bg-zinc-100 rounded-2xl hover:bg-zinc-200 tran
