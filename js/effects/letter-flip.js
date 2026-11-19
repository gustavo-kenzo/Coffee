// FX3: Letter flip em cascata no hover (Menu e CTAs principais)
export function initLetterFlip(reducedMotion) {
  if (reducedMotion) return;

  const targets = document.querySelectorAll('[data-fx="letter-flip"]');
  targets.forEach((el) => {
    // Identifica o nó de texto puro (preservando ícones SVG irmãos)
    const textTarget = el.querySelector('.btn-header-cta__text, span:not([aria-hidden])') || el;
    const rawText = textTarget.textContent.trim();
    if (!rawText) return;

    el.setAttribute('aria-label', rawText);

    // Textos curtos animam mais devagar; longos, mais rápido
    const len = rawText.length;
    const staggerStep = len <= 8 ? 0.024 : len <= 14 ? 0.016 : 0.011;

    const wrapper = document.createElement('span');
    wrapper.className = 'fx-flip-wrap';
    wrapper.setAttribute('aria-hidden', 'true');

    Array.from(rawText).forEach((char, idx) => {
      const span = document.createElement('span');
      span.className = 'fx-flip-char';
      span.style.setProperty('--flip-delay', `${(idx * staggerStep).toFixed(3)}s`);

      if (char === ' ') {
        span.innerHTML = '&nbsp;';
        span.setAttribute('data-char', '\u00A0');
      } else {
        span.textContent = char;
        span.setAttribute('data-char', char);
      }

      wrapper.appendChild(span);
    });

    if (textTarget === el) {
      el.textContent = '';
      el.appendChild(wrapper);
    } else {
      textTarget.textContent = '';
      textTarget.appendChild(wrapper);
    }
  });
}