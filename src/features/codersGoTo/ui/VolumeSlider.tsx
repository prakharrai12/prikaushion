import React, { useState, useEffect } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

interface VolumeSliderProps {
  volume: number; // 0..1
  muted: boolean;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  className?: string;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  className = '',
}) => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAppleMobile =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(isAppleMobile);
    }
  }, []);

  if (isIOS) return null;

  const effectiveVolume = muted ? 0 : volume;

  const VolumeIcon = effectiveVolume === 0 ? VolumeX : effectiveVolume < 0.5 ? Volume1 : Volume2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onVolumeChange(val);
  };

  return (
    <div className={`flex items-center gap-2 select-none group/vol ${className}`}>
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="p-1.5 text-[rgba(244,239,228,0.7)] hover:text-[#F4EFE4] transition-colors focus:outline-none"
      >
        <VolumeIcon className="w-4 h-4" />
      </button>

      <div className="relative w-20 md:w-24 h-6 flex items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={effectiveVolume}
          onChange={handleChange}
          aria-label="Volume slider"
          className="w-full h-1 bg-[rgba(244,239,228,0.2)] accent-[#E01B24] rounded-pill cursor-pointer focus:outline-none appearance-none"
          style={{
            background: `linear-gradient(to right, #F4EFE4 ${effectiveVolume * 100}%, rgba(244,239,228,0.2) ${effectiveVolume * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};

