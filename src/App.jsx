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
  Minus,
  Ruler
} from 'lucide-react';

const WHATSAPP_NUMBER = '50583332316';
const EXCHANGE_RATE = 36.62;

// Colecciones oficiales del inventario Drive
const COLLECTIONS_TABS = [
  { id: 'mitos', label: 'MITOS DE LA NOCHE' },
  { id: 'raices', label: 'RAÍCES' },
  { id: 'sazon', label: 'SAZÓN Y SON NICA' },
  { id: 'estampas', label: 'ESTAMPAS DEL PUEBLO' },
  { id: 'totebags', label: 'TOTE BAGS' }
];

// ================= CATÁLOGO COMPLETO DE PRODUCTOS (23 PIEZAS CON IMÁGENES REACTIVAS POR COLOR) =================
const ALL_CATALOG_PRODUCTS = [
  // --- MITOS DE LA NOCHE (DROP OCTUBRE) ---
  {
    id: 'cegua-frente',
    collection: 'mitos',
    name: 'LA CEGUA (FRENTE)',
    description:
      'Reinterpretación gráfica de la leyenda colonial nicaragüense que sorprende a los trasnochadores. Arte serigráfico sobre algodón negro profundo.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cegua-cutout-1.png',
    soldOut: false,
    darkBg: '#141e28',
    lightBg: '#dde4ec',
    colors: [
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 490, image: '/assets/products/cegua-cutout-1.png' }
    ],
    defaultColor: 'negro'
  },
  {
    id: 'cegua-variante',
    collection: 'mitos',
    name: 'LA CEGUA (VARIANTE / MODELO)',
    description:
      'Silueta individual de nuestra edición mística de La Cegua en tinta color hueso envejecido sobre tejido suave 100% algodón.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cegua-cutout-2.png',
    soldOut: false,
    darkBg: '#101820',
    lightBg: '#d8e0e8',
    colors: [
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 490, image: '/assets/products/cegua-cutout-2.png' }
    ],
    defaultColor: 'negro'
  },
  {
    id: 'cadejo-morado',
    collection: 'mitos',
    name: 'CADEJO (MORADO / LILA)',
    description:
      'Inspirada en el mítico guardián nocturno de los caminos de Nicaragua. Edición especial en tono morado/azul profundo con trazos de grabado folclórico.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cadejo-cutout-1.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#32111c',
    lightBg: '#eadce1',
    colors: [
      { id: 'morado', label: 'Morado / Lila', bgClass: 'bg-[#40224d]', price: 490, image: '/assets/products/cadejo-cutout-1.png' }
    ],
    defaultColor: 'morado'
  },
  {
    id: 'cadejo-crema',
    collection: 'mitos',
    name: 'CADEJO (CREMA / BEIGE)',
    description:
      'La dualidad del espectro nocturno nicaragüense plasmada sobre algodón crema cálido con serigrafía artesanal de alto contraste.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cadejo-cutout-2.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#2e1d16',
    lightBg: '#efe4d8',
    colors: [
      { id: 'crema', label: 'Crema / Beige', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/cadejo-cutout-2.png' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'deacachimba',
    collection: 'mitos',
    name: 'TOP MUY DEACACHIMBA',
    description:
      'Homenaje al habla popular pinolera coronado por el Guardabarranco en vuelo. Silueta raglán bicolor de calce cómodo y fresco.',
    detail: 'Top Raglán Unitalla • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla', 'Otra talla'],
    image: '/assets/products/deacachimba-cutout.png',
    soldOut: false,
    darkBg: '#0d2b24',
    lightBg: '#dbeae4',
    colors: [
      { id: 'verde', label: 'Bicolor Verde', bgClass: 'bg-[#124038]', price: 550, image: '/assets/products/deacachimba-cutout.png' }
    ],
    defaultColor: 'verde'
  },
  {
    id: 'top-nicaragua',
    collection: 'mitos',
    name: 'TOP NICARAGUA',
    description:
      'Tierra de lagos y volcanes plasmada en un corte raglán clásico con mangas en contraste verde bosque y arte colonial.',
    detail: 'Top Raglán Unitalla • Hecho en Nicaragua',
    price: 550,
    sizes: ['Unitalla', 'Otra talla'],
    image: '/assets/products/nicaragua-cutout.png',
    soldOut: false,
    darkBg: '#0a241e',
    lightBg: '#d8e8df',
    colors: [
      { id: 'verde', label: 'Bicolor Verde', bgClass: 'bg-[#124038]', price: 550, image: '/assets/products/nicaragua-cutout.png' }
    ],
    defaultColor: 'verde'
  },

  // --- RAÍCES ---
  {
    id: 'guardabarranco',
    collection: 'raices',
    name: 'GUARDABARRANCO',
    description:
      'Ave nacional de plumaje turquesa y cola de raqueta. Ilustración serigráfica de autor que evoca la naturaleza silvestre de Nicaragua.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/catalog/guardabarranco/blanco-1.webp',
    soldOut: false,
    darkBg: '#0d2822',
    lightBg: '#dbeee6',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/guardabarranco/blanco-1.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/guardabarranco/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/guardabarranco/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'gueguense',
    collection: 'raices',
    name: 'GÜEGÜENSE & MACHO RATÓN',
    description:
      'Patrimonio Oral e Inmaterial de la Humanidad. El ingenio, la picardía y la resistencia colonial nicaragüense plasmados con trazo firme.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/catalog/gueguense-macho-raton/blanco-1.webp',
    soldOut: false,
    darkBg: '#221e10',
    lightBg: '#eee6d4',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/gueguense-macho-raton/blanco-1.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/gueguense-macho-raton/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/gueguense-macho-raton/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'sacuanjoche',
    collection: 'raices',
    name: 'SACUANJOCHE',
    description:
      'Nuestra flor nacional cargada de simbolismo ancestral, pureza y aroma volcánico. Arte serigráfico en tintas de alto contraste.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/catalog/sacuanjoche/negro-1.webp',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#1c1b18',
    lightBg: '#e2e0dc',
    colors: [
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/sacuanjoche/negro-1.webp' }
    ],
    defaultColor: 'negro'
  },
  {
    id: 'fauna-local',
    collection: 'raices',
    name: 'FAUNA LOCAL',
    description:
      'El vuelo del Guardabarranco y el Chocoyo en composiciones botánicas. Homenaje a la biodiversidad pinolera sobre tejido premium.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/catalog/fauna-local/blanco-1.webp',
    soldOut: false,
    darkBg: '#0f2622',
    lightBg: '#dceee7',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/fauna-local/blanco-1.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/fauna-local/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/fauna-local/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'nicaragua-shirt',
    collection: 'raices',
    name: 'NICARAGUA CAMISETA',
    description:
      'Lagos, volcanes y flor de Sacuanjoche reunidos en un grabado editorial que resume el orgullo patrio de nuestra tierra.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/catalog/nicaragua/blanco-1.webp',
    soldOut: false,
    darkBg: '#12252e',
    lightBg: '#ddebee',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/nicaragua/blanco-1.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/nicaragua/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/nicaragua/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },

  // --- SAZÓN Y SON NICA ---
  {
    id: 'sopa-queso',
    collection: 'sazon',
    name: 'SOPA DE QUESO',
    description:
      'Hecha como manda la abuela desde la época colonial. Un tributo gráfico al sabor y la memoria de la gastronomía tradicional nicaragüense.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/sopa-photo.png',
    soldOut: false,
    darkBg: '#2e260c',
    lightBg: '#f0e6c8',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/sopa-photo.png' },
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/page2-cutout-2.png' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'nacatamal',
    collection: 'sazon',
    name: 'NACATAMAL',
    description:
      'El rey del desayuno de domingo en Nicaragua. Masa de maíz, cerdo criollo, hierbabuena y envoltura de hoja de plátano ilustrada con maestría.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/nacatamal-photo.jpg',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#1f1b14',
    lightBg: '#eee8dc',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/nacatamal-photo.jpg' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'bunuelos-shirt',
    collection: 'sazon',
    name: 'BUÑUELOS CAMISETA',
    description:
      'Dulzura tradicional nicaragüense: yuca rallada, queso de crema y baño de miel en caldero colonial. Arte de autor para llevar puesto.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/bunuelos-shirt-photo.png',
    soldOut: false,
    darkBg: '#2a1a0e',
    lightBg: '#efe2d4',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/bunuelos-shirt-photo.png' },
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/bunuelos/blanco-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/bunuelos/negro-1.webp' }
    ],
    defaultColor: 'crema'
  },

  // --- ESTAMPAS DEL PUEBLO ---
  {
    id: 'catedral',
    collection: 'estampas',
    name: 'CATEDRAL DE GRANADA',
    description:
      'La joya arquitectónica neoclásica de La Gran Sultana junto a la flor nacional Sacuanjoche y la cordillera volcánica.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/catedral-photo.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#361713',
    lightBg: '#eedbd5',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/catedral-photo.png' },
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/catedral-de-granada/crema-1.webp' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'isletas',
    collection: 'estampas',
    name: 'ISLETAS DE GRANADA',
    description:
      'Postal serigráfica del archipiélago volcánico del Gran Lago Cocibolca, con lanchas tradicionales, palmeras y el volcán Mombacho.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/isletas-photo.png',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#0e282e',
    lightBg: '#d8eaec',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/isletas-photo.png' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'leon-sutiaba',
    collection: 'estampas',
    name: 'LEÓN Y SOL DE SUTIABA',
    description:
      'Herencia indígena y colonial de la primera capital. El Sol de Sutiaba y la torre barroca de la Real Basílica Catedral.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/leon-photo.jpg',
    soldOut: false,
    darkBg: '#211828',
    lightBg: '#e8dfea',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/leon-photo.jpg' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/leon-y-sol-de-sutiaba/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/leon-y-sol-de-sutiaba/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'gigantona',
    collection: 'estampas',
    name: 'GIGANTONA Y ENANO CABEZÓN',
    description:
      'El alma callejera y picaresca de las fiestas leonesas. Versos, tambores y bailes tradicionales en una ilustración vibrante.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/gigantona-photo.jpg',
    soldOut: false,
    darkBg: '#241416',
    lightBg: '#ecdfe0',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/gigantona-photo.jpg' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/gigantona-y-enano-cabezon/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/gigantona-y-enano-cabezon/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },

  // --- TOTE BAGS ---
  {
    id: 'tote-bunuelos-bag',
    collection: 'totebags',
    name: 'TOTE BUÑUELOS',
    description:
      'Dedicado al postre más querido de nuestras fiestas y tardes pinoleras: buñuelos de yuca y queso bañados en miel.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/tote-bunuelos.jpg',
    soldOut: false,
    darkBg: '#2e1b0d',
    lightBg: '#eee0d2',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/tote-bunuelos.jpg' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-fauna-local',
    collection: 'totebags',
    name: 'TOTE FAUNA LOCAL',
    description:
      'Ilustración botánica y ornitológica del Guardabarranco sobre lona cruda de alta resistencia para uso diario.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/tote-fauna.jpg',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#102b26',
    lightBg: '#dbe9e2',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/tote-fauna.jpg' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-nicaragua-bag',
    collection: 'totebags',
    name: 'TOTE NICARAGUA',
    description:
      'Catedral colonial, volcán y Sacuanjoche estampados en verde bosque profundo sobre bolso de lona artesanal.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/tote-nicaragua.jpg',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#0e2235',
    lightBg: '#dae4ee',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/tote-nicaragua.jpg' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-catedral-bag',
    collection: 'totebags',
    name: 'TOTE CATEDRAL DE GRANADA',
    description:
      'La emblemática arquitectura de La Gran Sultana impresa con técnica DTF sobre lona cruda ecológica de gran durabilidad.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/catedral-photo.png',
    soldOut: false,
    darkBg: '#2b1a16',
    lightBg: '#e8dcda',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/catedral-photo.png' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-sopa-bag',
    collection: 'totebags',
    name: 'TOTE SOPA DE QUESO',
    description:
      'Ilustración gastronómica colonial en bolso utilitario de lona resistente con asas reforzadas para uso diario.',
    detail: 'Lona cruda resistente 32×35 cm • Hecho en Nicaragua',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/sopa-photo.png',
    soldOut: false,
    darkBg: '#29210c',
    lightBg: '#eae3d0',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/sopa-photo.png' }
    ],
    defaultColor: 'crema'
  }
];

