import React from 'react';
import { Code2, Linkedin, Github, Globe } from 'lucide-react';

export default function Developers() {
  const devs = [
    {
      name: 'Shivnandan Verma',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200',
      socials: { linkedin: '#', github: '#' }
    },
    {
      name: 'Tulsiram Pathe',
      role: 'Full Stack Developer',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200&h=200',
      socials: { linkedin: '#', github: '#' }
    },
    {
      name: 'Harsh Kamde',
      role: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200&h=200',
      socials: { linkedin: '#', github: '#' }
    }
  ];

  return (
    <section id="developers" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-16">

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-navy">
            Developers of{' '}
            <span className="bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
              SIH
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
            Meet the talented student development team behind the SIH web infrastructure.
          </p>
        </div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {devs.map((dev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/30 hover:-translate-y-1.5 transition-all duration-300 shadow-card-shadow hover:shadow-card-hover flex flex-col items-center"
            >
              {/* Profile Image with Ring */}
              <div className="w-24 h-24 rounded-full border-2 border-brand-blue/60 overflow-hidden mb-4 shadow-sm relative group">
                <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Globe size={18} className="text-brand-cyan" />
                </div>
              </div>

              {/* Developer Details */}
              <h3 className="text-base sm:text-lg font-bold text-brand-navy tracking-wide font-display">
                {dev.name}
              </h3>
              
              <div className="inline-block px-3 py-1 rounded-full bg-brand-dark border border-brand-navy/10 text-[10px] sm:text-xs text-brand-blue font-bold tracking-widest font-mono uppercase mt-2">
                {dev.role}
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-5">
                {dev.socials.linkedin && (
                  <a
                    href={dev.socials.linkedin}
                    className="p-2 rounded-xl bg-brand-dark border border-brand-navy/10 text-brand-gray hover:text-brand-blue hover:border-brand-blue transition-all"
                  >
                    <Linkedin size={14} />
                  </a>
                )}
                {dev.socials.github && (
                  <a
                    href={dev.socials.github}
                    className="p-2 rounded-xl bg-brand-dark border border-brand-navy/10 text-brand-gray hover:text-brand-navy hover:border-brand-navy transition-all"
                  >
                    <Github size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
