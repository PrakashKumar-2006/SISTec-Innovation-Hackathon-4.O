import React from 'react';
import { Trophy, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Prizes() {
  const prizes = [
    {
      title: '2ND PRIZE',
      amount: '₹ 30,000/-',
      description: 'Runner Up Trophy & Certificates',
      subtitle: 'Claim the second spot in glory!',
      cardBg: 'bg-white',
      borderColor: 'border-brand-blue/30',
      glowShadow: 'hover:shadow-[0_10px_30px_rgba(255,99,90,0.15)]',
      iconColor: 'text-brand-blue',
      badge: 'Silver Medalist'
    },
    {
      title: '1ST PRIZE',
      amount: '₹ 50,000/-',
      description: 'Grand Winner Trophy & Certificates',
      subtitle: 'Claim the ultimate victory prize!',
      cardBg: 'bg-white',
      borderColor: 'border-brand-orange/40',
      glowShadow: 'hover:shadow-[0_15px_35px_rgba(255,99,90,0.2)]',
      iconColor: 'text-brand-orange',
      badge: 'Grand Champion',
      featured: true
    },
    {
      title: '3RD PRIZE',
      amount: '₹ 20,000/-',
      description: '2nd Runner Up Trophy & Certificates',
      subtitle: 'Secure your place on the podium!',
      cardBg: 'bg-white',
      borderColor: 'border-brand-pink/30',
      glowShadow: 'hover:shadow-[0_10px_30px_rgba(251,208,154,0.25)]',
      iconColor: 'text-brand-pink',
      badge: 'Bronze Medalist'
    }
  ];

  return (
    <section id="prizes" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-2xl mx-auto mb-16">

          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-navyDeep">
            Your Ideas, Your Victory,{' '}
            <span className="text-gold-metallic">
              Your Prizes! 🏆
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
            Compete for Bhopal's most prestigious collegiate technical crown and amazing prizes!
          </p>
        </div>

        {/* Prizes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto mb-16">
          {/* Re-ordering for UI display: 2nd, 1st, 3rd to show 1st in center elevated */}
          {[prizes[0], prizes[1], prizes[2]].map((prize, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl ${prize.cardBg} border ${prize.borderColor} p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-card-shadow ${prize.glowShadow} ${
                prize.featured 
                  ? 'md:scale-105 md:z-10 border-brand-orange/60 shadow-xl min-h-[380px]' 
                  : 'min-h-[340px]'
              }`}
            >
              {/* Highlight Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-brand-dark border border-brand-navy/10 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-navy shadow-sm">
                {prize.badge}
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-center">
                  <div className={`p-4 rounded-full bg-brand-dark border border-brand-navy/5 shadow-inner ${prize.iconColor}`}>
                    <Trophy size={prize.featured ? 36 : 28} className="animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold tracking-widest text-brand-gray font-sans uppercase">
                    {prize.title}
                  </h3>
                  <p className="text-3.5xl sm:text-5xl font-black font-display text-brand-navy">
                    {prize.amount}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-brand-navy font-bold tracking-wide">
                  {prize.description}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-navy/10 mt-4 text-xs text-brand-gray font-normal">
                {prize.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Date and Venue details cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto pt-8 border-t border-brand-navy/10">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-dark border border-brand-navy/10 text-left hover:border-brand-blue/20 transition-all duration-300">
            <div className="p-3 rounded-xl bg-white border border-brand-navy/5 text-brand-orange">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-brand-gray font-bold tracking-widest uppercase">GRAND FINALE</p>
              <p className="text-base font-bold text-brand-navy mt-0.5">08 November 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-dark border border-brand-navy/10 text-left hover:border-brand-blue/20 transition-all duration-300">
            <div className="p-3 rounded-xl bg-white border border-brand-navy/5 text-brand-blue">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-brand-gray font-bold tracking-widest uppercase">VENUE</p>
              <p className="text-base font-bold text-brand-navy mt-0.5">SISTec-R Campus, Ratibad, Bhopal</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
