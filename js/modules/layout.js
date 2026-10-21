import { SITE } from '../config/site.js';
import { icon } from '../components/icons.js';

/** Inserta en el DOM los datos de contacto, navegación y políticas desde SITE. */
export function hydrateContent(root = document) {
  const text = {
    name: SITE.name,
    tagline: SITE.tagline,
    city: SITE.city,
    region: SITE.region,
    address: SITE.address,
    email: SITE.contact.email,
    whatsapp: SITE.contact.whatsappDisplay,
    checkIn: SITE.schedule.checkIn,
    checkOut: SITE.schedule.checkOut,
    year: String(new Date().getFullYear()),
  };
  root.querySelectorAll('[data-site]').forEach((el) => {
    el.textContent = text[el.dataset.site] ?? el.textContent;
  });

  const links = {
    maps: SITE.mapsUrl,
    email: `mailto:${SITE.contact.email}`,
    whatsapp: `https://wa.me/${SITE.contact.whatsapp}`,
    instagram: SITE.contact.instagram,
  };
  root.querySelectorAll('[data-site-link]').forEach((el) => {
    el.href = links[el.dataset.siteLink] ?? el.href;
  });

  root.querySelectorAll('[data-icon]').forEach((el) => {
    el.innerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 20);
  });

  root.querySelectorAll('[data-nav]').forEach((list) => {
    list.innerHTML = SITE.nav.map((item) =>
      `<li><a href="${item.href}">${item.label}</a></li>`).join('');
  });

  const policies = root.querySelector('[data-policies]');
  if (policies) {
    policies.innerHTML = SITE.policies.map((p) => `
      <article class="policy">
        <span class="policy__icon">${icon(p.icon, 22)}</span>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </article>`).join('');
  }
}

/** Header: sombra al hacer scroll + menú móvil accesible. */
export function initHeader(header) {
  if (!header) return;
  const toggle = header.querySelector('[data-menu-toggle]');
  const menu = header.querySelector('[data-menu]');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = icon(open ? 'close' : 'menu', 24);
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
  };

  toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}

/** Modal de contacto basado en <dialog> nativo (foco y Escape gratis). */
export function initContactDialog(dialog) {
  if (!dialog) return;
  document.querySelectorAll('[data-open-contact]').forEach((btn) =>
    btn.addEventListener('click', () => dialog.showModal()));
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  const form = dialog.querySelector('form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
    window.location.href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent('Contacto desde la web')}&body=${encodeURIComponent(body)}`;
    dialog.close();
    form.reset();
  });
}

/** Aparición suave de secciones; respeta prefers-reduced-motion vía CSS. */
export function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  items.forEach((el) => observer.observe(el));
}
