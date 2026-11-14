import React, { useRef, useState } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered?: number;
  onSeek: (seconds: number) => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  buffered = 0,
  onSeek,
  className = '',
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showRemaining, setShowRemaining] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const progressRatio = safeDuration > 0 ? Math.min(1, Math.max(0, currentTime / safeDuration)) : 0;
  const bufferedRatio = safeDuration > 0 ? Math.min(1, Math.max(0, buffered / safeDuration)) : 0;

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const calculateSeekTime = (clientX: number) => {
    if (!barRef.current || safeDuration === 0) return 0;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * safeDuration;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const seekSec = calculateSeekTime(e.clientX);
    onSeek(seekSec);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const sec = (x / rect.width) * safeDuration;
    setHoverTime(sec);
    setHoverX(x);

    if (isDragging) {
      onSeek(sec);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      setHoverTime(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onSeek(Math.min(safeDuration, currentTime + 5));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onSeek(Math.max(0, currentTime - 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSeek(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSeek(safeDuration);
    }
  };

  return (
    <div className={`w-full flex items-center gap-3 select-none ${className}`}>
      {/* Current Time */}
      <span className="font-mono text-xs tabular-nums text-[rgba(244,239,228,0.7)] min-w-[36px] text-right">
        {formatTime(currentTime)}
      </span>

      {/* Scrub Track */}
      <div
        ref={barRef}
        role="slider"
        tabIndex={0}
        aria-label="Audio scrubber"
        aria-valuemin={0}
        aria-valuemax={Math.round(safeDuration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(safeDuration)}`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="relative grow h-8 flex items-center cursor-pointer group focus:outline-none"
      >
        {/* Track Background */}
        <div className="relative w-full h-1 group-hover:h-2 rounded-pill bg-[rgba(244,239,228,0.14)] overflow-hidden transition-[height] duration-200">
          {/* Buffered Bar */}
          <div
            style={{ width: `${bufferedRatio * 100}%` }}
            className="absolute top-0 bottom-0 left-0 bg-[rgba(244,239,228,0.28)] transition-[width] duration-300"
          />
          {/* Played Bar */}
          <div
            style={{ width: `${progressRatio * 100}%` }}
            className="absolute top-0 bottom-0 left-0 bg-[#F4EFE4] group-hover:bg-[#E01B24] transition-colors duration-200"
          />
        </div>

        {/* Thumb Circle */}
        <div
          style={{ left: `${progressRatio * 100}%` }}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#F4EFE4] border-2 border-[#E01B24] shadow-md transition-opacity duration-150 ${
            isDragging ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Hover Time Bubble */}
        {hoverTime !== null && (
          <div
            style={{ left: `${hoverX}px` }}
            className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-[#161417] border border-[rgba(244,239,228,0.2)] font-mono text-[10px] tabular-nums text-[#F4EFE4] pointer-events-none shadow-lg"
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>

      {/* Duration / Remaining (Click to toggle) */}
      <button
        type="button"
        onClick={() => setShowRemaining(!showRemaining)}
        className="font-mono text-xs tabular-nums text-[rgba(244,239,228,0.7)] hover:text-[#F4EFE4] min-w-[36px] text-left transition-colors focus:outline-none"
        title="Toggle remaining time"
      >
        {showRemaining ? `-${formatTime(safeDuration - currentTime)}` : formatTime(safeDuration)}
      </button>
    </div>
  );
};

