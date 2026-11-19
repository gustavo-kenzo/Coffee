# ☕ Coffee — Artisanal Coffee Roastery & Bar - [coffe-ember](https://coffeember.vercel.app)

Web page de uma cafeteria artesanal, criada como **demonstração prática de desenvolvimento frontend dirigido por IA**.

O objetivo do projeto é mostrar como prompts bem direcionados podem elevar a qualidade visual de interfaces frontend, de modo que projetos de backend (como APIs REST em **Java + Spring**) possam ter uma interface agradável e atrativa sem depender de um time de design dedicado.

---

## 🤖 Como foi feito (fluxo com IA)

| Etapa | Ferramenta | Uso |
|-------|------------|-----|
| Design | **Stitch AI (Google)** | Criação do design e da identidade visual da página |
| Código | **Gemini 4 Hydrogen** | Geração do HTML, CSS e JavaScript a partir do design |
| Imagens | **Google Flow** | Imagens das bebidas e do hero usadas no site, além da imagem de modelo da página inicial |

O resultado depende de **prompts dirigidos**: descrever com precisão seções, tokens de design, animações e comportamento, e iterar até chegar ao resultado desejado.

---

## ✨ Funcionalidades

- **Preloader** com progresso real de fontes e imagens e saída em cortina
- **Reveal de texto** com máscara e letter flip no hover
- **Parallax no hero** e canvas de vapor suave
- **Contadores animados** e linhas que se desenham no scroll
- **Galeria horizontal** com pin + scrub (desktop)
- **Cursor customizado** contextual (desktop com mouse)
- **Menu de Especialidades** com 6 bebidas e troca de variante com crossfade
- **Botão copiar endereço**, formulário de newsletter e easter egg no rodapé
- **Acessibilidade**: skip link, foco visível, `aria-*` e suporte a `prefers-reduced-motion`
- **Responsivo** (breakpoints 640px, 768px e 1024px)

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS modularizado (tokens, base, componentes, efeitos) com variáveis CSS
- JavaScript (ES Modules), sem framework
- [GSAP 3.13](https://gsap.com/) (Core, ScrollTrigger, SplitText)
- Google Fonts: Anton, Barlow Condensed, Plus Jakarta Sans, Playfair Display, Space Mono

---

## 📁 Estrutura

```
.
├── index.html
├── css/
│   ├── tokens.css        # cores, fontes, raios, sombras, easings
│   ├── base.css          # reset, tipografia e utilitários
│   ├── components.css    # seções e componentes
│   └── effects.css       # efeitos (FX1–FX13) e reduced motion
├── js/
│   ├── main.js           # ponto de entrada
│   ├── scroll.js         # registro GSAP/ScrollTrigger
│   ├── preloader.js
│   ├── cursor.js
│   ├── effects/          # reveal-text, letter-flip, parallax-hero, steam-canvas,
│   │                     # lines-counters, horizontal-gallery, bg-transition
│   └── sections/         # menu-variants, contact-footer
├── assets/               # imagens geradas (hero e drinks)
└── favicon-coffee/
```
---

## 🎯 Objetivo e aprendizados

- Demonstrar que **prompts dirigidos** produzem interfaces de alto nível visual
- Servir como modelo de front
- Praticar a combinação de ferramentas de IA para design, código e imagem

> As imagens, textos, endereço e avaliações são fictícios, criados para fins de demonstração.
