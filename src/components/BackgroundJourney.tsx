import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const GRADIENTS: Record<string, string> = {
  'grad-void': 'radial-gradient(120% 80% at 70% 10%, #1a0d10 0%, #0A0A0B 55%)',
  'grad-ember-haze': 'radial-gradient(90% 70% at 20% 0%, rgba(122,15,24,0.55) 0%, rgba(10,10,11,0) 60%), #0A0A0B',
  'grad-smoke': 'linear-gradient(180deg, #0F0E10 0%, #161417 100%)',
  'grad-oxblood-deep': 'linear-gradient(180deg, #0A0A0B 0%, #2a070c 55%, #4A0A10 100%)',
  'grad-wine-spot': 'radial-gradient(70% 60% at 85% 40%, rgba(224,27,36,0.28) 0%, rgba(74,10,16,0.35) 35%, #0A0A0B 75%)',
  'grad-paper': 'linear-gradient(180deg, #F4EFE4 0%, #EDE6D6 100%)',
  'ink': '#0A0A0B',
};

export const BackgroundJourney: React.FC = () => {
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // Wait for DOM to render sections
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>('[data-bg]');
      if (!sections.length) return;

      // Set initial gradient on layer A
      const initialBgName = sections[0].getAttribute('data-bg') || 'grad-void';
      if (layerARef.current) {
        layerARef.current.style.background = GRADIENTS[initialBgName] || initialBgName;
      }

      sections.forEach((section, index) => {
        if (index === 0) return;

        const bgName = section.getAttribute('data-bg') || 'grad-void';
        const targetGradient = GRADIENTS[bgName] || bgName;
        const glowX = section.getAttribute('data-accent-x') || '50%';
        const glowY = section.getAttribute('data-accent-y') || '50%';
        const isPaper = bgName === 'grad-paper';

        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1.2,
          onEnter: () => {
            if (layerBRef.current) {
              layerBRef.current.style.background = targetGradient;
            }
            if (isPaper) {
              document.documentElement.setAttribute('data-theme', 'paper');
            } else {
              document.documentElement.removeAttribute('data-theme');
            }
          },
          onEnterBack: () => {
            if (layerBRef.current) {
              layerBRef.current.style.background = targetGradient;
            }
            if (isPaper) {
              document.documentElement.setAttribute('data-theme', 'paper');
            } else {
              document.documentElement.removeAttribute('data-theme');
            }
          },
          onLeaveBack: () => {
            const prevSec = sections[index - 1];
            const prevBg = prevSec?.getAttribute('data-bg') || 'grad-void';
            if (prevBg === 'grad-paper') {
              document.documentElement.setAttribute('data-theme', 'paper');
            } else {
              document.documentElement.removeAttribute('data-theme');
            }
          },
          onUpdate: (self) => {
            if (layerBRef.current) {
              gsap.set(layerBRef.current, { opacity: self.progress });
            }
            // Drifting light source coordinate
            document.documentElement.style.setProperty('--glow-x', glowX);
            document.documentElement.style.setProperty('--glow-y', glowY);

            // Subtle projector flicker boost at boundary
            const flicker = 0.07 + Math.sin(self.progress * Math.PI) * 0.03;
            document.documentElement.style.setProperty('--noise-boost', flicker.toFixed(3));
          },
          onLeave: () => {
            // Commit B to A and reset B
            if (layerARef.current) {
              layerARef.current.style.background = targetGradient;
            }
            if (layerBRef.current) {
              gsap.set(layerBRef.current, { opacity: 0 });
            }
          },
        });
      });
    }, 400);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      id="bg-journey"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Layer A */}
      <div
        ref={layerARef}
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ background: GRADIENTS['grad-void'] }}
      />

      {/* Cross-fade Layer B */}
      <div
        ref={layerBRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out"
      />

      {/* Atmospheric Drifting Ambient Glow */}
      <div
        ref={glowRef}
        className="absolute w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] opacity-[0.16] bg-crimson transition-all duration-1000 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 'var(--glow-x, 70%)',
          top: 'var(--glow-y, 10%)',
        }}
      />
    </div>
  );
};

