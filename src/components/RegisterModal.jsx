import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Upload, ArrowLeft, ArrowRight, Check, Eye, CreditCard, RotateCcw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
    { num: 1, title: 'Team Details' },
    { num: 2, title: 'Members' },
    { num: 3, title: 'Solution' },
    { num: 4, title: 'Review' },
    { num: 5, title: 'Payment' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#241708]/75 backdrop-blur-md z-[100] overflow-y-auto flex flex-col font-sans">
      <div className="w-full bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#E6DCCE] sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between font-sans">

          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_8px_#16a34a]"></div>
            <span className="text-xs sm:text-sm font-extrabold font-sans tracking-wide text-emerald-800 uppercase">
              Secure Submission Channel
            </span>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit? Your progress will be saved and restored when you return.")) {
                onClose();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF6EE] border border-[#E3D7C5] text-xs font-bold text-[#8C3A16] hover:bg-[#F3EAD9] hover:border-[#8C3A16] hover:text-[#6B2A0F] transition-all cursor-pointer shadow-sm"

          >
            <ArrowLeft size={14} />
            <span>Save &amp; Exit</span>
          </button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-2 sm:p-4 max-h-screen overflow-hidden">
        <div className="relative w-full max-w-4xl h-[560px] sm:h-[600px] max-h-[92vh] bg-[#FFFDF7] border border-[#E6DCCE] rounded-3xl p-4 sm:p-6 shadow-2xl z-10 text-left flex flex-col justify-between overflow-hidden">

        {!registrationResult ? (
          <>
            {/* Modal Header */}
            <div className="text-center space-y-1 mb-3 shrink-0">
              <h3 className="text-xl sm:text-2xl font-black font-display text-[#8C3A16] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
                SIH 4.0 Registration Form
              </h3>
              <p className="text-xs text-[#6B5B49] font-medium font-sans">
                Fill in team details and problem statement selection to complete registration.
              </p>
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

            {/* Stepper Indicator (Modern Spacious 1-Line Aligned Bar) */}
            <div className="hidden md:flex relative justify-between items-center w-full max-w-3xl mx-auto mb-5 px-8 font-sans shrink-0">
              <div className="absolute top-4 left-12 right-12 h-[3px] bg-[#E3D7C5] -z-10 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-[#C97F1B] to-[#8C3A16] transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
                ></div>
              </div>

              {stepLabels.map((lbl) => {
                const isActive = step >= lbl.num;
                const isCurrent = step === lbl.num;
                return (
                  <div key={lbl.num} className="flex flex-col items-center text-center w-24">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs border-2 transition-all duration-500 ease-out ${
                        isCurrent 
                          ? 'bg-[#8C3A16] border-[#8C3A16] text-white shadow-md ring-4 ring-[#8C3A16]/20 scale-110' 
                          : isActive 
                            ? 'bg-[#C97F1B] border-[#C97F1B] text-white shadow-sm' 
                            : 'bg-[#F7F2E9] border-[#D9CCBA] text-[#7A6A58]'
                      }`}
                    >
                      {isActive && !isCurrent ? <Check size={14} strokeWidth={3} /> : lbl.num}
                    </div>
                    <span 
                      className={`text-xs font-bold mt-1.5 whitespace-nowrap select-none transition-all duration-300 ${
                        isCurrent 
                          ? 'text-[#8C3A16] font-black' 
                          : isActive 
                            ? 'text-[#C97F1B] font-bold' 
                            : 'text-[#7A6A58]'
                      }`}
                    >
                      {lbl.title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex md:hidden flex-col items-center max-w-xs mx-auto mb-4 px-4 space-y-1 text-center font-sans shrink-0">
              <span className="text-[10px] font-bold tracking-widest text-[#C97F1B] uppercase">
                Step {step} of 5 — {stepLabels[step - 1].title}
              </span>
              <div className="w-full h-1.5 bg-[#E5DBCB] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8C3A16] transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Main Form Body (Fixed Identical Card Height Across All Steps) */}
            <div className="flex-1 overflow-hidden px-1 py-1 flex flex-col justify-between">
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col justify-center">
              
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
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Leader Name *
                      </label>
                      <input
                        type="text"
                        name="leaderName"
                        value={formData.leaderName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.leaderName ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                      />
                      {errors.leaderName && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.leaderName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        placeholder="e.g. Innovators 4.0"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.teamName ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                      />
                      {errors.teamName && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.teamName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Choose Theme *
                      </label>
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.theme ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] font-semibold transition-all cursor-pointer appearance-none shadow-sm`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.85rem center',
                          backgroundSize: '1em'
                        }}
                      >
                        {isLoadingPS ? (
                          <option value="" disabled className="text-[#7A6A58] bg-[#FFFDF7]">Loading Themes...</option>
                        ) : (
                          <option value="" disabled className="text-[#7A6A58] bg-[#FFFDF7]">Select Category Theme</option>
                        )}
                        {!isLoadingPS && uniqueDomains.map((domain) => (
                          <option key={domain} value={domain} className="bg-[#FFFDF7] text-[#241708] font-medium py-1">
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
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Leader Gender *
                      </label>
                      <select
                        name="leaderGender"
                        value={formData.leaderGender}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.leaderGender ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] font-semibold transition-all cursor-pointer appearance-none shadow-sm`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.85rem center',
                          backgroundSize: '1em'
                        }}
                      >
                        <option value="" disabled className="text-[#7A6A58] bg-[#FFFDF7]">Select Gender</option>
                        <option value="Male" className="bg-[#FFFDF7] text-[#241708] font-medium">Male</option>
                        <option value="Female" className="bg-[#FFFDF7] text-[#241708] font-medium">Female</option>
                        <option value="Other" className="bg-[#FFFDF7] text-[#241708] font-medium">Other</option>
                      </select>
                      {errors.leaderGender && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.leaderGender}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Leader Phone *
                      </label>
                      <input
                        type="text"
                        name="leaderPhone"
                        value={formData.leaderPhone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.leaderPhone ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                      />
                      {errors.leaderPhone && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.leaderPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Leader Email *
                      </label>
                      <input
                        type="email"
                        name="leaderEmail"
                        value={formData.leaderEmail}
                        onChange={handleInputChange}
                        placeholder="rahul@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.leaderEmail ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                      />
                      {errors.leaderEmail && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.leaderEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        Institute / College Name *
                      </label>
                      <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sagar Institute of Science, Technology & Research (SISTec-R)"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.instituteName ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                      />
                      {errors.instituteName && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.instituteName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase">
                        IEEE/CSI Member *
                      </label>
                      <select
                        name="isIeeeCsiMember"
                        value={formData.isIeeeCsiMember}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.isIeeeCsiMember ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] transition-all cursor-pointer font-medium`}
                      >
                        <option value="" disabled className="text-[#A09080] bg-white">Select Membership Status</option>
                        <option value="Yes" className="bg-white text-[#241708]">Yes</option>
                        <option value="No" className="bg-white text-[#241708]">No</option>
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

              {/* Step 2: Team Members (Ultra Compact 1-Screen Fit Layout) */}
              {step === 2 && (
                <div className="space-y-3 text-left font-sans">
                  <p className="text-[11px] text-[#7A6A58] font-medium mb-1">
                    Add up to 4 team members. (Optional — leave blank if not applicable).
                  </p>

                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="border-b border-[#ECE2D2]/80 pb-2.5 mb-2.5 last:border-b-0 last:pb-0 last:mb-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-[11px] font-extrabold text-[#8C3A16] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#8C3A16] text-white flex items-center justify-center text-[9px] font-mono">
                            {num}
                          </span>
                          Member {num} Details
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                        <div>
                          <input
                            type="text"
                            name={`member${num}Name`}
                            value={formData[`member${num}Name`]}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className={`w-full px-3 py-2 rounded-lg bg-white border ${
                              errors[`member${num}Name`] ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                            } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                          />
                          {errors[`member${num}Name`] && (
                            <p className="text-[9px] text-red-600 mt-0.5 font-semibold">
                              {errors[`member${num}Name`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <select
                            name={`member${num}Gender`}
                            value={formData[`member${num}Gender`]}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 rounded-lg bg-white border ${
                              errors[`member${num}Gender`] ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                            } focus:outline-none text-xs text-[#241708] transition-all cursor-pointer font-medium`}
                          >
                            <option value="" disabled className="text-[#A09080] bg-white">Gender</option>
                            <option value="Male" className="bg-white text-[#241708]">Male</option>
                            <option value="Female" className="bg-white text-[#241708]">Female</option>
                            <option value="Other" className="bg-white text-[#241708]">Other</option>
                          </select>
                          {errors[`member${num}Gender`] && (
                            <p className="text-[9px] text-red-600 mt-0.5 font-semibold">
                              {errors[`member${num}Gender`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <input
                            type="email"
                            name={`member${num}Email`}
                            value={formData[`member${num}Email`]}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className={`w-full px-3 py-2 rounded-lg bg-white border ${
                              errors[`member${num}Email`] ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                            } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                          />
                          {errors[`member${num}Email`] && (
                            <p className="text-[9px] text-red-600 mt-0.5 font-semibold">
                              {errors[`member${num}Email`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            name={`member${num}Phone`}
                            value={formData[`member${num}Phone`]}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className={`w-full px-3 py-2 rounded-lg bg-white border ${
                              errors[`member${num}Phone`] ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                            } focus:outline-none text-xs text-[#241708] placeholder-[#605040] transition-all font-medium`}
                          />
                          {errors[`member${num}Phone`] && (
                            <p className="text-[9px] text-red-600 mt-0.5 font-semibold">
                              {errors[`member${num}Phone`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}



              {/* Step 3: Solution Details & Uploads */}
              {step === 3 && (
                <div className="space-y-3.5 text-left font-sans animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* PSID Dropdown */}
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase text-left">
                        PSID (Problem Statement ID) *
                      </label>
                      <select
                        name="psid"
                        value={formData.psid}
                        onChange={(e) => {
                          const selectedId = e.target.value;
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
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.psid ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] font-semibold transition-all cursor-pointer appearance-none shadow-sm`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.85rem center',
                          backgroundSize: '1em'
                        }}
                      >
                      {isLoadingPS ? (
                        <option value="" className="bg-[#FFFDF7] text-[#241708]">Loading Problem Statements...</option>
                      ) : (
                        <option value="" className="bg-[#FFFDF7] text-[#7A6A58]">Select PSID...</option>
                      )}
                      
                      {!isLoadingPS && problemStatements.map((ps) => (
                        <option key={ps.psNumber} value={ps.psNumber} className="bg-[#FFFDF7] text-[#241708] font-medium py-1">
                          {ps.psNumber} — {ps.domain || ps.category || 'General'} — {ps.title || ps.statement}
                        </option>
                      ))}
                      </select>
                      {errors.psid && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.psid}
                        </p>
                      )}
                    </div>

                    {/* PS Title Dropdown */}
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase text-left">
                        PS Title *
                      </label>
                      <select
                        name="psTitle"
                        value={formData.psTitle}
                        onChange={(e) => {
                          const selectedTitle = e.target.value;
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
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.psTitle ? 'border-red-500' : 'border-[#D9CCBA] focus:border-[#8C3A16]'
                        } focus:outline-none text-xs text-[#241708] font-semibold transition-all cursor-pointer appearance-none shadow-sm`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C3A16'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.85rem center',
                          backgroundSize: '1em'
                        }}
                      >
                        <option value="" className="bg-[#FFFDF7] text-[#7A6A58]">Select Problem Statement Title...</option>
                        {problemStatements.map((ps) => (
                          <option key={ps.psNumber} value={ps.statement || ps.title} className="bg-[#FFFDF7] text-[#241708] font-medium py-1">
                            {ps.statement || ps.title}
                          </option>
                        ))}
                      </select>
                      {errors.psTitle && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.psTitle}
                        </p>
                      )}
                    </div>
                  </div>



                  {/* File Upload Zone (Compact 1-Screen Fit) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    {/* Idea PPT */}
                    <div className="flex flex-col">
                      <label className="w-full text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase text-left">
                        Idea PPT *
                      </label>
                      {!formData.ideaPpt && fileMetaHints.ideaPpt && (
                        <div className="w-full mb-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2">
                          <RotateCcw size={12} className="text-amber-700 shrink-0" />
                          <p className="text-[10px] text-amber-800 leading-snug">
                            Re-select: <strong>{fileMetaHints.ideaPpt}</strong>
                          </p>
                        </div>
                      )}
                      <div className={`w-full border-2 border-dashed rounded-xl p-3 text-center transition-all bg-white hover:bg-[#FAF6EE]/50 ${
                        errors.ideaPpt 
                          ? 'border-red-400' 
                          : formData.ideaPpt 
                            ? 'border-emerald-500 bg-emerald-50/20'
                            : 'border-[#D9CCBA] hover:border-[#8C3A16]'
                      }`}>
                        <input
                          type="file"
                          id="ideaPpt-file"
                          className="hidden"
                          accept=".ppt,.pptx,.pdf"
                          onChange={(e) => handleFileChange(e, 'ideaPpt')}
                        />
                        <div className="flex flex-col items-center cursor-pointer space-y-1.5">
                          <label htmlFor="ideaPpt-file" className="flex flex-col items-center cursor-pointer space-y-1">
                            <div className="w-8 h-8 rounded-full bg-[#8C3A16]/10 text-[#8C3A16] flex items-center justify-center">
                              <Upload size={14} />
                            </div>
                            <span className="px-3 py-1 bg-[#8C3A16] text-white font-bold text-[11px] rounded-full">
                              {fileMetaHints.ideaPpt && !formData.ideaPpt ? 'Re-select PPT' : 'Choose PPT'}
                            </span>
                          </label>

                          <span className="text-[11px] text-[#241708] font-bold truncate max-w-full px-2">
                            {formData.ideaPpt ? formData.ideaPpt.name : 'No file chosen'}
                          </span>

                          <span className="text-[9px] text-[#605040]">
                            PPT, PPTX, PDF (Max 20MB)
                          </span>
                        </div>
                      </div>
                      {errors.ideaPpt && (
                        <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.ideaPpt}
                        </p>
                      )}
                    </div>

                    {/* Consent Letter */}
                    <div className="flex flex-col">
                      <label className="w-full text-[11px] font-extrabold text-[#6B3213] tracking-wider mb-1 uppercase text-left">
                        Consent Letter *
                      </label>
                      {!formData.consentLetter && fileMetaHints.consentLetter && (
                        <div className="w-full mb-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2">
                          <RotateCcw size={12} className="text-amber-700 shrink-0" />
                          <p className="text-[10px] text-amber-800 leading-snug">
                            Re-select: <strong>{fileMetaHints.consentLetter}</strong>
                          </p>
                        </div>
                      )}
                      <div className={`w-full border-2 border-dashed rounded-xl p-3 text-center transition-all bg-white hover:bg-[#FAF6EE]/50 ${
                        errors.consentLetter 
                          ? 'border-red-400' 
                          : formData.consentLetter 
                            ? 'border-emerald-500 bg-emerald-50/20'
                            : 'border-[#D9CCBA] hover:border-[#8C3A16]'
                      }`}>
                        <input
                          type="file"
                          id="consentLetter-file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e, 'consentLetter')}
                        />
                        <div className="flex flex-col items-center cursor-pointer space-y-1.5">
                          <label htmlFor="consentLetter-file" className="flex flex-col items-center cursor-pointer space-y-1">
                            <div className="w-8 h-8 rounded-full bg-[#8C3A16]/10 text-[#8C3A16] flex items-center justify-center">
                              <Upload size={14} />
                            </div>
                            <span className="px-3 py-1 bg-[#8C3A16] text-white font-bold text-[11px] rounded-full">
                              {fileMetaHints.consentLetter && !formData.consentLetter ? 'Re-select Letter' : 'Choose Letter'}
                            </span>
                          </label>

                          <span className="text-[11px] text-[#241708] font-bold truncate max-w-full px-2">
                            {formData.consentLetter ? formData.consentLetter.name : 'No file chosen'}
                          </span>

                          <span className="text-[9px] text-[#605040]">
                            PDF, PNG, JPG (Max 20MB)
                          </span>
                        </div>
                      </div>
                      {errors.consentLetter && (
                        <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-semibold">
                          <AlertCircle size={10} /> {errors.consentLetter}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review Details (Ultra Compact) */}
              {step === 4 && (
                <div className="space-y-3.5 text-left font-sans animate-fade-in">
                  
                  {/* Team Details Block */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-[#8C3A16] uppercase tracking-wider border-b border-[#ECE2D2] pb-1">
                      Team &amp; Leader Details
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">Leader</span>
                        <span className="text-[#241708] font-bold text-xs truncate block">{formData.leaderName || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">Team Name</span>
                        <span className="text-[#241708] font-bold text-xs truncate block">{formData.teamName || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">Theme</span>
                        <span className="text-[#241708] font-bold text-xs truncate block">{formData.theme || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">Phone</span>
                        <span className="text-[#241708] font-bold text-xs">{formData.leaderPhone || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">Email</span>
                        <span className="text-[#241708] font-bold text-xs truncate block">{formData.leaderEmail || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">Institute</span>
                        <span className="text-[#241708] font-bold text-xs truncate block">{formData.instituteName || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">IEEE/CSI Member</span>
                        <span className="text-[#241708] font-bold text-xs">{formData.isIeeeCsiMember || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Members Details Block */}
                  <div className="space-y-1.5">
                    <h4 className="text-[11px] font-black text-[#8C3A16] uppercase tracking-wider border-b border-[#ECE2D2] pb-1">
                      Team Members
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((num) => {
                        const name = formData[`member${num}Name`]?.trim();
                        if (!name) return null;
                        return (
                          <div key={num} className="p-2 bg-white border border-[#ECE2D2] rounded-lg text-xs flex justify-between items-center">
                            <span className="font-bold text-[#8C3A16] text-xs">M{num}: {name}</span>
                            <span className="text-[#7A6A58] text-[10px]">{formData[`member${num}Phone`]}</span>
                          </div>
                        );
                      })}
                      {!formData.member1Name && !formData.member2Name && !formData.member3Name && !formData.member4Name && (
                        <p className="text-[11px] text-[#A09080] italic">No additional team members added.</p>
                      )}
                    </div>
                  </div>

                  {/* Solution Block */}
                  <div className="space-y-1.5">
                    <h4 className="text-[11px] font-black text-[#8C3A16] uppercase tracking-wider border-b border-[#ECE2D2] pb-1">
                      Selected Problem Statement
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">PSID</span>
                        <span className="text-[#241708] font-bold text-xs">{formData.psid || '-'}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-[#ECE2D2]">
                        <span className="text-[#A09080] block text-[9px] uppercase font-bold">PS Title</span>
                        <span className="text-[#241708] font-bold text-xs truncate block">{formData.psTitle || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Payment */}
              {step === 5 && (
                <div className="animate-fade-in space-y-4 text-center py-2 font-sans">
                  <div className="max-w-sm mx-auto bg-white border border-[#ECE2D2] rounded-2xl p-4 space-y-4 shadow-sm text-left">
                    <div className="w-12 h-12 bg-[#8C3A16]/10 border border-[#8C3A16]/20 rounded-full flex items-center justify-center mx-auto text-[#8C3A16]">
                      <CreditCard size={20} />
                    </div>
                    
                    <div className="space-y-0.5 text-center">
                      <h4 className="text-base font-black text-[#8C3A16] font-display">Registration Payment</h4>
                      <p className="text-[11px] text-[#7A6A58]">
                        Complete fee payment to register team nomination for SIH 4.0.
                      </p>
                    </div>

                    <div className="border-t border-b border-[#ECE2D2] py-2.5 space-y-1.5 text-left text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#7A6A58]">Team Name</span>
                        <span className="text-[#241708] font-bold">{formData.teamName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A6A58]">Team Leader</span>
                        <span className="text-[#241708] font-bold">{formData.leaderName}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#7A6A58] font-bold">Amount to Pay</span>
                        <span className="text-[#8C3A16] font-black text-sm">
                          {formData.isIeeeCsiMember === 'Yes' ? '₹1200.00' : '₹1500.00'}
                        </span>
                      </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex justify-center py-2">
                      <div className="bg-white p-2 rounded-xl">
                        <div className="w-48 h-48 border-2 border-slate-100 flex items-center justify-center overflow-hidden">
                          {formData.isIeeeCsiMember === 'Yes' ? (
                            <img src="/qr1.jpeg" alt="QR Code A (₹1200)" className="w-full h-full object-contain" />
                          ) : (
                            <img src="/qr2.jpeg" alt="QR Code B (₹1500)" className="w-full h-full object-contain" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Payment Details Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 tracking-wider mb-2 font-mono uppercase">
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          placeholder="e.g. UPI Ref No / UTR"
                          className={`w-full px-5 py-3 rounded-2xl bg-[#080809]/60 border ${
                            errors.transactionId ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-brand-gold/50'
                          } focus:outline-none text-sm text-white placeholder-slate-500/80 transition-all focus:ring-1 focus:ring-brand-gold/30 shadow-inner`}
                        />
                        {errors.transactionId && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.transactionId}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-center">
                        <label className="w-full text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                          Payment Screenshot
                        </label>
                        {!formData.paymentScreenshot && fileMetaHints.paymentScreenshot && (
                          <div className="w-full mb-2 px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-700/40 flex items-center gap-2">
                            <RotateCcw size={12} className="text-amber-400 shrink-0" />
                            <p className="text-[10px] text-amber-300 leading-snug">
                              Previously uploaded: <strong>{fileMetaHints.paymentScreenshot}</strong> — please re-select.
                            </p>
                          </div>
                        )}
                        <div className={`w-full border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                          errors.paymentScreenshot 
                            ? 'border-red-300 bg-red-50/20' 
                            : formData.paymentScreenshot 
                              ? 'border-emerald-300 bg-emerald-50/10'
                              : fileMetaHints.paymentScreenshot
                                ? 'border-amber-600/50 bg-amber-950/10'
                                : 'border-brand-gold/30 hover:border-brand-gold/60 bg-[#080809]/40'
                        }`}>
                          <input
                            type="file"
                            id="paymentScreenshot-file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg,.pdf"
                            onChange={(e) => handleFileChange(e, 'paymentScreenshot')}
                          />
                          <div className="flex flex-col items-center cursor-pointer space-y-3">
                            <label 
                              htmlFor="paymentScreenshot-file"
                              className="flex flex-col items-center cursor-pointer space-y-2"
                            >
                              <div className="w-10 h-10 rounded-full bg-emerald-100 text-brand-gold flex items-center justify-center hover:scale-105 transition-transform">
                                <Upload size={16} />
                              </div>
                              <span className="px-4 py-1.5 bg-brand-gold hover:bg-emerald-600 text-white font-bold text-xs rounded-full transition-all shadow-sm">
                                {fileMetaHints.paymentScreenshot && !formData.paymentScreenshot ? 'Re-select Screenshot' : 'Choose Screenshot'}
                              </span>
                            </label>

                            <div className="flex flex-col items-center space-y-1 w-full">
                              <span className="text-xs text-slate-500 font-medium truncate max-w-full px-2">
                                {formData.paymentScreenshot ? formData.paymentScreenshot.name : 'No file chosen'}
                              </span>
                              {formData.paymentScreenshot && (
                                <button
                                  type="button"
                                  onClick={() => previewLocalFile(formData.paymentScreenshot)}
                                  className="flex items-center gap-1 text-[10px] text-brand-gold hover:text-brand-gold/80 hover:underline font-bold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/30 cursor-pointer"
                                >
                                  <Eye size={12} />
                                  <span>Preview File</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {errors.paymentScreenshot && (
                          <p className="text-[10px] text-red-500 mt-2 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.paymentScreenshot}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              </div> {/* Close flex-grow */}

              {/* Navigation Buttons (Compact Footer) */}
              <div className="mt-3 pt-3 border-t border-[#E8DFC9] flex justify-between items-center font-sans shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to cancel? All unsaved progress will be lost.")) {
                        RegistrationSession.clear();
                        onClose();
                      }
                    }}
                    className="px-4 py-2 rounded-full border border-red-800/30 text-red-800 bg-transparent hover:bg-red-50 font-bold transition-all flex items-center gap-1 cursor-pointer text-xs uppercase shadow-sm"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-2 rounded-full border border-[#8C3A16] text-[#8C3A16] bg-transparent hover:bg-[#FAF6EE] font-bold transition-all flex items-center gap-1 cursor-pointer text-xs uppercase shadow-sm"
                    >
                      <ArrowLeft size={14} />
                      <span>Prev</span>
                    </button>
                  ) : null}
                </div>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-full bg-[#8C3A16] hover:bg-[#6B2A0F] text-white font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer text-xs shadow-md border-none ml-auto"
                  >
                    <span>Next</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-full bg-[#8C3A16] hover:bg-[#6B2A0F] text-white font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer text-xs shadow-md border-none ml-auto disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay &amp; Register</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>


            </div> {/* Close Main Form Body */}
          </>

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
              <p className="text-sm text-[#7A6A58] max-w-lg mx-auto leading-relaxed">
                Thank you for registering team <strong className="text-[#241708]">"{registrationResult.teamName}"</strong>. Your Registration ID is:
              </p>
              <div className="inline-block py-2.5 px-6 rounded-2xl bg-[#FAF6EE] border border-[#8C3A16]/30 text-[#8C3A16] font-mono font-bold text-xl tracking-wider shadow-sm select-all">
                {registrationResult.registrationId}
              </div>
              <p className="text-xs text-[#7A6A58] max-w-md mx-auto pt-2">
                Save this ID for references. Abstract guidelines and event notifications will be sent to <strong className="text-[#241708]">{formData.leaderEmail}</strong>.
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
  );
}


