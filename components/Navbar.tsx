import React from 'react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'dashboard') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-between py-6 mb-4 sm:mb-8 border-b border-white/10 relative z-20 gap-4 sm:gap-0">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl tracking-tight leading-none text-white group-hover:text-brand-100 transition-colors">Walks & Lawns<span className="text-brand-400">.</span></span>
          <span className="text-[10px] uppercase tracking-widest text-brand-200 font-semibold mt-1">West Edmonton</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href="https://billing.stripe.com/p/login/4gw04026haB7eEE3cc" 
          target="_blank" 
          rel="noreferrer" 
          className="group flex items-center gap-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-full transition-all duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <svg className="w-4 h-4 text-brand-300 group-hover:text-brand-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Client Portal
          <svg className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;