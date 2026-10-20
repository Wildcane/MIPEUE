import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function LookbookSection({ products, onSelectProduct }) {
  return (
    <section
      id="lookbook"
      aria-label="Archivo Editorial Mini Drop Octubre"
      className="relative w-full border-t border-cream/15 bg-pine py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-cream/15 pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-editorial-title text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              ARCHIVO EDITORIAL · DROP OCTUBRE
            </h2>
            <p className="mt-2 max-w-[56ch] text-sm text-cream/80 sm:text-base">
              Fotografía original de estudio del Mini Drop. Selecciona cualquier pieza para cargarla en el Showcase interactivo o pedirla directamente.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/75">
            4 PIEZAS DE COLECCIÓN · MANAGUA, NICARAGUA
          </span>
        </div>

        {/* 4-Piece Editorial Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item, idx) => {
            const isSoldOut = item.estado.toLowerCase().includes('agotado');
            const waText = `¡Hola MIPEUE! Me interesa la prenda *${item.nombre}* (${item.precio}) del Mini Drop de Octubre.`;
            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              waText
            )}`;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cream/20 transition-all duration-300 hover:border-cream/60"
                style={{ backgroundColor: item.color }}
              >
                {/* Studio Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/25">
                  <img
                    src={item.fotoEditorial}
                    alt={`${item.nombre} — ${item.tema}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Subtle Gradient Footer for readability */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0) 100%)',
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="rounded-full border border-cream/30 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
                      0{idx + 1} · {item.tema}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        isSoldOut
                          ? 'border border-cream/40 bg-black/75 text-cream'
                          : 'bg-cream text-forest'
                      }`}
                    >
                      {item.estado}
                    </span>
                  </div>

                  {/* Bottom Title inside Image */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-editorial-title text-2xl font-bold uppercase tracking-wide text-white">
                        {item.nombre}
                      </h3>
                      <p className="font-mono text-xs text-cream/85">
                        Tallas: {item.tallas.join(' · ')}
                      </p>
                    </div>
                    <span className="font-editorial-title text-2xl font-bold text-cream tabular-nums">
                      {item.precio}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 border-t border-cream/15 bg-black/30 p-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProduct(idx);
                      document
                        .getElementById('showcase')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:text-white"
                  >
                    <span>Ver en Showcase</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pedir ${item.nombre} por WhatsApp`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-forest transition-colors hover:bg-white"
                  >
                    <MessageCircle className="h-3 w-3 fill-forest" />
                    <span>Pedir</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
