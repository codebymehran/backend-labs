import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
// Date: December 20, 2025

// 🎯 EXERCISE 1: Create and Read from a Readable Stream
// Create a readable stream that reads a text file and logs each chunk of data as it arrives.

// Use fs.createReadStream() to read a file
// Listen to 'data' event to receive chunks
// Log each chunk to console
// Create a sample text file with a few lines to test
// Expected output: Each chunk of file content logged

console.log(chalk.bold('\n📂 Running: streams/exercise-01.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// ? Write the simplest solution that works

function basicLayer(){
  const reader = fs.createReadStream('test.txt', {
  encoding: 'utf8',
  highWaterMark: 16,
});
reader.on('data',chunk=>console.log(chunk) );

reader.on('error',err=>console.log(err.message))

reader.on('end',_=>console.log('Finished'))

}
// basicLayer();
// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// ? Refactor for better readability or add error handling


function refactoredLayer(){
const fileConfig = {
  path: 'test.txt',
  encoding: 'utf8',
  highWaterMark: 16
}
function handleData(chunk){
  console.log('Chunk Received:' , chunk);
}
function handleError(err){
  console.log("🚀 ~ handleError ~ err:", err.message);
}
function handleEnd(){
  console.log('Finished reading File');
}
const reader = fs.createReadStream(fileConfig.path,{
  encoding: fileConfig.encoding,
  highWaterMark: fileConfig.highWaterMark
})

reader.on('data',handleData);
reader.on('error',handleError);
reader.on('end',handleEnd);
}

// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// ? Focus on performance or advanced patterns

function optimizedLayer(){
  const fileConfig = {
    path: 'test.txt',
    encoding:'utf8'
  }
  const reader = fs.createReadStream(fileConfig.path,{
    encoding:fileConfig.encoding
  });
  reader.on('error',err=>{console.error('Optimized error:', err.message)})
  .on('end',()=>{
    console.log('Optimized finished reading file.');
  });
  reader.pipe(process.stdout); // no manual 'data' handling, use pipe instead.
}

// optimizedLayer();

// you can read about chaining and process.stdout in Readme file.



// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

/**
 * LAYER 4 – PRODUCTION READY
 *
 * Focus:
 * - Safe file paths
 * - Guaranteed error handling
 * - Clean stream lifecycle
 * - Reusable function
 *
 * This is the style you would ship.
 */

function productionLayer() {
  // --- Resolve file path safely ---
  const filePath = path.resolve(process.cwd(), 'test.txt');

  // --- Create readable stream ---
  const reader = fs.createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 64 * 1024, // 64KB
  });

  /**
   * ERROR HANDLING
   *
   * Streams fail asynchronously.
   * If you do not listen to 'error',
   * the process can crash.
   */
  reader.on('error', err => {
    console.error('Production error:', err.message);
    reader.destroy(); // ensure cleanup
  });

  /**
   * END EVENT
   *
   * Fired when the stream has no more data.
   * This does NOT mean the process exits —
   * it only means reading is complete.
   */
  reader.on('end', () => {
    console.log('\nProduction finished reading file.');
  });

  /**
   * PIPE
   *
   * Connect readable stream (file)
   * to writable stream (terminal).
   *
   * Node manages flow + backpressure automatically.
   */
  reader.pipe(process.stdout);
}


productionLayer();




// console.log(chalk.green.bold('\n✅ Exercise complete!'));