// Drop Octubre (6 piezas para el carrusel inferior)
const DROP_OCTUBRE_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'mitos');

// Colección Cultural (12 piezas para el carrusel cultural)
const COLECCION_CULTURAL_ITEMS = ALL_CATALOG_PRODUCTS.filter(
  (p) => p.collection === 'raices' || p.collection === 'sazon' || p.collection === 'estampas'
);

// Tote Bags (5 piezas para el carrusel inferior de bolsos)
const TOTE_BAGS_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'totebags');

// ================= FAQ Y POLÍTICAS =================
const FAQS = [
  {
    q: '¿Cómo funcionan los envíos en Managua y Departamentos?',
    a: 'En Managua realizamos entregas rápidas con servicio motorizado privado (tarifa estándar C$ 80 - 120 según tu sector). Para todos los departamentos de Nicaragua, despachamos vía CargoTrans directo a sucursal o con entrega a domicilio.'
  },
  {
    q: '¿Puedo retirar mi pedido personalmente (Pick Up)?',
    a: '¡Sí! Puedes retirar tu pedido sin costo adicional en El Cortijo de la Sierra, km 13 Carretera a Masaya, coordinando previamente tu horario de recogida por WhatsApp.'
  },
  {
    q: '¿Cuáles son los horarios de despacho?',
    a: 'Los pedidos confirmados de lunes a viernes antes de las 3:00 PM se procesan y despachan el mismo día o al día hábil siguiente.'
  },
  {
    q: '¿Cuál es la política de cambios y garantías?',
    a: 'Dispones de un lapso estricto de hasta 24 horas tras recibir tu pedido para solicitar un cambio por talla o prenda de igual valor. La pieza debe entregarse físicamente sin señales de uso, con sus etiquetas y en su empaque original.'
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos transferencias bancarias directas en Córdobas (C$) y Dólares (USD) a través de BAC, Banpro y Lafise. En Managua también disponemos de pago en efectivo contra entrega con el motorizado.'
  }
];

