// index.js - Quick testing playground

// console.log('Current directory:', process.cwd());

// import './modules/events/exercise-05.js';
// import './modules/events/exercise-02.js';
// import '.modules/fs/exercise-01.js';

console.log('\n\n                🚩 ⫘⫘⫘ 𝙴𝚗𝚍ed ⫘⫘⫘  🚩\n');

// ============================================
// QUICK SCRATCH PAD - Test anything here
// ============================================



import {EventEmitter} from 'events';
const emitter = new EventEmitter();

// Exercise 3: Error Propagation in Event Chains
// Simulate a data pipeline where errors must be handled gracefully.
// - Create a 'DataProcessor' class extending EventEmitter
// - Emit 'data' events that trigger processing
// - One of your data items should cause an error during processing
// - Implement proper error event handling to prevent crashes
// - Log both successful processing and caught errors
// - Expected output: Successfully process valid items, catch and log errors without crashing

// Modify the solution to:

//## Count how many items succeeded vs failed
// Log a summary at the end: "Processed: 3 successful, 2 failed"
