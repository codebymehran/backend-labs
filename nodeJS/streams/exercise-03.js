import chalk from 'chalk';
import fs from 'fs';


// Date: December 20, 2025
// 🎯 EXERCISE 3: Pipe a Readable Stream to a Writable Stream
// Copy a file's contents to another file using .pipe() instead of manually reading/writing.

// Create a readable stream from source file
// Create a writable stream to destination file
// Use .pipe() to connect them
// Log when piping is complete
// Expected output: New file created with exact copy of source

console.log(chalk.bold('\n📂 Running: streams/exercise-03.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));
const SOURCE_PATH = 'test.txt';
const DEST_PATH = 'output.txt';

// ? Write the simplest solution that works

function layer1Copy() {
  const readable = fs.createReadStream(SOURCE_PATH);
  const writable = fs.createWriteStream(DEST_PATH);

  readable.pipe(writable); // copies the file from input to output

  writable.on('finish', () => {
    console.log(chalk.green('✅ Layer 1: Copy complete!'));
  });
}

// layer1Copy();
// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// ? Refactor for better readability or add error handling

function layer2Copy(){
  console.log(chalk.blue(`📂 Layer 2: Copying ${SOURCE_PATH} → ${DEST_PATH}`));
  const readable = fs.createReadStream(SOURCE_PATH);
  const writable = fs.createWriteStream(DEST_PATH);
  readable.pipe(writable);
  writable.on('finish',()=>{
    console.log(chalk.green('✅ Layer 2: Copy complete!'));
  });
   readable.on('error', err => console.error(chalk.red(`❌ Read error: ${err.message}`)));
  writable.on('error', err => console.error(chalk.red(`❌ Write error: ${err.message}`)));

}

// layer2Copy();
// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// ? Focus on performance or advanced patterns

function layer3Copy() {
  console.log(chalk.magenta('🛠 Layer 3: Copying with debugging info'));

  let chunks = 0;

  const readable = fs.createReadStream(SOURCE_PATH);
  const writable = fs.createWriteStream(DEST_PATH);

  // Optional: monitor each data chunk (for learning/debugging)
  readable.on('data', (chunk) => {
    chunks++;
    console.log(chalk.gray(`📦 Chunk #${chunks} (${chunk.length} bytes)`));
  });

  // Pipe handles reading/writing automatically
  readable.pipe(writable);

  // Done writing
  writable.on('finish', () => {
    console.log(chalk.green(`✅ Finished copying ${SOURCE_PATH} → ${DEST_PATH}`));
    console.log(chalk.blue(`📊 Total chunks processed: ${chunks}`));
  });

  // Error handling
  readable.on('error', (err) => console.error(chalk.red(`❌ Read error: ${err.message}`)));
  writable.on('error', (err) => console.error(chalk.red(`❌ Write error: ${err.message}`)));

  // Stream closed event
  writable.on('close', () => console.log(chalk.cyan('📪 Writable stream closed')));
}

// Run Layer 3
// layer3Copy();


// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// ? Add full error handling, edge cases, documentation


import { pipeline } from 'stream/promises';




// =============================
// 🟣 Layer 4: Production-Ready
// =============================
async function layer4Copy(src, dest) {
  console.log(chalk.magenta(`🚀 Layer 4: Copying ${src} → ${dest}`));

  if (!fs.existsSync(src)) {
    console.error(chalk.red(`❌ Source file does not exist: ${src}`));
    return;
  }

  const readable = fs.createReadStream(src);
  const writable = fs.createWriteStream(dest);

  let chunks = 0;
  readable.on('data', chunk => chunks++);

  try {
    // ✅ Correct usage
    await pipeline(readable, writable);

    console.log(chalk.green(`✅ Copy complete! Total chunks: ${chunks}`));
  } catch (err) {
    console.error(chalk.red(`❌ Error during copy: ${err.message}`));
  }
}

layer4Copy(SOURCE_PATH, DEST_PATH);


console.log(chalk.green.bold('\n✅ Exercise complete!'));

// Production rule of thumb (memorize this)
// Learning / debugging → .pipe() + events
// Shipping / production → pipeline + async/await

// ============================================
//! 📝 NOTES
// ============================================

// This is a **really important question**, and the fact you noticed “why all of a sudden we started using async await in layer 4?” means your intuition is working 👍

// Let’s answer it **cleanly and honestly**, without hand-waving.

// ---

// ## Short answer (core reason)

// We didn’t start using `async/await` *randomly*.
// We introduced it **because Layer 4 has a new requirement**:

// > **We now care about correctness, control flow, and error handling in production.**

// `async/await` is the *best tool* for that in modern Node.

// ---

// ## What changed from Layer 1 → Layer 4?

// ### In Layers 1–2

// Your goal was:

// * “Does it work?”
// * “Is it readable?”

// `.pipe()` + events were **good enough**.

// You didn’t need:

// * Return values
// * Structured error propagation
// * Composability with other logic

// So **callbacks + events were fine**.

// ---

// ### In Layer 3

// You started:

// * Observing internals
// * Listening to events
// * Debugging behavior

// Still okay without `async/await`, because you were *inspecting*, not *controlling* flow.

// ---

// ### In Layer 4, something fundamentally changes

// Layer 4 asks this question:

// > “Would I be comfortable shipping this in a real system?”

// That introduces **new constraints**:

// * I need to know **when the operation is truly finished**
// * I need **one place** to handle failure
// * I may want to:

//   * Chain operations
//   * Reuse this function
//   * Call it from elsewhere
// * I don’t want error handling scattered across events

// 👉 This is where `async/await` becomes the **right abstraction**.

// ---

// ## The key shift: events → control flow

// ### Without `async/await`

// You’re thinking like this:

// > “When this event fires, do X.”

// That’s **reactive** and fragmented.

// ---

// ### With `async/await`

// You’re thinking like this:

// > “Do this operation, wait for it, then continue.”

// That’s **procedural and predictable**.

// Production systems prefer:

// * Predictable flow
// * Centralized error handling
// * Composable functions

// `async/await` gives you that.

// ---

// ## Why didn’t we use `async/await` earlier then?

// Because **it would have been dishonest learning**.

// If we started with:

// ```js
// await pipelineAsync(...)
// ```

// You would miss:

// * How streams actually work
// * That `.pipe()` exists
// * That streams are event-based
// * What problems `pipeline` is solving

// You earned `async/await` by first understanding the lower-level model.

// That’s exactly how good engineers learn.

// ---

// ## Important mental model (this is the real takeaway)

// > **async/await is not “modern syntax” — it’s a control-flow tool.**

// You introduce it when:

// * You care about *when* something finishes
// * You want to *compose* operations
// * You want *one error path*

// Layer 4 is the **first time** those things matter.

// ---

// ## Final reassurance

// Nothing “sudden” happened.

// You progressed like this:

// 1. **Make it work**
// 2. **Make it readable**
// 3. **Understand what’s happening**
// 4. **Take control of execution**

// `async/await` appears *exactly* at step 4 — where it belongs.

// If you ever ask yourself again:

// > “Why am I using async/await here?”

// The answer is almost always:

// > “Because I now care about correctness, flow, and failure.”

// And that’s a very good sign of growth.

