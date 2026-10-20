import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Sparkles,
  Play,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Compass,
  MapPin,
  Phone,
  ShieldCheck,
  Eye,
  X,
  Sun,
  Moon,
  Layers,
  Shirt,
  Info,
  MessageCircle,
  SlidersHorizontal
} from 'lucide-react';

const WHATSAPP_NUMBER = '50583332316';

const COLLECTIONS = [
  {
    id: 'octubre',
    label: 'DROP OCTUBRE',
    subtitle: 'Mitos, Leyendas & Raglán',
    watermark: 'LEYENDAS',
    stripWatermark: 'MITOLOGÍA',
    badge: 'EDICIÓN ESPECIAL • MITOS DE NICARAGUA'
  },
  {
    id: 'cultural',
    label: 'COLECCIÓN CULTURAL',
    subtitle: 'Tradición & Orgullo Pinolero',
    watermark: 'TRADICIÓN',
    stripWatermark: 'CULTURA',
    badge: 'COLECCIÓN PERMANENTE • ARTE POPULAR'
  },
  {
    id: 'totebags',
    label: 'TOTE BAGS',
    subtitle: 'Lona Artesanal 32×35 cm',
    watermark: 'ARTESANÍA',
    stripWatermark: 'FOLCLOR',
    badge: 'ACCESORIOS • LONA RESISTENTE 32×35 CM'
  }
];

