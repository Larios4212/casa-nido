const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Fecha local en formato YYYY-MM-DD (el que usan los <input type="date">). */
export const toISODate = (date) => {
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

/** Interpreta YYYY-MM-DD como fecha local (evita el desfase UTC de new Date(str)). */
export const parseISODate = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const nightsBetween = (start, end) =>
  Math.round((parseISODate(end) - parseISODate(start)) / MS_PER_DAY);

export const formatLongDate = (value, locale = 'es-MX') =>
  parseISODate(value).toLocaleDateString(locale, {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  });
