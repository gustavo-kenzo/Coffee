import { initScrollSystem, prefersReducedMotion } from './scroll.js';
import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initRevealText } from './effects/reveal-text.js';
import { initLetterFlip } from './effects/letter-flip.js';
import { initHeroParallax } from './effects/parallax-hero.js';
import { initSteamCanvas } from './effects/steam-canvas.js';
import { initLinesAndCounters } from './effects/lines-counters.js';
import { initHorizontalGallery } from './effects/horizontal-gallery.js';
import { initBgTransition } from './effects/bg-transition.js';
import { initMenuVariants } from './sections/menu-variants.js';
import { initContactAndFooter } from './sections/contact-footer.js';

// Ativa enhancement progressivo sem comprometer renderização sem JS
document.documentElement.classList.add('js-enabled');

function bootstrap() {
  const reducedMotion = prefersReducedMotion();

  initScrollSystem();

  // Ordem de inicialização conforme Seção 10: FX2 -> FX1 -> FX4 -> demais
  initRevealText(reducedMotion);
  initPreloader(reducedMotion);
  initHeroParallax(reducedMotion);

  // Efeitos de apoio e seções
  initLetterFlip(reducedMotion);
  initSteamCanvas(reducedMotion);
  initLinesAndCounters(reducedMotion);
  initHorizontalGallery(reducedMotion);
  initBgTransition(reducedMotion);
  initCursor(reducedMotion);

  // Interações de seção (Menu de Especialidades, Contato, Easter Egg FX13)
  initMenuVariants(reducedMotion);
  initContactAndFooter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}