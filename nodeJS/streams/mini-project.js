import chalk from 'chalk';
import {
  rainbow,
  pastel,
} from 'gradient-string';
import fs from 'fs';
import { createInterface } from 'readline';
// Date: December 20, 2025
// 🚀 MINI PROJECT: Large File Access Log Analyzer (Real-World)

// Estimated Time: 30–60 minutes

// Build a Node.js program that analyzes a large web server access log efficiently using streams.
// The goal is to practice reading large files line by line, classifying log entries, and writing filtered results to a new file without loading the entire file into memory.

// 📁 Log File Format

// The log file follows a standard web server access log format (similar to Apache / Nginx):

// 192.168.1.60 - - [14/Dec/2025:20:49:43 +0000] "GET / HTTP/1.1" 200 1991 "Mozilla/5.0"
// 192.168.1.148 - - [25/Dec/2025:12:27:02 +0000] "DELETE /contact HTTP/1.1" 404 4080 "PostmanRuntime/7.28.4"
// 192.168.1.202 - - [12/Dec/2025:21:23:34 +0000] "DELETE / HTTP/1.1" 301 751 "Mozilla/5.0"


// Each line represents one HTTP request handled by the server.

// 🎯 Log Classification Rules

// Classify each log entry based on its HTTP status code:

// INFO → status codes 200–299

// WARNING → status codes 300–399

// ERROR → status codes 400–599

// ✅ Required Features

// Read a large log file line by line

// Use streams to handle large files efficiently.

// Do not load the entire file into memory.

// Count log levels

// Count how many requests are classified as:

// ERROR

// WARNING

// Write filtered output

// Write only ERROR log entries (status ≥ 400) to a new file called:

// errors.log


// Display a summary when processing is complete

// 📊 Expected Output (Example)
// 📊 Log Analysis Complete
// ────────────────────────
// Total ERROR requests: 812
// Total WARNING requests: 436
// Errors saved to: errors.log


// (The numbers will vary depending on your log file.)

// 🛠️ Implementation Tips

// Use fs.createReadStream() to read the log file

// Use the readline module with streams to process the file line by line

// Extract the HTTP status code from each log entry

// Keep counters for ERROR and WARNING entries

// Use fs.createWriteStream() to write filtered ERROR lines to errors.log

// Display the summary in the close event of readline

// ⭐ Bonus Challenges (Optional)

// Also count INFO requests

// Calculate the percentage of each log level

// Count the most frequent HTTP status codes

// Find which endpoint (/login, /contact, etc.) causes the most errors

// Add a timestamp to the summary output

console.log(chalk.bold('\n📂 Running: streams/mini-project.js'));
console.log(chalk.gray('─'.repeat(50)));



// =============================
// Layer 1: MVP (Minimum Viable Product)
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: MVP'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// TODO: Get it working with basic functionality

// =============================
// The Event-Driven Way (The "Classic" Node.js Pattern)
// =============================

function analyzeWithEvents() {
  const readStream = fs.createReadStream('access.log');
  const writeStream = fs.createWriteStream('errors.log');
  const rl = createInterface({ input: readStream });

  let errorCount = 0;
  let warningCount = 0;

  // This is a listener. It sits and waits for the 'line' event.
  rl.on('line', line => {
    const parts = line.split(' ');
    const statusCode = parseInt(parts[8]);

    if (statusCode >= 400) {
      errorCount++;
      writeStream.write(line + '\n');
    } else if (statusCode >= 300 && statusCode <= 399) {
      warningCount++;
    }
  });

  // This listener waits for the stream to finish.
  rl.on('close', () => {
    writeStream.end();
    console.log('📊 Log Analysis Complete (Events)');
    console.log(`Total ERROR requests: ${errorCount}`);
    console.log(`Total WARNING requests: ${warningCount}`);
  });
}

// analyzeWithEvents();

// =============================
// The Async Iterator Way (The "Modern" Pattern)
// =============================


async function analyzeWithAsyncIterator() {
  const readStream = fs.createReadStream('access.log');
  const writeStream = fs.createWriteStream('errors.log');
  const rl = createInterface({ input: readStream });

  let errorCount = 0;
  let warningCount = 0;

  // The 'await' makes the loop pause until the next line is ready
  for await (const line of rl) {
    const parts = line.split(' ');
    const statusCode = parseInt(parts[8]);

    if (statusCode >= 400) {
      errorCount++;
      writeStream.write(line + '\n');
    } else if (statusCode >= 300 && statusCode <= 399) {
      warningCount++;
    }
  }

  // Because it's a loop, the code only reaches here when the file is done
  writeStream.end();
  console.log('📊 Log Analysis Complete (Async Iterator)');
  console.log(`Total ERROR requests: ${errorCount}`);
  console.log(`Total WARNING requests: ${warningCount}`);
}


analyzeWithAsyncIterator();
// =============================
//Why you don’t see rl.on('line') anymore
// =============================
// Think of it like this:
// rl.on('line') → you answer the phone every time it rings

// for await (const line of rl) → voicemail gives you messages one by one

// Same data. Different interface.




// =============================
// Layer 2: Enhanced Features
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Enhanced Features'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// TODO: Add more features and better UX

















// =============================
// Layer 3: Advanced Implementation
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Advanced Implementation'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// TODO: Use advanced patterns, optimize performance

// =============================
// Layer 4: Professional Grade
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Professional Grade'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// TODO: Complete error handling, testing, documentation

console.log(chalk.cyan.bold('\n🎉 Mini project complete!'));

// ============================================
//! 📝 REFLECTION
// ============================================
//* What I learned by building this:
// -

//* What I'd improve:
// -

//* What I want to explore next:
// -

//* Evolution through layers:
// - Layer 1 → 2:
// - Layer 2 → 3:
// - Layer 3 → 4:
