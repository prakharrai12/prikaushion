import React from 'react';
import { EnergyBands } from '../data/types';

interface EqualizerProps {
  isPlaying: boolean;
  energy?: EnergyBands;
  size?: 'sm' | 'md';
  className?: string;
}

export const Equalizer: React.FC<EqualizerProps> = ({
  isPlaying,
  energy,
  size = 'md',
  className = '',
}) => {
  const barWidth = size === 'sm' ? 'w-[2px]' : 'w-[2.5px]';
  const maxHeight = size === 'sm' ? 12 : 16;

  // Derive heights from real audio energy if available, else smooth CSS pulse
  const h1 = isPlaying ? Math.max(3, (energy?.bass ?? 0.6) * maxHeight) : 3;
  const h2 = isPlaying ? Math.max(3, (energy?.bass ?? 0.8) * maxHeight * 0.9) : 3;
  const h3 = isPlaying ? Math.max(3, (energy?.mid ?? 0.5) * maxHeight) : 3;
  const h4 = isPlaying ? Math.max(3, (energy?.high ?? 0.7) * maxHeight * 0.85) : 3;

  return (
    <div
      className={`flex items-end gap-[2px] h-[16px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <span
        style={{ height: `${h1}px` }}
        className={`${barWidth} bg-[#F4EFE4] rounded-[1px] transition-[height] duration-75 ease-out`}
      />
      <span
        style={{ height: `${h2}px` }}
        className={`${barWidth} bg-[#F4EFE4] rounded-[1px] transition-[height] duration-75 ease-out`}
      />
      <span
        style={{ height: `${h3}px` }}
        className={`${barWidth} bg-[#F4EFE4] rounded-[1px] transition-[height] duration-75 ease-out`}
      />
      <span
        style={{ height: `${h4}px` }}
        className={`${barWidth} bg-[#F4EFE4] rounded-[1px] transition-[height] duration-75 ease-out`}
      />
    </div>
  );
};

