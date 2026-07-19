import React from 'react';
import { Trophy, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Prizes() {
  const prizes = [
    {
      place: '02',
      title: '2ND PRIZE',
      amount: '₹30,000',
      description: 'Runner Up Trophy & Certificates',
      subtitle: 'Claim the second spot in glory!',
      badge: 'Silver Medalist',
      perks: [
        '₹30,000 Cash Reward',
        'Official Runner-up Trophy',
        'Silver Medals for Team',
        'Excellence Certificates'
      ],
      gradient: 'from-blue-500/10 to-transparent',
      textGradient: 'from-white via-slate-200 to-slate-400',
      borderColor: 'border-slate-500/30',
      badgeBg: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
      glow: 'shadow-[0_0_30px_rgba(148,163,184,0.1)] hover:border-slate-400/50',
      icon: <Trophy className="w-8 h-8 text-slate-300 animate-pulse" />
    },
    {
      place: '01',
      title: '1ST PRIZE',
      amount: '₹50,000',
      description: 'Grand Winner Trophy & Certificates',
      subtitle: 'Claim the ultimate victory prize!',
      badge: 'Grand Champion',
      featured: true,
      perks: [
        '₹50,000 Cash Reward',
        'Official Champion Trophy',
        'Gold Medals for Team',
        'Excellence Certificates',
        'Incubation Opportunity'
      ],
      gradient: 'from-brand-gold/15 to-transparent',
      textGradient: 'from-[#FFE8B6] via-[#D8AB55] to-[#A27B2B]',
      borderColor: 'border-brand-gold/50',
      badgeBg: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
      glow: 'shadow-[0_0_50px_rgba(216,171,85,0.2)] hover:border-brand-gold',
      icon: <Trophy className="w-10 h-10 text-brand-gold animate-bounce" />
    },
    {
      place: '03',
      title: '3RD PRIZE',
      amount: '₹20,000',
      description: '2nd Runner Up Trophy & Certificates',
      subtitle: 'Secure your place on the podium!',
      badge: 'Bronze Medalist',
      perks: [
        '₹20,000 Cash Reward',
        '2nd Runner-up Trophy',
        'Bronze Medals for Team',
        'Excellence Certificates'
      ],
      gradient: 'from-orange-500/10 to-transparent',
      textGradient: 'from-[#FED7AA] via-[#F97316] to-[#C2410C]',
      borderColor: 'border-orange-500/30',
      badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:border-orange-400/50',
      icon: <Trophy className="w-8 h-8 text-orange-400 animate-pulse" />
    }
  ];

  return (
    <section id="prizes" className="relative py-28 sm:py-36 bg-brand-darker overflow-hidden tech-grid-dense border-t border-white/5">
      {/* Visual glowing effects in the background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            Your Ideas, Your Victory,{' '}
            <span className="text-gold-metallic block sm:inline">
              Your Prizes! 🏆
            </span>
          </h2>
        </div>

        {/* Prizes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-end max-w-5xl mx-auto mb-16">
          {/* Re-ordering for UI display: 2nd, 1st, 3rd to show 1st in center elevated */}
          {[prizes[0], prizes[1], prizes[2]].map((prize, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl bg-brand-card/45 backdrop-blur-md border ${prize.borderColor} p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 ${prize.glow} ${
                prize.featured 
                  ? 'md:scale-105 md:z-10 min-h-[390px] bg-gradient-to-b ' + prize.gradient
                  : 'min-h-[350px] bg-gradient-to-b ' + prize.gradient
              } group overflow-hidden`}
            >
              {/* Large background number for editorial touch */}
              <span className="absolute -right-2 -bottom-4 text-[6.5rem] font-black font-display text-white/[0.02] select-none leading-none group-hover:text-white/[0.04] transition-colors duration-500">
                {prize.place}
              </span>

              <div className="space-y-4 pt-2 relative z-10">
                {/* Header Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[10px] sm:text-xs font-bold uppercase tracking-wider ${prize.badgeBg}`}>
                  {prize.badge}
                </div>

                <div className="space-y-1">
                  <h3 className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-gray font-sans uppercase">
                    {prize.title}
                  </h3>
                  <p className={`text-3xl sm:text-4xl font-black font-display bg-gradient-to-b ${prize.textGradient} bg-clip-text text-transparent leading-none`}>
                    {prize.amount}
                  </p>
                  <p className="text-xs text-brand-navy font-bold tracking-wide mt-0.5">
                    {prize.description}
                  </p>
                </div>

                {/* List of Perks */}
                <ul className="space-y-2 pt-1.5">
                  {prize.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-left text-xs text-brand-gray font-medium">
                      <span className="w-1.2 h-1.2 rounded-full bg-brand-gold shrink-0"></span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom footer text of card */}
              <div className="pt-3 border-t border-white/5 mt-4 text-[10px] sm:text-xs text-brand-gray/80 font-medium italic relative z-10">
                "{prize.subtitle}"
              </div>
            </div>
          ))}
        </div>

        {/* Venue and Date Panel */}
        <div className="relative max-w-4xl mx-auto mt-16 p-1 rounded-3xl bg-gradient-to-r from-brand-orange/20 via-brand-pink/20 to-brand-blue/20 shadow-xl border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-[1.7rem] bg-brand-card/85 backdrop-blur-xl">
            
            {/* Date block */}
            <div className="flex items-center gap-4 text-left group">
              <div className="p-3.5 rounded-2xl bg-brand-orange/15 border border-brand-orange/25 text-brand-orange shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-brand-gray font-bold tracking-widest uppercase">GRAND FINALE DATE</p>
                <p className="text-lg font-black text-white font-display mt-0.5">08 November 2026</p>
                <p className="text-xs text-brand-gray mt-0.5">Mark your calendars for the final pitch</p>
              </div>
            </div>

            {/* Visual separator line for larger screens */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10"></div>

            {/* Venue block */}
            <div className="flex items-center gap-4 text-left group pl-0 md:pl-8">
              <div className="p-3.5 rounded-2xl bg-brand-blue/15 border border-brand-blue/25 text-brand-blue shadow-inner group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-brand-gray font-bold tracking-widest uppercase">OFFICIAL VENUE</p>
                <p className="text-lg font-black text-white font-display mt-0.5">SISTec-R Campus</p>
                <p className="text-xs text-brand-gray mt-0.5">Ratibad, Bhopal, Madhya Pradesh</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
