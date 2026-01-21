
import React, { useState } from 'react';
import Layout from './components/Layout';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import { View } from './types';
import { supabase } from './services/db';

const App: React.FC = () => {
  const [view, setView] = useState<View>('customer');

  // Visa en snygg guide om API-nyckeln saknas istället för att krascha
  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFCFB]">
        <div className="glass-card p-10 rounded-[3rem] max-w-md w-full text-center border border-rose-100 shadow-xl shadow-rose-50 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white rotate-3 shadow-lg shadow-rose-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-zinc-900 mb-3 tracking-tight">Ange din API-nyckel</h1>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8 px-2">
            Jag har ställt in din URL baserat på projekt-id:t, men du behöver fortfarande lägga till din <strong>Anon Key</strong> för att ansluta till databasen.
          </p>
          
          <div className="space-y-4 text-left bg-zinc-50/50 p-6 rounded-[2rem] border border-zinc-100 mb-8">
            <div className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-3">Gör så här:</div>
            <ol className="text-xs text-zinc-600 space-y-3 list-decimal ml-4 font-medium">
              <li>Öppna din Supabase Dashboard</li>
              <li>Gå till <strong>Settings</strong> (kugghjulet) &gt; <strong>API</strong></li>
              <li>Hitta <code>anon public</code> nyckeln</li>
              <li>Lägg till den som miljövariabel: <code className="bg-white px-1.5 py-0.5 border border-zinc-200 rounded font-mono text-rose-500 font-bold">SUPABASE_ANON_KEY</code></li>
            </ol>
          </div>
          
          <div className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-300">
            Frisör Amer • Database Setup
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout currentView={view} onViewChange={setView}>
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
        {view === 'customer' ? <BookingForm /> : <AdminDashboard />}
      </div>
    </Layout>
  );
};

export default App;
