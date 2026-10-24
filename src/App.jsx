import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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

const NAV_TABS = [
  { id: 'octubre', label: 'DROP OCTUBRE', href: '#drop-octubre' },
  { id: 'cultural', label: 'COLECCIÓN CULTURAL', href: '#coleccion-cultural' },
  { id: 'totebags', label: 'TOTE BAGS', href: '#tote-bags' }
];

const TONE_SWATCHES = [
  { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480 },
  { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490 }
];

// ================= HERO SHOWCASE (INCLUYE LOS 6 DISEÑOS DEL DROP OCTUBRE + CULTURAL + TOTE BAGS) =================
const HERO_SHOWCASE = [
  // --- 6 DISEÑOS OFICIALES DROP OCTUBRE ---
  {
    id: 'cadejo-morado',
    category: 'octubre',
    name: 'CADEJO (MORADO / LILA)',
    description:
      'Inspirada en el mítico guardián nocturno de los caminos de Nicaragua. Edición especial en tono morado/azul profundo con trazos de grabado folclórico.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-cutout-1.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    hasSwatches: false,
    darkBg: '#32111c',
    lightBg: '#eadce1'
  },
  {
    id: 'cadejo-crema',
    category: 'octubre',
    name: 'CADEJO (CREMA / BEIGE)',
    description:
      'La dualidad del espectro nocturno nicaragüense plasmada sobre algodón crema cálido con serigrafía artesanal de alto contraste.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-cutout-2.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    hasSwatches: false,
    darkBg: '#2e1d16',
    lightBg: '#efe4d8'
  },
  {
    id: 'cegua-frente',
    category: 'octubre',
    name: 'LA CEGUA (FRENTE)',
    description:
      'Reinterpretación gráfica de la leyenda colonial nicaragüense que sorprende a los trasnochadores. Arte serigráfico sobre algodón negro profundo.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cegua-cutout-1.png',
    soldOut: false,
    hasSwatches: false,
    darkBg: '#141e28',
    lightBg: '#dde4ec'
  },
  {
    id: 'cegua-variante',
    category: 'octubre',
    name: 'LA CEGUA (VARIANTE / MODELO)',
    description:
      'Silueta individual de nuestra edición mística de La Cegua en tinta color hueso envejecido sobre tejido suave 100% algodón.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cegua-cutout-2.png',
    soldOut: false,
    hasSwatches: false,
    darkBg: '#101820',
    lightBg: '#d8e0e8'
  },
  {
    id: 'deacachimba',
    category: 'octubre',
    name: 'TOP MUY DEACACHIMBA',
    description:
      'Homenaje al habla popular pinolera coronado por el Guardabarranco en vuelo. Silueta raglán bicolor de calce cómodo y fresco.',
    detail: 'Top Raglán Unitalla • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/deacachimba-cutout.png',
    soldOut: false,
    hasSwatches: false,
    darkBg: '#0d2b24',
    lightBg: '#dbeae4'
  },
  {
    id: 'top-nicaragua',
    category: 'octubre',
    name: 'TOP NICARAGUA',
    description:
      'Tierra de lagos y volcanes plasmada en un corte raglán clásico con mangas en contraste verde bosque y arte colonial.',
    detail: 'Top Raglán Unitalla • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/nicaragua-cutout.png',
    soldOut: false,
    hasSwatches: false,
    darkBg: '#0a241e',
    lightBg: '#d8e8df'
  },

  // --- SELECCIÓN COLECCIÓN CULTURAL ---
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
    soldOut: false,
    hasSwatches: true,
    darkBg: '#2e260c',
    lightBg: '#f0e6c8'
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
    soldOut: true,
    soldOutLabel: 'AGOTADO',
    hasSwatches: true,
    darkBg: '#361713',
    lightBg: '#eedbd5'
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
    soldOut: true,
    soldOutLabel: 'AGOTADO',
    hasSwatches: true,
    darkBg: '#0e282e',
    lightBg: '#d8eaec'
  },

  // --- SELECCIÓN TOTE BAGS ---
  {
    id: 'tote-guardabarranco',
    category: 'totebags',
    name: 'TOTE FAUNA LOCAL',
    description:
      'Ilustración botánica y ornitológica del Guardabarranco sobre lona cruda de alta resistencia para uso diario.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/page2-cutout-1.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO',
    hasSwatches: false,
    darkBg: '#102b26',
    lightBg: '#dbe9e2'
  },
  {
    id: 'tote-bunuelos',
    category: 'totebags',
    name: 'TOTE BUÑUELOS',
    description:
      'Dedicado al postre más querido de nuestras fiestas y tardes pinoleras: buñuelos de yuca y queso bañados en miel.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/page2-cutout-2.png',
    soldOut: false,
    hasSwatches: false,
    darkBg: '#2e1b0d',
    lightBg: '#eee0d2'
  },
  {
    id: 'tote-nicaragua',
    category: 'totebags',
    name: 'TOTE NICARAGUA',
    description:
      'Catedral colonial, volcán y Sacuanjoche estampados en verde bosque profundo sobre bolso de lona artesanal.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/cultural-cutout-2.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO',
    hasSwatches: false,
    darkBg: '#0e2235',
    lightBg: '#dae4ee'
  }
];

