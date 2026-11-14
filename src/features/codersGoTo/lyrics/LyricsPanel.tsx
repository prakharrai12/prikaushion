import React, { useRef, useEffect, useState } from 'react';
import { LyricLine, Track } from '../data/types';
import { useLyricSync } from './useLyricSync';
import { parseLrc } from './parseLrc';
import { ExternalLink, Sparkles } from 'lucide-react';

interface LyricsPanelProps {
  track: Track | null;
  currentTime: number;
  isPlaying: boolean;
  onSeek: (seconds: number) => void;
  className?: string;
}

export const LyricsPanel: React.FC<LyricsPanelProps> = ({
  track,
  currentTime,
  isPlaying,
  onSeek,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [plainText, setPlainText] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lyricsKind = track?.lyrics.kind || 'none';

  // Load lyrics text or LRC
  useEffect(() => {
    if (!track) {
      setLyrics([]);
      setPlainText([]);
      return;
    }

    if (track.lyrics.kind === 'synced' && track.lyrics.lrcUrl) {
      setIsLoading(true);
      fetch(track.lyrics.lrcUrl)
        .then((res) => res.text())
        .then((text) => {
          const parsed = parseLrc(text, track.durationSec);
          setLyrics(parsed);
        })
        .catch(() => setLyrics([]))
        .finally(() => setIsLoading(false));
    } else if (track.lyrics.kind === 'plain' && track.lyrics.textUrl) {
      setIsLoading(true);
      fetch(track.lyrics.textUrl)
        .then((res) => res.text())
        .then((text) => {
          setPlainText(text.split(/\r?\n/).filter((l) => l.trim().length > 0));
        })
        .catch(() => setPlainText([]))
        .finally(() => setIsLoading(false));
    } else {
      setLyrics([]);
      setPlainText([]);
    }
  }, [track]);

  const activeIndex = useLyricSync(lyrics, currentTime, isPlaying, true);

  // Auto-scroll active line to ~38% of container height
  useEffect(() => {
    if (userScrolled || activeIndex < 0 || !containerRef.current) return;

    const container = containerRef.current;
    const activeEl = container.querySelector<HTMLElement>(`[data-line-idx="${activeIndex}"]`);
    if (activeEl) {
      const targetScroll =
        activeEl.offsetTop - container.clientHeight * 0.38 + activeEl.clientHeight / 2;
      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [activeIndex, userScrolled]);

  const handleUserScroll = () => {
    setUserScrolled(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    // Pause auto-scroll for 3.5s
    scrollTimeoutRef.current = setTimeout(() => {
      setUserScrolled(false);
    }, 3500);
  };

  const handleResumeLive = () => {
    setUserScrolled(false);
    if (activeIndex >= 0 && containerRef.current) {
      const activeEl = containerRef.current.querySelector<HTMLElement>(`[data-line-idx="${activeIndex}"]`);
      if (activeEl) {
        const targetScroll =
          activeEl.offsetTop - containerRef.current.clientHeight * 0.38 + activeEl.clientHeight / 2;
        containerRef.current.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div
      className={`cgt-glass relative w-full h-full flex flex-col p-6 md:p-8 select-none ${className}`}
      data-lenis-prevent
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(244,239,228,0.1)] shrink-0 z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#F4EFE4] font-semibold flex items-center gap-2">
          <span>LYRICS</span>
          {lyricsKind === 'synced' && (
            <span className="flex items-center gap-1.5 text-[10px] text-[#E01B24] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24] animate-pulse" />
              SYNCED
            </span>
          )}
          {lyricsKind === 'plain' && (
            <span className="text-[10px] text-[rgba(244,239,228,0.5)] font-mono">
              ○ UNSYNCED
            </span>
          )}
        </span>

        {track?.lyrics.kind === 'synced' && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-[rgba(244,239,228,0.4)]">
            CLICK TO JUMP
          </span>
        )}
      </div>

      {/* Main Content Area */}
      <div
        ref={containerRef}
        onWheel={handleUserScroll}
        onTouchMove={handleUserScroll}
        className="relative grow overflow-y-auto overscroll-contain py-8 pr-2 focus:outline-none"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[rgba(244,239,228,0.4)]">
            LOADING LYRICS...
          </div>
        ) : lyricsKind === 'synced' && lyrics.length > 0 ? (
          <div className="flex flex-col gap-6 py-12">
            {lyrics.map((line, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              const distance = Math.abs(idx - activeIndex);

              const colorClass = isActive
                ? 'text-[#F4EFE4] font-extrabold scale-100'
                : distance <= 3
                ? 'text-[rgba(244,239,228,0.38)] scale-[0.96]'
                : isPast
                ? 'text-[rgba(244,239,228,0.22)] scale-[0.94]'
                : 'text-[rgba(244,239,228,0.14)] scale-[0.94]';

              return (
                <div
                  key={idx}
                  data-line-idx={idx}
                  onClick={() => onSeek(line.t)}
                  data-cursor="jump"
                  className={`group relative flex items-center cursor-pointer transition-all duration-500 origin-left ${colorClass}`}
                >
                  {/* Active Line Left Sparkle */}
                  {isActive && (
                    <Sparkles className="absolute -left-6 w-3.5 h-3.5 text-[#E01B24] animate-pulse" />
                  )}

                  <p className="font-sans text-[clamp(1.25rem,2.4vw,2.2rem)] leading-tight tracking-tight select-none">
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>
        ) : lyricsKind === 'plain' && plainText.length > 0 ? (
          <div className="flex flex-col gap-4 py-8">
            <span className="font-mono text-[10px] text-[rgba(244,239,228,0.4)] uppercase tracking-wider mb-2">
              Not time-synced for this track.
            </span>
            {plainText.map((pLine, pIdx) => (
              <p
                key={pIdx}
                className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-[rgba(244,239,228,0.72)] leading-relaxed"
              >
                {pLine}
              </p>
            ))}
          </div>
        ) : lyricsKind === 'instrumental' ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-4">
            <div className="w-16 h-16 rounded-full border border-[rgba(244,239,228,0.15)] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#E01B24]/80 animate-ping" />
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#E01B24] font-semibold">
              INSTRUMENTAL
            </div>
            <p className="font-whisper text-xl md:text-2xl text-[rgba(244,239,228,0.7)] max-w-[32ch]">
              {track?.note || 'Pure frequencies for high-focus coding.'}
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3">
            <div className="font-display font-light text-2xl text-[#F4EFE4]">
              No lyrics for this one.
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-[rgba(244,239,228,0.5)]">
              YOU CAN STILL CODE TO IT.
            </div>
            {track?.externalUrl && (
              <a
                href={track.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded-pill border border-[rgba(244,239,228,0.2)] font-mono text-[10px] uppercase tracking-wider text-[#F4EFE4] hover:border-[#E01B24] hover:text-[#E01B24] transition-colors flex items-center gap-1.5"
              >
                <span>Find lyrics</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Floating "Back to Live" pill when scrolled away */}
      {userScrolled && lyricsKind === 'synced' && (
        <button
          type="button"
          onClick={handleResumeLive}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-pill bg-[#0F0E10] border border-[#E01B24] text-[#F4EFE4] font-mono text-[10px] uppercase tracking-wider shadow-2xl flex items-center gap-1.5 animate-bounce focus:outline-none z-20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24]" />
          <span>Back to live</span>
        </button>
      )}
    </div>
  );
};
