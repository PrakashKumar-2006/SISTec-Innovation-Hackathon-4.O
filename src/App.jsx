import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PartnerMarquee from './components/PartnerMarquee';
import Prizes from './components/Prizes';
import Objectives from './components/Objectives';
import Themes from './components/Themes';
import ProcessFlow from './components/ProcessFlow';
import Timeline from './components/Timeline';
import Schedule from './components/Schedule';
import FAQs from './components/FAQs';
import Developers from './components/Developers';
import Footer from './components/Footer';
import Contact from './components/Contact';
import RegisterModal from './components/RegisterModal';
import ProblemStatements from './components/ProblemStatements';
import Instructions from './components/Instructions';
import SIH2023View from './components/SIH2023View';
import SIH2024View from './components/SIH2024View';
import SIH2023Finalists from './components/SIH2023Finalists';
import SIH2024Finalists from './components/SIH2024Finalists';
import SIH2023Winners from './components/SIH2023Winners';
import SIH2024Winners from './components/SIH2024Winners';
import ShortlistedTeams from './components/ShortlistedTeams';
import SIH2026Winners from './components/SIH2026Winners';
import SIH2025Winners from './components/SIH2025Winners';
import SIH2025Finalists from './components/SIH2025Finalists';
import PreviousSIH from './components/PreviousSIH';

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'problem-statements'

  // Intersection Observer for Reveal-on-Scroll entry animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        root: null,
        threshold: 0.08, // trigger when 8% of section is visible
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [currentView]);

  // Function to switch view and scroll to hash if landing
  const handleViewChange = (view, hash) => {
    setCurrentView(view);
    if (view === 'landing' && hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-darker text-brand-navy font-sans overflow-x-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-brand-blue/10 via-brand-purple/5 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Header Navigation */}
      {!['sih-2023', 'sih-2024'].includes(currentView) && (
        <Navbar
          onRegisterClick={() => setShowRegister(true)}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
      )}

      <main>
        {currentView === 'landing' ? (
          <>
            <Hero onRegisterClick={() => setShowRegister(true)} onViewChange={handleViewChange} />
            <div className="reveal-on-scroll"><About /></div>
            <div className="reveal-on-scroll"><PartnerMarquee /></div>
            <div className="reveal-on-scroll"><Prizes /></div>
            <div className="reveal-on-scroll"><Objectives /></div>
            <div className="reveal-on-scroll"><Themes onViewChange={handleViewChange} /></div>
            <div className="reveal-on-scroll"><ProcessFlow onViewChange={handleViewChange} /></div>
            <div className="reveal-on-scroll"><Timeline /></div>
            <div className="reveal-on-scroll"><Schedule /></div>
            <div className="reveal-on-scroll"><FAQs /></div>
            <div className="reveal-on-scroll"><Developers /></div>
          </>
        ) : currentView === 'about-sih' ? (
          <About isStandalone={true} />
        ) : currentView === 'photo-gallery' ? (
          <Objectives isStandalone={true} />
        ) : currentView === 'timeline' ? (
          <Timeline isStandalone={true} />
        ) : currentView === 'schedule' ? (
          <Schedule isStandalone={true} />
        ) : currentView === 'problem-statements' ? (
          <ProblemStatements />
        ) : currentView === 'instructions' ? (
          <Instructions onViewChange={handleViewChange} />
        ) : currentView === 'contact-us' ? (
          <Contact onViewChange={handleViewChange} />
        ) : currentView === 'sih-2023' ? (
          <SIH2023View onViewChange={handleViewChange} />
        ) : currentView === 'sih-2024' ? (
          <SIH2024View onViewChange={handleViewChange} />
        ) : currentView === 'sih-2023-finalists' ? (
          <SIH2023Finalists onViewChange={handleViewChange} />
        ) : currentView === 'sih-2024-finalists' ? (
          <SIH2024Finalists onViewChange={handleViewChange} />
        ) : currentView === 'sih-2023-winners' ? (
          <SIH2023Winners onViewChange={handleViewChange} />
        ) : currentView === 'sih-2024-winners' ? (
          <SIH2024Winners onViewChange={handleViewChange} />
        ) : currentView === 'shortlisted-teams' ? (
          <ShortlistedTeams onViewChange={handleViewChange} />
        ) : currentView === 'sih-2025-finalists' ? (
          <SIH2025Finalists onViewChange={handleViewChange} />
        ) : currentView === 'sih-2026-winners' ? (
          <SIH2026Winners onViewChange={handleViewChange} />
        ) : currentView === 'sih-2025-winners' ? (
          <SIH2025Winners onViewChange={handleViewChange} />
        ) : currentView === 'previous-sih' ? (
          <PreviousSIH onViewChange={handleViewChange} />
        ) : null}
      </main>

      {/* Footer Details */}
      <Footer onViewChange={handleViewChange} />

      {/* Registration Modal Overlay */}
      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}

    </div>
  );
}
