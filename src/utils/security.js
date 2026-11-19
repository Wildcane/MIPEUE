/**
 * Utilidades de seguridad, sanitización y reconciliación canónica para MiPEUE.
 */

/**
 * Congelamiento profundo recursivo contra alteraciones en runtime.
 */
export function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  Object.freeze(obj);
  Object.keys(obj).forEach((prop) => {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}

/**
 * Sanitizador de texto libre contra inyección de HTML, scripts y URLs externas.
 * Primero limpia etiquetas y amenazas; luego aplica el límite de caracteres sobre el contenido seguro.
 */
export function sanitizeUserInput(input, maxLength = 140) {
  if (typeof input !== 'string') return '';
  return input
    /* eslint-disable-next-line no-control-regex */
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/(https?:\/\/|www\.)[^\s]+/gi, '[enlace no permitido]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Reconciliador canónico de artículos del carrito.
 * Valida cada ítem contra el catálogo congelado inmutable.
 * Descarta automáticamente IDs inexistentes o manipulados y sobreescribe precios.
 */
export function resolveCanonicalCartItem(rawItem, catalogProducts) {
  if (!rawItem || typeof rawItem !== 'object' || !Array.isArray(catalogProducts)) return null;

  let prod = catalogProducts.find((p) => p.id === rawItem.productId);
  let colorId = rawItem.colorId;

  if (!prod && rawItem.id) {
    prod = catalogProducts.find(
      (p) => p.id === rawItem.id || rawItem.id.startsWith(`${p.id}-`)
    );
    if (prod && !colorId) {
      colorId = rawItem.id.replace(`${prod.id}-`, '');
    }
  }

  if (!prod) return null; // ID inválido o manipulado -> se descarta

  let variant = null;
  if (prod.colors && prod.colors.length > 0) {
    variant =
      prod.colors.find((c) => c.id === colorId) ||
      prod.colors.find((c) => c.id === prod.defaultColor) ||
      prod.colors[0];
  }

  const verifiedPrice = variant?.price ?? prod.price;
  if (typeof verifiedPrice !== 'number' || isNaN(verifiedPrice) || verifiedPrice <= 0) {
    return null;
  }

  const validSizes = Array.isArray(prod.sizes) && prod.sizes.length > 0 ? prod.sizes : ['Unitalla'];
  const sanitizedSize = typeof rawItem.size === 'string' && rawItem.size.trim()
    ? rawItem.size.trim()
    : validSizes[0];

  const colorLabel = variant?.label ? ` (${variant.label})` : '';
  const qty = Math.max(1, Math.min(99, parseInt(rawItem.qty, 10) || 1));

  return {
    key: `${prod.id}-${variant?.id || 'default'}-${sanitizedSize}`,
    id: `${prod.id}-${variant?.id || 'default'}`,
    productId: prod.id,
    colorId: variant?.id || 'default',
    name: `${prod.name}${colorLabel}`,
    size: sanitizedSize,
    price: verifiedPrice, // Precio canónico inmutable verificado
    image: variant?.image || prod.image,
    qty: qty
  };
}
