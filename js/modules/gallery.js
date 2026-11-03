import { GALLERY } from '../data/gallery.js';
import { escapeHtml } from '../utils/format.js';

/** Mosaico de áreas comunes con visor ampliado en un <dialog> nativo. */
export function initGallery({ grid, viewer }) {
  if (!grid) return;

  grid.innerHTML = GALLERY.map((photo, i) => `
    <li class="gallery__item ${photo.wide ? 'gallery__item--wide' : ''}">
      <button type="button" class="gallery__button" data-index="${i}" aria-label="Ampliar: ${escapeHtml(photo.alt)}">
        <img src="${photo.src}" alt="${escapeHtml(photo.alt)}" loading="lazy" width="1024" height="683">
      </button>
    </li>`).join('');

  if (!viewer) return;
  const image = viewer.querySelector('[data-viewer-img]');
  const caption = viewer.querySelector('[data-viewer-caption]');
  let current = 0;

  const show = (index) => {
    current = (index + GALLERY.length) % GALLERY.length;
    image.src = GALLERY[current].src;
    image.alt = GALLERY[current].alt;
    caption.textContent = `${GALLERY[current].alt} · ${current + 1} / ${GALLERY.length}`;
  };

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-index]');
    if (!button) return;
    show(Number(button.dataset.index));
    viewer.showModal();
  });

  viewer.addEventListener('click', (event) => {
    const step = event.target.closest('[data-viewer-step]');
    if (step) return show(current + Number(step.dataset.viewerStep));
    if (event.target.closest('[data-close]') || event.target === viewer) viewer.close();
  });

  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'ArrowLeft') show(current - 1);
  });
}
