import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { MagneticButton } from '../components/MagneticButton';
import { scrollToTarget } from '../lib/lenis';
import { gsap } from '../lib/gsap';

interface ServicePanel {
  id: string;
  index: string;
  title: string;
  copy: string;
  deliverables: string[];
}

const SERVICES: ServicePanel[] = [
  {
    id: '01',
    index: '01',
    title: 'Websites for local business',
    copy: 'Most nearby businesses have no website — or a weak one. I build fast, brand-matched sites that make them look as good online as they are in person.',
    deliverables: ['Brand-matched design', 'Mobile-first build', 'SEO basics', 'Launch support'],
  },
  {
    id: '02',
    index: '02',
    title: 'Web apps & dashboards',
    copy: 'From calculators to full platforms — React frontends, clean APIs, secure by default.',
    deliverables: ['React / Vite', 'API integration', 'Auth & security pass', 'Deployment'],
  },
  {
    id: '03',
    index: '03',
    title: 'AI-powered products',
    copy: 'RAG assistants, sentiment tools and smart automations that turn raw data into decisions.',
    deliverables: ['RAG pipelines', 'FastAPI backends', 'Prompt engineering', 'Evaluation'],
  },
  {
    id: '04',
    index: '04',
    title: 'Workshops & teaching',
    copy: 'Hands-on AI, coding and prompt-engineering sessions for schools and student groups, ages 6 to 16.',
    deliverables: ['Lesson plans', 'Live sessions', 'Student projects', 'Certificates'],
  },
];

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPanelIdx, setCurrentPanelIdx] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!pinWrapperRef.current || !trackRef.current || window.innerWidth < 900) return;

    const track = trackRef.current;
    const pinWrapper = pinWrapperRef.current;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapper,
        start: 'top top',
        end: () => `+=${getScrollAmount() * 1.2}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const active = Math.min(4, Math.floor(self.progress * 4) + 1);
          setCurrentPanelIdx(active);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      data-bg="grad-wine-spot"
      data-accent-x="85%"
      data-accent-y="40%"
      className="relative w-full py-[clamp(96px,14vw,220px)] px-[var(--gutter)] max-w-[1440px] mx-auto select-none"
      aria-label="Prikaushion Studio Services"
    >
      <SectionHeader
        index="04"
        metaName="PRIKAUSHION STUDIO"
        ghostWord="SERVICES"
        line1="What prikaushion"
        line2="can *build* for you"
        intro="prikaushion is my umbrella — web, apps, and finance tools — built for businesses that deserve better than a template."
      />

      {/* Pinning Area for Desktop Track */}
      <div ref={pinWrapperRef} className="relative w-full overflow-hidden mt-8">
        {/* Track Progress Indicator Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between font-mono text-xs uppercase tracking-widest text-bone-dim mb-6">
          <div className="flex items-center gap-3">
            <span className="text-crimson font-semibold">
              0{currentPanelIdx}
            </span>
            <span>/ 04 PANELS</span>
          </div>

          <div className="w-48 h-[2px] bg-bone-faint relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-crimson transition-transform duration-75 origin-left"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>

        {/* Horizontal Track (Scrubbed on desktop, horizontal swipe with snap on mobile) */}
        <div
          ref={trackRef}
          className="flex lg:flex-row flex-col gap-8 lg:gap-[4vw] will-change-transform lg:w-max overflow-x-auto lg:overflow-visible pb-8 lg:pb-0"
        >
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="group relative w-full lg:w-[70vw] lg:max-w-[880px] min-h-[460px] lg:h-[62vh] rounded-lg border border-bone-faint bg-obsidian p-8 md:p-14 shadow-2xl flex flex-col justify-between overflow-hidden shrink-0 transition-transform duration-300 hover:border-bone/30"
            >
              {/* Crimson L-Shaped Corner Brackets expanding on hover */}
              <div
                className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-crimson origin-top-left transition-transform duration-400 group-hover:scale-125"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-crimson origin-bottom-right transition-transform duration-400 group-hover:scale-125"
                aria-hidden="true"
              />

              {/* Huge Ghost Number behind the Title */}
              <div
                className="absolute -top-10 -right-6 font-display font-extrabold text-[clamp(6rem,18vw,16rem)] text-ghost pointer-events-none select-none -z-0"
                aria-hidden="true"
              >
                {srv.index}
              </div>

              {/* Panel Top: Category & Title */}
              <div className="relative z-10">
                <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
                  SERVICE ({srv.index})
                </span>
                <h3 className="font-display font-extrabold text-[clamp(2rem,3.8vw,3.5rem)] text-bone leading-[1.1] mt-3 max-w-[18ch]">
                  {srv.title}
                </h3>
              </div>

              {/* Panel Middle: Detailed Copy */}
              <p className="relative z-10 font-sans text-bone-dim text-[1.1rem] leading-[1.7] max-w-[54ch]">
                {srv.copy}
              </p>

              {/* Panel Bottom: Deliverables in Mono */}
              <div className="relative z-10 pt-6 border-t border-bone-faint flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider text-bone/80">
                {srv.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <svg viewBox="0 0 100 100" fill="#E01B24" className="w-2.5 h-2.5 shrink-0">
                      <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Final Slim CTA Panel */}
          <div className="relative w-full lg:w-[45vw] lg:max-w-[560px] min-h-[460px] lg:h-[62vh] rounded-lg border border-bone-faint bg-charcoal/60 p-8 md:p-14 shadow-2xl flex flex-col justify-between shrink-0">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
                START A CONVERSATION
              </span>
              <h3 className="font-display font-light text-[clamp(2.2rem,3.5vw,3.2rem)] text-bone leading-[1.2] mt-4">
                Have a business that needs a better front door?
              </h3>
            </div>

            <div className="pt-8 border-t border-bone-faint">
              <MagneticButton
                as="a"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget('#contact');
                }}
                strength={0.35}
                data-cursor="link"
                className="h-14 px-8 rounded-pill bg-crimson text-ink font-mono text-xs uppercase tracking-widest font-semibold hover:bg-bone transition-colors shadow-lg"
              >
                <span>Let's talk →</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
