// Date: December 10, 2025
// Exercise 1: Basic Event Emitter
// Create an EventEmitter that simulates a basic notification system.
// - Create an emitter that fires a 'message' event
// - Attach a listener that logs the message with a timestamp
// - Emit 3 different messages
// - Expected output: Three timestamped messages in console

console.log('\n📂 Running: modules/events/exercise-01.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ WORKING SOLUTION
// ============================================

import { EventEmitter } from 'events';
const emitter = new EventEmitter();
function listener(msg) {
  const now = new Date();
  console.log(msg, now.toLocaleString());
}
emitter.on('notification', listener);
emitter.emit('notification', 'Hello world!');
emitter.emit('notification', 'Hi there');
emitter.emit('notification', 'I am learning node js');

// ============================================
//! 📝 REFACTORING NOTES
// ============================================
//* What I learned:
// - EventEmitter needs listener registered BEFORE emit
// - toLocaleString() varies by system, toISOString() is better
// - console.log can be slow with many events
//
//* What I'd change if I came back:
// - Use ISO timestamps instead of toLocaleString()
// - Maybe track time between events (the challenge)
//
//* Questions I still have:
// - When do I actually need to remove listeners?
// - How many listeners is "too many"?


//? Real Context
// This works for: Learning, local debugging, small scripts
// But in production: If you're building an application that processes thousands of events per second:

// You'd need structured logging (Winston, Pino) instead of console.log
// You'd want log levels (info, warn, error) not just printing everything
// You'd buffer logs to avoid I/O blocking on every event
// You'd use ISO timestamps for aggregation across distributed services

// Example: If you emit 10,000 notification events/sec and each one does synchronous console.log, you'll block the event loop. Professional systems batch logs and write asynchronously.
//! Follow-up Challenge (Optional)
// Now try: Modify your solution so the listener tracks how many milliseconds elapsed between events. On the first emission, log "First message". On subsequent emissions, log "Message received 1523ms after previous".
// This will teach you about stateful listeners - a pattern you'll use constantly in real applications.
