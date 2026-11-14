import React from 'react';
import { Track } from '../data/types';
import { Equalizer } from './Equalizer';
import { GenerativeCover } from './GenerativeCover';

interface QueueListProps {
  tracks: Track[];
  playingIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  className?: string;
}

export const QueueList: React.FC<QueueListProps> = ({
  tracks,
  playingIndex,
  isPlaying,
  onSelectTrack,
  className = '',
}) => {
  const formatDuration = (sec?: number) => {
    if (!sec) return '--:--';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`w-full divide-y divide-[rgba(244,239,228,0.08)] ${className}`}>
      {tracks.map((track, idx) => {
        const isCurrent = idx === playingIndex;
        const isCurrentPlaying = isCurrent && isPlaying;

        return (
          <div
            key={track.id}
            onClick={() => onSelectTrack(idx)}
            className={`group relative flex items-center justify-between py-3.5 px-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[rgba(244,239,228,0.04)] ${
              isCurrent ? 'bg-[rgba(244,239,228,0.03)]' : ''
            }`}
          >
            {/* Active Left Crimson Bar */}
            {isCurrent && (
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#E01B24] rounded-full" />
            )}

            {/* Left: Index / Equalizer + Cover + Meta */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Index or Equalizer */}
              <div className="w-6 flex items-center justify-center font-mono text-xs tabular-nums text-[rgba(244,239,228,0.45)]">
                {isCurrentPlaying ? (
                  <Equalizer isPlaying={true} size="sm" />
                ) : (
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                )}
              </div>

              {/* 48px Mini Cover */}
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-[rgba(244,239,228,0.1)] bg-[#161417] shrink-0">
                {track.cover?.src160 ? (
                  <img
                    src={track.cover.src160}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GenerativeCover track={track} index={idx} className="p-1.5" />
                )}
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex flex-col group-hover:translate-x-1.5 transition-transform duration-300">
                <span
                  className={`font-sans font-semibold text-sm truncate ${
                    isCurrent ? 'text-[#F4EFE4]' : 'text-[rgba(244,239,228,0.8)]'
                  }`}
                >
                  {track.title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[rgba(244,239,228,0.5)] truncate">
                  {track.artist}
                </span>
              </div>
            </div>

            {/* Right: Mood Chip + Duration */}
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-pill border border-[rgba(244,239,228,0.12)] text-[10px] uppercase tracking-widest text-[rgba(244,239,228,0.6)]">
                {track.mood}
              </span>
              <span className="tabular-nums text-[rgba(244,239,228,0.5)]">
                {formatDuration(track.durationSec)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

