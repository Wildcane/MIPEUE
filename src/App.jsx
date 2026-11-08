import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Trash2,
  X,
  MessageCircle,
  Plus,
  Minus,
  Ruler,
  Sparkles
} from 'lucide-react';

const WHATSAPP_NUMBER = '50583332316';
const EXCHANGE_RATE = 36.62;

// Secciones de navegación
const NAV_SECTIONS = [
  { id: 'hero', label: 'MITOS DE LA NOCHE' },
  { id: 'raices', label: 'RAÍCES' },
  { id: 'sazon', label: 'SAZÓN Y SON NICA' },
  { id: 'estampas', label: 'ESTAMPAS DEL PUEBLO' },
  { id: 'totebags', label: 'TOTE BAGS' }
];

// ================= CATÁLOGO COMPLETO DE PRODUCTOS (TODOS CON ASSETS .WEBP OPTIMIZADOS < 190 KB) =================
const ALL_CATALOG_PRODUCTS = [
  // --- MITOS DE LA NOCHE (HERO SHOWCASE / DROP OCTUBRE) ---
  {
    id: 'cegua-frente',
    collection: 'mitos',
    name: 'LA CEGUA (FRENTE)',
    description:
      'Inspirada en el espanto que castiga a los trasnochadores en los caminos solitarios. Serigrafía técnica sobre algodón peinado nicaragüense.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cegua-cutout-1.webp',
    soldOut: false,
    darkBg: '#081f1a',
    lightBg: '#e6e1d5',
    colors: [
      { id: 'negro', label: 'Negro Profundo', bgClass: 'bg-[#121212]', price: 490, image: '/assets/products/cegua-cutout-1.webp' }
    ],
    defaultColor: 'negro'
  },
  {
    id: 'cegua-variante',
    collection: 'mitos',
    name: 'LA CEGUA (VARIANTE / MODELO)',
    description:
      'Segunda perspectiva del mito colonial. Corte holgado con caída perfecta para el clima tropical de Managua y Granada.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cegua-cutout-2.webp',
    soldOut: false,
    darkBg: '#081f1a',
    lightBg: '#e6e1d5',
    colors: [
      { id: 'negro', label: 'Negro Profundo', bgClass: 'bg-[#121212]', price: 490, image: '/assets/products/cegua-cutout-2.webp' }
    ],
    defaultColor: 'negro'
  },
  {
    id: 'cadejo-morado',
    collection: 'mitos',
    name: 'CADEJO (MORADO / LILA)',
    description:
      'El guardián de la noche. Tonalidad lila profundo que captura el misterio del mítico can de ojos encendidos.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cadejo-cutout-1.webp',
    soldOut: false,
    darkBg: '#1f132e',
    lightBg: '#e9e3f0',
    colors: [
      { id: 'morado', label: 'Lila Místico', bgClass: 'bg-[#4a2e63]', price: 490, image: '/assets/products/cadejo-cutout-1.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/cadejo-cutout-2.webp' }
    ],
    defaultColor: 'morado'
  },
  {
    id: 'cadejo-crema',
    collection: 'mitos',
    name: 'CADEJO (CREMA / BEIGE)',
    description:
      'El protector blanco de los caminos. Pieza de coleccionista actualmente con demanda extraordinaria.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/cadejo-cutout-2.webp',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#211e15',
    lightBg: '#f2eee6',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/cadejo-cutout-2.webp' },
      { id: 'morado', label: 'Lila Místico', bgClass: 'bg-[#4a2e63]', price: 490, image: '/assets/products/cadejo-cutout-1.webp' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'deacachimba',
    collection: 'mitos',
    name: 'TOP MUY DEACACHIMBA',
    description:
      'Expresión cumbre de la jerga popular nicaragüense. Top cropped de alta frescura y ajuste ceñido con arte serigráfico exclusivo.',
    detail: 'Algodón peinado elástico • Hecho en Nicaragua',
    price: 360,
    sizes: ['Unitalla', 'S', 'M', 'Otra talla'],
    image: '/assets/products/deacachimba-cutout.webp',
    soldOut: false,
    darkBg: '#11221b',
    lightBg: '#e1ede7',
    colors: [
      { id: 'negro', label: 'Negro Grafito', bgClass: 'bg-[#181818]', price: 360, image: '/assets/products/deacachimba-cutout.webp' }
    ],
    defaultColor: 'negro'
  },
  {
    id: 'top-nicaragua',
    collection: 'mitos',
    name: 'TOP NICARAGUA',
    description:
      'Orgullo patrio llevado a la moda urbana. Calce contemporáneo, fresco y versátil para el día a día.',
    detail: 'Algodón peinado elástico • Hecho en Nicaragua',
    price: 360,
    sizes: ['Unitalla', 'S', 'M', 'Otra talla'],
    image: '/assets/products/nicaragua-cutout.webp',
    soldOut: false,
    darkBg: '#131e29',
    lightBg: '#e2ebf2',
    colors: [
      { id: 'negro', label: 'Negro Grafito', bgClass: 'bg-[#181818]', price: 360, image: '/assets/products/nicaragua-cutout.webp' }
    ],
    defaultColor: 'negro'
  },

  // --- SECCIÓN 1: COLECCIÓN RAÍCES ---
  {
    id: 'guardabarranco',
    collection: 'raices',
    name: 'GUARDABARRANCO',
    description:
      'Pájaro nacional de Nicaragua. Ilustración botánica y ornitológica con plumaje turquesa y cola de raqueta sobre textil de autor.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/guardabarranco-photo.webp',
    soldOut: false,
    darkBg: '#0f2922',
    lightBg: '#dcece7',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/guardabarranco-photo.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/guardabarranco/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#18181b]', price: 490, image: '/assets/catalog/guardabarranco/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'gueguense',
    collection: 'raices',
    name: 'GÜEGÜENSE & MACHO RATÓN',
    description:
      'Primera obra teatral y literaria poscolombina de América, Patrimonio de la Humanidad por la UNESCO. Grabado en tinta táctil.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/gueguense-photo.webp',
    soldOut: false,
    darkBg: '#2b1c0e',
    lightBg: '#efe4d7',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/gueguense-photo.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/gueguense-macho-raton/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#18181b]', price: 490, image: '/assets/catalog/gueguense-macho-raton/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },
  {
    id: 'sacuanjoche',
    collection: 'raices',
    name: 'SACUANJOCHE',
    description:
      'Flor nacional de Nicaragua (Plumeria rubra). Su fragancia cívica y pétalos dorados en una composición botánica de gran elegancia.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 480,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/sacuanjoche-photo.webp',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#1c1b18',
    lightBg: '#e2e0dc',
    colors: [
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/products/sacuanjoche-photo.webp' }
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
    image: '/assets/products/fauna-shirt-photo.webp',
    soldOut: false,
    darkBg: '#0f2622',
    lightBg: '#dceee7',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/fauna-shirt-photo.webp' },
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
    image: '/assets/products/nicaragua-shirt-photo.webp',
    soldOut: false,
    darkBg: '#12252e',
    lightBg: '#ddebee',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/nicaragua-shirt-photo.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/nicaragua/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/nicaragua/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },

  // --- SECCIÓN 2: COLECCIÓN SAZÓN Y SON NICA ---
  {
    id: 'sopa-queso',
    collection: 'sazon',
    name: 'SOPA DE QUESO',
    description:
      'Hecha como manda la abuela desde la época colonial. Un tributo gráfico al sabor y la memoria de la gastronomía tradicional nicaragüense.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/sopa-photo.webp',
    soldOut: false,
    darkBg: '#2e260c',
    lightBg: '#f0e6c8',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/sopa-photo.webp' },
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/page2-cutout-2.webp' }
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
    image: '/assets/products/nacatamal-photo.webp',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#1f1b14',
    lightBg: '#eee8dc',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/nacatamal-photo.webp' }
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
    image: '/assets/products/bunuelos-shirt-photo.webp',
    soldOut: false,
    darkBg: '#2a1a0e',
    lightBg: '#efe2d4',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/bunuelos-shirt-photo.webp' },
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/catalog/bunuelos/blanco-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/bunuelos/negro-1.webp' }
    ],
    defaultColor: 'crema'
  },

  // --- SECCIÓN 3: COLECCIÓN ESTAMPAS DEL PUEBLO ---
  {
    id: 'catedral',
    collection: 'estampas',
    name: 'CATEDRAL DE GRANADA',
    description:
      'La joya arquitectónica neoclásica de La Gran Sultana junto a la flor nacional Sacuanjoche y la cordillera volcánica.',
    detail: '100% Algodón peinado • Hecho en Nicaragua',
    price: 490,
    sizes: ['S', 'M', 'L', 'XL', 'Otra talla'],
    image: '/assets/products/catedral-photo.webp',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#361713',
    lightBg: '#eedbd5',
    colors: [
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/products/catedral-photo.webp' },
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
    image: '/assets/products/isletas-photo.webp',
    soldOut: true,
    soldOutLabel: 'AGOTADO TEMPORALMENTE',
    darkBg: '#0e282e',
    lightBg: '#d8eaec',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/isletas-photo.webp' }
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
    image: '/assets/products/leon-photo.webp',
    soldOut: false,
    darkBg: '#211828',
    lightBg: '#e8dfea',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/leon-photo.webp' },
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
    image: '/assets/products/gigantona-photo.webp',
    soldOut: false,
    darkBg: '#241416',
    lightBg: '#ecdfe0',
    colors: [
      { id: 'blanco', label: 'Blanco', bgClass: 'bg-white', price: 480, image: '/assets/products/gigantona-photo.webp' },
      { id: 'crema', label: 'Crema', bgClass: 'bg-[#e6e1d5]', price: 490, image: '/assets/catalog/gigantona-y-enano-cabezon/crema-1.webp' },
      { id: 'negro', label: 'Negro', bgClass: 'bg-[#111111]', price: 480, image: '/assets/catalog/gigantona-y-enano-cabezon/negro-1.webp' }
    ],
    defaultColor: 'blanco'
  },

  // --- SECCIÓN 4: TOTE BAGS ---
  {
    id: 'tote-bunuelos-bag',
    collection: 'totebags',
    name: 'TOTE BUÑUELOS',
    description:
      'Bolso utilitario en lona de algodón pesado con ilustración serigráfica de Buñuelos tradicionales. Espacioso y duradero.',
    detail: 'Lona 100% Algodón 12oz • Medidas 38x42 cm',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/tote-bunuelos.webp',
    soldOut: false,
    darkBg: '#20160d',
    lightBg: '#eee3d8',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/tote-bunuelos.webp' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-fauna-local',
    collection: 'totebags',
    name: 'TOTE FAUNA LOCAL',
    description:
      'Bolso de autor con aves autóctonas nicaragüenses. Costuras reforzadas para libros, compras o viajes.',
    detail: 'Lona 100% Algodón 12oz • Medidas 38x42 cm',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/tote-fauna.webp',
    soldOut: false,
    darkBg: '#12241e',
    lightBg: '#dbece5',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/tote-fauna.webp' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-nicaragua-bag',
    collection: 'totebags',
    name: 'TOTE NICARAGUA',
    description:
      'Estampa completa de identidad nacional sobre lienzo natural. Asas resistentes para llevar al hombro cómodamente.',
    detail: 'Lona 100% Algodón 12oz • Medidas 38x42 cm',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/tote-nicaragua.webp',
    soldOut: false,
    darkBg: '#122026',
    lightBg: '#dbe6ec',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/tote-nicaragua.webp' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-catedral-bag',
    collection: 'totebags',
    name: 'TOTE CATEDRAL DE GRANADA',
    description:
      'La silueta colonial de La Gran Sultana grabada con tintas ecológicas sobre lona cruda prémium.',
    detail: 'Lona 100% Algodón 12oz • Medidas 38x42 cm',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/catedral-photo.webp',
    soldOut: false,
    darkBg: '#2b1a17',
    lightBg: '#eededb',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/catedral-photo.webp' }
    ],
    defaultColor: 'crema'
  },
  {
    id: 'tote-sopa-bag',
    collection: 'totebags',
    name: 'TOTE SOPA DE QUESO',
    description:
      'El homenaje gráfico más sabroso de Cuaresma en un accesorio cotidiano de alta resistencia.',
    detail: 'Lona 100% Algodón 12oz • Medidas 38x42 cm',
    price: 430,
    sizes: ['Unitalla'],
    image: '/assets/products/sopa-photo.webp',
    soldOut: false,
    darkBg: '#29210c',
    lightBg: '#eee3c8',
    colors: [
      { id: 'crema', label: 'Lona Cruda', bgClass: 'bg-[#e6e1d5]', price: 430, image: '/assets/products/sopa-photo.webp' }
    ],
    defaultColor: 'crema'
  }
];

// Divisiones por colección para el layout vertical
const MITOS_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'mitos');
const RAICES_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'raices');
const SAZON_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'sazon');
const ESTAMPAS_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'estampas');
const TOTE_ITEMS = ALL_CATALOG_PRODUCTS.filter((p) => p.collection === 'totebags');

