import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Prizes from './components/Prizes';
import Objectives from './components/Objectives';
import Themes from './components/Themes';
import ProcessFlow from './components/ProcessFlow';
import Timeline from './components/Timeline';
import Schedule from './components/Schedule';
import Committee from './components/Committee';
import FAQs from './components/FAQs';
import Developers from './components/Developers';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';

export default function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="relative min-h-screen bg-brand-darker text-brand-navy font-sans overflow-x-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-brand-blue/10 via-brand-purple/5 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>
      
      {/* Header Navigation */}
      <Navbar onRegisterClick={() => setShowRegister(true)} />

      {/* Main Sections */}
      <main>
        <Hero onRegisterClick={() => setShowRegister(true)} />
        
        <About />
        
        <Prizes />
        
        <Objectives />
        
        <Themes />
        
        <ProcessFlow />
        
        <Timeline />
        
        <Schedule />
        
        <Committee />
        
        <FAQs />
        
        <Developers />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Registration Modal Overlay */}
      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
