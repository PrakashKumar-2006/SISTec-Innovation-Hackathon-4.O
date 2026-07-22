import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle2, MessageSquare, Clock, ArrowLeft, UploadCloud, Search, AlertCircle, FileText, X } from 'lucide-react';
import axios from 'axios';
import contactImg from '../../contact image.png';

const CATEGORIES = [
  'General Inquiry',
  'Registration Support',
  'Payment Related Query',
  'Problem Statement Change Request',
  'Technical Issue',
  'Certificate / Result Query',
  'Other'
];

export default function Contact({ onViewChange }) {
  const [category, setCategory] = useState('General Inquiry');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
    registrationCode: '', transactionId: '', paymentReference: '',
    browser: '', device: '', issueType: '',
    currentPsid: '', requestedPsid: '', requestedPsTitle: '', reason: ''
  });
  const [attachments, setAttachments] = useState([]);
  
  // Registration Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [verifyError, setVerifyError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Reset certain fields when category changes
  useEffect(() => {
    setTeamData(null);
    setVerifyError('');
    setSubmitError('');
    setAttachments([]);
    // Reset specific form fields but keep user info if typed
    setForm(prev => ({
      ...prev,
      registrationCode: '',
      transactionId: '',
      paymentReference: '',
      browser: '',
      device: '',
      issueType: '',
      currentPsid: '',
      requestedPsid: '',
      requestedPsTitle: '',
      reason: ''
    }));
  }, [category]);

  const handleVerify = async () => {
    if (!form.registrationCode) {
      setVerifyError('Please enter a Registration Code.');
      return;
    }
    setIsVerifying(true);
    setVerifyError('');
    try {
      const cleanCode = form.registrationCode.trim();
      const res = await axios.get(`/api/public/support/verify-registration/${cleanCode}`);
      if (res.data.success) {
        setTeamData(res.data.data);
        // Pre-fill some fields based on verified data
        setForm(prev => ({
          ...prev,
          name: prev.name || res.data.data.leaderName,
          email: prev.email || res.data.data.leaderEmail,
          phone: prev.phone || res.data.data.leaderPhone,
          currentPsid: res.data.data.psid
        }));
      }
    } catch (error) {
      setVerifyError(error.response?.data?.message || 'Verification failed. Invalid code.');
      setTeamData(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + attachments.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }
    setAttachments(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    // Validations
    const requiresVerification = ['Registration Support', 'Payment Related Query', 'Problem Statement Change Request', 'Certificate / Result Query'].includes(category);
    if (requiresVerification && !teamData) {
      setSubmitError('Please verify your Registration Code first.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('category', category);
    
    // Append form fields
    Object.keys(form).forEach(key => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    if (teamData) {
      formData.append('registrationIdObj', teamData._id);
      formData.append('teamName', teamData.teamName);
      formData.append('leaderName', teamData.leaderName);
      formData.append('leaderEmail', teamData.leaderEmail);
    }

    // Append files
    attachments.forEach(file => {
      formData.append('attachments', file);
    });

    try {
      const res = await axios.post('/api/public/support/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        setIsSent(true);
        setReferenceId(res.data.referenceId);
      }
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Failed to submit request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSent(false);
    setReferenceId('');
    setCategory('General Inquiry');
    setTeamData(null);
    setAttachments([]);
    setForm({
      name: '', email: '', phone: '', subject: '', message: '',
      registrationCode: '', transactionId: '', paymentReference: '',
      browser: '', device: '', issueType: '',
      currentPsid: '', requestedPsid: '', requestedPsTitle: '', reason: ''
    });
  };

  return (
    <section id="contact" className="relative bg-brand-darker pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white select-none overflow-hidden border-t border-white/5">
      {/* Background glow elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-3 mb-12 font-sans">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--clay)] uppercase font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Help &amp; Support Center
          </h2>
          <p className="text-[var(--ink-soft)] text-xs sm:text-sm font-medium max-w-xl mx-auto">
            Get instant resolution for registration, payment, technical, or problem statement inquiries.
          </p>
        </div>

        {/* ── Top 3 Contact Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Helpline Card */}
          <div className="group p-6 rounded-3xl bg-[#FFFDF7] border border-[#E3D7C5] hover:border-[#8C3A16] shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE8D6] text-[#8C3A16] mb-5 border border-[#E3D7C5] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <Phone size={24} className="text-[#8C3A16]" />
            </div>
            <h3 className="text-lg font-black text-[#5C230C] mb-3 font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>Helpline Number</h3>
            <div className="space-y-1 font-mono text-xs sm:text-sm text-[#6B5B49] font-bold">
              <p className="hover:text-[#8C3A16] transition-colors">+91 9827102062</p>
              <p className="hover:text-[#8C3A16] transition-colors">+91 9827666677</p>
              <p className="hover:text-[#8C3A16] transition-colors">+91 7879261234</p>
            </div>
          </div>

          {/* Address Card */}
          <a 
            href="https://www.google.com/maps/place/Sagar+Institute+of+Science,+Technology+%26+Research,+Ratibad/@23.1806836,77.2995781,18.42z/data=!4m6!3m5!1s0x397c5c3c7b0aa7e1:0xf4798e9656dfb029!8m2!3d23.1814693!4d77.3016453!16s%2Fm%2F0t_fqww?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-[#FFFDF7] border border-[#E3D7C5] hover:border-[#8C3A16] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFE8D6] text-[#8C3A16] mb-5 border border-[#E3D7C5] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <MapPin size={24} className="text-[#8C3A16]" />
            </div>
            <h3 className="text-lg font-black text-[#5C230C] mb-3 font-display group-hover:text-[#8C3A16] transition-colors" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>Address</h3>
            <p className="text-xs sm:text-sm text-[#6B5B49] leading-relaxed max-w-xs font-bold group-hover:text-[#241708] transition-colors">
              SISTec-R Sikandrabad, Ratibad, Bhopal, Madhya Pradesh 462044
            </p>
          </a>

          {/* Email Card */}
          <div className="group p-6 rounded-3xl bg-[#FFFDF7] border border-[#E3D7C5] hover:border-[#8C3A16] shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE8D6] text-[#8C3A16] mb-5 border border-[#E3D7C5] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
              <Mail size={24} className="text-[#8C3A16]" />
            </div>
            <h3 className="text-lg font-black text-[#5C230C] mb-3 font-display" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>Email</h3>
            <div className="space-y-1 text-xs sm:text-sm text-[#6B5B49] font-bold break-all">
              <p className="hover:text-[#8C3A16] transition-colors">support@sistec.ac.in</p>
              <p className="hover:text-[#8C3A16] transition-colors">sih4.0@sistec.ac.in</p>
            </div>
          </div>
        </div>

        {/* ── Form Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          {/* Contact Image Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md lg:max-w-full rounded-3xl overflow-hidden border border-[#E3D7C5] bg-[#FFFDF7] p-3 shadow-xl">
              <img 
                src={contactImg} 
                alt="Support &amp; Contact" 
                className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="w-full p-6 sm:p-10 rounded-3xl bg-[#FFFDF7] border border-[#E3D7C5] shadow-xl relative backdrop-blur-sm">

            {isSent ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-[#FFE8D6] border border-[#E3D7C5] flex items-center justify-center text-[#8C3A16] shadow-lg">
                  <CheckCircle2 size={40} className="text-[#8C3A16]" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="text-2xl font-black text-[#5C230C] font-display">Request Received!</h4>
                  <p className="text-[#6B5B49] font-sans font-medium">
                    Your request has been successfully submitted. We have sent a confirmation email to you.
                  </p>
                </div>
                
                <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-xl p-6 w-full max-w-md space-y-4">
                  <div>
                    <p className="text-xs text-[#8C3A16] uppercase tracking-widest font-black mb-1 font-sans">Reference ID</p>
                    <p className="font-mono text-lg text-[#8C3A16] font-bold">{referenceId}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#6B5B49] justify-center border-t border-[#E3D7C5] pt-4 font-sans font-bold">
                    <Clock size={16} className="text-[#8C3A16]" />
                    <span>Expected response time: 24–48 business hours</span>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="mt-4 px-6 py-2.5 bg-[#FAF6EE] hover:bg-[#8C3A16] hover:!text-white text-[#8C3A16] font-extrabold rounded-xl transition-all flex items-center gap-2 border border-[#E3D7C5] text-xs cursor-pointer shadow-2xs"
                >
                  <ArrowLeft size={16} /> Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {submitError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm flex items-start gap-3 font-bold">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{submitError}</p>
                  </div>
                )}
                {/* Category Selection */}
                <div className="space-y-2 font-sans">
                  <label className="text-xs font-black text-[#8C3A16] uppercase tracking-wider">Select Support Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:ring-2 focus:ring-[#8C3A16]/10 focus:outline-none text-[#241708] font-bold text-sm transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%238C3A16\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-[#FFFDF7] text-[#241708] font-bold">{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Verification Block for certain categories */}
                {['Registration Support', 'Payment Related Query', 'Problem Statement Change Request', 'Certificate / Result Query', 'Technical Issue'].includes(category) && (
                  <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-2xl p-5 sm:p-6 space-y-4 font-sans">
                    <label className="text-sm font-black text-[#8C3A16] flex items-center gap-2">
                      <Search size={16} /> Registration Code Verification 
                      {category === 'Technical Issue' && <span className="text-[#6B5B49] text-xs font-semibold">(Optional)</span>}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={form.registrationCode}
                        onChange={(e) => setForm({ ...form, registrationCode: e.target.value })}
                        placeholder="e.g. REG-123456"
                        className="flex-1 px-5 py-3 rounded-xl bg-[#FFFDF7] border border-[#E3D7C5] focus:border-[#8C3A16] focus:outline-none text-sm text-[#241708] font-bold font-mono placeholder-[#6B5B49] transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleVerify}
                        disabled={!form.registrationCode || isVerifying}
                        className="px-6 py-3 bg-[#8C3A16] hover:bg-[#6B3213] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer shadow-md border-none"
                      >
                        {isVerifying ? 'Verifying...' : 'Verify'}
                      </button>
                    </div>
                    {verifyError && <p className="text-red-600 text-xs mt-2 font-bold">{verifyError}</p>}
                    
                    {/* Fetched Data Display */}
                    {teamData && (
                      <div className="mt-4 bg-[#FFFDF7] border border-[#E3D7C5] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm animate-fade-in shadow-2xs">
                        <div>
                          <p className="text-[#6B5B49] text-xs font-bold mb-1">Team Name</p>
                          <p className="text-[#241708] font-black">{teamData.teamName}</p>
                        </div>
                        <div>
                          <p className="text-[#6B5B49] text-xs font-bold mb-1">Team Leader</p>
                          <p className="text-[#241708] font-black">{teamData.leaderName}</p>
                        </div>
                        <div>
                          <p className="text-[#6B5B49] text-xs font-bold mb-1">Institute</p>
                          <p className="text-[#241708] font-black">{teamData.instituteName}</p>
                        </div>
                        {category === 'Problem Statement Change Request' && (
                          <div>
                            <p className="text-[#6B5B49] text-xs font-bold mb-1">Current Problem Statement</p>
                            <p className="text-[#8C3A16] font-black line-clamp-1" title={teamData.psTitle}>{teamData.psid} - {teamData.psTitle}</p>
                          </div>
                        )}
                        {category === 'Payment Related Query' && (
                          <div>
                            <p className="text-[#6B5B49] text-xs font-bold mb-1">Payment Status</p>
                            <span className={`px-2 py-0.5 rounded text-xs font-black ${
                              teamData.paymentStatus === 'Completed' ? 'bg-green-100 text-green-700 border border-green-300' :
                              teamData.paymentStatus === 'Failed' ? 'bg-red-100 text-red-700 border border-red-300' :
                              'bg-amber-100 text-amber-700 border border-amber-300'
                            }`}>
                              {teamData.paymentStatus}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Basic Details (For all except Change Request) */}
                {category !== 'Problem Statement Change Request' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-[#8C3A16] ml-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Name"
                          readOnly={!!teamData}
                          className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all read-only:opacity-60"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-black text-[#8C3A16] ml-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Email"
                          readOnly={!!teamData}
                          className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all read-only:opacity-60"
                        />
                      </div>
                    </div>
                    
                    {['General Inquiry', 'Registration Support', 'Other'].includes(category) && (
                      <div className="space-y-1 font-sans">
                        <label className="text-xs font-black text-[#8C3A16] ml-1">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Phone Number"
                          readOnly={!!teamData}
                          className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all read-only:opacity-60"
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Subject & Message (For all except Change Request) */}
                {category !== 'Problem Statement Change Request' && (
                  <>
                    <div className="space-y-1 font-sans">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Subject *</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Brief subject of your query"
                        className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all"
                      />
                    </div>

                    <div className="space-y-1 font-sans">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Detailed Message *</label>
                      <textarea
                        rows="5"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your issue or query in detail..."
                        className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all resize-y custom-scrollbar"
                      ></textarea>
                    </div>
                  </>
                )}

                {/* Payment Fields */}
                {category === 'Payment Related Query' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Transaction ID (Optional)</label>
                      <input
                        type="text"
                        value={form.transactionId}
                        onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                        placeholder="e.g. TXN987654321"
                        className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold font-mono placeholder-[#6B5B49] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Payment Reference (Optional)</label>
                      <input
                        type="text"
                        value={form.paymentReference}
                        onChange={(e) => setForm({ ...form, paymentReference: e.target.value })}
                        placeholder="Bank Reference No."
                        className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold font-mono placeholder-[#6B5B49] transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Technical Issue Fields */}
                {category === 'Technical Issue' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Browser *</label>
                      <select
                        required
                        value={form.browser}
                        onChange={(e) => setForm({ ...form, browser: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold transition-all appearance-none"
                      >
                        <option value="" className="bg-[#FFFDF7] text-[#241708]">Select Browser</option>
                        <option value="Chrome" className="bg-[#FFFDF7] text-[#241708]">Google Chrome</option>
                        <option value="Firefox" className="bg-[#FFFDF7] text-[#241708]">Mozilla Firefox</option>
                        <option value="Safari" className="bg-[#FFFDF7] text-[#241708]">Safari</option>
                        <option value="Edge" className="bg-[#FFFDF7] text-[#241708]">Microsoft Edge</option>
                        <option value="Other" className="bg-[#FFFDF7] text-[#241708]">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Device *</label>
                      <select
                        required
                        value={form.device}
                        onChange={(e) => setForm({ ...form, device: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-[#FAF6EE] border border-[#E3D7C5] focus:border-[#8C3A16] focus:bg-[#FFFDF7] focus:outline-none text-sm text-[#241708] font-bold transition-all appearance-none"
                      >
                        <option value="" className="bg-[#FFFDF7] text-[#241708]">Select Device</option>
                        <option value="Desktop" className="bg-[#FFFDF7] text-[#241708]">Desktop / Laptop</option>
                        <option value="Mobile" className="bg-[#FFFDF7] text-[#241708]">Mobile (Android/iOS)</option>
                        <option value="Tablet" className="bg-[#FFFDF7] text-[#241708]">Tablet</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Change Request Fields */}
                {category === 'Problem Statement Change Request' && (
                  <div className="bg-[#FAF6EE] border border-[#E3D7C5] rounded-2xl p-5 space-y-5 font-sans">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Requested Problem Statement ID *</label>
                      <input
                        type="text"
                        required
                        value={form.requestedPsid}
                        onChange={(e) => setForm({ ...form, requestedPsid: e.target.value.toUpperCase() })}
                        placeholder="e.g. SIH123"
                        className="w-full px-5 py-3 rounded-xl bg-[#FFFDF7] border border-[#E3D7C5] focus:border-[#8C3A16] focus:outline-none text-sm text-[#241708] font-bold font-mono placeholder-[#6B5B49] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Requested Problem Statement Title *</label>
                      <input
                        type="text"
                        required
                        value={form.requestedPsTitle}
                        onChange={(e) => setForm({ ...form, requestedPsTitle: e.target.value })}
                        placeholder="Title of the new PS"
                        className="w-full px-5 py-3 rounded-xl bg-[#FFFDF7] border border-[#E3D7C5] focus:border-[#8C3A16] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-[#8C3A16] ml-1">Detailed Reason for Change *</label>
                      <textarea
                        required
                        rows="4"
                        value={form.reason}
                        onChange={(e) => setForm({ ...form, reason: e.target.value })}
                        placeholder="Explain why your team needs to change the problem statement..."
                        className="w-full px-5 py-3 rounded-xl bg-[#FFFDF7] border border-[#E3D7C5] focus:border-[#8C3A16] focus:outline-none text-sm text-[#241708] font-bold placeholder-[#6B5B49] transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* File Attachments (Optional) */}
                {['Technical Issue', 'Problem Statement Change Request', 'Other'].includes(category) && (
                  <div className="space-y-2 font-sans">
                    <label className="text-xs font-black text-[#8C3A16] ml-1 flex items-center gap-2">
                      <UploadCloud size={14} /> Attachments (Optional, max 3 files)
                    </label>
                    <div className="border border-dashed border-[#E3D7C5] rounded-xl p-4 bg-[#FAF6EE] hover:border-[#8C3A16] transition-colors relative">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={attachments.length >= 3}
                      />
                      <div className="text-center pointer-events-none">
                        <p className="text-xs text-[#6B5B49] font-bold">Click or drag files here to upload (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                    {/* File List */}
                    {attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-[#FFFDF7] border border-[#E3D7C5] rounded-md px-3 py-1.5 text-xs text-[#241708] font-bold shadow-2xs">
                            <FileText size={14} className="text-[#8C3A16]" />
                            <span className="max-w-[150px] truncate">{file.name}</span>
                            <button type="button" onClick={() => removeFile(idx)} className="text-red-600 hover:text-red-800 ml-1 cursor-pointer">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C3A16] via-[#A64B1E] to-[#C97F1B] hover:from-[#6B3213] hover:to-[#A64B1E] text-sm font-black text-white uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95 transition-all border-none disabled:opacity-50 disabled:cursor-not-allowed mt-6 font-sans"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Support Request</span>
                      <Send size={18} />
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
