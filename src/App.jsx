import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Trash2,
  X,
  MessageCircle,
  ArrowLeftRight,
  Plus,
  Minus
} from 'lucide-react';

const WHATSAPP_NUMBER = '50583332316';

const CATEGORIES = [
  { id: 'octubre', label: 'DROP OCTUBRE' },
  { id: 'cultural', label: 'COLECCIÓN CULTURAL' },
  { id: 'totebags', label: 'TOTE BAGS' }
];

const ALL_HERO_PRODUCTS = [
  // ================= DROP OCTUBRE =================
  {
    id: 'cadejo',
    category: 'octubre',
    name: 'CADEJO',
    description:
      'Inspirada en el mítico guardián nocturno de los caminos de Nicaragua. Estampado artesanal de alto contraste con trazos de grabado folclórico.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-cutout-1.png',
    isCutout: true,
    soldOut: true,
    hasSwatches: false,
    bgGradient: 'from-[#2d090e] via-[#4d161d] to-[#1a0407]',
    accentColor: '#4d161d'
  },
  {
    id: 'cegua',
    category: 'octubre',
    name: 'LA CEGUA',
    description:
      'Reinterpretación gráfica de la leyenda colonial nicaragüense. Arte serigráfico en tono hueso sobre algodón negro profundo.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cegua-cutout-2.png',
    isCutout: true,
    soldOut: false,
    hasSwatches: false,
    bgGradient: 'from-[#0f171f] via-[#1a2530] to-[#0a0f14]',
    accentColor: '#1a2530'
  },
  {
    id: 'deacachimba',
    category: 'octubre',
    name: 'MUY DEACACHIMBA',
    description:
      'Homenaje al habla popular pinolera coronado por el Guardabarranco en vuelo. Silueta raglán bicolor de calce cómodo y fresco.',
    detail: 'Top Raglán Algodón • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/deacachimba-cutout.png',
    isCutout: true,
    soldOut: false,
    hasSwatches: false,
    bgGradient: 'from-[#0a241e] via-[#12362f] to-[#061713]',
    accentColor: '#12362f'
  },
  {
    id: 'top-nicaragua',
    category: 'octubre',
    name: 'TOP NICARAGUA',
    description:
      'Tierra de lagos y volcanes plasmada en un corte raglán clásico con mangas en contraste verde bosque y arte colonial.',
    detail: 'Top Raglán Algodón • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/nicaragua-cutout.png',
    isCutout: true,
    soldOut: false,
    hasSwatches: false,
    bgGradient: 'from-[#08201b] via-[#0d2f28] to-[#051411]',
    accentColor: '#0d2f28'
  },

  // ================= COLECCIÓN CULTURAL =================
  {
    id: 'sopa-queso',
    category: 'cultural',
    name: 'SOPA DE QUESO',
    description:
      'Hecha como manda la abuela desde la época colonial. Un tributo gráfico al sabor y la memoria de la gastronomía tradicional nicaragüense.',
    detail: '100% Algodón peinado • Frente o espalda a elección',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/page2-cutout-2.png',
    modelImage: '/assets/products/sopa-photo.png',
    isCutout: true,
    soldOut: false,
    hasSwatches: true,
    bgGradient: 'from-[#292209] via-[#3d330d] to-[#171305]',
    accentColor: '#3d330d'
  },
  {
    id: 'catedral',
    category: 'cultural',
    name: 'CATEDRAL DE GRANADA',
    description:
      'La joya arquitectónica neoclásica de La Gran Sultana junto a la flor nacional Sacuanjoche y la cordillera volcánica.',
    detail: '100% Algodón peinado • Frente o espalda a elección',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cultural-cutout-2.png',
    modelImage: '/assets/products/catedral-photo.png',
    isCutout: true,
    soldOut: false,
    hasSwatches: true,
    bgGradient: 'from-[#2e1310] via-[#451c17] to-[#180a08]',
    accentColor: '#451c17'
  },
  {
    id: 'isletas',
    category: 'cultural',
    name: 'ISLETAS DE GRANADA',
    description:
      'Postal serigráfica del archipiélago volcánico del Gran Lago Cocibolca, con lanchas tradicionales, palmeras y el volcán Mombacho.',
    detail: '100% Algodón peinado • Frente o espalda a elección',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cultural-cutout-1.png',
    modelImage: '/assets/products/isletas-photo.png',
    isCutout: true,
    soldOut: false,
    hasSwatches: true,
    bgGradient: 'from-[#0a2126] via-[#113138] to-[#061417]',
    accentColor: '#113138'
  },

  // ================= TOTE BAGS =================
  {
    id: 'tote-guardabarranco',
    category: 'totebags',
    name: 'TOTE GUARDABARRANCO',
    description:
      'Ilustración botánica y ornitológica que reúne la fauna local nicaragüense sobre lona cruda de alta resistencia para uso diario.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 380,
    sizes: ['Unitalla'],
    image: '/assets/products/page2-cutout-1.png',
    modelImage: '/assets/products/tote-fauna.jpg',
    isCutout: true,
    soldOut: false,
    hasSwatches: false,
    bgGradient: 'from-[#0c2420] via-[#143630] to-[#071714]',
    accentColor: '#143630'
  },
  {
    id: 'tote-bunuelos',
    category: 'totebags',
    name: 'TOTE BUÑUELOS',
    description:
      'Dedicado al postre más querido de nuestras fiestas y tardes pinoleras: buñuelos de yuca y queso bañados en miel.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 380,
    sizes: ['Unitalla'],
    image: '/assets/products/page2-cutout-2.png',
    modelImage: '/assets/products/tote-bunuelos.jpg',
    isCutout: true,
    soldOut: false,
    hasSwatches: false,
    bgGradient: 'from-[#29170a] via-[#3b220e] to-[#140b05]',
    accentColor: '#3b220e'
  },
  {
    id: 'tote-nicaragua',
    category: 'totebags',
    name: 'TOTE NICARAGUA',
    description:
      'Catedral colonial, volcán y Sacuanjoche estampados en verde bosque profundo sobre bolso de lona artesanal.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 380,
    sizes: ['Unitalla'],
    image: '/assets/products/cultural-cutout-2.png',
    modelImage: '/assets/products/tote-nicaragua.jpg',
    isCutout: true,
    soldOut: false,
    hasSwatches: false,
    bgGradient: 'from-[#0a1c2b] via-[#122b42] to-[#06111a]',
    accentColor: '#122b42'
  }
];

