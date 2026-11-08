const SOURCES = {
  verde: '/assets/brand/mipeue-logo-verde',
  crema: '/assets/brand/mipeue-logo-crema',
  negro: '/assets/brand/mipeue-logo-negro',
  blanco: '/assets/brand/mipeue-logo-blanco',
};

/** Logotipo oficial MiPEUE (PNG transparente con fallback). */
export default function Logo({ variant = 'verde', className = '' }) {
  const base = SOURCES[variant] || SOURCES.verde;
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img src={`${base}.png`} alt="MiPEUE" width="349" height="360" className={className} />
    </picture>
  );
}
