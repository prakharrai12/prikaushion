import React, { useEffect, useRef } from 'react';
import { isTouchDevice } from '../lib/utils';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

export const InkTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    const particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      // Check if mouse is over paper section
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          return; // Skip on cream-paper surface
        }
      }

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 8) {
        lastX = e.clientX;
        lastY = e.clientY;

        const isCrimson = Math.random() < 0.22;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          radius: Math.random() * 5 + 3,
          color: isCrimson ? '224, 27, 36' : '10, 10, 11',
          alpha: isCrimson ? 0.35 : 0.6,
          decay: 1 / (1.2 * 60), // Fades out in ~1.2s at 60fps
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.radius *= 1.008; // subtle organic spread

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] mix-blend-screen opacity-70"
      aria-hidden="true"
    />
  );
};

