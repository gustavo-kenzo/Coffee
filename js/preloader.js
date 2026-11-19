// FX1: Preloader com progresso real de fontes e imagens + saída em cortina
export function initPreloader(reducedMotion) {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  if (reducedMotion) {
    preloader.style.display = 'none';
    return;
  }

  const counter = document.getElementById('preloader-counter');
  const bar = document.getElementById('preloader-bar');
  const liquid = document.getElementById('preloader-cup-liquid');

  const images = Array.from(document.querySelectorAll('img'));
  const totalTasks = images.length + 1; // +1 para document.fonts.ready
  let completedTasks = 0;
  let targetProgress = 0;
  let displayProgress = 0;
  let finished = false;

  const markTaskDone = () => {
    completedTasks = Math.min(completedTasks + 1, totalTasks);
    targetProgress = Math.round((completedTasks / totalTasks) * 100);
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(markTaskDone).catch(markTaskDone);
  } else {
    markTaskDone();
  }

  images.forEach((img) => {
    if (img.complete) {
      markTaskDone();
    } else {
      img.addEventListener('load', markTaskDone, { once: true });
      img.addEventListener('error', markTaskDone, { once: true });
    }
  });

  // Garante progressão caso algum asset externo demore
  const fallbackTimer = window.setTimeout(() => {
    targetProgress = 100;
  }, 1600);

  function exitCurtain() {
    if (finished) return;
    finished = true;
    window.clearTimeout(fallbackTimer);

    if (window.gsap) {
      window.gsap.to(preloader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.out',
        onComplete: () => {
          preloader.style.display = 'none';
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }
      });
    } else {
      preloader.style.transform = 'translateY(-100%)';
      window.setTimeout(() => {
        preloader.style.display = 'none';
      }, 700);
    }
  }

  function tick() {
    displayProgress += (targetProgress - displayProgress) * 0.14;
    const rounded = Math.min(100, Math.round(displayProgress));

    if (counter) counter.textContent = `${rounded}%`;
    if (bar) bar.style.width = `${rounded}%`;
    if (liquid) liquid.style.transform = `scaleY(${rounded / 100})`;

    if (targetProgress >= 100 && rounded >= 99) {
      if (counter) counter.textContent = '100%';
      if (bar) bar.style.width = '100%';
      if (liquid) liquid.style.transform = 'scaleY(1)';
      window.setTimeout(exitCurtain, 220);
      return;
    }

    window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
}