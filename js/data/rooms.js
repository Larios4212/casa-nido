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
    id: 'suite-cachalote',
    name: 'Suite Cachalote',
    type: 'private',
    tag: 'Premium',
    description: 'Nuestra habitación más amplia y especial, pensada para descansar en grande después de un día de playa.',
    capacity: 2, // TODO: confirmar con los dueños
    bed: 'Cama matrimonial', // TODO: confirmar
    price: 850,
    amenities: ['Baño privado', 'Ventilador', 'WiFi', 'Ropa de cama y toallas'], // TODO: confirmar
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'privada',
    name: 'Habitación privada',
    type: 'private',
    tag: 'Privada',
    description: 'Tu propio espacio, sencillo y acogedor, con acceso a todas las áreas comunes de la casa.',
    capacity: 2, // TODO: confirmar
    bed: 'Cama matrimonial', // TODO: confirmar
    price: 600,
    amenities: ['Ventilador', 'WiFi', 'Ropa de cama', 'Áreas comunes'], // TODO: confirmar
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=70&auto=format&fit=crop',
  },
  {
    id: 'dormitorio',
    name: 'Dormitorio hostal',
    type: 'dorm',
    tag: 'Social',
    description: 'Cama en dormitorio compartido: la opción ideal para viajeros que quieren gastar poco y conocer gente.',
    capacity: 6, // TODO: confirmar número de camas
    bed: 'Literas individuales',
    price: 250,
    amenities: ['Locker personal', 'Ventilador', 'WiFi', 'Ambiente social'], // TODO: confirmar
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=70&auto=format&fit=crop',
  },
];

export const ROOM_FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'private', label: 'Privadas' },
  { id: 'dorm', label: 'Dormitorios' },
];

export const findRoom = (id) => ROOMS.find((room) => room.id === id);