// ================= SECCIÓN A: DROP OCTUBRE (LOS 6 DISEÑOS OFICIALES DE CANVA) =================
const DROP_OCTUBRE_ITEMS = [
  {
    id: 'oct-cadejo-morado',
    name: 'CADEJO (Morado / Lila)',
    subtitle: 'Leyenda nocturna • 100% Algodón peinado',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-photo-1.jpg',
    soldOut: true,
    soldOutText: 'AGOTADO TEMPORALMENTE'
  },
  {
    id: 'oct-cadejo-crema',
    name: 'CADEJO (Crema / Beige)',
    subtitle: 'Edición Crema Natural • 100% Algodón peinado',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cadejo-photo-2.png',
    soldOut: true,
    soldOutText: 'AGOTADO TEMPORALMENTE'
  },
  {
    id: 'oct-cegua-frente',
    name: 'LA CEGUA (Frente)',
    subtitle: 'Espectro colonial • 100% Algodón negro profundo',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cegua-photo-1.jpg',
    soldOut: false
  },
  {
    id: 'oct-cegua-variante',
    name: 'LA CEGUA (Variante / Modelo)',
    subtitle: 'Grabado folclórico • 100% Algodón negro profundo',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/products/cegua-photo-2.png',
    soldOut: false
  },
  {
    id: 'oct-deacachimba',
    name: 'TOP MUY DEACACHIMBA',
    subtitle: 'Baby Tee Raglán Bicolor • Unitalla',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/deacachimba-photo.png',
    soldOut: false
  },
  {
    id: 'oct-top-nicaragua',
    name: 'TOP NICARAGUA',
    subtitle: 'Tierra de Lagos y Volcanes • Unitalla',
    price: 550,
    sizes: ['Unitalla'],
    image: '/assets/products/nicaragua-photo.png',
    soldOut: false
  }
];

// ================= SECCIÓN B: COLECCIÓN CULTURAL (LAS 12 CAMISETAS OFICIALES) =================
const COLECCION_CULTURAL_ITEMS = [
  {
    id: 'cul-sopa-queso',
    name: 'Sopa de Queso',
    subtitle: 'Hecha como manda la abuela • 100% Algodón',
    image: '/assets/products/sopa-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-catedral',
    name: 'Catedral de Granada',
    subtitle: 'Joya neoclásica y Sacuanjoche • 100% Algodón',
    image: '/assets/products/catedral-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: true
  },
  {
    id: 'cul-isletas',
    name: 'Isletas de Granada',
    subtitle: 'Gran Lago Cocibolca y Mombacho • 100% Algodón',
    image: '/assets/products/isletas-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: true
  },
  {
    id: 'cul-sacuanjoche',
    name: 'Sacuanjoche',
    subtitle: 'Flor Nacional de Nicaragua • 100% Algodón',
    image: '/assets/products/sacuanjoche-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: true
  },
  {
    id: 'cul-gueguense',
    name: 'Güegüense & Macho Ratón',
    subtitle: 'Patrimonio Oral e Inmaterial • 100% Algodón',
    image: '/assets/products/gueguense-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-guardabarranco',
    name: 'Guardabarranco',
    subtitle: 'Ave Nacional de Nicaragua • 100% Algodón',
    image: '/assets/products/guardabarranco-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-leon-sutiaba',
    name: 'León y Sol de Sutiaba',
    subtitle: 'Herencia indígena y colonial • 100% Algodón',
    image: '/assets/products/leon-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-nacatamal',
    name: 'Nacatamal',
    subtitle: 'Tradición de fin de semana • 100% Algodón',
    image: '/assets/products/nacatamal-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: true
  },
  {
    id: 'cul-gigantona',
    name: 'Gigantona y Enano Cabezón',
    subtitle: 'Folclor leonés y coplas • 100% Algodón',
    image: '/assets/products/gigantona-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-fauna-local',
    name: 'Fauna Local Camiseta',
    subtitle: 'Biodiversidad pinolera • 100% Algodón',
    image: '/assets/products/fauna-shirt-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-bunuelos',
    name: 'Buñuelos Camiseta',
    subtitle: 'Dulce tradición en miel • 100% Algodón',
    image: '/assets/products/bunuelos-shirt-photo.png',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  },
  {
    id: 'cul-nicaragua',
    name: 'Nicaragua Camiseta',
    subtitle: 'Tierra de lagos y volcanes • 100% Algodón',
    image: '/assets/products/nicaragua-shirt-photo.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    soldOut: false
  }
];

