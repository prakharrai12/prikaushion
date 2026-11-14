import React from 'react';
import { Track } from '../data/types';

interface BlurBackdropProps {
  track: Track | null;
  bassEnergy?: number;
  mode?: 'fullscreen' | 'section';
  className?: string;
}

export const BlurBackdrop: React.FC<BlurBackdropProps> = ({
  track,
  bassEnergy = 0,
  mode = 'fullscreen',
  className = '',
}) => {
  const accent = track?.accent || '#E01B24';
  const coverSrc = track?.cover?.blur32 || track?.cover?.src160 || track?.cover?.src640;

  if (mode === 'section') {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-25 transition-opacity duration-1000 ${className}`}
        style={{
          clipPath: 'inset(0)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 160px, black calc(100% - 160px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 160px, black calc(100% - 160px), transparent 100%)',
        }}
      >
        {coverSrc ? (
          <div
            className="w-full h-full scale-125 filter blur-3xl opacity-60"
            style={{
              backgroundImage: `url(${coverSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(70% 60% at 50% 40%, ${accent}33 0%, rgba(10,10,11,0.95) 75%)`,
            }}
          />
        )}
      </div>
    );
  }

  // Fullscreen Immersive Backdrop
  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-[-1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Deep Blown-Out Art Layer */}
      {coverSrc ? (
        <div
          className="absolute -inset-10 bg-cover bg-center scale-150 filter blur-[64px] brightness-[0.45] saturate-[1.35] transition-all duration-1000 ease-out"
          style={{ backgroundImage: `url(${coverSrc})` }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${accent}22 0%, #0A0A0B 75%)`,
          }}
        />
      )}

      {/* 2. Dynamic Accent Colour-Pull Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          background: `radial-gradient(65% 55% at 25% 30%, ${accent}66 0%, transparent 70%)`,
          opacity: 0.8 + bassEnergy * 0.2,
        }}
      />

      {/* 3. Dark Editorial Ink Veil & Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.72) 55%, rgba(10,10,11,0.94) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(10,10,11,0.75) 100%)',
        }}
      />
    </div>
  );
};

