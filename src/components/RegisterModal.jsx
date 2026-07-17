import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    email: '',
    phone: '',
    track: 'AgriTech',
    teamSize: '4',
    github: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let errs = {};
    if (!formData.teamName.trim()) errs.teamName = 'Team name is required';
    if (!formData.leaderName.trim()) errs.leaderName = 'Leader name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white border border-brand-navy/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-brand-dark border border-brand-navy/10 text-brand-gray hover:text-brand-blue transition-all cursor-pointer"
        >
          <X size={16} />
        </button>

        {!isSuccess ? (
          <>
            {/* Form Title */}
            <div className="text-left space-y-2 mb-6">
              <h3 className="text-2xl font-bold font-display bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
                Register for SIH 4.0
              </h3>
              <p className="text-xs text-brand-gray">
                Join the ultimate technical hackathon. Form your squad and claim your prize.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Team Name */}
              <div>
                <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                  TEAM NAME
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g. Code Warriors"
                  className={`w-full px-4 py-3 rounded-xl bg-brand-dark border ${
                    errors.teamName ? 'border-red-500' : 'border-brand-navy/10 focus:border-brand-blue'
                  } focus:outline-none text-sm text-brand-navy placeholder-brand-gray/50 transition-colors shadow-sm`}
                />
                {errors.teamName && (
                  <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.teamName}
                  </p>
                )}
              </div>

              {/* Leader & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                    LEADER NAME
                  </label>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-3 rounded-xl bg-brand-dark border ${
                      errors.leaderName ? 'border-red-500' : 'border-brand-navy/10 focus:border-brand-blue'
                    } focus:outline-none text-sm text-brand-navy placeholder-brand-gray/50 transition-colors shadow-sm`}
                  />
                  {errors.leaderName && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.leaderName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                    LEADER EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-brand-dark border ${
                      errors.email ? 'border-red-500' : 'border-brand-navy/10 focus:border-brand-blue'
                    } focus:outline-none text-sm text-brand-navy placeholder-brand-gray/50 transition-colors shadow-sm`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & GitHub row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                    LEADER PHONE
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    className={`w-full px-4 py-3 rounded-xl bg-brand-dark border ${
                      errors.phone ? 'border-red-500' : 'border-brand-navy/10 focus:border-brand-blue'
                    } focus:outline-none text-sm text-brand-navy placeholder-brand-gray/50 transition-colors shadow-sm`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                    GITHUB / LINKEDIN PROFILE
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="e.g. github.com/username"
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-navy/10 focus:border-brand-blue focus:outline-none text-sm text-brand-navy placeholder-brand-gray/50 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Track & Size row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                    SELECTED TRACK
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-navy/10 focus:border-brand-blue focus:outline-none text-sm text-brand-navy transition-colors"
                  >
                    <option value="AgriTech">AgriTech</option>
                    <option value="EduTech">EduTech</option>
                    <option value="Urban Mobility">Urban Mobility</option>
                    <option value="Healthcare">Healthcare & Biotech</option>
                    <option value="Fintech">Fintech & Web3</option>
                    <option value="AI">AI & Open Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-gray tracking-wider mb-2 font-mono">
                    TEAM SIZE
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-navy/10 focus:border-brand-blue focus:outline-none text-sm text-brand-navy transition-colors"
                  >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members (Full Team)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-btn-gradient text-sm font-bold tracking-wider text-white hover:opacity-90 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 border-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Registering Team...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Nomination</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-teal/15 border border-brand-teal/50 flex items-center justify-center text-brand-teal shadow-teal-glow animate-bounce">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-brand-navy">Registration Successful!</h3>
              <p className="text-xs text-brand-gray max-w-sm mx-auto leading-relaxed">
                Thank you for registering your team <span className="text-brand-navy font-bold">"{formData.teamName}"</span>. We have sent the abstract guidelines and proposal templates to <span className="text-brand-navy font-bold">{formData.email}</span>.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-brand-dark border border-brand-navy/10 text-xs font-bold tracking-wide text-brand-navy hover:text-brand-blue hover:border-brand-blue transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
