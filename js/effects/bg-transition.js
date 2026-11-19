// FX12: Transição suave de entrada da seção escura do Manifesto
export function initBgTransition(reducedMotion) {
  if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;

  const manifesto = document.querySelector('[data-fx="bg-transition"]');
  if (!manifesto) return;

  window.gsap.fromTo(
    manifesto,
    { opacity: 0.92 },
    {
      opacity: 1,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: manifesto,
        start: 'top 80%',
        once: true
      }
    }
  );
}