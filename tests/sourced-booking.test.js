import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {activeOffer,savingsCourses} from '../sourced-booking.js';
const courses=JSON.parse(readFileSync(new URL('../courses.json',import.meta.url)));
test('limited promotions expire while membership options remain labeled',()=>{
 const encinitas=courses.find(c=>c.id==='encinitas');
 assert.ok(activeOffer(encinitas,'2026-11-20'));
 assert.equal(activeOffer(encinitas,'2026-11-21'),null);
 const members=savingsCourses(courses,'2026-11-21').filter(c=>c.offer.kind==='Paid membership');
 assert.deepEqual(members.map(c=>c.id).sort(),['maderas','native-oaks']);
 assert.match(encinitas.offer.details,/recovering/);
});
test('catalog has unique courses, sourced non-JC destinations and safe URLs',()=>{
 assert.equal(courses.length,21);
 assert.equal(new Set(courses.map(c=>c.id)).size,21);
 for(const c of courses){
  assert.equal(new URL(c.bookingUrl).protocol,'https:');
  if(c.bookingSource)assert.equal(new URL(c.bookingSource).protocol,'https:');
  assert.ok(Number.isFinite(c.lat)&&Number.isFinite(c.lon));
 }
 for(const id of ['riverwalk','mission-trails','vineyard','native-oaks']){
  const c=courses.find(c=>c.id===id);
  assert.notEqual(c.accountKey,'jc');
  assert.ok(c.bookingSource&&c.linkChecked);
 }
});
test('municipal destinations are course-specific; JC does not default to Crossings',()=>{
 assert.match(courses.find(c=>c.id==='balboa').bookingUrl,/19348\/1470/);
 assert.match(courses.find(c=>c.id==='mission-bay').bookingUrl,/19346\/1469/);
 assert.match(courses.find(c=>c.id==='golf-club-california').bookingUrl,/jcgpub32/);
 assert.match(courses.find(c=>c.id==='encinitas').bookingUrl,/jcgsc5/);
});
