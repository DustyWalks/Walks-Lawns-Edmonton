import React, { useState } from 'react';
import { PRICING, STRIPE_LINKS } from '../constants';

const PricingCalculator: React.FC = () => {
  const [addBackyard, setAddBackyard] = useState(false);
  const [addIceMelt, setAddIceMelt] = useState(false);

  // Calculate total directly during render
  const total = PRICING.BASE + 
    (addBackyard ? PRICING.BACKYARD : 0) + 
    (addIceMelt ? PRICING.ICE_MELT : 0);

  const handleSubscribe = () => {
    let url = STRIPE_LINKS.BASE;
    if (addBackyard && !addIceMelt) url = STRIPE_LINKS.BASE_BACKYARD;
    if (!addBackyard && addIceMelt) url = STRIPE_LINKS.BASE_ICEMELT;
    if (addBackyard && addIceMelt) url = STRIPE_LINKS.ALL;
    window.location.href = url;
  };

  return (
    <div id="pricing-calculator" className="relative w-full max-w-md mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      {/* Glow Effect behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      {/* Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/50 overflow-hidden border border-slate-200/60 ring-1 ring-white/50">
        
        {/* Header */}
        <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">Configure Your Plan</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Simple monthly billing. Pause or cancel anytime.</p>
        </div>

        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
            
            {/* Base Plan */}
            <div className="relative p-5 rounded-2xl border-2 border-brand-500 bg-gradient-to-b from-brand-50/80 to-brand-50/20 shadow-sm transition-transform hover:scale-[1.01] duration-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-brand-500/30">
                    Core Service
                </div>
                <div className="flex flex-row justify-between items-start gap-3">
                    <div>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">Front Property</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">Includes driveway, walkways to door, and city sidewalks.</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <span className="block text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">CA${PRICING.BASE}</span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wide">/month</span>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-brand-700 font-bold bg-white/60 py-1.5 px-3 rounded-lg w-fit border border-brand-200/50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited Clearing Included
                </div>
            </div>

            {/* Add-ons */}
            <div>
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 ml-1">Optional Upgrades</h4>
                <div className="space-y-3 sm:space-y-4">
                    <AddOnToggle 
                        title="Backyard Access" 
                        desc="Clear deck, dog runs, & BBQ areas." 
                        price={PRICING.BACKYARD} 
                        checked={addBackyard} 
                        onChange={setAddBackyard} 
                    />
                    <AddOnToggle 
                        title="Premium Ice Melt" 
                        desc="Eco-friendly deicer application." 
                        price={PRICING.ICE_MELT} 
                        checked={addIceMelt} 
                        onChange={setAddIceMelt}
                        badge="Recommended"
                    />
                </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-slate-100">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-xs sm:text-sm text-slate-500 font-bold">Monthly Total</p>
                        <div className="flex items-center gap-1.5 mt-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Next-day activation</p>
                        </div>
                    </div>
                    <div className="text-right">
                         <span className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tighter">
                            ${total}
                         </span>
                         <span className="text-xs sm:text-sm text-slate-400 ml-1 font-semibold">/mo</span>
                    </div>
                </div>

                <button
                    onClick={handleSubscribe}
                    className="group relative w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all duration-200 shadow-xl shadow-slate-900/20 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="text-base sm:text-lg">Proceed to Checkout</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
                
                <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    <svg className="w-3 h-3 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    Secure 256-bit SSL Payment via Stripe
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

interface AddOnProps {
    title: string;
    desc: string;
    price: number;
    checked: boolean;
    onChange: (val: boolean) => void;
    badge?: string;
}

const AddOnToggle: React.FC<AddOnProps> = ({ title, desc, price, checked, onChange, badge }) => (
    <div 
        onClick={() => onChange(!checked)}
        className={`relative flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group active:scale-[0.99] select-none ${
            checked 
            ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500/20' 
            : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
        }`}
    >
        {badge && (
            <span className="absolute -top-2.5 right-4 bg-accent-500 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10">
                {badge}
            </span>
        )}
        
        <div className="flex items-center gap-3 sm:gap-4">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${checked ? 'bg-brand-500 border-brand-500 shadow-md shadow-brand-500/20' : 'bg-white border-slate-200'}`}>
                <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-all duration-200 ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
                <p className={`text-sm font-bold transition-colors ${checked ? 'text-brand-900' : 'text-slate-700 group-hover:text-slate-900'}`}>{title}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{desc}</p>
            </div>
        </div>
        <div className="text-right pl-2">
             <span className={`text-sm font-bold transition-colors ${checked ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`}>+${price}</span>
        </div>
    </div>
);

export default PricingCalculator;