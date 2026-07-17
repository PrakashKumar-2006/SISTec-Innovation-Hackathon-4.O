import React, { useState } from 'react';
import { Play, Sparkles, Trophy, Users } from 'lucide-react';

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Stats Counters data
  const stats = [
    { label: 'Coding Duration', value: '36 Hrs', icon: <Sparkles className="text-brand-blue" /> },
    { label: 'Total Prize Pool', value: '₹1,00,000+', icon: <Trophy className="text-brand-orange" /> },
    { label: 'National Teams', value: '60+ Teams', icon: <Users className="text-brand-pink" /> }
  ];

  return (
    <section id="about" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h3 className="text-base sm:text-lg font-bold text-brand-blue tracking-wide">
              Department of Computer Science & Engineering
            </h3>
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-navy">
              SIH is{' '}
              <span className="bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
                Organized by SISTec Ratibad
              </span>
            </h2>
            
            <p className="text-brand-gray leading-relaxed text-base sm:text-lg font-normal">
              SISTec Innovation Hackathon is a nationwide initiative to provide a platform for students to solve some of the pressing problems we face in our daily life, and thus inculcate a culture of product innovation and a problem-solving mindset.
            </p>
            
            <p className="text-brand-gray leading-relaxed text-base sm:text-lg font-normal">
              The event encourages out-of-the-box thinking among young minds, especially engineering students from across India, empowering them to transform wild ideas into viable tech prototypes.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-white border border-brand-navy/10 flex flex-col items-center text-center hover:border-brand-blue/30 shadow-card-shadow hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="p-2 rounded-xl bg-brand-dark border border-brand-navy/10 mb-3">
                    {stat.icon}
                  </div>
                  <span className="text-lg sm:text-xl font-bold font-display text-brand-navy">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs text-brand-gray mt-1 font-semibold tracking-wider uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video / Visual Card Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-video rounded-3xl bg-white border border-brand-navy/10 overflow-hidden shadow-card-hover group">
              {!isPlaying ? (
                <>
                  {/* Custom image thumbnail from banner element */}
                  <div className="absolute inset-0 bg-brand-navy flex flex-col items-center justify-center p-6 text-center">
                    {/* Wavy background style */}
                    <div className="absolute inset-0 bg-wave-gradient opacity-90"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Floating elements inside thumbnail */}
                    <div className="relative z-10 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 border border-brand-cyan flex items-center justify-center cursor-pointer group-hover:scale-110 group-hover:bg-white/35 transition-all duration-300 shadow-cyan-glow mx-auto">
                        <Play size={24} className="text-brand-cyan fill-brand-cyan pl-1" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-white tracking-wide">
                          SISTec Innovation Hackathon (SIH 4.0)
                        </h4>
                        <p className="text-[10px] sm:text-xs text-brand-cyan mt-1 font-bold tracking-widest uppercase">
                          Bhopal's Biggest Tech Festival
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="SISTec Innovation Hackathon SIH 4.0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              {/* Floating action trigger to start video */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
