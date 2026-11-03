/**
 * Carrusel ligero sobre scroll-snap nativo: el desplazamiento (dedo,
 * trackpad, teclado) lo hace el navegador; aquí solo se añaden flechas
 * y el contador "n / total". Usa delegación de eventos, así que funciona
 * con tarjetas renderizadas después.
 */
export function initCarousels(root = document) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-carousel] [data-step]');
    if (!button) return;
    const track = button.closest('[data-carousel]').querySelector('[data-track]');
    track.scrollBy({ left: Number(button.dataset.step) * track.clientWidth, behavior: 'smooth' });
  });

  root.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-track]');
    const count = carousel.querySelector('[data-count]');
    if (!count) return;
    const total = track.children.length;
    let frame;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(track.scrollLeft / track.clientWidth) + 1;
        count.textContent = `${Math.min(index, total)} / ${total}`;
      });
    }, { passive: true });
  });
}
