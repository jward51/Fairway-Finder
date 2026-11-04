// Internal app contract, not Club Prophet's API schema.
export const JC_COURSES = ['twin-oaks', 'encinitas', 'crossings', 'rancho-bernardo', 'golf-club-california'];
export function sanDiegoToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = key => parts.find(p => p.type === key).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function validateSearch(q) {
  const errors = [];
  if (!Array.isArray(q.courses) || !q.courses.length || q.courses.some(id => !JC_COURSES.includes(id))) errors.push('Select at least one JC Golf course.');
  const date = /^\d{4}-\d{2}-\d{2}$/.test(q.date) && new Date(`${q.date}T12:00:00Z`);
  if (!date || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== q.date) errors.push('Choose a valid date.');
  if (!Number.isInteger(q.players) || q.players < 1 || q.players > 4) errors.push('Choose 1–4 golfers.');
  const time = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
  if (!time(q.start) || !time(q.end) || q.start >= q.end) errors.push('End time must be after start time.');
  if (q.maxPrice !== null && (!Number.isFinite(q.maxPrice) || q.maxPrice < 0)) errors.push('Enter a valid maximum price.');
  return errors;
}
export function filterSlots(slots, q) {
  if (validateSearch(q).length) throw new Error('Invalid search');
  return slots.filter(s => q.courses.includes(s.courseId) && s.date === q.date &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(s.time) && s.time >= q.start && s.time <= q.end &&
    Number.isInteger(s.availablePlayers) && s.availablePlayers >= q.players &&
    (q.maxPrice === null || (s.currency === 'USD' && typeof s.pricePerPlayer === 'number' && Number.isFinite(s.pricePerPlayer) && s.pricePerPlayer >= 0 && s.pricePerPlayer <= q.maxPrice)))
    .sort((a, b) => a.time.localeCompare(b.time) || a.courseId.localeCompare(b.courseId));
}
