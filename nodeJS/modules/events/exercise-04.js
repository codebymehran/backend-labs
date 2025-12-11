// Date: December 11, 2025
// * Exercise 4: Once-Only Cleanup Pattern
//  Build a resource manager that cleans up after single-use events.
// Create a 'FileUploader' emitter that fires 'uploadComplete' and 'uploadFailed'
//# - Use `.once()` for a cleanup handler that must run exactly once regardless of success/failure
//  Implement a timeout that fails the upload if it takes too long (use setTimeout)
//  Ensure cleanup runs whether upload succeeds, fails, or times out
//  Expected output: Cleanup logs exactly once per upload attempt

//? "simulate upload" refers to replacing the actual, complex, and potentially time-consuming code required to transfer a file over a network with a simple proxy that mimics the behavior of an upload without doing the real work.


console.log('\n📂 Running: modules/events/exercise-04.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ WORKING SOLUTION
// ============================================

import { EventEmitter } from 'events';

// Step 1: Create FileUploader class
class FileUploader extends EventEmitter {
    upload(filename, shouldFail = false, delay = 1000) {
        console.log('Starting upload:', filename);

        setTimeout(() => {
            if (shouldFail) {
                this.emit('uploadFailed', filename);
            } else {
                this.emit('uploadComplete', filename);
            }
        }, delay);
    }
}

// ============================================
// TEST 1: Successful Upload
// ============================================
console.log('\n=== Test 1: Successful Upload ===');

const uploader1 = new FileUploader();

function cleanup1() {
    console.log('🧹 Cleanup Test 1: Releasing resources, closing connections...');
}

uploader1.once('uploadComplete', cleanup1);
uploader1.once('uploadFailed', cleanup1);

const TIMEOUT1 = 3000;
const timeoutId1 = setTimeout(() => {
    console.log('⏰ Upload timed out!');
    uploader1.emit('uploadFailed', 'timeout');
}, TIMEOUT1);

uploader1.on('uploadComplete', (filename) => {
    console.log('✅ Upload succeeded:', filename);
    clearTimeout(timeoutId1);
});

uploader1.on('uploadFailed', (reason) => {
    console.log('❌ Upload failed:', reason);
    clearTimeout(timeoutId1);
});

uploader1.upload('photo.jpg', false, 1000);

// ============================================
// TEST 2: Failed Upload
// ============================================
setTimeout(() => {
    console.log('\n=== Test 2: Failed Upload ===');

    const uploader2 = new FileUploader();

    function cleanup2() {
        console.log('🧹 Cleanup Test 2: Releasing resources, closing connections...');
    }

    uploader2.once('uploadComplete', cleanup2);
    uploader2.once('uploadFailed', cleanup2);

    const TIMEOUT2 = 3000;
    const timeoutId2 = setTimeout(() => {
        console.log('⏰ Upload timed out!');
        uploader2.emit('uploadFailed', 'timeout');
    }, TIMEOUT2);

    uploader2.on('uploadComplete', (filename) => {
        console.log('✅ Upload succeeded:', filename);
        clearTimeout(timeoutId2);
    });

    uploader2.on('uploadFailed', (reason) => {
        console.log('❌ Upload failed:', reason);
        clearTimeout(timeoutId2);
    });

    uploader2.upload('document.pdf', true, 1000);
}, 2000); // Wait 2 seconds after Test 1

// ============================================
// TEST 3: Timeout Scenario
// ============================================
setTimeout(() => {
    console.log('\n=== Test 3: Timeout ===');

    const uploader3 = new FileUploader();

    function cleanup3() {
        console.log('🧹 Cleanup Test 3: Releasing resources, closing connections...');
    }

    uploader3.once('uploadComplete', cleanup3);
    uploader3.once('uploadFailed', cleanup3);

    const TIMEOUT3 = 3000;
    const timeoutId3 = setTimeout(() => {
        console.log('⏰ Upload timed out!');
        uploader3.emit('uploadFailed', 'timeout');
    }, TIMEOUT3);

    uploader3.on('uploadComplete', (filename) => {
        console.log('✅ Upload succeeded:', filename);
        clearTimeout(timeoutId3);
    });

    uploader3.on('uploadFailed', (reason) => {
        console.log('❌ Upload failed:', reason);
        clearTimeout(timeoutId3);
    });

    uploader3.upload('video.mp4', false, 5000); // Takes 5s, timeout is 3s
}, 4000); // Wait 4 seconds after Test 1



// ============================================
//! 📝 REFACTORING NOTES
// ============================================
// What I learned:
//  .once() fires only once per listener, not globally across all events
//  Each test needs separate uploader instance to avoid shared state
//  Async tests need sequential execution with setTimeout delays
//  clearTimeout prevents false timeout triggers when upload completes

// What I'd change if I came back:
//  Move timeout logic inside upload() method (per-upload timeout)
//  Create helper function to reduce code duplication
//  Use Promises or async/await for cleaner async testing
//  Add upload ID tracking for debugging multiple concurrent uploads

// Questions I still have:
//  How do I properly test async code without setTimeout chains?
//  What's the best pattern for managing multiple concurrent uploads?
//  When should timeout be in the class vs outside?
//? # Exercise 4 - Steps (No Code)

// ## Step 1: Import EventEmitter

// ## Step 2: Create FileUploader Class
// - Extend EventEmitter
// - Add upload method that accepts filename, shouldFail flag, and delay
// - Use setTimeout to simulate async upload
// - Emit 'uploadComplete' or 'uploadFailed' based on shouldFail flag

// ## Step 3: Create Uploader Instance

// ## Step 4: Define Cleanup Function
// - Logs cleanup message

// ## Step 5: Attach Cleanup Using .once()
// - Attach cleanup to 'uploadComplete' event with .once()
// - Attach cleanup to 'uploadFailed' event with .once()
// - This ensures cleanup runs exactly once regardless of which event fires

// ## Step 6: Set Up Timeout Mechanism
// - Define timeout duration (3000ms)
// - Create setTimeout that emits 'uploadFailed' if triggered
// - Store timeout ID for later cancellation

// ## Step 7: Attach Success Handler
// - Listen for 'uploadComplete' event
// - Log success message with filename
// - Clear the timeout to prevent false timeout trigger

// ## Step 8: Attach Failure Handler
// - Listen for 'uploadFailed' event
// - Log failure message with reason
// - Clear the timeout

// ## Step 9: Test Three Scenarios
// - Test 1: Successful upload (completes before timeout)
// - Test 2: Failed upload (intentionally fails)
// - Test 3: Timeout scenario (takes longer than timeout limit)


// !📝 Summary: When to Use try...catch in JavaScript
// try...catch is used to handle runtime exceptions (errors that halt execution immediately), preventing your entire application from crashing. It is not used for standard if...else flow control.

// ✅ Use try...catch when:
// You are executing code that might throw an error synchronously and immediately stop execution at that exact moment.
// Use Case	Example Code	Why?
// async/await	try { const res = await fetch(...); } catch (e) { ... }	await turns an asynchronous failure into a synchronous "throw".

// JSON.parse()	try { JSON.parse(str); } catch (e) { ... }	If the string is invalid, JSON.parse() stops instantly with a SyntaxError.

// Third-Party Code	try { Library.init(); } catch (e) { ... }	To catch errors from code you don't control.

// Deliberate throw	try { if(bad) throw new Error(); } catch (e) { ... }	To gracefully manage a specific, critical failure condition you define.

//? ❌ Do NOT use try...catch when:
// You are using standard if...else statements or asynchronous event flow to manage success/failure. The code does not halt execution instantly; it follows the alternative path.
// Use Case	Example Code	Why Not?
// if...else logic	if (data === null) { handleNull(); } else { process(data); }	This is expected flow control, not an exception.
// Event Emitters	if (fail) { emit('fail'); } else { emit('ok'); }	You manage success/failure via different events, not synchronous errors.
// Basic Validation	if (age < 0) { return false; }	Returning false or null is a clean way to signal invalid input without a hard error.
