import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { usePlayer } from '../PlayerProvider';
import { GenerativeCover } from './GenerativeCover';
import { getLenis } from '../../../lib/lenis';

interface DockProps {
  className?: string;
}

export const Dock: React.FC<DockProps> = ({ className = '' }) => {
  const {
    currentTrack,
    isPlaying,
    isBuffering,
    hasAudio,
    progress,
    currentTime,
    duration,
    toggle,
    next,
    prev,
    seek,
    uiState,
    setUiState,
  } = usePlayer();

  const [liftOffset, setLiftOffset] = useState(0);
  const progressLineRef = useRef<HTMLDivElement>(null);

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

  // Hide on Esc key
  useEffect(() => {
    if (uiState !== 'DOCKED') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUiState('HIDDEN');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [uiState, setUiState]);

  // Touch swipe-down to hide (mobile)
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null) {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (deltaY > 40) {
        setUiState('HIDDEN');
      }
      touchStartY.current = null;
    }
  };

  // Progress scrub handling
  const handleProgressScrub = (clientX: number) => {
    if (!progressLineRef.current || duration <= 0) return;
    const rect = progressLineRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seek(ratio * duration);
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleProgressScrub(e.clientX);

    const onMouseMove = (ev: MouseEvent) => handleProgressScrub(ev.clientX);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleCoverOrTitleClick = () => {
    const section = document.getElementById('go-to');
    if (section) {
      const rect = section.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!inView) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(section, { offset: -60 });
          return;
        } else {
          section.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    // If already in view or clicked, open Immersive
    setUiState('IMMERSIVE');
  };

  if (uiState !== 'DOCKED') {
    return null;
  }

  const title = currentTrack?.title || "The Coder's Go-To";
  const artist = currentTrack?.artist || 'LO-FI / FOCUS';

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed z-[85] transition-all duration-300 pointer-events-auto select-none ${className}`}
      style={{
        bottom: `calc(max(16px, env(safe-area-inset-bottom)) + ${liftOffset}px)`,
        left: 'max(16px, env(safe-area-inset-left))',
      }}
    >
      <div className="relative w-[calc(100vw-32px)] sm:w-[390px] h-[72px] sm:h-[76px] rounded-[22px] cgt-dock-glass flex items-center justify-between px-3 sm:px-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#F4EFE4]/15 overflow-hidden group">
        {/* Left: Cover Art + Vinyl Peek */}
        <div
          onClick={handleCoverOrTitleClick}
          data-cursor="view"
          className="relative flex items-center cursor-pointer shrink-0 mr-3"
          title="Open lyrics or view in section"
        >
          {/* Peeking spinning vinyl when playing */}
          <div
            className={`absolute -right-2 w-10 h-10 rounded-full bg-[#050506] border border-[#F4EFE4]/20 flex items-center justify-center transition-transform duration-500 pointer-events-none ${
              isPlaying ? 'translate-x-3.5 cgt-animate-spin opacity-90' : 'translate-x-0 opacity-0'
            }`}
          >
            <div className="w-4 h-4 rounded-full border border-[#F4EFE4]/10 bg-[#0A0A0B]" />
          </div>

          {/* Album Cover */}
          <div className="relative z-10 w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-[10px] overflow-hidden border border-[#F4EFE4]/20 bg-[#141416] shadow-md">
            {currentTrack?.cover?.src160 ? (
              <img
                src={currentTrack.cover.src160}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : currentTrack ? (
              <GenerativeCover
                track={currentTrack}
                index={0}
                className="w-full h-full"
              />
            ) : null}
          </div>
        </div>

        {/* Center-Left: Title & Artist */}
        <div
          onClick={handleCoverOrTitleClick}
          className="flex-1 min-w-0 pr-2 cursor-pointer"
        >
          <div className="truncate font-sans font-bold text-[14px] sm:text-[15px] text-[#F4EFE4] tracking-tight group-hover:text-[#E01B24] transition-colors">
            {title}
          </div>
          <div className="truncate font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#F4EFE4]/60">
            {artist}
          </div>
        </div>

        {/* Center-Right: Transport Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous track"
            className="p-1.5 sm:p-2 rounded-full text-[#F4EFE4]/60 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Play/Pause */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={!hasAudio}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E01B24] ${
              !hasAudio
                ? 'opacity-35 cursor-not-allowed bg-[#F4EFE4]/40 text-[#0A0A0B]'
                : 'bg-[#F4EFE4] text-[#0A0A0B] hover:bg-[#E01B24] hover:text-[#F4EFE4] hover:scale-105 active:scale-95 shadow-md'
            }`}
          >
            {isBuffering ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#E01B24]" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="p-1.5 sm:p-2 rounded-full text-[#F4EFE4]/60 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Expand & Hide Chevron */}
        <div className="flex items-center ml-1 sm:ml-2 pl-1 border-l border-[#F4EFE4]/10 shrink-0">
          {/* Expand to Immersive */}
          <button
            type="button"
            onClick={() => setUiState('IMMERSIVE')}
            aria-label="Open immersive now-playing view"
            title="Expand to immersive view"
            className="p-1.5 sm:p-2 rounded-full text-[#F4EFE4]/60 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Hide Chevron */}
          <button
            type="button"
            onClick={() => setUiState('HIDDEN')}
            aria-label="Hide dock to disc"
            title="Minimize to launcher"
            className="p-1.5 sm:p-2 rounded-full text-[#F4EFE4]/60 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
          >
            <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* Bottom Hairline Progress Scrub */}
        <div
          ref={progressLineRef}
          onMouseDown={handleProgressMouseDown}
          className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 hover:h-2 bg-[#F4EFE4]/15 cursor-pointer transition-all duration-150"
          title={`Progress: ${Math.floor(currentTime)}s / ${Math.floor(duration)}s`}
        >
          <div
            className="h-full bg-[#E01B24] transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