// Variantes de transición para el Slider
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

// Helper puro para obtener tarjetas cíclicas
const getVisibleCyclicItems = (items, startIndex, count = 3) => {
  const total = items.length;
  if (total === 0) return [];
  return Array.from({ length: Math.min(count, total) }, (_, offset) => {
    const idx = (startIndex + offset) % total;
    return { item: items[idx], index: idx };
  });
};

export default function App() {
  // Modo Oscuro (false) vs Modo Claro Invertido (true)
  const [isInverted, setIsInverted] = useState(false);

  // Filtro de Colección activa en Header (inicia por defecto en MITOS DE LA NOCHE)
  const [selectedCollection, setSelectedCollection] = useState('mitos');

  // Productos filtrados según la colección seleccionada
  const activeProducts = useMemo(() => {
    return ALL_CATALOG_PRODUCTS.filter((p) => p.collection === selectedCollection);
  }, [selectedCollection]);

  // Estado del Showcase
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [heroSize, setHeroSize] = useState('M');
  const [heroColor, setHeroColor] = useState('blanco');

  // Moneda activa (C$ NIO / USD Dólares)
  const [currency, setCurrency] = useState('NIO');

  // Checkout inputs
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferencia bancaria');

  // Modal Guía de Tallas y FAQ acordeón
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Índices para carruseles inferiores
  const [octubreIdx, setOctubreIdx] = useState(0);
  const [octubreDir, setOctubreDir] = useState(1);

  const [culturalIdx, setCulturalIdx] = useState(0);
  const [culturalDir, setCulturalDir] = useState(1);

  const [toteIdx, setToteIdx] = useState(0);
  const [toteDir, setToteDir] = useState(1);

  // Tallas para Drop Octubre
  const [octubreSizes, setOctubreSizes] = useState(() => {
    const init = {};
    DROP_OCTUBRE_ITEMS.forEach((item) => {
      init[item.id] = item.sizes.includes('M') ? 'M' : item.sizes[0];
    });
    return init;
  });

  // Configuración de talla y tono para Colección Cultural
  const [culturalConfig, setCulturalConfig] = useState(() => {
    const initial = {};
    COLECCION_CULTURAL_ITEMS.forEach((item) => {
      initial[item.id] = { size: 'M', tone: item.defaultColor || 'blanco' };
    });
    return initial;
  });

  // Cantidades para Tote Bags
  const [toteQty, setToteQty] = useState({
    'tote-bunuelos-bag': 1,
    'tote-fauna-local': 1,
    'tote-nicaragua-bag': 1,
    'tote-catedral-bag': 1,
    'tote-sopa-bag': 1
  });

  // Carrito
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Producto activo actual
  const currentHeroProduct = activeProducts[currentIndex] || activeProducts[0];

  // Variante de color activa para el producto actual (reactiva al hacer clic en swatches)
  const currentHeroColorVariant = useMemo(() => {
    if (!currentHeroProduct?.colors || currentHeroProduct.colors.length === 0) return null;
    return (
      currentHeroProduct.colors.find((c) => c.id === heroColor) ||
      currentHeroProduct.colors[0]
    );
  }, [currentHeroProduct, heroColor]);

  // Imagen reactiva según color seleccionado
  const currentHeroImage = currentHeroColorVariant?.image || currentHeroProduct?.image;

  // Precio reactivo según color seleccionado
  const currentHeroPrice = currentHeroColorVariant?.price || currentHeroProduct?.price || 480;

  // Formateo de precio dual
  const formatPrice = useCallback(
    (nioAmount, curr = currency) => {
      if (curr === 'USD') {
        const usd = (nioAmount / EXCHANGE_RATE).toFixed(2);
        return `$${usd} USD`;
      }
      return `C$ ${nioAmount}`;
    },
    [currency]
  );

  // Al cambiar de producto o colección, sincronizar color por defecto y talla
  const syncProductDefaults = useCallback((prod) => {
    if (!prod) return;
    const defCol = prod.defaultColor || prod.colors?.[0]?.id || 'blanco';
    setHeroColor(defCol);
    setHeroSize(prod.sizes.includes('M') ? 'M' : prod.sizes[0]);
  }, []);

  // Navegación del slider
  const handleSlide = useCallback(
    (dir) => {
      setDirection(dir);
      setCurrentIndex((prev) => {
        const total = activeProducts.length;
        if (total === 0) return 0;
        const nextIdx = dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total;
        syncProductDefaults(activeProducts[nextIdx]);
        return nextIdx;
      });
    },
    [activeProducts, syncProductDefaults]
  );

  // Listener de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCartOpen || isSizeGuideOpen) return;
      if (e.key === 'ArrowRight') handleSlide(1);
      else if (e.key === 'ArrowLeft') handleSlide(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSlide, isCartOpen, isSizeGuideOpen]);

  const touchStartX = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e, stepFn) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) stepFn(1);
    else if (diff < -40) stepFn(-1);
    touchStartX.current = null;
  }, []);

  const stepOctubre = (dir) => {
    setOctubreDir(dir);
    const total = DROP_OCTUBRE_ITEMS.length;
    setOctubreIdx((prev) => (dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total));
  };

  const stepCultural = (dir) => {
    setCulturalDir(dir);
    const total = COLECCION_CULTURAL_ITEMS.length;
    setCulturalIdx((prev) => (dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total));
  };

  const stepTote = (dir) => {
    setToteDir(dir);
    const total = TOTE_BAGS_ITEMS.length;
    setToteIdx((prev) => (dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total));
  };

  // Carrito helpers
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
    const colorLabel = currentHeroColorVariant ? ` (${currentHeroColorVariant.label})` : '';
    addItemToCart({
      id: `${currentHeroProduct.id}-${currentHeroColorVariant?.id || 'default'}`,
      name: `${currentHeroProduct.name}${colorLabel}`,
      size: sizeToUse,
      price: currentHeroPrice,
      image: currentHeroImage,
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
    const cfg = culturalConfig[item.id] || { size: 'M', tone: item.defaultColor || 'blanco' };
    const colorObj = item.colors?.find((c) => c.id === cfg.tone) || item.colors?.[0];
    const price = colorObj?.price || (cfg.tone === 'crema' ? 490 : 480);
    const img = colorObj?.image || item.image;
    const toneLabel = colorObj?.label || (cfg.tone === 'crema' ? 'Crema' : 'Blanco');

    addItemToCart({
      id: `${item.id}-${cfg.tone}`,
      name: `${item.name} (${toneLabel})`,
      size: cfg.size,
      price,
      image: img,
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

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);
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
          `• ${item.qty}x ${item.name} (Talla: ${item.size}) — ${formatPrice(
            item.price * item.qty,
            currency
          )}`
      )
      .join('\n');

    const addressText = deliveryAddress.trim()
      ? `Dirección de entrega: ${deliveryAddress.trim()}`
      : 'Dirección de entrega: (A coordinar)';

    const text = `¡Hola MIPEUE! Quiero realizar el siguiente pedido:\n\n${itemsList}\n\nTotal artículos: ${formatPrice(
      cartTotal,
      currency
    )} (Envío pendiente de cotizar)\n${addressText}\nMétodo de pago previsto: ${paymentMethod}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  // Fondo adaptativo
  const adaptiveSurfaceStyle = useMemo(
    () => ({
      backgroundColor: isInverted
        ? currentHeroProduct?.lightBg || '#efe4d8'
        : currentHeroProduct?.darkBg || '#081f1a',
      backgroundImage: isInverted
        ? 'radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.55) 0%, rgba(8, 31, 26, 0.06) 100%)'
        : 'radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.55) 100%)',
      transition:
        'background-color 0.7s cubic-bezier(0.4, 0, 0.2, 1), background 0.7s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s ease'
    }),
    [isInverted, currentHeroProduct]
  );

  const visibleOctubre = useMemo(
    () => getVisibleCyclicItems(DROP_OCTUBRE_ITEMS, octubreIdx, 3),
    [octubreIdx]
  );
  const visibleCultural = useMemo(
    () => getVisibleCyclicItems(COLECCION_CULTURAL_ITEMS, culturalIdx, 3),
    [culturalIdx]
  );
  const visibleTotes = useMemo(
    () => getVisibleCyclicItems(TOTE_BAGS_ITEMS, toteIdx, 3),
    [toteIdx]
  );

  return (
    <div
      style={adaptiveSurfaceStyle}
      className={`min-h-screen select-none ${
        isInverted ? 'text-[#081f1a]' : 'text-[#e6e1d5]'
      }`}
    >
      {/* ================= HEADER SUPERIOR FIJO ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 px-4 md:px-10 py-3.5 md:py-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-x-4 gap-y-2.5 pointer-events-none">
        {/* Izquierda: Logotipo Oficial MiPEUE en PNG transparente (sin badge MP) */}
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-2 cursor-pointer group"
          title="MiPEUE — Cultura Nica"
        >
          <img
            src={isInverted ? '/assets/brand/mipeue-logo-negro.png' : '/assets/brand/mipeue-logo-crema.png'}
            alt="MiPEUE"
            className="h-8 md:h-9 w-auto object-contain transition-opacity group-hover:opacity-85"
          />
        </a>

        {/* Centro: Píldora de Colecciones Oficiales [ MITOS DE LA NOCHE | RAÍCES | SAZÓN Y SON NICA | ESTAMPAS DEL PUEBLO | TOTE BAGS ] */}
        <nav
          className={`pointer-events-auto backdrop-blur-md rounded-full p-1 md:p-1.5 border flex items-center gap-1 order-3 w-full justify-start md:justify-center overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth md:order-none md:w-auto max-w-full transition-colors duration-300 ${
            isInverted
              ? 'bg-white/60 border-[#081f1a]/15'
              : 'bg-black/35 border-[#e6e1d5]/15'
          }`}
        >
          {COLLECTIONS_TABS.map((tab) => {
            const active = selectedCollection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedCollection(tab.id);
                  setCurrentIndex(0);
                  const firstProd = ALL_CATALOG_PRODUCTS.find((p) => p.collection === tab.id);
                  if (firstProd) {
                    syncProductDefaults(firstProd);
                  }
                }}
                className={`px-3 py-2 md:px-3.5 md:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.11em] md:tracking-[0.13em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 min-h-[36px] flex items-center justify-center cursor-pointer ${
                  active
                    ? isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5] shadow-sm'
                      : 'bg-[#e6e1d5] text-[#081f1a] shadow-sm'
                    : isInverted
                    ? 'text-[#081f1a]/75 hover:text-[#081f1a] hover:bg-[#081f1a]/5'
                    : 'text-[#e6e1d5]/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Derecha: Selector Moneda + Switch Invertir + WhatsApp + Bolsa */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          {/* Selector de Moneda C$ / USD */}
          <button
            type="button"
            onClick={() => setCurrency((c) => (c === 'NIO' ? 'USD' : 'NIO'))}
            className={`h-10 px-3 rounded-full border backdrop-blur-md flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              isInverted
                ? 'bg-white/60 border-[#081f1a]/15 text-[#081f1a] hover:bg-[#081f1a]/10'
                : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-[#e6e1d5]/10'
            }`}
            title="Alternar entre Córdobas (C$) y Dólares (USD)"
            aria-label="Alternar moneda"
          >
            <span
              className={
                currency === 'NIO'
                  ? 'font-extrabold opacity-100 underline underline-offset-4 decoration-2'
                  : 'opacity-55'
              }
            >
              C$
            </span>
            <span className="opacity-30 text-[10px]">|</span>
            <span
              className={
                currency === 'USD'
                  ? 'font-extrabold opacity-100 underline underline-offset-4 decoration-2'
                  : 'opacity-55'
              }
            >
              USD
            </span>
          </button>

          <button
            type="button"
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
            type="button"
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

      {/* ================= HERO SHOWCASE INTERACTIVO ================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-between p-6 md:p-10 pt-28 md:pt-20 relative"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-4 my-auto">
          {/* Columna Izquierda: Flechas < > + Contador recalibrado según colección + Título */}
          <div className="md:col-span-3 flex flex-col items-start justify-center space-y-5 order-2 md:order-1 z-10">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
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
                type="button"
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
                {currentIndex + 1} / {activeProducts.length}
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
              type="button"
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

          {/* Centro: Imagen del producto REACTIVA AL COLOR SELECCIONADO CON CROSS-FADE EDITORIAL */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative order-1 md:order-2">
            <div className="relative flex items-center justify-center w-full min-h-[50vh] sm:min-h-[64vh] md:min-h-[72vh]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${currentHeroProduct.id}-${currentHeroColorVariant?.id || 'default'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="relative flex items-center justify-center w-full"
                >
                  <img
                    src={currentHeroImage}
                    alt={`${currentHeroProduct.name} ${currentHeroColorVariant?.label || ''}`}
                    fetchPriority="high"
                    decoding="async"
                    className="h-[52vh] sm:h-[68vh] md:h-[74vh] max-h-[750px] w-auto object-contain drop-shadow-2xl pointer-events-none garment-stage-blend select-none"
                  />

                  {currentHeroProduct.soldOut && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-red-700/80 backdrop-blur-[2px] text-white font-extrabold text-xs sm:text-base tracking-[0.26em] uppercase px-8 py-3.5 rounded-md shadow-2xl border border-white/30 text-center">
                        {currentHeroProduct.soldOutLabel || 'AGOTADO TEMPORALMENTE'}
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

          {/* Columna Derecha: Precio reactivo + Swatches de color reactivos + Selector de tallas */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center space-y-6 order-3 z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentHeroProduct.id}-${currentHeroPrice}-${currency}`}
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
                  {formatPrice(currentHeroPrice)}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Selector de Color Reactivo: cambia inmediatamente la foto y el precio con cross-fade suave */}
            {currentHeroProduct.colors && currentHeroProduct.colors.length > 1 && (
              <div className="flex flex-col items-start md:items-end space-y-2.5">
                <span className="text-xs opacity-80 tracking-wide">
                  Color ({currentHeroColorVariant?.label || 'Blanco'} — {formatPrice(currentHeroPrice)}):
                </span>
                <div className="flex items-center gap-3">
                  {currentHeroProduct.colors.map((color) => {
                    const activeSwatch = (currentHeroColorVariant?.id || 'blanco') === color.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setHeroColor(color.id)}
                        title={`${color.label} — ${formatPrice(color.price)}`}
                        aria-label={`${color.label} ${formatPrice(color.price)}`}
                        className={`w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full ${color.bgClass} border border-black/25 transition-transform cursor-pointer flex items-center justify-center shrink-0 ${
                          activeSwatch
                            ? isInverted
                              ? 'ring-2 ring-[#081f1a] ring-offset-2 ring-offset-[#e6e1d5] scale-110'
                              : 'ring-2 ring-white/80 ring-offset-2 ring-offset-black/50 scale-110'
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selector de Tallas */}
            <div className="flex flex-col items-start md:items-end space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-80 tracking-wide">
                  Elige tu talla:
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] underline opacity-65 hover:opacity-100 flex items-center gap-1 cursor-pointer transition-opacity"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Guía de medidas</span>
                </button>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap md:justify-end">
                {currentHeroProduct.sizes.map((size) => {
                  const isSelected = heroSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setHeroSize(size)}
                      className={`${
                        size === 'Unitalla' || size === 'Otra talla' ? 'px-3.5 h-11' : 'w-11 h-11'
                      } rounded-full text-xs font-semibold transition-all flex items-center justify-center cursor-pointer shrink-0 min-w-[36px] min-h-[36px] ${
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

        {/* Pie del Hero */}
        <div className="flex items-center justify-center pt-1 z-10">
          <p className="text-xs sm:text-sm opacity-80 font-medium leading-snug text-center">
            Tradición y arte popular,{' '}
            <span className="opacity-65">hecho prenda en Nicaragua</span>
          </p>
        </div>
      </section>

      {/* ================= SECCIÓN A: #drop-octubre (MITOS DE LA NOCHE) ================= */}
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
                DROP OCTUBRE • MITOS DE LA NOCHE
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
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
                type="button"
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
              type="button"
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
              type="button"
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
                variants={heroItemVariants}
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
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        {item.soldOut && (
                          <div className="absolute inset-0 bg-red-800/70 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-white font-extrabold text-xs sm:text-sm tracking-[0.22em] uppercase px-6 py-2.5 border border-white/40 rounded shadow-xl text-center">
                              {item.soldOutLabel || 'AGOTADO TEMPORALMENTE'}
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
                              {item.name}
                            </h3>
                            <span
                              className={`text-xl font-bold shrink-0 ${
                                isInverted ? 'text-[#081f1a]' : 'text-white'
                              }`}
                            >
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="text-xs opacity-75">{item.detail}</p>
                        </div>

                        <div className="space-y-4 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider opacity-70">
                              Talla:
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.sizes.map((sz) => {
                                const activeSz = selectedSz === sz;
                                return (
                                  <button
                                    key={sz}
                                    type="button"
                                    onClick={() =>
                                      setOctubreSizes((prev) => ({
                                        ...prev,
                                        [item.id]: sz
                                      }))
                                    }
                                    className={`${
                                      sz === 'Unitalla' || sz === 'Otra talla' ? 'px-2.5 h-9' : 'w-9 h-9'
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
                            type="button"
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
                              ? item.soldOutLabel || 'AGOTADO'
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

      {/* ================= SECCIÓN B: #coleccion-cultural (RAÍCES, SAZÓN Y ESTAMPAS) ================= */}
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
                type="button"
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
                type="button"
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
              type="button"
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
              type="button"
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
                variants={heroItemVariants}
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
                    tone: product.defaultColor || 'blanco'
                  };
                  const colorObj = product.colors?.find((c) => c.id === cfg.tone) || product.colors?.[0];
                  const currentPrice = colorObj?.price || (cfg.tone === 'crema' ? 490 : 480);
                  const displayImage = colorObj?.image || product.image;

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
                          src={displayImage}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 garment-stage-blend"
                        />
                        {product.soldOut && (
                          <div className="absolute inset-0 bg-red-800/70 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-white font-extrabold text-xs sm:text-base tracking-[0.28em] uppercase px-6 py-2.5 border border-white/40 rounded shadow-xl text-center">
                              {product.soldOutLabel || 'AGOTADO TEMPORALMENTE'}
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
                              {formatPrice(currentPrice)}
                            </span>
                          </div>
                          <p className="text-xs opacity-75">
                            {product.detail}
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          {/* Selector de Tono Reactivo */}
                          {product.colors && product.colors.length > 1 && (
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] uppercase tracking-wider opacity-75">
                                Color ({colorObj?.label || 'Blanco'}):
                              </span>
                              <div className="flex items-center gap-3">
                                {product.colors.map((color) => {
                                  const activeSwatch = cfg.tone === color.id;
                                  return (
                                    <button
                                      key={color.id}
                                      type="button"
                                      onClick={() =>
                                        setCulturalConfig((prev) => ({
                                          ...prev,
                                          [product.id]: {
                                            ...cfg,
                                            tone: color.id
                                          }
                                        }))
                                      }
                                      title={`${color.label} — ${formatPrice(color.price)}`}
                                      aria-label={`${color.label} ${formatPrice(color.price)}`}
                                      className={`w-9 h-9 min-w-[36px] min-h-[36px] rounded-full ${color.bgClass} border border-black/25 transition-transform cursor-pointer flex items-center justify-center shrink-0 ${
                                        activeSwatch
                                          ? isInverted
                                            ? 'ring-2 ring-[#081f1a] ring-offset-2 ring-offset-[#e6e1d5] scale-110'
                                            : 'ring-2 ring-white/80 ring-offset-2 ring-offset-black/50 scale-110'
                                          : 'opacity-75 hover:opacity-100 hover:scale-105'
                                      }`}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider opacity-75">
                              Talla:
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {product.sizes.map((sz) => {
                                const activeSz = cfg.size === sz;
                                return (
                                  <button
                                    key={sz}
                                    type="button"
                                    onClick={() =>
                                      setCulturalConfig((prev) => ({
                                        ...prev,
                                        [product.id]: { ...cfg, size: sz }
                                      }))
                                    }
                                    className={`${
                                      sz === 'Unitalla' || sz === 'Otra talla' ? 'px-3 h-9' : 'w-9 h-9 min-w-[36px]'
                                    } rounded-full text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer shrink-0 ${
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
                            type="button"
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
                              ? product.soldOutLabel || 'AGOTADO'
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

      {/* ================= SECCIÓN C: #tote-bags (5 BOLSOS OFICIALES) ================= */}
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
                type="button"
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
                type="button"
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
              type="button"
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
              type="button"
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
                variants={heroItemVariants}
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
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                        />
                        {tote.soldOut && (
                          <div className="absolute inset-0 bg-red-800/70 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-white font-extrabold text-xs sm:text-base tracking-[0.28em] uppercase px-6 py-2.5 border border-white/40 rounded shadow-xl text-center">
                              {tote.soldOutLabel || 'AGOTADO TEMPORALMENTE'}
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
                              {formatPrice(tote.price)}
                            </span>
                          </div>
                          <p className="text-xs opacity-75">{tote.detail}</p>
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
                                type="button"
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
                                type="button"
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
                            type="button"
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
                            {tote.soldOut ? tote.soldOutLabel || 'AGOTADO' : '+ Añadir a la bolsa'}
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

      {/* ================= SECCIÓN NUESTRA HISTORIA (#historia) ================= */}
      <section
        id="historia"
        className={`py-16 sm:py-24 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-60">
              Sobre Nosotros
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-[1.08] ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              Nuestra Historia & El Arte de MiPEUE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed opacity-85">
            <p>
              MiPEUE nace de la visión de la ilustradora y creadora nicaragüense <strong className="opacity-100 font-semibold">Meysi</strong> por transformar los relatos orales, la gastronomía callejera y los personajes de nuestra memoria colectiva en piezas contemporáneas de moda urbana con identidad propia.
            </p>
            <p>
              Lejos de los suvenires convencionales, cada una de nuestras piezas es un trabajo de grabado e ilustración original de autor. Seleccionamos algodón peinado de alto gramaje para confeccionar prendas frescas, duraderas y respetuosas de la riqueza cultural de Nicaragua.
            </p>
          </div>

          <div className="pt-4 border-t border-current/10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider opacity-65">
            <span>• Ilustración Original de Autor</span>
            <span>• 100% Algodón Peinado Local</span>
            <span>• Hecho en Nicaragua</span>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN POLÍTICAS & FAQ ================= */}
      <section
        id="politicas"
        className={`py-14 sm:py-20 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2
              className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              Políticas y Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-xl mx-auto">
              Información sobre entregas, tiempos de despacho, retiros y garantía de cambio de MiPEUE.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-colors ${
                    isInverted
                      ? 'bg-white/60 border-[#081f1a]/15'
                      : 'bg-black/30 border-[#e6e1d5]/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <span className="text-lg opacity-60 shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm opacity-80 leading-relaxed border-t border-current/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className={`px-6 py-3 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isInverted
                  ? 'border-[#081f1a]/30 hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                  : 'border-[#e6e1d5]/30 hover:bg-[#e6e1d5] hover:text-[#081f1a]'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Ver Guía de Medidas Completa</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className={`py-10 sm:py-12 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 text-xs ${
          isInverted
            ? 'border-[#081f1a]/15 text-[#081f1a]'
            : 'border-[#e6e1d5]/15 text-[#e6e1d5]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            {/* Logo Oficial MiPEUE monocromático en el Footer */}
            <img
              src={isInverted ? '/assets/brand/mipeue-logo-negro.png' : '/assets/brand/mipeue-logo-crema.png'}
              alt="MiPEUE"
              className="h-7 w-auto object-contain opacity-90"
            />
            <span className="opacity-70 text-[11px]">
              Cultura, arte e identidad nicaragüense que se lleva puesta.
            </span>
            <span className="opacity-50 text-[10px]">
              Retiro Pick Up: El Cortijo de la Sierra km 13 Carretera a Masaya, Managua.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/mipeue"
              target="_blank"
              rel="noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity font-semibold tracking-wider uppercase text-[11px]"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@mipeue"
              target="_blank"
              rel="noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity font-semibold tracking-wider uppercase text-[11px]"
            >
              TikTok
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="opacity-75 hover:opacity-100 transition-opacity font-semibold tracking-wider uppercase text-[11px]"
            >
              WhatsApp
            </a>
          </div>

          <div className="text-center md:text-right opacity-60 text-[11px]">
            Desarrollado por <span className="font-semibold opacity-90">Cristian Wildcane</span>
          </div>
        </div>
      </footer>

      {/* ================= MODAL GUÍA DE TALLAS ================= */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl max-h-[90vh] overflow-y-auto ${
                isInverted
                  ? 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20'
                  : 'bg-[#081f1a] text-[#e6e1d5] border-[#e6e1d5]/20'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-current/15">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  <h3 className="text-lg font-bold uppercase tracking-wider">
                    Guía de Tallas y Medidas
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center hover:opacity-60 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-5 space-y-6 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2 opacity-80">
                    Camisetas Unisex (Algodón Peinado)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-current/20 opacity-60 text-[11px] uppercase">
                          <th className="py-2">Talla</th>
                          <th className="py-2">Ancho (Pecho)</th>
                          <th className="py-2">Largo</th>
                          <th className="py-2">Hombro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-current/10">
                        <tr><td className="py-2 font-bold">S</td><td>48 cm</td><td>70 cm</td><td>43 cm</td></tr>
                        <tr><td className="py-2 font-bold">M</td><td>52 cm</td><td>72 cm</td><td>46 cm</td></tr>
                        <tr><td className="py-2 font-bold">L</td><td>56 cm</td><td>75 cm</td><td>49 cm</td></tr>
                        <tr><td className="py-2 font-bold">XL</td><td>60 cm</td><td>78 cm</td><td>52 cm</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2 opacity-80">
                    Tops Raglán y Bolsos
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-current/20 opacity-60 text-[11px] uppercase">
                          <th className="py-2">Pieza</th>
                          <th className="py-2">Medidas</th>
                          <th className="py-2">Corte</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-current/10">
                        <tr>
                          <td className="py-2 font-bold">Top Raglán</td>
                          <td>Ancho 42 cm • Largo 46 cm</td>
                          <td>Unitalla / Bicolor</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold">Tote Bag</td>
                          <td>32 × 35 cm (Asas 60 cm)</td>
                          <td>Lona cruda resistente</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-[11px] opacity-65 leading-relaxed pt-2 border-t border-current/10">
                  * Medidas tomadas sobre prenda plana en centímetros. Si requieres confección en otra talla específica (XXL o XS), consúltanos al confirmar tu pedido.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= CARRITO LATERAL (DRAWER COLOR CREMA) ================= */}
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
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md max-w-full border-l p-4 sm:p-6 flex flex-col justify-between shadow-2xl transition-colors duration-300 bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/15 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#081f1a]/15">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-base font-bold tracking-wide uppercase">
                    Bolsa de Pedido ({cartCount})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#081f1a]/15 bg-white/70 text-[#081f1a] flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
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
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl border bg-white/70 border-[#081f1a]/10"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-12 h-12 object-cover rounded-lg shrink-0 border border-[#081f1a]/10"
                        />
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs opacity-70">
                            Talla: {item.size} • Cant: {item.qty}
                          </p>
                          <p className="text-xs font-semibold mt-0.5">
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
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

              <div className="pt-4 border-t border-[#081f1a]/15 space-y-3.5">
                {/* Formulario minimalista de Checkout */}
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                      Dirección o departamento de entrega
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Ej. Managua, Los Robles / Matagalpa centro"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#081f1a]/20 bg-white/80 focus:outline-none focus:border-[#081f1a] text-[#081f1a] placeholder:text-[#081f1a]/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                      Método de pago previsto
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Transferencia bancaria', 'Efectivo contra entrega'].map(
                        (method) => {
                          const isSelected = paymentMethod === method;
                          return (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setPaymentMethod(method)}
                              className={`px-2 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-center leading-tight ${
                                isSelected
                                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a] shadow-sm'
                                  : 'bg-white/60 text-[#081f1a]/75 border-[#081f1a]/15 hover:border-[#081f1a]/40'
                              }`}
                            >
                              {method}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] opacity-65 leading-tight italic">
                    * Tarifa no incluye costo de envío (se cotiza según destino por CargoTrans o motorizado en Managua).
                  </p>
                </div>

                <div className="space-y-1.5 text-sm pt-1">
                  <div className="flex justify-between opacity-70">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <a
                  href={getCheckoutWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer"
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
