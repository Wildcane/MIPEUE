import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

const HERO_PRODUCTS = [
  {
    id: 'cegua',
    name: 'LA CEGUA',
    description:
      'Reinterpretación gráfica de la leyenda colonial nicaragüense. Arte serigráfico en tono hueso sobre algodón negro profundo.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cegua-cutout-2.png',
    soldOut: false
  },
  {
    id: 'deacachimba',
    name: 'MUY DEACACHIMBA',
    description:
      'Homenaje al habla popular pinolera coronado por el Guardabarranco en vuelo. Silueta raglán bicolor de calce cómodo y fresco.',
    detail: 'Top Raglán Algodón • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/deacachimba-cutout.png',
    soldOut: false
  },
  {
    id: 'top-nicaragua',
    name: 'TOP NICARAGUA',
    description:
      'Tierra de lagos y volcanes plasmada en un corte raglán clásico con mangas en contraste verde bosque y arte colonial.',
    detail: 'Top Raglán Algodón • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/nicaragua-cutout.png',
    soldOut: false
  },
  {
    id: 'cadejo',
    name: 'CADEJO',
    description:
      'Inspirada en el mítico guardián nocturno de los caminos de Nicaragua. Estampado artesanal de alto contraste con trazos de grabado folclórico.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-cutout-1.png',
    soldOut: true
  }
];

const CULTURAL_PRODUCTS = [
  {
    id: 'sopa-queso',
    name: 'Sopa de Queso',
    subtitle: 'Hecha como manda la abuela • Tradición colonial',
    image: '/assets/products/sopa-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { label: 'Blanco Normal', price: 480 },
      { label: ' Tono Crema', price: 490 }
    ],
    soldOut: false
  },
  {
    id: 'catedral-granada',
    name: 'Catedral de Granada',
    subtitle: 'Arquitectura neoclásica, volcán y Sacuanjoche',
    image: '/assets/products/catedral-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { label: 'Blanco Normal', price: 480 },
      { label: 'Tono Crema', price: 490 }
    ],
    soldOut: false
  },
  {
    id: 'isletas-granada',
    name: 'Isletas de Granada',
    subtitle: 'Paraíso natural del Gran Lago Cocibolca',
    image: '/assets/products/isletas-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { label: 'Blanco Normal', price: 480 },
      { label: 'Tono Crema', price: 490 }
    ],
    soldOut: false
  }
];

const TOTE_PRODUCTS = [
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
  }
];

