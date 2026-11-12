import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  if (typeof window === "undefined") return null as unknown as Lenis;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  lenisInstance.on("scroll", () => {
    ScrollTrigger.update();
  });

  const tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Refresh ScrollTrigger on image/font load & orientation change
  window.addEventListener("load", () => ScrollTrigger.refresh(), { passive: true });
  window.addEventListener("orientationchange", () => ScrollTrigger.refresh(), { passive: true });

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

// Curtain flash: 2px crimson line sweeps across viewport top when nav target is clicked
export function triggerCurtainFlash() {
  if (typeof document === 'undefined') return;
  const flash = document.createElement('div');
  flash.className = 'fixed top-0 left-0 right-0 h-[2px] bg-crimson z-[120] origin-left pointer-events-none shadow-[0_0_12px_#E01B24]';
  document.body.appendChild(flash);
  gsap.fromTo(
    flash,
    { scaleX: 0, opacity: 1 },
    {
      scaleX: 1,
      duration: 0.45,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.to(flash, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => flash.remove(),
        });
      },
    }
  );
}

export function scrollToTarget(target: string | HTMLElement, offset: number = -80) {
  triggerCurtainFlash();

  const performScroll = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        offset,
        duration: 1.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (typeof document !== 'undefined' && (document as any).startViewTransition) {
    (document as any).startViewTransition(() => {
      performScroll();
    });
  } else {
    performScroll();
  }
}

