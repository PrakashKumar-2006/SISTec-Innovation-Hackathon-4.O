import React from 'react';
import { Linkedin, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-[#FFFAFA] border-t border-brand-navy/10 pt-16 pb-8 overflow-hidden text-brand-navy">
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
                { icon: <Linkedin size={16} />, href: '#' },
                { icon: <Facebook size={16} />, href: '#' },
                { icon: <Instagram size={16} />, href: '#' },
                { icon: <Twitter size={16} />, href: '#' }
              ].map((soc, index) => (
                <a
                  key={index}
                  href={soc.href}
                  className="p-2 rounded-xl bg-brand-dark border border-brand-navy/10 text-brand-gray hover:text-brand-blue hover:border-brand-blue transition-all"
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
              <li><a href="#home" className="hover:text-brand-blue transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-blue transition-colors">About SIH</a></li>
              <li><a href="#timeline" className="hover:text-brand-blue transition-colors">SIH 2025</a></li>
              <li><a href="#timeline" className="hover:text-brand-blue transition-colors">SIH 2024</a></li>
              <li><a href="#contact" className="hover:text-brand-blue transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Participants Navigation Link Column */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold tracking-widest text-brand-navy uppercase mb-6 font-display">
              Participants
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-brand-gray font-normal">
              <li><a href="#objectives" className="hover:text-brand-blue transition-colors">Instructions</a></li>
              <li><a href="#process" className="hover:text-brand-blue transition-colors">How to Apply</a></li>
              <li><a href="#process" className="hover:text-brand-blue transition-colors">Idea Template</a></li>
              <li><a href="#faqs" className="hover:text-brand-blue transition-colors">FAQs</a></li>
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
