import chalk from 'chalk';

// Date: December 20, 2025
// 🚀 MINI PROJECT: Large File Log Analyzer (30-60 min)
// Build a log file analyzer that processes a large file efficiently using streams.
// Required Features:

// Read a log file line by line (create a sample log file with 50+ lines)
// Count how many lines contain the word "ERROR"
// Count how many lines contain the word "WARNING"
// Write only the ERROR lines to a new file called errors.log
// Display summary at the end

// Sample Log File Format:
// 2024-01-15 10:23:45 INFO Server started
// 2024-01-15 10:24:12 ERROR Database connection failed
// 2024-01-15 10:24:15 WARNING Retrying connection
// 2024-01-15 10:24:18 INFO Database connected
// 2024-01-15 10:25:30 ERROR User authentication failed
// Expected Output:
// 📊 Log Analysis Complete
// ─────────────────────────
// Total ERROR lines: 2
// Total WARNING lines: 1
// Errors saved to: errors.log
// Implementation Tips:

// Use readline module with streams to process line by line
// Use a transform stream or process data in 'data' event
// Keep counters for ERROR and WARNING
// Write filtered results to new file

// Bonus Challenge (optional):

// Also extract and count INFO lines
// Add timestamps to your summary
// Calculate percentage of each log level

console.log(chalk.bold('\n📂 Running: streams/mini-project.js'));
console.log(chalk.gray('─'.repeat(50)));

// ============================================
//! 🎯 PROJECT GOAL
// ============================================
// [Describe what you're building]

// =============================
// Layer 1: MVP (Minimum Viable Product)
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: MVP'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// TODO: Get it working with basic functionality

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
