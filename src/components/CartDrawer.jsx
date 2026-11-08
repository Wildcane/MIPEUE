import { useState } from 'react';
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

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferencia bancaria');

  if (!isCartOpen) return null;

  const whatsappUrl = buildWhatsAppOrderUrl(cart, currency, deliveryAddress, paymentMethod);

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
              Bolsa de Pedido ({count})
            </h2>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="p-1 text-ink/70 hover:text-ink transition-colors cursor-pointer"
              aria-label="Cerrar pedido"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Listado de items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-ink/5">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <p className="text-sm text-ink/50">Tu bolsa está vacía.</p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink underline underline-offset-4 cursor-pointer"
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
                      {item.isPreorder ? ' · [Reserva 40%]' : ''}
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
                          className="px-2 py-0.5 text-ink/70 hover:text-ink transition-colors cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="px-2 py-0.5 text-ink/70 hover:text-ink transition-colors cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-ink/40 hover:text-ink/80 transition-colors p-1 cursor-pointer"
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

          {/* Checkout & Datos de Entrega */}
          {cart.length > 0 && (
            <div className="border-t border-ink/10 bg-cream p-6 space-y-4 max-h-[55vh] overflow-y-auto">
              {/* Campo de Dirección / Departamento */}
              <div className="space-y-1.5">
                <label htmlFor="delivery-address" className="label text-[10px] text-ink/70 block">
                  Dirección / Departamento de entrega:
                </label>
                <input
                  id="delivery-address"
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ej. Managua, Los Robles / León / Masaya..."
                  className="w-full border border-ink/20 bg-cream-soft px-3 py-2 text-xs text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
                />
              </div>

              {/* Selector de Método de Pago */}
              <div className="space-y-1.5">
                <span className="label text-[10px] text-ink/70 block">
                  Método de pago previsto:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Transferencia bancaria',
                    'Efectivo contra entrega',
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`px-2 py-1.5 text-[11px] font-medium border text-center transition-all cursor-pointer ${
                        paymentMethod === method
                          ? 'border-ink bg-ink text-cream'
                          : 'border-ink/20 text-ink/70 hover:border-ink/60'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leyenda visible obligatoria */}
              <div className="space-y-1 border-t border-ink/10 pt-3">
                <div className="flex items-center justify-between text-sm font-semibold text-ink">
                  <span>Total artículos:</span>
                  <span className="tabular-nums text-base">{formatPrice(subtotal, currency)}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-ink/60 pt-1">
                  * Tarifa total no incluye costo de envío (se cotiza según destino/departamento por CargoTrans o entrega local).
                </p>
              </div>

              {/* Botón WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-forest py-3.5 px-4 text-xs font-semibold uppercase tracking-widest text-cream transition-all hover:bg-forest-deep shadow-none"
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
