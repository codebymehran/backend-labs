import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
// Date: December 20, 2025

// 🎯 EXERCISE 2: Write Data Using a Writable Stream
// Create a writable stream that writes user data to a file line by line.

// Use fs.createWriteStream() to create output file
// Write 5 chunks using .write()
// Call .end() when done
// Verify the file was created with all 5 lines
// Expected output: A new file with 5 lines of text

console.log(chalk.bold('\n📂 Running: streams/exercise-02.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// ? Write the simplest solution that works

function basicLayer() {
  const writer = fs.createWriteStream('test.txt');
  writer.write('Line 1: Learning writable streams in Node.js\n');
  writer.write('Line 2: Each write sends a chunk of data\n');
  writer.write('Line 3: Streams handle data asynchronously\n');
  writer.write('Line 4: end() signals no more data is coming\n');
  writer.write('Line 5: This file was written using fs.createWriteStream');
  writer.end();
}
// basicLayer();

// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

function readableLayer() {
  // manually triggering error with wrong path

  // const writer = fs.createWriteStream('someFolder/output.txt');

  const writer = fs.createWriteStream('output.txt');
  writer.on('error', err => {
    console.error(`[ERROR] Writable stream failed while writing to 'output.txt': ${err.message}`);
  });

  writer.on('finish', () => console.log('All data written'));
  // Write data in chunks
  writer.write('Line 1: Learning writable streams in Node.js\n');
  writer.write('Line 2: Each write sends a chunk of data\n');
  writer.write('Line 3: Streams handle data asynchronously\n');
  writer.write('Line 4: end() signals no more data is coming\n');
  writer.write('Line 5: This file was written using fs.createWriteStream\n');

  // Signal completion
  writer.end();
}

// readableLayer();

// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

function optimizedLayer(){
  const filePath = 'output.txt';
  const writer = fs.createWriteStream(filePath,{
    highWaterMark:16
  })
  writer.on('error', err=>{
        console.error(`[ERROR] Failed to write to '${filePath}': ${err.message}`);
  })
  writer.on('finish', ()=>{
    console.log(`[INFO] Finished writing to '${filePath}'`);
  })
  const lines = [
    'Line 1: Learning writable streams in Node.js\n',
    'Line 2: Each write sends a chunk of data\n',
    'Line 3: Streams handle data asynchronously\n',
    'Line 4: end() signals no more data is coming\n',
    'Line 5: This file was written using fs.createWriteStream\n',
  ];
  let i=0;
  function writeNext(){
    let canWrite = true; // this flag tracks buffer status, buffer is empty at start
    while(i<lines.length && canWrite){ // buffer not full, so respecting back pressure
      //.write returns false if internal buffer is full
      canWrite = writer.write(lines[i]);
      i++;
    }
    if(i<lines.length){
      //Buffer full, wait until 'drain' before writing more
      writer.once('drain', writeNext);
    }else{
      writer.end();
    }
  }
}

// Safe: respects backpressure, prevents memory overflow

// Scalable: works for large files or high-frequency data streams

// optimizedLayer;
// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));


/**
 * Writes an array of lines to a file safely using writable streams.
 *
 * @param {string} filePath - The destination file path.
 * @param {string[]} lines - Array of strings to write.
 */


function writeFileSafely(filePath, lines) {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    console.error(`[ERROR] Directory does not exist: ${dir}`);
    return;
  }

  const writer = fs.createWriteStream(filePath, { highWaterMark: 16 * 1024 });

  // Error handling
  writer.on('error', err => {
    console.error(`[${new Date().toISOString()}] [ERROR] Failed to write to '${filePath}': ${err.message}`);
  });

  // Finish handling
  writer.on('finish', () => {
    console.log(`[${new Date().toISOString()}] [INFO] Finished writing to '${filePath}'`);
  });

  let i = 0;

  function writeNext() {
    let canWrite = true;

    while (i < lines.length && canWrite) {
      canWrite = writer.write(lines[i]);
      i++;
    }

    if (i < lines.length) {
      // Wait for buffer to drain before continuing
      writer.once('drain', writeNext);
    } else {
      // All data written, close stream
      writer.end();
    }
  }

  // Start writing
  writeNext();
}

// -----------------------
// Usage Example
// -----------------------
const linesToWrite = [
  'Line 1: Learning writable streams in Node.js\n',
  'Line 2: Each write sends a chunk of data\n',
  'Line 3: Streams handle data asynchronously\n',
  'Line 4: end() signals no more data is coming\n',
  'Line 5: This file was written using fs.createWriteStream\n'
];

// Replace with a valid path
// writeFileSafely('./output/output.txt', linesToWrite);















console.log(chalk.green.bold('\n✅ Exercise complete!'));


