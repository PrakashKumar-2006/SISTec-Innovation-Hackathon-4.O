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
                className="h-10 sm:h-12 w-auto object-contain bg-white px-3.5 py-1.5 rounded-2xl border border-[#E3D7C5] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
              Fostering technical innovation and out-of-the-box engineering problem solving among students across India.
            </p>

            {/* Social Icons with Official Brand App Badge Styles */}
            <div className="flex gap-3 pt-2">
              {/* LinkedIn (Real App Badge Style matching user image) */}
              <a
                href="https://www.linkedin.com/school/sagar-institute-of-science-technology-research-sistec-r/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-2xl bg-[#0066c8] flex items-center justify-center shadow-md shadow-[#0066c8]/30 hover:scale-110 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-5 h-5 bg-white rounded-[4px] flex items-center justify-center p-[2px] shadow-2xs group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-[#0066c8]">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
                  </svg>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sistecratibad?igsh=ZXQ5ZWtlbDNlcm94"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-md shadow-[#ee2a7b]/30 hover:scale-110 transition-all duration-300 group cursor-pointer"
              >
                <Instagram size={20} className="text-white group-hover:scale-105 transition-transform" />
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/SISTecRatibad?s=20"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter X"
                className="w-10 h-10 rounded-2xl bg-black border border-white/20 flex items-center justify-center shadow-md shadow-black/40 hover:scale-110 transition-all duration-300 group cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-white group-hover:scale-105 transition-transform">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* SIH Navigation Link Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold tracking-widest text-brand-navy uppercase mb-6 font-display">
              SIH
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-brand-gray font-normal">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('landing', '#home'); }} className="hover:text-brand-blue transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('about-sih'); }} className="hover:text-brand-blue transition-colors">About SIH</a></li>
              <li><a href="#gallery" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('photo-gallery'); }} className="hover:text-brand-blue transition-colors">Photo Gallery</a></li>
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
              <li><a href="#objectives" onClick={(e) => { e.preventDefault(); onViewChange && onViewChange('instructions'); }} className="hover:text-brand-blue transition-colors">Instructions</a></li>
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
                <a 
                  href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors text-left"
                >
                  SISTec-R Campus, Ratibad, Bhopal, 462044
                </a>
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
