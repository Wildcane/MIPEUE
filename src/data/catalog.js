// Catálogo oficial MiPEUE — Estructurado por Regiones y Ciudades de Nicaragua.
// Precios base en Córdobas (NIO) con conversión a USD.
// Regla: Camisetas negras C$ 480, Crema/colores C$ 490, Colecciones nuevas C$ 490, Tops C$ 550, Tote bags C$ 430.

export const COLLECTIONS = [
  {
    id: 'granada',
    name: 'Colección Granada',
    description: 'La Gran Sultana: arquitectura colonial, el Gran Lago Cocibolca y sabores ancestrales.',
  },
  {
    id: 'leon',
    name: 'Colección León',
    description: 'Ciudad universitaria e indígena: fiesta de Gigantonas, el sol de Sutiaba y buñuelos calientes.',
  },
  {
    id: 'managua',
    name: 'Colección Managua & Pacífico',
    description: 'El pulso de la capital, la tradición dominical del nacatamal y el vuelo de nuestra fauna nacional.',
  },
  {
    id: 'mitos',
    name: 'Colección Mitos & Masaya',
    description: 'Última Colección: Leyendas nocturnas de caminos coloniales y siluetas urbanas contemporáneas.',
    isLatest: true,
  },
  {
    id: 'totebags',
    name: 'Colección Tote Bags',
    description: 'Bolsos de lona cruda resistente de 32 × 35 cm con técnica DTF para acompañar tu día a día.',
  },
];

export const COLOR_SWATCHES = {
  Blanco: '#FFFFFF',
  Negro: '#111111',
  Crema: '#E9DFCF',
  Verde: '#13423A',
  Azul: '#1F2A44',
  'Tiras rojas': '#C8382B',
};

export const IN_STOCK = 'En stock';
export const OUT_OF_STOCK = 'Agotado';
export const TEMP_UNAVAILABLE = 'No disponible temporalmente';

export const STANDARD_SIZES = ['S', 'M', 'L', 'XL', 'Otra talla'];
export const TOP_SIZES = ['Unitalla', 'Otra talla'];
export const TOTE_SIZES = ['Unitalla (32×35 cm)'];

const SHIRT = 'Camiseta';
const TOP = 'Top Raglán';
const TOTE = 'Tote Bag';

const pick = (product, files) => files.map((f) => `/assets/catalog/${product}/${f}.webp`);

/**
 * Constructor de variante de producto.
 */
const v = (color, price, sizes, status, images, fit = null) => ({
  color,
  price,
  sizes: sizes || STANDARD_SIZES,
  status,
  images,
  fits: fit ? [fit, 'Oversized'] : null,
});

