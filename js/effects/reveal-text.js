// FX2: Reveal de texto com máscara (Assinatura: yPercent 110 -> 0, start "top 80%", once: true)
function splitIntoMaskedChars(element) {
  const originalText = element.textContent.trim();
  element.setAttribute('aria-label', originalText);
  element.innerHTML = '';

  const chars = [];
  const words = originalText.split(/(\s+)/);

  words.forEach((part) => {
    if (/^\s+$/.test(part)) {
      element.appendChild(document.createTextNode(part));
      return;
    }

    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.setAttribute('aria-hidden', 'true');

    Array.from(part).forEach((char) => {
      const mask = document.createElement('span');
      mask.className = 'fx-mask-char';
      mask.setAttribute('aria-hidden', 'true');

      const inner = document.createElement('span');
      inner.className = 'fx-split-char';
      inner.textContent = char;
      inner.setAttribute('aria-hidden', 'true');

      mask.appendChild(inner);
      wordSpan.appendChild(mask);
      chars.push(inner);
    });

    element.appendChild(wordSpan);
  });

  return chars;
}

export function initRevealText(reducedMotion) {
  if (!window.gsap || !window.ScrollTrigger) return;

  // 1. Títulos com revelação por caractere mascarado
  const charTargets = document.querySelectorAll('[data-fx="reveal-chars"]');
  charTargets.forEach((el) => {
    if (reducedMotion) {
      window.gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true }
        }
      );
      return;
    }

    const chars = splitIntoMaskedChars(el);
    window.gsap.fromTo(
      chars,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true
        }
      }
    );
  });

  // 2. Manifesto Editorial (Scrub #1: destaque progressivo guiado pelo scroll)
  const manifestoQuote = document.querySelector('[data-fx="reveal-manifesto"]');
  const manifestoHighlights = document.querySelectorAll('.manifesto-word');

  if (manifestoQuote && manifestoHighlights.length) {
    if (reducedMotion) return;

    window.gsap.fromTo(
      manifestoHighlights,
      { opacity: 0.35, y: 12 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#story',
          start: 'top 65%',
          end: 'center 45%',
          scrub: 0.6
        }
      }
    );
  }
}