// Date: December 15, 2025

// 🎯 EXERCISE 5: Event with Multiple Arguments
// Create a user login system that emits 'login' event with username, timestamp, and IP address. The listener should format and display all three pieces of data.

// Emit event with 3 arguments
// Listener receives all 3 arguments
// Format output nicely
// Expected output: "User alice logged in at 2:30 PM from 192.168.1.1"

console.log('\n📂 Running: modules/exercise-05.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ SOLUTION
// ============================================
import { EventEmitter } from 'events';
const emitter = new EventEmitter();

const now = new Date();
const localTime = now.toLocaleTimeString();

function handleLogin(username, timestamp, ip) {
  console.log(`user ${username} logged in at ${timestamp} from ${ip}`);
}
// 1️⃣ Log every login (multi-argument event)

emitter.on('login', handleLogin);
// emitter.emit({ username: 'Alice', timestamp: localTime, ip: '192.168.0.1' });

// Mini Login Notification System (with seconds)

function getTimeString() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
// 2️⃣ Send welcome message only once per session
emitter.once('login', username => {
  console.log(`Welcome ${username}! This message appears only once`);
});
// 3️⃣ Simulate multiple logins

// First login

emitter.emit('login', 'Alice', getTimeString(), '192.168.0.1');

// Second Login

setTimeout(() => {
  emitter.emit('login', 'Bob', getTimeString(), '192.192.168.0.2');
}, 2000);

// Third login of Alice again (2 seconds later)
setTimeout(() => {
  emitter.emit('login', 'Alice', getTimeString(), '192.168.0.1');
}, 4000);

console.log('\n✅ Exercise complete!');

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// -

//* What was confusing:
// -
