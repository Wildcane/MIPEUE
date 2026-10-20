import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Trash2,
  X,
  MessageCircle
} from 'lucide-react';

const WHATSAPP_NUMBER = '50583332316';

const CATEGORIES = [
  { id: 'octubre', label: 'DROP OCTUBRE' },
  { id: 'cultural', label: 'COLECCIÓN CULTURAL' },
  { id: 'totebags', label: 'TOTE BAGS' }
];

const PRODUCTS = [
  // DROP OCTUBRE
  {
    id: 'cadejo',
    category: 'octubre',
    name: 'CADEJO',
    description:
      'Inspirada en el mítico guardián nocturno de los caminos de Nicaragua. Estampado artesanal de alto contraste con trazos de grabado folclórico.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-cutout-1.png'
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
    image: '/assets/products/cegua-cutout-2.png'
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
    image: '/assets/products/deacachimba-cutout.png'
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
    image: '/assets/products/nicaragua-cutout.png'
  },

  // COLECCIÓN CULTURAL
  {
    id: 'isletas',
    category: 'cultural',
    name: 'ISLETAS DE GRANADA',
    description:
      'Postal serigráfica del archipiélago volcánico del Gran Lago Cocibolca, con lanchas tradicionales y el volcán Mombacho.',
    detail: '100% Algodón peinado • Frente o espalda',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cultural-cutout-1.png'
  },
  {
    id: 'catedral',
    category: 'cultural',
    name: 'CATEDRAL DE GRANADA',
    description:
      'La joya arquitectónica de La Gran Sultana junto a la flor nacional Sacuanjoche y la cordillera volcánica de nuestra tierra.',
    detail: '100% Algodón peinado • Frente o espalda',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cultural-cutout-2.png'
  },
  {
    id: 'guardabarranco',
    category: 'cultural',
    name: 'GUARDABARRANCO',
    description:
      'El Ave Nacional de Nicaragua ilustrada con su inconfundible cola en raqueta. Tradición, naturaleza e identidad en cada fibra.',
    detail: '100% Algodón peinado • Frente o espalda',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/page2-cutout-1.png'
  },
  {
    id: 'sopa-queso',
    category: 'cultural',
    name: 'SOPA DE QUESO',
    description:
      'Hecha como manda la abuela desde la época colonial. Un tributo gráfico al sabor y la memoria de la gastronomía tradicional.',
    detail: '100% Algodón peinado • Frente o espalda',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/page2-cutout-2.png'
  },

  // TOTE BAGS
  {
    id: 'tote-bunuelos',
    category: 'totebags',
    name: 'TOTE BUÑUELOS',
    description:
      'Dedicado al postre más querido de nuestras fiestas y tardes pinoleras: buñuelos de yuca y queso bañados en miel.',
    detail: 'Lona resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/page2-cutout-2.png'
  },
  {
    id: 'tote-guardabarranco',
    category: 'totebags',
    name: 'TOTE GUARDABARRANCO',
    description:
      'Ilustración botánica y ornitológica que reúne la fauna local nicaragüense sobre lona cruda de alta resistencia para uso diario.',
    detail: 'Lona resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/page2-cutout-1.png'
  },
  {
    id: 'tote-nicaragua',
    category: 'totebags',
    name: 'TOTE NICARAGUA',
    description:
      'Catedral colonial, volcán y Sacuanjoche estampados en verde bosque profundo sobre bolso de lona artesanal.',
    detail: 'Lona resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/cultural-cutout-2.png'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('octubre');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const currentProduct = categoryProducts[currentIndex] || categoryProducts[0];
  const nextProduct =
    categoryProducts[(currentIndex + 1) % categoryProducts.length];

  const handleCategoryChange = (catId) => {
    setDirection(1);
    setActiveCategory(catId);
    setCurrentIndex(0);
    const firstProd = PRODUCTS.find((p) => p.category === catId);
    if (firstProd) {
      setSelectedSize(firstProd.sizes.includes('M') ? 'M' : firstProd.sizes[0]);
    }
  };

  const handleSlide = (dir) => {
    setDirection(dir);
    const nextIdx =
      (currentIndex + dir + categoryProducts.length) % categoryProducts.length;
    setCurrentIndex(nextIdx);
    const nextProd = categoryProducts[nextIdx];
    if (nextProd) {
      setSelectedSize(nextProd.sizes.includes('M') ? 'M' : nextProd.sizes[0]);
    }
  };

  const handleAddToCart = () => {
    const sizeToUse = currentProduct.sizes.includes(selectedSize)
      ? selectedSize
      : currentProduct.sizes[0];
    const key = `${currentProduct.id}-${sizeToUse}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: currentProduct.id,
          name: currentProduct.name,
          size: sizeToUse,
          price: currentProduct.price,
          image: currentProduct.image,
          qty: 1
        }
      ];
    });
    setIsCartOpen(true);
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
      x: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.94
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.94
    })
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col justify-between p-6 md:p-10 bg-gradient-to-br from-[#071d19] via-[#0b2b25] to-[#071d19] text-[#e6e1d5] select-none relative">
      {/* 1. HEADER SUPERIOR */}
      <header className="relative z-20 flex items-center justify-between gap-4">
        {/* Izquierda: Logo limpio MIPEUE */}
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded bg-[#e6e1d5] text-[#071d19] font-extrabold text-xs flex items-center justify-center tracking-tighter">
            MP
          </span>
          <span className="text-lg md:text-xl font-bold tracking-[0.28em] text-white uppercase">
            MIPEUE
          </span>
        </div>

        {/* Centro: Píldora flotante oscura con 3 pestañas */}
        <nav className="bg-[#051714]/80 backdrop-blur-md rounded-full p-1.5 border border-[#e6e1d5]/15 flex items-center gap-1 overflow-x-auto max-w-full">
          {CATEGORIES.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-4 md:px-5 py-2 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.14em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#e6e1d5] text-[#071d19] shadow-sm'
                    : 'text-[#e6e1d5]/75 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Derecha: WhatsApp + Bolsa */}
        <div className="flex items-center gap-2.5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            title="WhatsApp Directo"
            className="w-10 h-10 rounded-full bg-[#051714]/80 border border-[#e6e1d5]/15 flex items-center justify-center text-[#e6e1d5] hover:bg-[#e6e1d5]/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="h-10 px-4 rounded-full bg-[#051714]/80 border border-[#e6e1d5]/15 flex items-center gap-2 text-xs font-semibold tracking-wider text-[#e6e1d5] hover:bg-[#e6e1d5]/10 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bolsa</span>
            <span className="w-5 h-5 rounded-full bg-[#e6e1d5] text-[#071d19] text-[11px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* 2. ESCENARIO CENTRAL (3 COLUMNAS) */}
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-4 my-auto">
        {/* Columna Izquierda */}
        <div className="md:col-span-4 flex flex-col items-start justify-center space-y-5 order-2 md:order-1">
          {/* Flechas < > redondeadas */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleSlide(-1)}
              aria-label="Prenda anterior"
              className="w-10 h-10 rounded-full bg-[#051714]/70 border border-[#e6e1d5]/20 flex items-center justify-center text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#071d19] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSlide(1)}
              aria-label="Siguiente prenda"
              className="w-10 h-10 rounded-full bg-[#051714]/70 border border-[#e6e1d5]/20 flex items-center justify-center text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#071d19] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProduct.id}
              custom={direction}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-3.5 max-w-md"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]">
                {currentProduct.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#e6e1d5]/80 leading-relaxed line-clamp-3">
                {currentProduct.description}
              </p>

              <p className="text-[11px] uppercase tracking-[0.18em] text-[#e6e1d5]/60 font-medium">
                {currentProduct.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Botón limpio Añadir a la bolsa */}
          <button
            onClick={handleAddToCart}
            className="mt-1 px-6 py-3 rounded-full bg-[#e6e1d5] text-[#0b2b25] font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2 hover:bg-white transition-all shadow-lg cursor-pointer"
          >
            <span>Añadir a la bolsa</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Centro: Prenda flotando libremente + sombra elíptica */}
        <div className="md:col-span-4 flex flex-col items-center justify-center relative order-1 md:order-2 h-[260px] sm:h-[360px] md:h-[430px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentProduct.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 26
              }}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="max-h-[230px] sm:max-h-[320px] md:max-h-[380px] w-auto object-contain floating-garment pointer-events-none"
            />
          </AnimatePresence>

          {/* Sombra elíptica suave en la base */}
          <div className="w-48 sm:w-64 h-6 rounded-full garment-floor-shadow mt-3 pointer-events-none" />
        </div>

        {/* Columna Derecha: Precio + Selector de tallas circular */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center space-y-6 order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:text-right"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                C$ {currentProduct.price}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-start md:items-end space-y-3">
            <span className="text-xs text-[#e6e1d5]/75 tracking-wide">
              Elige tu talla:
            </span>
            <div className="flex items-center gap-2.5 flex-wrap md:justify-end">
              {currentProduct.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${
                      size === 'Unitalla' ? 'px-4 h-11' : 'w-11 h-11'
                    } rounded-full text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#e6e1d5] text-[#0b2b25] shadow-md scale-105'
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
      </main>

      {/* 3. BARRA INFERIOR Y MINIATURA FLOTANTE */}
      <footer className="relative z-20 flex items-end justify-between">
        {/* Izquierda: Enlaces sutiles */}
        <div className="hidden sm:flex items-center gap-5 text-xs text-[#e6e1d5]/60">
          <span>Nicaragua</span>
          <span>•</span>
          <span>+505 8333-2316</span>
        </div>

        {/* Centro: Eslogan minimalista como en la referencia */}
        <div className="text-center mx-auto sm:mx-0">
          <p className="text-xs sm:text-sm text-[#e6e1d5]/85 font-medium leading-snug">
            Tradición y arte popular,
            <br />
            <span className="text-[#e6e1d5]/60">hecho prenda en Nicaragua</span>
          </p>
        </div>

        {/* Esquina Inferior Derecha: Miniatura de la siguiente prenda */}
        {nextProduct && (
          <button
            onClick={() => handleSlide(1)}
            className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none"
          >
            <div className="relative flex flex-col items-center">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300 floating-garment"
              />
              <div className="w-14 h-2 rounded-full garment-floor-shadow mt-1" />
            </div>
            <span className="text-[11px] font-medium text-[#e6e1d5]/70 group-hover:text-white flex items-center gap-0.5 transition-colors">
              Siguiente <ChevronRight className="w-3 h-3" />
            </span>
          </button>
        )}
      </footer>

      {/* 4. CARRITO LATERAL (DRAWER) */}
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
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#071d19] border-l border-[#e6e1d5]/15 p-6 flex flex-col justify-between shadow-2xl"
            >
              {/* Encabezado del Carrito */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e6e1d5]/15">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#e6e1d5]" />
                  <h2 className="text-base font-bold text-white tracking-wide uppercase">
                    Bolsa de Pedido ({cartCount})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#051714] border border-[#e6e1d5]/15 flex items-center justify-center text-[#e6e1d5] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lista de items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#e6e1d5]/50 text-sm">
                    Tu bolsa está vacía.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#051714]/70 border border-[#e6e1d5]/10"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#e6e1d5]/70">
                            Talla: {item.size} • Cant: {item.qty}
                          </p>
                          <p className="text-xs font-semibold text-[#e6e1d5] mt-0.5">
                            C$ {item.price * item.qty}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.key)}
                        className="p-2 text-[#e6e1d5]/50 hover:text-red-400 transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal, Total y Botón WhatsApp */}
              <div className="pt-4 border-t border-[#e6e1d5]/15 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#e6e1d5]/70">
                    <span>Subtotal</span>
                    <span>C$ {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-1">
                    <span>Total</span>
                    <span>C$ {cartTotal}</span>
                  </div>
                </div>

                <a
                  href={getCheckoutWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#e6e1d5] text-[#0b2b25] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg"
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