const PRODUCTS = [
  // ================= DROP OCTUBRE =================
  {
    id: 'cadejo',
    collection: 'octubre',
    code: 'MP-OCT-01',
    name: 'EL CADEJO',
    subtitle: 'Mito Nocturno de Nicaragua',
    category: 'Camiseta 100% Algodón',
    basePrice: 490,
    available: false,
    statusText: 'AGOTADO TEMPORALMENTE',
    watermarkWord: 'CADEJO',
    customizablePrintSide: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Inspirada en el guardián y espectro de los caminos nocturnos de Nicaragua. Ilustración original de MIPEUE que rescata la dualidad entre el Cadejo Blanco y el Cadejo Negro en trazos de grabado folclórico.',
    colors: [
      {
        name: 'Azul Marino',
        hex: '#28334A',
        price: 490,
        cutout: '/assets/products/cadejo-cutout-1.png',
        isCutout: true
      },
      {
        name: 'Crema Natural',
        hex: '#D8C8B8',
        price: 490,
        cutout: '/assets/products/cadejo-cutout-2.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Vista Estudio I',
        src: '/assets/products/cadejo-cutout-1.png',
        type: 'cutout'
      },
      {
        label: 'Vista Estudio II',
        src: '/assets/products/cadejo-cutout-2.png',
        type: 'cutout'
      },
      {
        label: 'Editorial Azul & Crema',
        src: '/assets/products/cadejo-photo-1.jpg',
        type: 'photo'
      },
      {
        label: 'Detalle Espalda',
        src: '/assets/products/cadejo-photo-2.png',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'MITO & SIMBOLISMO',
        content:
          'El Cadejo acompaña o asusta a los caminantes que transitan de noche. Nuestro arte honra la tradición oral nicaragüense con tipografía gótica vernacular y composición de xilograbado.'
      },
      {
        num: '02',
        title: 'TEJIDO & CONFECCIÓN',
        content:
          '100% algodón peinado de tacto suave y cuello acanalado reforzado. Serigrafía artesanal de alta densidad pensada para resistir el clima tropical.'
      },
      {
        num: '03',
        title: 'FRENTE O ESPALDA A ELECCIÓN',
        content:
          'Las camisetas pueden llevar el diseño principal al frente o atrás; tú eliges cómo prefieres usarla al realizar tu pedido.'
      }
    ]
  },
  {
    id: 'cegua',
    collection: 'octubre',
    code: 'MP-OCT-02',
    name: 'LA CEGUA',
    subtitle: 'Leyenda de los Caminos Coloniales',
    category: 'Camiseta 100% Algodón',
    basePrice: 490,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'LA CEGUA',
    customizablePrintSide: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'reinterpretación gráfica del espectro colonial que castiga a los trasnochadores. Estampado crema de alto contraste sobre algodón negro profundo con estética de cartel místico.',
    colors: [
      {
        name: 'Negro Carbón',
        hex: '#1C1C1C',
        price: 490,
        cutout: '/assets/products/cegua-cutout-1.png',
        isCutout: true
      },
      {
        name: 'Edición Dúo',
        hex: '#2E2E2E',
        price: 490,
        cutout: '/assets/products/cegua-cutout-2.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Dúo Estudio',
        src: '/assets/products/cegua-cutout-1.png',
        type: 'cutout'
      },
      {
        label: 'Silueta Individual',
        src: '/assets/products/cegua-cutout-2.png',
        type: 'cutout'
      },
      {
        label: 'Editorial pareado',
        src: '/assets/products/cegua-photo-1.jpg',
        type: 'photo'
      },
      {
        label: 'Detalle Grabado',
        src: '/assets/products/cegua-photo-2.png',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'LEYENDA POPULAR',
        content:
          'Figura icónica del imaginario centroamericano y nicaragüense. El diseño captura la metamorfosis mística en una composición editorial contemporánea.'
      },
      {
        num: '02',
        title: 'TEJIDO & CONFECCIÓN',
        content:
          '100% algodón premium en tono negro profundo con tinta serigráfica color hueso envejecido que no se cuartea.'
      },
      {
        num: '03',
        title: 'PERSONALIZACIÓN DE ESTAMPADO',
        content:
          'Disponible con el arte principal en el pecho o en la espalda según tu preferencia personal.'
      }
    ]
  },
  {
    id: 'deacachimba',
    collection: 'octubre',
    code: 'MP-OCT-03',
    name: 'MUY DEACACHIMBA',
    subtitle: 'Baby Tee Raglán • Jerga Pinolera',
    category: 'Top Raglán Unitalla',
    basePrice: 550,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'PINOLERO',
    customizablePrintSide: false,
    sizes: ['Unitalla'],
    description:
      'Un homenaje directo al habla popular nicaragüense. Corte raglán clásico en crema y verde bosque con ilustración central del Guardabarranco y tipografía curva retro.',
    colors: [
      {
        name: 'Blanco & Verde Bosque',
        hex: '#124038',
        price: 550,
        cutout: '/assets/products/deacachimba-cutout.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Estudio',
        src: '/assets/products/deacachimba-cutout.png',
        type: 'cutout'
      },
      {
        label: 'Lookbook Editorial',
        src: '/assets/products/deacachimba-photo.png',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'EXPRESIÓN NICARAGÜENSE',
        content:
          '“Deacachimba” celebra lo extraordinario y auténtico de nuestra tierra, coronado por el Guardabarranco en vuelo.'
      },
      {
        num: '02',
        title: 'CORTE RAGLÁN UNITALLA',
        content:
          'Tejido elástico de algodón suave que se adapta cómodamente a distintas siluetas con mangas en contraste verde bosque (#124038).'
      },
      {
        num: '03',
        title: 'EDICIÓN LIMITADA',
        content:
          'Pieza estrella del Drop de Octubre. Envíos a toda Nicaragua mediante pedido directo en WhatsApp.'
      }
    ]
  },
  {
    id: 'top-nicaragua',
    collection: 'octubre',
    code: 'MP-OCT-04',
    name: 'TOP NICARAGUA',
    subtitle: 'Tierra de Lagos y Volcanes',
    category: 'Top Raglán Unitalla',
    basePrice: 550,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'VOLCANES',
    customizablePrintSide: false,
    sizes: ['Unitalla'],
    description:
      '“Tierra de lagos y volcanes” plasmado en una silueta raglán bicolor con arquitectura colonial, palmeras y el paisaje volcánico que define nuestra identidad.',
    colors: [
      {
        name: 'Crema & Verde Bosque',
        hex: '#124038',
        price: 550,
        cutout: '/assets/products/nicaragua-cutout.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Estudio',
        src: '/assets/products/nicaragua-cutout.png',
        type: 'cutout'
      },
      {
        label: 'Lookbook Editorial',
        src: '/assets/products/nicaragua-photo.png',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'PAISAJE & ORGULLO',
        content:
          'Integra los símbolos de la geografía pinolera: volcanes humeantes, sacuanjoche y trazos coloniales.'
      },
      {
        num: '02',
        title: 'FIT RAGLÁN BIMATERIAL',
        content:
          'Unitalla de calce favorecedor con cuello redondo y costuras raglán reforzadas en verde profundo.'
      },
      {
        num: '03',
        title: 'HECHO EN NICARAGUA',
        content:
          'Producido localmente por manos jóvenes que rescatan el arte popular a través de la moda.'
      }
    ]
  },

  // ================= COLECCIÓN CULTURAL =================
  {
    id: 'isletas-granada',
    collection: 'cultural',
    code: 'MP-CUL-01',
    name: 'ISLETAS DE GRANADA',
    subtitle: 'Paraíso Natural • Gran Lago Cocibolca',
    category: 'Camiseta 100% Algodón',
    basePrice: 480,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'COCIBOLCA',
    customizablePrintSide: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Homenaje al archipiélago volcánico de 365 isletas en el Gran Lago de Nicaragua. Ilustración serigráfica en verde bosque con lanchas tradicionales, palmeras y el imponente volcán Mombacho.',
    colors: [
      {
        name: 'Blanco Clásico',
        hex: '#F6F5F2',
        price: 480,
        cutout: '/assets/products/cultural-cutout-1.png',
        isCutout: true
      },
      {
        name: 'Crema Artesanal',
        hex: '#EFE8DE',
        price: 490,
        cutout: '/assets/products/cultural-cutout-1.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Estudio',
        src: '/assets/products/cultural-cutout-1.png',
        type: 'cutout'
      },
      {
        label: 'Lookbook Isletas',
        src: '/assets/products/isletas-photo.png',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'PATRIMONIO NATURAL',
        content:
          'Captura la serenidad de las Isletas de Granada formadas por una antigua erupción del volcán Mombacho.'
      },
      {
        num: '02',
        title: 'OPCIONES DE COLOR & CORTE',
        content:
          '100% Algodón en Blanco (C$ 480) o Crema (C$ 490). También disponible bajo pedido en corte Oversized (C$ 590).'
      },
      {
        num: '03',
        title: 'DISEÑO FRENTE O ATRÁS',
        content:
          'Elige si prefieres lucir la postal de las Isletas en el pecho o en la espalda completa.'
      }
    ]
  },
  {
    id: 'catedral-granada',
    collection: 'cultural',
    code: 'MP-CUL-02',
    name: 'CATEDRAL DE GRANADA',
    subtitle: 'Joya Neoclásica • La Gran Sultana',
    category: 'Camiseta 100% Algodón',
    basePrice: 480,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'GRANADA',
    customizablePrintSide: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'La silueta inconfundible de la Catedral de Granada junto a la flor nacional Sacuanjoche y la cordillera volcánica. Un clásico atemporal de la Colección Cultural MIPEUE.',
    colors: [
      {
        name: 'Blanco Clásico',
        hex: '#F6F5F2',
        price: 480,
        cutout: '/assets/products/cultural-cutout-2.png',
        isCutout: true
      },
      {
        name: 'Crema Artesanal',
        hex: '#EFE8DE',
        price: 490,
        cutout: '/assets/products/cultural-cutout-2.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Estudio',
        src: '/assets/products/cultural-cutout-2.png',
        type: 'cutout'
      },
      {
        label: 'Editorial Espalda',
        src: '/assets/products/catedral-photo.png',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'ARQUITECTURA HISTÓRICA',
        content:
          'Celebra la riqueza arquitectónica de Granada fundada en 1524 y los símbolos patrios de nuestra tierra.'
      },
      {
        num: '02',
        title: 'CALIDAD 100% ALGODÓN',
        content:
          'Tejido fresco y transpirable. Disponible en Blanco (C$ 480), Crema (C$ 490) y versión Oversized (C$ 590).'
      },
      {
        num: '03',
        title: 'FRENTE O ATRÁS',
        content:
          'Personaliza la ubicación del grabado (Frente o Atrás) sin costo adicional.'
      }
    ]
  },
  {
    id: 'sopa-de-queso',
    collection: 'cultural',
    code: 'MP-CUL-03',
    name: 'SOPA DE QUESO',
    subtitle: 'Hecha Como Manda la Abuela • Cuaresma',
    category: 'Camiseta 100% Algodón',
    basePrice: 480,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'TRADICIÓN',
    customizablePrintSide: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      '“Hecha como manda la abuela — Desde la época colonial”. Una pieza gráfica que celebra la gastronomía tradicional nicaragüense con ilustración de rosquillas doradas, hierbabuena y cuchara de palo.',
    colors: [
      {
        name: 'Blanco Clásico',
        hex: '#F6F5F2',
        price: 480,
        cutout: '/assets/products/sopa-photo.png',
        isCutout: false
      },
      {
        name: 'Crema Artesanal',
        hex: '#EFE8DE',
        price: 490,
        cutout: '/assets/products/sopa-photo.png',
        isCutout: false
      }
    ],
    gallery: [
      {
        label: 'Editorial Estudio',
        src: '/assets/products/sopa-photo.png',
        type: 'photo'
      },
      {
        label: 'Detalle Gastronomía',
        src: '/assets/products/page2-cutout-2.png',
        type: 'cutout'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'SABOR & MEMORIA',
        content:
          'Rescata el orgullo por nuestras recetas de herencia familiar con una estética de empaque retro centroamericano.'
      },
      {
        num: '02',
        title: '100% ALGODÓN PEINADO',
        content:
          'Serigrafía multicolor de tacto suave. Disponible en Blanco (C$ 480) y Crema (C$ 490).'
      },
      {
        num: '03',
        title: 'PERSONALIZACIÓN',
        content:
          'Elige llevar el arte al frente o en la espalda al confirmar tu orden.'
      }
    ]
  },
  {
    id: 'guardabarranco-shirt',
    collection: 'cultural',
    code: 'MP-CUL-04',
    name: 'GUARDABARRANCO',
    subtitle: 'Ave Nacional de Nicaragua • Momotus',
    category: 'Camiseta Regular / Oversized',
    basePrice: 480,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'AVE NACIONAL',
    customizablePrintSide: true,
    sizes: ['S', 'M', 'L', 'XL', 'Oversized (+C$110)'],
    description:
      'El Guardabarranco posado con su inconfundible cola en raqueta y plumaje turquesa. Disponible tanto en corte clásico como en nuestra silueta Oversized de caída estructurada.',
    colors: [
      {
        name: 'Blanco Clásico',
        hex: '#F6F5F2',
        price: 480,
        cutout: '/assets/products/page2-cutout-1.png',
        isCutout: true
      },
      {
        name: 'Crema Artesanal',
        hex: '#EFE8DE',
        price: 490,
        cutout: '/assets/products/page2-cutout-1.png',
        isCutout: true
      },
      {
        name: 'Oversized Especial',
        hex: '#124038',
        price: 590,
        cutout: '/assets/products/page2-cutout-1.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Dúo Cultural',
        src: '/assets/products/page2-cutout-1.png',
        type: 'cutout'
      },
      {
        label: 'Arte Guardabarranco',
        src: '/assets/products/tote-guardabarranco.jpg',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'SÍMBOLO DE LIBERTAD',
        content:
          'Declarado Ave Nacional en 1971, el Guardabarranco representa la riqueza natural de los bosques secos del Pacífico.'
      },
      {
        num: '02',
        title: 'REGULAR U OVERSIZED',
        content:
          'Elige entre camiseta clásica (C$ 480 / Crema C$ 490) o corte Oversized de alto gramaje (C$ 590).'
      },
      {
        num: '03',
        title: 'UBICACIÓN DEL DISEÑO',
        content:
          'Personalizable con el diseño al frente o atrás a gusto del cliente.'
      }
    ]
  },

  // ================= TOTE BAGS =================
  {
    id: 'tote-bunuelos',
    collection: 'totebags',
    code: 'MP-TOT-01',
    name: 'TOTE BUÑUELOS',
    subtitle: 'Dulce Tradición • Lona 32×35 cm',
    category: 'Tote Bag de Lona',
    basePrice: 430,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'BUÑUELOS',
    customizablePrintSide: false,
    sizes: ['32 × 35 cm'],
    description:
      'Bolso de lona cruda de alta resistencia dedicado al postre más querido de nuestras fiestas patronales y tardes pinoleras: buñuelos de yuca y queso bañados en miel.',
    colors: [
      {
        name: 'Lona Natural',
        hex: '#E6DEC8',
        price: 430,
        cutout: '/assets/products/page2-cutout-2.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Modelo',
        src: '/assets/products/page2-cutout-2.png',
        type: 'cutout'
      },
      {
        label: 'Detalle Lona',
        src: '/assets/products/tote-bunuelos.jpg',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'GASTRONOMÍA EN LONA',
        content:
          'Ilustración original de MIPEUE que celebra los sabores de las ferias y esquinas tradicionales de Nicaragua.'
      },
      {
        num: '02',
        title: 'MEDIDAS & RESISTENCIA',
        content:
          'Confeccionada en lona gruesa de 32 × 35 cm con costuras internas reforzadas para uso diario, universidad o mercado.'
      },
      {
        num: '03',
        title: 'SOSTENIBLE & LAVABLE',
        content:
          'Reutilizable, ecológica y estampada con tintas duraderas.'
      }
    ]
  },
  {
    id: 'tote-fauna',
    collection: 'totebags',
    code: 'MP-TOT-02',
    name: 'TOTE FAUNA LOCAL',
    subtitle: 'Guardabarranco & Zanate • Lona 32×35 cm',
    category: 'Tote Bag de Lona',
    basePrice: 430,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'FAUNA',
    customizablePrintSide: false,
    sizes: ['32 × 35 cm'],
    description:
      'Ilustración botánica y ornitológica que reúne al Guardabarranco y al Zanate nicaragüense en una composición equilibrada sobre lona cruda.',
    colors: [
      {
        name: 'Lona Natural',
        hex: '#E6DEC8',
        price: 430,
        cutout: '/assets/products/page2-cutout-1.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout Estudio',
        src: '/assets/products/page2-cutout-1.png',
        type: 'cutout'
      },
      {
        label: 'Fotografía Tote Fauna',
        src: '/assets/products/tote-fauna.jpg',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'BIODIVERSIDAD PINOLERA',
        content:
          'Un tributo a las aves que acompañan los patios, parques y senderos de toda Nicaragua.'
      },
      {
        num: '02',
        title: 'LONA 32 × 35 CM',
        content:
          'Capacidad ideal para libros, laptop de 14” y esenciales cotidianos con asas cómodas al hombro.'
      },
      {
        num: '03',
        title: 'PRECIO ACCESIBLE',
        content:
          'C$ 430 por unidad. Disponible para entrega inmediata.'
      }
    ]
  },
  {
    id: 'tote-nicaragua',
    collection: 'totebags',
    code: 'MP-TOT-03',
    name: 'TOTE NICARAGUA',
    subtitle: 'Catedral, Volcán & Sacuanjoche',
    category: 'Tote Bag de Lona',
    basePrice: 430,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'NICARAGUA',
    customizablePrintSide: false,
    sizes: ['32 × 35 cm'],
    description:
      'Lleva contigo el emblema de la tierra de lagos y volcanes. Estampado monocromático en verde bosque profundo sobre lona natural de 32 × 35 cm.',
    colors: [
      {
        name: 'Lona Natural',
        hex: '#E6DEC8',
        price: 430,
        cutout: '/assets/products/cultural-cutout-2.png',
        isCutout: true
      }
    ],
    gallery: [
      {
        label: 'Cutout con Modelo',
        src: '/assets/products/cultural-cutout-2.png',
        type: 'cutout'
      },
      {
        label: 'Fotografía de Estudio',
        src: '/assets/products/tote-nicaragua.jpg',
        type: 'photo'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'POSTAL CULTURAL',
        content:
          'Diseño insignia de MIPEUE ideal como regalo cultural o recuerdo auténtico de Nicaragua.'
      },
      {
        num: '02',
        title: 'ESPECIFICACIONES',
        content:
          'Dimensiones de 32 × 35 cm en lona de alta densidad.'
      },
      {
        num: '03',
        title: 'ENVÍOS NACIONALES',
        content:
          'Pedidos directos vía WhatsApp al +505 8333-2316.'
      }
    ]
  },
  {
    id: 'tote-guardabarranco',
    collection: 'totebags',
    code: 'MP-TOT-04',
    name: 'TOTE GUARDABARRANCO',
    subtitle: 'Edición Ave Nacional • Lona 32×35 cm',
    category: 'Tote Bag de Lona',
    basePrice: 430,
    available: true,
    statusText: 'DISPONIBLE AHORA',
    watermarkWord: 'MOMOTUS',
    customizablePrintSide: false,
    sizes: ['32 × 35 cm'],
    description:
      'El Guardabarranco a todo color sobre lona natural artesanal. Una pieza vibrante que resalta los tonos turquesa y terracota del ave nacional.',
    colors: [
      {
        name: 'Lona Natural',
        hex: '#E6DEC8',
        price: 430,
        cutout: '/assets/products/tote-guardabarranco.jpg',
        isCutout: false
      }
    ],
    gallery: [
      {
        label: 'Vista Frontal Lona',
        src: '/assets/products/tote-guardabarranco.jpg',
        type: 'photo'
      },
      {
        label: 'Cutout Colección',
        src: '/assets/products/page2-cutout-1.png',
        type: 'cutout'
      }
    ],
    specs: [
      {
        num: '01',
        title: 'ARTE A TODO COLOR',
        content:
          'Impresión detallada que conserva la riqueza cromática del plumaje del Guardabarranco.'
      },
      {
        num: '02',
        title: 'DIMENSIONES',
        content:
          'Formato versátil de 32 × 35 cm en lona resistente.'
      },
      {
        num: '03',
        title: 'DISPONIBILIDAD',
        content:
          'En stock por C$ 430.'
      }
    ]
  }
];

