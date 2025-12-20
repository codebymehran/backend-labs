// Date: December 15, 2025
// ## 🎯 EXERCISE 3: One-Time Event Listener
// Create a server simulation where a 'connection' event should only log "Server started" the FIRST time it fires, then ignore subsequent emissions.
// - Use .once() instead of .on()
// - Emit 'connection' event 3 times
// - Verify only the first emission triggers the listener
// - Expected output: "Server started" appears only once

console.log('\n📂 Running: modules/exercise-03.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ SOLUTION
// ============================================
import {EventEmitter} from 'events';

class Server extends EventEmitter {
connect(){
    this.emit('connection');
  }

}

const server = new Server();



server.once('connection', (msg)=>console.log(msg));
server.emit('connection');
server.emit('connection');
server.emit('connection');
console.log('\n✅ Exercise complete!');

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// -

//* What was confusing:
// -
