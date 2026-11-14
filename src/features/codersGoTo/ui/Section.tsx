import React, { useState } from 'react';
import { Container } from '../../../components/Container';
import { SectionHeader } from '../../../components/SectionHeader';
import { usePlayer } from '../PlayerProvider';
import { OrbitCarousel } from './OrbitCarousel';
import { Controls } from './Controls';
import { ProgressBar } from './ProgressBar';
import { VolumeSlider } from './VolumeSlider';
import { QueueList } from './QueueList';
import { CreditLine } from './CreditLine';
import { Heart, Maximize2, RotateCcw } from 'lucide-react';

export const Section: React.FC = () => {
  const {
    tracks,
    playingIndex,
    currentTrack,
    isPlaying,
    isBuffering,
    hasAudio,
    currentTime,
    duration,
    progress,
    volume,
    muted,
    shuffle,
    repeat,
    liked,
    energy,
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

  const [carouselIndex, setCarouselIndex] = useState(playingIndex);

  // Active track on carousel
  const activeTrack = tracks[carouselIndex] || currentTrack || tracks[0];
  const isPlayingActive = isPlaying && playingIndex === carouselIndex;
  const isDifferentFromPlaying = isPlaying && playingIndex !== carouselIndex;

  const handleSelectTrack = (index: number) => {
    setCarouselIndex(index);
  };

  const handleTogglePlay = async (index: number) => {
    if (index === playingIndex) {
      await toggle();
    } else {
      await playTrack(index);
    }
  };

  const isLiked = activeTrack ? liked.has(activeTrack.id) : false;

  return (
    <section
      id="go-to"
      data-bg="grad-void"
      className="relative min-h-screen py-16 md:py-32 overflow-hidden select-none cgt-root"
    >
      {/* Section-Scoped Backdrop Layer (§10.5) */}
      {currentTrack && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out z-0"
          style={{
            opacity: isPlaying ? 0.28 : 0.08,
            clipPath: 'inset(0)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 140px, black calc(100% - 140px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 140px, black calc(100% - 140px), transparent 100%)',
          }}
        >
          {/* Blurred art background */}
          <div
            className="absolute inset-0 bg-cover bg-center cgt-animate-drift"
            style={{
              backgroundImage: `url(${currentTrack.cover?.blur32 || currentTrack.cover?.src160 || ''})`,
              filter: 'blur(70px) saturate(1.4) brightness(0.4)',
              transform: 'scale(1.5)',
            }}
          />

          {/* Accent colour-pull */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(65% 55% at 50% 40%, ${
                currentTrack.accent || '#E01B24'
              }30, transparent 75%)`,
            }}
          />

          {/* Dark ink veil */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/80 via-[#0A0A0B]/60 to-[#0A0A0B]/90" />
        </div>
      )}

      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          index="06"
          metaName="THE CODER'S GO-TO"
          ghostWord="PLAYLIST"
          line1="The coder's"
          line2="*go-to*"
          intro="What's in my headphones when the commits get serious. Press play — I'll keep it low."
        />

        {/* 1. Orbit Carousel Stage (cols 1–12, ~60vh) */}
        <div className="mt-8 mb-12">
          <OrbitCarousel
            tracks={tracks}
            activeIndex={carouselIndex}
            playingIndex={playingIndex}
            isPlaying={isPlaying}
            progress={progress}
            bassEnergy={energy.bass}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
          />
        </div>

        {/* 2. Transport & Meta Control Bar (12-column grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[28px] cgt-glass border border-[#F4EFE4]/15 mb-10 md:mb-16 shadow-2xl">
          {/* COLS 1–4: Now Playing Meta */}
          <div className="md:col-span-4 min-w-0 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full border border-[#F4EFE4]/20 bg-[#F4EFE4]/5 font-mono text-[10px] uppercase tracking-widest text-[#F4EFE4]/70">
                {activeTrack.mood}
              </span>
              {isDifferentFromPlaying && (
                <button
                  type="button"
                  onClick={() => setCarouselIndex(playingIndex)}
                  className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#E01B24] hover:underline"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Back to playing
                </button>
              )}
            </div>

            <h3 className="font-display font-bold text-xl lg:text-2xl text-[#F4EFE4] tracking-tight truncate max-w-full">
              {activeTrack.title}
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-[#F4EFE4]/60 mt-0.5 truncate max-w-full">
              {activeTrack.artist}
            </p>
            {activeTrack.note && (
              <p className="font-serif italic text-xs lg:text-sm text-[#F4EFE4]/70 mt-2 line-clamp-2 max-w-[38ch]">
                "{activeTrack.note}"
              </p>
            )}
          </div>

          {/* COLS 5–8: Transport Controls & Progress Bar */}
          <div className="md:col-span-4 flex flex-col items-center justify-center w-full">
            <Controls
              isPlaying={isPlayingActive}
              isBuffering={isBuffering && playingIndex === carouselIndex}
              hasAudio={hasAudio}
              shuffle={shuffle}
              repeat={repeat}
              size="md"
              onTogglePlay={() => handleTogglePlay(carouselIndex)}
              onNext={next}
              onPrev={prev}
              onToggleShuffle={toggleShuffle}
              onCycleRepeat={cycleRepeat}
              className="mb-3"
            />
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={seek}
              className="w-full max-w-sm"
            />
          </div>

          {/* COLS 9–12: Extras (Volume, Like, Open Lyrics) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-3 w-full">
            <div className="flex items-center gap-3">
              {/* Volume (hidden on small mobile where screen space is tight and hardware buttons are used) */}
              <div className="hidden sm:flex">
                <VolumeSlider
                  volume={volume}
                  muted={muted}
                  onVolumeChange={setVolume}
                  onToggleMute={toggleMute}
                />
              </div>

              {/* Like Button */}
              <button
                type="button"
                onClick={() => toggleLike(activeTrack.id)}
                aria-label={isLiked ? 'Unlike track' : 'Like track'}
                className={`p-2.5 rounded-full border border-[#F4EFE4]/15 bg-[#F4EFE4]/5 hover:bg-[#F4EFE4]/10 transition-colors focus:outline-none ${
                  isLiked ? 'text-[#E01B24]' : 'text-[#F4EFE4]/60'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Open Immersive View / Lyrics Button */}
            <button
              type="button"
              onClick={() => {
                if (playingIndex !== carouselIndex) {
                  playTrack(carouselIndex);
                }
                setUiState('IMMERSIVE');
              }}
              data-cursor="view"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#F4EFE4]/20 bg-[#F4EFE4]/5 hover:bg-[#F4EFE4]/15 hover:border-[#E01B24]/50 transition-all font-mono text-[11px] uppercase tracking-wider text-[#F4EFE4] group"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#E01B24] group-hover:scale-110 transition-transform" />
              <span>Open Lyrics &amp; Now Playing</span>
            </button>
          </div>
        </div>

        {/* 3. Queue List (Cols 1–12) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#F4EFE4]/60">
              TRACKLIST / QUEUE
            </h4>
            <span className="font-mono text-[11px] text-[#F4EFE4]/40">
              {tracks.length} TRACKS
            </span>
          </div>

          <QueueList
            tracks={tracks}
            playingIndex={playingIndex}
            isPlaying={isPlaying}
            onSelectTrack={(i) => {
              setCarouselIndex(i);
              playTrack(i);
            }}
          />
        </div>

        {/* 4. Credit Line */}
        <div className="pt-6 border-t border-[#F4EFE4]/10">
          <CreditLine track={activeTrack} />
        </div>
      </Container>
    </section>
  );
};

