import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { experiences } from '../config/experience';
import { gsap } from '../lib/gsap';

export const Work: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Scrubbed vertical crimson timeline line fill
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top 65%',
              end: 'bottom 85%',
              scrub: 1,
            },
          }
        );
      }

      // 2. Animate each timeline row on scroll
      const rows = container.querySelectorAll<HTMLElement>('.timeline-row');
      rows.forEach((row) => {
        const dateEl = row.querySelector('.row-date');
        const roleEl = row.querySelector('.row-role');
        const descEl = row.querySelector('.row-desc');
        const tags = row.querySelectorAll('.row-tag');
        const node = row.querySelector('.timeline-node');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true,
          },
        });

        if (dateEl) {
          tl.fromTo(dateEl, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, 0);
        }
        if (roleEl) {
          tl.fromTo(roleEl, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }, 0.1);
        }
        if (descEl) {
          tl.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.2);
        }
        if (tags && tags.length) {
          tl.fromTo(tags, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)' }, 0.35);
        }
        if (node) {
          tl.to(node, { borderColor: '#E01B24', backgroundColor: '#E01B24', duration: 0.4 }, 0.2);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Row cursor spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <section
      id="work"
      ref={containerRef}
      data-bg="grad-smoke"
      data-accent-x="50%"
      data-accent-y="50%"
      className="relative w-full py-[clamp(96px,14vw,220px)] px-[var(--gutter)] max-w-[1440px] mx-auto select-none"
      aria-label="Work & Experience"
    >
      <SectionHeader
        index="02"
        metaName="WORK &amp; EXPERIENCE"
        ghostWord="WORK"
        line1="Where I've"
        line2="put in the *hours*"
      />

      {/* Vertical Interactive Timeline */}
      <div className="relative pl-6 md:pl-12 mt-12 flex flex-col gap-14 md:gap-20">
        {/* Full-Height Vertical Guide Line */}
        <div className="absolute left-2 md:left-4 top-2 bottom-6 w-[1px] bg-bone-faint origin-top">
          {/* Crimson fill growing with scroll */}
          <div
            ref={timelineLineRef}
            className="absolute inset-0 bg-crimson origin-top scale-y-0"
          />
        </div>

        {experiences.map((exp, idx) => {
          const isHovered = hoveredIdx === idx;
          const isOtherHovered = hoveredIdx !== null && hoveredIdx !== idx;

          return (
            <div
              key={exp.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseMove={handleMouseMove}
              className={`timeline-row relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 p-6 md:p-8 rounded-md transition-all duration-400 group overflow-hidden border border-transparent ${
                isOtherHovered ? 'opacity-35' : 'opacity-100'
              } ${isHovered ? 'border-bone/20 bg-charcoal/40 shadow-2xl' : ''}`}
              style={{
                background: isHovered
                  ? `radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(224, 27, 36, 0.12), transparent 70%)`
                  : undefined,
              }}
            >
              {/* Timeline Node on Left Line */}
              <div
                className="timeline-node absolute -left-[27px] md:-left-[51px] top-9 w-3 h-3 rounded-full border border-bone-faint bg-ink transition-all duration-300 z-10"
              />

              {/* Left Column (Cols 1-3): Date & Location */}
              <div className="row-date md:col-span-4 flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
                  {exp.date}
                </span>
                {exp.location && (
                  <span className="font-mono text-[11px] uppercase tracking-wider text-bone-dim mt-1">
                    {exp.location}
                  </span>
                )}
              </div>

              {/* Right Column (Cols 4-12): Role, Org, Description, Tags */}
              <div className="md:col-span-8 flex flex-col">
                <div className="overflow-hidden">
                  <h3
                    className={`row-role font-display font-extrabold text-2xl md:text-3xl text-bone transition-transform duration-300 ${
                      isHovered ? 'translate-x-3 text-crimson-glow' : 'translate-x-0'
                    }`}
                  >
                    {exp.role}
                  </h3>
                </div>

                <div className="font-mono text-xs uppercase tracking-widest text-bone-dim mt-1.5 mb-3">
                  {exp.org}
                </div>

                <p className="row-desc font-sans text-bone-dim text-[1.0625rem] leading-[1.7] max-w-[62ch]">
                  {exp.description}
                </p>

                {/* Stack Chips */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="row-tag px-3 py-1 rounded-pill border border-bone-faint bg-obsidian/60 font-mono text-[11px] uppercase tracking-wider text-bone-dim hover:border-crimson hover:text-crimson transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
