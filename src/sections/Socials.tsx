import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { MagneticButton } from '../components/MagneticButton';
import { site } from '../config/site';
import { isTouchDevice } from '../lib/utils';
import { ScrollTrigger } from '../lib/gsap';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';

interface SocialItem {
  index: string;
  name: string;
  handle: string;
  url: string;
  gradient: string;
  textColor: string;
  subtitle: string;
  icon: React.ReactNode;
}

const SOCIAL_LIST: SocialItem[] = [
  {
    index: '01',
    name: 'GitHub',
    handle: site.socials.github.handle,
    url: site.socials.github.url,
    gradient: 'linear-gradient(135deg, #0D1117 0%, #30363D 50%, #F4EFE4 100%)',
    textColor: '#0A0A0B',
    subtitle: '11 REPOS · OPEN SOURCE BUILDS',
    icon: <Github className="w-8 h-8" />,
  },
  {
    index: '02',
    name: 'LinkedIn',
    handle: site.socials.linkedin.handle,
    url: site.socials.linkedin.url,
    gradient: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
    textColor: '#FFFFFF',
    subtitle: 'LET’S CONNECT PROFESSIONALLY',
    icon: <Linkedin className="w-8 h-8" />,
  },
  {
    index: '03',
    name: 'Instagram',
    handle: site.socials.instagram.handle,
    url: site.socials.instagram.url,
    gradient: 'linear-gradient(135deg, #F58529 0%, #DD2A7B 35%, #8134AF 70%, #515BD4 100%)',
    textColor: '#FFFFFF',
    subtitle: 'BEHIND THE BUILDS & HARDWARE',
    icon: <Instagram className="w-8 h-8" />,
  },
  {
    index: '04',
    name: 'Email',
    handle: site.socials.email.handle,
    url: site.socials.email.url,
    gradient: 'linear-gradient(110deg, #7A0F18 0%, #E01B24 60%, #FF3B3B 100%)',
    textColor: '#0A0A0B',
    subtitle: 'DIRECT INQUIRIES · REPLY IN 24H',
    icon: <Mail className="w-8 h-8" />,
  },
];

