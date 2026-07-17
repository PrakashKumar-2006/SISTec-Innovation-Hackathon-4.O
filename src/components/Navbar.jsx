import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ onRegisterClick }) {
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
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-brand-navy/10 py-3 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="SISTec Logo" 
              className="h-10 sm:h-12 w-auto object-contain bg-white px-2 py-0.5 rounded-xl border border-brand-navy/10"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="flex items-center gap-1 text-sm font-semibold text-brand-navy/80 hover:text-brand-blue transition-colors"
                  >
                    {item.name}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-brand-navy/80 hover:text-brand-blue transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-blue hover:after:w-full after:transition-all after:duration-300"
                  >
                    {item.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white border border-brand-navy/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
                    {item.dropdown.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href={sub.href}
                        className="block px-4 py-2 text-xs font-semibold rounded-lg text-brand-navy/70 hover:text-brand-blue hover:bg-brand-dark transition-colors"
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
              className="px-5 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold tracking-wide text-white hover:opacity-90 hover:scale-102 hover:shadow-cyan-glow transition-all duration-300 cursor-pointer border-none"
            >
              Register Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-brand-navy hover:text-brand-blue hover:bg-brand-dark transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-brand-navy/10 p-4 flex flex-col gap-3 shadow-2xl">
          {navItems.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(idx)}
                    className="flex items-center justify-between text-left py-2 px-3 text-sm font-semibold text-brand-navy/80 hover:text-brand-blue rounded-lg hover:bg-brand-dark"
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
                          onClick={() => setIsOpen(false)}
                          className="py-1.5 text-xs font-medium text-brand-navy/60 hover:text-brand-blue transition-colors"
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
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-3 text-sm font-semibold text-brand-navy/80 hover:text-brand-blue rounded-lg hover:bg-brand-dark"
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
            className="w-full mt-2 py-2.5 rounded-xl bg-btn-gradient text-sm font-bold tracking-wide text-white text-center hover:opacity-90 hover:shadow-cyan-glow transition-all"
          >
            Register Now
          </button>
        </div>
      )}
    </nav>
  );
}
