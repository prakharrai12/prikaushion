import React, { useEffect, useState, useRef } from 'react';
import { Container } from '../components/Container';
import { MagneticButton } from '../components/MagneticButton';
import { scrollToTarget } from '../lib/lenis';
import { gsap } from '../lib/gsap';
import { site } from '../config/site';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const burstContainerRef = useRef<HTMLDivElement>(null);

  // Initialize and track reduced motion preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('prikaushion_reduced_motion');
      const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (saved === '1' || (saved === null && prefers)) {
        setIsReducedMotion(true);
        document.documentElement.classList.add('reduce-motion');
      }
    } catch {
      // LocalStorage unavailable fallback
    }
  }, []);

  const toggleReducedMotion = () => {
    const next = !isReducedMotion;
    setIsReducedMotion(next);
    try {
      if (next) {
        document.documentElement.classList.add('reduce-motion');
        localStorage.setItem('prikaushion_reduced_motion', '1');
      } else {
        document.documentElement.classList.remove('reduce-motion');
        localStorage.setItem('prikaushion_reduced_motion', '0');
      }
    } catch {
      // ignore
    }
  };

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Piano letter hover on giant wordmark
  const handleLetterHover = (e: React.SyntheticEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      y: '-2vw',
      duration: 0.35,
      ease: 'power3.out',
      yoyo: true,
      repeat: 1,
    });
  };

  // Easter egg: K-click sparkle burst
  const handleKClick = (e: React.SyntheticEvent<HTMLElement>) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);

    const container = burstContainerRef.current;
    if (!container) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'fixed pointer-events-none z-[110] w-4 h-4 text-crimson';
      sparkle.innerHTML = `<svg viewBox="0 0 100 100" fill="#E01B24"><path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" /></svg>`;
      document.body.appendChild(sparkle);

      const angle = (i * 30 * Math.PI) / 180;
      const distance = 80 + Math.random() * 60;
      const targetX = originX + Math.cos(angle) * distance;
      const targetY = originY + Math.sin(angle) * distance;

      gsap.fromTo(
        sparkle,
        {
          left: originX,
          top: originY,
          scale: 0.4,
          opacity: 1,
          rotate: 0,
        },
        {
          left: targetX,
          top: targetY,
          scale: 1.2,
          opacity: 0,
          rotate: 180,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => {
            sparkle.remove();
          },
        }
      );
    }
  };

  const letters = 'prikaushion'.split('');

  return (
    <footer
      id="footer"
      data-bg="ink"
      className="relative w-full pt-20 pb-12 bg-ink border-t border-bone-faint text-bone overflow-hidden select-none"
    >
      <div ref={burstContainerRef} />

      {/* Easter Egg Toast */}
      <div
        className={`fixed bottom-10 right-10 z-[110] px-4 py-2.5 bg-charcoal border border-crimson rounded-md shadow-2xl font-mono text-xs uppercase tracking-widest text-crimson flex items-center gap-2 transition-all duration-300 pointer-events-none ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <svg viewBox="0 0 100 100" fill="#E01B24" className="w-3.5 h-3.5 animate-spin">
          <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
        </svg>
        <span>YOU FOUND THE K. BUILT WITH TASTE.</span>
      </div>

      <Container className="flex flex-col justify-between">
        {/* Top Row: Links & Back to Top */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-12 border-b border-bone-faint font-mono text-xs uppercase tracking-widest">
          <div className="flex flex-wrap items-center gap-6 text-bone-dim">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToTarget('#about'); }} className="hover:text-bone py-2 touch-expand">About</a>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget('#work'); }} className="hover:text-bone py-2 touch-expand">Work</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToTarget('#projects'); }} className="hover:text-bone py-2 touch-expand">Projects</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToTarget('#services'); }} className="hover:text-bone py-2 touch-expand">Services</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget('#contact'); }} className="hover:text-bone py-2 touch-expand">Contact</a>
            <span className="text-bone/20 hidden sm:inline">|</span>
            <a href={site.socials.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson py-2 touch-expand">GitHub ↗</a>
            <a href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson py-2 touch-expand">LinkedIn ↗</a>
            <a href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson py-2 touch-expand">Instagram ↗</a>
          </div>

          <MagneticButton
            strength={0.4}
            onClick={() => scrollToTarget('#home', 0)}
            className="flex items-center gap-2 text-crimson hover:text-crimson-glow py-2 px-4 border border-bone-faint hover:border-crimson rounded-pill transition-colors min-h-[44px] touch-expand"
          >
            <span>BACK TO TOP</span>
            <span className="text-sm">↑</span>
          </MagneticButton>
        </div>

        {/* Giant Piano Wordmark: "prikaushion" with clickable red K */}
        <div
          ref={wordmarkRef}
          className="my-10 md:my-14 flex items-center justify-between w-full overflow-hidden text-center cursor-default"
        >
          <div className="flex w-full items-baseline justify-between font-display font-extrabold text-[clamp(1.5rem,8.5vw,18rem)] leading-none tracking-[-0.04em] text-bone flex-nowrap">
            {letters.map((char, idx) => {
              const isK = idx === 3;
              return (
                <span
                  key={idx}
                  onMouseEnter={handleLetterHover}
                  onTouchStart={isK ? handleKClick : handleLetterHover}
                  onClick={isK ? handleKClick : undefined}
                  className={`inline-block transition-transform duration-200 will-change-transform ${
                    isK
                      ? 'text-crimson cursor-pointer hover:scale-110 active:scale-95'
                      : 'hover:text-bone/80'
                  }`}
                  title={isK ? 'Click the K' : undefined}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Orbit Arc Divider with Sparkle */}
        <div className="relative w-full h-8 flex items-center justify-center my-4 opacity-40">
          <div className="absolute inset-x-0 h-[1px] bg-bone-faint" />
          <svg viewBox="0 0 100 100" fill="#E01B24" className="w-5 h-5 z-10 bg-ink px-1">
            <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
          </svg>
        </div>

        {/* Bottom Metadata Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-bone-dim text-center md:text-left">
          <div>
            <span>© 2026 PRAKHAR KAUSHIK / PRIKAUSHION</span>
          </div>
          <div>
            <span>DESIGNED &amp; BUILT IN NEW DELHI</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleReducedMotion}
              className="px-3 py-1.5 rounded-pill border border-bone-faint hover:border-crimson text-bone-dim hover:text-bone transition-colors flex items-center gap-2 min-h-[36px] touch-expand"
              aria-pressed={isReducedMotion}
              title="Toggle animations and motion"
            >
              <span className={`w-2 h-2 rounded-full ${isReducedMotion ? 'bg-crimson' : 'bg-bone/30'}`} />
              <span>MOTION: {isReducedMotion ? 'REDUCED' : 'NORMAL'}</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              <span className="tabular-nums">LOCAL TIME — {istTime || '10:30:00 PM IST'}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
