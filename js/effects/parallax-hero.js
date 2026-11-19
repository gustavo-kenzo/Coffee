// Remove o fundo preto sólido de estúdio (.jpg) via flood-fill nas bordas e ajusta o recorte ao copo
function isolateCupFromBlackBackdrop(img) {
  if (!img || img.dataset.cutoutDone === 'true') return;

  const process = () => {
    if (img.dataset.cutoutDone === 'true' || !img.naturalWidth) return;

    try {
      const maxH = 900;
      const scale = Math.min(1, maxH / img.naturalHeight);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Se a imagem já tiver canal alfa transparente (PNG/WebP recortado), não processa
      if (data[3] < 250) {
        img.dataset.cutoutDone = 'true';
        return;
      }

      // Verifica se o canto superior esquerdo é preto de estúdio
      if (data[0] > 22 || data[1] > 22 || data[2] > 22) {
        img.dataset.cutoutDone = 'true';
        return;
      }

      const total = w * h;
      const bg = new Uint8Array(total);
      const queue = new Int32Array(total);
      let head = 0;
      let tail = 0;

      const isBlack = (idx) => {
        const p = idx * 4;
        return data[p] < 24 && data[p + 1] < 24 && data[p + 2] < 24;
      };

      const enqueue = (idx) => {
        if (!bg[idx] && isBlack(idx)) {
          bg[idx] = 1;
          queue[tail++] = idx;
        }
      };

      for (let x = 0; x < w; x++) {
        enqueue(x);
        enqueue((h - 1) * w + x);
      }
      for (let y = 0; y < h; y++) {
        enqueue(y * w);
        enqueue(y * w + (w - 1));
      }

      while (head < tail) {
        const idx = queue[head++];
        const x = idx % w;
        const y = (idx - x) / w;

        if (x > 0) enqueue(idx - 1);
        if (x < w - 1) enqueue(idx + 1);
        if (y > 0) enqueue(idx - w);
        if (y < h - 1) enqueue(idx + w);
      }

      let minX = w;
      let minY = h;
      let maxX = 0;
      let maxY = 0;

      for (let i = 0; i < total; i++) {
        const p = i * 4;
        if (bg[i]) {
          data[p + 3] = 0;
        } else {
          const x = i % w;
          const y = (i - x) / w;

          // Suavização leve na borda externa do vidro para evitar serrilhado
          const touchesBg =
            (x > 0 && bg[i - 1]) ||
            (x < w - 1 && bg[i + 1]) ||
            (y > 0 && bg[i - w]) ||
            (y < h - 1 && bg[i + w]);

          if (touchesBg) {
            const lum = Math.max(data[p], data[p + 1], data[p + 2]);
            if (lum < 58) {
              data[p + 3] = Math.max(0, Math.min(255, Math.round(((lum - 16) / 42) * 255)));
            }
          }

          if (data[p + 3] > 16) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      if (maxX > minX && maxY > minY) {
        const padX = 4;
        const padTop = 4;
        const cropX = Math.max(0, minX - padX);
        const cropY = Math.max(0, minY - padTop);
        const cropW = Math.min(w - cropX, maxX - minX + padX * 2);
        const cropH = Math.min(h - cropY, maxY - minY + padTop);

        const out = document.createElement('canvas');
        out.width = cropW;
        out.height = cropH;
        const outCtx = out.getContext('2d');
        if (outCtx) {
          outCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
          img.dataset.cutoutDone = 'true';
          img.src = out.toDataURL('image/png');
        }
      }
    } catch (_err) {
      // Fallback silencioso caso aberto diretamente via file:// sem servidor local
      img.dataset.cutoutDone = 'true';
    }
  };

  if (img.complete && img.naturalWidth) {
    process();
  } else {
    img.addEventListener('load', process, { once: true });
  }
}

// FX4: Parallax em camadas do elemento-herói ancorado na base com gsap.quickTo
export function initHeroParallax(reducedMotion) {
  const cup = document.getElementById('hero-coffee-cup');
  if (cup) {
    isolateCupFromBlackBackdrop(cup);
  }

  if (reducedMotion || !window.gsap) return;

  const stage = document.querySelector('[data-purpose="hero-stage"]');
  const watermark = document.getElementById('watermark-container');
  if (!stage || !cup || !watermark) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer) {
    const cupX = window.gsap.quickTo(cup, 'x', { duration: 0.7, ease: 'power3.out' });
    const cupY = window.gsap.quickTo(cup, 'y', { duration: 0.7, ease: 'power3.out' });
    const cupRot = window.gsap.quickTo(cup, 'rotation', { duration: 0.8, ease: 'power3.out' });

    const markX = window.gsap.quickTo(watermark, 'x', { duration: 0.9, ease: 'power3.out' });
    const markY = window.gsap.quickTo(watermark, 'y', { duration: 0.9, ease: 'power3.out' });

    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      // Mantém a base ancorada na borda inferior mesmo durante o movimento vertical
      cupX(normX * 22);
      cupY(Math.min(8, normY * 14));
      cupRot(normX * 2.5);

      markX(-normX * 14);
      markY(-normY * 10);
    }, { passive: true });

    stage.addEventListener('mouseleave', () => {
      cupX(0);
      cupY(0);
      cupRot(0);
      markX(0);
      markY(0);
    });
  }
}