export const PRODUCTS = [
  // ──────────────────────────────────────────
  // 1. COLECCIÓN GRANADA
  // ──────────────────────────────────────────
  {
    id: 'catedral-de-granada',
    name: 'Catedral de Granada',
    type: SHIRT,
    collection: 'granada',
    material: '100% Algodón peinado de 180g • Serigrafía de autor',
    description:
      'Homenaje a la joya neoclásica de La Gran Sultana junto al florecimiento de la flor nacional Sacuanjoche y la brisa del Cocibolca.',
    variants: [
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, ['/assets/catalog/catedral-de-granada/crema-1.webp'], 'Normal'),
    ],
  },
  {
    id: 'isletas-de-granada',
    name: 'Isletas de Granada',
    type: SHIRT,
    collection: 'granada',
    material: '100% Algodón peinado • Serigrafía artesanal',
    description:
      'Postal serigráfica del archipiélago volcánico en el Gran Lago de Nicaragua, con lanchas tradicionales, palmeras y la cumbre del volcán Mombacho.',
    variants: [
      v('Blanco', 480, STANDARD_SIZES, IN_STOCK, ['/assets/catalog/isletas-de-granada/blanco-1.webp'], 'Normal'),
    ],
  },
  {
    id: 'sopa-de-queso',
    name: 'Sopa de Queso',
    type: SHIRT,
    collection: 'granada',
    material: '100% Algodón peinado de tacto suave • Tinta ecológica',
    description:
      'Tributo a la receta colonial de cuaresma: caldo con queso local, rosquillas de maíz y aroma a hierbabuena. Hecha como manda la abuela.',
    variants: [
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, ['/assets/catalog/sopa-de-queso/crema-1.webp'], 'Normal'),
      v('Blanco', 480, STANDARD_SIZES, IN_STOCK, ['/assets/products/page2-cutout-2.webp'], 'Normal'),
    ],
  },
  {
    id: 'sacuanjoche',
    name: 'Sacuanjoche',
    type: SHIRT,
    collection: 'granada',
    material: '100% Algodón peinado • Serigrafía botánica',
    description:
      'Plumeria rubra: Flor Nacional de Nicaragua. Emblema sagrado prehispánico presente en los patios coloniales y festividades religiosas.',
    variants: [
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('sacuanjoche', ['negro-1']), 'Normal'),
    ],
  },

  // ──────────────────────────────────────────
  // 2. COLECCIÓN LEÓN
  // ──────────────────────────────────────────
  {
    id: 'leon-y-sol-de-sutiaba',
    name: 'León y Sol de Sutiaba',
    type: SHIRT,
    collection: 'leon',
    material: '100% Algodón peinado • Grabado de autor',
    description:
      'Encuentro entre la cosmovisión indígena del Sol de Sutiaba y la herencia colonial de León. Identidad viva y bravura histórica.',
    variants: [
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('leon-y-sol-de-sutiaba', ['crema-1', 'crema-2']), 'Normal'),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('leon-y-sol-de-sutiaba', ['negro-1', 'negro-2', 'negro-3']), 'Normal'),
    ],
  },
  {
    id: 'gigantona-y-enano-cabezon',
    name: 'Gigantona y Enano Cabezón',
    type: SHIRT,
    collection: 'leon',
    material: '100% Algodón peinado • Serigrafía de alta definición',
    description:
      'La fiesta leonesa en su máxima expresión: coplas pícaras, tambores y el baile callejero que satiriza la historia con alegría popular.',
    variants: [
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('gigantona-y-enano-cabezon', ['crema-2', 'crema-1', 'crema-3']), 'Normal'),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('gigantona-y-enano-cabezon', ['negro-3', 'negro-1', 'negro-2']), 'Normal'),
    ],
  },
  {
    id: 'bunuelos',
    name: 'Buñuelos',
    type: SHIRT,
    collection: 'leon',
    material: '100% Algodón peinado de acabado suave • Tinta ecológica',
    description:
      'Yuca rallada, queso blanco y fritura dorada bañada en abundante miel de rapadura con canela. Tradición gastronómica compartida por generaciones.',
    variants: [
      v('Blanco', 480, STANDARD_SIZES, IN_STOCK, pick('bunuelos', ['blanco-1', 'blanco-2', 'blanco-3']), null),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('bunuelos', ['negro-1', 'negro-2', 'negro-3']), 'Normal'),
    ],
  },

  // ──────────────────────────────────────────
  // 3. COLECCIÓN MANAGUA & PACÍFICO
  // ──────────────────────────────────────────
  {
    id: 'nacatamal',
    name: 'Nacatamal',
    type: SHIRT,
    collection: 'managua',
    material: '100% Algodón peinado • Grabado de época',
    description:
      'El desayuno patrio del fin de semana. Masa nixtamalizada en manteca, lomo sazonado, papas, arroz y hierbabuena cocidos en hoja de plátano.',
    variants: [
      v('Blanco', 480, STANDARD_SIZES, IN_STOCK, ['/assets/products/nacatamal-photo.webp'], 'Normal'),
    ],
  },
  {
    id: 'fauna-local',
    name: 'Fauna Local',
    type: SHIRT,
    collection: 'managua',
    material: '100% Algodón peinado • Ilustración naturalista',
    description:
      'Registro gráfico de nuestra biodiversidad: Guardabarranco y Chocoyo común posados en ramas autóctonas del bosque tropical seco del Pacífico.',
    variants: [
      v('Blanco', 480, STANDARD_SIZES, IN_STOCK, pick('fauna-local', ['blanco-2', 'blanco-3', 'blanco-1']), null),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('fauna-local', ['negro-2', 'negro-3', 'negro-1']), 'Normal'),
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('fauna-local', ['crema-1', 'crema-2', 'crema-3']), 'Normal'),
    ],
  },
  {
    id: 'guardabarranco',
    name: 'Guardabarranco',
    type: SHIRT,
    collection: 'managua',
    material: '100% Algodón peinado de 180g • Serigrafía prémium',
    description:
      'Ave Nacional de Nicaragua. Corona turquesa, plumaje tornasol y plumas caudales en forma de raqueta que surcan libremente los cielos pinoleros.',
    variants: [
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('guardabarranco', ['crema-1', 'crema-2', 'crema-3', 'crema-4']), 'Normal'),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('guardabarranco', ['negro-1', 'negro-2', 'negro-3', 'negro-4']), 'Normal'),
    ],
  },
  {
    id: 'gueguense-macho-raton',
    name: 'Güegüense & Macho Ratón',
    type: SHIRT,
    collection: 'managua',
    material: '100% Algodón peinado • Grabado editorial clásico',
    description:
      'La gran sátira y baile de Diriamba y el Pacífico. Primera comedia teatral indo-hispana y Patrimonio de la Humanidad UNESCO.',
    variants: [
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('gueguense-macho-raton', ['crema-2', 'crema-1', 'crema-3']), 'Normal'),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('gueguense-macho-raton', ['negro-1', 'negro-2']), 'Normal'),
    ],
  },
  {
    id: 'nicaragua',
    name: 'Nicaragua',
    type: SHIRT,
    collection: 'managua',
    material: '100% Algodón peinado • Serigrafía bitono',
    description:
      'Tierra de lagos y volcanes. Silueta de la cordillera de Maribios, ramillete botánico de Sacuanjoches y tipografía de herencia nacional.',
    variants: [
      v('Blanco', 480, STANDARD_SIZES, IN_STOCK, pick('nicaragua', ['blanco-2', 'blanco-3', 'blanco-1']), null),
      v('Negro', 480, STANDARD_SIZES, IN_STOCK, pick('nicaragua', ['negro-2', 'negro-3', 'negro-1']), 'Normal'),
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('nicaragua', ['crema-2', 'crema-1', 'crema-3']), 'Normal'),
    ],
  },

  // ──────────────────────────────────────────
  // 4. COLECCIÓN MITOS & MASAYA (ÚLTIMA COLECCIÓN)
  // ──────────────────────────────────────────
  {
    id: 'cadejo',
    name: 'Cadejo',
    type: SHIRT,
    collection: 'mitos',
    isLatest: true,
    material: '100% Algodón peinado prémium • Ilustración mística de autor',
    description:
      'El guardián espectral de los caminos solitarios. La eterna dualidad entre el espíritu blanco protector y el espíritu negro que reta a los trasnochadores.',
    variants: [
      v('Blanco', 490, STANDARD_SIZES, IN_STOCK, pick('cadejo', ['blanco-2', 'blanco-1', 'blanco-3'])),
      v('Crema', 490, STANDARD_SIZES, IN_STOCK, pick('cadejo', ['crema-1', 'crema-2'])),
      v('Azul', 490, STANDARD_SIZES, OUT_OF_STOCK, pick('cadejo', ['azul-1'])),
    ],
  },
  {
    id: 'la-cegua',
    name: 'La Cegua',
    type: SHIRT,
    collection: 'mitos',
    isLatest: true,
    material: '100% Algodón peinado negro • Tinta marfil sobre tela profunda',
    description:
      'La mujer espectral de las quebradas de Masaya y los caminos coloniales. Rostro hechicero que revela ante los infieles una calavera de caballo.',
    variants: [
      v('Negro', 490, STANDARD_SIZES, IN_STOCK, pick('la-cegua', ['default-2', 'default-4', 'default-3', 'default-5']), 'Normal'),
      v('Crema', 490, STANDARD_SIZES, OUT_OF_STOCK, pick('la-cegua', ['default-2']), 'Normal'),
    ],
  },
  {
    id: 'top-muy-deacachimba',
    name: 'Muy Deacachimba',
    type: TOP,
    collection: 'mitos',
    isLatest: true,
    material: 'Rib de algodón peinado con stretch • Corte raglán femenino',
    description:
      'Homenaje al habla cotidiana nicaragüense. Silueta baby tee fresca con mangas en contraste verde bosque corporativo y cuello acanalado.',
    variants: [
      v('Verde', 550, TOP_SIZES, IN_STOCK, pick('top-muy-deacachimba', ['default-2', 'default-3', 'default-1'])),
    ],
  },
  {
    id: 'top-nicaragua',
    name: 'Top Nicaragua',
    type: TOP,
    collection: 'mitos',
    isLatest: true,
    material: 'Rib de algodón peinado con stretch • Corte raglán bicolor',
    description:
      'Corte raglán retro con la palabra "Nicaragua" estampada al pecho en serigrafía de alta densidad y mangas verde bosque.',
    variants: [
      v('Verde', 550, TOP_SIZES, IN_STOCK, pick('top-nicaragua', ['default-2', 'default-4', 'default-3', 'default-1'])),
    ],
  },

  // ──────────────────────────────────────────
  // 5. COLECCIÓN TOTE BAGS (3 MODELOS OFICIALES DE INVENTARIO)
  // ──────────────────────────────────────────
  {
    id: 'tote-bunuelos',
    name: 'Tote Buñuelos (Tiras Rojas)',
    type: TOTE,
    collection: 'totebags',
    material: 'Lona cruda 100% algodón 32 × 35 cm • Asas rojas de alto contraste • Técnica DTF',
    description:
      'Bolso utilitario con la ilustración de Buñuelos en miel y asas rojas en contraste. Costuras reforzadas en cruz para libros, compras o viajes cortos.',
    variants: [
      v('Tiras rojas', 430, TOTE_SIZES, IN_STOCK, pick('bunuelos', ['tote-bag-1', 'tote-bag-2', 'tote-bag-3'])),
    ],
  },
  {
    id: 'tote-fauna-local',
    name: 'Tote Fauna Local',
    type: TOTE,
    collection: 'totebags',
    material: 'Lona cruda 100% algodón 32 × 35 cm • Impresión DTF de alta resistencia',
    description:
      'Guardabarranco y Chocoyo en vuelo estampados con nitidez y colores vibrantes sobre lona rústica natural.',
    variants: [
      v('Crema', 430, TOTE_SIZES, IN_STOCK, pick('fauna-local', ['tote-bag-1'])),
    ],
  },
  {
    id: 'tote-nicaragua',
    name: 'Tote Nicaragua',
    type: TOTE,
    collection: 'totebags',
    material: 'Lona cruda 100% algodón 32 × 35 cm • Asas largas para hombro',
    description:
      'Paisaje nicaragüense, volcanes y flor nacional en un bolso cómodo, durable y 100% reutilizable.',
    variants: [
      v('Crema', 430, TOTE_SIZES, IN_STOCK, pick('nicaragua', ['tote-bag-1'])),
    ],
  },
];

export const isAvailable = (variant) => variant.status === IN_STOCK;

export const productTitle = (product) => `${product.type} ${product.name}`;

/** Imágenes a mostrar para una variante (con fallback a la primera con fotos). */
export const variantImages = (product, variant) => {
  if (variant && variant.images && variant.images.length > 0) return variant.images;
  const withImages = product.variants.find((x) => x.images && x.images.length > 0);
  return withImages ? withImages.images : [];
};
