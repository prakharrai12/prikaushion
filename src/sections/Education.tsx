import React, { useEffect, useRef, useState } from 'react';
import { Container } from '../components/Container';
import { SectionHeader } from '../components/SectionHeader';
import { gsap } from '../lib/gsap';

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [cgpaCounter, setCgpaCounter] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Cards stagger-rise animation
      const cards = containerRef.current?.querySelectorAll<HTMLElement>('.edu-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, rotateX: 12, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // 2. CGPA Ring and counter animation
      if (ringRef.current) {
        const radius = 48;
        const circumference = 2 * Math.PI * radius;
        const targetPercent = 7.43 / 10;
        const targetOffset = circumference * (1 - targetPercent);

        gsap.set(ringRef.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });

        const counterObj = { val: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ringRef.current,
            start: 'top 85%',
            once: true,
          },
        });

        tl.to(
          ringRef.current,
          {
            strokeDashoffset: targetOffset,
            duration: 1.6,
            ease: 'expo.out',
          },
          0
        );

        tl.to(
          counterObj,
          {
            val: 7.43,
            duration: 1.6,
            ease: 'expo.out',
            onUpdate: () => {
              setCgpaCounter(Number(counterObj.val.toFixed(2)));
            },
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={containerRef}
      data-bg="grad-smoke"
      data-accent-x="80%"
      data-accent-y="80%"
      className="relative w-full py-[var(--section-y)] select-none"
      aria-label="Education, Clubs and Certifications"
    >
      <Container>
        <SectionHeader
          index="06"
          metaName="EDUCATION"
          ghostWord="LEARN"
          line1="Always"
          line2="*learning*"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8" style={{ perspective: 1000 }}>
        {/* Card 1: Academics (Cols 1-6) */}
        <div className="edu-card lg:col-span-6 rounded-lg border border-bone-faint bg-obsidian p-6 sm:p-8 md:p-12 shadow-2xl flex flex-col justify-between hover:-translate-y-2 hover:border-bone/35 hover:shadow-[0_20px_60px_-15px_rgba(224,27,36,0.25)] transition-all duration-400">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
              ACADEMIC DEGREE
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-bone leading-tight mt-3 mb-2">
              Diploma in Computer Science Engineering
            </h3>
            <p className="font-sans text-bone-dim text-lg">
              Amity University, Greater Noida Campus
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-bone-dim mt-6 pt-6 border-t border-bone-faint">
              <span>SEP 2024 — MAY 2027</span>
              <span className="text-crimson">·</span>
              <span>5TH SEMESTER</span>
              <span className="text-crimson">·</span>
              <span>CGPA 7.43 (SO FAR)</span>
            </div>
          </div>

          {/* CGPA Progress Ring */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mt-8 pt-6 border-t border-bone-faint">
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r="48"
                  fill="none"
                  stroke="#221F24"
                  strokeWidth="6"
                />
                <circle
                  ref={ringRef}
                  cx="55"
                  cy="55"
                  r="48"
                  fill="none"
                  stroke="#E01B24"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-display font-bold text-2xl text-bone tabular-nums">
                <span>{cgpaCounter.toFixed(2)}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-bone-dim">/ 10.0</span>
              </div>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-bone font-medium">
                CUMULATIVE GPA
              </div>
              <p className="font-sans text-xs text-bone-dim mt-1 max-w-[28ch]">
                Rigorous coursework spanning Algorithms, Data Structures, OOP, Web and Operating Systems.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Clubs & Leadership Roles (Cols 7-12) */}
        <div className="edu-card lg:col-span-6 rounded-lg border border-bone-faint bg-obsidian p-6 sm:p-8 md:p-12 shadow-2xl flex flex-col justify-between hover:-translate-y-2 hover:border-bone/35 hover:shadow-[0_20px_60px_-15px_rgba(224,27,36,0.25)] transition-all duration-400">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
              CAMPUS &amp; COMMUNITY
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-bone leading-tight mt-3 mb-6">
              Clubs &amp; Student Coordination
            </h3>

            <div className="flex flex-col gap-6">
              {/* Club 1: Aegis */}
              <div className="group/item flex items-start justify-between pb-6 border-b border-bone-faint cursor-default">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-xl text-bone group-hover/item:text-crimson transition-colors">
                      Aegis
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson px-2 py-0.5 border border-crimson/30 rounded-pill">
                      CORE MEMBER
                    </span>
                  </div>
                  <p className="font-sans text-sm text-bone-dim mt-1.5">
                    Student coordinator for major college events, logistics, and technical hackathons.
                  </p>
                </div>
                <svg
                  viewBox="0 0 100 100"
                  fill="#E01B24"
                  className="w-4 h-4 shrink-0 mt-1 transition-transform duration-500 group-hover/item:rotate-180"
                >
                  <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
                </svg>
              </div>

              {/* Club 2: Aarohan */}
              <div className="group/item flex items-start justify-between pb-6 border-b border-bone-faint cursor-default">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-xl text-bone group-hover/item:text-crimson transition-colors">
                      Aarohan
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bone-dim px-2 py-0.5 border border-bone-faint rounded-pill">
                      MEMBER
                    </span>
                  </div>
                  <p className="font-sans text-sm text-bone-dim mt-1.5">
                    Active participant in campus cultural initiatives and student outreach programs.
                  </p>
                </div>
                <svg
                  viewBox="0 0 100 100"
                  fill="#F4EFE4"
                  className="w-4 h-4 shrink-0 mt-1 opacity-40 transition-transform duration-500 group-hover/item:rotate-180"
                >
                  <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
                </svg>
              </div>
            </div>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-widest text-bone-dim mt-6 pt-4">
            CAMPUS LEADERSHIP · 2024 — PRESENT
          </p>
        </div>

        {/* Card 3: Courses & Certificates (Wide, Cols 1-12) */}
        <div className="edu-card lg:col-span-12 rounded-lg border border-bone-faint bg-obsidian p-6 sm:p-8 md:p-12 shadow-2xl hover:-translate-y-2 hover:border-bone/35 hover:shadow-[0_20px_60px_-15px_rgba(224,27,36,0.25)] transition-all duration-400">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
              VERIFIED CREDENTIALS
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone-dim">
              03 CERTIFICATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-bone-faint">
            <div className="flex flex-col p-4 rounded bg-charcoal/40 border border-bone-faint/50 hover:border-crimson/50 transition-colors">
              <span className="font-mono text-xs text-crimson font-medium mb-1">2024</span>
              <h4 className="font-display font-bold text-lg text-bone">
                Python &amp; AI Summer Camp
              </h4>
              <p className="font-sans text-xs text-bone-dim mt-1.5">
                Rancho Labs × IIT Delhi IHFC
              </p>
            </div>

            <div className="flex flex-col p-4 rounded bg-charcoal/40 border border-bone-faint/50 hover:border-crimson/50 transition-colors">
              <span className="font-mono text-xs text-crimson font-medium mb-1">2026</span>
              <h4 className="font-display font-bold text-lg text-bone">
                STEM Educator Internship Certificate
              </h4>
              <p className="font-sans text-xs text-bone-dim mt-1.5">
                Vision Sports School &amp; Basketball India
              </p>
            </div>

            <div className="flex flex-col p-4 rounded bg-charcoal/40 border border-bone-faint/50 hover:border-crimson/50 transition-colors">
              <span className="font-mono text-xs text-crimson font-medium mb-1">2026</span>
              <h4 className="font-display font-bold text-lg text-bone">
                NTCC Internship-I (PTCHIN101)
              </h4>
              <p className="font-sans text-xs text-bone-dim mt-1.5">
                Amity Polytechnic, AUGN Campus
              </p>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
};
