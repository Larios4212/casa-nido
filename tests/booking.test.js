import { test } from 'node:test';
import assert from 'node:assert/strict';
import { quote, validate } from '../js/modules/booking.js';
import { toISODate, addDays } from '../js/utils/date.js';

const day = (n) => toISODate(addDays(new Date(), n));

test('privada: calcula habitaciones necesarias por capacidad', () => {
  const q = quote({ roomId: 'privada', checkIn: day(1), checkOut: day(4), guests: 3 });
  assert.equal(q.nights, 3);
  assert.equal(q.units, 2);          // 3 personas / capacidad 2 → 2 habitaciones
  assert.equal(q.total, 600 * 2 * 3);
});

test('dormitorio: cobra una cama por huésped', () => {
  const q = quote({ roomId: 'dormitorio', checkIn: day(1), checkOut: day(3), guests: 4 });
  assert.equal(q.units, 4);
  assert.equal(q.total, 250 * 4 * 2);
});

test('quote devuelve null con fechas inválidas', () => {
  assert.equal(quote({ roomId: 'privada', checkIn: day(3), checkOut: day(3), guests: 2 }), null);
});

test('validate detecta errores comunes', () => {
  const errors = validate({ checkIn: day(-1), checkOut: day(-2), guests: 8, roomId: 'dormitorio', name: '' });
  assert.ok(errors.checkIn);
  assert.ok(errors.checkOut);
  assert.ok(errors.guests);           // 8 personas en dorm de 6
  assert.ok(errors.name);
});

test('validate acepta una reserva correcta', () => {
  const errors = validate({ checkIn: day(1), checkOut: day(3), guests: 2, roomId: 'suite-cachalote', name: 'Ana' });
  assert.deepEqual(errors, {});
});
