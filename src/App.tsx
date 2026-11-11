import React, { useEffect, useState } from 'react';
import { initLenis, getLenis } from './lib/lenis';
import { Grain } from './components/Grain';
import { CustomCursor } from './components/CustomCursor';
import { InkTrail } from './components/InkTrail';
import { ScrollProgress } from './components/ScrollProgress';
import { BackgroundJourney } from './components/BackgroundJourney';
import { Preloader } from './components/Preloader';
import { Nav } from './components/Nav';
import { SectionBridge } from './components/SectionBridge';

import { Hero } from './sections/Hero';
import { Marquee } from './components/Marquee';
import { About } from './sections/About';
import { Work } from './sections/Work';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Toolkit } from './sections/Toolkit';
import { Education } from './sections/Education';
import { Socials } from './sections/Socials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  const [preloaderActive, setPreloaderActive] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = initLenis();

    if (preloaderActive) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [preloaderActive]);

  const handlePreloaderComplete = () => {
    setPreloaderActive(false);
    const lenis = getLenis();
    lenis?.start();
  };

  return (
    <div className="relative min-h-screen bg-ink text-bone font-sans selection:bg-crimson selection:text-ink">
      {/* Preloader Sequence */}
      {preloaderActive && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Grain Overlay (Mandatory) */}
      <Grain />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Atmospheric Tactile Ink Trail (Section 10.7) */}
      <InkTrail />

      {/* Fixed Progress Top Bar & Right Edge Indicator */}
      <ScrollProgress />

      {/* Fixed Background Journey Color Drift */}
      <BackgroundJourney />

      {/* Navigation */}
      <Nav />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10 w-full overflow-hidden">
        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: Marquee Strip */}
        <Marquee />

        {/* Section Bridge: Home -> About */}
        <SectionBridge nextSection="ABOUT ME" />

        {/* Section 03: About Me */}
        <About />

        {/* Section Bridge: About -> Work */}
        <SectionBridge nextSection="WORK & EXPERIENCE" />

        {/* Section 04: Work / Experience */}
        <Work />

        {/* Section Bridge: Work -> Projects */}
        <SectionBridge nextSection="SELECTED WORK" />

        {/* Section 05: Projects */}
        <Projects />

        {/* Section Bridge: Projects -> Services */}
        <SectionBridge nextSection="PRIKAUSHION STUDIO" />

        {/* Section 06: Services */}
        <Services />

        {/* Section Bridge: Services -> Toolkit */}
        <SectionBridge nextSection="TOOLKIT" />

        {/* Section 07: Toolkit / Skills */}
        <Toolkit />

        {/* Section Bridge: Toolkit -> Education */}
        <SectionBridge nextSection="EDUCATION & CLUBS" />

        {/* Section 08: Education */}
        <Education />

        {/* Section Bridge: Education -> Socials */}
        <SectionBridge nextSection="SOCIALS" />

        {/* Section 09: Socials */}
        <Socials />

        {/* Section Bridge: Socials -> Contact */}
        <SectionBridge nextSection="CONTACT" />

        {/* Section 10: Contact (Inversion to Cream Paper) */}
        <Contact />
      </main>

      {/* Section 11: Footer (Back to Black) */}
      <Footer />
    </div>
  );
};

export default App;

