import React, { useEffect, useState, useRef } from 'react';
import { MagneticButton } from './MagneticButton';
import { scrollToTarget } from '../lib/lenis';
import { site } from '../config/site';

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Toolkit', href: '#toolkit', id: 'toolkit' },
  { label: 'Socials', href: '#socials', id: 'socials' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverPaper, setIsOverPaper] = useState(false);
  const [isKHovered, setIsKHovered] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // >80px backdrop glass
      setIsScrolled(currentY > 80);

      // Hide on scroll down, show on scroll up
      const diff = currentY - lastScrollY.current;
      if (Math.abs(diff) > 12) {
        if (diff > 0 && currentY > 120 && !isMobileMenuOpen) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
        lastScrollY.current = currentY;
      }

      // Check if Contact (paper) is under nav
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 60) {
          setIsOverPaper(true);
        } else {
          setIsOverPaper(false);
        }
      }

      // Determine active nav link
      const scrollThreshold = currentY + 160;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && scrollThreshold >= el.offsetTop) {
          setActiveId(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    scrollToTarget(href, -80);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[84px] z-[80] px-[var(--gutter)] flex items-center justify-between transition-all duration-500 ease-out ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'bg-[#0A0A0B]/65 backdrop-blur-[14px] saturate-[120%] border-b border-bone-faint shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        {/* Left: Wordmark "prikaushion" with live interactive red K */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center font-display font-extrabold text-[22px] tracking-tight select-none focus:outline-none"
          aria-label="prikaushion homepage"
        >
          <span className={isOverPaper ? 'text-ink transition-colors' : 'text-bone transition-colors'}>
            pri
          </span>
          <span
            onMouseEnter={() => setIsKHovered(true)}
            onMouseLeave={() => setIsKHovered(false)}
            className="relative inline-block text-crimson text-[1.14em] font-black transition-transform duration-300 ease-out group-hover:rotate-[20deg] group-hover:scale-125"
          >
            k
            {/* Pop-up sparkle top-right on hover */}
            <svg
              viewBox="0 0 100 100"
              fill="#E01B24"
              className={`absolute -top-2 -right-3 w-3 h-3 transition-all duration-300 pointer-events-none ${
                isKHovered ? 'opacity-100 scale-100 rotate-45' : 'opacity-0 scale-0'
              }`}
            >
              <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
            </svg>
          </span>
          <span className={isOverPaper ? 'text-ink transition-colors' : 'text-bone transition-colors'}>
            aushion
          </span>
        </a>

        {/* Center / Right Links (Desktop >= 900px) */}
        <nav className="hidden lg:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em]">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative flex items-center py-3 min-h-[44px] touch-expand transition-colors duration-300 group ${
                  isActive
                    ? isOverPaper ? 'text-ink font-semibold' : 'text-bone font-semibold'
                    : isOverPaper ? 'text-ink/60 hover:text-ink' : 'text-bone-dim hover:text-bone'
                }`}
              >
                {/* 6px Crimson Active Dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson mr-2 -ml-3.5 inline-block animate-pulse" />
                )}
                <span>{link.label}</span>
                {/* Hairline underline on hover */}
                <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-crimson origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            );
          })}
        </nav>

        {/* Far Right: "Hire me" Magnetic Pill Button + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <MagneticButton
            as="a"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            strength={0.3}
            data-cursor="link"
            className="hidden sm:inline-flex px-5 py-2.5 min-h-[44px] items-center rounded-pill border border-crimson text-crimson hover:bg-crimson hover:text-ink font-mono text-xs uppercase tracking-widest transition-all duration-300 group"
          >
            <span>Hire me</span>
            <span className="ml-1.5 inline-block group-hover:rotate-45 transition-transform duration-300">↗</span>
          </MagneticButton>

          {/* Mobile Hamburger Button (< 900px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 min-w-[44px] min-h-[44px] text-bone focus:outline-none z-50 flex flex-col justify-center items-center gap-1.5 touch-expand"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-[1.5px] bg-bone transition-transform duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-bone transition-transform duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 h-[100dvh] z-[75] bg-ink flex flex-col justify-between p-8 pt-28 lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Crimson glow in bottom left */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-crimson/15 blur-3xl pointer-events-none" />

        {/* Links Stack */}
        <div className="flex flex-col gap-3 z-10 overflow-y-auto max-h-[60vh] py-2">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group flex items-baseline gap-4 py-2 min-h-[44px] touch-expand font-display font-extrabold text-[clamp(2.2rem,7vw,4rem)] text-bone hover:text-crimson transition-colors leading-none"
            >
              <span className="font-mono text-xs tracking-widest text-crimson">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom Details Row */}
        <div className="pt-6 border-t border-bone-faint font-mono text-xs uppercase tracking-widest text-bone-dim flex flex-wrap justify-between gap-4 z-10">
          <div className="flex flex-wrap gap-4">
            <a href={site.socials.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson">
              GitHub ↗
            </a>
            <a href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson">
              LinkedIn ↗
            </a>
            <a href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-crimson">
              Instagram ↗
            </a>
            <a href={site.socials.email.url} className="hover:text-crimson">
              {site.email}
            </a>
          </div>
          <span className="text-crimson">EST. 2026 — DELHI</span>
        </div>
      </div>
    </>
  );
};

