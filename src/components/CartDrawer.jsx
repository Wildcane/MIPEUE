import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import { formatPrice, buildWhatsAppOrderUrl } from '../lib/commerce.js';

export default function CartDrawer() {
  const {
    cart,
    count,
    subtotal,
    currency,
    isCartOpen,
    setCartOpen,
    updateQty,
    removeItem,
  } = useStore();

  if (!isCartOpen) return null;

  const whatsappUrl = buildWhatsAppOrderUrl(cart, currency);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-md bg-cream border-l border-ink/10 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
            <h2 id="cart-title" className="font-display text-lg font-bold uppercase tracking-tight text-ink">
              Pedido ({count})
            </h2>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="p-1 text-ink/70 hover:text-ink transition-colors"
              aria-label="Cerrar pedido"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Listado de items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-ink/5">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-sm text-ink/50">Tu pedido está vacío.</p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink underline underline-offset-4"
                >
                  Explorar catálogo
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.key} className="py-4 flex gap-4 items-center justify-between">
                  {/* Foto miniatura */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-16 object-cover bg-sand/30 shrink-0 border border-ink/10"
                  />

                  {/* Detalles */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-bold uppercase tracking-tight text-ink truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink/60 mt-0.5">
                      {item.color} · Talla: {item.size}
                      {item.fit ? ` · ${item.fit}` : ''}
                    </p>
                    <p className="text-xs font-semibold text-ink mt-1">
                      {formatPrice(item.price * item.qty, currency)}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-ink/20">
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="px-2 py-0.5 text-ink/70 hover:text-ink transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="px-2 py-0.5 text-ink/70 hover:text-ink transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-ink/40 hover:text-ink/80 transition-colors p-1"
                        title="Eliminar de la lista"
                        aria-label="Eliminar prenda"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito */}
          {cart.length > 0 && (
            <div className="border-t border-ink/10 bg-cream p-6 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm font-semibold text-ink">
                  <span>Subtotal estimado:</span>
                  <span className="tabular-nums text-base">{formatPrice(subtotal, currency)}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-ink/60 pt-1">
                  * Tarifa no incluye costo de envío. El cálculo final de entrega se coordinará por WhatsApp según tu departamento o zona.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-forest py-3.5 px-4 text-xs font-semibold uppercase tracking-widest text-cream transition-all hover:bg-forest-deep"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Confirmar Pedido por WhatsApp</span>
              </a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
