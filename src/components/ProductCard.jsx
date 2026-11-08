import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { COLOR_SWATCHES, isAvailable, productTitle, variantImages } from '../data/catalog.js';
import { formatPrice } from '../lib/commerce.js';

export default function ProductCard({ product }) {
  const { addItem } = useStore();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFit, setSelectedFit] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const variant = product.variants[selectedColorIndex] || product.variants[0];
  const images = variantImages(product, variant);
  const available = isAvailable(variant);

  const isLatestPreorder = Boolean(product.isLatest && variant.status === 'Agotado');

  useEffect(() => {
    setImageIndex(0);
    if (variant.sizes && variant.sizes.length > 0) {
      setSelectedSize(variant.sizes[0]);
    } else {
      setSelectedSize('');
    }
    if (variant.fits && variant.fits.length > 0) {
      setSelectedFit(variant.fits[0]);
    } else {
      setSelectedFit('');
    }
  }, [selectedColorIndex, variant]);

  const handleAddToCart = () => {
    if (!available && !isLatestPreorder) return;
    addItem({
      productId: product.id,
      title: productTitle(product),
      color: variant.color,
      size: selectedSize || (variant.sizes && variant.sizes[0]) || 'Unitalla',
      fit: selectedFit,
      price: variant.price,
      image: images[imageIndex] || images[0] || '/favicon.png',
      isPreorder: isLatestPreorder,
    });
  };

  const statusBadge = isLatestPreorder
    ? 'Agotado - Disponible en 2 semanas (Reserva con 40%)'
    : variant.status === 'Agotado'
    ? 'Agotado'
    : variant.status === 'No disponible temporalmente'
    ? 'No disponible temporalmente'
    : null;

  return (
    <article className="group flex flex-col justify-between border-b border-ink/5 pb-4">
      <div>
        {/* Imagen del Producto */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/30">
          {images.length > 0 ? (
            <img
              src={images[imageIndex] || images[0]}
              alt={`${product.name} - ${variant.color}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-ink/40">
              Fotografía en catálogo
            </div>
          )}

          {/* Badge de estado tipográfico sobrio */}
          {statusBadge && (
            <div
              className={`absolute left-3 top-3 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-cream max-w-[85%] ${
                isLatestPreorder ? 'bg-forest' : 'bg-ink/90'
              }`}
            >
              {statusBadge}
            </div>
          )}

          {/* Miniaturas de foto rápida */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(idx);
                  }}
                  className={`h-1.5 transition-all ${
                    imageIndex === idx ? 'w-5 bg-ink' : 'w-2 bg-ink/40 hover:bg-ink/70'
                  }`}
                  aria-label={`Ver foto ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info básica: Nombre y Precio dual */}
        <div className="mt-3.5 flex items-start justify-between gap-2">
          <div>
            <span className="label text-[9px] text-ink/50">{product.type}</span>
            <h3 className="font-display text-sm md:text-base font-bold uppercase tracking-tight text-ink">
              {product.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs md:text-sm font-bold tabular-nums text-ink">
              {formatPrice(variant.price, 'NIO')}
            </p>
            <p className="text-[10px] text-ink/60 tabular-nums">
              {formatPrice(variant.price, 'USD')} USD
            </p>
          </div>
        </div>

        {/* Descripción cultural y origen */}
        {product.description && (
          <p className="mt-2 text-xs leading-relaxed text-ink/70 line-clamp-3 hover:line-clamp-none transition-all">
            {product.description}
          </p>
        )}

        {/* Composición y Material */}
        {product.material && (
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-forest">
            {product.material}
          </p>
        )}

        {/* Selector de color interactivo */}
        {product.variants.length > 1 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-ink/50">Color:</span>
            <div className="flex items-center gap-1.5">
              {product.variants.map((vItem, idx) => {
                const swatchHex = COLOR_SWATCHES[vItem.color] || '#CCCCCC';
                const isSelected = selectedColorIndex === idx;
                return (
                  <button
                    key={vItem.color}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    title={`${vItem.color} (${vItem.status}) - C$ ${vItem.price}`}
                    className={`relative h-4 w-4 rounded-full border transition-all ${
                      isSelected
                        ? 'border-ink ring-1 ring-ink ring-offset-1 ring-offset-cream'
                        : 'border-ink/20 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: swatchHex }}
                  >
                    <span className="sr-only">{vItem.color}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] font-medium text-ink/80">{variant.color}</span>
          </div>
        )}

        {/* Selector de corte (Normal / Oversized) */}
        {variant.fits && variant.fits.length > 0 && (available || isLatestPreorder) && (
          <div className="mt-2 flex items-center gap-1 text-[10px] text-ink/70">
            <span className="uppercase tracking-wider text-ink/50">Corte:</span>
            {variant.fits.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFit(f)}
                className={`px-1.5 py-0.5 uppercase transition-all ${
                  selectedFit === f ? 'bg-ink text-cream font-semibold' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Selector de Tallas con opción 'Otra talla' */}
        {variant.sizes && variant.sizes.length > 0 && (available || isLatestPreorder) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1">
            <span className="text-[10px] uppercase tracking-wider text-ink/50 mr-1">Talla:</span>
            {variant.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`min-w-6 px-1.5 py-0.5 text-[10px] font-medium uppercase transition-colors ${
                  selectedSize === s
                    ? 'border border-ink bg-ink text-cream'
                    : 'border border-ink/20 text-ink/80 hover:border-ink hover:text-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Botón de Acción con Verde Corporativo */}
      <div className="mt-4 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!available && !isLatestPreorder}
          className={`w-full py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-all ${
            available
              ? 'bg-forest text-cream hover:bg-forest-deep shadow-none cursor-pointer'
              : isLatestPreorder
              ? 'bg-forest/90 text-cream hover:bg-forest cursor-pointer'
              : 'border border-ink/10 bg-sand/20 text-ink/40 cursor-not-allowed'
          }`}
        >
          {available
            ? 'Añadir a la bolsa'
            : isLatestPreorder
            ? 'Reservar con 40%'
            : statusBadge || 'Agotado'}
        </button>
      </div>
    </article>
  );
}
