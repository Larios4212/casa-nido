import { ROOMS, ROOM_FILTERS } from '../data/rooms.js';
import { roomCard } from '../components/roomCard.js';

/**
 * Renderiza el listado de habitaciones y sus filtros (pestañas accesibles).
 * Al pulsar "Reservar" emite el evento `room:select` para desacoplarse
 * del módulo de reservas.
 */
export function initRooms({ grid, filters }) {
  if (!grid) return;

  grid.innerHTML = ROOMS.map(roomCard).join('');

  if (filters) {
    filters.innerHTML = ROOM_FILTERS.map((f, i) => `
      <button type="button" role="tab" class="chip" data-filter="${f.id}"
              aria-selected="${i === 0}">${f.label}</button>
    `).join('');

    filters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      applyFilter(button.dataset.filter);
    });
  }

  function applyFilter(filter) {
    filters?.querySelectorAll('[data-filter]').forEach((btn) => {
      btn.setAttribute('aria-selected', String(btn.dataset.filter === filter));
    });
    grid.querySelectorAll('.room-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.type !== filter;
    });
  }

  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-book-room]');
    if (!trigger) return;
    document.dispatchEvent(new CustomEvent('room:select', {
      detail: { roomId: trigger.dataset.bookRoom },
    }));
  });
}
