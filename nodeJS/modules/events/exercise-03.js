// Date: December 10, 2025
// Exercise 3: Error Propagation in Event Chains
// Simulate a data pipeline where errors must be handled gracefully.
// - Create a 'DataProcessor' class extending EventEmitter
// - Emit 'data' events that trigger processing
// - One of your data items should cause an error during processing
// - Implement proper error event handling to prevent crashes
// - Log both successful processing and caught errors
// - Expected output: Successfully process valid items, catch and log errors without crashing

// Modify the solution to:

//## Count how many items succeeded vs failed
// Log a summary at the end: "Processed: 3 successful, 2 failed"

// Try it! This will help cement your understanding.

console.log('\n📂 Running: modules/events/exercise-03.js');
console.log('─'.repeat(50));

// ============================================
//* ✅ WORKING SOLUTION
// ============================================

import { EventEmitter } from 'events';

// STEP 1: Create a class that extends EventEmitter
class DataProcessor extends EventEmitter {
    constructor() {
        super();  // Initialize EventEmitter
        this.successCount = 0;
        this.errorCount = 0;
    }

    processData(data) {
        this.emit('data', data);
    }

    getStats() {
        return {
            successful: this.successCount,
            failed: this.errorCount,
            total: this.successCount + this.errorCount
        };
    }
}
// STEP 2: Create an instance
const processor = new DataProcessor();

// STEP 3: Attach 'data' listener with error handling

processor.on('data', (item) => {
    try {
      if (item === null || item === undefined) {
        throw new Error('Invalid data');
      }
      // If valid, process successfully
      processor.successCount++; // Track success
      console.log('✅ Successfully processed:', item);
    } catch (error) {

      // If error occurs, emit an 'error' event
      processor.errorCount++; // Track error
      processor.emit('error', error);
    }
});

// STEP 4: Attach 'error' listener (CRITICAL - prevents crashes)

processor.on('error', (error) => {
    console.error('❌ Error caught:', error.message);
});
// STEP 5: Test with multiple data items

console.log('\n=== Processing Data Pipeline ===\n');
processor.processData({ id: 1, name: 'Alice' });
processor.processData(null);
processor.processData({ id: 2, name: 'Bob' });
processor.processData(undefined);
processor.processData({ id: 3, name: 'Charlie' });

console.log('\n', processor.getStats());
// { successful: 3, failed: 2, total: 5 }









// ============================================
//! 📝 REFACTORING NOTES
// ============================================
// What I learned:
// - Remember: The golden rule is: "Always emit errors on the 'error' event, and always listen for them!" This way, no error goes unnoticed in your event chains!
//  Always pair these together:
// processor.emit('error', err);  // Emit error
// processor.on('error', handler); // Catch error
// error is a special event
// No custom properties → no need for constructor
// JavaScript implicitly does: constructor() { super(); }

// What I'd change if I came back:
// -
//
// Questions I still have:
// -

// ============================================
//? 📈 try / catch block Explanation 📖
// ============================================

// Common Pattern is as below

// try {
//    1. Check for expected issue and THROW if invalid
//   if (!dataIsValid(data)) {
//     throw new Error('Data check failed.');
//   }

//    2. ONLY if step 1 succeeds, run the subsequent success logic
//   saveToDatabase(data);
//   updateUserInterface();
//   sendConfirmationEmail();
// } catch (error) {
//    3. If any step above (1 or 2) throws an error, execution immediately
//       jumps here. The 'error' variable contains the error details.
//   displayErrorMessage('Could not complete operation.');
//   logErrorDetails(error);
// }

//? How This Pattern Helps the User

// The core idea is to use try...catch for exceptional, unexpected, or external errors that are beyond your control, not for standard program flow control (which is better suited to if...else statements).

// The try...catch block is the fundamental mechanism for creating a graceful failure experience rather than a hard crash.
// Here’s how this pattern provides value to the end-user:

//* 1. Prevents Application Crashes
// This is the most critical benefit. Without try...catch, a single unexpected error (like trying to access a property of an undefined variable or a network timeout) in your JavaScript application might halt the entire application's execution.
// User Experience (Without try...catch): The application freezes, a generic white screen appears, buttons stop responding, and the user has to manually refresh the browser or restart the Node.js process.
// User Experience (With try...catch): The specific problematic operation fails, but the rest of the application remains responsive.


