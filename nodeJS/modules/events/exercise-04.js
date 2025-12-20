// Date: December 15, 2025
// 🎯 EXERCISE 4: Removing Event Listeners
// Create a timer that emits 'tick' events. After 3 ticks, remove the listener so it stops logging.

// Create emitter and listener function
// Emit 'tick' 5 times in a loop
// After 3rd tick, use .removeListener() or .off()
// Expected output: Only 3 "Tick!" messages, then silence

console.log('\n📂 Running: modules/exercise-04.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ SOLUTION
// ============================================

import {EventEmitter} from 'events';
const emitter = new EventEmitter();

let tickCount = 0;

function handleTick(){
  tickCount++;
    console.log(`Tick ${tickCount}!`);

  if(tickCount === 3){
    emitter.off('tick', handleTick);
  }
}

emitter.on('tick', handleTick);

for(let i=0; i<5; i++){
  emitter.emit('tick');
}

// ====timer-based variation instead of a loop

const clock = new EventEmitter();
let tickCounter = 0;
const MAX_TICKS = 5;


// listener function
function tickHandler() {
  tickCounter++;
  console.log(`Tick ${tickCounter}!`);

  // stop after 3 ticks
  if (tickCounter === MAX_TICKS) {
    clock.removeListener('tick', tickHandler); // remove listener
    clearInterval(timer); // stop timer
        console.log('✅ Reached max ticks, timer stopped.');

  }
}

// register listener
clock.on('tick', tickHandler);

// create timer to emit ticks every 500ms
const timer = setInterval(() => {
  clock.emit('tick');
}, 500);



console.log('\n✅ Exercise complete!');

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// -

//* What was confusing:
// -
