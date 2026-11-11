import React, { useEffect, useRef, useState } from 'react';
import { MagneticButton } from '../components/MagneticButton';
import { scrollToTarget } from '../lib/lenis';
import { site } from '../config/site';
import { gsap } from '../lib/gsap';
import { isTouchDevice } from '../lib/utils';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const theKRef = useRef<HTMLDivElement>(null);
  const starFieldRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  const [stars] = useState(() =>
    Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      x: (i * 23.7) % 96 + 2,
      y: (i * 37.3) % 94 + 3,
      size: (i % 4) + 2,
      isCrimson: i % 7 === 0,
      duration: 2 + (i % 4) * 0.9,
      delay: (i % 5) * 0.4,
    }))
  );

  useEffect(() => {
    const isTouch = isTouchDevice();

    // 1. Entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(kickerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0);

    const chars1 = line1Ref.current?.querySelectorAll('.char');
    const chars2 = line2Ref.current?.querySelectorAll('.char');

    if (chars1) {
      tl.fromTo(
        chars1,
        { yPercent: 110, rotateZ: 4, opacity: 0 },
        { yPercent: 0, rotateZ: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.025 },
        0.1
      );
    }

    if (chars2) {
      tl.fromTo(
        chars2,
        { yPercent: 110, rotateZ: 4, opacity: 0 },
        { yPercent: 0, rotateZ: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.025 },
        0.28
      );
    }

    tl.fromTo(line3Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.46);
    tl.fromTo(roleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.65);
    tl.fromTo(metaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.85);
    tl.fromTo(ctaRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' }, 1.0);

    if (theKRef.current) {
      tl.fromTo(
        theKRef.current,
        { scale: 0.7, opacity: 0, rotate: -8 },
        { scale: 1, opacity: 0.9, rotate: 0, duration: 1.6, ease: 'expo.out' },
        0.2
      );
    }

    // 2. The K idle sway
    if (theKRef.current) {
      gsap.to(theKRef.current, {
        rotate: '3deg',
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // 3. Mouse move interactions (THE K 3D tilt, name weight reaction, laggy glow)
    let targetGlowX = window.innerWidth * 0.7;
    let targetGlowY = window.innerHeight * 0.2;
    let currentGlowX = targetGlowX;
    let currentGlowY = targetGlowY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetGlowX = e.clientX;
      targetGlowY = e.clientY;

      if (!isTouch && theKRef.current) {
        const kRect = theKRef.current.getBoundingClientRect();
        const kCenterX = kRect.left + kRect.width / 2;
        const kCenterY = kRect.top + kRect.height / 2;
        const tiltX = -((e.clientY - kCenterY) / window.innerHeight) * 16;
        const tiltY = ((e.clientX - kCenterX) / window.innerWidth) * 16;

        gsap.to(theKRef.current, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Name variable font weight reaction
      if (!isTouch && containerRef.current) {
        const allChars = containerRef.current.querySelectorAll<HTMLElement>('.hero-name-char');
        allChars.forEach((ch) => {
          const rect = ch.getBoundingClientRect();
          const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
          if (dist < 180) {
            const wght = Math.round(800 - (dist / 180) * 500);
            ch.style.fontVariationSettings = `'opsz' 144, 'SOFT' 30, 'WONK' 1, 'wght' ${wght}`;
            // Subtle repel
            const repelX = ((rect.left + rect.width / 2 - e.clientX) / 180) * 8;
            const repelY = ((rect.top + rect.height / 2 - e.clientY) / 180) * 8;
            ch.style.transform = `translate3d(${repelX}px, ${repelY}px, 0)`;
          } else {
            ch.style.fontVariationSettings = '';
            ch.style.transform = 'translate3d(0, 0, 0)';
          }
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render loop for laggy atmospheric cursor glow
    const render = () => {
      currentGlowX += (targetGlowX - currentGlowX) * 0.05;
      currentGlowY += (targetGlowY - currentGlowY) * 0.05;

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${currentGlowX}px, ${currentGlowY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 4. Scroll-out parallax
    if (containerRef.current) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      if (line1Ref.current) scrollTl.to(line1Ref.current, { yPercent: -12, opacity: 0.4 }, 0);
      if (line2Ref.current) scrollTl.to(line2Ref.current, { yPercent: -20, opacity: 0.4 }, 0);
      if (line3Ref.current) scrollTl.to(line3Ref.current, { yPercent: -30, opacity: 0.4 }, 0);
      if (theKRef.current) {
        scrollTl.to(theKRef.current, { yPercent: -25, rotate: 18, scale: 1.15 }, 0);
      }
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      tl.kill();
    };
  }, []);

  // Click on The K bursts 12 sparkles
  const handleKClick = (e: React.MouseEvent) => {
    if (!theKRef.current) return;

    gsap.fromTo(theKRef.current, { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' });

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'fixed pointer-events-none z-[110] w-4 h-4 text-crimson';
      sparkle.innerHTML = `<svg viewBox="0 0 100 100" fill="#E01B24"><path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" /></svg>`;
      document.body.appendChild(sparkle);

      const angle = (i * 30 * Math.PI) / 180;
      const distance = 70 + Math.random() * 80;
      const targetX = originX + Math.cos(angle) * distance;
      const targetY = originY + Math.sin(angle) * distance;

      gsap.fromTo(
        sparkle,
        { left: originX, top: originY, scale: 0.3, opacity: 1, rotate: 0 },
        {
          left: targetX,
          top: targetY,
          scale: 1.3,
          opacity: 0,
          rotate: 180,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => sparkle.remove(),
        }
      );
    }
  };

  const isCvAvailable = site.resumeUrl && site.resumeUrl !== 'TODO_RESUME_PDF';

  return (
    <section
      id="home"
      ref={containerRef}
      data-bg="grad-void"
      data-accent-x="70%"
      data-accent-y="10%"
      className="relative min-h-[100svh] w-full flex flex-col justify-end pt-32 pb-16 md:pb-24 px-[var(--gutter)] overflow-hidden select-none"
      aria-label="Introduction and Hero"
    >
      {/* Laggy Atmospheric Crimson Glow */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] bg-crimson opacity-[0.16] pointer-events-none -z-10"
      />

      {/* Orbit Arc Background Line rotating 360deg / 60s */}
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[1600px] max-h-[1600px] pointer-events-none opacity-25 animate-[spin_60s_linear_infinite] -z-10"
        aria-hidden="true"
      >
        <ellipse cx="500" cy="500" rx="460" ry="240" stroke="#E01B24" strokeWidth="1" strokeDasharray="4 8" />
        <ellipse cx="500" cy="500" rx="480" ry="260" stroke="#F4EFE4" strokeWidth="0.5" opacity="0.3" />
      </svg>

      {/* Ambient Star Field */}
      <div ref={starFieldRef} className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.isCrimson ? '#E01B24' : '#F4EFE4',
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Right-Side Interactive Visual: THE K */}
      <div
        ref={theKRef}
        onClick={handleKClick}
        data-cursor="view"
        className="absolute right-[-8vw] top-[14vh] md:top-[12vh] w-[45vw] max-w-[620px] cursor-pointer z-10 select-none will-change-transform opacity-90 transition-transform duration-300"
        style={{ perspective: 1200 }}
        title="Click the starburst"
        aria-label="Interactive prikaushion K starburst"
      >
        <img
          src="./assets/brand/logo-mark-k.svg"
          alt="prikaushion red K starburst"
          className="w-full h-auto drop-shadow-[0_20px_50px_rgba(224,27,36,0.35)]"
        />
      </div>

      {/* Hero Content Block Anchored Bottom-Left */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col items-start">
        {/* Top-Left Mono Kicker with Pulsing Crimson Indicator */}
        <div
          ref={kickerRef}
          className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-bone-dim mb-6"
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
          </span>
          <span className="text-bone font-medium">AVAILABLE FOR FREELANCE — 2026</span>
        </div>

        {/* Stacked Name (Fraunces Fluid Mega) */}
        <div className="font-display leading-[0.88] tracking-[-0.035em] mb-4">
          {/* Line 1: PRAKHAR (Fraunces 300) */}
          <div ref={line1Ref} className="title-line-mask font-light text-[clamp(4.5rem,14vw,14rem)] text-bone">
            {'PRAKHAR'.split('').map((char, i) => (
              <span key={i} className="char hero-name-char inline-block will-change-transform">
                {char}
              </span>
            ))}
          </div>

          {/* Line 2: KAUSHIK (Fraunces 800 with red K) */}
          <div ref={line2Ref} className="title-line-mask font-extrabold text-[clamp(4.5rem,14vw,14rem)] text-bone mt-1">
            <span className="char hero-name-char inline-block text-crimson will-change-transform">K</span>
            {'AUSHIK'.split('').map((char, i) => (
              <span key={i} className="char hero-name-char inline-block will-change-transform">
                {char}
              </span>
            ))}
          </div>

          {/* Line 3: a.k.a. VishRim (Instrument Serif italic crimson) */}
          <div
            ref={line3Ref}
            className="font-whisper text-[clamp(2.2rem,5vw,4.5rem)] text-crimson mt-2 tracking-tight"
          >
            a.k.a. VishRim
          </div>
        </div>

        {/* Role Statement */}
        <p
          ref={roleRef}
          className="font-sans text-[clamp(1.15rem,1.6vw,1.6rem)] text-bone-dim max-w-[38ch] leading-relaxed mb-6"
        >
          I design and build frontends that feel expensive — and teach the next generation to code.
        </p>

        {/* Meta Row (Mono caps with sparkle dividers) */}
        <div
          ref={metaRef}
          className="flex flex-wrap items-center gap-3 md:gap-4 font-mono text-xs uppercase tracking-widest text-bone-dim mb-10"
        >
          <span>NEW DELHI, IN</span>
          <svg viewBox="0 0 100 100" fill="#E01B24" className="w-3 h-3">
            <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
          </svg>
          <span>FRONTEND DEV</span>
          <svg viewBox="0 0 100 100" fill="#E01B24" className="w-3 h-3">
            <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
          </svg>
          <span>EDUCATOR</span>
        </div>

        {/* CTA Group */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          {/* Primary CTA: "See my work" */}
          <MagneticButton
            as="a"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#projects');
            }}
            strength={0.3}
            data-cursor="link"
            className="h-14 px-8 rounded-pill bg-crimson text-ink font-mono text-xs uppercase tracking-widest font-semibold hover:bg-bone transition-all duration-300 shadow-[0_10px_30px_rgba(224,27,36,0.3)] group"
          >
            <span>See my work</span>
            <span className="ml-2 inline-block group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </MagneticButton>

          {/* Secondary CTA: "Download CV" */}
          <div className="relative group">
            <MagneticButton
              as="a"
              href={isCvAvailable ? site.resumeUrl : undefined}
              target={isCvAvailable ? '_blank' : undefined}
              rel={isCvAvailable ? 'noopener noreferrer' : undefined}
              strength={0.3}
              data-cursor={isCvAvailable ? 'link' : undefined}
              disabled={!isCvAvailable}
              className={`h-14 px-8 rounded-pill border border-bone-faint font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                isCvAvailable
                  ? 'text-bone hover:border-crimson hover:text-crimson'
                  : 'text-bone/40 border-bone/20 cursor-not-allowed opacity-60'
              }`}
            >
              <span>Download CV</span>
            </MagneticButton>

            {!isCvAvailable && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-charcoal border border-bone-faint text-bone-dim text-[10px] font-mono tracking-widest uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                CV coming soon
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom-Right Scroll Cue */}
      <div className="hidden md:flex absolute right-8 bottom-12 flex-col items-center gap-3 font-mono text-[10px] tracking-widest text-bone-dim select-none pointer-events-none">
        <span className="rotate-[-90deg] origin-center translate-y-3">SCROLL</span>
        <div className="w-[1px] h-14 bg-bone-faint overflow-hidden">
          <div className="w-full h-full bg-crimson animate-[scrollCue_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
