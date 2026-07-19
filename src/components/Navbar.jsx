import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

export default function Navbar({ onRegisterClick, currentView, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileSubDropdown, setActiveMobileSubDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
        { name: 'Program Schedule', href: '#schedule' }
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
        { name: 'Winner Of SIH 2025', href: '#prizes' }
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
    <div className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'top-3 sm:top-4' : 'top-4 sm:top-6'
    } px-4`}>
      <nav className={`mx-auto max-w-[1200px] w-full transition-all duration-500 rounded-2xl sm:rounded-[2rem] ${
        scrolled 
          ? 'bg-brand-card/90 backdrop-blur-xl border border-brand-navy/10 shadow-[0_20px_50px_rgba(45,30,27,0.08)] py-2 sm:py-3' 
          : 'bg-brand-card/60 backdrop-blur-lg border border-brand-navy/10 shadow-[0_10px_30px_rgba(45,30,27,0.02)] py-3.5 sm:py-4.5'
      }`}>
        <div className="px-4 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div 
              onClick={() => onViewChange && onViewChange('landing', '#home')}
              className="flex items-center group/logo cursor-pointer"
            >
              <img 
                src="/logo.png" 
                alt="SISTec Logo" 
                className="h-10 sm:h-12 w-auto object-contain bg-white/80 px-2.5 py-1 rounded-xl border border-brand-navy/5 shadow-inner transition-transform duration-300 group-hover/logo:scale-105"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, idx) => (
                <div key={idx} className="relative group py-2">
                  {item.dropdown ? (
                    <button
                      onClick={() => toggleDropdown(idx)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy/80 hover:text-brand-blue hover:bg-brand-blue/5 px-3.5 py-2 rounded-xl active:scale-95 transition-all duration-200 cursor-pointer border-none bg-transparent"
                    >
                      {item.name}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-brand-navy/60" />
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
                      className={`inline-block text-sm font-semibold px-3.5 py-2 rounded-xl active:scale-95 transition-all duration-200 ${
                        (item.name === 'Problem Statements' && currentView === 'problem-statements') || (item.name === 'Home' && currentView === 'landing')
                          ? 'text-brand-blue bg-brand-blue/5 border border-brand-blue/10'
                          : 'text-brand-navy/80 hover:text-brand-blue hover:bg-brand-blue/5'
                      }`}
                    >
                      {item.name}
                    </a>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-brand-navy/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-[0_20px_40px_rgba(45,30,27,0.1)]">
                      {item.dropdown.map((sub, sIdx) => {
                        const hasSubItems = !!sub.subItems;
                        return (
                          <div key={sIdx} className="relative group/sub">
                            {hasSubItems ? (
                              <div className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-200 cursor-pointer">
                                <span>{sub.name}</span>
                                <ChevronRight size={12} className="text-brand-navy/40 group-hover/sub:text-white transition-colors" />
                              </div>
                            ) : (
                              <a
                                href={sub.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (sub.name === 'Instructions') {
                                    onViewChange && onViewChange('instructions');
                                  } else {
                                    onViewChange && onViewChange('landing', sub.href);
                                  }
                                }}
                                className="block px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5 hover:translate-x-1 active:scale-95 transition-all duration-200"
                              >
                                {sub.name}
                              </a>
                            )}

                            {/* Secondary Flyout Menu (aligned to the left to match target screenshot) */}
                            {hasSubItems && (
                              <div className="absolute top-0 right-full mr-2 w-52 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-brand-navy/10 p-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible translate-x-[-10px] group-hover/sub:translate-x-0 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
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
                                    className="block px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5 hover:translate-x-1 active:scale-95 transition-all duration-200 text-left"
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
                className="px-6 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(47,102,255,0.15)] hover:shadow-[0_12px_24px_rgba(47,102,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer border-none"
              >
                Register Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-brand-navy hover:text-brand-blue hover:bg-brand-dark/50 transition-all"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full mt-3 bg-brand-card/95 backdrop-blur-xl border border-brand-navy/10 p-4 rounded-2xl flex flex-col gap-3 shadow-[0_20px_40px_rgba(45,30,27,0.1)] animate-fade-in max-h-[calc(100vh-120px)] overflow-y-auto">
            {navItems.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(idx)}
                      className="flex items-center justify-between text-left py-2 px-3 text-sm font-semibold text-brand-navy/80 hover:text-brand-blue rounded-lg hover:bg-brand-dark/30 active:scale-[0.97] transition-all"
                    >
                      {item.name}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === idx && (
                      <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-brand-navy/10">
                        {item.dropdown.map((sub, sIdx) => {
                          const hasSubItems = !!sub.subItems;
                          return (
                            <div key={sIdx} className="flex flex-col">
                              {hasSubItems ? (
                                <>
                                  <button
                                    onClick={() => toggleMobileSubDropdown(sIdx)}
                                    className="flex items-center justify-between w-full py-2 px-3 text-xs font-semibold text-brand-navy/60 hover:text-brand-blue rounded-lg hover:bg-brand-dark/20 transition-all text-left"
                                  >
                                    <span>{sub.name}</span>
                                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeMobileSubDropdown === sIdx ? 'rotate-180' : ''}`} />
                                  </button>
                                  {activeMobileSubDropdown === sIdx && (
                                    <div className="pl-4 flex flex-col gap-1 mt-1 border-l border-brand-navy/5">
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
                                          className="py-1.5 pl-2 text-[11px] font-medium text-brand-navy/50 hover:text-brand-blue transition-all block text-left"
                                        >
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
                                    } else {
                                      onViewChange && onViewChange('landing', sub.href);
                                    }
                                  }}
                                  className="py-1.5 px-3 text-xs font-medium text-brand-navy/60 hover:text-brand-blue active:scale-[0.97] transition-all"
                                >
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
                    className={`py-2 px-3 text-sm font-semibold rounded-lg active:scale-[0.97] transition-all ${
                      (item.name === 'Problem Statements' && currentView === 'problem-statements') || (item.name === 'Home' && currentView === 'landing')
                        ? 'text-brand-blue bg-brand-blue/5'
                        : 'text-brand-navy/80 hover:text-brand-blue hover:bg-brand-dark/30'
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
              className="w-full mt-2 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold tracking-wide text-white text-center hover:opacity-90 active:scale-98 transition-all"
            >
              Register Now
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