export const Socials: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<SocialItem | null>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  // Floating preview card mouse lerp
  useEffect(() => {
    if (isTouchDevice()) return;

    let mouseX = -300;
    let mouseY = -300;
    let currentX = -300;
    let currentY = -300;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;

      if (floatingCardRef.current) {
        floatingCardRef.current.style.transform = `translate3d(${currentX + 28}px, ${currentY - 80}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Touch devices: auto-flood rows as they scroll past viewport center
  useEffect(() => {
    if (!isTouchDevice() || !containerRef.current) return;

    const rows = containerRef.current.querySelectorAll<HTMLElement>('.social-row-link');
    rows.forEach((row, idx) => {
      ScrollTrigger.create({
        trigger: row,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          setActiveItem(SOCIAL_LIST[idx]);
          const flood = row.querySelector<HTMLElement>('.social-flood-layer');
          if (flood) flood.style.clipPath = 'circle(150% at 50% 50%)';
        },
        onLeave: () => {
          const flood = row.querySelector<HTMLElement>('.social-flood-layer');
          if (flood) flood.style.clipPath = 'circle(0% at 50% 50%)';
        },
        onEnterBack: () => {
          setActiveItem(SOCIAL_LIST[idx]);
          const flood = row.querySelector<HTMLElement>('.social-flood-layer');
          if (flood) flood.style.clipPath = 'circle(150% at 50% 50%)';
        },
        onLeaveBack: () => {
          const flood = row.querySelector<HTMLElement>('.social-flood-layer');
          if (flood) flood.style.clipPath = 'circle(0% at 50% 50%)';
        },
      });
    });
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>, item: SocialItem) => {
    setActiveItem(item);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const floodEl = e.currentTarget.querySelector<HTMLElement>('.social-flood-layer');
    if (floodEl) {
      floodEl.style.setProperty('--mx', `${x}px`);
      floodEl.style.setProperty('--my', `${y}px`);
      floodEl.style.clipPath = `circle(150% at var(--mx) var(--my))`;
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    setActiveItem(null);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const floodEl = e.currentTarget.querySelector<HTMLElement>('.social-flood-layer');
    if (floodEl) {
      floodEl.style.setProperty('--mx', `${x}px`);
      floodEl.style.setProperty('--my', `${y}px`);
      floodEl.style.clipPath = `circle(0% at var(--mx) var(--my))`;
    }
  };

  const isUrlValid = (url: string) => url && !url.startsWith('TODO_');

  return (
    <section
      id="socials"
      ref={containerRef}
      data-bg="grad-void"
      className="relative w-full py-[clamp(96px,14vw,220px)] px-[var(--gutter)] max-w-[1440px] mx-auto select-none"
      aria-label="Social Profiles and Links"
    >
      <SectionHeader
        index="07"
        metaName="SOCIALS"
        ghostWord="SOCIAL"
        line1="Find me"
        line2="*elsewhere*"
        intro="Four places I actually show up. Pick one."
      />

      {/* Giant Interactive Social Rows */}
      <div className="flex flex-col border-y border-bone-faint mt-10">
        {SOCIAL_LIST.map((item) => {
          const valid = isUrlValid(item.url);
          const isHovered = activeItem?.name === item.name;

          return (
            <a
              key={item.name}
              href={valid ? item.url : undefined}
              target={item.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              onPointerEnter={(e) => handlePointerEnter(e, item)}
              onPointerLeave={handlePointerLeave}
              data-cursor="open"
              aria-disabled={!valid}
              className={`social-row-link group relative min-h-[140px] md:h-[22vh] flex items-center justify-between px-6 md:px-12 border-b border-bone-faint overflow-hidden transition-all duration-300 focus:outline-none ${
                valid ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              {/* Dynamic Expandable Flood Layer from Cursor Touch Point */}
              <div
                className="social-flood-layer absolute inset-0 pointer-events-none transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"
                style={{
                  background: item.gradient,
                  clipPath: 'circle(0% at 50% 50%)',
                }}
              />

              {/* Row Left: Mono Index + Giant Fraunces Platform Name */}
              <div className="relative z-10 flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-xs md:text-sm text-crimson font-medium">
                  {item.index}
                </span>
                <span
                  className="font-display font-extrabold text-[clamp(2.8rem,9vw,9rem)] leading-none tracking-[-0.04em] transition-colors duration-400"
                  style={{
                    color: isHovered ? item.textColor : 'var(--bone)',
                  }}
                >
                  {item.name}
                </span>
              </div>

              {/* Row Right: Handle + Circular Arrow Button */}
              <div className="relative z-10 flex items-center gap-6">
                <span
                  className="font-mono text-xs md:text-sm uppercase tracking-wider transition-all duration-300 hidden sm:inline"
                  style={{
                    color: isHovered ? item.textColor : 'var(--bone-dim)',
                    transform: isHovered ? 'translateX(-8px)' : 'none',
                  }}
                >
                  {item.handle}
                </span>

                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-bone-faint flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-bone text-ink rotate-0 border-bone shadow-xl'
                      : 'text-bone rotate-45'
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Floating Preview Card following Cursor (Desktop) */}
      <div
        ref={floatingCardRef}
        className={`fixed top-0 left-0 w-64 p-5 rounded-lg border border-bone-faint bg-obsidian/95 backdrop-blur-md shadow-2xl pointer-events-none z-[90] transition-opacity duration-300 hidden md:block ${
          activeItem ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {activeItem && (
          <div className="flex flex-col gap-2">
            <div className="text-crimson mb-1">{activeItem.icon}</div>
            <div className="font-display font-bold text-lg text-bone">
              {activeItem.name}
            </div>
            <div className="font-mono text-xs text-bone-dim">
              {activeItem.handle}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-crimson mt-2 pt-2 border-t border-bone-faint">
              {activeItem.subtitle}
            </div>
          </div>
        )}
      </div>

      {/* Magnetic Social Dock below the rows for quick access / mobile */}
      <div className="mt-16 md:mt-24 pt-8 border-t border-bone-faint flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-crimson font-medium">
            QUICK ACCESS DOCK
          </span>
          <p className="font-sans text-sm text-bone-dim mt-1">
            Tap or hover any platform for instant contact.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LIST.map((item) => {
            const valid = isUrlValid(item.url);
            return (
              <MagneticButton
                key={item.name}
                as="a"
                href={valid ? item.url : undefined}
                target={item.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                strength={0.45}
                data-cursor="link"
                disabled={!valid}
                aria-label={`Open ${item.name}`}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full border border-bone-faint flex items-center justify-center text-bone transition-all duration-300 hover:border-crimson hover:bg-crimson hover:text-ink ${
                  !valid ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                {item.icon}
              </MagneticButton>
            );
          })}
        </div>
      </div>
    </section>
  );
};

