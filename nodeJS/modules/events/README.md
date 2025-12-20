# modules
**Date:** December 15, 2025

---

## Exercises
<!-- Paste your 5 exercises here from AI -->
# Node.js Events Module - Complete Learning Path

## 🎯 EXERCISE 1: Create and Emit Basic Events
Create an EventEmitter that emits a 'greeting' event with a name as data. Listen for this event and log the greeting to the console.
- Import EventEmitter from 'events'
- Create an instance
- Register a listener with .on()
- Emit the event with .emit()
- Expected output: "Hello, John!" when emitting with name "John"

---

## 🎯 EXERCISE 2: Multiple Listeners on Same Event
Create an EventEmitter with THREE different listeners all listening to the same 'data' event. Each should log something different.
- Create one emitter instance
- Register 3 different listeners using .on()
- Emit 'data' event once
- All 3 listeners should fire in order
- Expected output: All three log statements appear

---

## 🎯 EXERCISE 3: One-Time Event Listener
Create a server simulation where a 'connection' event should only log "Server started" the FIRST time it fires, then ignore subsequent emissions.
- Use .once() instead of .on()
- Emit 'connection' event 3 times
- Verify only the first emission triggers the listener
- Expected output: "Server started" appears only once

---

## 🎯 EXERCISE 4: Removing Event Listeners
Create a timer that emits 'tick' events. After 3 ticks, remove the listener so it stops logging.
- Create emitter and listener function
- Emit 'tick' 5 times in a loop
- After 3rd tick, use .removeListener() or .off()
- Expected output: Only 3 "Tick!" messages, then silence

---

## 🎯 EXERCISE 5: Event with Multiple Arguments
Create a user login system that emits 'login' event with username, timestamp, and IP address. The listener should format and display all three pieces of data.
- Emit event with 3 arguments
- Listener receives all 3 arguments
- Format output nicely
- Expected output: "User alice logged in at 2:30 PM from 192.168.1.1"

---

## 🚀 MINI PROJECT: Simple Chat Room Emitter (30-60 min)

Build a basic chat room system using EventEmitter that handles:

**Required Features:**
1. User joins room (emit 'userJoined' with username)
2. User sends message (emit 'message' with username and text)
3. User leaves room (emit 'userLeft' with username)
4. Listener that logs all activity to console

**Simulate this flow:**
- Alice joins
- Bob joins
- Alice sends: "Hey everyone!"
- Bob sends: "Hi Alice!"
- Alice leaves
- Bob sends: "Anyone there?"
- Bob leaves

**Expected Output:**
```
[SYSTEM] Alice joined the room
[SYSTEM] Bob joined the room
[Alice] Hey everyone!
[Bob] Hi Alice!
[SYSTEM] Alice left the room
[Bob] Anyone there?
[SYSTEM] Bob left the room
```

**Bonus Challenge (optional):**
- Add a listener that counts total messages sent
- Add error handling for empty messages
- Track active users in the room

---

## 📋 SETUP INSTRUCTIONS

### Step 1: Run Your Script
```bash
./setup-topic.sh events
```

### Step 2: Copy Exercises to README
Copy the exercises above into your `events/README.md`

### Step 3: Complete Exercises 1-5
Work through each exercise file, test with:
```bash
node events/exercise-01.js
node events/exercise-02.js
# ... etc
```

### Step 4: Build Mini Project
Once all 5 exercises are done, build the chat room in `events/mini-project.js`

### Step 5: Mark Your Progress
Update the checkboxes in your README as you go!

---

## 🎓 WHAT YOU'LL LEARN

By the end of this, you'll understand:
- ✅ How EventEmitter works (the foundation of Node.js async patterns)
- ✅ When to use .on() vs .once()
- ✅ How to clean up listeners (avoiding memory leaks)
- ✅ Passing data through events
- ✅ Building event-driven systems (like Express.js does internally)


---

## Mini Project
<!-- Paste your mini project idea here after completing exercises -->

---

## Quick Reference
```javascript
// Common methods/patterns you used
```

---

## Key Learnings
<!-- What clicked for you? What was confusing? -->

---

## Progress
- [ ] Exercise 1
- [ ] Exercise 2
- [ ] Exercise 3
- [ ] Exercise 4
- [ ] Exercise 5
- [ ] Mini Project
