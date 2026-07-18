import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ onRegisterClick, currentView, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    } else {
      setActiveDropdown(index);
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    {
      name: 'Explore SIH',
      dropdown: [
        { name: 'SIH 2024', href: '#timeline' },
        { name: 'SIH 2023', href: '#timeline' }
      ]
    },
    {
      name: 'Guidelines',
      dropdown: [
        { name: 'Instructions', href: '#objectives' },
        { name: 'How to Apply', href: '#process' },
        { name: 'Idea Template', href: '#process' }
      ]
    },
    { name: 'Problem Statements', href: '#themes' },
    {
      name: 'Result',
      dropdown: [
        { name: 'SIH 4.0 Finalist Teams', href: '#prizes' }
      ]
    },
    {
      name: 'Previous SIH',
      dropdown: [
        { name: 'SIH 3.0 (2025)', href: '#timeline' },
        { name: 'SIH 2.0 (2024)', href: '#timeline' }
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
                      {item.dropdown.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={(e) => {
                            e.preventDefault();
                            onViewChange && onViewChange('landing', sub.href);
                          }}
                          className="block px-4 py-2.5 text-xs font-semibold rounded-xl text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5 hover:translate-x-1 active:scale-95 transition-all duration-200"
                        >
                          {sub.name}
                        </a>
                      ))}
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
          <div className="lg:hidden absolute top-full left-0 w-full mt-3 bg-brand-card/95 backdrop-blur-xl border border-brand-navy/10 p-4 rounded-2xl flex flex-col gap-3 shadow-[0_20px_40px_rgba(45,30,27,0.1)] animate-fade-in">
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
                        {item.dropdown.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              onViewChange && onViewChange('landing', sub.href);
                            }}
                            className="py-1.5 text-xs font-medium text-brand-navy/60 hover:text-brand-blue active:scale-[0.97] transition-all"
                          >
                            {sub.name}
                          </a>
                        ))}
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
