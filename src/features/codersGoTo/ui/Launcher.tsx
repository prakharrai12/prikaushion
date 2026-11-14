import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../PlayerProvider';
import { GenerativeCover } from './GenerativeCover';

interface LauncherProps {
  className?: string;
}

export const Launcher: React.FC<LauncherProps> = ({ className = '' }) => {
  const {
    currentTrack,
    isPlaying,
    progress,
    energy,
    uiState,
    setUiState,
    playTrack,
    activeIndex,
  } = usePlayer();

  const [isHovered, setIsHovered] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [liftOffset, setLiftOffset] = useState(0);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Footer avoidance
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer') || document.getElementById('footer');
      if (!footer) return;
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight) {
        const overlap = Math.max(0, windowHeight - rect.top);
        setLiftOffset(Math.min(overlap + 16, 56));
      } else {
        setLiftOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // First-visit tip hint (after 8s, once per browser)
  useEffect(() => {
    try {
      const seen = localStorage.getItem('cgt:tipSeen');
      if (!seen) {
        const timer = setTimeout(() => {
          setShowTip(true);
          const hideTimer = setTimeout(() => {
            setShowTip(false);
            localStorage.setItem('cgt:tipSeen', 'true');
          }, 6000);
          return () => clearTimeout(hideTimer);
        }, 8000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleClick = async () => {
    setShowTip(false);
    try {
      localStorage.setItem('cgt:tipSeen', 'true');
    } catch {
      // ignore
    }
    setUiState('DOCKED');
    if (!isPlaying) {
      await playTrack(activeIndex);
    }
  };

  if (uiState !== 'HIDDEN') {
    return null;
  }

  const tooltipText = isPlaying
    ? `${currentTrack?.title || "The Coder's Go-To"}`
    : "THE CODER'S GO-TO — PLAY";

  return (
    <div
      className={`fixed z-[85] transition-transform duration-300 pointer-events-auto ${className}`}
      style={{
        bottom: `calc(max(20px, env(safe-area-inset-bottom)) + ${liftOffset}px)`,
        left: 'max(20px, env(safe-area-inset-left))',
      }}
    >
      <div className="relative flex items-center">
        {/* Disc Button */}
        <button
          ref={launcherRef}
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Open The Coder's Go-To music player"
          data-cursor="play"
          className="relative w-14 h-14 rounded-full cgt-dock-glass flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E01B24] group cursor-pointer overflow-hidden shadow-2xl"
        >
          {/* Progress ring when playing */}
          {isPlaying && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(#E01B24 ${progress * 360}deg, transparent ${progress * 360}deg 360deg)`,
                WebkitMaskImage: 'radial-gradient(circle, transparent 24px, black 25px)',
                maskImage: 'radial-gradient(circle, transparent 24px, black 25px)',
              }}
            />
          )}

          {/* Idle: Dotted Orbit + Crimson K-Sparkle */}
          {!isPlaying && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Rotating dotted orbit ring */}
              <svg
                viewBox="0 0 56 56"
                className="absolute inset-0 w-full h-full cgt-animate-spin text-[#F4EFE4]/30 pointer-events-none"
                style={{ animationDuration: '24s' }}
              >
                <circle
                  cx="28"
                  cy="28"
                  r="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
              </svg>

              {/* Crimson K-Sparkle Mark */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#E01B24] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(224,27,36,0.6)]"
                fill="currentColor"
              >
                <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
              </svg>
            </div>
          )}

          {/* Playing: Spinning Record Label + Live Equalizer */}
          {isPlaying && currentTrack && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Spinning mini record cover */}
              <div className="w-11 h-11 rounded-full overflow-hidden cgt-animate-spin shadow-inner">
                {currentTrack.cover?.src160 ? (
                  <img
                    src={currentTrack.cover.src160}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GenerativeCover
                    track={currentTrack}
                    index={activeIndex}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Tiny center vinyl spindle hole */}
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0A0A0B] border border-[#F4EFE4]/30 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#E01B24]" />
              </div>

              {/* Mini Equalizer indicator in lower right corner */}
              <div className="absolute bottom-1 right-1.5 flex items-end gap-[1.5px] px-1 py-0.5 rounded bg-[#0A0A0B]/80 backdrop-blur-sm pointer-events-none">
                <span
                  className="w-[2px] bg-[#F4EFE4] rounded-t-full transition-all duration-75"
                  style={{ height: `${Math.max(3, energy.bass * 9)}px` }}
                />
                <span
                  className="w-[2px] bg-[#F4EFE4] rounded-t-full transition-all duration-75"
                  style={{ height: `${Math.max(2, energy.mid * 8)}px` }}
                />
                <span
                  className="w-[2px] bg-[#E01B24] rounded-t-full transition-all duration-75"
                  style={{ height: `${Math.max(3, energy.high * 9)}px` }}
                />
              </div>
            </div>
          )}
        </button>

        {/* Hover Tooltip (Desktop) */}
        {isHovered && (
          <div className="hidden md:flex items-center ml-3 px-3 py-1.5 rounded-pill cgt-dock-glass border border-[#F4EFE4]/15 shadow-xl animate-fade-in pointer-events-none whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24] mr-2 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#F4EFE4]">
              {tooltipText}
            </span>
          </div>
        )}

        {/* First-Visit Hint Pill */}
        {showTip && !isHovered && (
          <div
            onClick={() => {
              setShowTip(false);
              handleClick();
            }}
            className="flex items-center ml-3 px-3.5 py-2 rounded-pill cgt-dock-glass border border-[#E01B24]/40 shadow-[0_10px_30px_rgba(224,27,36,0.2)] animate-bounce cursor-pointer whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#E01B24] mr-2.5 animate-ping" />
            <span className="font-mono text-[11px] text-[#F4EFE4] tracking-wide">
              Coding music? <strong className="text-[#E01B24]">Press play</strong>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTip(false);
                try {
                  localStorage.setItem('cgt:tipSeen', 'true');
                } catch {
                  // ignore
                }
              }}
              className="ml-2 text-[#F4EFE4]/50 hover:text-[#F4EFE4] text-xs p-0.5"
              aria-label="Dismiss hint"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
