import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

export default function Navbar({ onRegisterClick, currentView, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileSubDropdown, setActiveMobileSubDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger navbar display after scrolling 100px
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
      setActiveMobileSubDropdown(null);
    } else {
      setActiveDropdown(index);
      setActiveMobileSubDropdown(null);
    }
  };

  const toggleMobileSubDropdown = (index) => {
    if (activeMobileSubDropdown === index) {
      setActiveMobileSubDropdown(null);
    } else {
      setActiveMobileSubDropdown(index);
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    {
      name: 'Explore SIH',
      dropdown: [
        { name: 'About SIH', href: '#about' },
        { name: 'Timeline', href: '#timeline' },
        { name: 'Program Schedule', href: '#schedule' },
        { name: 'Photo Gallery', href: '#gallery' }
      ]
    },
    {
      name: 'Guidelines',
      dropdown: [
        { name: 'Instructions', href: '#instructions' },
        { name: 'How to Apply', href: '#process' },
        { name: 'Idea Template', href: '#process' },
        { name: 'Consent Letter', href: '#process' }
      ]
    },
    { name: 'Problem Statements', href: '#themes' },
    {
      name: 'Result',
      dropdown: [
        { name: 'Grand Finale Teams', href: '#prizes' },
        { name: 'Winner Of SIH 2026', href: '#prizes' }
      ]
    },
    {
      name: 'Previous SIH',
      dropdown: [
        {
          name: 'SIH 3.0',
          subItems: [
            { name: 'SIH 2025' },
            { name: 'Grand Finale Teams', view: 'sih-2025-finalists' },
            { name: 'Winner Of SIH 2025' }
          ]
        },
        {
          name: 'SIH 2.0',
          subItems: [
            { name: 'SIH 2024', view: 'sih-2024' },
            { name: 'Grand Finale Teams', view: 'sih-2024-finalists' },
            { name: 'Winner Of SIH 2024', view: 'sih-2024-winners' }
          ]
        },
        {
          name: 'SIH 1.0',
          subItems: [
            { name: 'SIH 2023' },
            { name: 'Grand Finale Teams', view: 'sih-2023-finalists' },
            { name: 'Winner Of SIH 2023', view: 'sih-2023-winners' }
          ]
        }
      ]
    },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <nav className={`w-full transition-all duration-500 border-b ${scrolled
          ? 'bg-brand-card/95 backdrop-blur-xl border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-3 sm:py-4'
          : 'bg-transparent border-transparent py-5 sm:py-6'
          }`}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <div
                onClick={() => {
                  setIsOpen(false);
                  onViewChange && onViewChange('landing', '#home');
                }}
                className="flex items-center group/logo cursor-pointer"
              >
                <img
                  src="/logo.png"
                  alt="SISTec Logo"
                  className="h-10 sm:h-12 w-auto object-contain bg-white/90 px-3 py-1 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:shadow-[0_0_20px_rgba(216,171,85,0.2)]"
                />
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item, idx) => (
                  <div key={idx} className="relative group py-2">
                    {item.dropdown ? (
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy/80 hover:text-brand-gold hover:bg-white/5 px-3.5 py-2 rounded-xl active:scale-95 transition-all duration-200 cursor-pointer border-none bg-transparent relative"
                      >
                        {item.name}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-brand-navy/60 group-hover:text-brand-gold" />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.name === 'Problem Statements') {
                            onViewChange && onViewChange('problem-statements');
                          } else if (item.name === 'Contact Us') {
                            onViewChange && onViewChange('contact-us');
                          } else {
                            onViewChange && onViewChange('landing', item.href);
                          }
                        }}
                        className={`inline-block text-sm font-semibold px-3.5 py-2 rounded-xl active:scale-95 transition-all duration-200 relative ${(item.name === 'Problem Statements' && currentView === 'problem-statements') || (item.name === 'Home' && currentView === 'landing') || (item.name === 'Contact Us' && currentView === 'contact-us')
                          ? 'text-brand-gold bg-brand-gold/10 border border-brand-gold/20'
                          : 'text-brand-navy/80 hover:text-brand-gold hover:bg-white/5'
                          }`}
                      >
                        {item.name}
                      </a>
                    )}

                    {/* Dropdown Menu */}
                    {item.dropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-white/5 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-50">
                        {item.dropdown.map((sub, sIdx) => {
                          const hasSubItems = !!sub.subItems;
                          return (
                            <div key={sIdx} className="relative group/sub">
                              {hasSubItems ? (
                                <div className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200 cursor-pointer">
                                  <span>{sub.name}</span>
                                  <ChevronRight size={12} className="text-brand-navy/40 group-hover/sub:text-brand-gold transition-colors" />
                                </div>
                              ) : (
                                <a
                                  href={sub.href}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (sub.name === 'Instructions') {
                                      onViewChange && onViewChange('instructions');
                                    } else if (sub.name === 'About SIH') {
                                      onViewChange && onViewChange('about-sih');
                                    } else if (sub.name === 'Timeline') {
                                      onViewChange && onViewChange('timeline');
                                    } else if (sub.name === 'Program Schedule') {
                                      onViewChange && onViewChange('schedule');
                                    } else if (sub.name === 'Photo Gallery') {
                                      onViewChange && onViewChange('photo-gallery');
                                    } else if (sub.name === 'Winner Of SIH 2026') {
                                      onViewChange && onViewChange('sih-2026-winners');
                                    } else if (sub.name === 'Grand Finale Teams') {
                                      onViewChange && onViewChange('sih-2026-finalists');
                                    } else {
                                      onViewChange && onViewChange('landing', sub.href);
                                    }
                                  }}
                                  className="block px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-gold hover:bg-brand-gold/10 hover:translate-x-1 active:scale-95 transition-all duration-200 text-left"
                                >
                                  {sub.name}
                                </a>
                              )}

                              {/* Secondary Flyout Menu */}
                              {hasSubItems && (
                                <div className="absolute top-0 right-full mr-2 w-52 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-white/5 p-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible translate-x-[-10px] group-hover/sub:translate-x-0 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-50">
                                  {sub.subItems.map((nested, nIdx) => (
                                    <a
                                      key={nIdx}
                                      href="#timeline"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (nested.view) {
                                          onViewChange && onViewChange(nested.view);
                                        } else if (nested.name === 'SIH 2023') {
                                          onViewChange && onViewChange('sih-2023');
                                        } else {
                                          onViewChange && onViewChange('landing', '#timeline');
                                        }
                                      }}
                                      className="block px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-gold hover:bg-brand-gold/10 hover:translate-x-1 active:scale-95 transition-all duration-200 text-left"
                                    >
                                      {nested.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="hidden lg:block">
                <button
                  onClick={onRegisterClick}
                  className="px-6 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(216,171,85,0.15)] hover:shadow-[0_12px_24px_rgba(216,171,85,0.4)] hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer border-none btn-premium-animate"
                >
                  Register Now
                </button>
              </div>

              {/* Mobile Menu Actions */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={onRegisterClick}
                  className="px-3.5 py-1.5 rounded-xl bg-btn-gradient text-xs font-bold text-white shadow-md active:scale-95 transition-all border-none cursor-pointer hover:shadow-[0_0_15px_rgba(216,171,85,0.3)] btn-premium-animate"
                >
                  Register
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-brand-navy hover:text-brand-gold hover:bg-white/5 transition-all border-none bg-transparent"
                >
                  {isOpen ? <X size={22} className="text-brand-gold" /> : <Menu size={22} />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Drawer (absolute overlay for full-width layout) */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-[#0D0D0F] border-b border-white/5 p-5 flex flex-col gap-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto z-50">
              {navItems.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="flex items-center justify-between text-left py-2 px-3 text-sm font-semibold text-brand-navy/80 hover:text-brand-gold rounded-lg hover:bg-white/5 active:scale-[0.97] transition-all bg-transparent border-none cursor-pointer"
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180 text-brand-gold' : 'text-brand-navy/40'}`} />
                      </button>
                      {activeDropdown === idx && (
                        <div className="pl-4 pr-2 py-2 flex flex-col gap-1.5 mt-1 bg-black/30 border border-white/5 rounded-xl ml-2 space-y-0.5">
                          {item.dropdown.map((sub, sIdx) => {
                            const hasSubItems = !!sub.subItems;
                            return (
                              <div key={sIdx} className="flex flex-col">
                                {hasSubItems ? (
                                  <>
                                    <button
                                      onClick={() => toggleMobileSubDropdown(sIdx)}
                                      className="flex items-center justify-between w-full py-2 px-3 text-xs font-semibold text-brand-navy/75 hover:text-brand-gold rounded-lg hover:bg-white/5 transition-all text-left bg-transparent border-none cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 shrink-0"></span>
                                        <span>{sub.name}</span>
                                      </div>
                                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeMobileSubDropdown === sIdx ? 'rotate-180 text-brand-gold' : 'text-brand-navy/40'}`} />
                                    </button>
                                    {activeMobileSubDropdown === sIdx && (
                                      <div className="pl-5 pr-2 py-1.5 flex flex-col gap-1 mt-1 bg-black/40 border border-white/5 rounded-xl ml-4 space-y-0.5">
                                        {sub.subItems.map((nested, nIdx) => (
                                          <a
                                            key={nIdx}
                                            href="#timeline"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setIsOpen(false);
                                              if (nested.view) {
                                                onViewChange && onViewChange(nested.view);
                                              } else if (nested.name === 'SIH 2023') {
                                                onViewChange && onViewChange('sih-2023');
                                              } else {
                                                onViewChange && onViewChange('landing', '#timeline');
                                              }
                                            }}
                                            className="py-1.5 px-3 text-[11px] font-medium text-brand-navy/60 hover:text-brand-gold hover:bg-white/5 rounded-md transition-all text-left flex items-center gap-1.5 block"
                                          >
                                            <span className="w-1 h-1 rounded-full bg-brand-navy/40 shrink-0"></span>
                                            {nested.name}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <a
                                    href={sub.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsOpen(false);
                                      if (sub.name === 'Instructions') {
                                        onViewChange && onViewChange('instructions');
                                      } else if (sub.name === 'About SIH') {
                                        onViewChange && onViewChange('about-sih');
                                      } else if (sub.name === 'Timeline') {
                                        onViewChange && onViewChange('timeline');
                                      } else if (sub.name === 'Program Schedule') {
                                        onViewChange && onViewChange('schedule');
                                      } else if (sub.name === 'Photo Gallery') {
                                        onViewChange && onViewChange('photo-gallery');
                                      } else if (sub.name === 'Winner Of SIH 2026') {
                                        onViewChange && onViewChange('sih-2026-winners');
                                      } else if (sub.name === 'Grand Finale Teams') {
                                        onViewChange && onViewChange('sih-2026-finalists');
                                      } else {
                                        onViewChange && onViewChange('landing', sub.href);
                                      }
                                    }}
                                    className="py-2 px-3 text-xs font-medium text-brand-navy/70 hover:text-brand-gold hover:bg-white/5 rounded-lg active:scale-[0.97] transition-all text-left flex items-center gap-2 block"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 shrink-0"></span>
                                    {sub.name}
                                  </a>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        if (item.name === 'Problem Statements') {
                          onViewChange && onViewChange('problem-statements');
                        } else if (item.name === 'Contact Us') {
                          onViewChange && onViewChange('contact-us');
                        } else {
                          onViewChange && onViewChange('landing', item.href);
                        }
                      }}
                      className={`py-2 px-3 text-sm font-semibold rounded-lg active:scale-[0.97] transition-all text-left block ${(item.name === 'Problem Statements' && currentView === 'problem-statements') || (item.name === 'Home' && currentView === 'landing') || (item.name === 'Contact Us' && currentView === 'contact-us')
                        ? 'text-brand-gold bg-brand-gold/10'
                        : 'text-brand-navy/80 hover:text-brand-gold hover:bg-white/5'
                        }`}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onRegisterClick();
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold tracking-wide text-white text-center hover:opacity-90 active:scale-98 transition-all border-none cursor-pointer shadow-[0_4px_10px_rgba(216,171,85,0.2)] btn-premium-animate"
              >
                Register Now
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
