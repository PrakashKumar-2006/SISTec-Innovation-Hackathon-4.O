import React from 'react';
import { Trophy, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Prizes({ isStandalone = false }) {
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
      themeColor: 'from-cyan-500/20 to-blue-600/5',
      borderColor: 'border-cyan-500/20 group-hover:border-cyan-500/60',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:shadow-[0_15px_35px_rgba(6,182,212,0.25)]',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      textGradient: 'from-white via-cyan-100 to-cyan-300',
      icon: <Trophy className="w-8 h-8 text-cyan-400 animate-pulse" />
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
      themeColor: 'from-amber-500/25 to-orange-600/5',
      borderColor: 'border-amber-500/30 group-hover:border-amber-500/70',
      glow: 'shadow-[0_0_50px_rgba(245,158,11,0.25)] group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.35)]',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      textGradient: 'from-[#FFE8B6] via-[#D8AB55] to-[#A27B2B]',
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
      themeColor: 'from-orange-500/20 to-rose-600/5',
      borderColor: 'border-orange-500/20 group-hover:border-orange-500/60',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)] group-hover:shadow-[0_15px_35px_rgba(249,115,22,0.25)]',
      badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      textGradient: 'from-[#FED7AA] via-[#F97316] to-[#C2410C]',
      icon: <Trophy className="w-8 h-8 text-orange-400 animate-pulse" />
    }
  ];

  return (
    <section id="prizes" className={`relative ${isStandalone ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'py-12 sm:py-16'} bg-brand-darker overflow-hidden tech-grid-dense border-t border-white/5`}>
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
          {[prizes[0], prizes[1], prizes[2]].map((prize, idx) => {
            const orderClasses = [
              'order-2 md:order-1',
              'order-1 md:order-2',
              'order-3 md:order-3'
            ];
            return (
              <div
                key={idx}
                className={`relative rounded-3xl bg-gradient-to-br ${prize.themeColor} backdrop-blur-md border ${prize.borderColor} p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${prize.glow} ${orderClasses[idx]} ${
                  prize.featured 
                    ? 'md:scale-105 md:z-10 min-h-[390px]'
                    : 'min-h-[350px]'
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
            );
          })}
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
