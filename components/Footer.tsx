import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (view: 'home' | 'dashboard') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showTos, setShowTos] = useState(false);

  return (
    <footer className="w-full mt-12 py-8 border-t border-white/10 text-center sm:text-left relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Walks & Lawns Ltd.</p>
            <button 
                onClick={() => setShowTos(true)} 
                className="text-xs text-slate-600 hover:text-slate-400 underline transition-colors cursor-pointer"
            >
                Terms of Service
            </button>
            <button 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-1 text-[10px] text-slate-700 hover:text-slate-500 transition-colors opacity-50 hover:opacity-100 uppercase font-bold tracking-widest"
                title="Owner Login"
            >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Admin
            </button>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            $2M Liability Insured
          </span>
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            WCB Coverage
          </span>
        </div>
      </div>

      {/* Legal Modal */}
      {showTos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up" onClick={() => setShowTos(false)}>
            <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 border border-white/20" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b border-slate-100 z-10">
                    <h3 className="text-xl font-bold font-display tracking-tight">Terms of Service</h3>
                    <button onClick={() => setShowTos(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                    <p className="italic text-slate-400">Last Updated: October 2024</p>
                    
                    <section>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-[10px]">1. Snow Removal Triggers & Service Window</h4>
                        <p><strong>Trigger Depth:</strong> Services are automatically dispatched when snowfall accumulation reaches 2.5cm (1 inch) or greater on the ground, as determined by Environment Canada data for West Edmonton or local site assessment.</p>
                        <p className="mt-2"><strong>Timing:</strong> Clearing will be completed within 24 hours of the snowfall ending (the "Service Window"). We reserve the right to delay service during extreme weather events (-30°C or colder), heavy storms (blizzards), or road closures to ensure crew safety.</p>
                        <p className="mt-2"><strong>Return Visits:</strong> During continuous storms, we aim to clear once every 24 hours. City plow windrows will be cleared during the next scheduled rotation.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-[10px]">2. Liability & Property Damage</h4>
                        <p>Walks & Lawns Ltd. utilizes professional-grade plastic and metal-edged shovels, scrapers, and mechanical blowers. While every reasonable care is exercised:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Surface Wear:</strong> Minor scratches, chipping, rust marks, or scraping marks on concrete, asphalt, aggregate, or paving stones are a normal consequence of mechanical snow removal. We are not liable for such aesthetic wear.</li>
                            <li><strong>Hidden Objects:</strong> We are not responsible for damage to objects hidden in the snow, including but not limited to: extension cords, Christmas lights, toys, garden hoses, planters, or sprinklers.</li>
                            <li><strong>Pre-existing Conditions:</strong> We are not liable for damage to uneven, heaved, or cracked paving stones or concrete surfaces.</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-[10px]">3. Slip & Fall Waiver (Critical)</h4>
                        <p className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-900">
                            <strong>Unless the "Premium Ice Melt" add-on is explicitly selected and paid for, our service is strictly limited to the removal of loose snow.</strong>
                        </p>
                        <p className="mt-2">We do not chip or scrape ice to bare pavement if it is bonded to the surface. <strong>Walks & Lawns Ltd. assumes no liability for slip-and-fall accidents, injuries, or damages resulting from icy conditions</strong>, freezing rain, melt/freeze cycles, roof runoff, or snow accumulation occurring between scheduled visits. Property owners are solely responsible for applying abrasives or salt between our visits to maintain safe footing.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-[10px]">4. Lawn Care Services (Seasonal)</h4>
                        <p>For lawn maintenance subscriptions:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Pet Waste:</strong> All pet waste must be cleared prior to service. We reserve the right to skip areas with excessive waste to prevent equipment contamination.</li>
                            <li><strong>Access:</strong> Gates must be unlocked. If inaccessible, the service will be skipped and not refunded.</li>
                            <li><strong>Damages:</strong> We are not responsible for damage to sprinkler heads that are not retracted or clearly marked.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-[10px]">5. Payments & Cancellation</h4>
                        <p>Subscriptions are billed monthly on a recurring basis via Stripe. You may cancel your service at any time via the Client Portal. Cancellations made mid-month will remain active until the end of the current billing cycle. No pro-rated refunds will be issued for partial months. Service may be suspended immediately for non-payment.</p>
                    </section>

                     <section>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-[10px]">6. Force Majeure</h4>
                        <p>We are not liable for failure to perform our obligations if such failure is as a result of Acts of God (including fire, flood, earthquake, storm, hurricane or other natural disaster), war, invasion, act of foreign enemies, hostilities (regardless of whether war is declared), civil war, rebellion, revolution, insurrection, military or usurped power or confiscation, terrorist activities, nationalisation, government sanction, blockage, embargo, labor dispute, strike, lockout or interruption or failure of electricity or telephone service.</p>
                    </section>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <button onClick={() => setShowTos(false)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">I Understand & Agree</button>
                </div>
            </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;