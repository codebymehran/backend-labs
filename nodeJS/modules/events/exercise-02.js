// Date: December 15, 2025

// ## 🎯 EXERCISE 2: Multiple Listeners on Same Event
// Create an EventEmitter with THREE different listeners all listening to the same 'data' event. Each should log something different.
// - Create one emitter instance
// - Register 3 different listeners using .on()
// - Emit 'data' event once
// - All 3 listeners should fire in order
// - Expected output: All three log statements appear

console.log('\n📂 Running: modules/exercise-02.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ SOLUTION
// ============================================
import {EventEmitter} from 'events';
const emitter = new EventEmitter();
function listener1(){console.log('listener1:🥺');}
function listener2(){console.log('listener2:🫨');}
function listener3(){console.log('listener3:🙄');}
emitter.on('data', listener1)
emitter.on('data', listener2)
emitter.on('data', listener3)
emitter.emit('data', listener1)

console.log('\n✅ Exercise complete!');

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// -

//* What was confusing:
// -
