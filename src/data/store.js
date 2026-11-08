// Datos de contacto, historia, FAQ y políticas oficiales MiPEUE.
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

export const ABOUT_US = {
  title: 'Nuestra Historia / Quiénes Somos',
  badge: 'Diseño de Autor Nicaragüense',
  paragraphs: [
    'MiPEUE es una marca de moda textil e ilustración contemporánea nacida en Nicaragua de la mano de Meysi, ilustradora y diseñadora. Lo que inició como una pequeña iniciativa artesanal de tote bags hechos a mano se transformó en un proyecto editorial de autor que busca romper con los estereotipos comerciales y las convenciones del souvenir tradicional.',
    'Cada una de nuestras piezas es concebida como el grabado de un libro antiguo: leyendas, mitos coloniales, tradiciones culinarias y símbolos autóctonos reinterpretados bajo una estética sobria, minimalista y elegante. Creemos en una cultura viva que no se queda en vitrinas, sino que se lleva puesta con orgullo en la cotidianidad.',
    'Producimos bajo estándares textiles rigurosos con 100% algodón peinado, serigrafía de alta densidad y técnica DTF sobre lonas crudas, celebrando la identidad nacional con autenticidad y sofisticación artesanal.',
  ],
};

export const POLICIES = [
  {
    id: 'entregas-envios',
    title: 'Políticas de Entrega y Envíos',
    items: [
      'Managua: Entregas directas mediante servicio de motorizado privado. El costo se cotiza según tu zona exacta antes de despachar.',
      'Opción Pick Up: Retiro sin costo en El Cortijo de la Sierra, km 13 Carretera a Masaya (previa coordinación de horario de lunes a sábado).',
      'Departamentos de Nicaragua: Despachos seguros a través de CargoTrans a domicilio o sucursal. El costo se liquida según la tarifa oficial de encomienda.',
      'Horario límite de despacho: Órdenes confirmadas y pagadas antes de las 3:00 PM se procesan y entregan el mismo día en Managua; pedidos posteriores pasan al día hábil siguiente.',
    ],
  },
  {
    id: 'cambios-devoluciones',
    title: 'Políticas de Cambios y Devoluciones',
    items: [
      'Lapso estricto de 24 horas: Disponés de hasta 24 horas continuas tras recibir tu pedido para notificar reclamos de talla o defecto de fábrica vía WhatsApp.',
      'Condiciones de la prenda: Debe entregarse físicamente sin uso, sin lavar, sin olores y conservando sus etiquetas y empaques originales.',
      'Piezas de igual valor: Los cambios aplican por talla o por otra prenda de igual valor, sujetos a disponibilidad de inventario.',
      'Logística de cambio en Managua: El motorizado entrega la nueva pieza y recoge la anterior en un solo viaje (costo de delivery a cargo del cliente, salvo error comprobado de MiPEUE).',
      'Logística en Departamentos: Notificación en 24h y hasta 3 días hábiles para enviar la prenda por CargoTrans.',
    ],
  },
  {
    id: 'defectos-garantia',
    title: 'Garantía por Defecto de Fábrica',
    items: [
      'Si una prenda presenta alguna imperfección de costura o serigrafía, envianos fotos o video de desempaque de inmediato. MiPEUE asume el 100% de los costos de envío y reemplazo.',
    ],
  },
];

export const FAQS = [
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer:
      'Aceptamos Transferencia bancaria (cuentas nacionales BAC, Banpro y Lafise) y Efectivo contra entrega exclusivamente para la ciudad de Managua al recibir con el motorizado.',
  },
  {
    question: '¿Cuáles son los tiempos estimados de entrega?',
    answer:
      'En Managua, pedidos pagados antes de las 3:00 PM se entregan el mismo día. A departamentos vía CargoTrans, el plazo habitual de recepción es de 24 a 48 horas hábiles tras el despacho.',
  },
  {
    question: '¿Cómo funcionan las reservas de productos agotados?',
    answer:
      'Si un diseño de la última colección figura con la etiqueta "Agotado - Disponible en 2 semanas (Reserva con 40%)", podés asegurar tu pieza abonando el 40% del valor total mediante transferencia y cancelando el 60% restante al momento de la entrega.',
  },
  {
    question: '¿Cómo puedo solicitar una talla especial ("Otra talla")?',
    answer:
      'Al seleccionar la opción "Otra talla" en la ficha de producto y confirmar tu pedido por WhatsApp, nuestro equipo te asesorará para confeccionar o reservar la talla específica que necesitás.',
  },
];
