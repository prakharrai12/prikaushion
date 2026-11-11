import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface SectionBridgeProps {
  nextSection: string;
}

export const SectionBridge: React.FC<SectionBridgeProps> = ({ nextSection }) => {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!bridgeRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const trigger = ScrollTrigger.create({
      trigger: bridgeRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const offset = length * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: offset });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const marqueeItems = Array(12).fill(`NEXT — ${nextSection}`);

  return (
    <div
      ref={bridgeRef}
      className="relative w-full h-[18vh] min-h-[120px] flex items-center overflow-hidden pointer-events-none select-none my-8 md:my-16"
      aria-hidden="true"
    >
      {/* Self-drawing Thin Crimson Orbit Arc echoing logo swoosh */}
      <svg
        viewBox="0 0 1440 180"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-40"
      >
        <path
          ref={pathRef}
          d="M -100 140 C 400 180, 1000 -20, 1540 60"
          stroke="#E01B24"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Marquee Track */}
      <div className="w-full overflow-hidden flex pointer-events-auto">
        <div className="flex shrink-0 gap-8 items-center animate-[marqueeBridge_28s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 shrink-0">
              <svg viewBox="0 0 100 100" fill="#E01B24" className="w-3.5 h-3.5 shrink-0 opacity-70">
                <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-bone/35 hover:text-bone transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-8 items-center animate-[marqueeBridge_28s_linear_infinite] hover:[animation-play-state:paused]" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-6 shrink-0">
              <svg viewBox="0 0 100 100" fill="#E01B24" className="w-3.5 h-3.5 shrink-0 opacity-70">
                <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-bone/35 hover:text-bone transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

