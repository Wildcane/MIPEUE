import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';

const NAV = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Historia', href: '#historia' },
  { label: 'Políticas', href: '#politicas' },
  { label: 'FAQ', href: '#faq' },
];

export function CurrencySwitch({ className = '' }) {
  const { currency, setCurrency } = useStore();
  return (
    <div role="group" aria-label="Moneda" className={`flex items-center gap-2 label ${className}`}>
      {[
        { code: 'NIO', label: 'C$' },
        { code: 'USD', label: 'USD' },
      ].map((opt, i) => (
        <span key={opt.code} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => setCurrency(opt.code)}
            aria-pressed={currency === opt.code}
            className={`transition-opacity ${
              currency === opt.code ? 'underline decoration-1 underline-offset-[5px]' : 'opacity-45 hover:opacity-100'
            }`}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Header() {
  const { count, setCartOpen, setSizeGuideOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className="bg-forest text-cream">
        <p className="mx-auto max-w-[1440px] px-5 py-2 text-center label text-[10px] md:text-[11px]">
          Envíos a todo Nicaragua · Despachos hasta las 3:00 PM
        </p>
      </div>

      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-[76px] md:px-10">
          {/* Izquierda */}
          <nav aria-label="Principal" className="flex items-center gap-7">
            <button
              type="button"
              className="-ml-1 p-1 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="hidden label transition-opacity hover:opacity-60 lg:inline">
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="hidden label transition-opacity hover:opacity-60 lg:inline"
            >
              Guía de tallas
            </button>
          </nav>

          {/* Centro */}
          <a href="#inicio" aria-label="MiPEUE — inicio" className="flex items-center justify-center">
            <Logo variant="verde" className="h-11 w-auto md:h-[52px]" />
          </a>

          {/* Derecha */}
          <div className="flex items-center justify-end gap-4 md:gap-8">
            <CurrencySwitch />
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 label transition-opacity hover:opacity-60"
              aria-label={`Abrir pedido, ${count} prendas`}
            >
              <ShoppingBag className="h-[18px] w-[18px] md:hidden" strokeWidth={1.5} aria-hidden="true" />
              <span className="hidden md:inline">Pedido</span>
              <span className="tabular-nums">({count})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="flex h-16 items-center justify-between border-b border-ink/10 px-5">
            <Logo variant="verde" className="h-11 w-auto" />
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" className="p-1">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-5 pt-6" aria-label="Menú móvil">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink/10 py-5 font-display text-2xl font-extrabold uppercase tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSizeGuideOpen(true);
              }}
              className="border-b border-ink/10 py-5 text-left font-display text-2xl font-extrabold uppercase tracking-tight"
            >
              Guía de tallas
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