//* 2. Provides Meaningful Feedback
// Instead of failing silently or crashing, the catch block allows the developer to present a helpful, contextual error message to the user.
// Bad Feedback: An internal server error occurs, and the user sees nothing happen when they click "Save," or worse, sees a technical message like SyntaxError: Unexpected token < in JSON at position 0.
// Good Feedback (via catch block): The user sees a pop-up: "Error: Could not save profile data. Please check your internet connection and try again."


//* 3. Allows for Fallback Functionality
// The catch block lets you execute alternative code if the preferred method fails.
// Example: You first try to fetch data from a fast, primary cache server. If the catch block runs (because the primary server is down), you can initiate a fallback request to a slower, secondary server or load old data from local storage. The user might experience a slight delay, but they still get the data they need.
// In summary, the try...catch pattern is your tool for robust programming. It separates optimistic success code from defensive failure code, ensuring that your application manages problems professionally rather than falling over.

// * Primary Use Cases
// Here are the primary use cases for try...catch blocks in web development:
// 1. Handling Asynchronous Operations (async/await)
// This is arguably the most common use case in modern web development. When making network requests, you use try...catch inside your async function to handle potential network errors, server issues, or invalid responses.
// javascript
// async function fetchUserData(userId) {
//   try {
//     const response = await fetch(`https://api.example.com/user/${userId}`);
//     if (!response.ok) {
//          Handle non-OK HTTP statuses (e.g., 404 Not Found, 500 Server Error)
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//      Update the UI with data...
//   } catch (error) {
//      Catches network failures or the error thrown above
//     console.error("Failed to fetch user data:", error.message);
//      Display a user-friendly error message in the UI
//     displayErrorMessage("Could not load user data. Please check your connection.");
//   }
// }


// 2. Parsing Unpredictable Data (JSON)
// When receiving data from an external source (like a third-party API or local storage), you can't always guarantee the data is valid JSON. JSON.parse() will throw a SyntaxError if the string is malformed.
// javascript
// function processApiResponse(jsonString) {
//   try {
//     const data = JSON.parse(jsonString); // Might throw a SyntaxError
//      Use the parsed data...
//     updateUI(data);
//   } catch (error) {
//      Handle the specific parsing error gracefully
//     console.error("Error parsing JSON:", error.message);
//     displayErrorMessage("Received invalid data format from the server.");
//   }
// }


// 3. Handling Errors from Third-Party Libraries
// When you integrate libraries or plugins you don't control, they might throw unexpected errors in specific edge cases. Wrapping the call in a try...catch prevents that library's issue from crashing your entire application.
// javascript
// function safelyUseExternalLibrary(config) {
//   try {
//     ExternalLibrary.initialize(config);
//   } catch (error) {
//     console.error("External library failed to initialize:", error.message);
//      Provide fallback functionality or disable the feature
//     useBasicFunctionality();
//   }
// }


// 4. Robust Data Processing Loops
// As seen in your Node.js example, if you are processing a large list of items (e.g., in a loop), you don't want one bad item to stop the entire operation. You wrap the processing of a single item in a try...catch block so you can log the error for the bad item and simply continue with the next item.
// javascript
// function processBulkData(dataArray) {
//     for (const item of dataArray) {
//         try {
//             validateAndSave(item); // A function that might throw errors
//             console.log(`✅ Processed item: ${item.id}`);
//         } catch (error) {
//             console.error(`❌ Error processing item ${item.id}: ${error.message}`);
//              Log the error externally, but continue the loop
//         }
//     }
// }


// 5. Custom Error Handling and Global Fallbacks
// You can use try...catch at a high level (or with global error handlers like window.onerror in the browser) to catch unexpected "programmer errors" (e.g., a ReferenceError for an undefined variable).
// This prevents the user from seeing a blank page or a full error stack trace, and instead displays a generic "Something went wrong" message while logging the technical error details to your debugging service.
// javascript
// try {
//    A large function that orchestrates many operations
//   runApplicationLogic();
// } catch (error) {
//    Catches unexpected errors that "bubbled up" the call stack
//   logErrorToServer(error); // Send full stack trace to logging service
//   displayUserFriendlyMessage("An unexpected application error occurred. We have been notified.");
// }
