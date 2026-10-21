import { SITE } from '../config/site.js';

const currencyFormatter = new Intl.NumberFormat(SITE.currency.locale, {
  style: 'currency',
  currency: SITE.currency.code,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => currencyFormatter.format(amount);

export const pluralize = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

/** Escapa texto antes de interpolarlo en plantillas HTML. */
export const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
