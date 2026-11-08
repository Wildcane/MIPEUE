import { WHATSAPP_NUMBER } from '../data/store.js';

/** Tasa de referencia: C$ por 1 USD. */
export const EXCHANGE_RATE = 36.62;

export const CURRENCIES = {
  NIO: { code: 'NIO', label: 'C$' },
  USD: { code: 'USD', label: 'USD' },
};

/** Formatea un monto expresado en córdobas en la moneda seleccionada. */
export function formatPrice(amountNio, currency = 'NIO') {
  if (currency === 'USD') {
    const usd = amountNio / EXCHANGE_RATE;
    return `$${usd.toFixed(2)}`;
  }
  return `C$ ${Math.round(amountNio).toLocaleString('es-NI')}`;
}

/**
 * Generador de mensaje estructurado de WhatsApp según especificación oficial.
 */
export function buildWhatsAppOrderUrl(
  items,
  currency = 'NIO',
  deliveryAddress = '',
  paymentMethod = 'Transferencia bancaria',
) {
  const lines = items.map((item) => {
    const preorderNote = item.isPreorder ? ' [Reserva 40%]' : '';
    const fitNote = item.fit ? ` - ${item.fit}` : '';
    const formattedPrice = formatPrice(item.price * item.qty, currency);
    return `- ${item.qty}x ${item.title}${preorderNote} | Color: ${item.color} | Talla: ${item.size}${fitNote} | Precio: ${formattedPrice}`;
  });

  const totalNio = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalFormatted = formatPrice(totalNio, currency);
  const addressFormatted = deliveryAddress.trim() || 'A coordinar con el asesor por WhatsApp';

  const text = [
    'Hola MiPEUE, quiero realizar el siguiente pedido:',
    ...lines,
    `Total artículos: ${totalFormatted} (Envío pendiente de cotizar)`,
    `Dirección de entrega: ${addressFormatted}`,
    `Método de pago previsto: ${paymentMethod}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
