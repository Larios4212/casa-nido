import { SITE } from '../config/site.js';
import { ROOMS, findRoom } from '../data/rooms.js';
import { formatPrice, pluralize } from '../utils/format.js';
import { toISODate, parseISODate, addDays, nightsBetween, formatLongDate } from '../utils/date.js';

/**
 * Cotización pura (sin DOM) → fácil de probar y de reutilizar si mañana
 * se conecta un motor de reservas real o una API.
 *   private: se necesitan ceil(huéspedes / capacidad) habitaciones
 *   dorm:    se cobra una cama por huésped
 */
export function quote({ roomId, checkIn, checkOut, guests }) {
  const room = findRoom(roomId);
  if (!room || !checkIn || !checkOut || !guests) return null;

  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1) return null;

  const units = room.type === 'dorm' ? guests : Math.ceil(guests / room.capacity);
  const unitLabel = room.type === 'dorm'
    ? pluralize(units, 'cama')
    : pluralize(units, 'habitación', 'habitaciones');

  return { room, nights, guests, units, unitLabel, total: room.price * units * nights };
}

export function validate(data) {
  const errors = {};
  const today = toISODate(new Date());

  if (!data.checkIn) errors.checkIn = 'Elige tu fecha de llegada.';
  else if (data.checkIn < today) errors.checkIn = 'La llegada no puede ser en el pasado.';

  if (!data.checkOut) errors.checkOut = 'Elige tu fecha de salida.';
  else if (data.checkIn && data.checkOut <= data.checkIn) errors.checkOut = 'La salida debe ser posterior a la llegada.';
  else if (data.checkIn && nightsBetween(data.checkIn, data.checkOut) > SITE.booking.maxNights) {
    errors.checkOut = `Para estancias de más de ${SITE.booking.maxNights} noches escríbenos directamente.`;
  }

  if (!data.guests || data.guests < 1) errors.guests = 'Indica cuántas personas viajan.';

  const room = findRoom(data.roomId);
  if (!room) errors.roomId = 'Selecciona una habitación.';
  else if (room.type === 'dorm' && data.guests > room.capacity) {
    errors.guests = `Este dormitorio tiene ${room.capacity} camas como máximo.`;
  }

  if (!data.name?.trim()) errors.name = 'Dinos tu nombre.';

  return errors;
}

function buildMessage(q, data) {
  return [
    `¡Hola ${SITE.name}! Quiero consultar disponibilidad:`,
    '',
    `• Nombre: ${data.name.trim()}`,
    `• Habitación: ${q.room.name}`,
    `• Llegada: ${formatLongDate(data.checkIn, SITE.currency.locale)}`,
    `• Salida: ${formatLongDate(data.checkOut, SITE.currency.locale)}`,
    `• Huéspedes: ${q.guests}`,
    `• ${pluralize(q.nights, 'noche')} · ${q.unitLabel}`,
    `• Total estimado: ${formatPrice(q.total)}`,
    data.notes?.trim() ? `• Comentarios: ${data.notes.trim()}` : null,
  ].filter((line) => line !== null).join('\n');
}

export function initBooking(form) {
  if (!form) return;

  const fields = {
    checkIn: form.elements.checkIn,
    checkOut: form.elements.checkOut,
    guests: form.elements.guests,
    roomId: form.elements.roomId,
    name: form.elements.name,
    notes: form.elements.notes,
  };
  const summary = form.querySelector('[data-summary]');
  const emailButton = form.querySelector('[data-send-email]');

  // --- Estado inicial ---------------------------------------------------
  const today = new Date();
  fields.checkIn.min = toISODate(today);
  fields.checkIn.value = toISODate(today);
  fields.checkOut.min = toISODate(addDays(today, 1));
  fields.checkOut.value = toISODate(addDays(today, 2));

  fields.guests.innerHTML = Array.from({ length: SITE.booking.maxGuests }, (_, i) =>
    `<option value="${i + 1}">${pluralize(i + 1, 'adulto')}</option>`).join('');
  fields.guests.value = '2';

  fields.roomId.innerHTML = `
    <option value="">Elige una opción</option>
    <optgroup label="Habitaciones privadas">
      ${ROOMS.filter((r) => r.type === 'private').map(optionFor).join('')}
    </optgroup>
    <optgroup label="Dormitorios compartidos">
      ${ROOMS.filter((r) => r.type === 'dorm').map(optionFor).join('')}
    </optgroup>`;

  function optionFor(room) {
    const unit = room.type === 'dorm' ? '/cama' : '/noche';
    return `<option value="${room.id}">${room.name} — ${formatPrice(room.price)}${unit}</option>`;
  }

  // --- Lectura y render -------------------------------------------------
  const read = () => ({
    checkIn: fields.checkIn.value,
    checkOut: fields.checkOut.value,
    guests: Number(fields.guests.value),
    roomId: fields.roomId.value,
    name: fields.name.value,
    notes: fields.notes.value,
  });

  function showErrors(errors, onlyTouched = false) {
    Object.entries(fields).forEach(([key, input]) => {
      const message = errors[key] ?? '';
      const visible = onlyTouched && !input.dataset.touched ? '' : message;
      const slot = form.querySelector(`[data-error-for="${key}"]`);
      if (slot) slot.textContent = visible;
      input.setAttribute('aria-invalid', String(Boolean(visible)));
    });
  }

  function renderSummary() {
    const q = quote(read());
    if (!q) {
      summary.innerHTML = `<p class="summary__empty">Elige fechas y habitación para ver el total estimado.</p>`;
      return;
    }
    summary.innerHTML = `
      <p class="summary__room">${q.room.name}</p>
      <dl class="summary__list">
        <div><dt>${formatPrice(q.room.price)} × ${q.unitLabel} × ${pluralize(q.nights, 'noche')}</dt>
             <dd>${formatPrice(q.total)}</dd></div>
      </dl>
      <p class="summary__total"><span>Total estimado</span><strong>${formatPrice(q.total)}</strong></p>
      <p class="summary__note">Tarifa de referencia. Confirmamos disponibilidad y precio final al responderte.</p>`;
  }

  function syncCheckOutMin() {
    const checkIn = parseISODate(fields.checkIn.value);
    if (!checkIn) return;
    const minOut = toISODate(addDays(checkIn, 1));
    fields.checkOut.min = minOut;
    if (fields.checkOut.value <= fields.checkIn.value) fields.checkOut.value = minOut;
  }

  // --- Eventos ----------------------------------------------------------
  form.addEventListener('input', (event) => {
    if (event.target === fields.checkIn) syncCheckOutMin();
    event.target.dataset.touched = 'true';
    showErrors(validate(read()), true);
    renderSummary();
  });

  document.addEventListener('room:select', ({ detail }) => {
    fields.roomId.value = detail.roomId;
    fields.roomId.dataset.touched = 'true';
    renderSummary();
    // Esperar al scroll del ancla antes de enfocar
    setTimeout(() => fields.checkIn.focus({ preventScroll: true }), 400);
  });

  function submit(channel) {
    const data = read();
    const errors = validate(data);
    Object.values(fields).forEach((input) => { input.dataset.touched = 'true'; });
    showErrors(errors);

    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      fields[firstInvalid].focus();
      return;
    }

    const message = buildMessage(quote(data), data);
    const url = channel === 'email'
      ? `mailto:${SITE.contact.email}?subject=${encodeURIComponent(`Reserva — ${data.name.trim()}`)}&body=${encodeURIComponent(message)}`
      : `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submit('whatsapp');
  });
  emailButton?.addEventListener('click', () => submit('email'));

  renderSummary();
}
