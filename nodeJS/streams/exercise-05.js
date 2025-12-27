import chalk from 'chalk';
import fs from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
// Date: December 20, 2025
// 🎯 EXERCISE 5: Handle Stream Errors
// Create a readable stream that tries to read a non-existent file and properly handles the error without crashing.

// Attempt to read from file that doesn't exist
// Listen to 'error' event on the stream
// Log a friendly error message instead of crashing
// Expected output: "Error: File not found" (no crash)

console.log(chalk.bold('\n📂 Running: streams/exercise-05.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// ? Write the simplest solution that works

function layer1() {
  const inputFile = 'test2.txt';
  const readStream = fs.createReadStream(inputFile); // no reading has occured yet
  readStream.on('error', err => {
    console.error(chalk.red('Error reading file:'), err.message); //listens for errors asynchronously.
  });
}
// layer1();
// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// ? Refactor for better readability or add error handling


function layer2() {
  // -------------------------
  // 1️⃣ Define file paths
  // -------------------------
  const inputFile = 'test2.txt';
  const outputFile = 'output.txt';

  // -------------------------
  // 2️⃣ Create streams
  // -------------------------
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);

  // -------------------------
  // 3️⃣ Attach error handlers
  // -------------------------
  readStream.on('error', err => {
    console.error(chalk.red('Error reading file:'), err.message);
  });

  writeStream.on('error', err => {
    console.error(chalk.red('Error writing file:'), err.message);
  });

  // -------------------------
  // 4️⃣ Optional: log events
  // -------------------------
  readStream.on('open', () => {
    console.log(chalk.green(`Started reading: ${inputFile}`));
  });

  writeStream.on('finish', () => {
    console.log(chalk.green(`Finished writing: ${outputFile}`));
  });

  // -------------------------
  // 5️⃣ Pipe data
  // -------------------------
  readStream.pipe(writeStream);
}

// layer2();

// ✅ What this layer does

// Adds a destination stream (writeStream)

// Connects streams using .pipe()

// Adds logging for start and finish

// Attaches error handlers for both streams

// Keeps the code clear, readable, and structured


// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// ? Focus on performance or advanced patterns


function layer3() {
  // -------------------------
  // 1️⃣ Define file paths
  // -------------------------
  const inputFile = 'test2.txt';
  const outputFile = 'output.txt';

  // -------------------------
  // 2️⃣ Create streams
  // -------------------------
  const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
  const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  // -------------------------
  // 3️⃣ Error handlers
  // -------------------------
  readStream.on('error', err => {
    console.error(chalk.red('Error reading file:'), err.message);
  });

  writeStream.on('error', err => {
    console.error(chalk.red('Error writing file:'), err.message);
  });

  // -------------------------
  // 4️⃣ Debug / chunk inspection
  // -------------------------
  readStream.on('data', chunk => {
    console.log(chalk.blue(`Read chunk of length ${chunk.length}`));
    // You could inspect content here if needed
  });

  readStream.on('end', () => {
    console.log(chalk.green('Finished reading file.'));
  });

  writeStream.on('finish', () => {
    console.log(chalk.green(`Finished writing to ${outputFile}`));
  });

  // -------------------------
  // 5️⃣ Handle edge cases: empty file
  // -------------------------
  readStream.on('close', () => {
    if (readStream.bytesRead === 0) {
      console.log(chalk.yellow('File is empty.'));
    }
  });

  // -------------------------
  // 6️⃣ Pipe data
  // -------------------------
  readStream.pipe(writeStream);
}

// layer3();

// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// ? Add full error handling, edge cases, documentation


async function layer4() {
  const inputFile = 'test2.txt';
  const outputFile = 'output.txt';

  console.log(chalk.blue(`Processing ${inputFile} → ${outputFile}`));

  // Create streams with UTF-8 encoding
  const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
  const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  try {
    // Pipeline safely connects streams and converts errors into a promise rejection
    await pipeline(
      readStream,
      async function* transformChunks(source) {
        for await (const chunk of source) {
          // Developer-friendly logging per chunk
          console.log(chalk.blue(`Processing chunk of length ${chunk.length}`));
          yield chunk.toUpperCase(); // Example transformation: uppercase
        }
      },
      writeStream
    );

    console.log(chalk.green(`✅ File successfully processed: ${outputFile}`));
  } catch (err) {
    console.error(chalk.red(`❌ Error processing file: ${err.message}`));
  }

}

// Run layer 4
layer4();

//👍

// # 🟣 Layer 5 — Conceptual Breakthrough: Generators & Real-World Node Thinking

// This Layer 4 solution is **better not because of fancy syntax**, but because of **how it behaves under real conditions**.

// What changed is not just *how* the code looks, but *how it thinks*.

// ---

// ## 1️⃣ The Big Picture (Most Important)

// Layer 4 treats file processing as a **flow**, not a one-time action.

// Earlier layers were:

// * “Read → transform → write”
// * happy-path focused
// * event-listener driven

// Layer 4 is:

// * **structured**
// * **linear**
// * **failure-aware**
// * **easy to reason about**

// That is what *production-ready* actually means.

// ---

// ## 2️⃣ Why `pipeline()` Is a Major Upgrade

// ### Earlier approach

// ```js
// readStream
//   .pipe(transform)
//   .pipe(writeStream)
//   .on('finish', ...)
// ```

// Problems:

// * Errors can occur **anywhere**
// * You must remember to attach error handlers
// * Cleanup is manual
// * Easy to miss edge cases

// ---

// ### Layer 4 approach

// ```js
// await pipeline(readStream, transform, writeStream);
// ```

// What this gives you:

// * ✅ **One central error boundary**
// * ✅ Automatic cleanup
// * ✅ No leaked file handles
// * ✅ Correct backpressure handling

// A single `try / catch` now protects the *entire* data flow.

// This alone is a production-level improvement.

// ---

// ## 3️⃣ Why `async function*` Is the Right Abstraction

// ```js
// async function* transformChunks(source) {
//   for await (const chunk of source) {
//     yield chunk.toUpperCase();
//   }
// }
// ```

// Earlier layers relied on:

// * callbacks
// * events
// * fragmented control flow

// Now:

// * Code runs **top to bottom**
// * Each chunk is processed **sequentially**
// * Logic reads like a story

// This matches **how humans think**, which dramatically reduces bugs.

// ---

// ## 4️⃣ Streaming Without Memory Risk

// Layer 4:

// * Never loads the whole file
// * Processes one chunk at a time
// * Automatically respects backpressure

// Earlier layers *could* be safe, but safety depended on discipline.

// Layer 4 makes safety **the default**, not a responsibility.

// ---

// ## 5️⃣ Error Handling That Actually Scales

// ```js
// try {
//   await pipeline(...)
// } catch (err) {
//   console.error(...)
// }
// ```

// This correctly handles:

// * missing files
// * permission errors
// * transform failures
// * write errors

// With:

// * no unhandled rejections
// * no silent failures
// * no process crashes

// Earlier layers required multiple listeners and were easy to misconfigure.

// ---

// ## 6️⃣ Observability (Underrated but Critical)

// ```js
// console.log(`Processing chunk of length ${chunk.length}`);
// ```

// This allows you to:

// * see streaming behavior
// * verify chunk sizes
// * diagnose stalls or partial writes

// Production code must be **observable**, not just correct.

// ---

// ## 7️⃣ Clean Separation of Responsibilities

// Layer 4 clearly separates:

// * **Configuration**
// * **IO**
// * **Transformation**
// * **Control flow**

// Earlier layers mixed these concerns.

// This structure scales cleanly as complexity grows.

// ---

// ## 8️⃣ This Is a Real-World Node Pattern

// This exact pattern appears in:

// * log processors
// * ETL pipelines
// * file converters
// * CLI tools
// * stream parsers

// If someone handed you this code in a job:

// * You’d understand it immediately
// * You’d trust it
// * You’d feel safe modifying it

// That’s the real test of good Node code.

// ---

// ## About Generators (Important Clarification)

// Yes — **generator functions (`function*`) are a new JavaScript concept here**.

// But:

// * ❌ You did not skip steps
// * ❌ You are not “too advanced too fast”

// Generators appeared because your code moved from **simple scripts** to **stream-based async data flow**.

// Node needed a way to say:

// > “Give me one chunk, pause, then give me the next.”

// That problem is *exactly* what generators solve.

// ---

// ## What You Are (and Aren’t) Learning

// ### You are NOT learning:

// * generator theory
// * iterator internals
// * language specs

// ### You ARE learning:

// * how streaming data flows
// * how Node pauses and resumes work
// * how async code stays memory-safe

// Generators are just the **tool**, not the goal.

// ---

// ## The Only Things You Need to Remember

// 1. `function*` → produces values over time
// 2. `yield` → sends one value, then pauses
// 3. `async function*` → perfect for streams

// That’s enough for real Node work.

// ---

// ## Final Takeaway

// Generators appear when:

// * data flows incrementally
// * memory matters
// * correctness matters

// They didn’t show up because someone forced them in.

// They showed up because **your code grew up**.

// You’re no longer just learning Node.

// You’re starting to **think in Node**.

// ---

// You’re absolutely right to pause here and **intentionally learn generators next**.
// That’s not hesitation — that’s *good engineering instinct*.

// Go learn them.
// You’re ready.












console.log(chalk.green.bold('\n✅ Exercise complete!'));


