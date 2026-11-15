import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Loader2 } from 'lucide-react';
import { RepeatMode } from '../data/types';

interface ControlsProps {
  isPlaying: boolean;
  isBuffering?: boolean;
  hasAudio: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  isLiked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showSecondary?: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleShuffle?: () => void;
  onCycleRepeat?: () => void;
  onToggleLike?: () => void;
  className?: string;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  isBuffering = false,
  hasAudio,
  shuffle,
  repeat,
  isLiked = false,
  size = 'md',
  showSecondary = true,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleShuffle,
  onCycleRepeat,
  onToggleLike,
  className = '',
}) => {
  const playButtonSize =
    size === 'lg'
      ? 'w-[72px] h-[72px] md:w-[80px] md:h-[80px]'
      : size === 'sm'
      ? 'w-[40px] h-[40px]'
      : 'w-[56px] h-[56px] md:w-[64px] md:h-[64px]';

  const playIconSize = size === 'lg' ? 'w-6 h-6 md:w-7 md:h-7' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5 md:w-6 md:h-6';

  return (
    <div className={`flex items-center justify-center gap-3 md:gap-5 select-none ${className}`}>
      {/* Shuffle Button */}
      {showSecondary && onToggleShuffle && (
        <button
          type="button"
          onClick={onToggleShuffle}
          aria-label="Toggle shuffle"
          aria-pressed={shuffle}
          className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full transition-colors focus:outline-none ${
            shuffle ? 'text-[#F4EFE4]' : 'text-[rgba(244,239,228,0.4)] hover:text-[#F4EFE4]'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          {shuffle && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E01B24]" />
          )}
        </button>
      )}

      {/* Previous Track Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full text-[rgba(244,239,228,0.7)] hover:text-[#F4EFE4] hover:-translate-x-0.5 active:translate-x-0 transition-all focus:outline-none"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      {/* Main Play / Pause Circle */}
      <button
        type="button"
        onClick={onTogglePlay}
        disabled={!hasAudio}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        title={!hasAudio ? 'Audio coming soon' : undefined}
        className={`relative shrink-0 aspect-square ${playButtonSize} rounded-full bg-[#F4EFE4] text-[#0A0A0B] flex items-center justify-center shadow-xl hover:bg-[#E01B24] hover:text-[#F4EFE4] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none ${
          !hasAudio ? 'opacity-35 cursor-not-allowed hover:bg-[#F4EFE4] hover:text-[#0A0A0B]' : ''
        }`}
      >
        {isBuffering ? (
          <Loader2 className={`${playIconSize} animate-spin text-[#E01B24]`} />
        ) : isPlaying ? (
          <Pause className={`${playIconSize} fill-current`} />
        ) : (
          <Play className={`${playIconSize} fill-current ml-0.5`} />
        )}
      </button>

      {/* Next Track Button */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full text-[rgba(244,239,228,0.7)] hover:text-[#F4EFE4] hover:translate-x-0.5 active:translate-x-0 transition-all focus:outline-none"
      >
        <SkipForward className="w-5 h-5" />
      </button>

      {/* Repeat Button */}
      {showSecondary && onCycleRepeat && (
        <button
          type="button"
          onClick={onCycleRepeat}
          aria-label={`Cycle repeat (current: ${repeat})`}
          className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full transition-colors focus:outline-none ${
            repeat !== 'off' ? 'text-[#F4EFE4]' : 'text-[rgba(244,239,228,0.4)] hover:text-[#F4EFE4]'
          }`}
        >
          <Repeat className="w-4 h-4" />
          {repeat !== 'off' && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E01B24]" />
          )}
          {repeat === 'one' && (
            <span className="absolute -top-1 -right-1 font-mono text-[9px] font-bold text-[#E01B24]">
              1
            </span>
          )}
        </button>
      )}

      {/* Like Button */}
      {showSecondary && onToggleLike && (
        <button
          type="button"
          onClick={onToggleLike}
          aria-label={isLiked ? 'Unlike track' : 'Like track'}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full transition-transform hover:scale-110 active:scale-95 focus:outline-none"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-[#E01B24] text-[#E01B24]' : 'text-[rgba(244,239,228,0.4)] hover:text-[#F4EFE4]'
            }`}
          />
        </button>
      )}
    </div>
  );
};

