const HERO_IMAGES = [
  { src: '/assets/catalog/cadejo/blanco-2.webp', alt: 'Modelo con camiseta Cadejo blanca — Mitos de la Noche' },
  { src: '/assets/catalog/la-cegua/default-2.webp', alt: 'Modelo con camiseta La Cegua negra — Mitos de la Noche' },
];

export default function Hero() {
  return (
    <section id="inicio" aria-label="MiPEUE">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {HERO_IMAGES.map((image, i) => (
          <div key={image.src} className={`relative bg-sand ${i > 0 ? 'hidden md:block' : ''}`}>
            <img
              src={image.src}
              alt={image.alt}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="h-[78vh] max-h-[880px] min-h-[460px] w-full object-cover object-[50%_25%]"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-20 pt-10 md:grid-cols-12 md:px-10 md:pb-28 md:pt-14">
        <div className="md:col-span-7">
          <p className="label mb-5 text-forest">Mitos de la Noche — Edición limitada</p>
          <h1 className="font-display text-[13vw] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] md:text-[6.2vw] xl:text-[88px]">
            Cultura nica
            <br />
            que se lleva
            <br />
            puesta
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-4 md:col-start-9">
          <p className="max-w-sm text-[15px] leading-relaxed text-ink/75">
            Camisetas, tops y tote bags ilustrados a mano con nuestras leyendas, sabores y símbolos. Diseñado y
            hecho en Nicaragua.
          </p>
          <a href="#catalogo" className="label text-link self-start">
            Ver catálogo
          </a>
        </div>
      </div>
    </section>
  );
}