// Decorative Nicaraguan Folkloric SVG Divider
function ArtisanalDivider({ dark = false }) {
  return (
    <div className="w-full overflow-hidden py-3 select-none pointer-events-none opacity-25">
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-4"
        preserveAspectRatio="none"
      >
        <path
          d="M0 12H1200"
          stroke={dark ? '#EFE8DE' : '#124038'}
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 52 + 12}, 4)`}>
            <polygon
              points="8,0 16,8 8,16 0,8"
              fill={dark ? '#EFE8DE' : '#124038'}
            />
            <circle
              cx="8"
              cy="8"
              r="2"
              fill={dark ? '#124038' : '#EFE8DE'}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function App() {
  // Theme state: false = Modo Artesanal (Warm Parchment #EFE8DE default), true = Modo Místico (Deep Forest #124038)
  const [darkMode, setDarkMode] = useState(false);

  // Active Hero Product & Configuration
  const [activeProductId, setActiveProductId] = useState('cegua');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedPrintSide, setSelectedPrintSide] = useState('Espalda');
  const [openAccordion, setOpenAccordion] = useState('01');

  // Catalog filter state
  const [catalogFilter, setCatalogFilter] = useState('todos');

  // Shopping Bag (Cart) & Video Modal
  const [bag, setBag] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [justAddedToast, setJustAddedToast] = useState(null);

  const activeProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === activeProductId) || PRODUCTS[0],
    [activeProductId]
  );

  const activeCollection = useMemo(
    () =>
      COLLECTIONS.find((c) => c.id === activeProduct.collection) ||
      COLLECTIONS[0],
    [activeProduct]
  );

  const relatedProducts = useMemo(
    () => PRODUCTS.filter((p) => p.collection === activeProduct.collection),
    [activeProduct]
  );

  const currentColor =
    activeProduct.colors[selectedColorIdx] || activeProduct.colors[0];

  const currentPrice = useMemo(() => {
    if (selectedSize.includes('+C$110')) return 590;
    return currentColor?.price || activeProduct.basePrice;
  }, [currentColor, activeProduct, selectedSize]);

  const currentMedia =
    activeProduct.gallery[selectedGalleryIdx] || activeProduct.gallery[0];

  // Select a product into the interactive Hero Stage
  const handleSelectProduct = (product, scrollToHero = false) => {
    setActiveProductId(product.id);
    setSelectedColorIdx(0);
    setSelectedGalleryIdx(0);
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setSelectedPrintSide('Espalda');
    setOpenAccordion('01');
    if (scrollToHero) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Switch collection from top navbar
  const handleSelectCollection = (collectionId) => {
    const firstInCol = PRODUCTS.find((p) => p.collection === collectionId);
    if (firstInCol) {
      handleSelectProduct(firstInCol, false);
    }
  };

  // Cycle next/prev product in Hero
  const handleCycleProduct = (direction) => {
    const idx = PRODUCTS.findIndex((p) => p.id === activeProduct.id);
    const nextIdx = (idx + direction + PRODUCTS.length) % PRODUCTS.length;
    handleSelectProduct(PRODUCTS[nextIdx], false);
  };

  // Add item to Shopping Bag
  const handleAddToBag = (product = activeProduct, customConfig = null) => {
    const colorName =
      customConfig?.color ||
      (product.id === activeProduct.id
        ? currentColor.name
        : product.colors[0].name);
    const sizeName =
      customConfig?.size ||
      (product.id === activeProduct.id ? selectedSize : product.sizes[0]);
    const printSide = product.customizablePrintSide
      ? customConfig?.printSide ||
        (product.id === activeProduct.id ? selectedPrintSide : 'Espalda')
      : 'Estándar';
    const unitPrice =
      product.id === activeProduct.id ? currentPrice : product.basePrice;

    const itemKey = `${product.id}-${colorName}-${sizeName}-${printSide}`;

    setBag((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          category: product.category,
          color: colorName,
          size: sizeName,
          printSide,
          customizablePrintSide: product.customizablePrintSide,
          price: unitPrice,
          available: product.available,
          image: product.gallery[0].src,
          qty: 1
        }
      ];
    });

    setJustAddedToast(`${product.name} (${colorName})`);
    setTimeout(() => setJustAddedToast(null), 2600);
  };

  const updateBagQty = (key, delta) => {
    setBag((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const bagTotal = useMemo(
    () => bag.reduce((sum, item) => sum + item.price * item.qty, 0),
    [bag]
  );

  const bagCount = useMemo(
    () => bag.reduce((sum, item) => sum + item.qty, 0),
    [bag]
  );

  // Build WhatsApp URL for single product or entire bag
  const getSingleProductWhatsAppUrl = () => {
    const sideText = activeProduct.customizablePrintSide
      ? ` | Ubicación del diseño: ${selectedPrintSide}`
      : '';
    const statusNote = !activeProduct.available
      ? ' (Consulta por próximo restock)'
      : '';
    const msg = `¡Hola MIPEUE! 🇳🇮 Me interesa pedir:\n• *${activeProduct.name}* (${activeProduct.category})${statusNote}\n• Color: ${currentColor.name}\n• Talla/Medida: ${selectedSize}${sideText}\n• Precio: C$ ${currentPrice}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const getBagWhatsAppUrl = () => {
    if (bag.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        '¡Hola MIPEUE! 🇳🇮 Quisiera consultar sobre su catálogo disponible.'
      )}`;
    }
    const lines = bag.map(
      (item, i) =>
        `${i + 1}. *${item.name}* x${item.qty} — ${item.color} | Talla: ${
          item.size
        }${
          item.customizablePrintSide ? ` | Diseño: ${item.printSide}` : ''
        } (C$ ${item.price * item.qty})`
    );
    const msg = `¡Hola MIPEUE! 🇳🇮 Quisiera realizar el siguiente pedido:\n\n${lines.join(
      '\n'
    )}\n\n*Total estimado: C$ ${bagTotal}*\n¡Quedo atento(a) para coordinar la entrega!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const filteredCatalog = useMemo(() => {
    if (catalogFilter === 'todos') return PRODUCTS;
    return PRODUCTS.filter((p) => p.collection === catalogFilter);
  }, [catalogFilter]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-paper-grain relative ${
        darkMode
          ? 'bg-[#124038] text-[#EFE8DE]'
          : 'bg-[#EFE8DE] text-[#124038]'
      }`}
    >
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {justAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl border ${
              darkMode
                ? 'bg-[#EFE8DE] text-[#124038] border-[#EFE8DE]/20'
                : 'bg-[#124038] text-[#EFE8DE] border-[#124038]/20'
            }`}
          >
            <Check className="w-4 h-4 shrink-0" />
            <span className="text-xs font-mono tracking-wider uppercase">
              Añadido a tu bolsa: <strong>{justAddedToast}</strong>
            </span>
            <button
              onClick={() => setIsBagOpen(true)}
              className="ml-2 underline text-[11px] font-mono uppercase tracking-widest opacity-90 hover:opacity-100 cursor-pointer"
            >
              Ver Bolsa
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TOP EDITORIAL NAVBAR (INSPIRED BY LACE UP UI REFERENCE) ================= */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 border-b ${
          darkMode
            ? 'bg-[#124038]/90 border-[#EFE8DE]/12'
            : 'bg-[#EFE8DE]/90 border-[#124038]/12'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-5">
            <a
              href="#hero-stage"
              className="group flex items-baseline tracking-tight text-2xl sm:text-3xl font-extrabold font-display select-none"
            >
              <span>M</span>
              <span className="font-serif italic font-normal text-3xl sm:text-4xl px-0.5 transition-transform group-hover:-translate-y-0.5">
                i
              </span>
              <span>PEUE</span>
              <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border border-current/25 opacity-75 hidden sm:inline-block">
                NIC
              </span>
            </a>
          </div>

          {/* Center: Collection Switcher Pills (Matches reference top nav tabs) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-current/12 bg-current/[0.03]">
            {COLLECTIONS.map((col) => {
              const isActive = activeProduct.collection === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => handleSelectCollection(col.id)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.16em] transition-all cursor-pointer ${
                    isActive
                      ? darkMode
                        ? 'bg-[#EFE8DE] text-[#124038] font-semibold shadow-sm'
                        : 'bg-[#124038] text-[#EFE8DE] font-semibold shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {col.label}
                </button>
              );
            })}
            <a
              href="#catalogo-completo"
              className="px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.16em] opacity-70 hover:opacity-100 transition-opacity"
            >
              CATÁLOGO (12)
            </a>
            <a
              href="#shortfilm"
              className="px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.16em] opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E3B24] animate-pulse" />
              SHORTFILM
            </a>
          </nav>

          {/* Right: Theme Switcher + WhatsApp Direct + Bag Counter */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle: Modo Artesanal (Crema) vs Modo Místico (Verde Bosque) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={
                darkMode
                  ? 'Cambiar a Modo Papel Artesanal (Claro)'
                  : 'Cambiar a Modo Bosque Místico (Oscuro)'
              }
              className={`flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                darkMode
                  ? 'border-[#EFE8DE]/20 bg-[#EFE8DE]/10 hover:bg-[#EFE8DE]/20'
                  : 'border-[#124038]/20 bg-[#124038]/5 hover:bg-[#124038]/10'
              }`}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Papel Crema</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Modo Místico</span>
                </>
              )}
            </button>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => setIsBagOpen(true)}
              className={`relative flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                darkMode
                  ? 'bg-[#EFE8DE] text-[#124038] hover:bg-white'
                  : 'bg-[#124038] text-[#EFE8DE] hover:bg-[#0b2924]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bolsa</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  darkMode
                    ? 'bg-[#124038] text-[#EFE8DE]'
                    : 'bg-[#EFE8DE] text-[#124038]'
                }`}
              >
                {bagCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Collection Bar */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto px-4 py-2 border-t border-current/10 no-scrollbar">
          {COLLECTIONS.map((col) => {
            const isActive = activeProduct.collection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => handleSelectCollection(col.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                  isActive
                    ? darkMode
                      ? 'bg-[#EFE8DE] text-[#124038] font-bold'
                      : 'bg-[#124038] text-[#EFE8DE] font-bold'
                    : 'border border-current/20 opacity-75'
                }`}
              >
                {col.label}
              </button>
            );
          })}
          <a
            href="#catalogo-completo"
            className="shrink-0 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-current/20 opacity-75"
          >
            VER TODO (12)
          </a>
        </div>
      </header>

      {/* ================= HERO INTERACTIVE 3-COLUMN STAGE (LACE UP REFERENCE STRUCTURE) ================= */}
      <section
        id="hero-stage"
        className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 pb-8 lg:py-10 overflow-hidden"
      >
        {/* GIANT BACKGROUND WATERMARK TEXT (Exactly like "LACE UP" / "JUMP" in ui_reference.jpg) */}
        <div className="pointer-events-none select-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.watermarkWord}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-center leading-none"
            >
              <span
                className={`block font-display font-extrabold uppercase tracking-[-0.04em] text-[21vw] xl:text-[260px] ${
                  darkMode ? 'text-[#EFE8DE]/[0.055]' : 'text-[#124038]/[0.06]'
                }`}
              >
                {activeProduct.watermarkWord}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle Top Metadata Sub-bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-6 mb-4 border-b border-current/12 text-[11px] font-mono uppercase tracking-[0.18em] opacity-75">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeCollection.badge}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>DISEÑO AL FRENTE O ATRÁS A TU ELECCIÓN</span>
            <span>•</span>
            <span>ENVÍOS A TODA NICARAGUA (+505 8333-2316)</span>
          </div>
        </div>

        {/* 3-COLUMN ASYMMETRICAL STAGE */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[540px]">
          {/* -------- LEFT COLUMN (Cols 1-4): Editorial Title, Color Swatches, Size & Print Side Configurator, CTAs -------- */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Product Code & Availability Badge */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded border border-current/20">
                    {activeProduct.code}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-[0.18em] px-3 py-1 rounded-full font-semibold ${
                      activeProduct.available
                        ? darkMode
                          ? 'bg-[#EFE8DE]/15 text-[#EFE8DE]'
                          : 'bg-[#124038]/12 text-[#124038]'
                        : 'bg-[#9E3B24] text-[#EFE8DE]'
                    }`}
                  >
                    {activeProduct.statusText}
                  </span>
                </div>

                {/* Title & Editorial Subtitle */}
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] opacity-65 mb-1">
                    {activeProduct.category}
                  </p>
                  <h1 className="text-4xl sm:text-5xl xl:text-[54px] font-display font-extrabold tracking-tight leading-[0.96] uppercase">
                    {activeProduct.name}
                  </h1>
                  <p className="font-serif italic text-xl sm:text-2xl opacity-85 mt-1">
                    {activeProduct.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed opacity-80 max-w-md">
                  {activeProduct.description}
                </p>

                {/* Price Tag in Córdobas */}
                <div className="pt-1 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                    C$ {currentPrice}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-65">
                    CÓRDOBAS • HECHO EN NICARAGUA
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Controls Block (Matches "SELECT COLOR" + Action row in Lace Up UI reference) */}
            <div className="space-y-5 pt-2 border-t border-current/12">
              {/* 1. Color Selector */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] mb-2.5">
                  <span className="opacity-70">SELECCIONAR COLOR</span>
                  <span className="font-semibold">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {activeProduct.colors.map((col, idx) => {
                    const isSelected = idx === selectedColorIdx;
                    return (
                      <button
                        key={col.name}
                        onClick={() => {
                          setSelectedColorIdx(idx);
                          if (idx < activeProduct.gallery.length) {
                            setSelectedGalleryIdx(idx);
                          }
                        }}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? darkMode
                              ? 'border-[#EFE8DE] bg-[#EFE8DE]/15 font-semibold'
                              : 'border-[#124038] bg-[#124038]/10 font-semibold'
                            : 'border-current/20 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shadow-inner"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                        {col.price !== activeProduct.basePrice && (
                          <span className="text-[10px] opacity-75">
                            (C${col.price})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Size & Print Placement Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Size Selector */}
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-[0.18em] opacity-70 mb-2">
                    TALLA / FORMATO
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition-all cursor-pointer ${
                          selectedSize === sz
                            ? darkMode
                              ? 'bg-[#EFE8DE] text-[#124038] font-bold'
                              : 'bg-[#124038] text-[#EFE8DE] font-bold'
                            : 'border border-current/20 opacity-75 hover:opacity-100'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Front / Back Print Selector (Authentic Canva Catalog Feature) */}
                {activeProduct.customizablePrintSide && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-[0.18em] opacity-70 mb-2">
                      DISEÑO (EL CLIENTE ELIGE)
                    </span>
                    <div className="inline-flex rounded p-0.5 border border-current/20">
                      {['Frente', 'Espalda'].map((side) => (
                        <button
                          key={side}
                          onClick={() => setSelectedPrintSide(side)}
                          className={`px-3 py-1 rounded-sm text-xs font-mono uppercase transition-all cursor-pointer ${
                            selectedPrintSide === side
                              ? darkMode
                                ? 'bg-[#EFE8DE] text-[#124038] font-bold'
                                : 'bg-[#124038] text-[#EFE8DE] font-bold'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          {side}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Primary CTAs (Add to Bag + Direct WhatsApp Order) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleAddToBag(activeProduct)}
                  className={`flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full font-mono text-xs uppercase tracking-[0.18em] font-bold transition-all shadow-lg cursor-pointer ${
                    darkMode
                      ? 'bg-[#EFE8DE] text-[#124038] hover:bg-white'
                      : 'bg-[#124038] text-[#EFE8DE] hover:bg-[#0b2924]'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {activeProduct.available
                      ? 'Añadir a la Bolsa'
                      : 'Reservar Restock'}
                  </span>
                </button>

                <a
                  href={getSingleProductWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-full border border-current/30 hover:border-current text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir en WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* -------- CENTER COLUMN (Cols 5-8): Floating Cutout Stage + Floor Drop Shadow -------- */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[480px] order-1 lg:order-2">
            {/* Subtle Circular Halo Behind Cutout */}
            <div
              className={`w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] rounded-full border transition-colors duration-500 flex items-center justify-center relative ${
                darkMode
                  ? 'border-[#EFE8DE]/12 bg-[#EFE8DE]/[0.03]'
                  : 'border-[#124038]/12 bg-[#124038]/[0.03]'
              }`}
            >
              {/* Inner Dashed Artisanal Ring */}
              <div className="w-[84%] h-[84%] rounded-full border border-dashed border-current/15" />
            </div>

            {/* Product Image / Cutout with Spring Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct.id}-${currentMedia.src}`}
                  initial={{ opacity: 0, y: 22, scale: 0.92, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, y: -18, scale: 0.94, rotate: 1.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 22
                  }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {currentMedia.type === 'cutout' ? (
                    <img
                      src={currentMedia.src}
                      alt={activeProduct.name}
                      className={`max-h-[370px] sm:max-h-[430px] w-auto object-contain select-none transition-transform duration-500 ${
                        darkMode ? 'cutout-elevation-dark' : 'cutout-elevation'
                      }`}
                    />
                  ) : (
                    /* Framed Polaroid Editorial Card when viewing a studio photo */
                    <div
                      className={`p-3 pb-5 rounded-2xl shadow-2xl border transform -rotate-1 transition-all ${
                        darkMode
                          ? 'bg-[#184f45] border-[#EFE8DE]/20'
                          : 'bg-[#F7F3EC] border-[#124038]/15'
                      }`}
                    >
                      <img
                        src={currentMedia.src}
                        alt={activeProduct.name}
                        className="max-h-[330px] sm:max-h-[370px] w-auto rounded-xl object-cover"
                      />
                      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] mt-2.5 opacity-75">
                        {currentMedia.label} • MIPEUE ARCHIVE
                      </p>
                    </div>
                  )}

                  {/* Rotated Stamp Badge when Agotado Temporalmente (Authentic Canva detail) */}
                  {!activeProduct.available && (
                    <div className="absolute top-1/2 -translate-y-1/2 -rotate-12 bg-[#9E3B24]/95 text-[#EFE8DE] px-5 py-2 rounded border-2 border-[#EFE8DE] shadow-2xl">
                      <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em]">
                        AGOTADO TEMPORALMENTE
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Realistic Floor Shadow Underneath Floating Cutout (Matches Lace Up UI reference) */}
            <div
              className={`w-64 sm:w-80 h-9 rounded-full mt-6 ${
                darkMode
                  ? 'product-floor-shadow-dark'
                  : 'product-floor-shadow'
              }`}
            />

            {/* Quick Prev / Next Product Controls Under Stage */}
            <div className="mt-4 flex items-center gap-4 z-20">
              <button
                onClick={() => handleCycleProduct(-1)}
                className="p-2 rounded-full border border-current/20 hover:border-current transition-colors cursor-pointer"
                title="Producto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-75">
                {PRODUCTS.findIndex((p) => p.id === activeProduct.id) + 1} /{' '}
                {PRODUCTS.length} • {currentMedia.label}
              </span>
              <button
                onClick={() => handleCycleProduct(1)}
                className="p-2 rounded-full border border-current/20 hover:border-current transition-colors cursor-pointer"
                title="Siguiente producto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* -------- RIGHT COLUMN (Cols 9-12): Vertical Thumbnail Switcher + Numbered Accordion (01, 02, 03) -------- */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6 order-3">
            {/* Vertical / Grid Angle & Photo Switcher (Matches right side of Lace Up UI reference) */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] opacity-70 mb-3">
                <span>VISTAS & LOOKBOOK</span>
                <span>0{selectedGalleryIdx + 1} / 0{activeProduct.gallery.length}</span>
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-2.5">
                {activeProduct.gallery.map((item, idx) => {
                  const isSelected = idx === selectedGalleryIdx;
                  return (
                    <button
                      key={item.src + idx}
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`group relative rounded-xl overflow-hidden border p-2 flex flex-col items-center justify-center h-24 transition-all cursor-pointer ${
                        isSelected
                          ? darkMode
                            ? 'border-[#EFE8DE] bg-[#EFE8DE]/15 shadow-md'
                            : 'border-[#124038] bg-[#124038]/10 shadow-md'
                          : 'border-current/15 bg-current/[0.03] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="max-h-14 w-auto object-contain transition-transform group-hover:scale-105"
                      />
                      <span className="mt-1 text-[9px] font-mono uppercase tracking-wider truncate max-w-full opacity-80">
                        0{idx + 1}. {item.type === 'cutout' ? 'Cutout' : 'Foto'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Numbered Specifications Accordion (01, 02, 03 — Directly inspired by Lace Up right column) */}
            <div className="border-t border-current/15 divide-y divide-current/12">
              {activeProduct.specs.map((spec) => {
                const isOpen = openAccordion === spec.num;
                return (
                  <div key={spec.num} className="py-3">
                    <button
                      onClick={() =>
                        setOpenAccordion(isOpen ? '' : spec.num)
                      }
                      className="w-full flex items-center justify-between text-left gap-2 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-55">
                          {spec.num}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] group-hover:translate-x-0.5 transition-transform">
                          {spec.title}
                        </span>
                      </div>
                      <span className="p-1 rounded-full border border-current/20">
                        {isOpen ? (
                          <Minus className="w-3 h-3" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-2.5 pl-7 text-xs leading-relaxed opacity-80">
                            {spec.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM RELATED STRIP WITH GIANT WATERMARK (MATCHES "JUMP" BOTTOM BAR IN REFERENCE) ================= */}
      <section
        className={`relative border-y transition-colors duration-500 overflow-hidden ${
          darkMode
            ? 'bg-[#0e332d] border-[#EFE8DE]/12'
            : 'bg-[#E5DDD0]/75 border-[#124038]/12'
        }`}
      >
        {/* Giant Watermark Behind Bottom Strip */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className={`font-display font-extrabold uppercase tracking-[0.08em] text-[18vw] leading-none ${
              darkMode ? 'text-[#EFE8DE]/[0.04]' : 'text-[#124038]/[0.05]'
            }`}
          >
            {activeCollection.stripWatermark}
          </span>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold">
                EXPLORAR {activeCollection.label}
              </span>
              <span className="text-xs font-serif italic opacity-75 hidden sm:inline">
                — Haz clic en cualquier pieza para cargarla en el escenario
              </span>
            </div>
            <a
              href="#catalogo-completo"
              className="text-[11px] font-mono uppercase tracking-[0.18em] flex items-center gap-1 opacity-75 hover:opacity-100"
            >
              <span>Ver las 12 piezas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((item) => {
              const isCurrent = item.id === activeProduct.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item, false)}
                  className={`group relative rounded-2xl p-4 border transition-all flex items-center gap-4 cursor-pointer ${
                    isCurrent
                      ? darkMode
                        ? 'bg-[#EFE8DE] text-[#124038] border-[#EFE8DE] shadow-xl'
                        : 'bg-[#124038] text-[#EFE8DE] border-[#124038] shadow-xl'
                      : darkMode
                      ? 'bg-[#124038]/70 border-[#EFE8DE]/15 hover:border-[#EFE8DE]/40'
                      : 'bg-[#F7F3EC]/90 border-[#124038]/12 hover:border-[#124038]/40'
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-20 h-20 rounded-xl shrink-0 flex items-center justify-center p-1.5 overflow-hidden ${
                      isCurrent
                        ? darkMode
                          ? 'bg-[#124038]/10'
                          : 'bg-[#EFE8DE]/10'
                        : 'bg-current/5'
                    }`}
                  >
                    <img
                      src={item.gallery[0].src}
                      alt={item.name}
                      className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-65 truncate">
                        {item.code}
                      </span>
                      {!item.available && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#9E3B24] text-[#EFE8DE]">
                          Agotado
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-sm uppercase tracking-tight truncate mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[11px] opacity-75 truncate">
                      {item.category}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold">
                        C$ {item.basePrice}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToBag(item);
                        }}
                        title="Añadir rápido a la bolsa"
                        className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                          isCurrent
                            ? darkMode
                              ? 'border-[#124038]/30 hover:bg-[#124038] hover:text-[#EFE8DE]'
                              : 'border-[#EFE8DE]/30 hover:bg-[#EFE8DE] hover:text-[#124038]'
                            : 'border-current/20 hover:bg-current/10'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ArtisanalDivider dark={darkMode} />

      {/* ================= COMPLETE CATALOG & LOOKBOOK SECTION (ALL 12 CANVA ITEMS) ================= */}
      <section
        id="catalogo-completo"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 sm:py-24"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] opacity-70 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>ARCHIVO COMPLETO MIPEUE • NICARAGUA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight leading-none">
              CATÁLOGO{' '}
              <span className="font-serif italic font-normal">
                Tradición & Moda
              </span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', label: 'Todo el Catálogo (12)' },
              { id: 'octubre', label: 'Drop Octubre (4)' },
              { id: 'cultural', label: 'Colección Cultural (4)' },
              { id: 'totebags', label: 'Tote Bags 32×35cm (4)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCatalogFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  catalogFilter === tab.id
                    ? darkMode
                      ? 'bg-[#EFE8DE] text-[#124038] font-bold shadow'
                      : 'bg-[#124038] text-[#EFE8DE] font-bold shadow'
                    : 'border border-current/20 opacity-75 hover:opacity-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Customization Highlight Banner from Canva Page 2 & 3 */}
        <div
          className={`mb-10 p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            darkMode
              ? 'bg-[#EFE8DE]/[0.06] border-[#EFE8DE]/15'
              : 'bg-[#124038]/[0.05] border-[#124038]/15'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                darkMode
                  ? 'bg-[#EFE8DE] text-[#124038]'
                  : 'bg-[#124038] text-[#EFE8DE]'
              }`}
            >
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] font-bold">
                NOTA DE PERSONALIZACIÓN • CAMISETAS 100% ALGODÓN
              </p>
              <p className="text-sm opacity-85 mt-0.5">
                “Las camisetas pueden llevar el diseño al{' '}
                <strong>frente o atrás</strong>; el cliente elige cómo prefiere
                usarlas.” — Camisetas Blancas <strong>C$ 480</strong> | Cremas{' '}
                <strong>C$ 490</strong> | Oversized <strong>C$ 590</strong>.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              '¡Hola MIPEUE! 🇳🇮 Quisiera consultar disponibilidad de tallas y colores.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-xs font-mono uppercase tracking-widest underline flex items-center gap-1 opacity-85 hover:opacity-100"
          >
            <span>Consultar Tallas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCatalog.map((product) => {
            const primaryMedia = product.gallery[0];
            const secondaryMedia = product.gallery[1] || product.gallery[0];

            return (
              <motion.div
                layout
                key={product.id}
                className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#0e332d]/90 border-[#EFE8DE]/15 hover:border-[#EFE8DE]/40'
                    : 'bg-[#F7F3EC] border-[#124038]/12 hover:border-[#124038]/40 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Card Top Image Area */}
                <div>
                  <div
                    onClick={() => handleSelectProduct(product, true)}
                    className={`relative h-72 w-full flex items-center justify-center p-6 overflow-hidden cursor-pointer ${
                      darkMode ? 'bg-[#124038]' : 'bg-[#EAE2D6]/60'
                    }`}
                  >
                    {/* Subtle Watermark */}
                    <span className="pointer-events-none select-none absolute font-display font-extrabold text-5xl uppercase tracking-tighter opacity-[0.06]">
                      {product.watermarkWord}
                    </span>

                    {/* Primary Image */}
                    <img
                      src={primaryMedia.src}
                      alt={product.name}
                      className={`max-h-56 w-auto object-contain transition-all duration-500 ${
                        secondaryMedia !== primaryMedia
                          ? 'group-hover:opacity-0 group-hover:scale-95'
                          : 'group-hover:scale-105'
                      }`}
                    />

                    {/* Hover Secondary Lookbook Image */}
                    {secondaryMedia !== primaryMedia && (
                      <img
                        src={secondaryMedia.src}
                        alt={`${product.name} vista alterna`}
                        className="absolute max-h-60 w-auto object-contain opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 rounded-lg"
                      />
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md ${
                          darkMode
                            ? 'bg-[#124038]/80 text-[#EFE8DE] border border-[#EFE8DE]/20'
                            : 'bg-[#EFE8DE]/90 text-[#124038] border border-[#124038]/15'
                        }`}
                      >
                        {product.category}
                      </span>
                      {!product.available && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#9E3B24] text-[#EFE8DE] font-bold">
                          Agotado
                        </span>
                      )}
                    </div>

                    {/* Quick View Pill on Hover */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full shadow ${
                          darkMode
                            ? 'bg-[#EFE8DE] text-[#124038]'
                            : 'bg-[#124038] text-[#EFE8DE]'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>Ver en Escenario</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        onClick={() => handleSelectProduct(product, true)}
                        className="font-display font-extrabold text-lg uppercase tracking-tight cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h3>
                      <span className="font-display font-extrabold text-lg shrink-0">
                        C$ {product.basePrice}
                      </span>
                    </div>
                    <p className="font-serif italic text-base opacity-75">
                      {product.subtitle}
                    </p>

                    {/* Color Dots & Print Note */}
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono opacity-80">
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            title={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-black/25"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                        <span className="ml-1 text-[10px]">
                          {product.colors.length}{' '}
                          {product.colors.length === 1 ? 'tono' : 'tonos'}
                        </span>
                      </div>
                      {product.customizablePrintSide && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-current/20">
                          Frente / Atrás
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleAddToBag(product)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-mono text-[11px] uppercase tracking-[0.15em] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      darkMode
                        ? 'bg-[#EFE8DE] text-[#124038] hover:bg-white'
                        : 'bg-[#124038] text-[#EFE8DE] hover:bg-[#0b2924]'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                  <button
                    onClick={() => handleSelectProduct(product, true)}
                    className="py-2.5 px-3.5 rounded-xl border border-current/20 hover:border-current text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Personalizar
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= EDITORIAL SHORTFILM & MANIFESTO SECTION (CANVA PAGES 1 & 7) ================= */}
      <section
        id="shortfilm"
        className="relative bg-[#124038] text-[#EFE8DE] border-y border-[#EFE8DE]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Manifesto Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFE8DE]/25 text-[11px] font-mono uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#C89D54]" />
                <span>CINE & IDENTIDAD • MIPEUE SHORTFILM</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-display font-extrabold uppercase tracking-tight leading-[0.95]">
                RESCATANDO LA{' '}
                <span className="font-serif italic font-normal text-[#C89D54]">
                  tradición
                </span>{' '}
                Y EL ARTE POPULAR
              </h2>

              <blockquote className="text-lg sm:text-xl font-serif italic text-[#EFE8DE]/90 border-l-2 border-[#C89D54] pl-5 py-1">
                “Un emprendimiento joven rescata la tradición y el arte popular
                a través de la moda. ¿Ya viste nuestro shortfilm?”
              </blockquote>

              <p className="text-sm sm:text-base text-[#EFE8DE]/80 leading-relaxed max-w-xl">
                Cada prenda de MIPEUE nace del diálogo entre las leyendas orales
                de nuestros abuelos, la arquitectura colonial de Granada, la
                fauna del trópico y el lenguaje cotidiano de Nicaragua.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-3 px-6 py-4 rounded-full bg-[#EFE8DE] text-[#124038] font-mono text-xs uppercase tracking-[0.18em] font-bold hover:bg-white transition-all shadow-xl cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Ver Shortfilm con Audio</span>
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-full border border-[#EFE8DE]/30 hover:border-[#EFE8DE] font-mono text-xs uppercase tracking-[0.18em] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>+505 8333-2316</span>
                </a>
              </div>
            </div>

            {/* Right Dual Video Showcase */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="group relative rounded-2xl overflow-hidden border border-[#EFE8DE]/20 aspect-[9/14] bg-black/40 cursor-pointer shadow-2xl"
              >
                <video
                  src="/assets/videos/shortfilm-bg.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-5">
                  <span className="self-start text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                    01 / SHORTFILM OFICIAL
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold uppercase text-sm">
                        MIPEUE EN MOVIMIENTO
                      </p>
                      <p className="text-xs font-serif italic opacity-80">
                        Clic para ampliar
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#EFE8DE] text-[#124038] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="group relative rounded-2xl overflow-hidden border border-[#EFE8DE]/20 aspect-[9/14] bg-black/40 cursor-pointer shadow-2xl sm:mt-8"
              >
                <video
                  src="/assets/videos/hero-bg.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-5">
                  <span className="self-start text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                    02 / PROCESO & CULTURA
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold uppercase text-sm">
                        TRADICIÓN VIVA
                      </p>
                      <p className="text-xs font-serif italic opacity-80">
                        Nicaragua en cada trazo
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#EFE8DE] text-[#124038] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className={`border-t transition-colors ${
          darkMode
            ? 'bg-[#0b2924] text-[#EFE8DE] border-[#EFE8DE]/12'
            : 'bg-[#E5DDD0] text-[#124038] border-[#124038]/12'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-baseline tracking-tight text-3xl font-extrabold font-display">
              <span>M</span>
              <span className="font-serif italic font-normal text-4xl px-0.5">
                i
              </span>
              <span>PEUE</span>
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] opacity-75 mt-1">
              RESCATANDO LA TRADICIÓN Y EL ARTE POPULAR DE NICARAGUA
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider">
            <a href="#hero-stage" className="hover:underline">
              Escenario Interactivo
            </a>
            <a href="#catalogo-completo" className="hover:underline">
              Catálogo (12)
            </a>
            <a href="#shortfilm" className="hover:underline">
              Shortfilm
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline font-bold"
            >
              WhatsApp: +505 8333-2316
            </a>
          </div>
        </div>
      </footer>

      {/* ================= SHOPPING BAG SLIDE-OVER DRAWER ================= */}
      <AnimatePresence>
        {isBagOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBagOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col justify-between shadow-2xl border-l ${
                darkMode
                  ? 'bg-[#124038] text-[#EFE8DE] border-[#EFE8DE]/20'
                  : 'bg-[#EFE8DE] text-[#124038] border-[#124038]/20'
              }`}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-current/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">
                    Tu Bolsa de Pedido ({bagCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsBagOpen(false)}
                  className="p-2 rounded-full border border-current/20 hover:border-current cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {bag.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 opacity-75">
                    <ShoppingBag className="w-10 h-10 mb-3 opacity-50" />
                    <p className="font-display font-bold uppercase text-base">
                      Tu bolsa está vacía
                    </p>
                    <p className="text-xs max-w-xs mt-1">
                      Selecciona tus camisetas o tote bags favoritos, elige
                      talla y ubicación del diseño (Frente o Espalda) para
                      enviar tu pedido directo por WhatsApp.
                    </p>
                  </div>
                ) : (
                  bag.map((item) => (
                    <div
                      key={item.key}
                      className="p-4 rounded-2xl border border-current/15 bg-current/[0.03] flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg bg-current/5 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm uppercase truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-mono opacity-75">
                          {item.color} • Talla: {item.size}
                        </p>
                        {item.customizablePrintSide && (
                          <p className="text-[10px] font-mono uppercase tracking-wider opacity-90">
                            Diseño: <strong>{item.printSide}</strong>
                          </p>
                        )}
                        <p className="font-mono text-xs font-bold mt-1">
                          C$ {item.price * item.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateBagQty(item.key, -1)}
                          className="p-1.5 rounded border border-current/20 hover:border-current cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs w-5 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateBagQty(item.key, 1)}
                          className="p-1.5 rounded border border-current/20 hover:border-current cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-current/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest opacity-75">
                    TOTAL ESTIMADO
                  </span>
                  <span className="text-2xl font-display font-extrabold">
                    C$ {bagTotal}
                  </span>
                </div>
                <a
                  href={getBagWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-4 px-6 rounded-full font-mono text-xs uppercase tracking-[0.18em] font-bold flex items-center justify-center gap-2 shadow-xl transition-all ${
                    darkMode
                      ? 'bg-[#EFE8DE] text-[#124038] hover:bg-white'
                      : 'bg-[#124038] text-[#EFE8DE] hover:bg-[#0b2924]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Pedido por WhatsApp</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= SHORTFILM VIDEO MODAL ================= */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#EFE8DE]/25 bg-[#124038] shadow-2xl"
            >
              <div className="p-4 flex items-center justify-between text-[#EFE8DE] border-b border-[#EFE8DE]/15">
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  MIPEUE • SHORTFILM OFICIAL
                </span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 rounded-full border border-[#EFE8DE]/25 hover:border-[#EFE8DE] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <video
                src="/assets/videos/shortfilm-bg.mp4"
                controls
                autoPlay
                className="w-full max-h-[75vh] object-contain bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
