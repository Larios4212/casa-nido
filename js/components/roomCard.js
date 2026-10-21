import { icon } from './icons.js';
import { formatPrice, escapeHtml } from '../utils/format.js';

const priceUnit = (room) => (room.type === 'dorm' ? 'por cama / noche' : 'por noche');

/** Plantilla de tarjeta de habitación. Componente puro: datos → HTML. */
export const roomCard = (room) => `
  <article class="room-card" data-type="${room.type}" data-room-id="${room.id}">
    <figure class="room-card__media">
      <img src="${room.image}" alt="${escapeHtml(room.name)}" loading="lazy" width="900" height="600">
      <span class="tag ${room.tag === 'Premium' ? 'tag--accent' : ''}">${escapeHtml(room.tag)}</span>
    </figure>

    <div class="room-card__body">
      <h3 class="room-card__title">${escapeHtml(room.name)}</h3>
      <p class="room-card__desc">${escapeHtml(room.description)}</p>

      <ul class="room-card__meta">
        <li>${icon('users', 18)} Hasta ${room.capacity} ${room.capacity === 1 ? 'persona' : 'personas'}</li>
        <li>${icon('bed', 18)} ${escapeHtml(room.bed)}</li>
      </ul>

      <ul class="room-card__amenities">
        ${room.amenities.map((a) => `<li>${icon('check', 16)} ${escapeHtml(a)}</li>`).join('')}
      </ul>

      <footer class="room-card__footer">
        <p class="room-card__price">
          <small>Desde</small>
          <strong>${formatPrice(room.price)}</strong>
          <small>${priceUnit(room)}</small>
        </p>
        <a class="btn btn--primary" href="#reservar" data-book-room="${room.id}">Reservar</a>
      </footer>
    </div>
  </article>
`;
