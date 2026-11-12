import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface SectionHeaderProps {
  index: string; // e.g. "01"
  metaName: string; // e.g. "ABOUT ME"
  ghostWord: string; // e.g. "ABOUT"
  line1: string; // e.g. "The person"
  line2: string; // e.g. "behind the *pixels*"
  intro?: string;
  theme?: 'dark' | 'paper';
  stickyMini?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  metaName,
  ghostWord,
  line1,
  line2,
  intro,
  theme = 'dark',
  stickyMini = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hairlineFillRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const digitRollRef = useRef<HTMLSpanElement>(null);

  const [showStickyMini, setShowStickyMini] = useState(false);

  // Helper to parse line2 for *asterisks* (whisper italic word)
  const parseLineWithWhisper = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        const word = part.slice(1, -1);
        return (
          <span
            key={pIdx}
            className="whisper-word font-whisper font-normal text-crimson inline-block px-1 tracking-tight"
          >
            {word.split('').map((char, cIdx) => (
              <span key={cIdx} className="char inline-block will-change-transform">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        );
      }
      return (
        <span key={pIdx} className="inline-block">
          {part.split('').map((char, cIdx) => (
            <span key={cIdx} className="char inline-block will-change-transform">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      );
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Ghost word parallax scrub
      if (ghostRef.current) {
        gsap.fromTo(
          ghostRef.current,
          { x: '8vw' },
          {
            x: '-8vw',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 2. Section enter timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Hairline draw + sparkle
      if (hairlineFillRef.current) {
        tl.fromTo(
          hairlineFillRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: 'expo.inOut' },
          0
        );
      }

      if (sparkleRef.current) {
        tl.fromTo(
          sparkleRef.current,
          { scale: 0, rotate: -90, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
          1.0
        );
      }

      // Title characters animation
      const line1Chars = titleRef.current?.querySelectorAll('.line-1 .char');
      const line2Chars = titleRef.current?.querySelectorAll('.line-2 .char');
      const whisperWords = titleRef.current?.querySelectorAll('.whisper-word');

      if (line1Chars && line1Chars.length) {
        gsap.set(line1Chars, { yPercent: 110, rotateZ: 4, opacity: 0 });
        tl.to(
          line1Chars,
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.02,
          },
          0.1
        );
      }

      if (line2Chars && line2Chars.length) {
        gsap.set(line2Chars, { yPercent: 110, rotateZ: 4, opacity: 0 });
        tl.to(
          line2Chars,
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.02,
          },
          0.28
        );
      }

      if (whisperWords && whisperWords.length) {
        tl.fromTo(
          whisperWords,
          { letterSpacing: '0.2em' },
          { letterSpacing: '-0.01em', duration: 1.4, ease: 'power4.out' },
          0.3
        );
      }

      // Intro line fade up
      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.5
        );
      }

      // Digit-roll animation on index entry
      if (digitRollRef.current) {
        tl.fromTo(
          digitRollRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'back.out(2)' },
          0.1
        );
      }

      // Sticky mini header tracking for long sections
      if (stickyMini && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'bottom top+=100',
          endTrigger: containerRef.current.closest('section') || undefined,
          end: 'bottom top+=160',
          onToggle: (self) => setShowStickyMini(self.isActive),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [line1, line2, stickyMini]);

  const isPaper = theme === 'paper';

  return (
    <div ref={containerRef} className="relative w-full mb-16 md:mb-24 select-none">
      {/* Sticky Mini Header for long sections */}
      {stickyMini && (
        <div
          className={`fixed top-[92px] left-[clamp(20px,5vw,80px)] z-30 flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-obsidian/90 backdrop-blur-md border border-bone-faint font-mono text-[11px] uppercase tracking-widest text-bone shadow-2xl transition-all duration-300 pointer-events-none ${
            showStickyMini ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
          aria-hidden="true"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
          <span className="text-crimson font-medium">({index})</span>
          <span className="text-bone-dim">{metaName}</span>
        </div>
      )}

      {/* 1. Meta Row */}
      <div className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-widest pb-3.5">
        <div className="flex items-center gap-3">
          <span className="text-crimson font-medium inline-flex items-center overflow-hidden h-4">
            <span>(</span>
            <span ref={digitRollRef} className="inline-block will-change-transform">
              {index}
            </span>
            <span>)</span>
          </span>
          <span className={isPaper ? 'text-ink/70' : 'text-bone/70'}>{metaName}</span>
        </div>
        <div className={`flex items-center gap-1.5 ${isPaper ? 'text-ink/60' : 'text-bone/60'}`}>
          <span>SCROLL</span>
          <span className="inline-block animate-bounce text-crimson">↓</span>
        </div>
      </div>

      {/* 2. Hairline Rule with Drawing Crimson Overlay & Sparkle */}
      <div className="relative w-full h-[1px] bg-bone-faint mb-8 md:mb-12">
        <div
          ref={hairlineFillRef}
          className="absolute inset-0 bg-crimson origin-left h-[1px]"
        />
        <div
          ref={sparkleRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-crimson pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full animate-[spin_14s_linear_infinite]">
            <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
          </svg>
        </div>
      </div>

      {/* 3. Giant Ghost Word Parallax */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className={`absolute -top-12 md:-top-20 left-[-2vw] font-display font-black text-ghost pointer-events-none whitespace-nowrap text-[clamp(5rem,16vw,16rem)] leading-none -z-10 ${
          isPaper ? 'text-ghost-paper' : 'text-ghost'
        }`}
      >
        {ghostWord}
      </div>

      {/* 4. Two-Line Section Title */}
      <h2
        ref={titleRef}
        className={`font-display tracking-tight leading-[0.92] ${
          isPaper ? 'text-ink' : 'text-bone'
        }`}
        style={{ fontSize: 'var(--fs-title)' }}
      >
        <span className="title-line-mask line-1 font-light block">
          {line1.split('').map((char, idx) => (
            <span key={idx} className="char inline-block will-change-transform">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="title-line-mask line-2 font-extrabold block mt-1">
          {parseLineWithWhisper(line2)}
        </span>
      </h2>

      {/* 5. Intro line */}
      {intro && (
        <p
          ref={introRef}
          className={`mt-6 md:mt-8 font-sans text-[clamp(1.1rem,1.5vw,1.4rem)] leading-relaxed max-w-[46ch] ${
            isPaper ? 'text-ink/75' : 'text-bone-dim'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
};
