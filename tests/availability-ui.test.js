import test from 'node:test';
import assert from 'node:assert/strict';
import {availabilityPanel,handleAvailabilitySubmit} from '../availability-ui.js';
import {sanDiegoToday} from '../availability.js';
test('panel lists five courses and explicitly shows disconnected inventory',()=>{
 const output=availabilityPanel([{id:'twin-oaks',name:'Twin Oaks <test>'}]);
 assert.equal((output.match(/name="course"/g)||[]).length,5);
 assert.ok(output.includes('Twin Oaks &lt;test&gt;'));
 assert.ok(output.includes('Last inventory check: never'));
 assert.ok(output.includes('Live availability not connected'));
});
test('search submission validates and preserves reviewed criteria across renders',()=>{
 const originalFormData=globalThis.FormData,originalDocument=globalThis.document;
 const status={textContent:''};
 globalThis.document={querySelector:()=>status};
 let fields={course:['twin-oaks','encinitas'],date:sanDiegoToday(),players:'2',start:'08:00',end:'12:00',price:'85'};
 globalThis.FormData=class {getAll(k){return fields[k]}get(k){return fields[k]}};
 try{
  let prevented=false;
  const event={target:{id:'availability-form'},preventDefault(){prevented=true}};
  handleAvailabilitySubmit(event);
  assert.ok(prevented);
  assert.match(status.textContent,/2 courses/);
  assert.match(status.textContent,/2 golfers/);
  assert.match(status.textContent,/Inventory has not been checked/);
  assert.match(availabilityPanel([]),/value="85"/);
  fields={...fields,end:'07:00'};
  handleAvailabilitySubmit(event);
  assert.match(status.textContent,/End time must be after start time/);
  fields={...fields,course:[],end:'12:00'};
  handleAvailabilitySubmit(event);
  assert.match(status.textContent,/Select at least one/);
 }finally{globalThis.FormData=originalFormData;globalThis.document=originalDocument}
});