// ================= FAQ Y POLÍTICAS =================
const FAQS = [
  {
    q: '¿Cómo funcionan los envíos en Managua y Departamentos?',
    a: 'En Managua realizamos entregas mediante servicio motorizado express directamente a tu domicilio o lugar de trabajo. Para todos los departamentos de Nicaragua despachamos a través de CargoTrans con número de guía oficial para rastreo en tiempo real.'
  },
  {
    q: '¿Tienen punto de retiro físico (Pick Up)?',
    a: 'Sí, disponemos de punto de retiro gratuito previa confirmación de pedido por WhatsApp en El Cortijo de la Sierra km 13 Carretera a Masaya, Managua.'
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

// Variantes para animación del Slider
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

// ================= COMPONENTE DE PRODUCTO EDITORIAL PARA SECCIONES VERTICALES =================
function CollectionProductCard({
  product,
  currency,
  formatPrice,
  isInverted,
  onAddToCart,
  onOpenSizeGuide
}) {
  const [selectedColor, setSelectedColor] = useState(
    product.defaultColor || product.colors?.[0]?.id || 'blanco'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.includes('M') ? 'M' : product.sizes[0]
  );
  const [qty, setQty] = useState(1);

  const currentColorVariant = useMemo(() => {
    if (!product.colors || product.colors.length === 0) return null;
    return product.colors.find((c) => c.id === selectedColor) || product.colors[0];
  }, [product, selectedColor]);

  const currentPrice = currentColorVariant?.price || product.price;
  const currentImage = currentColorVariant?.image || product.image;

  const handleAdd = () => {
    if (product.soldOut) return;
    const colorLabel = currentColorVariant ? ` (${currentColorVariant.label})` : '';
    onAddToCart({
      id: `${product.id}-${currentColorVariant?.id || 'default'}`,
      name: `${product.name}${colorLabel}`,
      size: selectedSize,
      price: currentPrice,
      image: currentImage,
      qty: qty
    });
  };

  return (
    <div
      className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
        isInverted
          ? 'bg-white/70 border-[#081f1a]/15 hover:border-[#081f1a]/30'
          : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
      }`}
    >
      {/* Contenedor de Imagen con marco editorial sobrio y máscara suave */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/15 flex items-center justify-center p-3 sm:p-4">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            maskImage:
              'radial-gradient(ellipse 90% 88% at 50% 50%, black 65%, rgba(0,0,0,0.8) 82%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 88% at 50% 50%, black 65%, rgba(0,0,0,0.8) 82%, transparent 100%)'
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={`${product.name} ${currentColorVariant?.label || ''}`}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="w-full h-full object-contain object-center drop-shadow-xl select-none"
            />
          </AnimatePresence>
        </div>

        {product.soldOut && (
          <div className="absolute inset-0 bg-red-950/75 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="text-white font-extrabold text-[11px] sm:text-xs tracking-[0.25em] uppercase px-4 py-2 border border-white/30 rounded-md shadow-xl text-center">
              {product.soldOutLabel || 'AGOTADO TEMPORALMENTE'}
            </span>
          </div>
        )}
      </div>

      {/* Contenido y Lógica de Compra */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-lg sm:text-xl font-bold tracking-tight uppercase leading-tight ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              {product.name}
            </h3>
            <span
              className={`text-base sm:text-lg font-bold shrink-0 ${
                isInverted ? 'text-[#081f1a]' : 'text-[#e6e1d5]'
              }`}
            >
              {formatPrice(currentPrice)}
            </span>
          </div>
          <p className="text-xs opacity-75 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <span className="text-[10px] uppercase tracking-wider opacity-60 block">
            {product.detail}
          </span>
        </div>

        <div className="space-y-3.5 pt-2 border-t border-current/10">
          {/* Swatches de Color Reactivos (Cross-fade) */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider opacity-75 font-medium">
                Color ({currentColorVariant?.label || 'Blanco'}):
              </span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const active = selectedColor === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                      title={`${color.label} — ${formatPrice(color.price)}`}
                      aria-label={`${color.label} ${formatPrice(color.price)}`}
                      className={`w-9 h-9 min-w-[36px] min-h-[36px] rounded-full ${color.bgClass} border border-black/25 transition-transform cursor-pointer flex items-center justify-center shrink-0 ${
                        active
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
          {product.sizes && product.sizes.length > 1 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider opacity-75 font-medium">
                  Talla:
                </span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-[10px] underline opacity-60 hover:opacity-100 cursor-pointer"
                >
                  Medidas
                </button>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {product.sizes.map((sz) => {
                  const activeSz = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`${
                        sz === 'Unitalla' || sz === 'Otra talla'
                          ? 'px-3 h-8 sm:h-9'
                          : 'w-8 h-8 sm:w-9 sm:h-9 min-w-[34px]'
                      } rounded-full text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer shrink-0 ${
                        activeSz
                          ? isInverted
                            ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a] shadow-xs'
                            : 'bg-[#e6e1d5] text-[#081f1a] border-[#e6e1d5] shadow-xs'
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
          )}

          {/* Cantidad para Tote Bags */}
          {product.collection === 'totebags' && (
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] uppercase tracking-wider opacity-75 font-medium">
                Cantidad:
              </span>
              <div
                className={`flex items-center gap-2 border px-2.5 py-1 rounded-full ${
                  isInverted ? 'border-[#081f1a]/20' : 'border-[#e6e1d5]/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold w-5 text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Botón de Añadir a la Bolsa */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.soldOut}
            className={`w-full py-3.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md mt-2 ${
              product.soldOut
                ? 'bg-red-950/60 text-white/70 border border-red-500/30 cursor-not-allowed'
                : isInverted
                ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831] cursor-pointer hover:shadow-lg active:scale-[0.99]'
                : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white cursor-pointer hover:shadow-lg active:scale-[0.99]'
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
}

// ================= COMPONENTE PRINCIPAL =================
export default function App() {
  const [isInverted, setIsInverted] = useState(false);
  const [currency, setCurrency] = useState('NIO'); // 'NIO' | 'USD'

  // Slider de Mitos de la Noche (Hero)
  const [heroIndex, setHeroIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [heroSize, setHeroSize] = useState('M');
  const [heroColor, setHeroColor] = useState('negro');

  // Carrito lateral
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferencia bancaria');

  // Modales
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Producto activo del Hero
  const currentHeroProduct = MITOS_ITEMS[heroIndex] || MITOS_ITEMS[0];

  // Variante de color activa para el Hero
  const currentHeroColorVariant = useMemo(() => {
    if (!currentHeroProduct?.colors || currentHeroProduct.colors.length === 0) return null;
    return (
      currentHeroProduct.colors.find((c) => c.id === heroColor) ||
      currentHeroProduct.colors[0]
    );
  }, [currentHeroProduct, heroColor]);

  const currentHeroImage = currentHeroColorVariant?.image || currentHeroProduct?.image;
  const currentHeroPrice = currentHeroColorVariant?.price || currentHeroProduct?.price || 480;

  // Formato de precios dual
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

  // Sincronizar color y talla al cambiar de slide en Hero
  const syncHeroDefaults = useCallback((prod) => {
    if (!prod) return;
    const defCol = prod.defaultColor || prod.colors?.[0]?.id || 'blanco';
    setHeroColor(defCol);
    if (!prod.sizes.includes(heroSize)) {
      setHeroSize(prod.sizes[0]);
    }
  }, [heroSize]);

  // Manejador del Slider Hero
  const handleHeroSlide = useCallback(
    (dir) => {
      setDirection(dir);
      setHeroIndex((prev) => {
        const total = MITOS_ITEMS.length;
        const nextIdx = dir > 0 ? (prev + 1) % total : (prev - 1 + total) % total;
        syncHeroDefaults(MITOS_ITEMS[nextIdx]);
        return nextIdx;
      });
    },
    [syncHeroDefaults]
  );

  // Controles de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isCartOpen || isSizeGuideOpen) return;
      if (e.key === 'ArrowRight') handleHeroSlide(1);
      else if (e.key === 'ArrowLeft') handleHeroSlide(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleHeroSlide, isCartOpen, isSizeGuideOpen]);

  // Soporte táctil swipe para el Hero
  const touchStartX = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleHeroSlide(1);
    else if (diff < -40) handleHeroSlide(-1);
    touchStartX.current = null;
  }, [handleHeroSlide]);

  // Scroll suave hacia sección
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Carrito helpers
  const addItemToCart = (item) => {
    setCart((prev) => {
      const key = `${item.id}-${item.size}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + (item.qty || 1) } : i
        );
      }
      return [...prev, { ...item, key }];
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

  const handleRemoveFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);

  // Generador de enlace de WhatsApp
  const getCheckoutWhatsAppUrl = () => {
    let msg = `*NUEVO PEDIDO — MiPEUE OFICIAL*\n`;
    msg += `--------------------------------------\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}*\n`;
      msg += `   • Talla: ${item.size}\n`;
      msg += `   • Cantidad: ${item.qty}\n`;
      msg += `   • Subtotal: ${formatPrice(item.price * item.qty)}\n`;
    });
    msg += `--------------------------------------\n`;
    msg += `*TOTAL ESTIMADO:* ${formatPrice(cartTotal)}\n`;
    msg += `*MONEDA PREFERIDA:* ${currency === 'USD' ? 'Dólares (USD)' : 'Córdobas (C$)'}\n`;
    msg += `*MÉTODO DE PAGO:* ${paymentMethod}\n`;
    if (deliveryAddress.trim()) {
      msg += `*DIRECCIÓN DE ENTREGA:* ${deliveryAddress.trim()}\n`;
    }
    msg += `--------------------------------------\n`;
    msg += `Hola Meysi / Equipo MiPEUE, deseo confirmar este pedido y coordinar el envío.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 overflow-x-hidden selection:bg-[#081f1a] selection:text-[#e6e1d5] ${
        isInverted
          ? 'bg-[#e6e1d5] text-[#081f1a]'
          : 'bg-[#081f1a] text-[#e6e1d5]'
      }`}
    >
      {/* ================= HEADER PRINCIPAL FIJO ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-6 md:px-8 py-3 md:py-4 pointer-events-none w-full max-w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
          {/* Logo Oficial MiPEUE */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="pointer-events-auto flex items-center transition-transform hover:scale-105 group"
            aria-label="Ir al inicio"
          >
            <img
              src={isInverted ? '/assets/brand/mipeue-logo-negro.png' : '/assets/brand/mipeue-logo-crema.png'}
              alt="MiPEUE"
              className="h-8 md:h-9 w-auto object-contain transition-opacity group-hover:opacity-85"
            />
          </a>

          {/* Píldora de Navegación por Secciones [ MITOS DE LA NOCHE | RAÍCES | SAZÓN Y SON NICA | ESTAMPAS DEL PUEBLO | TOTE BAGS ] */}
          <nav
            className={`pointer-events-auto backdrop-blur-md rounded-full p-1 md:p-1.5 border flex items-center gap-1 order-3 w-full justify-start md:justify-center overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth md:order-none md:w-auto max-w-full transition-colors duration-300 ${
              isInverted
                ? 'bg-white/60 border-[#081f1a]/15'
                : 'bg-black/35 border-[#e6e1d5]/15'
            }`}
          >
            {NAV_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-2 md:px-3.5 md:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.11em] md:tracking-[0.13em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 min-h-[36px] flex items-center justify-center cursor-pointer ${
                  sec.id === 'hero'
                    ? isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5] shadow-xs'
                      : 'bg-[#e6e1d5] text-[#081f1a] shadow-xs'
                    : isInverted
                    ? 'text-[#081f1a]/75 hover:text-[#081f1a] hover:bg-[#081f1a]/5'
                    : 'text-[#e6e1d5]/75 hover:text-white hover:bg-white/5'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Selector de Moneda (C$ | USD) + Bolsa con contador */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {/* Switch de Moneda */}
            <div
              className={`backdrop-blur-md rounded-full px-2.5 py-1.5 border flex items-center gap-1 text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                isInverted
                  ? 'bg-white/60 border-[#081f1a]/15 text-[#081f1a]'
                  : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5]'
              }`}
            >
              <button
                type="button"
                onClick={() => setCurrency('NIO')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'NIO'
                    ? isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5]'
                      : 'bg-[#e6e1d5] text-[#081f1a]'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                C$
              </button>
              <span className="opacity-30">|</span>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currency === 'USD'
                    ? isInverted
                      ? 'bg-[#081f1a] text-[#e6e1d5]'
                      : 'bg-[#e6e1d5] text-[#081f1a]'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                USD
              </button>
            </div>

            {/* Botón de Bolsa */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className={`backdrop-blur-md rounded-full px-3.5 sm:px-4 py-2 border flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                isInverted
                  ? 'bg-white/60 border-[#081f1a]/15 text-[#081f1a] hover:bg-white'
                  : 'bg-black/35 border-[#e6e1d5]/15 text-[#e6e1d5] hover:bg-black/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wider">
                BOLSA ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SHOWCASE: MITOS DE LA NOCHE (DROP OCTUBRE) ================= */}
      <section
        id="hero"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 pt-28 pb-12 w-full max-w-full overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-1">
          {/* Columna Izquierda: Información de la prenda destacada */}
          <div className="md:col-span-3 flex flex-col justify-center space-y-4 order-2 md:order-1 z-10">
            {/* Controles de Navegación del Slider < > y Contador */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleHeroSlide(-1)}
                aria-label="Prenda anterior"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/60 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/30 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleHeroSlide(1)}
                aria-label="Siguiente prenda"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isInverted
                    ? 'bg-white/60 border-[#081f1a]/20 text-[#081f1a] hover:bg-[#081f1a] hover:text-[#e6e1d5]'
                    : 'bg-black/30 border-[#e6e1d5]/20 text-[#e6e1d5] hover:bg-[#e6e1d5] hover:text-[#081f1a]'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] tracking-widest uppercase opacity-60 ml-1">
                {heroIndex + 1} / {MITOS_ITEMS.length}
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/10 border border-white/10">
                  <Sparkles className="w-3 h-3" />
                  <span>Drop Octubre • Mitos de la Noche</span>
                </div>

                <h1
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.06] ${
                    isInverted ? 'text-[#081f1a]' : 'text-white'
                  }`}
                >
                  {currentHeroProduct.name}
                </h1>

                <p className="text-xs sm:text-sm opacity-85 leading-relaxed line-clamp-3">
                  {currentHeroProduct.description}
                </p>

                <p className="text-[11px] uppercase tracking-wider opacity-65 font-medium">
                  {currentHeroProduct.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Botón "+ Añadir a la bolsa" en desktop */}
            <button
              type="button"
              onClick={handleAddHeroToCart}
              disabled={currentHeroProduct.soldOut}
              className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-300 shadow-xl cursor-pointer ${
                currentHeroProduct.soldOut
                  ? 'bg-red-950/60 text-white/70 border border-red-500/30 cursor-not-allowed'
                  : isInverted
                  ? 'bg-[#081f1a] text-[#e6e1d5] hover:bg-[#0e3831]'
                  : 'bg-[#e6e1d5] text-[#081f1a] hover:bg-white'
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

          {/* Centro: Imagen del producto con cross-fade real de 280ms */}
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

          {/* Columna Derecha: Precio reactivo + Swatches de color + Tallas */}
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

            {/* Swatches de Color Reactivos con Cross-fade */}
            {currentHeroProduct.colors && currentHeroProduct.colors.length > 1 && (
              <div className="flex flex-col items-start md:items-end space-y-2.5">
                <span className="text-xs opacity-80 tracking-wide font-medium">
                  Color ({currentHeroColorVariant?.label || 'Negro'} — {formatPrice(currentHeroPrice)}):
                </span>
                <div className="flex items-center gap-3">
                  {currentHeroProduct.colors.map((color) => {
                    const activeSwatch = (currentHeroColorVariant?.id || 'negro') === color.id;
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
                <span className="text-xs opacity-80 tracking-wide font-medium">
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
        <div className="flex items-center justify-center pt-2 z-10">
          <p className="text-xs sm:text-sm opacity-70 font-medium leading-snug text-center">
            Tradición y arte popular nicaragüense,{' '}
            <span className="font-bold underline underline-offset-4 opacity-100">
              llevado a la moda urbana
            </span>
          </p>
        </div>
      </section>

      {/* ================= SECCIÓN 1: COLECCIÓN RAÍCES ================= */}
      <section
        id="raices"
        className={`py-20 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado Editorial */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/10 border border-white/10">
              <span>Colección 01</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              Colección Raíces
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl leading-relaxed">
              Herencia botánica, aves insignes y las primeras letras teatrales de América. Grabados de alta definición sobre algodón peinado nicaragüense.
            </p>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {RAICES_ITEMS.map((product) => (
              <CollectionProductCard
                key={product.id}
                product={product}
                currency={currency}
                formatPrice={formatPrice}
                isInverted={isInverted}
                onAddToCart={addItemToCart}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 2: COLECCIÓN SAZÓN Y SON NICA ================= */}
      <section
        id="sazon"
        className={`py-20 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado Editorial */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/10 border border-white/10">
              <span>Colección 02</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              Sazón y Son Nica
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl leading-relaxed">
              La memoria gastronómica de los domingos pinoleros: el caldero de miel, la masa criolla de maíz en hoja de plátano y el caldo dorado de queso.
            </p>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SAZON_ITEMS.map((product) => (
              <CollectionProductCard
                key={product.id}
                product={product}
                currency={currency}
                formatPrice={formatPrice}
                isInverted={isInverted}
                onAddToCart={addItemToCart}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: COLECCIÓN ESTAMPAS DEL PUEBLO ================= */}
      <section
        id="estampas"
        className={`py-20 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado Editorial */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/10 border border-white/10">
              <span>Colección 03</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              Estampas del Pueblo
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl leading-relaxed">
              El neoclasicismo granadino, las aguas del Cocibolca, el Sol de Sutiaba y la alegría picaresca de las fiestas patronales de León.
            </p>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ESTAMPAS_ITEMS.map((product) => (
              <CollectionProductCard
                key={product.id}
                product={product}
                currency={currency}
                formatPrice={formatPrice}
                isInverted={isInverted}
                onAddToCart={addItemToCart}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 4: TOTE BAGS ================= */}
      <section
        id="totebags"
        className={`py-20 px-4 sm:px-6 md:px-10 border-t transition-colors duration-500 ${
          isInverted ? 'border-[#081f1a]/12' : 'border-[#e6e1d5]/12'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado Editorial */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/10 border border-white/10">
              <span>Accesorios Utilitarios</span>
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase ${
                isInverted ? 'text-[#081f1a]' : 'text-white'
              }`}
            >
              Bolsos Tote Bags
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-2xl leading-relaxed">
              Confeccionados en lona 100% algodón crudo de 12oz de alto gramaje. Ilustración serigráfica resistente, amplitud interior y asas reforzadas.
            </p>
          </div>

          {/* Grid de Bolsos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TOTE_ITEMS.map((product) => (
              <CollectionProductCard
                key={product.id}
                product={product}
                currency={currency}
                formatPrice={formatPrice}
                isInverted={isInverted}
                onAddToCart={addItemToCart}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 5: NUESTRA HISTORIA / MANIFIESTO (#historia) ================= */}
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

      {/* ================= SECCIÓN 6: POLÍTICAS & FAQ (#politicas) ================= */}
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
            {/* Logo Oficial MiPEUE en el Footer */}
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

          <div className="flex flex-col items-center md:items-end space-y-1 text-center md:text-right">
            <span className="opacity-60 text-[11px]">
              © {new Date().getFullYear()} MiPEUE. Todos los derechos reservados.
            </span>
            <span className="opacity-40 text-[10px]">
              Desarrollado por Cristian Wildcane
            </span>
          </div>
        </div>
      </footer>

      {/* ================= MODAL GUÍA DE MEDIDAS ================= */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border ${
                isInverted
                  ? 'bg-[#e6e1d5] text-[#081f1a] border-[#081f1a]/20'
                  : 'bg-[#0b241f] text-[#e6e1d5] border-[#e6e1d5]/20'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-current/15">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider">
                    Guía de Medidas Oficial (cm)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-1 rounded-full opacity-60 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-4">
                <p className="text-xs opacity-75">
                  Nuestras camisetas son de corte unisex estándar regular con un ligero toque holgado contemporáneo:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-current/20 opacity-70">
                        <th className="py-2 px-3">Talla</th>
                        <th className="py-2 px-3">Ancho (pecho)</th>
                        <th className="py-2 px-3">Largo total</th>
                        <th className="py-2 px-3">Manga</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-current/10">
                      <tr>
                        <td className="py-2.5 px-3 font-bold">S</td>
                        <td className="py-2.5 px-3">48 cm</td>
                        <td className="py-2.5 px-3">69 cm</td>
                        <td className="py-2.5 px-3">20 cm</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">M</td>
                        <td className="py-2.5 px-3">51 cm</td>
                        <td className="py-2.5 px-3">71 cm</td>
                        <td className="py-2.5 px-3">21 cm</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">L</td>
                        <td className="py-2.5 px-3">54 cm</td>
                        <td className="py-2.5 px-3">74 cm</td>
                        <td className="py-2.5 px-3">22 cm</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold">XL</td>
                        <td className="py-2.5 px-3">57 cm</td>
                        <td className="py-2.5 px-3">76 cm</td>
                        <td className="py-2.5 px-3">23 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] opacity-65 leading-relaxed pt-2 border-t border-current/10">
                  * Medidas tomadas sobre prenda plana en centímetros. Si requieres confección en otra talla específica (XXL o XS), consúltanos al confirmar tu pedido por WhatsApp.
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
                          className="w-12 h-12 object-contain rounded-lg shrink-0 border border-[#081f1a]/10 bg-black/5"
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
                {/* Formulario de Checkout */}
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
                                  ? 'bg-[#081f1a] text-[#e6e1d5] border-[#081f1a] shadow-xs'
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
                    <span className="shrink-0 font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                    <span>Total</span>
                    <span className="shrink-0 font-bold">{formatPrice(cartTotal)}</span>
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
