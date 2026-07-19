import React from 'react';
import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onViewChange }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-brand-darker border-t border-brand-navy/10 pt-16 pb-8 overflow-hidden text-brand-navy">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[120px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-12">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="SISTec Logo" 
                className="h-10 sm:h-12 w-auto object-contain bg-white px-3 py-0.5 rounded-xl border border-brand-navy/10 shadow-sm"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
              Fostering technical innovation and out-of-the-box engineering problem solving among students across India.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { 
                  icon: <Linkedin size={16} />, 
                  href: '#',
                  hoverClass: 'hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white' 
                },
                { 
                  icon: <Facebook size={16} />, 
                  href: '#',
                  hoverClass: 'hover:bg-[#1877f2] hover:border-[#1877f2] hover:text-white' 
                },
                { 
                  icon: <Instagram size={16} />, 
                  href: '#',
                  hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:text-white' 
                },
                { 
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ), 
                  href: '#',
                  hoverClass: 'hover:bg-white hover:border-white hover:text-black' 
                }
              ].map((soc, index) => (
                <a
                  key={index}
                  href={soc.href}
                  onClick={(e) => { if (soc.href === '#') e.preventDefault(); }}
                  className={`p-2 rounded-xl bg-brand-dark border border-brand-navy/10 text-brand-gray transition-all ${soc.hoverClass}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* SIH Navigation Link Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold tracking-widest text-brand-navy uppercase mb-6 font-display">
              SIH
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-brand-gray font-normal">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#home'); }} className="hover:text-brand-blue transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#about'); }} className="hover:text-brand-blue transition-colors">About SIH</a></li>
              <li><a href="#timeline" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#timeline'); }} className="hover:text-brand-blue transition-colors">SIH 2025</a></li>
              <li><a href="#timeline" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#timeline'); }} className="hover:text-brand-blue transition-colors">SIH 2024</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('contact-us'); }} className="hover:text-brand-blue transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Participants Navigation Link Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold tracking-widest text-brand-navy uppercase mb-6 font-display">
              Participants
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-brand-gray font-normal">
              <li><a href="#objectives" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#objectives'); }} className="hover:text-brand-blue transition-colors">Instructions</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#process'); }} className="hover:text-brand-blue transition-colors">How to Apply</a></li>
              <li><a href="#process" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#process'); }} className="hover:text-brand-blue transition-colors">Idea Template</a></li>
              <li><a href="#faqs" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#faqs'); }} className="hover:text-brand-blue transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold tracking-widest text-brand-navy uppercase mb-6 font-display">
              Contact
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-brand-gray font-normal">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-blue shrink-0" />
                <a href="tel:+917879261234" className="hover:text-brand-blue transition-colors">+91 7879261234</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-brand-pink shrink-0 mt-0.5" />
                <a href="mailto:sistecr.hodcs@sistec.ac.in" className="hover:text-brand-blue transition-colors break-all">
                  sistecr.hodcs@sistec.ac.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-teal shrink-0 mt-0.5" />
                <span>SISTec-R Campus, Ratibad, Bhopal, 462044</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Copyright */}
        <div className="pt-8 border-t border-brand-navy/10 text-center text-[10px] sm:text-xs text-brand-gray/60 font-normal flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <p>&copy; Copyright SIH-{currentYear}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed for 
            <span className="text-brand-navy font-semibold">Sagar Group of Institutions</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
