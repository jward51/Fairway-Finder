import test from 'node:test';
import assert from 'node:assert/strict';
import {validateSearch, filterSlots, sanDiegoToday} from '../availability.js';
const q = {courses:['twin-oaks','encinitas'],date:'2026-11-10',players:4,start:'08:00',end:'12:00',maxPrice:100};
// Synthetic unit fixtures only. These are never shipped as app inventory.
const slot = overrides => ({courseId:'twin-oaks',date:q.date,time:'09:00',availablePlayers:4,pricePerPlayer:80,currency:'USD',...overrides});
test('San Diego date handles UTC midnight and daylight saving', () => {
  assert.equal(sanDiegoToday(new Date('2026-11-04T02:00:00Z')), '2026-11-03');
  assert.equal(sanDiegoToday(new Date('2026-07-04T06:00:00Z')), '2026-07-03');
});
test('validates dates, course selection, group size, window and cap', () => {
  assert.deepEqual(validateSearch(q), []);
  for (const change of [{courses:[]},{courses:['unknown']},{date:'2026-02-30'},{date:'bad'},{players:0},{players:5},{players:1.5},{start:'13:00'},{end:'25:00'},{maxPrice:NaN},{maxPrice:-1}]) assert.ok(validateSearch({...q,...change}).length);
});
test('filters across courses, date, time, seats and price, then sorts', () => {
  const early = slot({courseId:'encinitas',time:'08:00'});
  const late = slot({time:'12:00'});
  const rejected = [{courseId:'crossings'},{date:'2026-11-11'},{time:'07:59'},{time:'12:01'},{availablePlayers:3},{pricePerPlayer:101},{pricePerPlayer:null},{currency:'EUR'}].map(slot);
  assert.deepEqual(filterSlots([late,...rejected,early],q),[early,late]);
});
test('unknown prices are allowed only without a cap', () => {
  const unknown = slot({pricePerPlayer:null});
  assert.deepEqual(filterSlots([unknown],q),[]);
  assert.deepEqual(filterSlots([unknown],{...q,maxPrice:null}),[unknown]);
});
