// Catálogo oficial MiPEUE — fuente: "Inventario web.xlsx" (Drive / Recursos Web MiPEUE).
// Precios base en Córdobas (C$). Estados válidos del inventario:
//   'En stock' | 'Agotado' | 'No disponible temporalmente'

export const COLLECTIONS = [
  {
    id: 'raices',
    name: 'Raíces',
    description: 'Símbolos que nos nombran: la flor, el ave y el teatro popular.',
  },
  {
    id: 'sazon-y-son-nica',
    name: 'Sazón y Son Nica',
    description: 'Comida, fiesta y folclor de nuestros pueblos.',
  },
  {
    id: 'estampas-del-pueblo',
    name: 'Estampas del Pueblo',
    description: 'Postales de lo cotidiano: fauna, dulces y paisaje.',
  },
  {
    id: 'mitos-de-la-noche',
    name: 'Mitos de la Noche',
    description: 'Leyendas que se cuentan en voz baja. Edición limitada.',
  },
];

export const COLOR_SWATCHES = {
  Blanco: '#FFFFFF',
  Negro: '#111111',
  Crema: '#E9DFCF',
  Verde: '#13423A',
  Azul: '#1F2A44',
  'Tiras rojas': '#E9DFCF',
};

export const IN_STOCK = 'En stock';

const img = (product, color, count) =>
  Array.from({ length: count }, (_, i) => `/assets/catalog/${product}/${color}-${i + 1}.webp`);

/** Lista explícita de fotos en el orden deseado (la primera es la portada). */
const pick = (product, files) => files.map((f) => `/assets/catalog/${product}/${f}.webp`);

const SHIRT = 'Camiseta';
const TOP = 'Top';
const TOTE = 'Tote bag';
const FIT_OPTIONS = ['Normal', 'Oversized'];
const parseSizes = (s) => (s ? s.split(',').map((x) => x.trim()) : []);

/**
 * Variante = color del inventario.
 * fits: si el inventario indica "Normal/Oversized" se ofrece selector de corte.
 */
const v = (color, price, sizes, status, images, detail) => ({
  color,
  price,
  sizes: parseSizes(sizes),
  status,
  images,
  fits: detail === 'Normal/Oversized' ? FIT_OPTIONS : null,
  fitNote: detail === 'Clásica' ? 'Corte clásico' : null,
});

