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
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-brand-gray to-brand-gold bg-clip-text text-transparent uppercase font-display">
            Help & Support Center
          </h2>
          <p className="text-brand-gold text-xs sm:text-sm font-semibold tracking-widest uppercase font-mono">
            How Can We Help You Today?
          </p>
        </div>

        {/* ── Top 3 Contact Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
              <p className="hover:text-brand-gold transition-colors">support@sistec.ac.in</p>
              <p className="hover:text-brand-gold transition-colors">sih4.0@sistec.ac.in</p>
            </div>
          </div>
        </div>

        {/* ── Form Section ── */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-10 rounded-3xl bg-brand-card/50 border border-white/5 shadow-2xl relative backdrop-blur-sm">
            
            {isSent ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-lg shadow-brand-gold/5">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="text-2xl font-bold text-white">Request Received!</h4>
                  <p className="text-brand-gray/80">
                    Your request has been successfully submitted. We have sent a confirmation email to you.
                  </p>
                </div>
                
                <div className="bg-[#080809]/80 border border-brand-purple/20 rounded-xl p-6 w-full max-w-md space-y-4">
                  <div>
                    <p className="text-xs text-brand-gray uppercase tracking-widest font-semibold mb-1">Reference ID</p>
                    <p className="font-mono text-lg text-brand-gold">{referenceId}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-brand-gray/80 justify-center border-t border-white/5 pt-4">
                    <Clock size={16} className="text-brand-teal" />
                    <span>Expected response time: 24–48 business hours</span>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="mt-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors flex items-center gap-2 border border-white/10"
                >
                  <ArrowLeft size={16} /> Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {submitError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{submitError}</p>
                  </div>
                )}

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-gray uppercase tracking-wider">Select Support Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#080809]/80 border border-brand-purple/20 focus:border-brand-gold/50 focus:outline-none text-white transition-all focus:ring-1 focus:ring-brand-gold/30 shadow-inner appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23D8AB55\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Verification Block for certain categories */}
                {['Registration Support', 'Payment Related Query', 'Problem Statement Change Request', 'Certificate / Result Query', 'Technical Issue'].includes(category) && (
                  <div className="bg-[#080809]/40 border border-brand-purple/10 rounded-2xl p-5 sm:p-6 space-y-4">
                    <label className="text-sm font-semibold text-brand-gold flex items-center gap-2">
                      <Search size={16} /> Registration Code Verification 
                      {category === 'Technical Issue' && <span className="text-brand-gray text-xs font-normal">(Optional)</span>}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={form.registrationCode}
                        onChange={(e) => setForm({ ...form, registrationCode: e.target.value })}
                        placeholder="e.g. REG-123456"
                        className="flex-1 px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleVerify}
                        disabled={!form.registrationCode || isVerifying}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {isVerifying ? 'Verifying...' : 'Verify'}
                      </button>
                    </div>
                    {verifyError && <p className="text-red-400 text-xs mt-2">{verifyError}</p>}
                    
                    {/* Fetched Data Display */}
                    {teamData && (
                      <div className="mt-4 bg-brand-teal/5 border border-brand-teal/20 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm animate-fade-in">
                        <div>
                          <p className="text-brand-gray text-xs mb-1">Team Name</p>
                          <p className="text-brand-text font-medium">{teamData.teamName}</p>
                        </div>
                        <div>
                          <p className="text-brand-gray text-xs mb-1">Team Leader</p>
                          <p className="text-brand-text font-medium">{teamData.leaderName}</p>
                        </div>
                        <div>
                          <p className="text-brand-gray text-xs mb-1">Institute</p>
                          <p className="text-brand-text font-medium">{teamData.instituteName}</p>
                        </div>
                        {category === 'Problem Statement Change Request' && (
                          <div>
                            <p className="text-brand-gray text-xs mb-1">Current Problem Statement</p>
                            <p className="text-brand-text font-medium line-clamp-1" title={teamData.psTitle}>{teamData.psid} - {teamData.psTitle}</p>
                          </div>
                        )}
                        {category === 'Payment Related Query' && (
                          <div>
                            <p className="text-brand-gray text-xs mb-1">Payment Status</p>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              teamData.paymentStatus === 'Completed' ? 'bg-green-500/20 text-green-400' :
                              teamData.paymentStatus === 'Failed' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {teamData.paymentStatus}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Dynamic Fields --- */}

                {/* Basic Details (For all except Change Request) */}
                {category !== 'Problem Statement Change Request' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-gray ml-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Name"
                          readOnly={!!teamData}
                          className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all read-only:opacity-60"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-gray ml-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Email"
                          readOnly={!!teamData}
                          className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all read-only:opacity-60"
                        />
                      </div>
                    </div>
                    
                    {['General Inquiry', 'Registration Support', 'Other'].includes(category) && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-brand-gray ml-1">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Phone Number"
                          readOnly={!!teamData}
                          className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all read-only:opacity-60"
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Payment Fields */}
                {category === 'Payment Related Query' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gray ml-1">Transaction ID (Optional)</label>
                      <input
                        type="text"
                        value={form.transactionId}
                        onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                        placeholder="e.g. TXN987654321"
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gray ml-1">Payment Reference (Optional)</label>
                      <input
                        type="text"
                        value={form.paymentReference}
                        onChange={(e) => setForm({ ...form, paymentReference: e.target.value })}
                        placeholder="Bank Reference No."
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white transition-all font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Technical Issue Fields */}
                {category === 'Technical Issue' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gray ml-1">Browser *</label>
                      <select
                        required
                        value={form.browser}
                        onChange={(e) => setForm({ ...form, browser: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white transition-all appearance-none"
                      >
                        <option value="">Select Browser</option>
                        <option value="Chrome">Google Chrome</option>
                        <option value="Firefox">Mozilla Firefox</option>
                        <option value="Safari">Safari</option>
                        <option value="Edge">Microsoft Edge</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gray ml-1">Device *</label>
                      <select
                        required
                        value={form.device}
                        onChange={(e) => setForm({ ...form, device: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white transition-all appearance-none"
                      >
                        <option value="">Select Device</option>
                        <option value="Desktop">Desktop / Laptop</option>
                        <option value="Mobile">Mobile (Android/iOS)</option>
                        <option value="Tablet">Tablet</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Change Request Fields */}
                {category === 'Problem Statement Change Request' && (
                  <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-5 space-y-5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gold ml-1">Requested Problem Statement ID *</label>
                      <input
                        type="text"
                        required
                        value={form.requestedPsid}
                        onChange={(e) => setForm({ ...form, requestedPsid: e.target.value.toUpperCase() })}
                        placeholder="e.g. SIH123"
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm text-white transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gold ml-1">Requested Problem Statement Title *</label>
                      <input
                        type="text"
                        required
                        value={form.requestedPsTitle}
                        onChange={(e) => setForm({ ...form, requestedPsTitle: e.target.value })}
                        placeholder="Title of the new PS"
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm text-white transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gold ml-1">Detailed Reason for Change *</label>
                      <textarea
                        required
                        rows="4"
                        value={form.reason}
                        onChange={(e) => setForm({ ...form, reason: e.target.value })}
                        placeholder="Explain why your team needs to change the problem statement..."
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm text-white transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Subject & Message (For all except Change Request) */}
                {category !== 'Problem Statement Change Request' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gray ml-1">Subject *</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Brief subject of your query"
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-brand-gray ml-1">Detailed Message *</label>
                      <textarea
                        rows="5"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your issue or query in detail..."
                        className="w-full px-5 py-3 rounded-xl bg-[#080809]/80 border border-white/10 focus:border-brand-gold/50 focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all shadow-inner resize-y custom-scrollbar"
                      ></textarea>
                    </div>
                  </>
                )}

                {/* File Attachments (Optional for Tech Issue & Change Request, maybe others) */}
                {['Technical Issue', 'Problem Statement Change Request', 'Other'].includes(category) && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-brand-gray ml-1 flex items-center gap-2">
                      <UploadCloud size={14} /> Attachments (Optional, max 3 files)
                    </label>
                    <div className="border border-dashed border-brand-purple/30 rounded-xl p-4 bg-[#080809]/40 hover:bg-[#080809]/60 transition-colors relative">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={attachments.length >= 3}
                      />
                      <div className="text-center pointer-events-none">
                        <p className="text-sm text-brand-gray/80">Click or drag files here to upload (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                    {/* File List */}
                    {attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-brand-dark border border-brand-purple/20 rounded-md px-3 py-1.5 text-xs text-brand-text">
                            <FileText size={14} className="text-brand-teal" />
                            <span className="max-w-[150px] truncate">{file.name}</span>
                            <button type="button" onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-300 ml-1">
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
                  className="w-full py-4 rounded-xl bg-btn-gradient text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all border-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
