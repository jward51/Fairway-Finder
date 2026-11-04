import { JC_COURSES, sanDiegoToday, validateSearch } from './availability.js';
const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let query = {courses: [...JC_COURSES], date: sanDiegoToday(), players: 4, start: '06:00', end: '18:00', maxPrice: null};
let message = 'Availability has not been checked. Live access is not connected.';
export function availabilityPanel(courses) {
  return `<section class="panel availability-panel" aria-labelledby="availability-title"><h2 id="availability-title">Search JC Golf tee times</h2>
  <p>Choose your round across multiple courses. Times are in San Diego local time.</p>
  <div class="banner"><strong>Live availability not connected.</strong> Provider access is needed before this app can display openings. Saved watches and cancellation alerts remain inactive.</div>
  <form id="availability-form"><fieldset><legend>Courses</legend><div class="availability-courses">${JC_COURSES.map(id => `<label class="filter-choice"><input type="checkbox" name="course" value="${id}" ${query.courses.includes(id) ? 'checked' : ''}>${escape(courses.find(c => c.id === id)?.name || id)}</label>`).join('')}</div></fieldset>
  <div class="availability-fields"><div class="field"><label for="availability-date">Date</label><input required class="control" id="availability-date" name="date" type="date" min="${sanDiegoToday()}" value="${query.date}"></div>
  <div class="field"><label for="availability-players">Golfers</label><select class="control" id="availability-players" name="players">${[1,2,3,4].map(n => `<option value="${n}" ${n === query.players ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
  <div class="field"><label for="availability-start">From</label><input required class="control" id="availability-start" name="start" type="time" value="${query.start}"></div>
  <div class="field"><label for="availability-end">Until</label><input required class="control" id="availability-end" name="end" type="time" value="${query.end}"></div>
  <div class="field"><label for="availability-price">Max $ per golfer</label><input class="control" id="availability-price" name="price" type="number" min="0" step="0.01" placeholder="Any price" value="${query.maxPrice ?? ''}"></div></div>
  <p class="fine">When a price cap is set, openings without a confirmed USD price will be excluded.</p>
  <button class="btn ghost" type="submit">Review search</button>
  <p id="availability-status" role="status" aria-live="polite">${escape(message)}</p></form>
  <p class="fine">No live results or sample tee times are shown. Last inventory check: never.</p>
  <p>For now, open official CPS booking below. JC Golf documents multi-course selection in its portal; select your date and golfers there. Course, date and group size are not automatically transferred.</p>
  <a target="_blank" rel="noopener noreferrer" href="https://www.jcgolf.com/news/how-to-use-jc-golfs-online-tee-time-reservation-system">Official multi-course booking instructions ↗</a></section>`;
}
export function handleAvailabilitySubmit(event) {
  if (event.target.id !== 'availability-form') return;
  event.preventDefault();
  const f = new FormData(event.target);
  const next = { courses: f.getAll('course'), date: f.get('date'), players: Number(f.get('players')), start: f.get('start'), end: f.get('end'), maxPrice: f.get('price') === '' ? null : Number(f.get('price')) };
  const errors = validateSearch(next);
  if (next.date < sanDiegoToday()) errors.push('Choose today or a future date.');
  if (!errors.length) query = next;
  message = errors.length ? errors.join(' ') : `Search prepared for ${query.courses.length} courses on ${query.date}, ${query.start}–${query.end}, ${query.players} golfers${query.maxPrice === null ? '' : `, up to $${query.maxPrice} per golfer`}. Inventory has not been checked; use official booking below.`;
  document.querySelector('#availability-status').textContent = message;
}
