import React from 'react';
import { MessageCircle, ArrowUpRight, MapPin } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    '¡Hola MIPEUE! Quiero hacer un pedido del Mini Drop de Octubre.'
  )}`;

  return (
    <footer className="border-t border-cream/15 bg-forest text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          {/* Brand Statement */}
          <div className="md:col-span-6">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-cream/70">
              CULTURA POPULAR · MITOLOGÍA · CALLE
            </span>
            <h2 className="mt-2 font-editorial-title text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              MiPEUE NICARAGUA
            </h2>
            <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-cream/80">
              Un emprendimiento joven que rescata la tradición, los mitos nocturnos y el arte popular nicaragüense a través de la moda contemporánea.
            </p>
          </div>

          {/* Direct Contact & Location */}
          <div className="flex flex-col items-start gap-4 md:col-span-6 md:items-end md:text-right">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cream/80">
              <MapPin className="h-3.5 w-3.5 text-cream" />
              <span>Managua, Nicaragua · Envíos Nacionales</span>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-forest transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4 fill-forest" />
              <span>Atención directa · +505 8333-2316</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60 sm:flex-row">
          <span>© {new Date().getFullYear()} MIPEUE · TODOS LOS DERECHOS RESERVADOS</span>
          <span>MINI DROP OCTUBRE · EDICIÓN COLECCIONABLE</span>
        </div>
      </div>
    </footer>
  );
}
