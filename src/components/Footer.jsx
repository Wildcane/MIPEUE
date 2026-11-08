import Logo from './Logo.jsx';
import { SOCIALS, PICKUP_ADDRESS, BUSINESS_HOURS, WHATSAPP_DISPLAY } from '../data/store.js';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream-soft text-ink pt-16 pb-12">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-ink/10">
          {/* Logo & Marca */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="verde" className="h-14 w-auto" />
            <p className="text-xs text-ink/70 leading-relaxed max-w-xs">
              MiPEUE — Piezas textiles con identidad nicaragüense. Arte serigráfico, grabado e ilustración botánica y legendaria.
            </p>
          </div>

          {/* Ubicación y Horarios */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="label text-forest">Pick Up & Contacto</h4>
            <p className="text-xs text-ink/80 leading-relaxed">
              <strong className="text-ink">Punto de Retiro:</strong><br />
              {PICKUP_ADDRESS}
            </p>
            <div className="pt-2 text-xs text-ink/70 space-y-1">
              <p className="font-semibold text-ink">Horario de atención:</p>
              {BUSINESS_HOURS.map(([days, hours], idx) => (
                <p key={idx} className="flex justify-between max-w-xs">
                  <span>{days}</span>
                  <span className="font-medium text-ink">{hours}</span>
                </p>
              ))}
            </div>
            <p className="text-xs text-ink/80 pt-1">
              WhatsApp de ventas: <span className="font-semibold">{WHATSAPP_DISPLAY}</span>
            </p>
          </div>

          {/* Redes Sociales */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="label text-forest">Redes Sociales</h4>
            <ul className="space-y-2 text-xs">
              {SOCIALS.map((soc) => (
                <li key={soc.label}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-ink/80 hover:text-forest transition-colors"
                  >
                    <span className="font-semibold uppercase tracking-wider">{soc.label}:</span>
                    <span>{soc.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Créditos y Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-ink/60">
          <p>© {new Date().getFullYear()} MiPEUE. Todos los derechos reservados. Managua, Nicaragua.</p>
          <p className="tracking-wide">
            Desarrollado por <span className="text-ink font-semibold">Cristian Wildcane</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