const CULTURAL_CAROUSEL_ITEMS = [
  {
    id: 'sopa-queso',
    name: 'Sopa de Queso',
    subtitle: 'Hecha como manda la abuela • Tradición colonial',
    image: '/assets/products/sopa-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'catedral-granada',
    name: 'Catedral de Granada',
    subtitle: 'Arquitectura neoclásica, volcán y Sacuanjoche',
    image: '/assets/products/catedral-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'isletas-granada',
    name: 'Isletas de Granada',
    subtitle: 'Paraíso natural del Gran Lago Cocibolca',
    image: '/assets/products/isletas-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cadejo-editorial',
    name: 'El Cadejo (Edición Mitos)',
    subtitle: 'Leyenda nocturna • 100% Algodón peinado',
    image: '/assets/products/cadejo-photo-1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: true
  },
  {
    id: 'cegua-editorial',
    name: 'La Cegua (Edición Mitos)',
    subtitle: 'Grabado colonial sobre algodón negro',
    image: '/assets/products/cegua-photo-1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  }
];

const TOTE_CAROUSEL_ITEMS = [
  {
    id: 'tote-fauna',
    name: 'Fauna Local (Guardabarranco)',
    subtitle: 'Lona cruda resistente 32×35 cm • Luz natural',
    price: 380,
    image: '/assets/products/tote-fauna.jpg',
    soldOut: false
  },
  {
    id: 'tote-bunuelos',
    name: 'Buñuelos',
    subtitle: 'Lona cruda resistente 32×35 cm • Tradición pinolera',
    price: 380,
    image: '/assets/products/tote-bunuelos.jpg',
    soldOut: false
  },
  {
    id: 'tote-nicaragua',
    name: 'Nicaragua',
    subtitle: 'Lona cruda resistente 32×35 cm • Catedral y Volcán',
    price: 380,
    image: '/assets/products/tote-nicaragua.jpg',
    soldOut: false
  },
  {
    id: 'tote-guardabarranco-arte',
    name: 'Guardabarranco a Color',
    subtitle: 'Lona cruda resistente 32×35 cm • Ave Nacional',
    price: 380,
    image: '/assets/products/tote-guardabarranco.jpg',
    soldOut: false
  }
];

const TONE_SWATCHES = [
  { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480 },
  { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490 }
];

export default function App() {
  // Switch para invertir paleta: false = Fondos Atmosféricos Oscuros, true = Fondo Color Arena (#e6e1d5)
  const [isInverted, setIsInverted] = useState(false);

  // Estado del Hero continuo (0..ALL_HERO_PRODUCTS.length-1)
  const [currentIndex, setCurrentIndex] = useState(1); // Inicia en La Cegua o Cadejo
  const [direction, setDirection] = useState(1);
  const [heroSize, setHeroSize] = useState('M');
  const [heroTone, setHeroTone] = useState('blanco'); // 'blanco' (480) | 'crema' (490)

  // Configuración individual de las tarjetas en Colección Cultural (size + tone)
  const [culturalConfig, setCulturalConfig] = useState({
    'sopa-queso': { size: 'M', tone: 'blanco' },
    'catedral-granada': { size: 'M', tone: 'blanco' },
    'isletas-granada': { size: 'M', tone: 'blanco' },
    'cadejo-editorial': { size: 'M', tone: 'blanco' },
    'cegua-editorial': { size: 'M', tone: 'blanco' }
  });

  // Cantidades para Tote Bags
  const [toteQty, setToteQty] = useState({
    'tote-fauna': 1,
    'tote-bunuelos': 1,
    'tote-nicaragua': 1,
    'tote-guardabarranco-arte': 1
  });

  // Referencias para carruseles horizontales inferiores
  const culturalScrollRef = useRef(null);
  const toteScrollRef = useRef(null);

  // Carrito Lateral (Drawer)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentHeroProduct = ALL_HERO_PRODUCTS[currentIndex];
  const activeCategory = currentHeroProduct.category;

  // Precio dinámico en el Hero si la prenda tiene swatches Blanco/Crema
  const currentHeroPrice = useMemo(() => {
    if (!currentHeroProduct.hasSwatches) return currentHeroProduct.price;
    return heroTone === 'crema' ? 490 : 480;
  }, [currentHeroProduct, heroTone]);

  // Avanzar / Retroceder en la secuencia completa del Hero
  const handleSlide = useCallback((dir) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const nextIdx =
        (prev + dir + ALL_HERO_PRODUCTS.length) % ALL_HERO_PRODUCTS.length;
      const nextProd = ALL_HERO_PRODUCTS[nextIdx];
      setHeroSize(nextProd.sizes.includes('M') ? 'M' : nextProd.sizes[0]);
      setHeroTone('blanco');
      return nextIdx;
    });
  }, []);

  // Al hacer clic en una pestaña del Header: salta al primer producto de esa colección en el Hero
  const handleSelectCategoryTab = (catId) => {
    const targetIdx = ALL_HERO_PRODUCTS.findIndex((p) => p.category === catId);
    if (targetIdx !== -1 && targetIdx !== currentIndex) {
      setDirection(targetIdx > currentIndex ? 1 : -1);
      setCurrentIndex(targetIdx);
      const nextProd = ALL_HERO_PRODUCTS[targetIdx];
      setHeroSize(nextProd.sizes.includes('M') ? 'M' : nextProd.sizes[0]);
      setHeroTone('blanco');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navegación por teclado global (ArrowRight / ArrowLeft)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCartOpen) return;
      if (e.key === 'ArrowRight') {
        handleSlide(1);
      } else if (e.key === 'ArrowLeft') {
        handleSlide(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSlide, isCartOpen]);

  // Desplazamiento horizontal suave en los carruseles inferiores
  const scrollCarousel = (ref, dir) => {
    if (!ref.current) return;
    const cardWidth = ref.current.firstElementChild?.clientWidth || 360;
    ref.current.scrollBy({
      left: dir * (cardWidth + 24),
      behavior: 'smooth'
    });
  };

  // Añadir ítem al carrito lateral
  const addItemToCart = ({ id, name, size, price, image, qty = 1 }) => {
    const key = `${id}-${size}-${price}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id,
          name,
          size,
          price,
          image,
          qty
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddHeroToCart = () => {
    if (currentHeroProduct.soldOut) return;
    const sizeToUse = currentHeroProduct.sizes.includes(heroSize)
      ? heroSize
      : currentHeroProduct.sizes[0];
    const toneSuffix = currentHeroProduct.hasSwatches
      ? ` (${heroTone === 'crema' ? 'Crema' : 'Blanco'})`
      : '';
    addItemToCart({
      id: `${currentHeroProduct.id}-${heroTone}`,
      name: `${currentHeroProduct.name}${toneSuffix}`,
      size: sizeToUse,
      price: currentHeroPrice,
      image: currentHeroProduct.image,
      qty: 1
    });
  };

  const handleAddCulturalToCart = (product) => {
    if (product.soldOut) return;
    const cfg = culturalConfig[product.id] || { size: 'M', tone: 'blanco' };
    const price = cfg.tone === 'crema' ? 490 : 480;
    const toneLabel = cfg.tone === 'crema' ? 'Crema' : 'Blanco';
    addItemToCart({
      id: `${product.id}-${cfg.tone}`,
      name: `${product.name} (${toneLabel})`,
      size: cfg.size,
      price,
      image: product.image,
      qty: 1
    });
  };

  const handleAddToteToCart = (tote) => {
    if (tote.soldOut) return;
    const qty = toteQty[tote.id] || 1;
    addItemToCart({
      id: tote.id,
      name: `Tote Bag ${tote.name}`,
      size: '32×35 cm',
      price: tote.price,
      image: tote.image,
      qty
    });
  };

  const handleRemoveFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cart]
  );

  const getCheckoutWhatsAppUrl = () => {
    if (cart.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        '¡Hola MIPEUE! Me gustaría consultar por su catálogo.'
      )}`;
    }
    const itemsList = cart
      .map(
        (item) =>
          `• ${item.qty}x ${item.name} (Talla: ${item.size}) — C$ ${
            item.price * item.qty
          }`
      )
      .join('\n');
    const text = `¡Hola MIPEUE! Quiero realizar el siguiente pedido:\n\n${itemsList}\n\nTotal: C$ ${cartTotal}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 110 : -110,
      opacity: 0,
      scale: 0.94
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -110 : 110,
      opacity: 0,
      scale: 0.94
    })
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ease-in-out select-none ${
        isInverted
          ? 'bg-[#e6e1d5] text-[#081f1a]'
          : `bg-gradient-to-br ${currentHeroProduct.bgGradient} text-[#e6e1d5]`
      }`}
    >
      {/* ================= HEADER SUPERIOR FIJO (SINCRONIZADO CON EL HERO) ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 md:px-10 py-5 flex items-center justify-between gap-4 pointer-events-none">
        {/* Izquierda: Logo MIPEUE */}
        <button
          onClick={() => handleSelectCategoryTab('octubre')}
          className="pointer-events-auto flex items-center gap-2.5 cursor-pointer"
        >
          <span
            className={`w-7 h-7 rounded font-extrabold text-xs flex items-center justify-center tracking-tighter transition-colors duration-500 ${
              isInverted
                ? 'bg-[#081f1a] text-[#e6e1d5]'
                : 'bg-[#e6e1d5] text-[#081f1a]'
            }`}
          >
            MP
          </span>
          <span
            className={`text-lg md:text-xl font-bold tracking-[0.28em] uppercase transition-colors duration-500 ${
              isInverted ? 'text-[#081f1a]' : 'text-white'
            }`}
          >
            MIPEUE
          </span>
        </button>

        {/* Centro: Píldora flotante sincronizada automáticamente con la categoría activa del Hero */}
        <nav
          className={`pointer-events-auto backdrop-blur-md rounded-full p-1.5 border flex items-center gap-1 overflow-x-auto max-w-full transition-colors duration-500 ${
            isInverted
              ? 'bg-[#dcd5c5]/90 border-[#081f1a]/15'
              : 'bg-black/35 border-[#e6e1d5]/15'
          }`}
        >
          {CATEGORIES.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectCategoryTab(tab.id)}
                className={`px-4 md:px-5 py-2 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  active
                    ? isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5] shadow-sm'
                      : 'bg-[#e6e1d5] text-[#081f1a] shadow-sm'
                    : isInverted
                    ? 'text-[#081f1a]/70 hover:text-[#081f1a]'
                    : 'text-[#e6e1d5]/75 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Derecha: Switch Invertir Color + WhatsApp + Bolsa */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setIsInverted((prev) => !prev)}
            className={`h-10 px-3.5 rounded-full border backdrop-blur-md flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-500 cursor-pointer ${
              isInverted
                ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a]'
                : 'bg-black/35 text-[#e6e1d5] border-[#e6e1d5]/20 hover:bg-[#e6e1d5] hover:text-[#081f1a]'
            }`}
            title="Invertir paleta de color"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Invertir Color</span>
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            title="WhatsApp Directo"
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors duration-500 ${
              isInverted
                ? 'bg-[#dcd5c5]/90 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className={`h-10 px-4 rounded-full backdrop-blur-md border flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors duration-500 cursor-pointer ${
              isInverted
                ? 'bg-[#dcd5c5]/90 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bolsa</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-colors duration-500 ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5]'
                  : 'bg-[#e6e1d5] text-[#081f1a]'
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* ================= 1. HERO STAGE CON FONDO ADAPTATIVO Y FLUJO CONTINUO ================= */}
      <section
        id="hero"
        className="min-h-screen h-screen overflow-hidden flex flex-col justify-between p-6 md:p-10 pt-24 md:pt-28 relative transition-all duration-700 ease-in-out"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-6 my-auto">
          {/* Columna Izquierda */}
          <div className="md:col-span-4 flex flex-col items-start justify-center space-y-5 order-2 md:order-1">
            {/* Flechas < > redondeadas */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleSlide(-1)}
                aria-label="Prenda anterior"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-[#dcd5c5] border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/30 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSlide(1)}
                aria-label="Siguiente prenda"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-[#dcd5c5] border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/30 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] tracking-widest uppercase opacity-55 ml-2">
                {currentIndex + 1} / {ALL_HERO_PRODUCTS.length}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentHeroProduct.id}
                custom={direction}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5 max-w-md"
              >
                <h1
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] ${
                    isInverted ? 'text-[#081f1a]' : 'text-white'
                  }`}
                >
                  {currentHeroProduct.name}
                </h1>

                <p className="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-2">
                  {currentHeroProduct.description}
                </p>

                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 font-medium">
                  {currentHeroProduct.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Botón Añadir a la bolsa */}
            <button
              onClick={handleAddHeroToCart}
              disabled={currentHeroProduct.soldOut}
              style={
                isInverted && !currentHeroProduct.soldOut
                  ? { backgroundColor: currentHeroProduct.accentColor }
                  : undefined
              }
              className={`mt-1 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all shadow-lg ${
                currentHeroProduct.soldOut
                  ? 'bg-red-900/70 text-white/80 cursor-not-allowed'
                  : isInverted
                  ? 'text-[#e6e1d5] hover:opacity-90 cursor-pointer'
                  : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer'
              }`}
            >
              <span>
                {currentHeroProduct.soldOut
                  ? 'Agotado Temporalmente'
                  : 'Añadir a la bolsa'}
              </span>
              {!currentHeroProduct.soldOut && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Centro: Prenda limpia aislada en grande (max-h-[58vh]) con sombra difusa */}
          <div className="md:col-span-4 flex flex-col items-center justify-center relative order-1 md:order-2">
            <div className="relative flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentHeroProduct.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: 'spring',
                    stiffness: 230,
                    damping: 25
                  }}
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={currentHeroProduct.image}
                    alt={currentHeroProduct.name}
                    className={`h-[35vh] sm:h-[48vh] md:max-h-[58vh] w-auto object-contain pointer-events-none ${
                      isInverted
                        ? 'floating-garment-light'
                        : 'floating-garment-dark'
                    }`}
                  />

                  {/* Overlay rojo translúcido para productos AGOTADOS */}
                  {currentHeroProduct.soldOut && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-red-700/80 backdrop-blur-[2px] text-white font-extrabold text-sm sm:text-base tracking-[0.28em] uppercase px-8 py-3 rounded-md shadow-2xl border border-white/25">
                        AGOTADO
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sombra elíptica y difusa en la base */}
            <div
              className={`w-56 sm:w-72 h-7 rounded-full mt-4 pointer-events-none ${
                isInverted
                  ? 'garment-floor-shadow-light'
                  : 'garment-floor-shadow-dark'
              }`}
            />
          </div>

          {/* Columna Derecha: Precio dinámico + Swatches circulares (si aplica) + Selector de talla */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center space-y-6 order-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentHeroProduct.id}-${currentHeroPrice}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:text-right"
              >
                <div
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                    isInverted ? 'text-[#081f1a]' : 'text-white'
                  }`}
                >
                  C$ {currentHeroPrice}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Círculos de color (Swatches) cuando es prenda de Colección Cultural */}
            {currentHeroProduct.hasSwatches && (
              <div className="flex flex-col items-start md:items-end space-y-2.5">
                <span className="text-xs opacity-75 tracking-wide">
                  Tono ({heroTone === 'crema' ? 'Crema C$ 490' : 'Blanco C$ 480'}):
                </span>
                <div className="flex items-center gap-3">
                  {TONE_SWATCHES.map((swatch) => {
                    const activeSwatch = heroTone === swatch.id;
                    return (
                      <button
                        key={swatch.id}
                        onClick={() => setHeroTone(swatch.id)}
                        title={`${swatch.label} — C$ ${swatch.price}`}
                        aria-label={`${swatch.label} C$ ${swatch.price}`}
                        className={`w-7 h-7 rounded-full ${swatch.bgClass} border border-black/20 transition-transform cursor-pointer ${
                          activeSwatch
                            ? isInverted
                              ? 'ring-2 ring-[#081f1a] ring-offset-2 ring-offset-[#e6e1d5] scale-110'
                              : 'ring-2 ring-white/80 ring-offset-2 ring-offset-black/50 scale-110'
                            : 'opacity-75 hover:opacity-100'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selector circular de tallas */}
            <div className="flex flex-col items-start md:items-end space-y-3">
              <span className="text-xs opacity-75 tracking-wide">
                Elige tu talla:
              </span>
              <div className="flex items-center gap-2.5 flex-wrap md:justify-end">
                {currentHeroProduct.sizes.map((size) => {
                  const isSelected = heroSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setHeroSize(size)}
                      className={`${
                        size === 'Unitalla' ? 'px-4 h-11' : 'w-11 h-11'
                      } rounded-full text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? isInverted
                            ? 'bg-[#081f1a] text-[#e6e1d5] shadow-md scale-105'
                            : 'bg-[#e6e1d5] text-[#081f1a] shadow-md scale-105'
                          : isInverted
                          ? 'bg-[#dcd5c5] text-[#081f1a]/80 border border-[#081f1a]/15 hover:border-[#081f1a]/50'
                          : 'bg-black/30 text-[#e6e1d5]/80 border border-[#e6e1d5]/15 hover:border-[#e6e1d5]/50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Pie del Hero */}
        <div className="flex items-center justify-between pt-2">
          <div className="hidden sm:flex items-center gap-4 text-xs opacity-60">
            <span>Nicaragua</span>
            <span>•</span>
            <span>+505 8333-2316</span>
          </div>

          <div className="text-center mx-auto">
            <p className="text-xs sm:text-sm opacity-85 font-medium leading-snug">
              Tradición y arte popular,
              <br />
              <span className="opacity-60">hecho prenda en Nicaragua</span>
            </p>
          </div>

          <a
            href="#coleccion-cultural"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs opacity-65 hover:opacity-100 transition-opacity"
          >
            <span>Ver lookbook con modelos</span>
          </a>
        </div>
      </section>

      {/* ================= 2. CARRUSEL: COLECCIÓN CULTURAL (CON FLECHAS Y SWATCHES) ================= */}
      <section
        id="coleccion-cultural"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/10' : 'border-[#e6e1d5]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado + Flechas de Carrusel */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] opacity-65 font-semibold">
                LOOKBOOK MODELOS REALES • DISEÑO AL FRENTE O ATRÁS
              </span>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase ${
                  isInverted ? 'text-[#081f1a]' : 'text-white'
                }`}
              >
                COLECCIÓN CULTURAL
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel(culturalScrollRef, -1)}
                aria-label="Deslizar colección cultural a la izquierda"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-[#dcd5c5] border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel(culturalScrollRef, 1)}
                aria-label="Deslizar colección cultural a la derecha"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-[#dcd5c5] border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contenedor Carrusel Horizontal con Flechas en los Extremos */}
          <div className="relative group/carousel">
            <button
              onClick={() => scrollCarousel(culturalScrollRef, -1)}
              aria-label="Anterior en Colección Cultural"
              className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border shadow-xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollCarousel(culturalScrollRef, 1)}
              aria-label="Siguiente en Colección Cultural"
              className={`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border shadow-xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={culturalScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CULTURAL_CAROUSEL_ITEMS.map((product) => {
                const cfg = culturalConfig[product.id] || {
                  size: 'M',
                  tone: 'blanco'
                };
                const currentPrice = cfg.tone === 'crema' ? 490 : 480;

                return (
                  <div
                    key={product.id}
                    className={`min-w-[85vw] sm:min-w-[350px] md:min-w-[380px] snap-start rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-500 ${
                      isInverted
                        ? 'bg-[#dcd5c5]/65 border-[#081f1a]/15'
                        : 'bg-black/35 border-[#e6e1d5]/15'
                    }`}
                  >
                    {/* Foto con Modelo Real */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                      />
                      {product.soldOut && (
                        <div className="absolute inset-0 bg-red-800/65 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="text-white font-extrabold text-lg tracking-[0.28em] uppercase px-6 py-2 border border-white/40 rounded">
                            AGOTADO
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Cuerpo de Tarjeta */}
                    <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={`text-xl font-bold tracking-tight ${
                              isInverted ? 'text-[#081f1a]' : 'text-white'
                            }`}
                          >
                            {product.name}
                          </h3>
                          <span
                            className={`text-xl font-bold shrink-0 ${
                              isInverted ? 'text-[#081f1a]' : 'text-white'
                            }`}
                          >
                            C$ {currentPrice}
                          </span>
                        </div>
                        <p className="text-xs opacity-70">{product.subtitle}</p>
                      </div>

                      <div className="space-y-4 pt-2">
                        {/* Selector de Tono con Círculos de Color (Swatches) */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider opacity-70">
                            Color ({cfg.tone === 'crema' ? 'Crema' : 'Blanco'}):
                          </span>
                          <div className="flex items-center gap-3">
                            {TONE_SWATCHES.map((swatch) => {
                              const activeSwatch = cfg.tone === swatch.id;
                              return (
                                <button
                                  key={swatch.id}
                                  onClick={() =>
                                    setCulturalConfig((prev) => ({
                                      ...prev,
                                      [product.id]: { ...cfg, tone: swatch.id }
                                    }))
                                  }
                                  title={`${swatch.label} — C$ ${swatch.price}`}
                                  aria-label={`${swatch.label} — C$ ${swatch.price}`}
                                  className={`w-6 h-6 rounded-full ${swatch.bgClass} border border-black/20 transition-transform cursor-pointer ${
                                    activeSwatch
                                      ? isInverted
                                        ? 'ring-2 ring-[#081f1a] ring-offset-2 ring-offset-[#dcd5c5] scale-110'
                                        : 'ring-2 ring-white/80 ring-offset-2 ring-offset-black/50 scale-110'
                                      : 'opacity-75 hover:opacity-100'
                                  }`}
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* Selector de Tallas (S, M, L, XL) */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider opacity-70">
                            Talla:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {product.sizes.map((sz) => {
                              const activeSz = cfg.size === sz;
                              return (
                                <button
                                  key={sz}
                                  onClick={() =>
                                    setCulturalConfig((prev) => ({
                                      ...prev,
                                      [product.id]: { ...cfg, size: sz }
                                    }))
                                  }
                                  className={`w-9 h-9 rounded-full text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer ${
                                    activeSz
                                      ? isInverted
                                        ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a]'
                                        : 'bg-[#e6e1d5] text-[#081f1a] border-[#e6e1d5]'
                                      : isInverted
                                      ? 'border-[#081f1a]/20 text-[#081f1a]/80 hover:border-[#081f1a]/50'
                                      : 'border-[#e6e1d5]/20 text-[#e6e1d5]/80 hover:border-[#e6e1d5]/50'
                                  }`}
                                >
                                  {sz}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botón + Añadir a la bolsa */}
                        <button
                          onClick={() => handleAddCulturalToCart(product)}
                          disabled={product.soldOut}
                          className={`w-full py-3.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md ${
                            product.soldOut
                              ? 'bg-red-900/60 text-white/75 cursor-not-allowed'
                              : isInverted
                              ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer'
                              : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer'
                          }`}
                        >
                          {product.soldOut
                            ? 'Agotado Temporalmente'
                            : '+ Añadir a la bolsa'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. CARRUSEL: TOTE BAGS EN LONA CRUDA ================= */}
      <section
        id="tote-bags"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/10' : 'border-[#e6e1d5]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado + Flechas de Carrusel */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] opacity-65 font-semibold">
                ACCESORIOS ARTESANALES • MEDIDAS 32×35 CM
              </span>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase ${
                  isInverted ? 'text-[#081f1a]' : 'text-white'
                }`}
              >
                TOTE BAGS EN LONA CRUDA
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollCarousel(toteScrollRef, -1)}
                aria-label="Deslizar tote bags a la izquierda"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-[#dcd5c5] border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel(toteScrollRef, 1)}
                aria-label="Deslizar tote bags a la derecha"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-[#dcd5c5] border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contenedor Carrusel Horizontal Tote Bags con Flechas en los Extremos */}
          <div className="relative group/carousel">
            <button
              onClick={() => scrollCarousel(toteScrollRef, -1)}
              aria-label="Anterior en Tote Bags"
              className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border shadow-xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollCarousel(toteScrollRef, 1)}
              aria-label="Siguiente en Tote Bags"
              className={`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border shadow-xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={toteScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TOTE_CAROUSEL_ITEMS.map((tote) => {
                const qty = toteQty[tote.id] || 1;
                return (
                  <div
                    key={tote.id}
                    className={`min-w-[85vw] sm:min-w-[350px] md:min-w-[380px] snap-start rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-500 ${
                      isInverted
                        ? 'bg-[#dcd5c5]/65 border-[#081f1a]/15'
                        : 'bg-black/35 border-[#e6e1d5]/15'
                    }`}
                  >
                    {/* Fotografía en luz natural */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                      <img
                        src={tote.image}
                        alt={tote.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                      />
                      {tote.soldOut && (
                        <div className="absolute inset-0 bg-red-800/65 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="text-white font-extrabold text-lg tracking-[0.28em] uppercase px-6 py-2 border border-white/40 rounded">
                            AGOTADO
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Información y Controles */}
                    <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={`text-xl font-bold tracking-tight ${
                              isInverted ? 'text-[#081f1a]' : 'text-white'
                            }`}
                          >
                            {tote.name}
                          </h3>
                          <span
                            className={`text-xl font-bold shrink-0 ${
                              isInverted ? 'text-[#081f1a]' : 'text-white'
                            }`}
                          >
                            C$ {tote.price}
                          </span>
                        </div>
                        <p className="text-xs opacity-70">{tote.subtitle}</p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider opacity-70">
                            Cantidad:
                          </span>
                          <div
                            className={`flex items-center gap-3 px-3 py-1.5 rounded-full border ${
                              isInverted
                                ? 'border-[#081f1a]/25'
                                : 'border-[#e6e1d5]/25'
                            }`}
                          >
                            <button
                              onClick={() =>
                                setToteQty((prev) => ({
                                  ...prev,
                                  [tote.id]: Math.max(1, qty - 1)
                                }))
                              }
                              className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() =>
                                setToteQty((prev) => ({
                                  ...prev,
                                  [tote.id]: qty + 1
                                }))
                              }
                              className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToteToCart(tote)}
                          className={`w-full py-3.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                            isInverted
                              ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831]'
                              : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white'
                          }`}
                        >
                          + Añadir a la bolsa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. CARRITO LATERAL (DRAWER) ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md border-l p-6 flex flex-col justify-between shadow-2xl transition-colors duration-500 ${
                isInverted
                  ? 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/15'
                  : 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/15'
              }`}
            >
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  isInverted ? 'border-[#081f1a]/15' : 'border-[#e6e1d5]/15'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-base font-bold tracking-wide uppercase">
                    Bolsa de Pedido ({cartCount})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer ${
                    isInverted
                      ? 'bg-[#dcd5c5] border-[#081f1a]/15 text-[#081f1a]'
                      : 'bg-[#051714] border-[#e6e1d5]/15 text-[#e6e1d5]'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-55 text-sm">
                    Tu bolsa está vacía.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.key}
                      className={`flex items-center justify-between gap-3 p-3 rounded-2xl border ${
                        isInverted
                          ? 'bg-[#dcd5c5]/70 border-[#081f1a]/10'
                          : 'bg-[#051714]/70 border-[#e6e1d5]/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs opacity-70">
                            Talla: {item.size} • Cant: {item.qty}
                          </p>
                          <p className="text-xs font-semibold mt-0.5">
                            C$ {item.price * item.qty}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.key)}
                        className="p-2 opacity-50 hover:opacity-100 hover:text-red-500 transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div
                className={`pt-4 border-t space-y-4 ${
                  isInverted ? 'border-[#081f1a]/15' : 'border-[#e6e1d5]/15'
                }`}
              >
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between opacity-70">
                    <span>Subtotal</span>
                    <span>C$ {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                    <span>Total</span>
                    <span>C$ {cartTotal}</span>
                  </div>
                </div>

                <a
                  href={getCheckoutWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg ${
                    isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831]'
                      : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Finalizar Pedido por WhatsApp</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
