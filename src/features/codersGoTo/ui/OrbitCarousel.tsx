import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Track } from '../data/types';
import { VinylSleeve } from './VinylSleeve';
import { gsap } from '../../../lib/gsap';

interface OrbitCarouselProps {
  tracks: Track[];
  activeIndex: number;
  playingIndex: number;
  isPlaying: boolean;
  progress: number; // 0..1
  bassEnergy: number; // 0..1
  onSelectTrack: (index: number) => void;
  onTogglePlay: (index: number) => void;
}

export const OrbitCarousel: React.FC<OrbitCarouselProps> = ({
  tracks,
  activeIndex,
  playingIndex,
  isPlaying,
  progress,
  bassEnergy,
  onSelectTrack,
  onTogglePlay,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const orbitSvgRef = useRef<SVGSVGElement>(null);
  const [activeFloat, setActiveFloat] = useState(activeIndex);
  const activeFloatRef = useRef(activeIndex);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const startFloatRef = useRef(activeIndex);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const n = tracks.length;

  // Screen-responsive dimensions
  const [dimensions, setDimensions] = useState({
    cardSize: 200,
    Rx: 420,
    Ry: 44,
  });

  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    const isMobile = w < 768;
    setDimensions({
      cardSize: Math.max(140, Math.min(220, w * 0.16)),
      Rx: isMobile ? Math.min(w * 0.38, 190) : Math.min(w * 0.36, 480),
      Ry: isMobile ? 24 : 44,
    });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Animate to new activeIndex via shortest angular distance
  const animateTo = useCallback((targetIndex: number) => {
    if (tweenRef.current) tweenRef.current.kill();

    const curr = activeFloatRef.current;
    // Calculate shortest circular delta in [-n/2, n/2]
    let delta = (targetIndex - (curr % n)) % n;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;

    const targetFloat = curr + delta;

    tweenRef.current = gsap.to(activeFloatRef, {
      current: targetFloat,
      duration: Math.abs(delta) > 3 ? 1.1 : 0.85,
      ease: 'power3.inOut',
      onUpdate: () => {
        setActiveFloat(activeFloatRef.current);
      },
    });
  }, [n]);

  useEffect(() => {
    animateTo(activeIndex);
  }, [activeIndex, animateTo]);

  // Pointer drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (tweenRef.current) tweenRef.current.kill();
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    startFloatRef.current = activeFloatRef.current;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    // dx -> angle delta in radians -> index delta
    const deltaIndex = -dx / (dimensions.Rx * 0.9);
    activeFloatRef.current = startFloatRef.current + deltaIndex;
    setActiveFloat(activeFloatRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Snap to nearest index
    const snapped = Math.round(activeFloatRef.current);
    const normalized = ((snapped % n) + n) % n;
    onSelectTrack(normalized);
    animateTo(normalized);
  };

  // Horizontal wheel handler (preserves vertical page scroll!)
  const handleWheel = (e: React.WheelEvent) => {
    // Only capture horizontal delta or Shift+wheel
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      const delta = (e.deltaX || e.deltaY) * 0.003;
      const target = Math.round(activeFloatRef.current + delta);
      const normalized = ((target % n) + n) % n;
      onSelectTrack(normalized);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (activeIndex + 1) % n;
      onSelectTrack(nextIdx);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (activeIndex - 1 + n) % n;
      onSelectTrack(prevIdx);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSelectTrack(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSelectTrack(n - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTogglePlay(activeIndex);
    }
  };

  // SVG Orbit dimensions
  const svgWidth = dimensions.Rx * 2 + 100;
  const svgHeight = dimensions.Ry * 3.4;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2 + 15;
  const rx = dimensions.Rx;
  const ry = dimensions.Ry * 1.6;

  // Approximate circumference for stroke-dasharray
  const circumference = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  const progressDashoffset = circumference * (1 - progress);

  // Position of planet dot
  const planetAngle = progress * Math.PI * 2 - Math.PI / 2;
  const planetX = cx + rx * Math.cos(planetAngle);
  const planetY = cy + ry * Math.sin(planetAngle);

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      data-cursor="drag"
      aria-label="The Coder's Go-To playlist carousel"
      role="region"
      className="relative w-full h-[54vh] md:h-[62vh] min-h-[380px] max-h-[640px] flex items-center justify-center overflow-visible select-none focus:outline-none cursor-grab active:cursor-grabbing"
      style={{ perspective: '1600px', touchAction: 'pan-y' }}
    >
      {/* SVG Orbit Line & Progress Arc */}
      <svg
        ref={orbitSvgRef}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="absolute inset-0 m-auto pointer-events-none transition-transform duration-100 ease-out z-0"
        style={{
          width: svgWidth,
          height: svgHeight,
          transform: `scale(${1 + (isPlaying ? bassEnergy * 0.015 : 0)})`,
        }}
      >
        {/* Subtle Background Ellipse */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="rgba(244,239,228,0.12)"
          strokeWidth="1.5"
        />

        {/* Dynamic Progress Arc */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="#E01B24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressDashoffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />

        {/* Planet Dot on Orbit */}
        {isPlaying && (
          <circle
            cx={planetX}
            cy={planetY}
            r="4"
            fill="#E01B24"
            className="filter drop-shadow-[0_0_8px_#E01B24]"
          />
        )}

        {/* Station Ticks for each track */}
        {tracks.map((_, i) => {
          const angle = (i * (2 * Math.PI)) / n - Math.PI / 2;
          const tickX = cx + rx * Math.cos(angle);
          const tickY = cy + ry * Math.sin(angle);
          const isSelected = i === activeIndex;

          return (
            <circle
              key={i}
              cx={tickX}
              cy={tickY}
              r={isSelected ? '3.5' : '1.8'}
              fill={isSelected ? '#E01B24' : 'rgba(244,239,228,0.35)'}
              className={isSelected ? 'drop-shadow-[0_0_6px_#E01B24]' : ''}
            />
          );
        })}
      </svg>

      {/* Orbiting Cards */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {tracks.map((track, i) => {
          const theta = (i - activeFloat) * ((2 * Math.PI) / n);
          const x = Math.sin(theta) * dimensions.Rx;
          const y = (1 - Math.cos(theta)) * dimensions.Ry;
          const depth = (1 + Math.cos(theta)) / 2; // 1 at front, 0 at back
          const scale = (0.52 + 0.48 * depth) * (i === activeIndex ? 1.06 : 1);
          const opacity = 0.18 + 0.82 * Math.pow(depth, 1.4);
          const brightness = 0.45 + 0.55 * depth;
          const tilt = -Math.sin(theta) * 16;
          const zIndex = Math.round(100 * Math.cos(theta)) + 100;
          const isFront = i === activeIndex;
          const isCardPlaying = i === playingIndex && isPlaying;
          const isBehind = Math.cos(theta) < -0.3;

          return (
            <div
              key={track.id}
              style={{
                zIndex,
                transform: `translate3d(${x}px, ${y}px, 0) rotateY(${tilt}deg) scale(${scale})`,
                opacity: isBehind ? 0.1 : opacity,
                filter: `brightness(${brightness})`,
                pointerEvents: isBehind ? 'none' : 'auto',
                boxShadow: isFront
                  ? `0 40px 90px -30px ${track.accent || '#E01B24'}88`
                  : undefined,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-shadow duration-700 pointer-events-auto"
              data-cursor={isFront ? (isCardPlaying ? 'pause' : 'play') : undefined}
            >
              <VinylSleeve
                track={track}
                index={i}
                isPlaying={isCardPlaying}
                isFront={isFront}
                size={dimensions.cardSize}
                onClick={() => {
                  if (isFront) {
                    onTogglePlay(i);
                  } else {
                    onSelectTrack(i);
                  }
                }}
              />

              {/* Status Badge when browsing a track different from currently playing */}
              {i === playingIndex && isPlaying && !isFront && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-pill bg-[#0F0E10] border border-[#E01B24] font-mono text-[9px] uppercase tracking-widest text-[#E01B24] whitespace-nowrap shadow-md pointer-events-none">
                  PLAYING ↺
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

