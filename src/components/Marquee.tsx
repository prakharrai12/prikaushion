import React, { useEffect, useRef } from 'react';

export const Marquee: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let velocity = 0;
    let currentX1 = 0;
    let currentX2 = -2000;
    let animationId: number;
    let isRow1Hovered = false;
    let isRow2Hovered = false;

    const row1El = row1Ref.current;
    const row2El = row2Ref.current;

    const onMouseEnter1 = () => { isRow1Hovered = true; };
    const onMouseLeave1 = () => { isRow1Hovered = false; };
    const onMouseEnter2 = () => { isRow2Hovered = true; };
    const onMouseLeave2 = () => { isRow2Hovered = false; };

    row1El?.addEventListener('mouseenter', onMouseEnter1);
    row1El?.addEventListener('mouseleave', onMouseLeave1);
    row2El?.addEventListener('mouseenter', onMouseEnter2);
    row2El?.addEventListener('mouseleave', onMouseLeave2);

    const onScroll = () => {
      const currentScroll = window.scrollY;
      velocity = currentScroll - lastScroll;
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      // Decay velocity
      velocity *= 0.92;
      const speedMultiplier = Math.min(4, Math.max(1, 1 + Math.abs(velocity) * 0.04));
      const direction = velocity < -1 ? -1 : 1;

      if (!isRow1Hovered && row1El) {
        // Move row 1 left
        currentX1 -= 1.2 * speedMultiplier * direction;
        // wrap around
        if (currentX1 < -row1El.scrollWidth / 2) {
          currentX1 += row1El.scrollWidth / 2;
        } else if (currentX1 > 0) {
          currentX1 -= row1El.scrollWidth / 2;
        }
        row1El.style.transform = `translate3d(${currentX1}px, 0, 0)`;
      }

      if (!isRow2Hovered && row2El) {
        // Move row 2 right
        currentX2 += 0.9 * speedMultiplier * direction;
        if (currentX2 > 0) {
          currentX2 -= row2El.scrollWidth / 2;
        } else if (currentX2 < -row2El.scrollWidth / 2) {
          currentX2 += row2El.scrollWidth / 2;
        }
        row2El.style.transform = `translate3d(${currentX2}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
      row1El?.removeEventListener('mouseenter', onMouseEnter1);
      row1El?.removeEventListener('mouseleave', onMouseLeave1);
      row2El?.removeEventListener('mouseenter', onMouseEnter2);
      row2El?.removeEventListener('mouseleave', onMouseLeave2);
    };
  }, []);

  const row1Phrases = [
    'FRONTEND DEVELOPMENT',
    'UI/UX DESIGN',
    'REACT',
    'INTERACTIVE WEB',
    'EDUCATION',
    'IoT TINKERING',
  ];

  const row2Phrases = [
    'PRIKAUSHION',
    'BUILT IN NEW DELHI',
    'OPEN FOR PROJECTS',
    'PRIKAUSHION',
    'CRAFTED NOT GENERATED',
  ];

  const renderRow1Chunk = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex shrink-0 items-center gap-8 md:gap-14">
      {row1Phrases.map((phrase, idx) => (
        <span key={idx} className="flex items-center gap-8 md:gap-14">
          <span className="font-display font-extrabold text-[clamp(1.75rem,4vw,3.5rem)] text-bone uppercase tracking-tight whitespace-nowrap hover:text-crimson transition-colors duration-200">
            {phrase}
          </span>
          <svg viewBox="0 0 100 100" fill="#E01B24" className="w-5 h-5 md:w-6 md:h-6 shrink-0">
            <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
          </svg>
        </span>
      ))}
    </div>
  );

  const renderRow2Chunk = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex shrink-0 items-center gap-8 md:gap-14">
      {row2Phrases.map((phrase, idx) => (
        <span key={idx} className="flex items-center gap-8 md:gap-14">
          <span className="font-display font-light italic text-[clamp(1.5rem,3.2vw,3rem)] text-ghost uppercase tracking-wide whitespace-nowrap hover:text-crimson hover:[-webkit-text-stroke:0] transition-colors duration-200">
            {phrase}
          </span>
          <svg viewBox="0 0 100 100" fill="#F4EFE4" className="w-4 h-4 md:w-5 md:h-5 shrink-0 opacity-40">
            <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="relative w-full py-8 md:py-10 border-y border-bone-faint bg-ink/40 backdrop-blur-sm overflow-hidden select-none z-10"
      aria-label="Marquee highlighting frontend development and studio focus"
    >
      {/* Row 1 -> Left */}
      <div className="w-full overflow-hidden flex items-center mb-3">
        <div ref={row1Ref} className="flex items-center gap-8 md:gap-14 will-change-transform">
          {renderRow1Chunk('r1-a')}
          {renderRow1Chunk('r1-b')}
          {renderRow1Chunk('r1-c')}
        </div>
      </div>

      {/* Row 2 -> Right */}
      <div className="w-full overflow-hidden flex items-center">
        <div ref={row2Ref} className="flex items-center gap-8 md:gap-14 will-change-transform">
          {renderRow2Chunk('r2-a')}
          {renderRow2Chunk('r2-b')}
          {renderRow2Chunk('r2-c')}
        </div>
      </div>
    </section>
  );
};
