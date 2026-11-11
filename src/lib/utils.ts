export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    (!window.matchMedia("(pointer: fine)").matches &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0))
  );
}

