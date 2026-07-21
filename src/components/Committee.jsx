import React, { useState, useEffect } from 'react';
import { Linkedin, Facebook, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import nikhleshImage from '../../Dr NIKHLESH PATHIK.png';

export default function Committee() {
  const [activeTab, setActiveTab] = useState('patrons');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [transitionStyle, setTransitionStyle] = useState('transition-transform duration-500 ease-out');

  const patrons = {
    chief: [
      {
        name: 'Mr. Sudhir Kumar Agrawal',
        role: "Hon'ble Chairman, Sagar Group",
        roleLabel: 'CHIEF PATRON',
        image: '/sudhir_agrawal.png',
        socials: { 
          linkedin: 'https://www.linkedin.com/in/sudhir-agarwal-12a959153/', 
          facebook: 'https://www.facebook.com/sudhirkumar.agrawal.7', 
          instagram: '#', 
          twitter: '#' 
        }
      },
      {
        name: 'Mr. Siddharth Agrawal',
        role: 'MD, Sagar Group',
        roleLabel: 'CHIEF PATRON',
        image: '/siddharth_agrawal.png',
        socials: { 
          linkedin: 'https://www.linkedin.com/in/siddharth-agrawal-10499a52/', 
          facebook: 'https://www.facebook.com/sidd.agrawal', 
          instagram: 'https://www.instagram.com/siddharth.manit?igsh=dHJwcmlpc3VhMTF6', 
          twitter: 'https://x.com/siddharthmanit?s=20' 
        }
      }
    ],
    regular: [
      {
        name: 'Dr. Jyoti Deshmukh',
        role: 'Group Director, SISTec',
        roleLabel: 'PATRON',
        image: '/jyoti_deshmukh.png',
        socials: { 
          linkedin: 'https://www.linkedin.com/in/jyoti-deshmukh-16049a166/', 
          facebook: '#', 
          instagram: '#', 
          twitter: '#' 
        }
      },
      {
        name: 'Dr. Abhishek Choubey',
        role: 'Principal, SISTec-E',
        roleLabel: 'PATRON',
        image: '/abhishek_choubey.png',
        socials: { 
          linkedin: 'https://www.linkedin.com/in/dr-abhishek-choubey-a0271849/', 
          facebook: '#', 
          instagram: '#', 
          twitter: '#' 
        }
      }
    ]
  };

  const coordinators = [
    {
      name: 'Dr. Nikhlesh Pathik',
      role: 'Associate Professor and HOD',
      roleLabel: 'CONVENER',
      image: nikhleshImage,
      socials: { linkedin: '#', facebook: '#', instagram: '#', twitter: '#' }
    },
    {
      name: 'Prof. Harsh Kamde',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Arvind Jhariya',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Nilesh Bodhye',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Sourabh Jha',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Shivam Soni',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Neelesh Shrivastava',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Ritu Sharma',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Abhishek Patel',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Prof. Priyanka Agrawal',
      role: 'CSE Dept Coordinator',
      roleLabel: 'COORDINATOR',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
      socials: { linkedin: '#', twitter: '#' }
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = coordinators.length - visibleCards;
    if (currentIndex >= maxIndex) {
      setTransitionStyle('transition-transform duration-[1200ms] ease-in-out');
      setCurrentIndex(0);
      setTimeout(() => {
        setTransitionStyle('transition-transform duration-500 ease-out');
      }, 1200);
    } else {
      setTransitionStyle('transition-transform duration-500 ease-out');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    const maxIndex = coordinators.length - visibleCards;
    if (currentIndex <= 0) {
      setTransitionStyle('transition-transform duration-[1200ms] ease-in-out');
      setCurrentIndex(maxIndex);
      setTimeout(() => {
        setTransitionStyle('transition-transform duration-500 ease-out');
      }, 1200);
    } else {
      setTransitionStyle('transition-transform duration-500 ease-out');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Reset slider index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const renderSocials = (socials) => {
    const handleSocialClick = (e, url) => {
      if (!url || url === '#') {
        e.preventDefault();
      }
    };

    const getLinkProps = (url, brandClass) => {
      const isPlaceholder = !url || url === '#';
      return {
        href: url || '#',
        onClick: (e) => handleSocialClick(e, url),
        target: isPlaceholder ? undefined : '_blank',
        rel: isPlaceholder ? undefined : 'noopener noreferrer',
        className: `w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${brandClass}`
      };
    };

    return (
      <div className="flex gap-2.5 justify-center mt-4">
        {socials.linkedin && (
          <a {...getLinkProps(socials.linkedin, 'bg-[#0077b5] border border-[#0077b5] text-white shadow-[0_2px_8px_rgba(0,119,181,0.25)]')}>
            <Linkedin size={13} />
          </a>
        )}
        {socials.facebook && (
          <a {...getLinkProps(socials.facebook, 'bg-[#1877f2] border border-[#1877f2] text-white shadow-[0_2px_8px_rgba(24,119,242,0.25)]')}>
            <Facebook size={13} />
          </a>
        )}
        {socials.instagram && (
          <a {...getLinkProps(socials.instagram, 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-[0_2px_8px_rgba(98,40,215,0.25)]')}>
            <Instagram size={13} />
          </a>
        )}
        {socials.twitter && (
          <a {...getLinkProps(socials.twitter, 'bg-black border border-white/10 text-white shadow-[0_2px_8px_rgba(255,255,255,0.1)]')}>
            <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        )}
      </div>
    );
  };

  const renderMemberCard = (member, idx, badgeColorClass, bannerGradientClass, borderGlowClass, imageBorderColorClass, hoverBgClass, isChief = false, isMobileCompact = false) => (
    <div 
      key={idx} 
      className={`relative overflow-hidden ${
        isMobileCompact ? 'rounded-2xl h-[260px]' : 'rounded-[2rem] h-[340px] w-full max-w-[310px]'
      } bg-brand-card/45 backdrop-blur-sm border border-white/5 flex flex-col transition-all duration-500 hover:-translate-y-1.5 mx-auto group/member shadow-card-shadow hover:border-white/12 ${borderGlowClass}`}
    >
      {/* 1. Colored Header Banner */}
      <div className={`${
        isMobileCompact ? 'h-16' : 'h-28'
      } w-full bg-gradient-to-r ${bannerGradientClass} relative overflow-hidden shrink-0`}>
        {/* Subtle decorative grid layer in header */}
        <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
      </div>

      {/* 2. Overlapping Circular Profile Image */}
      <div className={`${
        isMobileCompact ? 'w-20 h-20 -mt-10 border-2' : 'w-32 h-32 sm:w-36 sm:h-36 -mt-16 sm:-mt-18 border-4'
      } rounded-full overflow-hidden ${imageBorderColorClass} mx-auto relative z-10 shadow-lg bg-brand-darker shrink-0`}>
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover/member:scale-105 transition-all duration-500" 
        />
      </div>

      {/* 3. Card Body Details */}
      <div className={`${isMobileCompact ? 'px-3 pb-4 pt-1.5' : 'px-5 pb-6 pt-3'} flex flex-col justify-between flex-grow text-center`}>
        <div className="space-y-1.5">
          <h4 className={`${
            isMobileCompact ? 'text-[11px] font-extrabold line-clamp-1' : 'text-base sm:text-lg font-bold'
          } text-white tracking-wide font-display group-hover/member:text-brand-gold transition-colors duration-300 px-1`}>
            {member.name}
          </h4>
          <p className={`${isMobileCompact ? 'text-[9px]' : 'text-xs'} text-brand-gray/80 font-normal leading-normal px-2 line-clamp-2`}>
            {member.role}
          </p>
        </div>

        {/* 4. Social Links & Badging */}
        <div className={isMobileCompact ? 'space-y-2' : 'space-y-3'}>
          {renderSocials(member.socials, hoverBgClass)}
        </div>
      </div>
    </div>
  );

  const cardThemes = [
    {
      banner: 'from-emerald-500/30 via-teal-500/10 to-transparent',
      borderGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/30',
      imageBorder: 'border-emerald-500/60 group-hover/member:border-emerald-500',
      socialHover: 'hover:bg-emerald-500 hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]'
    },
    {
      banner: 'from-purple-500/30 via-pink-500/10 to-transparent',
      borderGlow: 'hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:border-purple-500/30',
      imageBorder: 'border-purple-500/60 group-hover/member:border-purple-500',
      socialHover: 'hover:bg-purple-500 hover:shadow-[0_0_10px_rgba(139,92,246,0.4)]'
    },
    {
      banner: 'from-blue-500/30 via-cyan-500/10 to-transparent',
      borderGlow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:border-blue-500/30',
      imageBorder: 'border-blue-500/60 group-hover/member:border-blue-500',
      socialHover: 'hover:bg-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.4)]'
    },
    {
      banner: 'from-pink-500/30 via-rose-500/10 to-transparent',
      borderGlow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:border-pink-500/30',
      imageBorder: 'border-pink-500/60 group-hover/member:border-pink-500',
      socialHover: 'hover:bg-pink-500 hover:shadow-[0_0_10px_rgba(244,63,94,0.4)]'
    },
    {
      banner: 'from-amber-500/30 via-brand-orange/10 to-transparent',
      borderGlow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-500/30',
      imageBorder: 'border-amber-500/60 group-hover/member:border-amber-500',
      socialHover: 'hover:bg-amber-500 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)]'
    },
    {
      banner: 'from-cyan-500/30 via-teal-500/10 to-transparent',
      borderGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-500/30',
      imageBorder: 'border-cyan-500/60 group-hover/member:border-cyan-500',
      socialHover: 'hover:bg-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)]'
    }
  ];

  return (
    <section id="committee" className="relative py-12 sm:py-16 bg-brand-darker overflow-hidden tech-grid-dense border-t border-white/5">
      {/* Subtle ambient visual glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--vermilion)] font-sans uppercase mb-2">
            Leadership &amp; Organizers
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] leading-tight font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Our <span className="text-[var(--marigold-deep)]">Committee</span>
          </h2>
        </div>


        {/* Tab Toggles */}
        <div className="flex justify-center gap-4 mb-16">
          {[
            { id: 'patrons', label: 'Patrons' },
            { id: 'coordinators', label: 'Coordinators' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-95 ${
                activeTab === tab.id
                  ? tab.id === 'patrons'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-gradient-to-r from-amber-500 to-brand-orange text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'bg-brand-card/25 border border-white/5 text-brand-gray hover:text-white hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Banner Overlap Circular Cards */}
        <div className="max-w-[1280px] mx-auto">
          {activeTab === 'patrons' && (
            <div className="space-y-10">
              {/* Chief Patrons */}
              <div>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="w-20 sm:w-32 md:w-40 h-[1px] bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <img 
                    src="/chief_patrons_logo.png" 
                    alt="Chief Patrons" 
                    className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.18)]" 
                  />
                  <div className="w-20 sm:w-32 md:w-40 h-[1px] bg-gradient-to-r from-pink-500 to-purple-500"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 justify-center max-w-4xl mx-auto animate-fade-in">
                  {patrons.chief.map((member, idx) => 
                    renderMemberCard(
                      member, 
                      idx, 
                      'text-purple-400',
                      'from-purple-500/30 via-pink-500/10 to-transparent', 
                      'hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]',
                      'border-purple-500/60 group-hover/member:border-purple-500',
                      'hover:bg-purple-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]',
                      true // isChief
                    )
                  )}
                </div>
              </div>

              {/* Patrons */}
              <div className="pt-4">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="w-20 sm:w-32 md:w-40 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                  <img 
                    src="/patrons_logo.png" 
                    alt="Patrons" 
                    className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.18)]" 
                  />
                  <div className="w-20 sm:w-32 md:w-40 h-[1px] bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 justify-center max-w-4xl mx-auto animate-fade-in">
                  {patrons.regular.map((member, idx) => 
                    renderMemberCard(
                      member, 
                      idx, 
                      'text-cyan-400',
                      'from-cyan-500/30 via-blue-500/10 to-transparent', 
                      'hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
                      'border-cyan-500/60 group-hover/member:border-cyan-500',
                      'hover:bg-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)]',
                      false // isChief
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coordinators' && (
            <div>
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="w-20 sm:w-32 md:w-40 h-[1px] bg-gradient-to-r from-amber-500 to-brand-orange"></div>
                <img 
                  src="/coordinators_logo.png" 
                  alt="Coordinators" 
                  className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.18)]" 
                />
                <div className="w-20 sm:w-32 md:w-40 h-[1px] bg-gradient-to-r from-brand-orange to-brand-amber"></div>
              </div>
              
              {/* Desktop Slider View (hidden on mobile, visible on sm and up) */}
              <div className="hidden sm:block relative px-12 sm:px-20 max-w-7xl mx-auto group animate-fade-in">
                
                {/* Viewport Mask */}
                <div className="overflow-hidden py-4">
                  <div 
                    className={`flex ${transitionStyle}`}
                    style={{ transform: `translate3d(-${currentIndex * (100 / visibleCards)}%, 0, 0)` }}
                  >
                    {coordinators.map((member, idx) => {
                      const theme = cardThemes[idx % cardThemes.length];
                      return (
                        <div 
                          key={idx} 
                          className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-6 transition-opacity duration-300"
                          style={{
                            opacity: idx >= currentIndex && idx < currentIndex + visibleCards ? 1 : 0.35
                          }}
                        >
                          {renderMemberCard(
                            member, 
                            idx, 
                            '', 
                            theme.banner, 
                            theme.borderGlow,
                            theme.imageBorder,
                            theme.socialHover
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Left Navigation Button */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-brand-card/35 backdrop-blur-md border border-amber-500/20 flex items-center justify-center text-amber-500 hover:text-brand-amber hover:border-amber-500/40 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer z-20"
                >
                  <ChevronLeft size={24} className="stroke-[3]" />
                </button>

                {/* Right Navigation Button */}
                <button 
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-brand-card/35 backdrop-blur-md border border-amber-500/20 flex items-center justify-center text-amber-500 hover:text-brand-amber hover:border-amber-500/40 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer z-20"
                >
                  <ChevronRight size={24} className="stroke-[3]" />
                </button>
              </div>

              {/* Mobile Grid View (shown on mobile, hidden on sm and up) */}
              <div className="sm:hidden grid grid-cols-2 gap-3 px-1 animate-fade-in">
                {coordinators.map((member, idx) => {
                  const theme = cardThemes[idx % cardThemes.length];
                  return (
                    <div key={idx} className="w-full">
                      {renderMemberCard(
                        member, 
                        idx, 
                        '', 
                        theme.banner, 
                        theme.borderGlow,
                        theme.imageBorder,
                        theme.socialHover,
                        false, // isChief
                        true  // isMobileCompact
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
