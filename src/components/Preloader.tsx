import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const seamLineRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReturning = sessionStorage.getItem('prikaushion_seen') === '1';

    // Show skip button after 1s
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('prikaushion_seen', '1');
        onComplete();
      },
    });

    if (isReturning) {
      // Short 0.9s version for returning visitors
      tl.to({}, {
        duration: 0.4,
        onUpdate: function () {
          setCounter(Math.floor(this.progress() * 100));
        },
      });
      tl.to(logoRef.current, { opacity: 0, scale: 1.05, duration: 0.25 });
      tl.to([curtainTopRef.current, curtainBottomRef.current], {
        yPercent: (i) => (i === 0 ? -100 : 100),
        duration: 0.6,
        ease: 'expo.inOut',
      });
    } else {
      // Full 3.6s orchestral sequence
      // 1. Logo fades in (0.2s -> 1.0s)
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out' },
        0.2
      );

      // 2. Counter 000 -> 100 (0.4s -> 2.6s)
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 2.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            setCounter(Math.floor(counterObj.val));
          },
        },
        0.4
      );

      // 3. Progress bar scaleX 0 -> 1 (0.6s -> 2.6s)
      if (progressLineRef.current) {
        tl.fromTo(
          progressLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 2.0, ease: 'power2.inOut' },
          0.6
        );
      }

      // 4. Sparkles pulse around logo (1.2s)
      const sparkleEls = sparklesRef.current?.children;
      if (sparkleEls && sparkleEls.length) {
        tl.fromTo(
          sparkleEls,
          { scale: 1 },
          {
            scale: 1.4,
            duration: 0.4,
            yoyo: true,
            repeat: 1,
            stagger: 0.12,
            ease: 'sine.inOut',
          },
          1.2
        );
      }

      // 5. Logo scales up and fades out (2.7s)
      tl.to(
        logoRef.current,
        { scale: 1.08, opacity: 0, duration: 0.5, ease: 'power2.in' },
        2.7
      );

      // 6. Flash crimson seam line (3.0s)
      if (seamLineRef.current) {
        tl.fromTo(
          seamLineRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.15, ease: 'expo.out' },
          2.95
        );
        tl.to(seamLineRef.current, { opacity: 0, duration: 0.4 }, 3.1);
      }

      // 7. Curtain split top/bottom (3.0s -> 3.9s)
      tl.to(
        curtainTopRef.current,
        { yPercent: -100, duration: 0.95, ease: 'expo.inOut' },
        3.0
      );
      tl.to(
        curtainBottomRef.current,
        { yPercent: 100, duration: 0.95, ease: 'expo.inOut' },
        3.0
      );
    }

    return () => {
      clearTimeout(skipTimer);
      tl.kill();
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('prikaushion_seen', '1');
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 z-[120] pointer-events-auto select-none overflow-hidden"
      aria-label="Preloader animation"
    >
      {/* Top Half of Curtain (Cream Paper with subtle grain) */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#F4EFE4] will-change-transform z-10"
      />

      {/* Bottom Half of Curtain (Cream Paper with subtle grain) */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#F4EFE4] will-change-transform z-10"
      />

      {/* Crimson Seam Line */}
      <div
        ref={seamLineRef}
        className="absolute top-1/2 left-0 right-0 h-[2px] bg-crimson -translate-y-1/2 z-30 opacity-0 pointer-events-none"
      />

      {/* Center Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
        {/* Skip Button Top-Right */}
        {showSkip && (
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/60 hover:text-crimson transition-colors z-30"
          >
            [ SKIP INTRO ↗ ]
          </button>
        )}

        {/* Logo and Sparkle Pulse Layer */}
        <div ref={logoRef} className="relative flex flex-col items-center justify-center max-w-[420px] w-full px-6">
          <img
            src="./assets/brand/logo-original.png"
            alt="PRIKAUSHION"
            className="w-full h-auto object-contain drop-shadow-sm"
          />

          {/* Decorative Sparkles positioned around logo */}
          <div ref={sparklesRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="#E01B24" className="absolute -top-3 right-6 w-5 h-5">
              <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
            </svg>
            <svg viewBox="0 0 100 100" fill="#0A0A0B" className="absolute top-12 -left-3 w-4 h-4">
              <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
            </svg>
            <svg viewBox="0 0 100 100" fill="#E01B24" className="absolute -bottom-2 left-10 w-4 h-4">
              <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
            </svg>
            <svg viewBox="0 0 100 100" fill="#0A0A0B" className="absolute bottom-6 -right-4 w-5 h-5">
              <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
            </svg>
          </div>
        </div>

        {/* Bottom Bar: Loading Count + EST Meta */}
        <div className="absolute bottom-10 left-8 right-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#0A0A0B]/80 z-20">
          <div className="flex items-center gap-3">
            <span className="tabular-nums font-semibold text-crimson">
              {String(counter).padStart(3, '0')}
            </span>
            <span className="hidden sm:inline text-[#0A0A0B]/50">—</span>
            <span>LOADING THE EXPERIENCE</span>
          </div>
          <div>
            <span>EST. 2026 — NEW DELHI</span>
          </div>
        </div>

        {/* 1px Crimson Progress Line Bottom Edge */}
        <div
          ref={progressLineRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson origin-left z-20"
        />
      </div>
    </div>
  );
};

