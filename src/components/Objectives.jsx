import React from 'react';
import { Target, CheckCircle2, Zap, Briefcase, GraduationCap } from 'lucide-react';

export default function Objectives() {
  const objectiveList = [
    {
      title: 'Diverse Problem Domains',
      desc: 'Focus on more than 12 Domains with 10 to 15 curated Problem Statements in each area.',
      icon: <Target className="text-brand-blue" />
    },
    {
      title: 'National Collaboration',
      desc: 'Expecting 60+ Elite Teams to participate from engineering colleges across various states.',
      icon: <Zap className="text-brand-pink" />
    },
    {
      title: 'Career Opportunities',
      desc: 'Connect with top recruiters and secure high-value internships directly from the hackathon.',
      icon: <Briefcase className="text-brand-teal" />
    },
    {
      title: 'Incubation & Start-ups',
      desc: 'Get mentorship, incubation support, and opportunities to convert outstanding prototypes into startups.',
      icon: <GraduationCap className="text-brand-orange" />
    }
  ];

  return (
    <section id="objectives" className="relative py-24 bg-brand-dark">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text Grid */}
          <div className="lg:col-span-5 space-y-6 text-left">

            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-navy">
              Objective of{' '}
              <span className="bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple bg-clip-text text-transparent">
                SIH 4.0
              </span>
            </h2>
            
            <p className="text-brand-gray leading-relaxed text-sm sm:text-base font-normal">
              Hackathons bring students with technical backgrounds together for creative problem-solving and prototype development. It serves as a launchpad to sharpen coding abilities, share industrial insight, and exchange knowledge.
            </p>
            
            <p className="text-brand-gray leading-relaxed text-sm sm:text-base font-normal">
              Our core perspective is to design robust engineering solutions for existing societal challenges. Key goals of SISTec Innovation Hackathon 4.0 include:
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {objectiveList.map((obj, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/30 transition-all duration-300 shadow-card-shadow hover:shadow-card-hover h-full flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-navy/5 flex items-center justify-center mb-4">
                  {obj.icon}
                </div>
                <h3 className="text-base font-bold text-brand-navy tracking-wide font-display">
                  {obj.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed font-normal">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
