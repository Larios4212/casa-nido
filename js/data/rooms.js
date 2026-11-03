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
    description: 'Nuestra habitación más amplia: cama grande, sala propia y balcón con luz natural para descansar después de la playa.',
    capacity: 2, // TODO: confirmar con los dueños
    bed: 'Cama matrimonial', // TODO: confirmar
    price: 850,
    // Amenidades visibles en las fotos (A/C, sofá, balcón, caja fuerte); confirmar baño privado
    amenities: ['Balcón', 'Aire acondicionado', 'Sala con sofá', 'Caja fuerte', 'WiFi'],
    images: [
      { src: 'assets/img/rooms/suite-cachalote-1.jpg', alt: 'Suite Cachalote: cama con cobija oaxaqueña, sofá y balcón al fondo' },
      { src: 'assets/img/rooms/suite-cachalote-2.jpg', alt: 'Suite Cachalote: cama y espejo de cuerpo completo' },
      { src: 'assets/img/rooms/suite-cachalote-3.jpg', alt: 'Suite Cachalote: vista de la cama desde la entrada' },
      { src: 'assets/img/rooms/suite-cachalote-4.jpg', alt: 'Suite Cachalote: clóset de madera y salida al balcón' },
    ],
  },
  {
    id: 'privada',
    name: 'Habitación privada',
    type: 'private',
    tag: 'Privada',
    description: 'Luminosa y sencilla, con escritorio de madera y acceso a todas las áreas comunes de la casa.',
    capacity: 2, // TODO: confirmar
    bed: 'Cama matrimonial', // TODO: confirmar
    price: 600,
    // Visibles en las fotos: ventilador de techo, escritorio, clóset abierto
    amenities: ['Ventilador de techo', 'Escritorio', 'Clóset', 'WiFi'],
    images: [
      { src: 'assets/img/rooms/privada-1.jpg', alt: 'Habitación privada: cama matrimonial y tapete rojo' },
      { src: 'assets/img/rooms/privada-2.jpg', alt: 'Habitación privada: escritorio de madera con silla' },
      { src: 'assets/img/rooms/privada-3.jpg', alt: 'Habitación privada: cama con cobija azul' },
      { src: 'assets/img/rooms/privada-4.jpg', alt: 'Habitación privada: cama, repisas y espejo' },
      { src: 'assets/img/rooms/privada-5.jpg', alt: 'Habitación privada: repisas de madera y espejo' },
    ],
  },
  {
    id: 'dormitorio',
    name: 'Dormitorio hostal',
    type: 'dorm',
    tag: 'Mixto · 4 camas',
    description: 'Cama en dormitorio mixto de 4 camas con mucha luz: la opción ideal para gastar poco y conocer viajeros.',
    capacity: 4,
    bed: 'Literas individuales',
    price: 250,
    // Visibles en las fotos: A/C, lockers, repisa por cama
    amenities: ['Aire acondicionado', 'Locker personal', 'Repisa en cada cama', 'WiFi'],
    images: [
      { src: 'assets/img/rooms/dormitorio-1.jpg', alt: 'Dormitorio: dos literas, locker y ventanal' },
      { src: 'assets/img/rooms/dormitorio-2.jpg', alt: 'Dormitorio: litera junto a la ventana con cortinas' },
    ],
  },
];

export const ROOM_FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'private', label: 'Privadas' },
  { id: 'dorm', label: 'Dormitorios' },
];

export const findRoom = (id) => ROOMS.find((room) => room.id === id);
