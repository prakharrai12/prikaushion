import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  if (typeof window === "undefined") return null as unknown as Lenis;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
  });

  lenisInstance.on("scroll", () => {
    ScrollTrigger.update();
  });

  const tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, offset: number = -80) {
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
}
