import { WHATSAPP_NUMBER } from '../data/store.js';

/** Tasa de referencia: C$ por 1 USD. */
export const EXCHANGE_RATE = 36.62;

export const CURRENCIES = {
  NIO: { code: 'NIO', label: 'C$' },
  USD: { code: 'USD', label: 'USD' },
};

/** Formatea un monto expresado en córdobas en la moneda seleccionada. */
export function formatPrice(amountNio, currency) {
  if (currency === 'USD') {
    const usd = amountNio / EXCHANGE_RATE;
    return `$${usd.toFixed(2)}`;
  }
  return `C$ ${Math.round(amountNio).toLocaleString('es-NI')}`;
}

export function buildWhatsAppOrderUrl(items, currency) {
  const lines = items.map((item) => {
    const details = [`Talla: ${item.size}`, `Color: ${item.color}`];
    if (item.fit) details.push(`Corte: ${item.fit}`);
    return `- ${item.qty}x ${item.title} (${details.join(', ')}) - ${formatPrice(item.price * item.qty, currency)}`;
  });
  const totalNio = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total =
    currency === 'USD'
      ? `${formatPrice(totalNio, 'USD')} USD (${formatPrice(totalNio, 'NIO')})`
      : formatPrice(totalNio, 'NIO');

  const text = [
    'Hola MiPEUE, me gustaría confirmar el siguiente pedido desde la web:',
    ...lines,
    `Total estimado: ${total}`,
    '¿Tienen disponibilidad para coordinar el envío?',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
