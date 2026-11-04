// Observed Noteefy destination supplied by the user for Twin Oaks, 2026-11-08.
// This is link construction only; provider behavior through login is unverified.
const TWIN_OAKS = 'https://jcgsc4.cps.golf/onlineresweb/m/search-teetime/default';
export function observedBookingUrl(course, date) {
  if (course !== 'twin-oaks') return null;
  const url = new URL(TWIN_OAKS);
  url.searchParams.set('CourseId', '4');
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsed = new Date(`${date}T12:00:00Z`);
    if (Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date) {
      const [year, month, day] = date.split('-').map(Number);
      url.searchParams.set('Date', `${year}-${month}-${day}`);
    }
  }
  return url.href;
}