// ================= SECCIÓN C: TOTE BAGS (LOS 3 BOLSOS OFICIALES) =================
const TOTE_BAGS_ITEMS = [
  {
    id: 'tote-fauna-local',
    name: 'Fauna Local - Guardabarranco',
    subtitle: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    image: '/assets/products/tote-fauna.jpg',
    soldOut: true
  },
  {
    id: 'tote-bunuelos-bag',
    name: 'Buñuelos',
    subtitle: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    image: '/assets/products/tote-bunuelos.jpg',
    soldOut: false
  },
  {
    id: 'tote-nicaragua-bag',
    name: 'Nicaragua',
    subtitle: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    image: '/assets/products/tote-nicaragua.jpg',
    soldOut: true
  }
];

// Variantes de transición suave requeridas (Entrada 0.35s easeOut, Salida 0.25s easeIn)
const heroItemVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? 25 : -25
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' }
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? -25 : 25,
    transition: { duration: 0.25, ease: 'easeIn' }
  })
};

// Variantes de transición para carruseles inferiores (0.45s cubic-bezier(0.25, 1, 0.5, 1))
const carouselMotionVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? 35 : -35
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? -35 : 35,
    transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
  })
};

export default function App() {
  // Modo Oscuro (false) vs Modo Claro Invertido (true)
  const [isInverted, setIsInverted] = useState(false);

  // Estado del Hero Showcase en bucle infinito
  const [currentIndex, setCurrentIndex] = useState(2); // Inicia en La Cegua (Frente)
  const [direction, setDirection] = useState(1);
  const [heroSize, setHeroSize] = useState('M');
  const [heroTone, setHeroTone] = useState('blanco');

  // Índices de bucle infinito para los 3 carruseles inferiores
  const [octubreIdx, setOctubreIdx] = useState(0);
  const [octubreDir, setOctubreDir] = useState(1);

  const [culturalIdx, setCulturalIdx] = useState(0);
  const [culturalDir, setCulturalDir] = useState(1);

  const [toteIdx, setToteIdx] = useState(0);
  const [toteDir, setToteDir] = useState(1);

  // Tallas seleccionadas en Drop Octubre
  const [octubreSizes, setOctubreSizes] = useState(() => {
    const init = {};
    DROP_OCTUBRE_ITEMS.forEach((item) => {
      init[item.id] = item.sizes.includes('M') ? 'M' : item.sizes[0];
    });
    return init;
  });

  // Configuración de talla y tono (Blanco/Crema) en las 12 camisetas de Colección Cultural
  const [culturalConfig, setCulturalConfig] = useState(() => {
    const initial = {};
    COLECCION_CULTURAL_ITEMS.forEach((item) => {
      initial[item.id] = { size: 'M', tone: 'blanco' };
    });
    return initial;
  });

  // Cantidades para Tote Bags
  const [toteQty, setToteQty] = useState({
    'tote-fauna-local': 1,
    'tote-bunuelos-bag': 1,
    'tote-nicaragua-bag': 1
  });

  // Carrito Lateral (Drawer)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Precargar imágenes del Hero para evitar cualquier parpadeo al animar
  useEffect(() => {
    HERO_SHOWCASE.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  const currentHeroProduct = HERO_SHOWCASE[currentIndex];
  const activeCategory = currentHeroProduct.category;

  const currentHeroPrice = useMemo(() => {
    if (!currentHeroProduct.hasSwatches) return currentHeroProduct.price;
    return heroTone === 'crema' ? 490 : 480;
  }, [currentHeroProduct, heroTone]);

  // Navegación en bucle infinito del Hero: (currentIndex + 1) % totalItems
  const handleSlide = useCallback((dir) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const totalItems = HERO_SHOWCASE.length;
      const nextIdx =
        dir > 0
          ? (prev + 1) % totalItems
          : (prev - 1 + totalItems) % totalItems;
      const nextProd = HERO_SHOWCASE[nextIdx];
      setHeroSize(nextProd.sizes.includes('M') ? 'M' : nextProd.sizes[0]);
      setHeroTone('blanco');
      return nextIdx;
    });
  }, []);

  // Listener de teclado global (ArrowRight / ArrowLeft)
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

  // Helpers para obtener las 3 tarjetas visibles en bucle infinito circular
  const getVisibleCyclicItems = (items, startIndex, count = 3) => {
    const total = items.length;
    return Array.from({ length: count }, (_, offset) => {
      const idx = (startIndex + offset) % total;
      return { item: items[idx], index: idx };
    });
  };

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e, stepFn) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      stepFn(1);
    } else if (diff < -40) {
      stepFn(-1);
    }
    touchStartX.current = null;
  };

  const stepOctubre = (dir) => {
    setOctubreDir(dir);
    const total = DROP_OCTUBRE_ITEMS.length;
    setOctubreIdx((prev) =>
      dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  const stepCultural = (dir) => {
    setCulturalDir(dir);
    const total = COLECCION_CULTURAL_ITEMS.length;
    setCulturalIdx((prev) =>
      dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  const stepTote = (dir) => {
    setToteDir(dir);
    const total = TOTE_BAGS_ITEMS.length;
    setToteIdx((prev) =>
      dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  // Agregar al carrito
  const addItemToCart = ({ id, name, size, price, image, qty = 1 }) => {
    const key = `${id}-${size}-${price}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { key, id, name, size, price, image, qty }];
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

  const handleAddOctubreToCart = (item) => {
    if (item.soldOut) return;
    const sz = octubreSizes[item.id] || item.sizes[0];
    addItemToCart({
      id: item.id,
      name: item.name,
      size: sz,
      price: item.price,
      image: item.image,
      qty: 1
    });
  };

  const handleAddCulturalToCart = (item) => {
    if (item.soldOut) return;
    const cfg = culturalConfig[item.id] || { size: 'M', tone: 'blanco' };
    const price = cfg.tone === 'crema' ? 490 : 480;
    const toneLabel = cfg.tone === 'crema' ? 'Crema' : 'Blanco';
    addItemToCart({
      id: `${item.id}-${cfg.tone}`,
      name: `${item.name} (${toneLabel})`,
      size: cfg.size,
      price,
      image: item.image,
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

  // Fondo adaptativo con transición CSS suave: transition: background 0.7s cubic-bezier(0.4, 0, 0.2, 1)
  const adaptiveSurfaceStyle = {
    backgroundColor: isInverted
      ? currentHeroProduct.lightBg
      : currentHeroProduct.darkBg,
    backgroundImage: isInverted
      ? 'radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.55) 0%, rgba(8, 31, 26, 0.06) 100%)'
      : 'radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.55) 100%)',
    transition:
      'background-color 0.7s cubic-bezier(0.4, 0, 0.2, 1), background 0.7s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s ease'
  };

  const visibleOctubre = getVisibleCyclicItems(
    DROP_OCTUBRE_ITEMS,
    octubreIdx,
    3
  );
  const visibleCultural = getVisibleCyclicItems(
    COLECCION_CULTURAL_ITEMS,
    culturalIdx,
    3
  );
  const visibleTotes = getVisibleCyclicItems(TOTE_BAGS_ITEMS, toteIdx, 3);

  return (
    <div
      style={adaptiveSurfaceStyle}
      className={`min-h-screen select-none ${
        isInverted ? 'text-[#081f1a]' : 'text-[#e6e1d5]'
      }`}
    >
      {/* ================= HEADER SUPERIOR FIJO ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 px-4 md:px-10 py-3.5 md:py-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-x-4 gap-y-2.5 pointer-events-none">
        {/* Izquierda: Logo MIPEUE */}
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-2.5 cursor-pointer"
        >
          <span
            className={`w-7 h-7 rounded font-extrabold text-xs flex items-center justify-center tracking-tighter transition-colors duration-300 ${
              isInverted
                ? 'bg-[#081f1a] text-[#e6e1d5]'
                : 'bg-[#e6e1d5] text-[#081f1a]'
            }`}
          >
            MP
          </span>
          <span
            className={`text-lg md:text-xl font-bold tracking-[0.28em] uppercase transition-colors duration-300 ${
              isInverted ? 'text-[#081f1a]' : 'text-white'
            }`}
          >
            MIPEUE
          </span>
        </a>

        {/* Centro: Píldora flotante que enlaza suavemente a #drop-octubre, #coleccion-cultural y #tote-bags */}
        <nav
          className={`pointer-events-auto backdrop-blur-md rounded-full p-1 md:p-1.5 border flex items-center gap-1 order-3 w-full justify-center md:order-none md:w-auto max-w-full transition-colors duration-300 ${
            isInverted
              ? 'bg-white/60 border-[#081f1a]/15'
              : 'bg-black/35 border-[#e6e1d5]/15'
          }`}
        >
          {NAV_TABS.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => {
                  const targetIdx = HERO_SHOWCASE.findIndex(
                    (p) => p.category === tab.id
                  );
                  if (targetIdx !== -1 && targetIdx !== currentIndex) {
                    setDirection(targetIdx > currentIndex ? 1 : -1);
                    setCurrentIndex(targetIdx);
                    const nextProd = HERO_SHOWCASE[targetIdx];
                    setHeroSize(
                      nextProd.sizes.includes('M') ? 'M' : nextProd.sizes[0]
                    );
                    setHeroTone('blanco');
                  }
                }}
                className={`px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.12em] md:tracking-[0.14em] uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  active
                    ? isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5] shadow-sm'
                      : 'bg-[#e6e1d5] text-[#081f1a] shadow-sm'
                    : isInverted
                    ? 'text-[#081f1a]/75 hover:text-[#081f1a]'
                    : 'text-[#e6e1d5]/75 hover:text-white'
                }`}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>

        {/* Derecha: Switch Invertir Color + WhatsApp + Bolsa */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => setIsInverted((prev) => !prev)}
            className={`h-10 px-3.5 rounded-full border backdrop-blur-md flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors duration-300 ${
              isInverted
                ? 'bg-white/60 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className={`h-10 px-4 rounded-full backdrop-blur-md border flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors duration-300 cursor-pointer ${
              isInverted
                ? 'bg-white/60 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bolsa</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center transition-colors duration-300 ${
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

      {/* ================= HERO SHOWCASE (TRANSICIONES FLUIDAS Y ESQUINAS INFERIORES LIMPIAS) ================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-between p-6 md:p-10 pt-28 md:pt-20 relative"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-4 my-auto">
          {/* Columna Izquierda: Flechas en bucle infinito + Título y descripción con AnimatePresence mode="wait" */}
          <div className="md:col-span-3 flex flex-col items-start justify-center space-y-5 order-2 md:order-1 z-10">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleSlide(-1)}
                aria-label="Prenda anterior"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isInverted
                    ? 'bg-white/60 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/30 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSlide(1)}
                aria-label="Siguiente prenda"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isInverted
                    ? 'bg-white/60 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/30 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] tracking-widest uppercase opacity-60 ml-1">
                {currentIndex + 1} / {HERO_SHOWCASE.length}
              </span>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentHeroProduct.id}
                custom={direction}
                variants={heroItemVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-3 max-w-sm"
              >
                <h1
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.06] ${
                    isInverted ? 'text-[#081f1a]' : 'text-white'
                  }`}
                >
                  {currentHeroProduct.name}
                </h1>

                <p className="text-xs sm:text-sm opacity-85 leading-relaxed line-clamp-2">
                  {currentHeroProduct.description}
                </p>

                <p className="text-[11px] uppercase tracking-[0.18em] opacity-65 font-medium">
                  {currentHeroProduct.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleAddHeroToCart}
              disabled={currentHeroProduct.soldOut}
              style={
                isInverted && !currentHeroProduct.soldOut
                  ? { backgroundColor: currentHeroProduct.darkBg }
                  : undefined
              }
              className={`mt-1 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all shadow-lg ${
                currentHeroProduct.soldOut
                  ? 'bg-red-800/80 text-white cursor-not-allowed'
                  : isInverted
                  ? 'text-[#e6e1d5] hover:opacity-90 cursor-pointer'
                  : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer'
              }`}
            >
              <span>
                {currentHeroProduct.soldOut
                  ? currentHeroProduct.soldOutLabel || 'AGOTADO'
                  : 'Añadir a la bolsa'}
              </span>
              {!currentHeroProduct.soldOut && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Centro: Imagen de la prenda grande (h-[68vh] md:h-[74vh] max-h-[750px]) con transición suave */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative order-1 md:order-2">
            <div className="relative flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentHeroProduct.id}
                  custom={direction}
                  variants={heroItemVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative flex items-center justify-center"
                >
                  <img
                    src={currentHeroProduct.image}
                    alt={currentHeroProduct.name}
                    className="h-[52vh] sm:h-[68vh] md:h-[74vh] max-h-[750px] w-auto object-contain drop-shadow-2xl pointer-events-none"
                  />

                  {currentHeroProduct.soldOut && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-red-700/80 backdrop-blur-[2px] text-white font-extrabold text-xs sm:text-base tracking-[0.26em] uppercase px-8 py-3.5 rounded-md shadow-2xl border border-white/30 text-center">
                        {currentHeroProduct.soldOutLabel || 'AGOTADO'}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sombra difusa en la base */}
            <div
              className={`w-64 sm:w-80 h-7 rounded-full -mt-2 pointer-events-none ${
                isInverted
                  ? 'garment-floor-shadow-light'
                  : 'garment-floor-shadow-dark'
              }`}
            />
          </div>

          {/* Columna Derecha: Precio animado + Swatches + Selector de talla */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center space-y-6 order-3 z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentHeroProduct.id}-${currentHeroPrice}`}
                custom={direction}
                variants={heroItemVariants}
                initial="enter"
                animate="center"
                exit="exit"
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

            {currentHeroProduct.hasSwatches && (
              <div className="flex flex-col items-start md:items-end space-y-2.5">
                <span className="text-xs opacity-80 tracking-wide">
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
                        className={`w-7 h-7 rounded-full ${swatch.bgClass} border border-black/25 transition-transform cursor-pointer ${
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

            <div className="flex flex-col items-start md:items-end space-y-3">
              <span className="text-xs opacity-80 tracking-wide">
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
                          ? 'bg-white/60 text-[#081f1a]/80 border border-[#081f1a]/15 hover:border-[#081f1a]/50'
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

        {/* Pie del Hero completamente limpio en las esquinas inferiores */}
        <div className="flex items-center justify-center pt-1 z-10">
          <p className="text-xs sm:text-sm opacity-80 font-medium leading-snug text-center">
            Tradición y arte popular,{' '}
            <span className="opacity-65">hecho prenda en Nicaragua</span>
          </p>
        </div>
      </section>

      {/* ================= SECCIÓN A: #drop-octubre (6 MODELOS EN BUCLE INFINITO) ================= */}
      <section
        id="drop-octubre"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className={`text-3xl md:text-5xl font-bold tracking-tight uppercase ${
                  isInverted ? 'text-[#081f1a]' : 'text-white'
                }`}
              >
                DROP OCTUBRE
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => stepOctubre(-1)}
                aria-label="Anterior en Drop Octubre"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/70 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => stepOctubre(1)}
                aria-label="Siguiente en Drop Octubre"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/70 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => stepOctubre(-1)}
              aria-label="Anterior en Drop Octubre"
              className={`flex absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border shadow-2xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => stepOctubre(1)}
              aria-label="Siguiente en Drop Octubre"
              className={`flex absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border shadow-2xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait" custom={octubreDir}>
              <motion.div
                key={octubreIdx}
                custom={octubreDir}
                variants={carouselMotionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, stepOctubre)}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleOctubre.map(({ item }, index) => {
                  const selectedSz = octubreSizes[item.id] || item.sizes[0];
                  return (
                    <div
                      key={item.id}
                      className={`rounded-3xl overflow-hidden border flex-col justify-between transition-colors duration-300 ${
                        index > 0 ? 'hidden md:flex' : 'flex w-full md:w-auto'
                      } ${
                        isInverted
                          ? 'bg-white/60 border-[#081f1a]/15'
                          : 'bg-black/35 border-[#e6e1d5]/15'
                      }`}
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        {item.soldOut && (
                          <div className="absolute inset-0 bg-red-800/70 backdrop-blur-[2px] flex items-center justify-center p-4 text-center">
                            <span className="text-white font-extrabold text-sm sm:text-base tracking-[0.24em] uppercase px-5 py-2.5 border border-white/40 rounded shadow-xl">
                              {item.soldOutText || 'AGOTADO'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3
                              className={`text-lg sm:text-xl font-bold tracking-tight ${
                                isInverted ? 'text-[#081f1a]' : 'text-white'
                              }`}
                            >
                              {item.name}
                            </h3>
                            <span
                              className={`text-xl font-bold shrink-0 ${
                                isInverted ? 'text-[#081f1a]' : 'text-white'
                              }`}
                            >
                              C$ {item.price}
                            </span>
                          </div>
                          <p className="text-xs opacity-75">{item.subtitle}</p>
                        </div>

                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider opacity-70">
                              Talla:
                            </span>
                            <div className="flex items-center gap-1.5">
                              {item.sizes.map((sz) => {
                                const activeSz = selectedSz === sz;
                                return (
                                  <button
                                    key={sz}
                                    onClick={() =>
                                      setOctubreSizes((prev) => ({
                                        ...prev,
                                        [item.id]: sz
                                      }))
                                    }
                                    className={`${
                                      sz === 'Unitalla' ? 'px-3 h-9' : 'w-9 h-9'
                                    } rounded-full text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer ${
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

                          <button
                            onClick={() => handleAddOctubreToCart(item)}
                            disabled={item.soldOut}
                            className={`w-full py-3.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md ${
                              item.soldOut
                                ? 'bg-red-900/70 text-white/80 cursor-not-allowed'
                                : isInverted
                                ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer'
                                : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer'
                            }`}
                          >
                            {item.soldOut
                              ? item.soldOutText || 'AGOTADO'
                              : '+ Añadir a la bolsa'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN B: #coleccion-cultural (12 CAMISETAS EN BUCLE INFINITO) ================= */}
      <section
        id="coleccion-cultural"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className={`text-3xl md:text-5xl font-bold tracking-tight uppercase ${
                  isInverted ? 'text-[#081f1a]' : 'text-white'
                }`}
              >
                COLECCIÓN CULTURAL
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => stepCultural(-1)}
                aria-label="Anterior en Colección Cultural"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/70 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => stepCultural(1)}
                aria-label="Siguiente en Colección Cultural"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/70 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => stepCultural(-1)}
              aria-label="Anterior en Colección Cultural"
              className={`flex absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border shadow-2xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => stepCultural(1)}
              aria-label="Siguiente en Colección Cultural"
              className={`flex absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border shadow-2xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait" custom={culturalDir}>
              <motion.div
                key={culturalIdx}
                custom={culturalDir}
                variants={carouselMotionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, stepCultural)}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleCultural.map(({ item: product }, index) => {
                  const cfg = culturalConfig[product.id] || {
                    size: 'M',
                    tone: 'blanco'
                  };
                  const currentPrice = cfg.tone === 'crema' ? 490 : 480;

                  return (
                    <div
                      key={product.id}
                      className={`rounded-3xl overflow-hidden border flex-col justify-between transition-colors duration-300 ${
                        index > 0 ? 'hidden md:flex' : 'flex w-full md:w-auto'
                      } ${
                        isInverted
                          ? 'bg-white/60 border-[#081f1a]/15'
                          : 'bg-black/35 border-[#e6e1d5]/15'
                      }`}
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        {product.soldOut && (
                          <div className="absolute inset-0 bg-red-800/70 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-white font-extrabold text-lg tracking-[0.28em] uppercase px-6 py-2.5 border border-white/40 rounded shadow-xl">
                              AGOTADO
                            </span>
                          </div>
                        )}
                      </div>

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
                          <p className="text-xs opacity-75">
                            {product.subtitle}
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          {/* Selector de Tono en Círculos: Blanco (C$ 480) y Crema (C$ 490) */}
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider opacity-75">
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
                                        [product.id]: {
                                          ...cfg,
                                          tone: swatch.id
                                        }
                                      }))
                                    }
                                    title={`${swatch.label} — C$ ${swatch.price}`}
                                    aria-label={`${swatch.label} — C$ ${swatch.price}`}
                                    className={`w-6 h-6 rounded-full ${swatch.bgClass} border border-black/25 transition-transform cursor-pointer ${
                                      activeSwatch
                                        ? isInverted
                                          ? 'ring-2 ring-[#081f1a] ring-offset-2 ring-offset-white scale-110'
                                          : 'ring-2 ring-white/80 ring-offset-2 ring-offset-black/50 scale-110'
                                        : 'opacity-75 hover:opacity-100'
                                    }`}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          {/* Selector de Tallas */}
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider opacity-75">
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

                          <button
                            onClick={() => handleAddCulturalToCart(product)}
                            disabled={product.soldOut}
                            className={`w-full py-3.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md ${
                              product.soldOut
                                ? 'bg-red-900/70 text-white/80 cursor-not-allowed'
                                : isInverted
                                ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer'
                                : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer'
                            }`}
                          >
                            {product.soldOut
                              ? 'AGOTADO'
                              : '+ Añadir a la bolsa'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN C: #tote-bags (LOS 3 BOLSOS EN BUCLE INFINITO) ================= */}
      <section
        id="tote-bags"
        className={`py-24 px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className={`text-3xl md:text-5xl font-bold tracking-tight uppercase ${
                  isInverted ? 'text-[#081f1a]' : 'text-white'
                }`}
              >
                TOTE BAGS
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => stepTote(-1)}
                aria-label="Anterior en Tote Bags"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/70 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => stepTote(1)}
                aria-label="Siguiente en Tote Bags"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/70 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/35 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => stepTote(-1)}
              aria-label="Anterior en Tote Bags"
              className={`flex absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border shadow-2xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => stepTote(1)}
              aria-label="Siguiente en Tote Bags"
              className={`flex absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border shadow-2xl items-center justify-center transition-all cursor-pointer ${
                isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20 hover:scale-105'
                  : 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20 hover:scale-105'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait" custom={toteDir}>
              <motion.div
                key={toteIdx}
                custom={toteDir}
                variants={carouselMotionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, stepTote)}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visibleTotes.map(({ item: tote }, index) => {
                  const qty = toteQty[tote.id] || 1;
                  return (
                    <div
                      key={tote.id}
                      className={`rounded-3xl overflow-hidden border flex-col justify-between transition-colors duration-300 ${
                        index > 0 ? 'hidden md:flex' : 'flex w-full md:w-auto'
                      } ${
                        isInverted
                          ? 'bg-white/60 border-[#081f1a]/15'
                          : 'bg-black/35 border-[#e6e1d5]/15'
                      }`}
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
                        <img
                          src={tote.image}
                          alt={tote.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        {tote.soldOut && (
                          <div className="absolute inset-0 bg-red-800/70 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-white font-extrabold text-lg tracking-[0.28em] uppercase px-6 py-2.5 border border-white/40 rounded shadow-xl">
                              AGOTADO
                            </span>
                          </div>
                        )}
                      </div>

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
                          <p className="text-xs opacity-75">{tote.subtitle}</p>
                        </div>

                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider opacity-75">
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
                            disabled={tote.soldOut}
                            className={`w-full py-3.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md ${
                              tote.soldOut
                                ? 'bg-red-900/70 text-white/80 cursor-not-allowed'
                                : isInverted
                                ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer'
                                : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer'
                            }`}
                          >
                            {tote.soldOut ? 'AGOTADO' : '+ Añadir a la bolsa'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= CARRITO LATERAL (DRAWER) ================= */}
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
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md border-l p-6 flex flex-col justify-between shadow-2xl transition-colors duration-300 ${
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
                      ? 'bg-white/70 border-[#081f1a]/15 text-[#081f1a]'
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
                          ? 'bg-white/60 border-[#081f1a]/10'
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
