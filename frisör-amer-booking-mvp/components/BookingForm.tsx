
import React, { useState } from 'react';
import { db } from '../services/db';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'Klippning'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { id: 'Klippning', label: 'Klippning', price: '300 kr', duration: '45 min' },
    { id: 'Skägg', label: 'Skäggtrimning', price: '150 kr', duration: '30 min' },
    { id: 'Combo', label: 'Klippning & Skägg', price: '450 kr', duration: '75 min' },
  ];

  const timeSlots = [
    "09:00", "09:45", "10:30", "11:15", "12:00",
    "13:00", "13:45", "14:30", "15:15", "16:00", "16:45", "17:30"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time) return alert("Vänligen välj en tid");
    
    setIsSubmitting(true);
    try {
      await db.addBooking(formData);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Bokning misslyckades:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-5 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 focus:bg-white outline-none transition-all duration-300 placeholder:text-zinc-400 font-medium text-sm";
  const labelClasses = "block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 ml-1";

  if (isSuccess) {
    return (
      <div className="glass-card p-12 rounded-[3rem] text-center animate-in zoom-in-95 duration-500 shadow-2xl shadow-indigo-100 border border-white/60">
        <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-200 rotate-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-zinc-900 mb-4 tracking-tight">Bokad & Klar!</h2>
        <p className="text-zinc-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
          Vi har skickat detaljerna till din e-post. Vi ses på salongen för din <span className="text-indigo-600 font-bold">{formData.service.toLowerCase()}</span>!
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="w-full max-w-xs bg-zinc-900 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg"
        >
          Gör en ny bokning
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 md:p-14 rounded-[3.5rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.1)] border border-white/60 relative overflow-hidden">
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Lediga tider idag
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-zinc-900 mb-4">Fresh Fade</h1>
        <p className="text-zinc-400 text-lg font-medium">Boka din nästa behandling hos Amer</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Step 1: Choose Service */}
        <section>
          <label className={labelClasses}>Välj Behandling</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFormData({ ...formData, service: s.id })}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 group ${
                  formData.service === s.id 
                  ? 'bg-zinc-900 border-zinc-900 shadow-xl shadow-zinc-200' 
                  : 'bg-white/50 border-zinc-100 hover:border-indigo-200 hover:bg-white'
                }`}
              >
                <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${formData.service === s.id ? 'text-indigo-400' : 'text-zinc-400'}`}>
                  {s.duration}
                </div>
                <div className={`font-bold text-sm mb-1 ${formData.service === s.id ? 'text-white' : 'text-zinc-900'}`}>
                  {s.label}
                </div>
                <div className={`text-sm font-medium ${formData.service === s.id ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {s.price}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Personal Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className={labelClasses}>Ditt Namn</label>
            <input
              type="text" required placeholder="Erik Andersson"
              className={inputClasses} value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Telefon</label>
            <input
              type="tel" required placeholder="070 000 00 00"
              className={inputClasses} value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </section>

        <section className="space-y-2">
            <label className={labelClasses}>E-post</label>
            <input
              type="email" required placeholder="erik@exempel.se"
              className={inputClasses} value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
        </section>

        {/* Step 3: Date & Time Grid */}
        <section className="space-y-8">
          <div className="space-y-2">
            <label className={labelClasses}>Välj Datum</label>
            <input
              type="date" required className={inputClasses}
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <label className={labelClasses}>Välj Tid</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setFormData({ ...formData, time: slot })}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all duration-200 border ${
                    formData.time === slot
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105'
                    : 'bg-white/50 border-zinc-100 text-zinc-600 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-black active:scale-[0.98] transition-all duration-300 disabled:opacity-50 shadow-2xl shadow-zinc-200"
          >
            {isSubmitting ? 'Bokar...' : 'Slutför Bokning'}
          </button>
          <p className="text-center text-[10px] text-zinc-400 uppercase font-bold tracking-widest mt-6">
            Ingen betalning krävs vid bokning • Avboka senast 24h innan
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
