import React, { useEffect, useState } from 'react';
import { scrollToTarget } from '../lib/lenis';

interface SectionIndicator {
  id: string;
  name: string;
}

const SECTIONS: SectionIndicator[] = [
  { id: 'home', name: 'HOME' },
  { id: 'about', name: 'ABOUT ME' },
  { id: 'work', name: 'WORK' },
  { id: 'projects', name: 'PROJECTS' },
  { id: 'services', name: 'SERVICES' },
  { id: 'toolkit', name: 'TOOLKIT' },
  { id: 'education', name: 'EDUCATION' },
  { id: 'socials', name: 'SOCIALS' },
  { id: 'contact', name: 'CONTACT' },
  { id: 'footer', name: 'FOOTER' },
];

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Determine active section
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = document.getElementById(SECTIONS[i].id);
        if (sec) {
          const top = sec.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 2px Fixed Crimson Top Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-crimson z-[95] origin-left pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Desktop Vertical Indicator on the Right Edge (>= 900px) */}
      <aside
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center z-[70] h-[60vh] justify-between py-2"
        aria-label="Section navigation"
      >
        {/* Subtle Vertical Hairline Guideline */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-bone-faint -z-10" />

        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div key={sec.id} className="relative flex items-center justify-center group">
              {/* Tooltip on Left */}
              <div
                className={`absolute right-6 px-2.5 py-1 bg-obsidian border border-bone-faint text-bone font-mono text-[10px] tracking-widest uppercase rounded whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
              >
                ({String(idx + 1).padStart(2, '0')}) {sec.name}
              </div>

              {/* Indicator Dot */}
              <button
                type="button"
                onClick={() => scrollToTarget(`#${sec.id}`, -60)}
                onMouseEnter={() => setHoveredSection(sec.id)}
                onMouseLeave={() => setHoveredSection(null)}
                aria-label={`Jump to section ${sec.name}`}
                className="relative p-2 flex items-center justify-center cursor-pointer focus:outline-none"
              >
                {isActive ? (
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-bone/30 group-hover:bg-bone group-hover:scale-150 transition-all duration-200" />
                )}
              </button>
            </div>
          );
        })}
      </aside>
    </>
  );
};