export default function App() {
  // Switch para invertir paleta: false = Estado 1 (Verde Bosque default), true = Estado 2 (Color Arena invertido)
  const [isInverted, setIsInverted] = useState(false);
  const [activeNav, setActiveNav] = useState('octubre');

  // Estado del Hero Slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [heroSize, setHeroSize] = useState('M');

  // Estados locales para tarjetas de Colección Cultural (Talla y Variante Blanco/Crema)
  const [culturalConfig, setCulturalConfig] = useState({
    'sopa-queso': { size: 'M', variantIdx: 0 },
    'catedral-granada': { size: 'M', variantIdx: 0 },
    'isletas-granada': { size: 'M', variantIdx: 0 }
  });

  // Estados locales para cantidad de Tote Bags
  const [toteQty, setToteQty] = useState({
    'tote-fauna': 1,
    'tote-bunuelos': 1,
    'tote-nicaragua': 1
  });

  // Carrito Lateral (Drawer)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentHeroProduct = HERO_PRODUCTS[currentIndex];

  const handleSlide = useCallback((dir) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const nextIdx = (prev + dir + HERO_PRODUCTS.length) % HERO_PRODUCTS.length;
      const nextProd = HERO_PRODUCTS[nextIdx];
      setHeroSize(nextProd.sizes.includes('M') ? 'M' : nextProd.sizes[0]);
      return nextIdx;
    });
  }, []);

  // 1. Navegación por teclado (ArrowRight / ArrowLeft)
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

  // Función general para agregar al carrito
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
    addItemToCart({
      id: currentHeroProduct.id,
      name: currentHeroProduct.name,
      size: sizeToUse,
      price: currentHeroProduct.price,
      image: currentHeroProduct.image,
      qty: 1
    });
  };

  const handleAddCulturalToCart = (product) => {
    if (product.soldOut) return;
    const cfg = culturalConfig[product.id] || { size: 'M', variantIdx: 0 };
    const variant = product.variants[cfg.variantIdx] || product.variants[0];
    addItemToCart({
      id: product.id,
      name: `${product.name} (${variant.label.trim()})`,
      size: cfg.size,
      price: variant.price,
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

  const scrollToSection = (tabId, sectionId) => {
    setActiveNav(tabId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      className={`min-h-screen transition-colors duration-500 ease-in-out select-none ${
        isInverted
          ? 'bg-[#e6e1d5] text-[#081f1a]'
          : 'bg-gradient-to-br from-[#081f1a] via-[#0e3831] to-[#081f1a] text-[#e6e1d5]'
      }`}
    >
      {/* ================= NAVEGACIÓN SUPERIOR FIJA ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 md:px-10 py-5 flex items-center justify-between gap-4 pointer-events-none">
        {/* Izquierda: Logo MIPEUE */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('octubre', 'hero');
          }}
          className="pointer-events-auto flex items-center gap-2.5"
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
        </a>

        {/* Centro: Píldora flotante con 3 pestañas */}
        <nav
          className={`pointer-events-auto backdrop-blur-md rounded-full p-1.5 border flex items-center gap-1 overflow-x-auto max-w-full transition-colors duration-500 ${
            isInverted
              ? 'bg-[#dcd5c5]/90 border-[#081f1a]/15'
              : 'bg-[#051714]/80 border-[#e6e1d5]/15'
          }`}
        >
          {[
            { id: 'octubre', label: 'DROP OCTUBRE', target: 'hero' },
            {
              id: 'cultural',
              label: 'COLECCIÓN CULTURAL',
              target: 'coleccion-cultural'
            },
            { id: 'totebags', label: 'TOTE BAGS', target: 'tote-bags' }
          ].map((tab) => {
            const active = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id, tab.target)}
                className={`px-4 md:px-5 py-2 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.14em] uppercase transition-all whitespace-nowrap cursor-pointer ${
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
          {/* Switch Invertir Color */}
          <button
            onClick={() => setIsInverted((prev) => !prev)}
            className={`h-10 px-3.5 rounded-full border backdrop-blur-md flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-500 cursor-pointer ${
              isInverted
                ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a]'
                : 'bg-[#051714]/80 text-[#e6e1d5] border-[#e6e1d5]/20 hover:bg-[#e6e1d5] hover:text-[#081f1a]'
            }`}
            title="Invertir paleta de color"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Invertir Color</span>
          </button>

          {/* Botón WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            title="WhatsApp Directo"
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors duration-500 ${
              isInverted
                ? 'bg-[#dcd5c5]/90 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-[#051714]/80 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Botón Carrito (Bolsa) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`h-10 px-4 rounded-full backdrop-blur-md border flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors duration-500 cursor-pointer ${
              isInverted
                ? 'bg-[#dcd5c5]/90 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-[#051714]/80 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
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

      {/* ================= 1. HERO STAGE MINIMALISTA (100VH) ================= */}
      <section
        id="hero"
        className="min-h-screen h-screen overflow-hidden flex flex-col justify-between p-6 md:p-10 pt-24 md:pt-28 relative"
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
                    : 'bg-[#051714]/70 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
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
                    : 'bg-[#051714]/70 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] tracking-widest uppercase opacity-50 ml-2 hidden sm:inline">
                Usa ← → en tu teclado
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
              className={`mt-1 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all shadow-lg ${
                currentHeroProduct.soldOut
                  ? 'bg-red-900/70 text-white/80 cursor-not-allowed'
                  : isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer'
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

          {/* Centro: Prenda limpia aislada, más grande (max-h-[55vh]), centrada y vertical con sombra difusa */}
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
                    className={`h-[34vh] sm:h-[46vh] md:max-h-[55vh] w-auto object-contain pointer-events-none ${
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

          {/* Columna Derecha: Precio grande + Selector circular de tallas */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center space-y-6 order-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroProduct.id}
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
                  C$ {currentHeroProduct.price}
                </div>
              </motion.div>
            </AnimatePresence>

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
                          : 'bg-[#051714]/70 text-[#e6e1d5]/80 border border-[#e6e1d5]/15 hover:border-[#e6e1d5]/50'
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

        {/* Pie del Hero limpio (Sin la miniatura de "Siguiente >") */}
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

          <button
            onClick={() => scrollToSection('cultural', 'coleccion-cultural')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs opacity-65 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span>Explorar colecciones</span>
          </button>
        </div>
      </section>

      {/* ================= 2. SECCIÓN: COLECCIÓN CULTURAL (CON MODELOS REALES) ================= */}
      <section
        id="coleccion-cultural"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/10' : 'border-[#e6e1d5]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Encabezado Editorial */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] opacity-65 font-semibold">
                ARTE POPULAR EN ALGODÓN • DISEÑO AL FRENTE O ATRÁS
              </span>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase ${
                  isInverted ? 'text-[#081f1a]' : 'text-white'
                }`}
              >
                COLECCIÓN CULTURAL
              </h2>
            </div>
            <p className="text-xs sm:text-sm opacity-75 max-w-md">
              Prendas en 100% algodón peinado luciendo nuestra identidad.
              Disponibles en tono Blanco clásico (C$ 480) y tono Crema cálido
              (C$ 490).
            </p>
          </div>

          {/* Cuadrícula de 3 Prendas con Modelos Reales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CULTURAL_PRODUCTS.map((product) => {
              const cfg = culturalConfig[product.id] || {
                size: 'M',
                variantIdx: 0
              };
              const currentVariant =
                product.variants[cfg.variantIdx] || product.variants[0];

              return (
                <div
                  key={product.id}
                  className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-500 ${
                    isInverted
                      ? 'bg-[#dcd5c5]/60 border-[#081f1a]/15'
                      : 'bg-[#051714]/65 border-[#e6e1d5]/15'
                  }`}
                >
                  {/* Fotografía con Modelo Real */}
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

                  {/* Cuerpo de la tarjeta */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
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
                          C$ {currentVariant.price}
                        </span>
                      </div>
                      <p className="text-xs opacity-70">{product.subtitle}</p>
                    </div>

                    {/* Selector de Tono (C$ 480 normal / C$ 490 crema) */}
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <span className="text-[11px] uppercase tracking-wider opacity-65 block">
                          Tono de camiseta:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {product.variants.map((v, idx) => {
                            const activeVar = cfg.variantIdx === idx;
                            return (
                              <button
                                key={v.label}
                                onClick={() =>
                                  setCulturalConfig((prev) => ({
                                    ...prev,
                                    [product.id]: { ...cfg, variantIdx: idx }
                                  }))
                                }
                                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                  activeVar
                                    ? isInverted
                                      ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a]'
                                      : 'bg-[#e6e1d5] text-[#081f1a] border-[#e6e1d5]'
                                    : isInverted
                                    ? 'border-[#081f1a]/20 text-[#081f1a]/80 hover:border-[#081f1a]/50'
                                    : 'border-[#e6e1d5]/20 text-[#e6e1d5]/80 hover:border-[#e6e1d5]/50'
                                }`}
                              >
                                {v.label} (C$ {v.price})
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selector de Tallas (S, M, L, XL) */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] uppercase tracking-wider opacity-65 block">
                          Selecciona tu talla:
                        </span>
                        <div className="flex items-center gap-2">
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
                                className={`w-10 h-10 rounded-full text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer ${
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
      </section>

      {/* ================= 3. SECCIÓN: TOTE BAGS EN LONA CRUDA ================= */}
      <section
        id="tote-bags"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/10' : 'border-[#e6e1d5]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Encabezado */}
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
            <p className="text-xs sm:text-sm opacity-75 max-w-md">
              Confeccionadas en lona resistente con ilustraciones inspiradas en
              nuestra fauna, gastronomía e historia.
            </p>
          </div>

          {/* Cuadrícula de Tote Bags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOTE_PRODUCTS.map((tote) => {
              const qty = toteQty[tote.id] || 1;
              return (
                <div
                  key={tote.id}
                  className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-500 ${
                    isInverted
                      ? 'bg-[#dcd5c5]/60 border-[#081f1a]/15'
                      : 'bg-[#051714]/65 border-[#e6e1d5]/15'
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

                    {/* Selector de cantidad + Botón Añadir */}
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
              {/* Encabezado del Carrito */}
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

              {/* Lista de items */}
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

              {/* Subtotal, Total y Botón WhatsApp */}
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
