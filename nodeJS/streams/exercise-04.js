import chalk from 'chalk';
import fs from 'fs';
import { Transform } from 'stream';
// Date: December 20, 2025
// 🎯 EXERCISE 4: Transform Stream to Modify Data
// Create a transform stream that converts all text to uppercase as it flows through.

// Use stream.Transform class
// Override _transform() method
// Convert chunk to uppercase
// Pipe input file → transform → output file
// Expected output: New file with all uppercase text

console.log(chalk.bold('\n📂 Running: streams/exercise-04.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// ? Write the simplest solution that works

function layer1() {
  const inputFile = 'test.txt';
  const outputFile = 'output.txt';
  //Transform stream: convert chunks to uppercase
  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const upperChunk = chunk.toString().toUpperCase();
      callback(null, upperChunk);
    },
  });

  // readable.pipe(writable) alone = copy data
  // readable.pipe(transform).pipe(writable) = modify data while copying
  // For your exercise, you need the Transform; otherwise the file stays unchanged.

  fs.createReadStream(inputFile).pipe(upperCaseTransform).pipe(fs.createWriteStream(outputFile));

  // The “next stream” is the stream that .pipe() just sent data to; .pipe() returns it so you can chain another .pipe() onto it.

  console.log('Layer 1: File transformed to uppercase (minimal).');
}

layer1();

// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// ? Refactor for better readability or add error handling

function layer2() {
  const inputFile = 'test.txt';
  const outputFile = 'output.txt';
  console.log(chalk.blue('Layer 2: Starting uppercase transformation...'));
  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const upperChunk = chunk.toString().toUpperCase();
      callback(null, upperChunk);
    },
  });

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);

  readStream
    .pipe(upperCaseTransform)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(chalk.green(`File transformation complete: ${outputFile}`));
    });
}
//  layer2();

// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// ? Focus on performance or advanced patterns

function layer3() {
  const inputFile = 'test.txt';
  const outputFile = 'output.txt';

  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      try {
        const upperChunk = chunk.toString().toUpperCase();
        callback(null, upperChunk);
      } catch (err) {
        callback(err);
      }
    },
  });
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  readStream.on('error', err => {
    console.error(chalk.red('Error reading file:'), err.message);
  });

  writeStream.on('error', err => {
    console.error(chalk.red('Error writing file:'), err.message);
  });

  upperCaseTransform.on('error', err => {
    console.error(chalk.red('Error in transform:'), err.message);
  });

  readStream
    .pipe(upperCaseTransform)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(chalk.green('Layer 3: Transformation complete!'));
    });
}

// layer3();

// Why this matters:

// In real-world apps, streams can fail due to missing files, permissions, or unexpected input.

// Adding error listeners is crucial for robustness.

// The try/catch inside _transform ensures a faulty chunk doesn’t crash the whole pipeline silently.

// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// ? Add full error handling, edge cases, documentation

import { pipeline } from 'stream/promises';

async function layer4() {
  const inputFile = 'test.txt';
  const outputFile = 'output.txt';

  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      try {
        callback(null, chunk.toString().toUpperCase());
      } catch (err) {
        callback(err);
      }
    },
  });
  try {
    console.log(chalk.blue('Layer 4: Starting uppercase pipeline...'));
    await pipeline(
      fs.createReadStream(inputFile),
      upperCaseTransform,
      fs.createWriteStream(outputFile)
    );
    console.log(chalk.green('Layer 4: File transformed successfully!'));
  } catch (err) {
    console.error(chalk.red('Pipeline failed:'), err);
  }
}
// layer4();

// Why this matters in real-world Node.js:

// stream/promises.pipeline gives automatic cleanup if any stream errors.

// Async/await style makes your error handling linear and clear, unlike callback hell.

// Production apps often process large files, so memory-efficient, robust patterns like this are preferred.

// =============================
// Layer 5: Node 18+ / 20+ style Trick
// =============================

// Key idea first (important)

// Normally you write:

// transform(chunk, encoding, callback) {
//   callback(null, result);
// }

// But modern Node lets transform be **async**:
// If it returns data → Node treats it as success
// If it throws → Node treats it as an error

// That’s the “trick”. Let's Try

async function layer5() {
  console.log(chalk.blue('Starting async transform pipeline...'));
  //Async Transform Stream
  const upperCaseTransform = new Transform({
    async transform(chunk){
      // chunk is buffer by default
      const text = chunk.toString();
      const upperCase = text.toUpperCase();
      return upperCase;
    }
  });
  try{
    await pipeline(
      fs.createReadStream('test.txt'),
      upperCaseTransform,
      fs.createWriteStream('output.txt')
    );
        console.log(chalk.green('File transformed successfully.'));

  }catch(err){
        console.error(chalk.red('Pipeline failed:'), err.message);

  }
}


// 🧠 What’s happening (simple words)
// 1. async transform(chunk)

// Node waits for the function to finish

// Whatever you return becomes the next chunk

// If you throw, the stream errors automatically

// 2. No callback

// Old way:

// callback(null, data);
// callback(error);


// New way:

// return data;
// throw error;


// Much easier to read and reason about.

// 3. pipeline(...)

// Automatically handles:

// errors

// stream cleanup

// backpressure

// This is production best practice

// 🧩 Why this is production-ready

// ✔ Cleaner control flow
// ✔ No forgotten callbacks
// ✔ Proper error propagation
// ✔ Memory-efficient (streaming)
// ✔ Easy to extend (add more transforms)

// Mental model to keep

// Async Transform = “process chunk → return result → Node pushes it forward”

// No magic — just promises instead of callbacks.

// If your transform is synchronous → don’t use async.
// If your transform needs await → async transform is the right tool.












console.log(chalk.green.bold('\n✅ Exercise complete!'));
