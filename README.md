# Casa Nido: habitaciones y reservas

Página de habitaciones con reserva directa (inspirada en la estructura de casonahostel.com/habitaciones).
Es HTML, CSS y JavaScript con módulos ES nativos. No usa frameworks ni necesita compilarse: se sube tal cual a cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel).

## Cómo correrlo

```bash
npm run dev     # http://localhost:4321
npm test        # pruebas de la lógica de reservas
```

> Los módulos ES no cargan si abres `index.html` con doble clic (`file://`). Usa un servidor local, por ejemplo `npm run dev` o `python3 -m http.server`.

## Arquitectura

```
casa-nido/
├── index.html                 # Marcado semántico; el contenido dinámico usa data-attributes
├── css/
│   ├── main.css               # Punto de entrada; ordena la cascada con @layer
│   ├── tokens.css             # Design tokens: colores, tipografía, espaciado, sombras
│   ├── base.css               # Reset, tipografía base y accesibilidad (focus, skip-link)
│   ├── layout.css             # Contenedor, secciones, header y footer
│   ├── sections.css           # Hero, habitaciones, reservar y CTA
│   ├── utilities.css          # Helpers (reveal, no-scroll, visually-hidden)
│   └── components/            # Botones, formularios, tarjetas, modal
├── js/
│   ├── main.js                # Orquestador: solo inicializa módulos
│   ├── config/site.js         # ⚙️ Datos del negocio: contacto, horarios, moneda, políticas
│   ├── data/rooms.js          # ⚙️ Catálogo de habitaciones (fuente única de verdad)
│   ├── components/            # Plantillas puras (datos → HTML): roomCard, icons
│   ├── modules/               # Comportamiento: rooms, booking, layout
│   └── utils/                 # Funciones puras: formato de moneda y fechas
├── assets/img/                # Logo, favicon y fotos propias
└── tests/                     # Pruebas con node:test (sin dependencias)
```

### Principios

- **Separar contenido y código.** Para editar textos, precios, teléfono o políticas solo se tocan `js/config/site.js` y `js/data/rooms.js`.
- **Una sola fuente de verdad.** Las tarjetas, el selector del formulario y el cálculo del total salen del mismo arreglo `ROOMS`.
- **Lógica pura y probable.** `quote()` y `validate()` no usan el DOM, así que se prueban en Node. Si más adelante se conecta un motor de reservas (Cloudbeds, Little Hotelier, una API propia), solo se reemplaza el envío en `booking.js`.
- **Módulos desacoplados.** Las tarjetas emiten el evento `room:select`; el formulario lo escucha. Ningún módulo importa al otro.
- **Accesibilidad.** Etiquetas reales, `aria-invalid`, errores con `aria-live`, `<dialog>` nativo, skip-link, foco visible y `prefers-reduced-motion`.
- **Rendimiento.** Cero dependencias JS, imágenes con `loading="lazy"` y fuentes con `display=swap`.

## Flujo de reserva

1. El huésped elige una habitación (desde su tarjeta o desde el selector), las fechas y el número de huéspedes.
2. El resumen calcula el total estimado en vivo:
   - **Privadas:** `precio × habitaciones necesarias × noches`
   - **Dormitorios:** `precio × camas (una por huésped) × noches`
3. Al enviar, se valida el formulario y se abre WhatsApp (o el correo) con un mensaje ya redactado.

## Pendientes antes de publicar

- [ ] Datos reales en `js/config/site.js` (WhatsApp, correo, dirección, ciudad, link de Maps).
- [ ] Habitaciones, precios y fotos reales en `js/data/rooms.js`. Guarda las fotos en `assets/img/` y usa formato `.webp`.
- [ ] Imagen del hero en `css/sections.css` (`.hero`) y la etiqueta `og:image` en `index.html`.
- [ ] Páginas legales (términos, cancelación, privacidad) en el footer.
