/**
 * Punto de entrada. Solo orquesta: cada módulo es independiente
 * y se comunica con los demás mediante eventos del DOM.
 */
import { hydrateContent, initHeader, initContactDialog, initReveal } from './modules/layout.js';
import { initRooms } from './modules/rooms.js';
import { initBooking } from './modules/booking.js';

document.documentElement.classList.add('js');

hydrateContent();
initHeader(document.querySelector('[data-header]'));
initRooms({
  grid: document.querySelector('[data-rooms-grid]'),
  filters: document.querySelector('[data-rooms-filters]'),
});
initBooking(document.querySelector('[data-booking-form]'));
initContactDialog(document.querySelector('[data-contact-dialog]'));
initReveal();
