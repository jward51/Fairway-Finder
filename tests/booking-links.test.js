import test from 'node:test';
import assert from 'node:assert/strict';
import {observedBookingUrl} from '../booking-links.js';
test('Twin Oaks reproduces observed host, path, course ID and date format', () => {
 const u = new URL(observedBookingUrl('twin-oaks','2026-11-08'));
 assert.equal(u.origin,'https://jcgsc4.cps.golf');
 assert.equal(u.pathname,'/onlineresweb/m/search-teetime/default');
 assert.equal(u.searchParams.get('CourseId'),'4');
 assert.equal(u.searchParams.get('Date'),'2026-11-8');
 assert.deepEqual([...u.searchParams.keys()].sort(),['CourseId','Date']);
});
test('does not guess mappings or send invalid dates', () => {
 assert.equal(observedBookingUrl('encinitas','2026-11-08'),null);
 for(const date of ['', '2026-02-30', 'invalid', '2026-11-08&Player=4']) {
  const u = new URL(observedBookingUrl('twin-oaks',date));
  assert.equal(u.searchParams.has('Date'),false);
  assert.equal(u.searchParams.get('CourseId'),'4');
 }
});
