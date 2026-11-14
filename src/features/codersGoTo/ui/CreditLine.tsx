import React from 'react';
import { Track } from '../data/types';
import { ExternalLink } from 'lucide-react';

interface CreditLineProps {
  track: Track | null;
  className?: string;
}

export const CreditLine: React.FC<CreditLineProps> = ({ track, className = '' }) => {
  if (!track) return null;

  const isOwned = track.credit?.license === 'Owned';

  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-wider text-[rgba(244,239,228,0.55)] flex items-center flex-wrap gap-2 ${className}`}
    >
      {isOwned ? (
        <span>ORIGINAL — © Prakhar Kaushik</span>
      ) : (
        <span>
          MUSIC — {track.title} BY {track.artist} · {track.credit?.license || 'LICENSED'}
        </span>
      )}

      {track.credit?.sourceUrl && (
        <a
          href={track.credit.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E01B24] hover:underline flex items-center gap-1 font-semibold"
        >
          <span>SOURCE</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}

      {track.externalUrl && (
        <a
          href={track.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F4EFE4] hover:text-[#E01B24] transition-colors flex items-center gap-1 ml-1"
        >
          <span>OPEN IN SPOTIFY</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  );
};

