/**
 * Catálogo de habitaciones.
 * Fuente única de verdad: las tarjetas, el selector del formulario y el
 * cálculo de precio se generan a partir de este arreglo.
 *
 * type: 'private' | 'dorm'   → filtra las pestañas y define el cobro
 *   private: precio por habitación por noche
 *   dorm:    precio por cama (por persona) por noche
 */
export const ROOMS = [
  {
    id: 'suite-nido',
    name: 'Suite Nido',
    type: 'private',
    tag: 'Premium',
    description: 'Nuestra habitación más amplia, con cama king, baño privado con tina y vista al jardín.',
    capacity: 2,
    bed: 'Cama king',
    price: 1200,
    amenities: ['Baño privado con tina', 'Aire acondicionado', 'Ventilador de techo', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'doble-ac',
    name: 'Doble estándar A/C',
    type: 'private',
    tag: 'Privada con A/C',
    description: 'Habitación privada y fresca, ideal para parejas o amigos que buscan tranquilidad.',
    capacity: 2,
    bed: 'Cama matrimonial',
    price: 900,
    amenities: ['Aire acondicionado', 'Baño compartido', 'Ventilador de techo', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'doble',
    name: 'Doble estándar',
    type: 'private',
    tag: 'Privada',
    description: 'Sencilla, limpia y acogedora, con acceso a todas las áreas comunes de la casa.',
    capacity: 2,
    bed: 'Cama matrimonial',
    price: 700,
    amenities: ['Baño compartido', 'Ventilador de techo', 'WiFi', 'Áreas comunes'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'dorm-4-ac',
    name: 'Dormitorio 4 camas A/C',
    type: 'dorm',
    tag: 'Dorm con A/C',
    description: 'Dormitorio mixto con aire acondicionado, lockers y cortina de privacidad en cada cama.',
    capacity: 4,
    bed: 'Literas individuales',
    price: 300,
    amenities: ['Aire acondicionado', 'Locker personal', 'Lámpara y enchufe', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'dorm-4',
    name: 'Dormitorio 4 camas',
    type: 'dorm',
    tag: 'Tranquilo',
    description: 'Ambiente relajado para quien quiere descansar bien y gastar poco.',
    capacity: 4,
    bed: 'Literas individuales',
    price: 240,
    amenities: ['Ventilador personal', 'Locker personal', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'dorm-8',
    name: 'Dormitorio 8 camas',
    type: 'dorm',
    tag: 'Social',
    description: 'El corazón social de la casa: perfecto para conocer viajeros de todo el mundo.',
    capacity: 8,
    bed: 'Literas individuales',
    price: 210,
    amenities: ['Ventilador personal', 'Locker personal', 'WiFi', 'Ambiente social'],
    image: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?w=900&q=70&auto=format&fit=crop',
  },
];

export const ROOM_FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'private', label: 'Privadas' },
  { id: 'dorm', label: 'Dormitorios' },
];

export const findRoom = (id) => ROOMS.find((room) => room.id === id);
