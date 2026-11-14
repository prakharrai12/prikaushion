import React from 'react';
import { Track } from '../data/types';

interface GenerativeCoverProps {
  track: Track;
  index: number;
  className?: string;
}

export const GenerativeCover: React.FC<GenerativeCoverProps> = ({
  track,
  index,
  className = '',
}) => {
  const trackNum = String(index + 1).padStart(2, '0');
  const rotation = (index * 17) % 360;

  return (
    <div
      className={`relative w-full h-full bg-[#161417] text-[#F4EFE4] overflow-hidden select-none border border-[rgba(244,239,228,0.1)] flex flex-col justify-between p-4 ${className}`}
      aria-label={`Cover art for ${track.title}`}
    >
      {/* Background Orbit Ring */}
      <svg
        className="absolute -right-12 -top-12 w-48 h-48 pointer-events-none opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <ellipse
          cx="100"
          cy="100"
          rx="80"
          ry="50"
          stroke="#F4EFE4"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          transform="rotate(-25 100 100)"
        />
      </svg>

      {/* Top Row: Track Number */}
      <div className="z-10 flex items-center justify-between font-display font-light text-sm text-[rgba(244,239,228,0.7)]">
        <span>{trackNum}</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#E01B24]">
          {track.mood}
        </span>
      </div>

      {/* Centred Crimson K-Sparkle Mark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          className="w-[38%] h-[38%] text-[#E01B24] opacity-90 drop-shadow-[0_0_16px_rgba(224,27,36,0.35)] transition-transform duration-700"
          style={{ transform: `rotate(${rotation}deg)` }}
          fill="currentColor"
        >
          {/* Stylized K-sparkle */}
          <path d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z" />
        </svg>
      </div>

      {/* Bottom Row: Mono Caps Title */}
      <div className="z-10 mt-auto pt-2 border-t border-[rgba(244,239,228,0.08)]">
        <div className="font-mono text-[10px] uppercase font-bold text-[#F4EFE4] leading-tight line-clamp-2 tracking-wider">
          {track.title}
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-[rgba(244,239,228,0.5)] truncate mt-0.5">
          {track.artist}
        </div>
      </div>
    </div>
  );
};

