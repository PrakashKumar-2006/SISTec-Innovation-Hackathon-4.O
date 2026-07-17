import React from 'react';
import { CheckCircle2, Award, ClipboardEdit, Sparkles } from 'lucide-react';

export default function ProcessFlow() {
  const steps = [
    {
      num: '01',
      title: 'Team Submission',
      desc: 'Form a team of 2-4 members, fill in developer profiles, and register online.',
      icon: <ClipboardEdit className="text-brand-blue" />
    },
    {
      num: '02',
      title: 'Idea Nomination',
      desc: 'Submit your PPT/PDF proposal based on the official problem statements.',
      icon: <CheckCircle2 className="text-brand-purple" />
    },
    {
      num: '03',
      title: 'Announcement',
      desc: 'Expert panel reviews nominations; shortlisted teams are announced on the portal.',
      icon: <Sparkles className="text-brand-pink" />
    },
    {
      num: '04',
      title: 'Grand Finale',
      desc: '36-hour coding battle at SISTec campus, followed by judging rounds and awards.',
      icon: <Award className="text-brand-orange" />
    }
  ];

  return (
    <section id="process" className="relative py-24 bg-brand-dark overflow-hidden">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl mx-auto text-center mb-16">

          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-navyDeep">
            The Hackathon{' '}
            <span className="text-gold-metallic">
              Process Flow
            </span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base font-normal">
            Follow these simple steps from registration to the grand finale presentation.
          </p>
        </div>

        {/* Pipeline horizontal flow representation */}
        <div className="hidden lg:grid grid-cols-4 gap-6 items-stretch relative max-w-7xl mx-auto pt-6">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-brand-blue via-brand-pink to-brand-orange -translate-y-16 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group relative">
              {/* Floating Step Number Box */}
              <div className="w-20 h-20 rounded-full bg-white border border-brand-navy/10 flex items-center justify-center mb-6 group-hover:border-brand-blue group-hover:scale-105 transition-all duration-300 shadow-card-shadow">
                <span className="text-xl font-black font-display bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">
                  {step.num}
                </span>
              </div>

              {/* Detail Card */}
              <div className="p-5 rounded-3xl bg-white border border-brand-navy/10 group-hover:border-brand-blue/30 transition-all duration-300 w-full shadow-card-shadow hover:shadow-card-hover h-full flex flex-col">
                <div className="flex justify-center mb-3">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-brand-navy font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-brand-gray mt-2 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Vertical Flow representation */}
        <div className="lg:hidden flex flex-col gap-8 max-w-md mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start relative">
              {/* Left Step Badge */}
              <div className="w-12 h-12 rounded-2xl bg-white border border-brand-navy/10 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-sm font-bold font-display text-brand-blue">{step.num}</span>
              </div>
              
              {/* Detail Card */}
              <div className="p-5 rounded-2xl bg-white border border-brand-navy/10 w-full text-left shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  {step.icon}
                  <h3 className="text-sm sm:text-base font-bold text-brand-navy font-display">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-brand-gray leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
