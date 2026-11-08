// Datos de contacto y políticas — fuente: "Políticas de MiPEUE.docx".
export const WHATSAPP_NUMBER = '50583332316';
export const WHATSAPP_DISPLAY = '+505 8333-2316';

export const SOCIALS = [
  { label: 'Instagram', handle: '@mipeue', href: 'https://www.instagram.com/mipeue/' },
  { label: 'TikTok', handle: '@mipeue', href: 'https://www.tiktok.com/@mipeue' },
  { label: 'Facebook', handle: 'Mipeue', href: 'https://www.facebook.com/profile.php?id=61574461375308' },
  { label: 'WhatsApp', handle: WHATSAPP_DISPLAY, href: `https://wa.me/${WHATSAPP_NUMBER}` },
];

export const PICKUP_ADDRESS = 'El Cortijo de la Sierra, km 13 Carretera a Masaya, Nicaragua';

export const BUSINESS_HOURS = [
  ['Lunes a viernes', '8:00 AM – 6:00 PM'],
  ['Sábado', '10:00 AM – 3:00 PM'],
  ['Domingo', 'Cerrado'],
];

/** Cada bloque: título + lista de párrafos/puntos. */
export const POLICIES = [
  {
    id: 'envios',
    title: 'Envíos y entregas',
    items: [
      'Managua: entregas por motorizado, con pago adicional de delivery según la zona de entrega.',
      'Otros departamentos: envío por CargoTrans, con costo adicional.',
      'Para envíos dejanos el nombre de quien recibe, la dirección completa y un número de teléfono.',
      'El costo de delivery depende del lugar. Escribinos con tu ubicación y te confirmamos el monto exacto antes de cerrar el pedido.',
    ],
  },
  {
    id: 'pickup',
    title: 'Pick Up',
    items: [
      `Retiro en casa de la fundadora: ${PICKUP_ADDRESS}.`,
      'Lunes a viernes de 9:00 AM a 6:00 PM. Sábados solo por la mañana.',
    ],
  },
  {
    id: 'despacho',
    title: 'Horario de despacho',
    items: [
      'Pedidos confirmados y pagados antes de las 3:00 PM se procesan y entregan el mismo día.',
      'Toda orden recibida o pagada después de las 3:00 PM queda programada para el día siguiente. Tomalo en cuenta para planificar tus compras.',
    ],
  },
  {
    id: 'cambios',
    title: 'Cambios',
    items: [
      'Aceptamos cambios por talla o por defecto dentro de las 24 horas posteriores a la recepción de la prenda, sujetos a disponibilidad.',
      'Managua: avisanos por WhatsApp o DM dentro de las 24 horas. En un solo viaje el motorizado lleva la prenda nueva y recoge la anterior; ese delivery corre por tu cuenta, salvo defecto o error nuestro.',
      'Departamentos: avisanos con foto dentro de las 24 horas y enviá la prenda por CargoTrans en un plazo de 3 días hábiles. El envío de ida y vuelta corre por tu cuenta, salvo defecto o error nuestro.',
      'La prenda debe estar sin uso, sin lavar y con su empaque y etiquetas. En piezas con descuento el cambio es solo por talla o defecto, sin cambio de diseño.',
      'Cambios fuera de plazo o sin aviso previo no aplican.',
    ],
  },
  {
    id: 'defectos',
    title: 'Prendas con defecto',
    items: [
      'Escribinos de inmediato con fotos, o con un video abriendo el paquete si lo grabaste. Nosotros nos encargamos del cambio y de su costo.',
    ],
  },
  {
    id: 'pedidos',
    title: 'Pedidos',
    items: [
      'Para confirmar tu pedido necesitamos: diseño, talla y color de la prenda, nombre completo, número de celular y método de entrega.',
      'Si en las horas previas a la entrega se pierde toda comunicación, el pedido se cancela. Tené tu celular a mano el día de la entrega.',
      'Tote bags: lona de 32 × 35 cm con impresión DTF, que permite colores intensos y detalles finos.',
    ],
  },
];
