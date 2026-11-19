export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initScrollSystem() {
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    if (window.SplitText) {
      window.gsap.registerPlugin(window.SplitText);
    }
    window.ScrollTrigger.config({ ignoreMobileResize: true });
  }
}