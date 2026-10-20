import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function HeroShowcase({
  products,
  activeIndex,
  setActiveIndex,
  direction,
  setDirection,
}) {
  const currentProduct = products[activeIndex];
  const nextIndex = (activeIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  // Track selected size per product
  const [selectedSizes, setSelectedSizes] = useState({
    cadejo: 'M',
    cegua: 'M',
    deacachimba: 'Unitalla',
    nicaragua: 'Unitalla',
  });

  // Track active model cutout variant (for Cadejo & La Cegua which have 2 real cutouts)
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  useEffect(() => {
    setActiveVariantIdx(0);
  }, [activeIndex]);

  const currentSize =
    selectedSizes[currentProduct.id] || currentProduct.tallas[0];

  const handleSizeSelect = (size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [currentProduct.id]: size,
    }));
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % products.length);
  }, [products.length, setActiveIndex, setDirection]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  }, [products.length, setActiveIndex, setDirection]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  const activeVariant =
    currentProduct.variantes?.[activeVariantIdx] ||
    currentProduct.variantes?.[0];

  const activeImage =
    activeVariant?.cutout || currentProduct.imagenPrincipal;

  const isSoldOut = currentProduct.estado.toLowerCase().includes('agotado');

  const whatsappMessage = isSoldOut
    ? `¡Hola MIPEUE! Me interesa la prenda *${currentProduct.nombre}* (${currentProduct.tema} - ${currentProduct.precio}) en talla *${currentSize}*. ¿Me podrían avisar cuando vuelva a estar disponible?`
    : `¡Hola MIPEUE! Quiero pedir la prenda *${currentProduct.nombre}* (${currentProduct.tema} - ${currentProduct.precio}) en talla *${currentSize}*.`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Horizontal slide variants towards the right
  const slideVariants = {
    enter: (dir) => ({
      x: dir >= 0 ? -90 : 90,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: dir >= 0 ? 110 : -110,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(6px)',
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const textSlideVariants = {
    enter: (dir) => ({
      x: dir >= 0 ? -48 : 48,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: dir >= 0 ? 48 : -48,
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="showcase"
      aria-label="Showcase de Prendas MIPEUE"
      className="relative min-h-screen w-full overflow-hidden pt-20 pb-10 flex flex-col justify-between transition-colors duration-700"
      style={{ backgroundColor: currentProduct.color }}
    >
      {/* Dynamic Animated Background Layer */}
      <motion.div
        key={`bg-${currentProduct.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: currentProduct.color }}
      >
        {/* Subtle Folkloric Mist / Texture from actual Canva drop */}
        <img
          src="/assets/products/smoke-1.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-auto opacity-20 mix-blend-screen select-none object-cover"
        />
        <img
          src="/assets/products/texture-overlay.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.09] mix-blend-overlay select-none"
        />
        {/* Nocturnal Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.46) 100%)',
          }}
        />
      </motion.div>

      {/* Giant Editorial Watermark Behind Model */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex justify-center overflow-hidden select-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.span
            key={`watermark-${currentProduct.id}`}
            custom={direction}
            initial={{ x: direction >= 0 ? -120 : 120, opacity: 0 }}
            animate={{ x: 0, opacity: 0.065 }}
            exit={{ x: direction >= 0 ? 120 : -120, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial-title whitespace-nowrap text-[22vw] font-bold uppercase tracking-tighter text-cream leading-none"
          >
            {currentProduct.nombre}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Main 3-Column Showcase Grid */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-5 pt-4 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12">
        {/* LEFT COLUMN: Editorial Drop Info, Mystical Copy, WhatsApp CTA & Navigation Arrows */}
        <div className="order-2 flex flex-col items-start justify-center lg:order-1 lg:col-span-4 xl:col-span-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`left-${currentProduct.id}`}
              custom={direction}
              variants={textSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* Editorial Drop & Status Badges */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 bg-black/25 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-cream">
                  <Sparkles className="h-3 w-3 text-cream" />
                  {currentProduct.tema}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    isSoldOut
                      ? 'border border-cream/40 bg-black/45 text-cream'
                      : 'border border-cream bg-cream text-forest'
                  }`}
                >
                  {isSoldOut ? (
                    <Clock className="h-3 w-3 text-cream" />
                  ) : (
                    <CheckCircle2 className="h-3 w-3 text-forest" />
                  )}
                  {currentProduct.estado}
                </span>
              </div>

              {/* Bold All-Caps Editorial Title */}
              <h1 className="font-editorial-title text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl xl:text-7xl">
                {currentProduct.nombre}
              </h1>

              {/* Subtitle / Mythological Motif */}
              <p className="mt-2.5 font-serif-accent text-xl italic text-cream/90 sm:text-2xl">
                {currentProduct.subtitulo}
              </p>

              {/* Mystical Editorial Description */}
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-cream/85 sm:text-[15px]">
                {currentProduct.descripcion}
              </p>

              {/* Garment Spec Sheet */}
              <div className="mt-5 space-y-1.5 border-l border-cream/30 pl-3.5 text-xs text-cream/80">
                <p className="font-medium text-white">{currentProduct.material}</p>
                <p>{currentProduct.corte}</p>
              </div>

              {/* Primary CTA: Pedir por WhatsApp + Navigation Arrows < > */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-forest transition-all duration-200 hover:bg-white active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4 fill-forest transition-transform group-hover:scale-110" />
                  <span>Pedir por WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Navigation Arrows < > */}
                <div
                  className="inline-flex items-center gap-2"
                  role="group"
                  aria-label="Controles de prenda anterior y siguiente"
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Prenda anterior"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-black/25 text-cream transition-all hover:border-cream hover:bg-cream hover:text-forest focus:outline-none focus:ring-2 focus:ring-cream"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Siguiente prenda"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-black/25 text-cream transition-all hover:border-cream hover:bg-cream hover:text-forest focus:outline-none focus:ring-2 focus:ring-cream"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Slide Counter & Drop Note */}
              <div className="mt-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/65">
                <span>
                  DROP 0{activeIndex + 1} / 0{products.length}
                </span>
                <span className="h-px w-8 bg-cream/25" />
                <span>EDICIÓN LIMITADA OCTUBRE</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER COLUMN: Floating Protagonist Garment with Realistic Depth Shadow */}
        <div className="order-1 relative flex flex-col items-center justify-center lg:order-2 lg:col-span-4 xl:col-span-5">
          {/* Subtle Arch Pedestal Frame Behind Model */}
          <div className="pointer-events-none absolute inset-x-8 top-4 bottom-8 mx-auto max-w-[380px] rounded-t-full border border-cream/15 bg-black/15" />

          <div className="relative flex h-[430px] sm:h-[520px] lg:h-[600px] w-full items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentProduct.id}-${activeVariantIdx}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative flex h-full w-full items-center justify-center"
              >
                <motion.img
                  src={activeImage}
                  alt={`${currentProduct.nombre} — ${currentProduct.tema}`}
                  className="garment-drop-shadow max-h-full w-auto max-w-full object-contain select-none"
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  draggable={false}
                />

                {/* Sold Out Editorial Stamp Overlay when Agotado Temporalmente */}
                {isSoldOut && (
                  <div className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cream/50 bg-black/75 px-5 py-1.5 backdrop-blur-md">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-cream">
                      AGOTADO TEMPORALMENTE
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Model Pose / Colorway Switcher (When garment has 2 real cutouts in the drop) */}
          {currentProduct.variantes && currentProduct.variantes.length > 1 && (
            <div className="relative z-20 mt-2 inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-black/35 p-1 backdrop-blur-md">
              <span className="pl-2.5 pr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 flex items-center gap-1">
                <Layers className="h-3 w-3" />
                Vista:
              </span>
              {currentProduct.variantes.map((v, vIdx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVariantIdx(vIdx)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                    activeVariantIdx === vIdx
                      ? 'bg-cream text-forest font-semibold'
                      : 'text-cream/80 hover:text-white'
                  }`}
                >
                  {v.etiqueta}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Price in Córdobas, Active Size Selector & Next Garment Miniature Preview */}
        <div className="order-3 flex flex-col justify-between gap-6 lg:col-span-4 xl:col-span-3 lg:items-end lg:text-right">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`right-${currentProduct.id}`}
              custom={direction}
              variants={textSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex w-full flex-col lg:items-end"
            >
              {/* Price Card / Display in Córdobas */}
              <div className="w-full rounded-2xl border border-cream/20 bg-black/25 p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-baseline justify-between lg:flex-col lg:items-end">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
                    PRECIO OFICIAL DROP
                  </span>
                  <div className="mt-1 font-editorial-title text-4xl font-bold tracking-tight text-white tabular-nums sm:text-5xl">
                    {currentProduct.precio}
                  </div>
                </div>

                <p className="mt-1.5 font-mono text-[11px] text-cream/70">
                  *Válido durante el Mini Drop de Octubre
                </p>

                {/* Interactive Size Selector */}
                <div className="mt-5 border-t border-cream/15 pt-4">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/80">
                      SELECCIONAR TALLA
                    </span>
                    <span className="font-mono text-[11px] text-cream">
                      Activa: <strong>{currentSize}</strong>
                    </span>
                  </div>

                  <div
                    className="flex flex-wrap gap-2 lg:justify-end"
                    role="radiogroup"
                    aria-label="Selector de talla"
                  >
                    {currentProduct.tallas.map((talla) => {
                      const isSelected = currentSize === talla;
                      return (
                        <button
                          key={talla}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => handleSizeSelect(talla)}
                          className={`min-w-[48px] rounded-xl border px-3.5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                            isSelected
                              ? 'border-cream bg-cream text-forest scale-[1.03]'
                              : 'border-cream/25 bg-black/20 text-cream hover:border-cream/60 hover:bg-cream/10'
                          }`}
                        >
                          {talla}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Corner: Interactive Miniature Preview of Next Garment */}
          <div className="w-full">
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Ver siguiente prenda: ${nextProduct.nombre}`}
              className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-cream/25 bg-black/30 p-3.5 text-left transition-all duration-300 hover:border-cream/65 hover:bg-black/45"
            >
              {/* Thumbnail Container */}
              <div
                className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cream/20 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: nextProduct.color }}
              >
                <img
                  src={nextProduct.imagenPrincipal}
                  alt={nextProduct.nombre}
                  className="h-full w-full object-contain pt-1"
                />
              </div>

              {/* Next Model Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
                  <span>SIGUIENTE PRENDA</span>
                  <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-1 truncate font-editorial-title text-xl font-bold uppercase tracking-wide text-white">
                  {nextProduct.nombre}
                </p>
                <p className="truncate text-xs text-cream/80">
                  {nextProduct.tema} ·{' '}
                  <span className="font-mono text-white">
                    {nextProduct.precio}
                  </span>
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Quick Drop Selector */}
      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-cream/15 px-5 pt-4 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          {products.map((prod, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                aria-label={`Ir a ${prod.nombre}`}
                className="group flex items-center gap-2 py-1 pr-2 focus:outline-none"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active
                      ? 'w-10 bg-cream'
                      : 'w-3 bg-cream/30 group-hover:bg-cream/60'
                  }`}
                />
                <span
                  className={`hidden font-mono text-[11px] uppercase tracking-[0.15em] sm:inline ${
                    active ? 'text-cream font-semibold' : 'text-cream/50'
                  }`}
                >
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/70">
          USA LAS FLECHAS <kbd className="rounded border border-cream/30 px-1.5 py-0.5 text-[10px]">←</kbd>{' '}
          <kbd className="rounded border border-cream/30 px-1.5 py-0.5 text-[10px]">→</kbd> PARA EXPLORAR EL DROP
        </p>
      </div>
    </section>
  );
}
