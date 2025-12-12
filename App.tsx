import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PricingCalculator from './components/PricingCalculator';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { SNOW_BG_IMAGE } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'login'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigate = (view: 'home' | 'dashboard') => {
    if (view === 'dashboard' && !isLoggedIn) {
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden bg-[#0f172a]">
      
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#082f49] to-[#0f172a]"></div>
          {/* Subtle glow effect top left */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/20 rounded-full blur-[120px] opacity-30"></div>
          {/* Subtle glow effect bottom right */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-500/10 rounded-full blur-[100px] opacity-20"></div>
          
          {/* Snow Pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none animate-snow-parallax"
            style={{
              backgroundImage: `url('${SNOW_BG_IMAGE}')`,
              backgroundRepeat: 'repeat',
            }}
          ></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col min-h-screen">
        <Navbar onNavigate={handleNavigate} />
        
        <main className="flex-grow flex flex-col justify-center py-8 lg:py-16">
          {currentView === 'home' && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              {/* Left Content (Hero) */}
              <div className="w-full flex flex-col justify-center">
                <Hero />
              </div>
              
              {/* Right Calculator */}
              <div className="w-full flex flex-col justify-center lg:sticky lg:top-24">
                <PricingCalculator />
              </div>
            </div>
          )}

          {currentView === 'login' && (
            <Login 
              onLoginSuccess={handleLoginSuccess} 
              onCancel={() => setCurrentView('home')} 
            />
          )}

          {currentView === 'dashboard' && (
            <Dashboard onLogout={handleLogout} />
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
      
    </div>
  );
};

export default App;