// FX9: Troca de variante das 6 especialidades com crossfade e escala suave
const DRINK_DATA = [
  {
    title: 'Macchiato de Caramelo',
    badge: 'Bestseller',
    temp: 'Servido Quente ou Gelado · 350ml',
    desc: 'Camadas harmoniosas de xarope puro de baunilha, leite vaporizado aveludado, duplo shot de espresso Bourbon Amarelo manchando o leite e finalização artística em grade com calda dourada artesanal de caramelo com toque de flor de sal.',
    notes: 'Caramelo Dourado, Baunilha & Manteiga',
    acidity: 'Baixa / Doçura Envolvente',
    price: 'R$ 25,00',
    altNote: 'Disponível também com leite de aveia',
    accentBg: 'rgba(217, 126, 54, 0.22)',
    img: './assets/drinks/macchiato-caramelo.png',
    alt: 'Macchiato de Caramelo em copo de vidro com camadas de leite vaporizado, espresso e calda dourada de caramelo'
  },
  {
    title: 'Affogato',
    badge: 'Sobremesa & Bar',
    temp: 'Servido Imediato · 140ml',
    desc: 'Uma dose espessa e fervente de espresso duplo de torra média extraída diretamente sobre uma generosa bola de gelato artesanal de baunilha fava Bourbon de Madagascar. O contraste térmico definitivo.',
    notes: 'Creme Gelado, Fava de Baunilha & Ristretto',
    acidity: 'Média Frutada / Equilíbrio Doce',
    price: 'R$ 22,00',
    altNote: 'Gelato feito diariamente na casa',
    accentBg: 'rgba(217, 126, 54, 0.22)',
    img: './assets/drinks/affogato.png',
    alt: 'Affogato em copo de vidro com bola de gelato de baunilha banhada por espresso duplo encorpado'
  },
  {
    title: 'Vienense',
    badge: 'Tradição Centro-Europeia',
    temp: 'Servido Quente · 260ml',
    desc: 'Café especial filtrado em alta concentração mesclado com ganache de chocolate nobre artesanal, coroado por uma nuvem densa de chantilly fresco batido na hora com fava de baunilha e polvilhado com cacau 100%.',
    notes: 'Chocolate Trufado, Chantilly & Especiarias',
    acidity: 'Baixa / Conforto Aveludado',
    price: 'R$ 23,00',
    altNote: 'Acompanha biscoito amanteigado de canela',
    accentBg: 'rgba(217, 126, 54, 0.22)',
    img: './assets/drinks/vienense.png',
    alt: 'Café Vienense em xícara de vidro com espiral generosa de chantilly fresco polvilhado com cacau'
  },
  {
    title: 'Frappé',
    badge: 'Gelado Refrescante',
    temp: 'Ultra Gelado Batido · 420ml',
    desc: 'Cold brew concentrado batido com gelo microtriturado, leite da fazenda cremoso, pasta pura de avelãs tostadas e calda artesanal suave. Textura sedosa perfeita para dias ensolarados.',
    notes: 'Avelã Tostada, Pralinê & Café Suave',
    acidity: 'Quase Nula / Textura Nevada',
    price: 'R$ 26,00',
    altNote: 'Opção vegana com leite de castanha disponível',
    accentBg: 'rgba(217, 126, 54, 0.22)',
    img: './assets/drinks/frappe.png',
    alt: 'Frappé de avelã gelado em copo alto de vidro com calda caramelizada, chantilly e pedaços de avelã'
  },
  {
    title: 'Mocha',
    badge: 'Harmonia Clássica',
    temp: 'Servido Quente · 280ml',
    desc: 'Duplo espresso encorpado fundido com calda aveludada de cacau bean-to-bar 70% de origem baiana e leite vaporizado sedoso com textura de seda líquida, decorado com latte art e nibs crocantes.',
    notes: 'Cacau Puro 70%, Frutas Silvestres & Creme',
    acidity: 'Média Cítrica do Cacau',
    price: 'R$ 24,00',
    altNote: 'Cacau com certificação de agricultura regenerativa',
    accentBg: 'rgba(217, 126, 54, 0.22)',
    img: './assets/drinks/mocha.png',
    alt: 'Mocha em xícara de vidro com latte art em folha e nibs de cacau crocantes sobre a espuma'
  },
  {
    title: 'Café Irlandês',
    badge: 'Assinatura Alcoólica',
    temp: 'Servido em Taça Especial · 200ml',
    desc: 'O autêntico Irish Coffee: espresso Bourbon extraído fumegante, dose equilibrada de whisky irlandês envelhecido em carvalho, açúcar mascavo caramelizado no maçarico e uma camada flutuante de creme espesso frio.',
    notes: 'Malte Irlandês, Carvalho Tostado & Creme Frio',
    acidity: 'Notas Amadeiradas & Licorosas',
    price: 'R$ 32,00',
    altNote: 'Venda exclusiva para maiores de 18 anos',
    accentBg: 'rgba(217, 126, 54, 0.22)',
    img: './assets/drinks/cafe-irlandes.png',
    alt: 'Café Irlandês servido em taça de vidro com camada espessa de creme frio flutuando sobre o café'
  }
];

export function initMenuVariants(reducedMotion) {
  const tabs = document.querySelectorAll('.drink-tab-btn');
  const dTitle = document.getElementById('drink-title');
  const dBadge = document.getElementById('drink-badge');
  const dTemp = document.getElementById('drink-temp');
  const dDesc = document.getElementById('drink-desc');
  const dNotes = document.getElementById('drink-notes');
  const dAcidity = document.getElementById('drink-acidity');
  const dPrice = document.getElementById('drink-price');
  const dAltNote = document.getElementById('drink-alt-note');
  const dImg = document.getElementById('drink-img');
  const dVisualBg = document.getElementById('drink-visual-bg');
  const dVisualWrap = document.getElementById('drink-visual-wrap');

  if (!tabs.length || !dTitle || !dVisualWrap) return;

  function applyDrinkContent(data) {
    dTitle.textContent = data.title;
    if (dBadge) dBadge.textContent = data.badge;
    if (dTemp) dTemp.textContent = data.temp;
    if (dDesc) dDesc.textContent = data.desc;
    if (dNotes) dNotes.textContent = data.notes;
    if (dAcidity) dAcidity.textContent = data.acidity;
    if (dPrice) dPrice.textContent = data.price;
    if (dAltNote) dAltNote.textContent = data.altNote;
    if (dVisualBg) dVisualBg.style.backgroundColor = data.accentBg;
    if (dImg) {
      dImg.src = data.img;
      dImg.alt = data.alt || data.title;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('is-active')) return;

      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const index = parseInt(tab.dataset.drink || '0', 10);
      const data = DRINK_DATA[index];
      if (!data) return;

      if (reducedMotion || !window.gsap) {
        applyDrinkContent(data);
        return;
      }

      window.gsap.to(dVisualWrap, {
        scale: 0.95,
        y: 8,
        opacity: 0.45,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          applyDrinkContent(data);
          window.gsap.to(dVisualWrap, {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'expo.out'
          });
        }
      });
    });
  });
}