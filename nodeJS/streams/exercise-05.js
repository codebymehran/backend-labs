import chalk from 'chalk';

// Date: December 20, 2025
// 🎯 EXERCISE 5: Handle Stream Errors
// Create a readable stream that tries to read a non-existent file and properly handles the error without crashing.

// Attempt to read from file that doesn't exist
// Listen to 'error' event on the stream
// Log a friendly error message instead of crashing
// Expected output: "Error: File not found" (no crash)
// =============================
// First: what this exercise is really about
// =============================
// On the surface it says:
// “Handle stream errors”
// But the real lesson is this:
// Streams do NOT throw errors the way normal synchronous code does.
// If you don’t handle them correctly, your Node process will crash.
// This is a very real production issue.

// =============================
// Step 1: What happens if you do nothing?
// =============================
// Imagine this line only:

// fs.createReadStream('does-not-exist.txt');

// Two important facts:

// Creating the stream does not throw

// The error happens later, asynchronously
// So:
// try/catch will NOT catch it

// The error is emitted as an event

// 👉 This is the key concept of the exercise.
// =============================
// Step 2: How streams report errors
// =============================
// Streams communicate problems using:

// 'error' event
// Mentally think:

// “If a stream fails, it emits an error — it does not throw it.”

// So the stream itself is saying:

// “Hey, something went wrong — is anyone listening?”

// If nobody listens → Node crashes.
// =============================
// Step 3: Your job in this exercise
// =============================
// You are asked to:

// “Properly handle the error without crashing”

// That means:

// You must attach an error listener

// You must log a friendly message

// You must prevent the process from crashing

// 💡 Important:
// Simply logging the error is enough — no rethrowing.
// =============================
// 👍 Let’s answer **exactly** why `try/catch` does **not** catch stream errors, at a **basic JS level**, slowly.
// =============================

// ## The short answer (then we unpack it)

// **`try/catch` only catches errors that happen synchronously, in the same call stack.
// Stream errors happen later, asynchronously, so `try/catch` never sees them.**

// That’s it.
// Now let’s *really* understand that.

// ## 1️⃣ What `try/catch` actually does (JS basics)


// try {
//   something();
// } catch (err) {
//   console.log('caught');
// }

// This means:

// > “If an error is thrown **right now**, while this code is running, catch it.”

// Example that **works**:

// try {
//   throw new Error('boom');
// } catch (err) {
//   console.log('caught'); // ✅
// }

// Why?

// * The error is thrown **immediately**
// * In the **same function call**
// * In the **same execution moment**

// ## 2️⃣ What happens with `createReadStream`

// Now look at this:

// try {
//   fs.createReadStream('missing.txt');
// } catch (err) {
//   console.log('caught');
// }

// Why this **does NOT work**:

// ### Because `createReadStream` does **not** read the file immediately.

// What it actually does:

// 1. Creates a stream object
// 2. Returns immediately
// 3. Starts reading the file **later**, in the background
// Let’s look at time, not code.

// Time 1 – JS is running
// try {
//   fs.createReadStream('missing.txt');
//   console.log('done');
// } catch {}


// What happens at Time 1:

// Stream object created ✅

// No error yet ✅

// 'done' is printed ✅

// try/catch finishes ✅

// So during the `try { ... }` block:

// * ❌ No error has happened yet
// * ❌ Nothing is thrown
// * ✅ `try/catch` finishes successfully

// ## 3️⃣ When does the error actually happen?

// Later.

// After the current code has finished.

// Internally, Node does something like:

// ```text
// "Hey OS, please read this file"
// (wait...)
// "Oops, file does not exist"

// Now Node says:
// “I need to tell someone”
// So it does:
// stream.emit('error', err);

// At that moment:

// * Your `try/catch` is **already gone**
// * The call stack is empty
// * There is nothing to catch

// So Node does the only thing it can do:

// > **Emit an `error` event on the stream**


// ## 4️⃣ Why streams use `'error'` events instead

// Streams are **event-based**, not call-based.

// They say:

// > “Something might go wrong *in the future* — so listen for it.”

// That’s why this works:

// const stream = fs.createReadStream('missing.txt');

// stream.on('error', (err) => {
//   console.log('Error: File not found');
// });
// ```

// You’re saying:

// > “Whenever the error happens, tell me.”

// ## 5️⃣ What happens if you DON’T listen?

// This is crucial.

// If a stream emits `'error'` and:

// * ❌ nobody is listening

// Node treats it as **unhandled**, and:

// 💥 **the process crashes**

// This is by design — silent failures would be worse.


// ## 6️⃣ One mental model (keep this)

// Think of it like this:

// * `try/catch` = **catch errors thrown NOW**
// * Streams = **errors that happen LATER**
// * LATER errors → **events**
// * Events → **must be listened to**



//  One-sentence rule (remember this forever)

// > **If an error happens asynchronously, `try/catch` cannot catch it — you must handle it via callbacks, events, promises, or `pipeline()`.**





































console.log(chalk.bold('\n📂 Running: streams/exercise-05.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// ? Write the simplest solution that works




// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// ? Refactor for better readability or add error handling




// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// ? Focus on performance or advanced patterns




// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// ? Add full error handling, edge cases, documentation




console.log(chalk.green.bold('\n✅ Exercise complete!'));

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// -

//* What was confusing:
// -

//* Key differences between layers:
// - Layer 1 vs 2:
// - Layer 2 vs 3:
// - Layer 3 vs 4:
