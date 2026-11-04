export function activeOffer(course, today) {
  const offer = course.offer;
  return offer && (!offer.expires || offer.expires >= today) ? offer : null;
}
export function savingsCourses(courses, today) {
  return courses.filter(course => activeOffer(course, today));
}
