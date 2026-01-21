
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="w-full max-w-2xl flex flex-col sm:flex-row justify-between items-center gap-6 mb-16 px-4 py-3 rounded-3xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl rotate-3 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-extrabold text-sm tracking-tighter">AM</span>
          </div>
          <div>
            <span className="font-bold tracking-tight text-lg block leading-none">Frisör Amer</span>
            <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-widest">Hair Lab</span>
          </div>
        </div>
        <div className="flex bg-zinc-200/50 p-1.5 rounded-2xl text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => onViewChange('customer')}
            className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${
              currentView === 'customer' 
                ? 'bg-white text-zinc-900 shadow-sm scale-105' 
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            Boka Tid
          </button>
          <button
            onClick={() => onViewChange('admin')}
            className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${
              currentView === 'admin' 
                ? 'bg-white text-zinc-900 shadow-sm scale-105' 
                : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            Admin
          </button>
        </div>
      </nav>
      <main className="w-full max-w-2xl flex-grow">
        {children}
      </main>
      <footer className="mt-20 text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em] text-center pb-8">
        Designed for Excellence • Frisör Amer Sweden
      </footer>
    </div>
  );
};

export default Layout;
