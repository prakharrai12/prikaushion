import React, { useEffect, useState } from 'react';
import { Track } from '../data/types';
import { GenerativeCover } from './GenerativeCover';

interface VinylSleeveProps {
  track: Track;
  index: number;
  isPlaying: boolean;
  isFront: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const VinylSleeve: React.FC<VinylSleeveProps> = ({
  track,
  index,
  isPlaying,
  isFront,
  size = 200,
  className = '',
  onClick,
}) => {
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    if (!isFront) {
      setSlideOut(false);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (isPlaying) {
      setSlideOut(true);
    } else {
      // Slide back 2s after pause
      timeoutId = setTimeout(() => {
        setSlideOut(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isPlaying, isFront]);

  const discOffset = slideOut ? size * 0.28 : 0;

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative select-none flex-shrink-0 cursor-pointer ${className}`}
    >
      {/* Vinyl Disc (slides out to right behind sleeve) */}
      {isFront && (
        <div
          style={{
            width: size * 0.94,
            height: size * 0.94,
            top: size * 0.03,
            left: size * 0.03,
            transform: `translate3d(${discOffset}px, 0, 0)`,
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="hidden min-[480px]:flex absolute rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.85)] items-center justify-center overflow-hidden z-0 pointer-events-none"
        >
          {/* Rotating Vinyl Grooves */}
          <div
            className={`w-full h-full rounded-full relative ${
              isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
            }`}
            style={{
              background:
                'repeating-radial-gradient(circle at center, #050506 0px, #050506 2px, rgba(244,239,228,0.04) 3px, #050506 4px)',
            }}
          >
            {/* Counter-rotating Sheen Wedge */}
            <div
              className={`absolute inset-0 rounded-full opacity-40 pointer-events-none ${
                isPlaying ? 'animate-[spin_12s_linear_infinite_reverse]' : ''
              }`}
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(244,239,228,0.12) 45deg, transparent 90deg, rgba(244,239,228,0.12) 225deg, transparent 270deg)',
              }}
            />

            {/* Centre Label Circle (34% of disc) */}
            <div className="absolute inset-0 m-auto w-[34%] h-[34%] rounded-full overflow-hidden border border-[rgba(244,239,228,0.2)] bg-[#161417] shadow-inner flex items-center justify-center">
              {track.cover?.src160 ? (
                <img
                  src={track.cover.src160}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#161417] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E01B24]" />
                </div>
              )}
              {/* Spindle hole */}
              <div className="absolute w-2 h-2 rounded-full bg-[#050506] border border-[rgba(244,239,228,0.4)]" />
            </div>
          </div>
        </div>
      )}

      {/* Front Jacket Sleeve */}
      <div
        style={{ width: size, height: size }}
        className="relative z-10 rounded-lg overflow-hidden border border-[rgba(244,239,228,0.14)] bg-[#0F0E10] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-[1.02]"
      >
        {track.cover?.src640 ? (
          <img
            src={track.cover.src640}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <GenerativeCover track={track} index={index} />
        )}

        {/* Subtle Hairline Inner Highlight */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(244,239,228,0.18)]" />
      </div>
    </div>
  );
};
