// FX10: Carrossel horizontal com pin + scrub no desktop; scroll-snap + botões no mobile
export function initHorizontalGallery(reducedMotion) {
  const section = document.getElementById('space');
  const viewport = document.getElementById('gallery-scroll');
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  if (!section || !viewport || !track) return;

  let pinnedTrigger = null;

  function setupDesktopPin() {
    if (pinnedTrigger) {
      pinnedTrigger.kill();
      pinnedTrigger = null;
    }

    window.gsap.set(track, { clearProps: 'x' });
    viewport.classList.remove('is-pinned');

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop || reducedMotion || !window.gsap || !window.ScrollTrigger) return;

    const getScrollDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    if (getScrollDistance() <= 0) return;

    viewport.classList.add('is-pinned');

    const tween = window.gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 0.75,
        invalidateOnRefresh: true
      }
    });

    pinnedTrigger = tween.scrollTrigger;
  }

  setupDesktopPin();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(setupDesktopPin, 200);
  }, { passive: true });

  // Botões Prev / Next funcionam tanto com ScrollTrigger pin quanto com scroll nativo
  function stepGallery(direction) {
    if (pinnedTrigger) {
      const distance = pinnedTrigger.end - pinnedTrigger.start;
      const stepScroll = Math.max(260, distance * 0.34);
      const targetY = window.scrollY + direction * stepScroll;
      window.scrollTo({ top: targetY, behavior: reducedMotion ? 'auto' : 'smooth' });
    } else {
      viewport.scrollBy({
        left: direction * 340,
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => stepGallery(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => stepGallery(1));
}