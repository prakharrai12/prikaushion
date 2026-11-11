import React, { useEffect, useRef, useState } from 'react';
import { isTouchDevice } from '../lib/utils';

export type CursorMode = 'default' | 'link' | 'view' | 'drag' | 'open' | 'text' | 'hidden';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect target to determine cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorMode(cursorAttr as CursorMode);
        return;
      }

      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setCursorMode('text');
        return;
      }

      if (
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorMode('link');
        return;
      }

      setCursorMode('default');
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      // Lerp ring position with factor 0.16
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 8px bone Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-bone mix-blend-difference pointer-events-none transition-all duration-300 ${
          cursorMode === 'default' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />

      {/* 40px Ring with smooth morphing */}
      <div
        ref={ringRef}
        style={{
          transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.35s ease, border-color 0.35s ease, border-radius 0.35s ease, opacity 0.2s ease',
        }}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none overflow-hidden ${
          cursorMode === 'default'
            ? 'w-10 h-10 rounded-full border border-bone/50 mix-blend-difference'
            : cursorMode === 'link'
            ? 'w-16 h-16 rounded-full border border-crimson mix-blend-difference'
            : cursorMode === 'view'
            ? 'w-24 h-24 rounded-full bg-crimson text-ink font-mono font-medium text-xs tracking-widest'
            : cursorMode === 'drag'
            ? 'w-24 h-24 rounded-full bg-crimson text-ink font-mono font-medium text-xs tracking-widest'
            : cursorMode === 'open'
            ? 'w-28 h-28 rounded-full bg-bone text-ink font-mono font-medium text-xs tracking-widest'
            : cursorMode === 'text'
            ? 'w-[2px] h-7 bg-crimson rounded-none mix-blend-difference'
            : 'w-10 h-10 rounded-full border border-bone/50 opacity-0'
        }`}
      >
        {cursorMode === 'view' && <span>VIEW</span>}
        {cursorMode === 'drag' && <span>DRAG</span>}
        {cursorMode === 'open' && <span>OPEN ↗</span>}
      </div>
    </div>
  );
};

