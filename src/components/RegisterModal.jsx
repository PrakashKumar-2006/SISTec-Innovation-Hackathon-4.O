import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Upload, ArrowLeft, ArrowRight, Check, Eye } from 'lucide-react';

export default function RegisterModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Team Details
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderGender: '',
    theme: '',
    instituteName: '',

    // Step 2: Member Details
    member1Name: '', member1Gender: '', member1Email: '', member1Phone: '',
    member2Name: '', member2Gender: '', member2Email: '', member2Phone: '',
    member3Name: '', member3Gender: '', member3Email: '', member3Phone: '',
    member4Name: '', member4Gender: '', member4Email: '', member4Phone: '',

    // Step 3: Solution Details
    psid: '',
    psTitle: '',
    ideaPpt: null,
    consentLetter: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: null }));
      }
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
      if (!formData.leaderName.trim()) newErrors.leaderName = 'Leader name is required';
      if (!formData.leaderGender) {
        newErrors.leaderGender = 'Leader gender selection is required';
      }
      if (!formData.theme) {
        newErrors.theme = 'Theme selection is required';
      }
      if (!formData.leaderEmail.trim()) {
        newErrors.leaderEmail = 'Leader email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.leaderEmail)) {
        newErrors.leaderEmail = 'Invalid email address';
      }
      if (!formData.leaderPhone.trim()) {
        newErrors.leaderPhone = 'Leader phone number is required';
      } else if (!/^\d{10}$/.test(formData.leaderPhone.replace(/[^0-9]/g, ''))) {
        newErrors.leaderPhone = 'Enter a valid 10-digit phone number';
      }
      if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
    }

    if (currentStep === 2) {
      // Validate members if they have entered partial information
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to create file preview:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setErrors((prev) => ({ ...prev, submit: 'Please fix the errors in previous steps before submitting.' }));
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      // Step 1 fields
      submitData.append('teamName', formData.teamName);
      submitData.append('leaderName', formData.leaderName);
      submitData.append('leaderEmail', formData.leaderEmail);
      submitData.append('leaderPhone', formData.leaderPhone);
      submitData.append('leaderGender', formData.leaderGender);
      submitData.append('theme', formData.theme);
      submitData.append('instituteName', formData.instituteName);

      // Step 2 fields: create members array
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

      // Step 3 fields
      submitData.append('psid', formData.psid);
      submitData.append('psTitle', formData.psTitle);
      submitData.append('ideaPpt', formData.ideaPpt);
      submitData.append('consentLetter', formData.consentLetter);

      // Send to Backend API
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/register`, {
        method: 'POST',
        body: submitData,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        data = { error: `Server error (${response.status}). Please check your file size (Max 10MB).` };
      }

      if (response.ok) {
        setRegistrationResult(data);
      } else {
        setErrors({ submit: data.error || 'Failed to submit registration. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Network error occurred. Please check your internet connection or server status.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = [
    { num: 1, title: 'Team Details' },
    { num: 2, title: 'Team Member Details' },
    { num: 3, title: 'Solution' },
    { num: 4, title: 'Review Details' },
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#080809] z-50 overflow-y-auto flex flex-col font-sans">
      {/* Secure Header */}
      <div className="w-full bg-[#0D0D0F]/85 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase">
              Secure Submission Channel
            </span>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit? Any unsaved registration progress will be lost.")) {
                onClose();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-brand-gold hover:border-brand-gold/40 hover:bg-slate-800/50 transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft size={14} />
            <span>Cancel & Return</span>
          </button>
        </div>
      </div>

      {/* Main Page Container */}
      <div className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-4xl bg-[#0F0F11] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl z-10">

        {!registrationResult ? (
          <>
            {/* Form Title */}
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-3xl font-bold font-display text-gold-metallic tracking-tight">
                SIH 4.0 Registration Form
              </h3>
            </div>

            {/* Horizontal Steps Progress Indicator */}
            <div className="relative flex justify-between items-center max-w-2xl mx-auto mb-10 px-4">
              {/* Progress Line */}
              <div className="absolute top-5 left-10 right-10 h-[2px] bg-slate-800 -z-10">
                <div 
                  className="h-full bg-brand-gold transition-all duration-500 ease-out shadow-[0_0_8px_#D8AB55]"
                  style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%` }}
                ></div>
              </div>

              {stepLabels.map((lbl) => {
                const isActive = step >= lbl.num;
                const isCurrent = step === lbl.num;
                return (
                  <div key={lbl.num} className="flex flex-col items-center text-center w-24">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-500 ease-out ${
                        isCurrent 
                          ? 'bg-brand-gold border-brand-gold text-[#080809] shadow-[0_0_15px_rgba(216,171,85,0.4)] scale-110' 
                          : isActive 
                            ? 'bg-brand-gold border-brand-gold text-[#080809]' 
                            : 'bg-[#121214] border-slate-800 text-slate-500'
                      }`}
                    >
                      {isActive && !isCurrent ? <Check size={16} /> : lbl.num}
                    </div>
                    <span 
                      className={`text-[10px] sm:text-xs font-semibold mt-2 select-none min-h-[32px] leading-tight transition-all duration-300 ${
                        isCurrent 
                          ? 'text-white font-bold' 
                          : isActive 
                            ? 'text-brand-gold' 
                            : 'text-slate-500'
                      }`}
                    >
                      {lbl.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Steps Container */}
            <div className="bg-[#161619] rounded-3xl p-6 sm:p-8 border border-slate-800/80 min-h-[500px] flex flex-col justify-between shadow-lg">
              <div className="flex-grow">
              
              {/* Error Alert */}
              {errors.submit && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span>{errors.submit}</span>
                </div>
              )}

              {/* Step 1: Team Details */}
              {step === 1 && (
                <div className="animate-fade-in space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        Leader Name
                      </label>
                      <input
                        type="text"
                        name="leaderName"
                        value={formData.leaderName}
                        onChange={handleInputChange}
                        placeholder="Leader Name"
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.leaderName ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                      />
                      {errors.leaderName && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.leaderName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        Team Name
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        placeholder="Team Name"
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.teamName ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                      />
                      {errors.teamName && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.teamName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        Choose Theme
                      </label>
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.theme ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 transition-colors shadow-sm cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-500 bg-slate-900">Select Theme</option>
                        <option value="AI & Open Innovation">AI & Open Innovation</option>
                        <option value="AgriTech">AgriTech</option>
                        <option value="EduTech">EduTech</option>
                        <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                        <option value="Fintech & Web3">Fintech & Web3</option>
                        <option value="Smart Automation">Smart Automation</option>
                      </select>
                      {errors.theme && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.theme}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        Leader Gender
                      </label>
                      <select
                        name="leaderGender"
                        value={formData.leaderGender}
                        onChange={handleInputChange}
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.leaderGender ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 transition-colors shadow-sm cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-500 bg-slate-900">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.leaderGender && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.leaderGender}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        Leader Phone
                      </label>
                      <input
                        type="text"
                        name="leaderPhone"
                        value={formData.leaderPhone}
                        onChange={handleInputChange}
                        placeholder="Leader phone"
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.leaderPhone ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                      />
                      {errors.leaderPhone && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.leaderPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        Leader Email
                      </label>
                      <input
                        type="email"
                        name="leaderEmail"
                        value={formData.leaderEmail}
                        onChange={handleInputChange}
                        placeholder="Leader Email"
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.leaderEmail ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                      />
                      {errors.leaderEmail && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.leaderEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                      Institute Name
                    </label>
                    <input
                      type="text"
                      name="instituteName"
                      value={formData.instituteName}
                      onChange={handleInputChange}
                      placeholder="Institute Name"
                      className={`w-full px-6 py-3 rounded-full bg-white border ${
                        errors.instituteName ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                      } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                    />
                    {errors.instituteName && (
                      <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.instituteName}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Team Member Details */}
              {step === 2 && (
                <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="p-5 border border-slate-800 rounded-2xl bg-[#080809]/40 space-y-4">
                      <h4 className="text-sm font-bold text-brand-gold font-display flex items-center gap-1.5 border-b border-slate-800/50 pb-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-mono">
                          0{num}
                        </span>
                        Member {num} Details
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name={`member${num}Name`}
                            value={formData[`member${num}Name`]}
                            onChange={handleInputChange}
                            placeholder={`Member ${num} Name`}
                            className={`w-full px-5 py-2.5 rounded-full bg-white border ${
                              errors[`member${num}Name`] ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                            } focus:outline-none text-sm text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                          />
                          {errors[`member${num}Name`] && (
                            <p className="text-[10px] text-red-500 mt-1">
                              {errors[`member${num}Name`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <select
                            name={`member${num}Gender`}
                            value={formData[`member${num}Gender`]}
                            onChange={handleInputChange}
                            className={`w-full px-5 py-2.5 rounded-full bg-white border ${
                              errors[`member${num}Gender`] ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                            } focus:outline-none text-sm text-slate-200 transition-colors shadow-sm cursor-pointer`}
                          >
                            <option value="" disabled className="text-slate-500 bg-slate-900">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors[`member${num}Gender`] && (
                            <p className="text-[10px] text-red-500 mt-1">
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
                            placeholder={`Member ${num} Email`}
                            className={`w-full px-5 py-2.5 rounded-full bg-white border ${
                              errors[`member${num}Email`] ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                            } focus:outline-none text-sm text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                          />
                          {errors[`member${num}Email`] && (
                            <p className="text-[10px] text-red-500 mt-1">
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
                            placeholder={`Member ${num} Phone`}
                            className={`w-full px-5 py-2.5 rounded-full bg-white border ${
                              errors[`member${num}Phone`] ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                            } focus:outline-none text-sm text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                          />
                          {errors[`member${num}Phone`] && (
                            <p className="text-[10px] text-red-500 mt-1">
                              {errors[`member${num}Phone`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Solution */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        PSID (Problem Statement ID)
                      </label>
                      <input
                        type="text"
                        name="psid"
                        value={formData.psid}
                        onChange={handleInputChange}
                        placeholder="e.g. SIH1234"
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.psid ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                      />
                      {errors.psid && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.psid}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase">
                        PS Title
                      </label>
                      <input
                        type="text"
                        name="psTitle"
                        value={formData.psTitle}
                        onChange={handleInputChange}
                        placeholder="Problem Statement Title"
                        className={`w-full px-6 py-3 rounded-full bg-white border ${
                          errors.psTitle ? 'border-red-500' : 'border-slate-800 focus:border-brand-blue'
                        } focus:outline-none text-slate-200 placeholder-slate-500 transition-colors shadow-sm`}
                      />
                      {errors.psTitle && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.psTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* File Upload Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* Idea PPT */}
                    <div className="flex flex-col items-center">
                      <label className="w-full text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase text-left">
                        Idea PPT
                      </label>
                      <div className={`w-full border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                        errors.ideaPpt 
                          ? 'border-red-300 bg-red-50/20' 
                          : formData.ideaPpt 
                            ? 'border-emerald-300 bg-emerald-50/10' 
                            : 'border-brand-gold/30 hover:border-brand-gold/60 bg-[#080809]/40'
                      }`}>
                        <input
                          type="file"
                          id="ideaPpt-file"
                          className="hidden"
                          accept=".ppt,.pptx,.pdf"
                          onChange={(e) => handleFileChange(e, 'ideaPpt')}
                        />
                        <div className="flex flex-col items-center cursor-pointer space-y-3">
                          <label 
                            htmlFor="ideaPpt-file"
                            className="flex flex-col items-center cursor-pointer space-y-2"
                          >
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-brand-gold flex items-center justify-center hover:scale-105 transition-transform">
                              <Upload size={20} />
                            </div>
                            <span className="px-4 py-1.5 bg-brand-gold hover:bg-emerald-600 text-white font-bold text-xs rounded-full transition-all shadow-sm">
                              Choose Idea PPT
                            </span>
                          </label>

                          <div className="flex flex-col items-center space-y-1.5 w-full">
                            <span className="text-xs text-slate-500 font-medium truncate max-w-full px-2">
                              {formData.ideaPpt ? formData.ideaPpt.name : 'No file chosen'}
                            </span>
                            {formData.ideaPpt && (
                              <button
                                type="button"
                                onClick={() => previewLocalFile(formData.ideaPpt)}
                                className="flex items-center gap-1 text-[10px] text-brand-gold hover:text-brand-gold/80 hover:underline font-bold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/30 cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>Preview Selected File</span>
                              </button>
                            )}
                          </div>

                          <span className="text-[10px] text-slate-400">
                            Supported files: PPT, PPTX, PDF (Max 10MB)
                          </span>
                        </div>
                      </div>
                      {errors.ideaPpt && (
                        <p className="text-[10px] text-red-500 mt-2 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.ideaPpt}
                        </p>
                      )}
                    </div>

                    {/* Consent Letter */}
                    <div className="flex flex-col items-center">
                      <label className="w-full text-xs font-bold text-slate-500 tracking-wider mb-2 font-mono uppercase text-left">
                        Consent Letter
                      </label>
                      <div className={`w-full border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                        errors.consentLetter 
                          ? 'border-red-300 bg-red-50/20' 
                          : formData.consentLetter 
                            ? 'border-emerald-300 bg-emerald-50/10' 
                            : 'border-brand-gold/30 hover:border-brand-gold/60 bg-[#080809]/40'
                      }`}>
                        <input
                          type="file"
                          id="consentLetter-file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e, 'consentLetter')}
                        />
                        <div className="flex flex-col items-center cursor-pointer space-y-3">
                          <label 
                            htmlFor="consentLetter-file"
                            className="flex flex-col items-center cursor-pointer space-y-2"
                          >
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-brand-gold flex items-center justify-center hover:scale-105 transition-transform">
                              <Upload size={20} />
                            </div>
                            <span className="px-4 py-1.5 bg-brand-gold hover:bg-emerald-600 text-white font-bold text-xs rounded-full transition-all shadow-sm">
                              Choose Consent Letter
                            </span>
                          </label>

                          <div className="flex flex-col items-center space-y-1.5 w-full">
                            <span className="text-xs text-slate-500 font-medium truncate max-w-full px-2">
                              {formData.consentLetter ? formData.consentLetter.name : 'No file chosen'}
                            </span>
                            {formData.consentLetter && (
                              <button
                                type="button"
                                onClick={() => previewLocalFile(formData.consentLetter)}
                                className="flex items-center gap-1 text-[10px] text-brand-gold hover:text-brand-gold/80 hover:underline font-bold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/30 cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>Preview Selected File</span>
                              </button>
                            )}
                          </div>

                          <span className="text-[10px] text-slate-400">
                            Supported files: PDF, PNG, JPG (Max 10MB)
                          </span>
                        </div>
                      </div>
                      {errors.consentLetter && (
                        <p className="text-[10px] text-red-500 mt-2 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.consentLetter}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review Details */}
              {step === 4 && (
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                  
                  {/* Team Details Block */}
                  <div className="space-y-3 text-left">
                    <h4 className="text-sm font-bold text-brand-gold font-display border-b border-slate-800 pb-1.5">
                      TEAM DETAILS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Leader Name</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.leaderName || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Team Name</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.teamName || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Choose Theme</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.theme || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Leader Gender</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.leaderGender || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Leader Phone</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.leaderPhone || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Leader Email</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.leaderEmail || '-'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block">Institute Name</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.instituteName || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Members Details Block */}
                  <div className="space-y-3 text-left pt-2">
                    <h4 className="text-sm font-bold text-brand-gold font-display border-b border-slate-800 pb-1.5">
                      MEMBER DETAILS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((num) => {
                        const name = formData[`member${num}Name`]?.trim();
                        if (!name) return null;
                        return (
                          <div key={num} className="p-4 bg-[#080809]/60 border border-slate-800/80 rounded-2xl space-y-2 text-xs">
                            <span className="font-bold text-brand-gold block tracking-wide">Member {num}</span>
                            <div className="space-y-1">
                              <div>
                                <span className="text-slate-400">Name: </span> 
                                <span className="text-slate-200 font-medium">{name}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Gender: </span> 
                                <span className="text-slate-200 font-medium">{formData[`member${num}Gender`]}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Email: </span> 
                                <span className="text-slate-200 font-medium">{formData[`member${num}Email`]}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Phone: </span> 
                                <span className="text-slate-200 font-medium">{formData[`member${num}Phone`]}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {!formData.member1Name && !formData.member2Name && !formData.member3Name && !formData.member4Name && (
                        <p className="text-xs text-slate-400 col-span-2 italic">No additional team members added.</p>
                      )}
                    </div>
                  </div>

                  {/* Solution Block */}
                  <div className="space-y-3 text-left pt-2">
                    <h4 className="text-sm font-bold text-brand-gold font-display border-b border-slate-800 pb-1.5">
                      SOLUTION DETAILS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">PSID</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.psid || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">PS Title</span>
                        <span className="text-slate-200 font-semibold text-sm">{formData.psTitle || '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Idea PPT</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-brand-gold font-medium truncate block max-w-[150px]">{formData.ideaPpt ? formData.ideaPpt.name : '-'}</span>
                          {formData.ideaPpt && (
                            <button
                              type="button"
                              onClick={() => previewLocalFile(formData.ideaPpt)}
                              className="text-[10px] bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 text-brand-gold font-bold px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Eye size={10} />
                              Preview
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Consent Letter</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-brand-gold font-medium truncate block max-w-[150px]">{formData.consentLetter ? formData.consentLetter.name : '-'}</span>
                          {formData.consentLetter && (
                            <button
                              type="button"
                              onClick={() => previewLocalFile(formData.consentLetter)}
                              className="text-[10px] bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 text-brand-gold font-bold px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Eye size={10} />
                              Preview
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-8 py-2.5 rounded-full border border-brand-gold text-brand-gold font-bold hover:bg-brand-gold/10 transition-all flex items-center gap-1.5 cursor-pointer text-sm shadow-sm"
                  >
                    <ArrowLeft size={16} />
                    <span>Prev</span>
                  </button>
                ) : (
                  <div /> // placeholder for alignment
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-2.5 rounded-full bg-btn-gradient hover:opacity-90 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer text-sm shadow-sm border-none ml-auto"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-2.5 rounded-full bg-btn-gradient hover:opacity-90 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer text-sm shadow-sm border-none ml-auto disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Nomination</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          </>
        ) : (
          /* Success Screen */
          <div className="py-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-emerald-950/20 border-2 border-brand-gold flex items-center justify-center text-emerald-500 shadow-emerald-500/10 shadow-lg animate-bounce">
                <CheckCircle2 size={40} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold font-display text-brand-navy">Registration Successful!</h3>
              <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                Thank you for registering team <strong className="text-white">"{registrationResult.teamName}"</strong>. Your Registration ID is:
              </p>
              <div className="inline-block py-2.5 px-6 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-mono font-bold text-lg tracking-wider shadow-sm select-all">
                {registrationResult.registrationId}
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto pt-2">
                Save this ID for references. Abstract guidelines and event notifications will be sent to <strong className="text-slate-200">{formData.leaderEmail}</strong>.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-btn-gradient hover:opacity-90 text-white font-bold tracking-wide text-xs transition-all cursor-pointer shadow-md"
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
