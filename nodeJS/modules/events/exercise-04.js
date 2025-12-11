// Date: December 11, 2025
// * Exercise 4: Once-Only Cleanup Pattern
//^ Build a resource manager that cleans up after single-use events.
//^ Create a 'FileUploader' emitter that fires 'uploadComplete' and 'uploadFailed'
//# - Use `.once()` for a cleanup handler that must run exactly once regardless of success/failure
// - Implement a timeout that fails the upload if it takes too long (use setTimeout)
//? - Ensure cleanup runs whether upload succeeds, fails, or times out
// - Expected output: Cleanup logs exactly once per upload attempt

//? "simulate upload" refers to replacing the actual, complex, and potentially time-consuming code required to transfer a file over a network with a simple proxy that mimics the behavior of an upload without doing the real work.


console.log('\n📂 Running: modules/events/exercise-04.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ WORKING SOLUTION
// ============================================

import {EventEmitter} from 'events';

class FileUploader extends EventEmitter{
  upload(filename, shouldFail = false, delay=1000){
    console.log('Starting Upload:', filename);
    setTimeout(() => {

    }, delay);

  }
}

// ============================================
//! 📝 REFACTORING NOTES
// ============================================
// What I learned:
// -
//
// What I'd change if I came back:
// -
//
// Questions I still have:
// -


