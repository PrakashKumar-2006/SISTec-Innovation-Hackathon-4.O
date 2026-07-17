import React, { useState } from 'react';
import { Users, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Committee() {
  const [activeTab, setActiveTab] = useState('patrons');

  const patrons = {
    chief: [
      {
        name: 'Mr. Sudhir Kumar Agrawal',
        role: "Hon'ble Chairman, Sagar Group",
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
        socials: { linkedin: '#', facebook: '#', instagram: '#', twitter: '#' }
      },
      {
        name: 'Mr. Siddharth Agrawal',
        role: 'MD, Sagar Group',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
        socials: { linkedin: '#', facebook: '#', instagram: '#', twitter: '#' }
      }
    ],
    regular: [
      {
        name: 'Dr. Jyoti Deshmukh',
        role: 'Group Director, SISTec',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
        socials: { linkedin: '#', facebook: '#', instagram: '#', twitter: '#' }
      },
      {
        name: 'Dr. Abhishek Choubey',
        role: 'Principal, SISTec-R',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
        socials: { linkedin: '#', facebook: '#', instagram: '#', twitter: '#' }
      }
    ]
  };

  const coordinators = [
    {
      name: 'Prof. Tulsiram Pathe',
      role: 'Faculty Coordinator, CS Dept',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
      socials: { linkedin: '#', facebook: '#', instagram: '#', twitter: '#' }
    },
    {
      name: 'Prof. Harsh Kamde',
      role: 'CSE Dept Coordinator',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
      socials: { linkedin: '#', twitter: '#' }
    }
  ];

  const renderSocials = (socials) => (
    <div className="flex justify-center gap-3 pt-4">
      {socials.linkedin && (
        <a href={socials.linkedin} className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-sm cursor-pointer">
          <Linkedin size={14} />
        </a>
      )}
      {socials.facebook && (
        <a href={socials.facebook} className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-sm cursor-pointer">
          <Facebook size={14} />
        </a>
      )}
      {socials.instagram && (
        <a href={socials.instagram} className="w-8 h-8 rounded-full bg-[#e1306c] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-sm cursor-pointer">
          <Instagram size={14} />
        </a>
      )}
      {socials.twitter && (
        <a href={socials.twitter} className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:scale-115 transition-transform shadow-sm cursor-pointer">
          <Twitter size={14} />
        </a>
      )}
    </div>
  );

  const renderMemberCard = (member, idx, bannerBgClass) => (
    <div 
      key={idx} 
      className="relative overflow-hidden rounded-[24px] bg-[#FFFDFB] border border-brand-navy/10 hover:border-brand-blue/30 transition-all duration-300 shadow-card-shadow hover:shadow-card-hover flex flex-col items-center pb-6 text-center w-full max-w-[320px] mx-auto group/member"
    >
      {/* Solid Color Banner at top */}
      <div className={`w-full h-24 ${bannerBgClass} rounded-t-[22px] transition-all duration-300`}></div>

      {/* Overlapping Circle Avatar */}
      <div className="w-28 h-28 rounded-full border-[4px] border-white overflow-hidden -mt-14 relative z-10 shadow-md group-hover/member:scale-105 transition-transform duration-500">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Member Details */}
      <div className="px-4 pt-4 flex flex-col flex-grow items-center">
        <h4 className="text-base sm:text-lg font-bold text-brand-navy tracking-wide font-display">
          {member.name}
        </h4>
        <p className="text-xs text-brand-gray/80 mt-1 font-medium">
          {member.role}
        </p>

        {/* Spacing to align socials at bottom */}
        <div className="flex-grow min-h-[16px]"></div>
        {renderSocials(member.socials)}
      </div>
    </div>
  );

  return (
    <section id="committee" className="relative py-24 bg-brand-darker overflow-hidden tech-grid-dense">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-navyDeep">
            Our{' '}
            <span className="text-gold-metallic">
              Committee
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
            Meet the visionaries, educators, and organizers guiding the SISTec Innovation Hackathon.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          {[
            { id: 'patrons', label: 'Patrons' },
            { id: 'coordinators', label: 'Coordinators' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-btn-gradient text-white shadow-cyan-glow'
                  : 'bg-white border border-brand-navy/10 text-brand-navy/60 hover:text-brand-blue hover:border-brand-blue/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'patrons' && (
            <div className="space-y-16">
              {/* Chief Patrons */}
              <div>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-8 h-[2px] bg-brand-pink/50"></div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-pink font-mono">
                    ✨ CHIEF PATRONS
                  </span>
                  <div className="w-8 h-[2px] bg-brand-pink/50"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-5xl mx-auto animate-fade-in">
                  {patrons.chief.map((member, idx) => 
                    renderMemberCard(member, idx, 'bg-gradient-to-r from-brand-orange to-brand-pink')
                  )}
                </div>
              </div>

              {/* Patrons */}
              <div className="pt-12 border-t border-brand-navy/10">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-8 h-[2px] bg-brand-blue/50"></div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue font-mono">
                    🛡️ PATRONS
                  </span>
                  <div className="w-8 h-[2px] bg-brand-blue/50"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-5xl mx-auto animate-fade-in">
                  {patrons.regular.map((member, idx) => 
                    renderMemberCard(member, idx, 'bg-gradient-to-r from-brand-blue to-brand-navy')
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coordinators' && (
            <div>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-brand-orange/50"></div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange font-mono">
                  📅 CONVENERS & FACULTY COORDINATORS
                </span>
                <div className="w-8 h-[2px] bg-brand-orange/50"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-5xl mx-auto animate-fade-in">
                {coordinators.map((member, idx) => 
                  renderMemberCard(member, idx, 'bg-gradient-to-r from-brand-orange to-brand-purple')
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
