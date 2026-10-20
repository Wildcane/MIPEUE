import React from 'react';
import { MessageCircle, Film, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function Navbar({ products, activeIndex, onSelectProduct }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    '¡Hola MIPEUE! Vi el catálogo oficial del Mini Drop de Octubre y quiero consultar disponibilidad.'
  )}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cream/15 bg-forest/80 backdrop-blur-md transition-colors duration-500">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3.5 sm:px-8 lg:px-12">
        {/* Brand Identity */}
        <div className="flex items-center gap-4">
          <a
            href="#showcase"
            className="group flex items-baseline gap-1.5 text-white focus:outline-none"
          >
            <span className="font-editorial-title text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-cream sm:text-3xl">
              MiPEUE
            </span>
            <span className="hidden rounded-full border border-cream/25 bg-pine/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cream sm:inline-block">
              NICARAGUA
            </span>
          </a>
        </div>

        {/* Center Drop Switcher Pills */}
        <nav
          aria-label="Prendas del Mini Drop"
          className="hidden items-center gap-1 rounded-full border border-cream/15 bg-forest/90 p-1 lg:flex"
        >
          {products.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProduct(idx)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                  isActive
                    ? 'bg-cream text-forest shadow-sm'
                    : 'text-cream/75 hover:bg-cream/10 hover:text-white'
                }`}
              >
                {item.nombre}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Film Anchor + Direct WhatsApp */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="#lookbook"
            className="hidden items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-cream/80 transition-colors hover:text-white md:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5 text-cream" />
            <span>Archivo</span>
          </a>

          <a
            href="#mipeue-film"
            className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-pine/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-cream transition-all hover:border-cream/60 hover:bg-pine"
          >
            <Film className="h-3.5 w-3.5" />
            <span>MiPEUE Film</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-forest transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-forest" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
