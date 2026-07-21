import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      q: 'Who can participate in SIH 4.0?',
      a: 'All engineering, polytechnic, and science stream undergraduate students currently enrolled in recognized colleges across India are eligible to form a team and participate.'
    },
    {
      q: 'How do I register for SIH 4.0?',
      a: 'Click on the "Register Now" button, fill in your team details (Team Name, Track of interest, Member details, and Github profile links), and submit your initial abstract nomination.'
    },
    {
      q: 'How should we form the team?',
      a: 'Each team must consist of 2 to 4 members. We highly encourage interdisciplinary teams and gender diversity. All members must belong to the same institute.'
    },
    {
      q: 'How do we submit our Idea?',
      a: 'Once registered, teams need to submit a PDF/PPT abstract document based on the official template. The submission portal link will be shared via email with the team leader.'
    },
    {
      q: 'What is the selection criteria?',
      a: 'Proposals will be screened by our academic and industry experts based on problem relevance, feasibility, innovative approach, UI/UX conceptual design, and social impact.'
    },
    {
      q: 'When/Where will the shortlisted Ideas be announced?',
      a: 'The results will be declared on the official SIH 4.0 result portal by November 4th, 2026. Selected team leaders will receive official joining/venue instruction emails.'
    },
    {
      q: 'What are the prizes to be won?',
      a: 'The champion team wins ₹50,000, the runner-up wins ₹30,000, and the second runner-up secures ₹20,000. Additionally, top teams receive certificates, college trophies, and direct internship interview vouchers.'
    },
    {
      q: 'Miscellaneous Information',
      a: 'We provide free food, snacks, high-speed WiFi, and overnight rest zones at our Bhopal Ratibad campus for all shortlisted teams participating in the offline coding finale.'
    }
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faqs" className="relative py-12 sm:py-16 bg-brand-dark overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 text-center mb-16">
          <p className="text-xs sm:text-sm font-black tracking-[0.25em] text-[var(--vermilion)] font-sans uppercase mb-2">
            Got Questions?
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--clay)] font-display leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
            Frequently Asked{' '}
            <span className="text-[var(--marigold-deep)]">
              Questions
            </span>
          </h2>
          <p className="text-[var(--ink-soft)] text-sm sm:text-base font-medium max-w-xl mx-auto font-sans">
            Find answers to common queries regarding registration rules, screening processes, food/accommodation, and timelines.
          </p>
        </div>


        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-navy/10 overflow-hidden transition-all duration-300 shadow-card-shadow"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-brand-navy hover:text-brand-blue transition-colors"
                >
                  <span className="font-display tracking-wide">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-brand-blue shrink-0 ml-4" />
                  ) : (
                    <ChevronDown size={18} className="text-brand-gray shrink-0 ml-4" />
                  )}
                </button>
                
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? 'max-h-48 border-t border-brand-navy/5 p-5' : 'max-h-0'
                  } overflow-hidden bg-brand-dark/40`}
                >
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
