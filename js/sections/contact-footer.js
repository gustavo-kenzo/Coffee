// Interações de Contato (Copiar Endereço, Newsletter) & FX13 (Easter Egg)
export function initContactAndFooter() {
  // 1. Copiar Endereço
  const copyBtn = document.getElementById('copy-address-btn');
  const copyText = document.getElementById('copy-btn-text');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('Rua dos Pinheiros, 842 — Pinheiros, São Paulo - SP');
      }
      copyText.textContent = 'Copiado para a área de transferência ✓';
      copyBtn.classList.add('is-copied');

      window.setTimeout(() => {
        copyText.textContent = 'Copiar Endereço';
        copyBtn.classList.remove('is-copied');
      }, 2800);
    });
  }

  // 2. Formulário de Newsletter
  const form = document.getElementById('newsletter-form');
  const feedback = document.getElementById('newsletter-feedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.hidden = false;
      form.reset();
    });
  }

  // 3. FX13: Easter Egg Discreto no Selo BATCH 001/SP
  const eggBtn = document.getElementById('easter-egg-btn');
  const eggLabel = document.getElementById('easter-egg-label');
  let eggCount = 0;

  if (eggBtn && eggLabel) {
    eggBtn.addEventListener('click', () => {
      eggCount += 1;
      if (eggCount === 1) {
        eggLabel.textContent = 'COOPERATIVA SÍTIO DA TORRE';
      } else if (eggCount === 2) {
        eggLabel.textContent = 'RECEITA SECRETA: 93.5°C / 27s';
      } else {
        eggLabel.textContent = '☕ CAFÉ É ARTE!';
        eggCount = 0;
      }
    });
  }
}