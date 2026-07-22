import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Upload, ArrowLeft, ArrowRight, Check, Eye, CreditCard, RotateCcw, ChevronDown, User, Users, FileText, Target, Award, FileCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ---------------------------------------------------------------------------
// CustomSelect — native <select> replacement with controllable max-height
// ---------------------------------------------------------------------------
function CustomSelect({ value, onChange, options, placeholder, hasError, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className={`register-input w-full pl-3 pr-9 py-2.5 rounded-2xl bg-[var(--input-bg)] border text-left text-xs font-semibold cursor-pointer shadow-sm flex items-center justify-between
          ${hasError ? 'border-[var(--danger)] bg-[var(--input-err-bg)]' : 'border-[var(--line)]'}
          ${open ? 'border-[var(--orange)]' : ''}`}
        style={{ color: selected ? 'var(--ink)' : 'var(--input-placeholder)' }}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={14}
          className="shrink-0 ml-2 transition-transform duration-200"
          style={{ color: 'var(--orange)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div
          className="absolute z-50 w-full mt-1 rounded-xl border border-[var(--line)] bg-white shadow-lg overflow-hidden"
          style={{ maxHeight: '220px', overflowY: 'auto' }}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[var(--input-bg)] transition-colors"
              style={{ color: opt.value === value ? 'var(--orange)' : 'var(--ink)', fontWeight: opt.value === value ? '700' : '500' }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// RegistrationSession — localStorage auto-save & recovery utility
// ---------------------------------------------------------------------------
const STORAGE_KEY = 'sih4_registration_draft';
const SESSION_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

const RegistrationSession = {
  /** Serialize step + formData to localStorage.
   *  File objects are stored as lightweight metadata so filenames survive refresh. */
  save(step, formData) {
    try {
      const serializable = {};
      for (const [key, val] of Object.entries(formData)) {
        if (val instanceof File) {
          // Store only metadata — File objects are not serializable
          serializable[key] = {
            __fileMeta: true,
            name: val.name,
            size: val.size,
            type: val.type,
            lastModified: val.lastModified,
          };
        } else {
          serializable[key] = val;
        }
      }
      const payload = JSON.stringify({ timestamp: Date.now(), step, formData: serializable });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (e) {
      // Quota exceeded or private mode — fail silently
      console.warn('[RegistrationSession] Could not save draft:', e);
    }
  },

  /** Load a saved session. Returns null if missing, corrupt, or expired. */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.timestamp || !parsed.formData) return null;
      if (Date.now() - parsed.timestamp > SESSION_TTL_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  },

  /** Remove the saved draft from localStorage. Call on success or explicit cancel. */
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

// Default blank form data (used as fallback for lazy initializers)
const defaultFormData = {
  teamName: '',
  leaderName: '',
  leaderEmail: '',
  leaderPhone: '',
  leaderGender: '',
  theme: '',
  instituteName: '',
  isIeeeCsiMember: '',
  transactionId: '',
  member1Name: '', member1Gender: '', member1Email: '', member1Phone: '',
  member2Name: '', member2Gender: '', member2Email: '', member2Phone: '',
  member3Name: '', member3Gender: '', member3Email: '', member3Phone: '',
  member4Name: '', member4Gender: '', member4Email: '', member4Phone: '',
  psid: '',
  psTitle: '',
  ideaPpt: null,
  consentLetter: null,
  paymentScreenshot: null,
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function RegisterModal({ onClose }) {
  const backendUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : '');

  // Fetch Problem Statements from Backend
  const { data: problemStatements = [], isLoading: isLoadingPS } = useQuery({
    queryKey: ['publicProblemStatements'],
    queryFn: async () => {
      const response = await axios.get(`${backendUrl}/api/public/problem-statements`);
      return response.data.data;
    }
  });

  const uniqueDomains = [...new Set(problemStatements.map(item => item.domain))];

  // Lazy initializers — restore from saved session if available
  const [step, setStep] = useState(() => RegistrationSession.load()?.step ?? 1);
  const [formData, setFormData] = useState(() => {
    const saved = RegistrationSession.load();
    if (!saved) return defaultFormData;
    const hydrated = { ...defaultFormData };
    for (const [key, val] of Object.entries(saved.formData)) {
      hydrated[key] = (val && val.__fileMeta) ? null : val;
    }
    return hydrated;
  });

  const [recoveredSession, setRecoveredSession] = useState(() => {
    const saved = RegistrationSession.load();
    if (!saved) return false;
    return saved.timestamp ? true : false;
  });
  const [recoveredFiles, setRecoveredFiles] = useState(() => {
    const saved = RegistrationSession.load();
    if (!saved) return [];
    const files = [];
    if (saved.formData?.ideaPpt?.__fileMeta) files.push({ field: 'ideaPpt', name: saved.formData.ideaPpt.name });
    if (saved.formData?.consentLetter?.__fileMeta) files.push({ field: 'consentLetter', name: saved.formData.consentLetter.name });
    if (saved.formData?.paymentScreenshot?.__fileMeta) files.push({ field: 'paymentScreenshot', name: saved.formData.paymentScreenshot.name });
    return files;
  });
  const [fileMetaHints, setFileMetaHints] = useState(() => {
    const saved = RegistrationSession.load();
    if (!saved) return {};
    const hints = {};
    if (saved.formData?.ideaPpt?.__fileMeta) hints.ideaPpt = saved.formData.ideaPpt.name;
    if (saved.formData?.consentLetter?.__fileMeta) hints.consentLetter = saved.formData.consentLetter.name;
    if (saved.formData?.paymentScreenshot?.__fileMeta) hints.paymentScreenshot = saved.formData.paymentScreenshot.name;
    return hints;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);

  const autoSaveTimerRef = useRef(null);

  useEffect(() => {
    if (registrationResult) return;
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      RegistrationSession.save(step, formData);
    }, 400);
    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [step, formData, registrationResult]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeBytes = 20 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: `File is too large. Maximum limit is 20MB (Your file: ${(file.size / (1024 * 1024)).toFixed(1)}MB).`
        }));
        e.target.value = '';
        setFormData((prev) => ({
          ...prev,
          [fieldName]: null,
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
      setFileMetaHints((prev) => { const next = { ...prev }; delete next[fieldName]; return next; });
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: null }));
      }
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.leaderName.trim()) newErrors.leaderName = 'Leader name is required';
      if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
      if (!formData.theme) newErrors.theme = 'Theme selection is required';
      if (!formData.leaderGender) newErrors.leaderGender = 'Leader gender selection is required';
      if (!formData.leaderPhone.trim()) {
        newErrors.leaderPhone = 'Leader phone number is required';
      } else if (!/^\d{10}$/.test(formData.leaderPhone.replace(/[^0-9]/g, ''))) {
        newErrors.leaderPhone = 'Enter a valid 10-digit phone number';
      }
      if (!formData.leaderEmail.trim()) {
        newErrors.leaderEmail = 'Leader email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.leaderEmail)) {
        newErrors.leaderEmail = 'Invalid email address';
      }
      if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
      if (!formData.isIeeeCsiMember) newErrors.isIeeeCsiMember = 'Membership status is required';
    }

    if (currentStep === 2) {
      const validateMember = (index) => {
        const name = formData[`member${index}Name`]?.trim();
        const email = formData[`member${index}Email`]?.trim();
        const phone = formData[`member${index}Phone`]?.trim();
        const gender = formData[`member${index}Gender`];

        if (name || email || phone || gender) {
          if (!name) newErrors[`member${index}Name`] = 'Name is required';
          if (!gender) newErrors[`member${index}Gender`] = 'Gender is required';
          if (!email) {
            newErrors[`member${index}Email`] = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors[`member${index}Email`] = 'Invalid email';
          }
          if (!phone) {
            newErrors[`member${index}Phone`] = 'Phone is required';
          } else if (!/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
            newErrors[`member${index}Phone`] = 'Invalid phone';
          }
        }
      };

      validateMember(1);
      validateMember(2);
      validateMember(3);
      validateMember(4);
    }

    if (currentStep === 3) {
      if (!formData.psid.trim()) newErrors.psid = 'Problem Statement ID (PSID) is required';
      if (!formData.psTitle.trim()) newErrors.psTitle = 'Problem Statement Title is required';
      if (!formData.ideaPpt) newErrors.ideaPpt = 'Idea PPT is required';
      if (!formData.consentLetter) newErrors.consentLetter = 'Consent Letter is required';
    }

    if (currentStep === 5) {
      if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
      if (!formData.paymentScreenshot) newErrors.paymentScreenshot = 'Payment screenshot is required';
    }

    setErrors(newErrors);

    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      setTimeout(() => {
        const firstErrorField = errorKeys[0];
        let el = document.querySelector(`[name="${firstErrorField}"]`);

        // For file inputs that are hidden, find their label or container
        if (!el && (firstErrorField === 'ideaPpt' || firstErrorField === 'consentLetter' || firstErrorField === 'paymentScreenshot')) {
          const fileInput = document.getElementById(`${firstErrorField}-file`);
          if (fileInput && fileInput.labels && fileInput.labels.length > 0) {
            el = fileInput.labels[0];
          }
        }

        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof el.focus === 'function') el.focus();
        }
      }, 100);
    }

    return errorKeys.length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const previewLocalFile = (file) => {
    if (!file) return;
    try {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error('Failed to create file preview:', err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(1)) {
      setStep(1);
      setErrors((prev) => ({ ...prev, submit: 'Please fix the errors in Step 1.' }));
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      setErrors((prev) => ({ ...prev, submit: 'Please fix the errors in Step 2.' }));
      return;
    }
    if (!validateStep(3)) {
      setStep(3);
      setErrors((prev) => ({ ...prev, submit: 'Please fix the errors in Step 3.' }));
      return;
    }
    if (!validateStep(5)) {
      setErrors((prev) => ({ ...prev, submit: 'Please provide transaction ID and payment screenshot.' }));
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('teamName', formData.teamName);
      submitData.append('leaderName', formData.leaderName);
      submitData.append('leaderEmail', formData.leaderEmail);
      submitData.append('leaderPhone', formData.leaderPhone);
      submitData.append('leaderGender', formData.leaderGender);
      submitData.append('theme', formData.theme);
      submitData.append('instituteName', formData.instituteName);

      const members = [];
      for (let i = 1; i <= 4; i++) {
        const name = formData[`member${i}Name`]?.trim();
        if (name) {
          members.push({
            name,
            gender: formData[`member${i}Gender`],
            email: formData[`member${i}Email`],
            phone: formData[`member${i}Phone`],
          });
        }
      }
      submitData.append('members', JSON.stringify(members));

      submitData.append('psid', formData.psid);
      submitData.append('psTitle', formData.psTitle);
      submitData.append('ideaPpt', formData.ideaPpt);
      submitData.append('consentLetter', formData.consentLetter);

      submitData.append('isIeeeCsiMember', formData.isIeeeCsiMember);
      submitData.append('transactionId', formData.transactionId);
      submitData.append('paymentScreenshot', formData.paymentScreenshot);

      const response = await fetch(`${backendUrl}/api/register`, {
        method: 'POST',
        body: submitData,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        data = { error: `Server error (${response.status}).` };
      }

      if (!response.ok) {
        setErrors({ submit: data.error || 'Failed to initialize order. Please try again.' });
        setIsSubmitting(false);
        return;
      }

      if (data.alreadyRegistered) {
        RegistrationSession.clear();
        setRegistrationResult({
          success: true,
          alreadyRegistered: true,
          registrationId: data.registrationId,
          teamName: data.teamName,
          message: 'Your payment was previously completed.'
        });
        setIsSubmitting(false);
        return;
      }

      RegistrationSession.clear();
      setRegistrationResult({
        success: true,
        registrationId: data.registrationId || (data.data && data.data.registrationId) || 'REG-PENDING',
        teamName: formData.teamName,
        message: 'Registration submitted successfully. Pending payment verification.'
      });

    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Network error occurred. Please check your internet connection or server status.' });
      setIsSubmitting(false);
    }
  };

  const stepLabels = [
    { num: 1, title: 'Team & Leader details', desc: 'Who\'s leading this team?' },
    { num: 2, title: 'Team Members', desc: 'Add up to 6 members' },
    { num: 3, title: 'Track', desc: 'Pick a problem domain' },
    { num: 4, title: 'Review & Submit', desc: 'Confirm and lock it in' },
    { num: 5, title: 'Payment', desc: 'Complete your registration' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-[var(--cream)] z-[100] overflow-y-auto flex flex-col font-sans">


      <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-[1050px] mx-auto z-10 text-left flex flex-col md:flex-row gap-6 md:gap-8 items-stretch" style={{ height: '85vh' }}>

          {/* LEFT PANE (SIDEBAR) */}
          <div className="hidden md:flex flex-col w-[320px] lg:w-[350px] bg-gradient-to-b from-[var(--panel-start)] to-[var(--panel-end)] text-[#FFFDF7] p-8 rounded-3xl shadow-[var(--shadow)] shrink-0 relative">
            <div className="text-[10px] font-black text-[var(--gold)] tracking-widest uppercase mb-2">DEPARTMENT OF CSE | AI & ML | IOT</div>
            <h2 className="text-[28px] lg:text-[32px] font-black leading-[1.1] mb-2 tracking-tight" style={{ color: '#F6EEE1' }}>SISTec Innovation<br />Hackathon <span style={{ color: 'var(--gold)' }}>4.0</span></h2>
            <p className="text-xs text-[var(--panel-sub)] mb-10 font-medium">Team registration — takes about 3 minutes.</p>

            {/* Stats Boxes */}
            <div className="flex gap-2.5 mb-10 shrink-0">
              <div className="flex-1 border border-white/5 rounded-2xl py-3 px-2 flex flex-col items-center justify-center text-center bg-white/5">
                <span className="text-sm font-black text-[var(--gold)] mb-0.5">2-6</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--panel-fact-label)]">TEAM SIZE</span>
              </div>
              <div className="flex-1 border border-white/5 rounded-2xl py-3 px-2 flex flex-col items-center justify-center text-center bg-white/5">
                <span className="text-sm font-black text-[var(--gold)] mb-0.5">₹1L</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--panel-fact-label)]">PRIZE POOL</span>
              </div>
              <div className="flex-1 border border-white/5 rounded-2xl py-3 px-2 flex flex-col items-center justify-center text-center bg-white/5">
                <span className="text-sm font-black text-[var(--gold)] mb-0.5">Free</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--panel-fact-label)]">ENTRY</span>
              </div>
            </div>

            {/* Vertical Stepper */}
            <div className="flex flex-col justify-between relative flex-grow">
              {/* Connecting line — rendered behind all dots */}
              <div className="absolute top-4 bottom-4 left-[17px] w-[2px] z-0"
                style={{ background: 'linear-gradient(to bottom, rgba(240,169,60,0.5), rgba(240,169,60,0.05))' }}
              />
              {stepLabels.map((lbl) => {
                const isDone = step > lbl.num;
                const isCurrent = step === lbl.num;
                const isFuture = step < lbl.num;
                return (
                  <div key={lbl.num} className="flex items-center gap-4 relative z-10">
                    {/* Step dot */}
                    <div
                      className={`shrink-0 rounded-full flex items-center justify-center font-black transition-all duration-300
                        ${isCurrent
                          ? 'w-9 h-9 text-[13px] text-[#3D2210]'
                          : isDone
                            ? 'w-8 h-8 text-xs text-[#3D2210]'
                            : 'w-8 h-8 text-xs'
                        }`}
                      style={
                        isCurrent
                          ? {
                            background: 'linear-gradient(135deg, #F5C05A, #E89820)',
                            boxShadow: '0 0 0 4px rgba(240,169,60,0.25), 0 0 16px rgba(240,169,60,0.35)',
                          }
                          : isDone
                            ? {
                              background: 'linear-gradient(135deg, #D4A83A, #B8841C)',
                              boxShadow: '0 2px 8px rgba(180,130,30,0.3)',
                            }
                            : {
                              background: 'rgba(255,255,255,0.04)',
                              border: '1.5px solid rgba(240,169,60,0.15)',
                              color: 'rgba(239,226,208,0.4)',
                            }
                      }
                    >
                      {isDone ? <Check size={13} strokeWidth={3.5} /> : lbl.num}
                    </div>

                    {/* Labels */}
                    <div className="flex flex-col leading-tight">
                      <span
                        className="font-black tracking-tight transition-all duration-200"
                        style={{
                          fontSize: isCurrent ? '14px' : '13px',
                          color: isCurrent
                            ? '#F6EEE1'
                            : isDone
                              ? 'rgba(246,238,225,0.75)'
                              : 'rgba(246,238,225,0.35)',
                        }}
                      >
                        {lbl.title}
                      </span>
                      <span
                        className="text-[11px] transition-all duration-200 mt-0.5"
                        style={{
                          color: isCurrent
                            ? '#C9B49C'
                            : isDone
                              ? 'rgba(180,154,128,0.6)'
                              : 'rgba(180,154,128,0.3)',
                        }}
                      >
                        {lbl.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANE (FORM CONTENT) */}
          <div className="flex flex-col flex-grow w-full relative bg-white rounded-3xl shadow-[var(--shadow)] border border-[var(--line)] overflow-hidden h-full">
            <button
              onClick={() => onClose()}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--input-bg)] border border-[#E3D7C5] text-[#8C3A16] hover:bg-[#F3EAD9] transition-all cursor-pointer shadow-sm z-20"
            >
              <X size={16} />
            </button>

            {!registrationResult ? (
              <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-hidden">
                {/* MOBILE HEADER STEPPER (visible only on mobile < 768px) */}
                <div className="block md:hidden mb-4 pb-3 border-b border-[var(--line)]/60 text-left shrink-0 pr-10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[9px] font-black text-[var(--orange-deep)] uppercase tracking-widest block">SISTec Innovation Hackathon 4.0</span>
                      <h3 className="text-base font-black text-[var(--ink)] tracking-tight">{stepLabels[step - 1].title}</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-[#EBE1D3] text-[#C66522] text-[10px] font-extrabold shrink-0">
                      Step {step} of 5
                    </span>
                  </div>

                  {/* Horizontal Mini Progress Segments */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {stepLabels.map((lbl) => {
                      const isDone = step > lbl.num;
                      const isCurrent = step === lbl.num;
                      return (
                        <div
                          key={lbl.num}
                          className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                            isDone
                              ? 'bg-gradient-to-r from-[var(--orange)] to-[var(--orange-deep)]'
                              : isCurrent
                                ? 'bg-[var(--orange)] shadow-[0_0_8px_rgba(217,123,51,0.6)]'
                                : 'bg-[#EBE1D3]'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Form Header (Desktop) */}
                <div className="hidden md:flex justify-between items-start mb-6 shrink-0 border-b border-[var(--line)]/60 pb-5 pr-12">
                  <div className="flex flex-col gap-1 text-left">
                    <h3 className="text-2xl font-black text-[var(--ink)] tracking-tight">{stepLabels[step - 1].title} details</h3>
                    <p className="text-[13px] text-[var(--ink-soft)]">{stepLabels[step - 1].desc}</p>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-[#FAF6EE] border border-[var(--line)] text-[#C66522] text-[11px] font-bold whitespace-nowrap">
                    Step {step} of 5
                  </div>
                </div>

                {recoveredSession && (
                  <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 animate-fade-in font-sans shrink-0">
                    <div className="text-amber-700 shrink-0">
                      <RotateCcw size={14} />
                    </div>
                    <div className="flex-grow text-left">
                      <p className="text-xs font-bold text-amber-900">Progress Restored from auto-saved draft</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRecoveredSession(false);
                      }}
                      className="shrink-0 text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
                      aria-label="Dismiss"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Main Form Body */}
                <div className="flex-1 min-h-0 overflow-hidden px-1 py-1 flex flex-col">
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 flex flex-col">
                    <div className="my-auto py-4 w-full">

                      {errors.submit && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-sans">
                          <AlertCircle size={16} className="shrink-0" />
                          <span>{errors.submit}</span>
                        </div>
                      )}

                      {/* Step 1: Team Leader & Institute Info */}
                      {step === 1 && (
                        <div className="animate-fade-in space-y-3.5 text-left font-sans">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            <div className="md:col-span-2">
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                Team name <span className="text-[var(--danger)]">*</span>
                              </label>
                              <input
                                type="text"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleInputChange}
                                placeholder="e.g. Team Nexus"
                                className={`register-input w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.teamName ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] placeholder-[var(--input-placeholder)] shadow-sm`}
                              />
                              {errors.teamName && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.teamName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                Team leader full name <span className="text-[var(--danger)]">*</span>
                              </label>
                              <input
                                type="text"
                                name="leaderName"
                                value={formData.leaderName}
                                onChange={handleInputChange}
                                placeholder="Full name"
                                className={`register-input w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.leaderName ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] placeholder-[var(--input-placeholder)] shadow-sm`}
                              />
                              {errors.leaderName && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.leaderName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                College / Institution <span className="text-[var(--danger)]">*</span>
                              </label>
                              <input
                                type="text"
                                name="instituteName"
                                value={formData.instituteName}
                                onChange={handleInputChange}
                                placeholder="College name"
                                className={`register-input w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.instituteName ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] placeholder-[var(--input-placeholder)] shadow-sm`}
                              />
                              {errors.instituteName && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.instituteName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                Email address <span className="text-[var(--danger)]">*</span>
                              </label>
                              <input
                                type="email"
                                name="leaderEmail"
                                value={formData.leaderEmail}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className={`register-input w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.leaderEmail ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] placeholder-[var(--input-placeholder)] shadow-sm`}
                              />
                              {errors.leaderEmail && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.leaderEmail}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                Phone number <span className="text-[var(--danger)]">*</span>
                              </label>
                              <input
                                type="text"
                                name="leaderPhone"
                                value={formData.leaderPhone}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile number"
                                className={`register-input w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.leaderPhone ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] placeholder-[var(--input-placeholder)] shadow-sm`}
                              />
                              {errors.leaderPhone && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.leaderPhone}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                Choose Theme <span className="text-[var(--danger)]">*</span>
                              </label>
                              <select
                                name="theme"
                                value={formData.theme}
                                onChange={handleInputChange}
                                className={`register-select w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.theme ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] cursor-pointer appearance-none shadow-sm`}
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 0.85rem center',
                                  backgroundSize: '1em'
                                }}
                              >
                                {isLoadingPS ? (
                                  <option value="" disabled className="text-[var(--input-placeholder)]">Loading Themes...</option>
                                ) : (
                                  <option value="" disabled className="text-[var(--input-placeholder)]">Select Category Theme</option>
                                )}
                                {!isLoadingPS && uniqueDomains.map((domain) => (
                                  <option key={domain} value={domain} className="text-[var(--ink)] py-1">
                                    {domain}
                                  </option>
                                ))}
                              </select>
                              {errors.theme && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.theme}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                Leader Gender <span className="text-[var(--danger)]">*</span>
                              </label>
                              <select
                                name="leaderGender"
                                value={formData.leaderGender}
                                onChange={handleInputChange}
                                className={`register-select w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.leaderGender ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] cursor-pointer appearance-none shadow-sm`}
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 0.85rem center',
                                  backgroundSize: '1em'
                                }}
                              >
                                <option value="" disabled className="text-[var(--input-placeholder)]">Select Gender</option>
                                <option value="Male" className="text-[var(--ink)]">Male</option>
                                <option value="Female" className="text-[var(--ink)]">Female</option>
                                <option value="Other" className="text-[var(--ink)]">Other</option>
                              </select>
                              {errors.leaderGender && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.leaderGender}
                                </p>
                              )}
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-[13px] font-bold text-[var(--ink)] mb-1.5">
                                IEEE/CSI Member <span className="text-[var(--danger)]">*</span>
                              </label>
                              <select
                                name="isIeeeCsiMember"
                                value={formData.isIeeeCsiMember}
                                onChange={handleInputChange}
                                className={`register-select w-full px-3 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.isIeeeCsiMember ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                  } focus:outline-none text-[13px] text-[var(--ink)] cursor-pointer appearance-none shadow-sm`}
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 0.85rem center',
                                  backgroundSize: '1em'
                                }}
                              >
                                <option value="" disabled className="text-[var(--input-placeholder)]">Select Membership Status</option>
                                <option value="Yes" className="text-[var(--ink)]">Yes</option>
                                <option value="No" className="text-[var(--ink)]">No</option>
                              </select>
                              {errors.isIeeeCsiMember && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.isIeeeCsiMember}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Team Members (Ultra-Minimal Sleek Rows) */}
                      {step === 2 && (
                        <div className="space-y-3 text-left font-sans animate-fade-in">
                          <div className="mb-1">
                            <span className="text-xs font-black text-[#8C3A16] uppercase tracking-wider">Team Members</span>
                          </div>

                          <div className="space-y-2">
                            {[1, 2, 3, 4].map((num) => (
                              <div key={num} className="p-2.5 rounded-2xl bg-[#FAF6EE] border border-[#EBE1D3] flex items-center gap-2.5 shadow-sm">
                                <span className="w-7 h-7 rounded-xl bg-[var(--orange)]/15 text-[var(--orange-deep)] flex items-center justify-center text-[10px] font-black shrink-0">
                                  M{num}
                                </span>
                                <div className="grid grid-cols-2 gap-2 flex-1">
                                  <input
                                    type="text"
                                    name={`member${num}Name`}
                                    value={formData[`member${num}Name`]}
                                    onChange={handleInputChange}
                                    placeholder={`Member ${num} Name`}
                                    className={`register-input w-full px-3 py-1.5 rounded-xl bg-white border ${errors[`member${num}Name`] ? 'border-red-400 error' : 'border-[#EBE1D3] focus:border-[var(--orange)]'
                                      } focus:outline-none text-xs text-[var(--ink)] placeholder-[#B0A090] font-medium`}
                                  />
                                  <select
                                    name={`member${num}Gender`}
                                    value={formData[`member${num}Gender`]}
                                    onChange={handleInputChange}
                                    className="register-select w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#EBE1D3] focus:border-[var(--orange)] focus:outline-none text-xs text-[var(--ink)] cursor-pointer font-medium"
                                  >
                                    <option value="" disabled className="text-[#B0A090]">Gender</option>
                                    <option value="Male" className="text-[var(--ink)]">Male</option>
                                    <option value="Female" className="text-[var(--ink)]">Female</option>
                                    <option value="Other" className="text-[var(--ink)]">Other</option>
                                  </select>
                                  <input
                                    type="email"
                                    name={`member${num}Email`}
                                    value={formData[`member${num}Email`]}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    className={`register-input w-full px-3 py-1.5 rounded-xl bg-white border ${errors[`member${num}Email`] ? 'border-red-400 error' : 'border-[#EBE1D3] focus:border-[var(--orange)]'
                                      } focus:outline-none text-xs text-[var(--ink)] placeholder-[#B0A090] font-medium`}
                                  />
                                  <input
                                    type="text"
                                    name={`member${num}Phone`}
                                    value={formData[`member${num}Phone`]}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={`register-input w-full px-3 py-1.5 rounded-xl bg-white border ${errors[`member${num}Phone`] ? 'border-red-400 error' : 'border-[#EBE1D3] focus:border-[var(--orange)]'
                                      } focus:outline-none text-xs text-[var(--ink)] placeholder-[#B0A090] font-medium`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}



                      {/* Step 3: Solution Details & Uploads */}
                      {step === 3 && (
                        <div className="space-y-4 text-left font-sans animate-fade-in">

                          {/* PSID + Title stacked */}
                          <div className="space-y-3">
                            {/* PSID Dropdown */}
                            <div>
                              <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                                Problem Statement ID (PSID) *
                              </label>
                              <CustomSelect
                                value={formData.psid}
                                placeholder={isLoadingPS ? 'Loading...' : 'Select PSID'}
                                disabled={isLoadingPS}
                                hasError={!!errors.psid}
                                options={problemStatements.map(ps => ({ value: ps.psNumber, label: ps.psNumber }))}
                                onChange={(selectedId) => {
                                  const psObj = problemStatements.find(ps => ps.psNumber === selectedId);
                                  setFormData(prev => ({
                                    ...prev,
                                    psid: selectedId,
                                    psTitle: psObj ? (psObj.title || psObj.statement) : prev.psTitle
                                  }));
                                  setErrors(prev => {
                                    const newErrs = { ...prev };
                                    delete newErrs.psid;
                                    if (psObj) delete newErrs.psTitle;
                                    return newErrs;
                                  });
                                }}
                              />
                              {errors.psid && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.psid}
                                </p>
                              )}
                            </div>

                            {/* PS Title Dropdown */}
                            <div>
                              <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                                Problem Statement Title *
                              </label>
                              <CustomSelect
                                value={formData.psTitle}
                                placeholder="Select Problem Statement Title..."
                                hasError={!!errors.psTitle}
                                options={problemStatements.map(ps => ({ value: ps.statement || ps.title, label: ps.statement || ps.title }))}
                                onChange={(selectedTitle) => {
                                  const psObj = problemStatements.find(ps => (ps.statement === selectedTitle || ps.title === selectedTitle));
                                  setFormData(prev => ({
                                    ...prev,
                                    psTitle: selectedTitle,
                                    psid: psObj ? psObj.psNumber : prev.psid
                                  }));
                                  setErrors(prev => {
                                    const newErrs = { ...prev };
                                    delete newErrs.psTitle;
                                    if (psObj) delete newErrs.psid;
                                    return newErrs;
                                  });
                                }}
                              />
                              {errors.psTitle && (
                                <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={10} /> {errors.psTitle}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* File Uploads — compact horizontal rows */}
                          <div className="space-y-3 pt-1">
                            {[
                              {
                                id: 'ideaPpt-file',
                                key: 'ideaPpt',
                                label: 'Idea PPT',
                                accept: '.ppt,.pptx,.pdf',
                                hint: 'PPT, PPTX or PDF · max 20 MB',
                                Icon: Upload,
                                btnLabel: formData.ideaPpt ? 'Change PPT' : (fileMetaHints.ideaPpt ? 'Re-select PPT' : 'Choose PPT'),
                                fileName: formData.ideaPpt ? formData.ideaPpt.name : (fileMetaHints.ideaPpt || null),
                                hasError: !!errors.ideaPpt,
                                errorMsg: errors.ideaPpt,
                                isUploaded: !!formData.ideaPpt,
                              },
                              {
                                id: 'consentLetter-file',
                                key: 'consentLetter',
                                label: 'Consent Letter',
                                accept: '.pdf,.png,.jpg,.jpeg',
                                hint: 'PDF, PNG or JPG · max 20 MB',
                                Icon: Upload,
                                btnLabel: formData.consentLetter ? 'Change Letter' : (fileMetaHints.consentLetter ? 'Re-select Letter' : 'Choose Letter'),
                                fileName: formData.consentLetter ? formData.consentLetter.name : (fileMetaHints.consentLetter || null),
                                hasError: !!errors.consentLetter,
                                errorMsg: errors.consentLetter,
                                isUploaded: !!formData.consentLetter,
                              },
                            ].map(({ id, key, label, accept, hint, Icon, btnLabel, fileName, hasError, errorMsg, isUploaded }) => (
                              <div key={key}>
                                <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1.5 uppercase">
                                  {label} *
                                </label>
                                <label
                                  htmlFor={id}
                                  className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all"
                                  style={{
                                    border: hasError
                                      ? '1.5px dashed #FCA5A5'
                                      : isUploaded
                                        ? '1.5px solid #6EE7B7'
                                        : '1.5px dashed #D6C9B8',
                                    background: hasError
                                      ? '#FFF5F5'
                                      : isUploaded
                                        ? 'rgba(52,211,153,0.06)'
                                        : 'var(--input-bg)',
                                  }}
                                  onMouseEnter={e => { if (!isUploaded && !hasError) { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.background = '#FFF8F2'; } }}
                                  onMouseLeave={e => { if (!isUploaded && !hasError) { e.currentTarget.style.borderColor = '#D6C9B8'; e.currentTarget.style.background = 'var(--input-bg)'; } }}
                                >
                                  {/* Icon circle */}
                                  <div
                                    className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center"
                                    style={{
                                      background: isUploaded ? 'rgba(52,211,153,0.14)' : 'rgba(217,123,51,0.12)',
                                      color: isUploaded ? '#059669' : 'var(--orange)',
                                    }}
                                  >
                                    <Icon size={16} strokeWidth={2} />
                                  </div>

                                  {/* File info */}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-bold truncate" style={{ color: fileName ? 'var(--ink)' : 'var(--ink-soft)' }}>
                                      {fileName || 'No file chosen'}
                                    </p>
                                    <p className="text-[10px] mt-0.5" style={{ color: '#B0A090' }}>{hint}</p>
                                  </div>

                                  {/* Choose button */}
                                  <span
                                    className="shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm"
                                    style={{
                                      background: isUploaded
                                        ? 'rgba(52,211,153,0.18)'
                                        : 'linear-gradient(135deg, var(--orange), var(--orange-deep))',
                                      color: isUploaded ? '#047857' : '#ffffff',
                                    }}
                                  >
                                    {btnLabel}
                                  </span>

                                  <input
                                    type="file"
                                    id={id}
                                    className="hidden"
                                    accept={accept}
                                    onChange={(e) => handleFileChange(e, key)}
                                  />
                                </label>
                                {hasError && (
                                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-semibold">
                                    <AlertCircle size={10} /> {errorMsg}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                      {/* Step 4: Review Details (Simplified & Readable) */}
                      {step === 4 && (
                        <div className="space-y-3.5 text-left font-sans animate-fade-in">
                          {/* Team Details */}
                          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#EBE1D3] space-y-3">
                            <div className="flex items-center justify-between border-b border-[#EBE1D3] pb-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#8C3A16]">Team &amp; Leader Info</span>
                              <span className="text-xs font-black text-[#8C3A16] px-2.5 py-0.5 rounded-full bg-white border border-[#EBE1D3]">
                                {formData.teamName || '—'}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase">Leader Name</span>
                                <span className="font-bold text-[var(--ink)] block truncate">{formData.leaderName || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase">Phone Number</span>
                                <span className="font-bold text-[var(--ink)] block">{formData.leaderPhone || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase">Email Address</span>
                                <span className="font-bold text-[var(--ink)] block truncate">{formData.leaderEmail || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase">Institution</span>
                                <span className="font-bold text-[var(--ink)] block truncate">{formData.instituteName || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase">Theme</span>
                                <span className="font-bold text-[var(--ink)] block">{formData.theme || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase">IEEE/CSI Member</span>
                                <span className="font-bold text-[var(--ink)] block">{formData.isIeeeCsiMember || '—'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Problem Statement & Uploaded Files */}
                          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#EBE1D3] space-y-3">
                            <div className="border-b border-[#EBE1D3] pb-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#8C3A16]">Track &amp; Documents</span>
                            </div>

                            <div className="space-y-3 text-xs">
                              <div>
                                <span className="text-[10px] text-[#A09080] font-semibold block uppercase mb-0.5">Selected Problem Statement</span>
                                <p className="font-bold text-[var(--ink)] leading-snug">
                                  <span className="text-[var(--orange-deep)] font-black mr-1.5">[{formData.psid || 'PSID'}]</span>
                                  {formData.psTitle || '—'}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#EBE1D3]">
                                <div className="p-2 rounded-xl bg-white border border-[#EBE1D3]">
                                  <span className="text-[10px] text-[#A09080] font-bold block uppercase">Idea PPT</span>
                                  <span className="font-bold text-emerald-700 block truncate text-[11px] mt-0.5">
                                    ✓ {formData.ideaPpt ? formData.ideaPpt.name : (fileMetaHints.ideaPpt || 'Uploaded')}
                                  </span>
                                </div>
                                <div className="p-2 rounded-xl bg-white border border-[#EBE1D3]">
                                  <span className="text-[10px] text-[#A09080] font-bold block uppercase">Consent Letter</span>
                                  <span className="font-bold text-emerald-700 block truncate text-[11px] mt-0.5">
                                    ✓ {formData.consentLetter ? formData.consentLetter.name : (fileMetaHints.consentLetter || 'Uploaded')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Team Members Card (if any) */}
                          {[1, 2, 3, 4].some(n => formData[`member${n}Name`]?.trim()) && (
                            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#EBE1D3] space-y-3">
                              <div className="border-b border-[#EBE1D3] pb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#8C3A16]">Team Members</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                {[1, 2, 3, 4].map(num => {
                                  const name = formData[`member${num}Name`]?.trim();
                                  if (!name) return null;
                                  return (
                                    <div key={num} className="p-2 rounded-xl bg-white border border-[#EBE1D3]">
                                      <span className="text-[9px] text-[#8C3A16] font-black block uppercase">Member {num}</span>
                                      <span className="font-bold text-[var(--ink)] block truncate">{name}</span>
                                      <span className="text-[10px] text-[var(--ink-soft)] block">{formData[`member${num}Phone`]}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 5: Payment (Essential & Minimal) */}
                      {step === 5 && (
                        <div className="animate-fade-in text-left font-sans py-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

                            {/* Left: QR Code & Amount */}
                            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAF6EE] border border-[#EBE1D3] space-y-2">
                              <span className="text-[11px] font-bold text-[#A09080] uppercase tracking-wider">Scan QR Code to Pay</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-[#8C3A16]">
                                  {formData.isIeeeCsiMember === 'Yes' ? '₹1,200' : '₹1,500'}
                                </span>
                                {formData.isIeeeCsiMember === 'Yes' && (
                                  <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200 ml-1">
                                    IEEE/CSI
                                  </span>
                                )}
                              </div>

                              <div className="p-2.5 bg-white rounded-2xl border border-[#EBE1D3] shadow-sm">
                                <div className="w-36 h-36 flex items-center justify-center overflow-hidden rounded-xl">
                                  {formData.isIeeeCsiMember === 'Yes' ? (
                                    <img src="/qr1.jpeg" alt="QR Code" className="w-full h-full object-contain" />
                                  ) : (
                                    <img src="/qr2.jpeg" alt="QR Code" className="w-full h-full object-contain" />
                                  )}
                                </div>
                              </div>
                              <p className="text-[10px] text-[#A09080] font-semibold">GPay · PhonePe · Paytm · Any UPI</p>
                            </div>

                            {/* Right: Essential Proof Form */}
                            <div className="space-y-3.5 p-2">
                              {/* Transaction ID */}
                              <div>
                                <label className="block text-[11px] font-extrabold text-[#6B3213] uppercase tracking-wider mb-1">
                                  Transaction ID / UTR *
                                </label>
                                <input
                                  type="text"
                                  name="transactionId"
                                  value={formData.transactionId}
                                  onChange={handleInputChange}
                                  placeholder="Enter 12-digit UTR / Ref No."
                                  className={`register-input w-full px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] border ${errors.transactionId ? 'border-[var(--danger)] bg-[var(--input-err-bg)] error' : 'border-[var(--line)] focus:border-[var(--orange)]'
                                    } focus:outline-none text-xs text-[var(--ink)] font-semibold shadow-sm`}
                                />
                                {errors.transactionId && (
                                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-semibold">
                                    <AlertCircle size={10} /> {errors.transactionId}
                                  </p>
                                )}
                              </div>

                              {/* Payment Screenshot Upload */}
                              <div>
                                <label className="block text-[11px] font-extrabold text-[#6B3213] uppercase tracking-wider mb-1">
                                  Payment Screenshot *
                                </label>
                                <label
                                  htmlFor="paymentScreenshot-file"
                                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[var(--input-bg)] cursor-pointer transition-all border border-dashed"
                                  style={{
                                    borderColor: errors.paymentScreenshot ? '#FCA5A5' : formData.paymentScreenshot ? '#6EE7B7' : '#D6C9B8'
                                  }}
                                >
                                  <Upload size={16} className={formData.paymentScreenshot ? 'text-emerald-600' : 'text-[var(--orange)]'} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-[var(--ink)] truncate">
                                      {formData.paymentScreenshot ? formData.paymentScreenshot.name : (fileMetaHints.paymentScreenshot || 'Choose Screenshot')}
                                    </p>
                                    <p className="text-[9px] text-[#B0A090]">PNG, JPG or PDF</p>
                                  </div>
                                  <span
                                    className="shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm"
                                    style={{
                                      background: formData.paymentScreenshot
                                        ? 'rgba(52,211,153,0.18)'
                                        : 'linear-gradient(135deg, var(--orange), var(--orange-deep))',
                                      color: formData.paymentScreenshot ? '#047857' : '#ffffff',
                                    }}
                                  >
                                    {formData.paymentScreenshot ? 'Change' : 'Browse'}
                                  </span>
                                  <input
                                    type="file"
                                    id="paymentScreenshot-file"
                                    className="hidden"
                                    accept=".png,.jpg,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange(e, 'paymentScreenshot')}
                                  />
                                </label>

                                {formData.paymentScreenshot && (
                                  <button
                                    type="button"
                                    onClick={() => previewLocalFile(formData.paymentScreenshot)}
                                    className="mt-1 flex items-center gap-1 text-[10px] text-[var(--orange-deep)] hover:underline font-bold"
                                  >
                                    <Eye size={12} />
                                    <span>Preview Screenshot</span>
                                  </button>
                                )}

                                {errors.paymentScreenshot && (
                                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-semibold">
                                    <AlertCircle size={10} /> {errors.paymentScreenshot}
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                    </div> {/* Close centering wrapper */}
                  </div> {/* Close scroll area */}

                  {/* Navigation Buttons (Compact Footer) */}
                  <div className="mt-4 pt-3 flex justify-between items-center font-sans shrink-0 border-t border-[#EBE1D3]/80">
                    <div className="flex items-center gap-2">

                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="px-5 py-2 rounded-xl border-2 border-[#D6C9B8] text-[#6B3213] bg-white hover:bg-[#FAF6EE] font-extrabold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <ArrowLeft size={15} />
                          <span>Back</span>
                        </button>
                      ) : null}
                    </div>

                    {step < 5 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--orange)] to-[var(--orange-deep)] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md border-none ml-auto"
                      >
                        <span>Continue</span>
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#8C3A16] to-[#5C230C] hover:brightness-110 text-white font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer text-xs shadow-md border-none ml-auto disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Pay &amp; Submit Registration</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </div> {/* Close Main Form Body */}
              </div>

            ) : (

              /* Success Screen */
              <div className="py-8 text-center space-y-6 font-sans">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 shadow-md animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black font-display text-[#8C3A16]">
                    {registrationResult.message ? 'Already Registered!' : 'Registration Successful!'}
                  </h3>
                  {registrationResult.message && (
                    <p className="text-sm text-amber-700 font-medium pb-2">
                      {registrationResult.message}
                    </p>
                  )}
                  <p className="text-sm text-[var(--ink-soft)] max-w-lg mx-auto leading-relaxed">
                    Thank you for registering team <strong className="text-[var(--ink)]">"{registrationResult.teamName}"</strong>. Your Registration ID is:
                  </p>
                  <div className="inline-block py-2.5 px-6 rounded-2xl bg-[#FAF6EE] border border-[#8C3A16]/30 text-[#8C3A16] font-mono font-bold text-xl tracking-wider shadow-sm select-all">
                    {registrationResult.registrationId}
                  </div>
                  <p className="text-xs text-[var(--ink-soft)] max-w-md mx-auto pt-2">
                    Save this ID for references. Abstract guidelines and event notifications will be sent to <strong className="text-[var(--ink)]">{formData.leaderEmail}</strong>.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-full bg-[#8C3A16] hover:bg-[#6B2A0F] text-white font-black tracking-wider text-xs uppercase transition-all cursor-pointer shadow-md"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}