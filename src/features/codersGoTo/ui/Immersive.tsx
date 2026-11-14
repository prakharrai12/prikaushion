import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  X,
  Heart,
  ListMusic,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { usePlayer } from '../PlayerProvider';
import { BlurBackdrop } from './BlurBackdrop';
import { Controls } from './Controls';
import { ProgressBar } from './ProgressBar';
import { VolumeSlider } from './VolumeSlider';
import { LyricsPanel } from '../lyrics/LyricsPanel';
import { QueueList } from './QueueList';
import { CreditLine } from './CreditLine';
import { GenerativeCover } from './GenerativeCover';
import { getLenis } from '../../../lib/lenis';

export const Immersive: React.FC = () => {
  const {
    tracks,
    playingIndex,
    currentTrack,
    isPlaying,
    isBuffering,
    hasAudio,
    currentTime,
    duration,
    volume,
    muted,
    shuffle,
    repeat,
    liked,
    energy,
    uiState,
    setUiState,
    playTrack,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleLike,
  } = usePlayer();

  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue'>('player');
  const [showQueueDrawer, setShowQueueDrawer] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [artTilt, setArtTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = uiState === 'IMMERSIVE';

  // Scroll lock and Lenis pause
  useEffect(() => {
    if (isOpen) {
      const lenis = getLenis();
      if (lenis) lenis.stop();
      const prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';

      return () => {
        if (lenis) lenis.start();
        document.documentElement.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation inside Immersive view only (§8.4)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (showShortcuts) {
            setShowShortcuts(false);
          } else if (showQueueDrawer) {
            setShowQueueDrawer(false);
          } else {
            setUiState('DOCKED');
          }
          break;
        case ' ':
          e.preventDefault();
          toggle();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (e.shiftKey) {
            next();
          } else {
            seek(Math.min(duration, currentTime + 5));
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (e.shiftKey) {
            prev();
          } else {
            seek(Math.max(0, currentTime - 5));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.05));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.05));
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'q':
        case 'Q':
          e.preventDefault();
          setShowQueueDrawer((prev) => !prev);
          break;
        case '?':
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    showShortcuts,
    showQueueDrawer,
    setUiState,
    toggle,
    next,
    prev,
    seek,
    currentTime,
    duration,
    volume,
    setVolume,
    toggleMute,
  ]);

  // Subtle 3D mouse tilt on album art (Desktop)
  const handleArtMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setArtTilt({ x: x * 8, y: -y * 8 });
  };

  const handleArtMouseLeave = () => {
    setArtTilt({ x: 0, y: 0 });
  };

  if (!isOpen || !currentTrack) {
    return null;
  }

  const isCurrentLiked = liked.has(currentTrack.id);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Now playing music player"
      className="fixed inset-0 z-[89] flex flex-col text-[#F4EFE4] select-none overflow-hidden cgt-root"
    >
      {/* Dynamic blurred art background with dark ink veil */}
      <BlurBackdrop
        track={currentTrack}
        bassEnergy={energy.bass}
      />

      {/* TOP BAR (72px) */}
      <header className="relative z-20 h-16 md:h-18 px-4 md:px-8 flex items-center justify-between border-b border-[#F4EFE4]/10 bg-[#0A0A0B]/40 backdrop-blur-md shrink-0">
        {/* Left: Collapse button */}
        <button
          type="button"
          onClick={() => setUiState('DOCKED')}
          aria-label="Minimize player"
          className="p-2 -ml-2 rounded-full text-[#F4EFE4]/70 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        {/* Center: Context header */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#F4EFE4]/60">
            PLAYING FROM
          </span>
          <span className="font-mono text-[11px] md:text-[12px] font-bold uppercase tracking-wider text-[#F4EFE4]">
            THE CODER'S GO-TO
          </span>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-1 -mr-2">
          {/* Like Heart */}
          <button
            type="button"
            onClick={() => toggleLike(currentTrack.id)}
            aria-label={isCurrentLiked ? 'Unlike track' : 'Like track'}
            className={`p-2 rounded-full transition-colors focus:outline-none ${
              isCurrentLiked
                ? 'text-[#E01B24]'
                : 'text-[#F4EFE4]/70 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10'
            }`}
          >
            <Heart className={`w-5 h-5 ${isCurrentLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Queue Drawer toggle (Desktop) */}
          <button
            type="button"
            onClick={() => setShowQueueDrawer((prev) => !prev)}
            aria-label="Toggle queue"
            className={`hidden md:block p-2 rounded-full transition-colors focus:outline-none ${
              showQueueDrawer
                ? 'text-[#E01B24] bg-[#F4EFE4]/10'
                : 'text-[#F4EFE4]/70 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10'
            }`}
          >
            <ListMusic className="w-5 h-5" />
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            type="button"
            onClick={() => setShowShortcuts((prev) => !prev)}
            aria-label="Keyboard shortcuts"
            className="p-2 rounded-full text-[#F4EFE4]/70 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setUiState('DOCKED')}
            aria-label="Close now playing"
            className="p-2 rounded-full text-[#F4EFE4]/70 hover:text-[#F4EFE4] hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MOBILE SEGMENTED CONTROL (< 1100px) */}
      <div className="md:hidden relative z-20 flex items-center justify-around border-b border-[#F4EFE4]/10 bg-[#0A0A0B]/30 px-4 py-2 shrink-0 font-mono text-xs uppercase tracking-widest">
        {(['player', 'lyrics', 'queue'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative py-1.5 px-3 transition-colors ${
              activeTab === tab ? 'text-[#F4EFE4] font-bold' : 'text-[#F4EFE4]/50'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E01B24] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex-1 overflow-y-auto cgt-custom-scroll p-4 md:p-8 lg:p-12">
        {/* DESKTOP 12-COL GRID (>= 1100px) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12 max-w-7xl mx-auto items-center min-h-[calc(100svh-160px)]">
          {/* LEFT 5 COLS: Art + Meta + Controls */}
          <div className="col-span-5 flex flex-col justify-center">
            {/* Album Art with Mouse Tilt */}
            <div
              onMouseMove={handleArtMouseMove}
              onMouseLeave={handleArtMouseLeave}
              className="relative w-full max-w-[420px] aspect-square mx-auto mb-6 rounded-2xl overflow-hidden border border-[#F4EFE4]/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${artTilt.y}deg) rotateY(${artTilt.x}deg) scale(${
                  isPlaying ? 1 : 0.96
                })`,
              }}
            >
              {currentTrack.cover?.src640 ? (
                <img
                  src={currentTrack.cover.src640}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <GenerativeCover
                  track={currentTrack}
                  index={playingIndex}
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Track Info */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full border border-[#F4EFE4]/20 bg-[#F4EFE4]/5 font-mono text-[10px] uppercase tracking-widest text-[#F4EFE4]/80">
                  {currentTrack.mood}
                </span>
                <h2 className="font-display font-extrabold text-2xl xl:text-3xl text-[#F4EFE4] tracking-tight truncate">
                  {currentTrack.title}
                </h2>
                <p className="font-mono text-xs uppercase tracking-widest text-[#F4EFE4]/60 mt-1">
                  {currentTrack.artist}
                </p>
                {currentTrack.note && (
                  <p className="font-serif italic text-sm text-[#F4EFE4]/70 mt-2 max-w-[34ch]">
                    "{currentTrack.note}"
                  </p>
                )}
              </div>

              {/* Like Button */}
              <button
                type="button"
                onClick={() => toggleLike(currentTrack.id)}
                className={`p-3 rounded-full border border-[#F4EFE4]/15 bg-[#F4EFE4]/5 hover:bg-[#F4EFE4]/10 transition-colors shrink-0 ${
                  isCurrentLiked ? 'text-[#E01B24]' : 'text-[#F4EFE4]/70'
                }`}
                aria-label={isCurrentLiked ? 'Unlike track' : 'Like track'}
              >
                <Heart className={`w-5 h-5 ${isCurrentLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={seek}
              className="mb-4"
            />

            {/* Controls */}
            <Controls
              isPlaying={isPlaying}
              isBuffering={isBuffering}
              hasAudio={hasAudio}
              shuffle={shuffle}
              repeat={repeat}
              size="lg"
              onTogglePlay={toggle}
              onNext={next}
              onPrev={prev}
              onToggleShuffle={toggleShuffle}
              onCycleRepeat={cycleRepeat}
              className="mb-6"
            />

            {/* Volume Slider */}
            <div className="flex justify-center mb-6">
              <VolumeSlider
                volume={volume}
                muted={muted}
                onVolumeChange={setVolume}
                onToggleMute={toggleMute}
              />
            </div>

            {/* Credit Line & External link */}
            <div className="pt-4 border-t border-[#F4EFE4]/10">
              <CreditLine track={currentTrack} />
              {currentTrack.externalUrl && (
                <a
                  href={currentTrack.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#E01B24] hover:underline mt-2"
                >
                  Listen on external platform <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT 7 COLS: Glass Lyrics Panel */}
          <div className="col-span-7 h-[680px]">
            <LyricsPanel
              track={currentTrack}
              currentTime={currentTime}
              isPlaying={isPlaying}
              onSeek={seek}
              className="h-full shadow-2xl"
            />
          </div>
        </div>

        {/* MOBILE / TABLET TABBED VIEW (< 1100px) */}
        <div className="lg:hidden flex flex-col justify-center min-h-[calc(100svh-180px)]">
          {activeTab === 'player' && (
            <div className="max-w-md mx-auto w-full flex flex-col items-center">
              {/* Album Art */}
              <div className="w-full aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-[#F4EFE4]/20 shadow-2xl mb-6">
                {currentTrack.cover?.src640 ? (
                  <img
                    src={currentTrack.cover.src640}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GenerativeCover
                    track={currentTrack}
                    index={playingIndex}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Title & Artist */}
              <div className="w-full text-left mb-6">
                <span className="inline-block px-2 py-0.5 mb-1.5 rounded-full border border-[#F4EFE4]/20 bg-[#F4EFE4]/5 font-mono text-[9px] uppercase tracking-widest text-[#F4EFE4]/70">
                  {currentTrack.mood}
                </span>
                <h2 className="font-display font-extrabold text-2xl text-[#F4EFE4] truncate">
                  {currentTrack.title}
                </h2>
                <p className="font-mono text-xs uppercase tracking-widest text-[#F4EFE4]/60 mt-1">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Progress Bar */}
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seek}
                className="w-full mb-4"
              />

              {/* Controls */}
              <Controls
                isPlaying={isPlaying}
                isBuffering={isBuffering}
                hasAudio={hasAudio}
                shuffle={shuffle}
                repeat={repeat}
                size="md"
                onTogglePlay={toggle}
                onNext={next}
                onPrev={prev}
                onToggleShuffle={toggleShuffle}
                onCycleRepeat={cycleRepeat}
                className="w-full mb-6"
              />

              {/* Credit Line */}
              <CreditLine track={currentTrack} />
            </div>
          )}

          {activeTab === 'lyrics' && (
            <div className="h-[calc(100svh-220px)] flex flex-col">
              <LyricsPanel
                track={currentTrack}
                currentTime={currentTime}
                isPlaying={isPlaying}
                onSeek={seek}
                className="flex-1 mb-4"
              />
              {/* Mini transport row pinned below lyrics on mobile */}
              <div className="flex items-center justify-between px-4 py-2 rounded-2xl cgt-dock-glass border border-[#F4EFE4]/15 shrink-0">
                <div className="truncate font-sans font-semibold text-xs text-[#F4EFE4] max-w-[140px]">
                  {currentTrack.title}
                </div>
                <Controls
                  isPlaying={isPlaying}
                  isBuffering={isBuffering}
                  hasAudio={hasAudio}
                  shuffle={shuffle}
                  repeat={repeat}
                  size="sm"
                  showSecondary={false}
                  onTogglePlay={toggle}
                  onNext={next}
                  onPrev={prev}
                />
              </div>
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="max-w-md mx-auto w-full">
              <QueueList
                tracks={tracks}
                playingIndex={playingIndex}
                isPlaying={isPlaying}
                onSelectTrack={(i) => {
                  playTrack(i);
                  setActiveTab('player');
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP SLIDE-IN QUEUE DRAWER */}
      {showQueueDrawer && (
        <div className="hidden md:block absolute top-18 right-0 bottom-0 w-96 cgt-glass border-l border-[#F4EFE4]/15 z-30 shadow-2xl p-6 overflow-y-auto cgt-custom-scroll animate-slide-left">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F4EFE4]/10">
            <h3 className="font-display font-bold text-lg text-[#F4EFE4]">Playback Queue</h3>
            <button
              type="button"
              onClick={() => setShowQueueDrawer(false)}
              className="p-1 rounded-full text-[#F4EFE4]/60 hover:text-[#F4EFE4]"
              aria-label="Close queue"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <QueueList
            tracks={tracks}
            playingIndex={playingIndex}
            isPlaying={isPlaying}
            onSelectTrack={(i) => playTrack(i)}
          />
        </div>
      )}

      {/* KEYBOARD SHORTCUTS MODAL */}
      {showShortcuts && (
        <div
          onClick={() => setShowShortcuts(false)}
          className="fixed inset-0 z-40 bg-[#0A0A0B]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl cgt-glass p-6 border border-[#F4EFE4]/20 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F4EFE4]/10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E01B24]">
                Keyboard Shortcuts
              </span>
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="text-[#F4EFE4]/60 hover:text-[#F4EFE4]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Play / Pause</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">Space</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Seek ±5s</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">← / →</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Prev / Next track</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">Shift + ← / →</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Volume ±5%</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">↑ / ↓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Toggle Mute</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Toggle Queue</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">Q</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFE4]/60">Close view</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F4EFE4]/10 text-[#F4EFE4]">Esc</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
