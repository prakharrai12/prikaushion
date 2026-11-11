import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { site } from '../config/site';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  const [counterValues, setCounterValues] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Portrait reveal clip-path wipe & parallax inside arched frame
      if (portraitFrameRef.current && portraitImgRef.current) {
        gsap.fromTo(
          portraitFrameRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: portraitFrameRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          portraitImgRef.current,
          { scale: 1.35, yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: portraitFrameRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 2. Paragraph reading focus effect
      const paras = paragraphsRef.current?.querySelectorAll<HTMLElement>('.focus-para');
      paras?.forEach((para) => {
        gsap.fromTo(
          para,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: para,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 0.5,
            },
          }
        );
      });

      // 3. Stats counter animation
      if (statsRef.current) {
        const statsTargets = [10, 8, 4, 2026];
        const dummy = { c0: 0, c1: 0, c2: 0, c3: 0 };

        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(dummy, {
              c0: statsTargets[0],
              c1: statsTargets[1],
              c2: statsTargets[2],
              c3: statsTargets[3],
              duration: 2.0,
              ease: 'power2.out',
              onUpdate: () => {
                setCounterValues([
                  Math.floor(dummy.c0),
                  Math.floor(dummy.c1),
                  Math.floor(dummy.c2),
                  Math.floor(dummy.c3),
                ]);
              },
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Portrait 3D mouse tilt
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitFrameRef.current) return;
    const rect = portraitFrameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    gsap.to(portraitFrameRef.current, {
      rotateY: x,
      rotateX: y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handlePortraitMouseLeave = () => {
    if (!portraitFrameRef.current) return;
    gsap.to(portraitFrameRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      data-bg="grad-ember-haze"
      data-accent-x="20%"
      data-accent-y="0%"
      className="relative w-full py-[clamp(96px,14vw,220px)] px-[var(--gutter)] max-w-[1440px] mx-auto select-none"
      aria-label="About Prakhar Kaushik"
    >
      <SectionHeader
        index="01"
        metaName="ABOUT ME"
        ghostWord="ABOUT"
        line1="The person"
        line2="behind the *pixels*"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        {/* Left Column (Cols 1-5): Sticky Arched Portrait */}
        <div className="lg:col-span-5 lg:sticky lg:top-[12vh]">
          <div className="relative mx-auto max-w-[420px] lg:max-w-none">
            {/* Echo Frame offset 14px outside with 1px bone border at 18% opacity */}
            <div
              className="absolute -inset-3.5 rounded-t-[999px] rounded-b-none border border-bone/18 pointer-events-none"
              aria-hidden="true"
            />

            {/* Arched Frame Doorway Shape */}
            <div
              ref={portraitFrameRef}
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              data-cursor="view"
              className="relative w-full aspect-[4/5] rounded-t-[999px] rounded-b-none overflow-hidden bg-charcoal border border-bone-faint shadow-2xl group transition-transform duration-300 will-change-transform"
              style={{ perspective: 1000 }}
            >
              <img
                ref={portraitImgRef}
                src="./assets/images/prakhar-portrait.webp"
                srcSet="./assets/images/prakhar-portrait-700.webp 700w, ./assets/images/prakhar-portrait.webp 1400w"
                sizes="(max-width: 900px) 100vw, 420px"
                alt="Prakhar Kaushik at Faraway International Hackathon"
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.15] contrast-[1.08] saturate-[0.9] transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Bottom Dark-to-Transparent Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-[#0A0A0B]/30 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Red-tinted Multiply Layer on Hover (12% opacity) */}
              <div
                className="absolute inset-0 bg-crimson opacity-0 group-hover:opacity-[0.12] mix-blend-multiply transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Rotating Stamp Badge overlapping bottom-right corner */}
            <div
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 z-20 pointer-events-none group-hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
                <defs>
                  <path
                    id="stampCirclePath"
                    d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                  />
                </defs>
                <text className="font-mono text-[9px] uppercase tracking-[0.24em] fill-bone">
                  <textPath href="#stampCirclePath" startOffset="0%">
                    FARAWAY · INTERNATIONAL HACKATHON · ROUND 2 · AUG 2026 ·
                  </textPath>
                </text>
              </svg>
              {/* Center Crimson Sparkle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="#E01B24" className="w-5 h-5">
                  <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
                </svg>
              </div>
            </div>

            {/* Caption Under Portrait */}
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-bone-dim">
              FIG. 01 — PRAKHAR, FARAWAY INTERNATIONAL HACKATHON, ROUND 2.
            </p>
          </div>
        </div>

        {/* Right Column (Cols 7-12): Scrolling Text Column */}
        <div ref={paragraphsRef} className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
          {/* Lead Paragraph */}
          <p className="focus-para font-display font-light text-[clamp(1.5rem,2.4vw,2.25rem)] text-bone leading-[1.25]">
            I'm Prakhar — a{' '}
            <span className="font-whisper text-crimson text-[1.12em] px-1 font-normal">builder</span> and{' '}
            <span className="font-whisper text-crimson text-[1.12em] px-1 font-normal">educator</span> from New Delhi,
            obsessed with making the web feel crafted, not generated.
          </p>

          {/* Body Paragraph 1 */}
          <p className="focus-para font-sans text-bone-dim text-[1.0625rem] leading-[1.7]">
            I'm a diploma student in Computer Science Engineering at Amity University, Greater Noida, and I spend most
            of my days building frontend web applications — from student housing platforms and finance tools to hackathon
            websites and AI products. Everything I make starts with one question:{' '}
            <em className="text-bone italic">would someone pay for this because of how it feels?</em>
          </p>

          {/* Body Paragraph 2 */}
          <p className="focus-para font-sans text-bone-dim text-[1.0625rem] leading-[1.7]">
            Alongside building, I teach. I've taught AI, coding, Scratch and prompt engineering to students from Grade 1 to 8,
            because the best way to understand something is to make a child understand it too.
          </p>

          {/* Body Paragraph 3 */}
          <p className="focus-para font-sans text-bone-dim text-[1.0625rem] leading-[1.7]">
            I also tinker with hardware — ESP32 boards, sensors, a desktop AI companion robot — because the web is only
            half the world. Under <strong className="text-bone font-semibold">prikaushion</strong>, my umbrella brand, I
            take on freelance work, build products, and slowly turn ideas into companies.
          </p>

          {/* Pull-quote with Hairline and Crimson Sparkle */}
          <div className="pt-6 pb-2 border-t border-bone-faint relative">
            <svg viewBox="0 0 100 100" fill="#E01B24" className="w-4 h-4 mb-4">
              <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
            </svg>
            <blockquote className="font-whisper text-[clamp(2.2rem,4vw,3.6rem)] text-crimson leading-[1.1]">
              “Classy over loud. Crafted over fast.”
            </blockquote>
          </div>

          {/* Stats Row (Animated Counters) */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-bone-faint"
          >
            <div className="flex flex-col">
              <span className="font-display font-bold text-4xl md:text-5xl text-bone tabular-nums">
                {counterValues[0]}+
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mt-2">
                PROJECTS SHIPPED
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-4xl md:text-5xl text-bone tabular-nums">
                1–{counterValues[1]}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mt-2">
                GRADES TAUGHT
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-4xl md:text-5xl text-bone tabular-nums">
                {counterValues[2]}+
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mt-2">
                CLIENT &amp; EVENT SITES
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-4xl md:text-5xl text-bone tabular-nums">
                {counterValues[3]}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim mt-2">
                YEAR I WENT FULL BUILDER
              </span>
            </div>
          </div>

          {/* Quick Facts List */}
          <div className="mt-6 pt-6 border-t border-bone-faint font-mono text-xs uppercase tracking-widest">
            <div className="text-crimson font-medium mb-4">QUICK FACTS</div>
            <div className="flex flex-col gap-3 text-bone-dim">
              {site.quickFacts.map((fact, idx) => (
                <div key={idx} className="flex items-baseline justify-between group">
                  <span className="text-bone group-hover:text-crimson transition-colors whitespace-nowrap">
                    {fact.label}
                  </span>
                  <span className="mx-2 grow border-b border-dotted border-bone-faint group-hover:border-crimson/50 transition-colors" />
                  <span className="text-bone/80 text-right whitespace-normal">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
