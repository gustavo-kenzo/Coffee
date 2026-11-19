// FX5: Partículas de vapor suave no Hero (pausado fora da viewport)
export function initSteamCanvas(reducedMotion) {
  const canvas = document.getElementById('steam-canvas');
  if (!canvas || reducedMotion) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 14 : 24;

  let width = 0;
  let height = 0;
  let isRunning = false;
  let rafId = null;

  function resize() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = Array.from({ length: particleCount }, () => ({
    x: width / 2 + (Math.random() - 0.5) * 160,
    y: height / 2 + Math.random() * 120,
    radius: Math.random() * 8 + 3,
    alpha: Math.random() * 0.25 + 0.05,
    speedY: Math.random() * 0.4 + 0.2,
    speedX: (Math.random() - 0.5) * 0.3
  }));

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha -= 0.0008;

      if (p.y < height * 0.15 || p.alpha <= 0) {
        p.y = height * 0.65 + Math.random() * 40;
        p.x = width / 2 + (Math.random() - 0.5) * 120;
        p.alpha = Math.random() * 0.22 + 0.05;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(242, 235, 220, ${p.alpha})`;
      ctx.fill();
    }

    rafId = window.requestAnimationFrame(render);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            rafId = window.requestAnimationFrame(render);
          }
        } else {
          isRunning = false;
          if (rafId) window.cancelAnimationFrame(rafId);
        }
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(canvas);
}