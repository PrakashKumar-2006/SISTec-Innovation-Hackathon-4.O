import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle2, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import contactImg from '../../contact image.png';

export default function Contact({ onViewChange }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative bg-brand-darker pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white select-none overflow-hidden border-t border-white/5">
      {/* Background glow elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">


        {/* Header Section */}
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-brand-gray to-brand-gold bg-clip-text text-transparent uppercase font-display">
            Have You Any Question?
          </h2>
          <p className="text-brand-gold text-xs sm:text-sm font-semibold tracking-widest uppercase font-mono">
            We Are Always At Your Services
          </p>
        </div>

        {/* ── Top 3 Contact Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Helpline Card */}
          <div className="group p-6 rounded-3xl bg-brand-card/30 border border-white/5 hover:border-brand-gold/30 shadow-card-shadow transition-all duration-300 text-center flex flex-col items-center">
            <div className="p-4 rounded-full bg-brand-gold/10 text-brand-gold mb-5 border border-brand-gold/20 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 font-display">Helpline Number</h3>
            <div className="space-y-1 font-mono text-xs sm:text-sm text-brand-gray/80 font-medium">
              <p className="hover:text-brand-gold transition-colors">+91 9827102062</p>
              <p className="hover:text-brand-gold transition-colors">+91 9827666677</p>
              <p className="hover:text-brand-gold transition-colors">+91 7879261234</p>
            </div>
          </div>

          {/* Address Card */}
          <a 
            href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-brand-card/30 border border-white/5 hover:border-brand-gold/30 shadow-card-shadow hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center cursor-pointer"
          >
            <div className="p-4 rounded-full bg-brand-gold/10 text-brand-gold mb-5 border border-brand-gold/20 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 font-display group-hover:text-brand-gold transition-colors">Address</h3>
            <p className="text-xs sm:text-sm text-brand-gray/80 leading-relaxed max-w-xs font-semibold group-hover:text-slate-200 transition-colors">
              SISTec-R Sikandrabad, Ratibad, Bhopal, Madhya Pradesh 462044
            </p>
          </a>

          {/* Email Card */}
          <div className="group p-6 rounded-3xl bg-brand-card/30 border border-white/5 hover:border-brand-gold/30 shadow-card-shadow transition-all duration-300 text-center flex flex-col items-center">
            <div className="p-4 rounded-full bg-brand-gold/10 text-brand-gold mb-5 border border-brand-gold/20 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 font-display">Email</h3>
            <div className="space-y-1 text-xs sm:text-sm text-brand-gray/80 font-semibold break-all">
              <p className="hover:text-brand-gold transition-colors">anujkumarpal@sistec.ac.in</p>
              <p className="hover:text-brand-gold transition-colors">himanshuyadav@sistec.ac.in</p>
              <p className="hover:text-brand-gold transition-colors">rohitbansal@sistec.ac.in</p>
            </div>
          </div>
        </div>

        {/* ── Contact Section Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center h-full">
            <div className="relative w-full flex items-center justify-center">
              {/* Outer decorative glowing elements */}
              <div className="absolute inset-0 bg-brand-gold/5 rounded-full filter blur-2xl animate-pulse"></div>

              <img
                src={contactImg}
                alt="Contact Support"
                className="w-full h-auto max-h-[480px] lg:max-h-[520px] object-contain rounded-3xl relative z-10 select-none hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-brand-card/30 border border-white/5 shadow-2xl relative">
              <h3 className="text-2xl font-bold text-white mb-2 text-left font-display">Contact Us</h3>
              <p className="text-brand-gray/60 text-xs sm:text-sm font-medium mb-8 text-left">
                Drop us a message and our support team will get back to you shortly.
              </p>

              {isSent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-lg shadow-brand-gold/5">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                    <p className="text-xs text-brand-gray/60 max-w-sm">
                      Thank you for contacting us. We will respond to your query as soon as possible.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Name"
                        className="w-full px-5 py-3 rounded-2xl bg-[#080809]/60 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all focus:ring-1 focus:ring-brand-gold/30 shadow-inner"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-5 py-3 rounded-2xl bg-[#080809]/60 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all focus:ring-1 focus:ring-brand-gold/30 shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Subject"
                      className="w-full px-5 py-3 rounded-2xl bg-[#080809]/60 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all focus:ring-1 focus:ring-brand-gold/30 shadow-inner"
                    />
                  </div>

                  <div>
                    <textarea
                      rows="4"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Message"
                      className="w-full px-5 py-3 rounded-2xl bg-[#080809]/60 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all focus:ring-1 focus:ring-brand-gold/30 shadow-inner resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-btn-gradient text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all border-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
