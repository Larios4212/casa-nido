/**
 * Configuración global del sitio.
 * Todo dato de negocio (contacto, horarios, moneda, políticas) vive aquí:
 * para cambiar la información no hace falta tocar componentes ni estilos.
 */
export const SITE = Object.freeze({
  name: 'Casa Nido',
  tagline: 'Un refugio cálido para descansar y conectar',
  city: 'Puerto Escondido',
  region: 'Oaxaca, México',
  address: 'Calle Tercera Pte. 702, Col. Juárez, C.P. 71984',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+Tercera+Pte.+702,+Ju%C3%A1rez,+71984+Puerto+Escondido,+Oax.',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Calle+Tercera+Pte.+702,+Ju%C3%A1rez,+71984+Puerto+Escondido,+Oax.&z=16&output=embed',

  contact: {
    email: 'hola@casanido.com',
    // Formato internacional sin "+" ni espacios (lo exige wa.me)
    whatsapp: '520000000000',
    whatsappDisplay: '+52 000 000 0000',
    instagram: 'https://instagram.com/casanido',
  },

  currency: { code: 'MXN', locale: 'es-MX' },

  schedule: {
    checkIn: '15:00',
    checkInUntil: '22:00',
    checkOut: '12:00',
    reception: '8:00 – 22:00',
  },

  booking: {
    maxNights: 30,
    maxGuests: 8,
    freeCancellationHours: 48,
  },

  policies: [
    { icon: 'clock', title: 'Check-in', text: 'Desde las 15:00 y hasta las 22:00.' },
    { icon: 'door', title: 'Check-out', text: 'Antes de las 12:00. Podemos guardar tu equipaje.' },
    { icon: 'shield', title: 'Cancelación', text: 'Gratis hasta 48 horas antes de tu llegada.' },
    { icon: 'info', title: 'Generales', text: 'WiFi gratis, recepción de 8:00 a 22:00 y espacios libres de humo.' },
  ],

  nav: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Habitaciones', href: '#habitaciones' },
    { label: 'Reservar', href: '#reservar' },
    { label: 'Ubicación', href: '#ubicacion' },
  ],
});
