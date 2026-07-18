import React from 'react';
import instructionsWeb from '../../Instructions Image web.png';
import instructionsPhone from '../../Instructions Image phone.png';

export default function Instructions() {
  return (
    <section id="instructions" className="relative pt-24 pb-12 bg-brand-darker min-h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-brand-orange/5 via-brand-purple/5 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col items-center justify-center">
        {/* Desktop View Image */}
        <div className="hidden md:block w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-brand-gold/25 hover:shadow-[0_25px_60px_rgba(216,171,85,0.15)] transition-all duration-500">
          <img 
            src={instructionsWeb} 
            alt="Guidelines for Participants - Web" 
            className="w-full h-auto object-contain block"
          />
        </div>

        {/* Mobile View Image */}
        <div className="md:hidden w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          <img 
            src={instructionsPhone} 
            alt="Guidelines for Participants - Phone" 
            className="w-full h-auto object-contain block"
          />
        </div>
      </div>
    </section>
  );
}
