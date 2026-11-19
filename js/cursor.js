// FX11: Cursor customizado contextual em desktop com mouse
export function initCursor(reducedMotion) {
  if (reducedMotion) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const label = document.getElementById('custom-cursor-label');
  if (!cursor || !label || !window.gsap) return;

  const xTo = window.gsap.quickTo(cursor, 'left', { duration: 0.25, ease: 'power3.out' });
  const yTo = window.gsap.quickTo(cursor, 'top', { duration: 0.25, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
  });

  const interactiveZones = document.querySelectorAll('[data-cursor]');
  interactiveZones.forEach((zone) => {
    zone.addEventListener('mouseenter', () => {
      const text = zone.getAttribute('data-cursor');
      if (!text) return;
      label.textContent = text;
      cursor.classList.add('is-visible');
    });

    zone.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
    });
  });
}