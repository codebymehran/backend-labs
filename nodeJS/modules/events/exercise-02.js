// Date: December 10, 2025
// Exercise 2: Multiple Listeners & Removal
// Build an event emitter with dynamic listener management.
// - Create one emitter with a 'dataProcessed' event
// - Attach 3 different listeners (e.g., logger, counter, validator)
// - Emit 2 events so all listeners fire
// - Remove the middle listener
// - Emit 1 more event and verify only 2 listeners fire
// - Expected output: First two emissions trigger all 3 listeners, third emission triggers only 2

console.log('\n📂 Running: modules/events/exercise-02.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ WORKING SOLUTION
// ============================================

import {EventEmitter} from 'events';

const emitter = new EventEmitter();

function logger(data){
  console.log('Logger: processing data..');
}
function counter(data){
  console.log('Counter: counting data...');
}
function validator(data){
  console.log('Validator: validating data...');
}

emitter.on('dataProcessed', logger);
emitter.on('dataProcessed', counter);
emitter.on('dataProcessed', validator);
console.log('\n=== First Emission ===');
emitter.emit('dataProcessed');
console.log('\n=== Second Emission ===');
emitter.emit('dataProcessed');

console.log('\n=== Removing counter listener ===');
emitter.off('dataProcessed', counter);
console.log('\n=== Third Emission (after removal) ===');
emitter.emit('dataProcessed');




console.log('\n\n\n✅ Exercise complete!');



// ============================================
//! 📝 REFACTORING NOTES
// ============================================

//* What I learned:
// - Can define parameters even if not used (JS doesn't care)
// - emit('event') without data still works, listeners get undefined
// - Clean code: remove unused parameters
//
//* What I'd change if I came back:

// - Pass actual data to emit() and use it in listeners (more realistic)
// - Add listenerCount() check to verify removal worked
// - Use .once() if any listener should only fire one time

//* Questions I still have:
// -

