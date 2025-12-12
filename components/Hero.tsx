import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget';
import WeatherBlogModal from './WeatherBlogModal';

const Hero: React.FC = () => {
  const [showBlog, setShowBlog] = useState(false);
  const [weatherData, setWeatherData] = useState<{temp: number, snow: number, code: number} | null>(null);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWeatherClick = (data: {temp: number, snow: number, code: number}) => {
    setWeatherData(data);
    setShowBlog(true);
  };

  return (
    <>
        <div className="flex flex-col justify-center animate-fade-in-up relative">
        
        {/* Live Weather Status */}
        <div className="mb-8 self-start">
            <WeatherWidget onClick={handleWeatherClick} />
        </div>

        <div className="flex flex-col mb-10 relative z-10">
            <h2 className="font-sans font-extralight text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] text-brand-200 uppercase mb-2 ml-1 drop-shadow-md opacity-90">
                Today's Forecast
            </h2>
            <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-8xl leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-brand-100 drop-shadow-2xl">
                ZERO<br className="lg:hidden" /> SHOVELING
            </h1>
        </div>
        
        <p className="text-lg sm:text-xl text-brand-50/80 leading-relaxed max-w-xl mb-10 font-light border-l-2 border-brand-400/30 pl-6 backdrop-blur-sm">
            Unlimited, auto snow removal in West Edmonton—instantly. No contracts, just same-day magic. Claim your effortless winter NOW—<span className="font-bold text-white">zero effort required!</span>
        </p>
        
        {/* Mobile Only CTA */}
        <button 
            onClick={scrollToPricing}
            className="lg:hidden w-full mb-10 bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
            <span>Check My Price</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-12">
            <FeatureItem 
                icon={<path d="M13 10V3L4 14h7v7l9-11h-7z" />}
                title="Fast Response"
                desc="We roll out the same day the snow stops."
            />
            <FeatureItem 
                icon={<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                title="Simple Pricing"
                desc="One flat monthly rate. Unlimited visits."
            />
            <FeatureItem 
                icon={<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                title="Secure Billing"
                desc="Payments handled automatically by Stripe."
            />
            <FeatureItem 
                icon={<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />}
                title="Local Crew"
                desc="West Edmonton owned and operated."
            />
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md max-w-md transition-all hover:bg-white/10">
            <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-lg relative z-0">
                95+
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-lg relative z-10 -ml-2">
                😁
                </div>
                <div className="w-9 h-9 rounded-full bg-brand-600 border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-lg relative z-20 -ml-2">
                👍
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex text-accent-400 text-sm gap-0.5">
                {'★★★★★'.split('').map((s,i) => <span key={i} className="drop-shadow-sm">{s}</span>)}
                </div>
                <span className="text-xs text-brand-100/70 font-medium">95+ happy West Edmonton neighbours and serving strong</span>
            </div>
        </div>
        </div>

        {showBlog && (
            <WeatherBlogModal 
                onClose={() => setShowBlog(false)} 
                weatherData={weatherData} 
            />
        )}
    </>
  );
};

const FeatureItem: React.FC<{icon: React.ReactNode, title: string, desc: string}> = ({ icon, title, desc }) => (
    <div className="flex items-start gap-4 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center flex-shrink-0 text-brand-300 border border-brand-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300">
            <svg className="w-5 h-5 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                {icon}
            </svg>
        </div>
        <div>
            <h3 className="font-bold text-white text-base tracking-wide group-hover:text-brand-200 transition-colors">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mt-1 group-hover:text-slate-300 transition-colors">{desc}</p>
        </div>
    </div>
);

export default Hero;