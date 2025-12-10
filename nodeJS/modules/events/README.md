# events

**Date:** December 10, 2025

---

## Exercises
# Node.js Events Module - 7 Progressive Exercises

## EXERCISE 1-2: FUNDAMENTALS

### Exercise 1: Basic Event Emitter
Create an EventEmitter that simulates a basic notification system.
- Create an emitter that fires a 'message' event
- Attach a listener that logs the message with a timestamp
- Emit 3 different messages
- Expected output: Three timestamped messages in console

### Exercise 2: Multiple Listeners & Removal
Build an event emitter with dynamic listener management.
- Create one emitter with a 'dataProcessed' event
- Attach 3 different listeners (e.g., logger, counter, validator)
- Emit 2 events so all listeners fire
- Remove the middle listener
- Emit 1 more event and verify only 2 listeners fire
- Expected output: First two emissions trigger all 3 listeners, third emission triggers only 2

## EXERCISE 3-5: REAL-WORLD SCENARIOS

### Exercise 3: Error Propagation in Event Chains
Simulate a data pipeline where errors must be handled gracefully.
- Create a 'DataProcessor' class extending EventEmitter
- Emit 'data' events that trigger processing
- One of your data items should cause an error during processing
- Implement proper error event handling to prevent crashes
- Log both successful processing and caught errors
- Expected output: Successfully process valid items, catch and log errors without crashing

### Exercise 4: Once-Only Cleanup Pattern
Build a resource manager that cleans up after single-use events.
- Create a 'FileUploader' emitter that fires 'uploadComplete' and 'uploadFailed'
- Use `.once()` for a cleanup handler that must run exactly once regardless of success/failure
- Implement a timeout that fails the upload if it takes too long (use setTimeout)
- Ensure cleanup runs whether upload succeeds, fails, or times out
- Expected output: Cleanup logs exactly once per upload attempt

### Exercise 5: Event Listener Memory Management
Create a subscription system that properly manages listener lifecycle.
- Build a 'PubSub' class where users can subscribe/unsubscribe to topics
- Each subscription should track its listener reference
- Implement an unsubscribe method that removes the correct listener
- Create 5 subscribers, unsubscribe 2 specific ones, emit an event
- Log active listener count before and after unsubscribing
- Expected output: Verify exactly 3 listeners remain active and receive the event

## EXERCISE 6-7: EDGE CASES & MASTERY

### Exercise 6: MaxListeners Warning & Prevention
Handle the scenario where listeners accumulate beyond safe limits.
- Create an emitter that simulates a WebSocket connection manager
- Dynamically add connection listeners in a loop (simulate 15 concurrent connections)
- First run: trigger the MaxListeners warning (default is 10)
- Second run: properly configure maxListeners to handle this use case
- Implement a cleanup strategy that removes listeners when "connections close"
- Expected output: Show warning first, then demonstrate clean handling with proper limits

### Exercise 7: Synchronous vs Asynchronous Event Emission Gotcha
Expose the critical timing issue with event emission order.
- Create an emitter that processes "orders"
- Emit an 'orderPlaced' event immediately in a function
- Add a listener AFTER emitting the event (simulate late subscription)
- Show why the listener misses the event
- Then refactor using `process.nextTick()` or `setImmediate()` to defer emission
- Demonstrate how deferred emission allows late subscribers to catch the event
- Expected output: First attempt shows missed event, second attempt catches it with deferred emission




---

## Quick Reference
```javascript
// Common methods/patterns
```

---

## Mini Tutorials
<!-- Your notes, explanations, gotchas go here -->

---

## Progress
- [ ] Exercise 1
- [ ] Exercise 2
- [ ] Exercise 3
- [ ] Exercise 4
- [ ] Exercise 5
- [ ] Exercise 6
- [ ] Exercise 7
