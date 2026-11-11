import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { MagneticButton } from '../components/MagneticButton';
import { projects, Project } from '../config/projects';
import { site } from '../config/site';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { isTouchDevice } from '../lib/utils';
import { Github, ExternalLink } from 'lucide-react';

const FILTER_CATEGORIES = ['ALL', 'WEB', 'AI', 'HARDWARE', 'CLIENT'];

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyStackRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredTierB, setHoveredTierB] = useState<Project | null>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  // Filter other projects based on active filter
  const filteredTierB = otherProjects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'WEB') return p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('platform') || p.category.toLowerCase().includes('app');
    if (activeFilter === 'AI') return p.category.toLowerCase().includes('ai') || p.stack.includes('Ollama');
    if (activeFilter === 'HARDWARE') return p.category.toLowerCase().includes('hardware') || p.category.toLowerCase().includes('iot');
    if (activeFilter === 'CLIENT') return p.category.toLowerCase().includes('brand') || p.category.toLowerCase().includes('commerce') || p.category.toLowerCase().includes('demo');
    return true;
  });

  // Sticky Stack Animation for Tier A (Desktop >= 900px)
  useEffect(() => {
    if (!stickyStackRef.current || window.innerWidth < 900) return;

    const cards = stickyStackRef.current.querySelectorAll<HTMLElement>('.sticky-project-card');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: cards[i + 1],
        start: 'top 75%',
        end: 'top 12%',
        scrub: 1,
        onUpdate: (self) => {
          const scale = 1 - self.progress * 0.06;
          const brightness = 1 - self.progress * 0.5;
          const yOffset = -self.progress * 30;
          gsap.set(card, {
            scale: scale,
            filter: `brightness(${brightness})`,
            y: yOffset,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && stickyStackRef.current?.contains(t.trigger as Node)) {
          t.kill();
        }
      });
    };
  }, []);

  // Floating Preview Mouse Tracking for Tier B
  useEffect(() => {
    if (isTouchDevice()) return;

    let mouseX = -300;
    let mouseY = -300;
    let prevMouseX = -300;
    let currentX = -300;
    let currentY = -300;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      const deltaX = mouseX - prevMouseX;
      prevMouseX = mouseX;
      const rotation = Math.max(-8, Math.min(8, deltaX * 0.4));

      if (floatingPreviewRef.current) {
        floatingPreviewRef.current.style.transform = `translate3d(${currentX + 24}px, ${currentY - 100}px, 0) rotate(${rotation}deg)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Helper to check if URL is ready or TODO
  const isUrlValid = (url: string) => {
    return url && !url.startsWith('TODO_');
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      data-bg="grad-oxblood-deep"
      data-accent-x="50%"
      data-accent-y="100%"
      className="relative w-full py-[clamp(96px,14vw,220px)] px-[var(--gutter)] max-w-[1440px] mx-auto select-none"
      aria-label="Selected Projects"
    >
      <SectionHeader
        index="03"
        metaName="SELECTED WORK"
        ghostWord="PROJECTS"
        line1="Selected"
        line2="*work*, shipped"
        intro="Every project below is live. Open it, click around, break it — then tell me what you'd improve."
      />

      {/* TIER A: Featured Projects (Sticky Stack on Desktop) */}
      <div ref={stickyStackRef} className="relative flex flex-col gap-12 md:gap-24 mb-28">
        {featuredProjects.map((p, idx) => {
          const liveValid = isUrlValid(p.liveUrl);
          const repoValid = isUrlValid(p.repoUrl);

          return (
            <div
              key={p.slug}
              className="sticky-project-card lg:sticky lg:top-[12vh] w-full min-h-[70vh] rounded-lg border border-bone-faint bg-obsidian p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between overflow-hidden"
              style={{ zIndex: 10 + idx }}
            >
              {/* Left Column (40%): Project Information */}
              <div className="w-full lg:w-[42%] flex flex-col justify-between h-full">
                <div>
                  {/* Top Meta: Index in crimson + Category Pill */}
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest mb-4">
                    <span className="text-crimson font-medium">
                      {p.index} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <span className="px-3 py-1 rounded-pill border border-bone-faint text-bone-dim text-[10px]">
                      {p.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-[clamp(2.2rem,4vw,3.8rem)] text-bone leading-[1.05] tracking-tight">
                    {p.title}
                  </h3>

                  {/* Tagline */}
                  <div className="font-whisper text-[clamp(1.4rem,2.2vw,2rem)] text-bone-dim mt-2 mb-4">
                    {p.tagline}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-bone-dim text-[1.0625rem] leading-[1.7] max-w-[44ch] mb-6">
                    {p.description}
                  </p>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.stack.map((item, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-pill border border-bone-faint bg-charcoal/50 font-mono text-[11px] uppercase tracking-wider text-bone-dim hover:bg-bone/10 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Mandatory Live and Code buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-bone-faint w-full">
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    {/* Live Button */}
                    <div className="relative group">
                      <MagneticButton
                        as="a"
                        href={liveValid ? p.liveUrl : undefined}
                        target={liveValid ? '_blank' : undefined}
                        rel={liveValid ? 'noopener noreferrer' : undefined}
                        strength={0.3}
                        disabled={!liveValid}
                        data-cursor={liveValid ? 'view' : undefined}
                        className={`h-12 px-7 rounded-pill font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all duration-300 ${
                          liveValid
                            ? 'bg-crimson text-ink hover:bg-bone shadow-[0_8px_25px_rgba(224,27,36,0.3)]'
                            : 'bg-bone/20 text-bone/40 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </MagneticButton>
                      {!liveValid && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-charcoal border border-bone-faint text-bone-dim text-[10px] font-mono tracking-widest uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Link coming soon
                        </span>
                      )}
                    </div>

                    {/* Code Button */}
                    <div className="relative group">
                      <MagneticButton
                        as="a"
                        href={repoValid ? p.repoUrl : undefined}
                        target={repoValid ? '_blank' : undefined}
                        rel={repoValid ? 'noopener noreferrer' : undefined}
                        strength={0.3}
                        disabled={!repoValid}
                        data-cursor={repoValid ? 'link' : undefined}
                        className={`h-12 px-6 rounded-pill border font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300 ${
                          repoValid
                            ? 'border-bone-faint text-bone hover:border-crimson hover:text-crimson'
                            : 'border-bone/20 text-bone/40 cursor-not-allowed opacity-60'
                        }`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </MagneticButton>
                      {!repoValid && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-charcoal border border-bone-faint text-bone-dim text-[10px] font-mono tracking-widest uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Link coming soon
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-widest text-bone-dim">
                    YEAR — {p.year}
                  </span>
                </div>
              </div>

              {/* Right Column (60%): Interactive Browser Chrome & Screenshot Preview */}
              <div
                data-cursor={liveValid ? 'view' : undefined}
                onClick={() => {
                  if (liveValid) window.open(p.liveUrl, '_blank', 'noopener,noreferrer');
                }}
                className="w-full lg:w-[58%] h-[340px] md:h-[460px] rounded-lg border border-bone-faint bg-charcoal overflow-hidden relative group cursor-pointer shadow-xl flex flex-col"
              >
                {/* Browser Chrome Strip */}
                <div className="h-10 bg-graphite/70 border-b border-bone-faint px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-bone-faint" />
                    <div className="w-2.5 h-2.5 rounded-full bg-bone-faint" />
                    <div className="w-2.5 h-2.5 rounded-full bg-bone-faint" />
                  </div>
                  <div className="px-4 py-1 rounded-pill bg-obsidian border border-bone-faint/60 font-mono text-[10px] text-bone-dim tracking-wider max-w-[240px] sm:max-w-none truncate">
                    {liveValid
                      ? p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                      : `${p.slug}.prikaushion.dev`}
                  </div>
                  <div className="w-8" />
                </div>

                {/* Screenshot with Vertical Auto-Scroll on Hover */}
                <div className="relative w-full grow overflow-hidden bg-ink">
                  <img
                    src={`./assets/projects/${p.slug}.webp`}
                    alt={`${p.title} Preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-[object-position] duration-[6000ms] ease-linear group-hover:object-bottom"
                  />
                  {/* Subtle inner spotlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TIER B: Minimalist List-Hover Table */}
      <div className="pt-16 border-t border-bone-faint">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h3 className="font-display font-extrabold text-3xl md:text-4xl text-bone">
              More Shipped Projects
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-bone-dim mt-2">
              ARCHIVE &amp; EXPERIMENTAL BUILDS
            </p>
          </div>

          {/* Filter Bar with Sliding Crimson Underline Indicator */}
          <div className="relative flex items-center gap-1 p-1 rounded-2xl sm:rounded-pill border border-bone-faint bg-obsidian/80 font-mono text-xs uppercase tracking-widest overflow-x-auto max-w-full">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-1.5 rounded-pill transition-colors duration-300 z-10 shrink-0 ${
                    isActive ? 'text-ink font-semibold' : 'text-bone-dim hover:text-bone'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-crimson rounded-pill -z-10 shadow-[0_2px_12px_rgba(224,27,36,0.4)] transition-all duration-500 ease-out"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* List Rows */}
        <div className="flex flex-col border-y border-bone-faint">
          {filteredTierB.map((p) => {
            const liveValid = isUrlValid(p.liveUrl);
            const repoValid = isUrlValid(p.repoUrl);

            return (
              <div
                key={p.slug}
                onMouseEnter={() => setHoveredTierB(p)}
                onMouseLeave={() => setHoveredTierB(null)}
                tabIndex={0}
                onFocus={() => setHoveredTierB(p)}
                onBlur={() => setHoveredTierB(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-4 border-b border-bone-faint hover:border-bone/40 transition-colors duration-300 focus:outline-none"
              >
                {/* Crimson Wash from Left on Hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-crimson/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Left: Index + Big Title */}
                <div className="flex items-baseline gap-6 z-10">
                  <span className="font-mono text-xs text-crimson font-medium">
                    {p.index}
                  </span>
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-bone group-hover:text-crimson-glow group-hover:translate-x-4 transition-all duration-300">
                    {p.title}
                  </span>
                </div>

                {/* Right: Category + Year + Inline Action Buttons */}
                <div className="flex items-center gap-6 mt-4 md:mt-0 z-10">
                  <span className="font-mono text-xs uppercase tracking-widest text-bone-dim hidden md:inline">
                    {p.category}
                  </span>
                  <span className="font-mono text-xs text-bone-dim hidden md:inline">
                    {p.year}
                  </span>

                  {/* Inline Buttons */}
                  <div className="flex items-center gap-2">
                    <div className="relative group/btn">
                      <a
                        href={liveValid ? p.liveUrl : undefined}
                        target={liveValid ? '_blank' : undefined}
                        rel={liveValid ? 'noopener noreferrer' : undefined}
                        aria-disabled={!liveValid}
                        className={`h-9 px-4 rounded-pill font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                          liveValid
                            ? 'bg-bone text-ink hover:bg-crimson hover:text-ink font-semibold'
                            : 'bg-bone/15 text-bone/40 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>Live</span>
                        <span>↗</span>
                      </a>
                      {!liveValid && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-charcoal border border-bone-faint text-bone-dim text-[9px] font-mono tracking-widest uppercase rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Link coming soon
                        </span>
                      )}
                    </div>

                    <div className="relative group/btn">
                      <a
                        href={repoValid ? p.repoUrl : undefined}
                        target={repoValid ? '_blank' : undefined}
                        rel={repoValid ? 'noopener noreferrer' : undefined}
                        aria-disabled={!repoValid}
                        className={`h-9 px-3.5 rounded-pill border font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                          repoValid
                            ? 'border-bone-faint text-bone hover:border-crimson hover:text-crimson'
                            : 'border-bone/20 text-bone/40 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <Github className="w-3 h-3" />
                        <span>Code</span>
                      </a>
                      {!repoValid && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-charcoal border border-bone-faint text-bone-dim text-[9px] font-mono tracking-widest uppercase rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Link coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Preview Card for Tier B (Desktop) */}
      <div
        ref={floatingPreviewRef}
        className={`fixed top-0 left-0 w-64 h-40 rounded-t-[40px] rounded-b-md border border-bone-faint bg-obsidian overflow-hidden pointer-events-none z-[90] shadow-2xl transition-opacity duration-300 hidden md:block ${
          hoveredTierB ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {hoveredTierB && (
          <img
            src={`./assets/projects/${hoveredTierB.slug}.webp`}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* "See all on GitHub" Closer Row */}
      <div className="mt-16 md:mt-24 pt-8 border-t border-bone-faint">
        <a
          href={site.socials.github.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          className="group block font-display font-extrabold text-[clamp(2rem,4.5vw,4.5rem)] text-bone tracking-tight hover:text-crimson transition-colors duration-300"
        >
          <span>See every repository on GitHub </span>
          <span className="inline-block group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-300 text-crimson">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
};

