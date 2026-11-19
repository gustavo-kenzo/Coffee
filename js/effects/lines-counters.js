// FX8: Linhas divisórias que se desenham (scaleX) + contadores nas métricas técnicas
export function initLinesAndCounters(reducedMotion) {
  if (!window.gsap || !window.ScrollTrigger) return;

  const lines = document.querySelectorAll('[data-fx="draw-line"]');
  lines.forEach((line) => {
    if (reducedMotion) return;

    window.gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  const counters = document.querySelectorAll('[data-fx="counter"]');
  counters.forEach((el) => {
    const target = parseFloat(el.dataset.target || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';

    if (reducedMotion || Number.isNaN(target)) return;

    const state = { val: 0 };
    window.gsap.to(state, {
      val: target,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      },
      onUpdate: () => {
        el.textContent = `${state.val.toFixed(decimals)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = `${target.toFixed(decimals)}${suffix}`;
      }
    });
  });
}