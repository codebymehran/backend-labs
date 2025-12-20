// Date: December 15, 2025
// ## 🎯 EXERCISE 1: Create and Emit Basic Events
// Create an EventEmitter that emits a 'greeting' event with a name as data. Listen for this event and log the greeting to the console.
// - Import EventEmitter from 'events'
// - Create an instance
// - Register a listener with .on()
// - Emit the event with .emit()
// - Expected output: "Hello, John!" when emitting with name "John"

console.log('\n📂 Running: modules/exercise-01.js');
console.log('─'.repeat(50));

// ============================================
//+ ✅ SOLUTION
// ============================================
import {EventEmitter} from 'events';
const emitter = new EventEmitter();

function hello(name){
  console.log(`Hello! ${name}`);
}
emitter.on('greeting',hello);
emitter.emit('greeting', 'John');


console.log('\n✅ Exercise complete!');

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// - No Hardcoded values in .on
// EventEmitter code should always follow this pattern:

// Create emitter

// Register listeners

// Emit events

//* What was confusing:
// -