export const PRODUCTS = [
  // ───────────── RAÍCES ─────────────
  {
    id: 'sacuanjoche',
    name: 'Sacuanjoche',
    type: SHIRT,
    collection: 'raices',
    variants: [
      v('Blanco', 480, null, 'Agotado', [], null),
      v('Negro', 480, null, 'Agotado', img('sacuanjoche', 'negro', 1), 'Normal/Oversized'),
      v('Crema', 490, null, 'Agotado', [], 'Normal/Oversized'),
    ],
  },
  {
    id: 'guardabarranco',
    name: 'Guardabarranco',
    type: SHIRT,
    collection: 'raices',
    variants: [
      v('Blanco', 480, null, 'No disponible temporalmente', img('guardabarranco', 'blanco', 4), null),
      v('Negro', 480, null, 'No disponible temporalmente', img('guardabarranco', 'negro', 4), 'Normal/Oversized'),
      v('Crema', 490, null, 'No disponible temporalmente', img('guardabarranco', 'crema', 4), 'Normal/Oversized'),
    ],
  },
  {
    id: 'gueguense-macho-raton',
    name: 'Güegüense & Macho Ratón',
    type: SHIRT,
    collection: 'raices',
    variants: [
      v('Blanco', 480, 'S, M, L, XL', IN_STOCK, pick('gueguense-macho-raton', ['blanco-2', 'blanco-3', 'blanco-1']), null),
      v('Negro', 480, 'XS, S, M, L, XL', IN_STOCK, img('gueguense-macho-raton', 'negro', 2), 'Normal/Oversized'),
      v('Crema', 490, 'S, M, XL', IN_STOCK, pick('gueguense-macho-raton', ['crema-2', 'crema-1', 'crema-3']), 'Normal/Oversized'),
    ],
  },

  // ───────────── SAZÓN Y SON NICA ─────────────
  {
    id: 'leon-y-sol-de-sutiaba',
    name: 'León y Sol de Sutiaba',
    type: SHIRT,
    collection: 'sazon-y-son-nica',
    variants: [
      v('Blanco', 480, 'S, M, L, XL', IN_STOCK, pick('leon-y-sol-de-sutiaba', ['blanco-2', 'blanco-1']), null),
      v('Negro', 480, 'XS, S, M, L, XL', IN_STOCK, img('leon-y-sol-de-sutiaba', 'negro', 3), 'Normal/Oversized'),
      v('Crema', 490, 'S, M, XL', IN_STOCK, img('leon-y-sol-de-sutiaba', 'crema', 2), 'Normal/Oversized'),
    ],
  },
  {
    id: 'nacatamal',
    name: 'Nacatamal',
    type: SHIRT,
    collection: 'sazon-y-son-nica',
    variants: [
      v('Negro', 480, 'XS, S, M, L, XL', IN_STOCK, pick('nacatamal', ['default-3', 'default-2', 'default-1']), 'Normal/Oversized'),
      v('Blanco', 480, null, 'Agotado', [], null),
      v('Crema', 490, null, 'Agotado', [], 'Normal/Oversized'),
    ],
  },
  {
    id: 'gigantona-y-enano-cabezon',
    name: 'Gigantona y Enano Cabezón',
    type: SHIRT,
    collection: 'sazon-y-son-nica',
    variants: [
      v('Blanco', 480, 'S, M, L, XL', IN_STOCK, img('gigantona-y-enano-cabezon', 'blanco', 2), null),
      v('Negro', 480, 'XS, S, M, L, XL', IN_STOCK, pick('gigantona-y-enano-cabezon', ['negro-3', 'negro-1', 'negro-2']), 'Normal/Oversized'),
      v('Crema', 490, 'S, M, XL', IN_STOCK, pick('gigantona-y-enano-cabezon', ['crema-2', 'crema-1', 'crema-3']), 'Normal/Oversized'),
    ],
  },

  // ───────────── ESTAMPAS DEL PUEBLO ─────────────
  {
    id: 'fauna-local',
    name: 'Fauna Local',
    type: SHIRT,
    collection: 'estampas-del-pueblo',
    variants: [
      v('Blanco', 480, 'S, M, L, XL', IN_STOCK, pick('fauna-local', ['blanco-2', 'blanco-3', 'blanco-1']), null),
      v('Negro', 480, 'XS, S, M, L, XL', 'No disponible temporalmente', pick('fauna-local', ['negro-2', 'negro-3', 'negro-1']), 'Normal/Oversized'),
      v('Crema', 490, 'S, M, XL', IN_STOCK, img('fauna-local', 'crema', 3), 'Normal/Oversized'),
    ],
  },
  {
    id: 'bunuelos',
    name: 'Buñuelos',
    type: SHIRT,
    collection: 'estampas-del-pueblo',
    variants: [
      v('Blanco', 480, 'S, M, L', IN_STOCK, img('bunuelos', 'blanco', 3), null),
      v('Negro', 480, 'XS, S, M, L', IN_STOCK, img('bunuelos', 'negro', 3), 'Normal/Oversized'),
      v('Crema', 490, 'S, M', IN_STOCK, img('bunuelos', 'crema', 3), 'Normal/Oversized'),
    ],
  },
  {
    id: 'nicaragua',
    name: 'Nicaragua',
    type: SHIRT,
    collection: 'estampas-del-pueblo',
    variants: [
      v('Blanco', 480, 'S, M, L, XL', IN_STOCK, pick('nicaragua', ['blanco-2', 'blanco-3', 'blanco-1']), null),
      v('Negro', 480, 'XS, S, M, L, XL', IN_STOCK, pick('nicaragua', ['negro-2', 'negro-3', 'negro-1']), 'Normal/Oversized'),
      v('Crema', 490, 'S, M, XL', IN_STOCK, pick('nicaragua', ['crema-2', 'crema-1', 'crema-3']), 'Normal/Oversized'),
    ],
  },
  {
    id: 'tote-bunuelos',
    name: 'Buñuelos',
    type: TOTE,
    collection: 'estampas-del-pueblo',
    variants: [v('Tiras rojas', 430, 'Unitalla', IN_STOCK, img('bunuelos', 'tote-bag', 3), null)],
  },
  {
    id: 'tote-fauna-local',
    name: 'Fauna Local',
    type: TOTE,
    collection: 'estampas-del-pueblo',
    variants: [v('Crema', 430, 'Unitalla', 'No disponible temporalmente', img('fauna-local', 'tote-bag', 1), null)],
  },
  {
    id: 'tote-nicaragua',
    name: 'Nicaragua',
    type: TOTE,
    collection: 'estampas-del-pueblo',
    variants: [v('Crema', 430, 'Unitalla', 'No disponible temporalmente', img('nicaragua', 'tote-bag', 1), null)],
  },

  // ───────────── MITOS DE LA NOCHE ─────────────
  {
    id: 'cadejo',
    name: 'Cadejo',
    type: SHIRT,
    collection: 'mitos-de-la-noche',
    variants: [
      v('Blanco', 490, 'S, M, L, XL', IN_STOCK, img('cadejo', 'blanco', 2), 'Clásica'),
      v('Crema', 490, 'S, M, XL', IN_STOCK, img('cadejo', 'crema', 2), 'Clásica'),
      v('Azul', 490, null, 'Agotado', img('cadejo', 'azul', 1), 'Clásica'),
    ],
  },
  {
    id: 'la-cegua',
    name: 'La Cegua',
    type: SHIRT,
    collection: 'mitos-de-la-noche',
    variants: [
      v('Negro', 490, 'XS, S, M, L, XL', IN_STOCK, pick('la-cegua', ['default-2', 'default-4', 'default-3', 'default-5']), 'Normal/Oversized'),
    ],
  },
  {
    id: 'top-muy-deacachimba',
    name: 'Muy Deacachimba',
    type: TOP,
    collection: 'mitos-de-la-noche',
    variants: [
      v('Verde', 550, 'Unitalla', IN_STOCK, pick('top-muy-deacachimba', ['default-2', 'default-3']), null),
    ],
  },
  {
    id: 'top-nicaragua',
    name: 'Nicaragua',
    type: TOP,
    collection: 'mitos-de-la-noche',
    variants: [
      v('Verde', 550, 'Unitalla', IN_STOCK, pick('top-nicaragua', ['default-2', 'default-4', 'default-3']), null),
    ],
  },
];

export const isAvailable = (variant) => variant.status === IN_STOCK && variant.sizes.length > 0;

export const productTitle = (product) => `${product.type} ${product.name}`;

/** Imágenes a mostrar para una variante (fallback a la primera variante con fotos). */
export const variantImages = (product, variant) => {
  if (variant.images.length) return variant.images;
  const withImages = product.variants.find((x) => x.images.length);
  return withImages ? withImages.images : [];
};
