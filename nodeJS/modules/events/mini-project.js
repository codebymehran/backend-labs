// Date: December 15, 2025

// 🚀 MINI PROJECT: Simple Chat Room Emitter
// A layered exploration of Node.js EventEmitter patterns
// Build a basic chat room system handling:
// - Users join (emit 'userJoined')
// - Users send messages (emit 'message')
// - Users leave (emit 'userLeft')
// - Listeners log all activity

// Simulated chat flow:
// Alice joins
// Bob joins
// Alice sends: "Hey everyone!"
// Bob sends: "Hi Alice!"
// Alice leaves
// Bob sends: "Anyone there?"
// Bob leaves

// Expected Output:
// [SYSTEM] Alice joined the room
// [SYSTEM] Bob joined the room
// [Alice] Hey everyone!
// [Bob] Hi Alice!
// [SYSTEM] Alice left the room
// [Bob] Anyone there?
// [SYSTEM] Bob left the room

// Bonus (optional):
// - Count total messages
// - Error handling for empty messages
// - Track active users


// ============================================
//! 🎯 PROJECT GOAL
// ============================================
// Build in layers so you see different ways of implementation.
// Start with basic global listeners, move to closures, then classes, then production-style encapsulation.

import chalk from 'chalk';
import { EventEmitter } from 'events';

// -----------------------------
// Helper: Unique color per username
// -----------------------------
const userColors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#6A4C93'];
const usernameColorMap = new Map();

function getColor(username) {
  if (!usernameColorMap.has(username)) {
    const color = userColors[usernameColorMap.size % userColors.length];
    usernameColorMap.set(username, chalk.hex(color));
  }
  return usernameColorMap.get(username);
}

// -----------------------------
// Global Setup
// -----------------------------
console.log(chalk.bold('\n📂 Running: modules/mini-project.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Global Listeners (Toy Code)
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Global Listeners (Toy Code)'));
console.log(chalk.green('─'.repeat(60) + '\n'));

const chatRoom = new EventEmitter();

chatRoom.on('userJoined', username => {
  console.log(chalk.cyan(`[SYSTEM] ${username} joined the room`));
});

chatRoom.on('message', (sender, text) => {
  console.log(getColor(sender)(`[${sender}] ${text}`));
});

chatRoom.on('userLeft', username => {
  console.log(chalk.cyan(`[SYSTEM] ${username} left the room`));
});

// Simulate chat
chatRoom.emit('userJoined', 'Alice');
chatRoom.emit('userJoined', 'Bob');
chatRoom.emit('message', 'Alice', 'Hey everyone!');
chatRoom.emit('message', 'Bob', 'Hi Alice!');
chatRoom.emit('userLeft', 'Alice');
chatRoom.emit('message', 'Bob', 'Anyone there?');
chatRoom.emit('userLeft', 'Bob');

// =============================
// Layer 2: Closure + Per-User Listener
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Closure + Per-User Listener'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

const users = new Map();

function joinRoom(username) {
  console.log(chalk.cyan(`[SYSTEM] ${username} joined the room`));

  function handleMessage(sender, text) {
    if (sender !== username) {
      console.log(getColor(username)(`[${username} receives] ${sender}: ${text}`));
    }
  }

  users.set(username, handleMessage);
  chatRoom.on('message', handleMessage);
}

function leaveRoom(username) {
  const listener = users.get(username);
  if (!listener) return;

  chatRoom.off('message', listener);
  users.delete(username);
  console.log(chalk.cyan(`[SYSTEM] ${username} left the room`));
}

function sendMessage(username, text) {
  chatRoom.emit('message', username, text);
}

joinRoom('Alice');
joinRoom('Bob');
sendMessage('Alice', 'Hey everyone!');
sendMessage('Bob', 'Hi Alice!');
leaveRoom('Alice');
sendMessage('Bob', 'Anyone there?');
leaveRoom('Bob');

// =============================
// Layer 3: Class Instance (Inheritance)
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Class Instance (Inheritance)'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Map();
  }

  joinRoom(username) {
    console.log(chalk.cyan(`[SYSTEM] ${username} joined the room`));
    const handleMessage = (sender, text) => {
      if (sender !== username) {
        console.log(getColor(username)(`[${username} receives] ${sender}: ${text}`));
      }
    };
    this.users.set(username, handleMessage);
    this.on('message', handleMessage);
  }

  leaveRoom(username) {
    const listener = this.users.get(username);
    if (!listener) return;

    this.off('message', listener);
    this.users.delete(username);
    console.log(chalk.cyan(`[SYSTEM] ${username} left the room`));
  }

  sendMessage(username, text) {
    this.emit('message', username, text);
  }
}

const chatRoom2 = new ChatRoom();
chatRoom2.joinRoom('Alice');
chatRoom2.joinRoom('Bob');
chatRoom2.sendMessage('Alice', 'Hello Bob!');
chatRoom2.sendMessage('Bob', 'Hi Alice!');
chatRoom2.leaveRoom('Alice');

// =============================
// Layer 4: FeaturedChatRoom (Composition + Validation)
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: FeaturedChatRoom (Composition + Validation)'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

class FeaturedChatRoom {
  constructor() {
    this.emitter = new EventEmitter();
    this.users = new Map();
    this.messageCount = 0;

    this.emitter.on('error', message => {
      console.log(chalk.red(`[ERROR] ${message}`));
    });
  }

  join(username) {
    if (this.users.has(username)) {
      this.emitter.emit('error', `${username} is already in the room`);
      return;
    }
    console.log(chalk.cyan(`[SYSTEM] ${username} joined the room`));

    const listener = (sender, text) => {
      if (sender !== username) {
        console.log(getColor(username)(`[${username}] ${sender}: ${text}`));
      }
    };

    this.users.set(username, listener);
    this.emitter.on('message', listener);
  }

  leave(username) {
    const listener = this.users.get(username);
    if (!listener) {
      this.emitter.emit('error', `${username} is not in the room`);
      return;
    }
    this.emitter.off('message', listener);
    this.users.delete(username);
    console.log(chalk.cyan(`[SYSTEM] ${username} left the room`));
  }

  send(username, text) {
    if (!this.users.has(username)) {
      this.emitter.emit('error', `${username} cannot send messages (not in room)`);
      return;
    }
    if (!text || text.trim() === '') {
      this.emitter.emit('error', `Empty message from ${username}`);
      return;
    }
    this.messageCount++;
    this.emitter.emit('message', username, text);
  }

  getActiveUsers() {
    return [...this.users.keys()];
  }
}

const chatRoom3 = new FeaturedChatRoom();
chatRoom3.join('Alice');
chatRoom3.join('Bob');

chatRoom3.send('Alice', 'Hey everyone!');
chatRoom3.send('Bob', 'Hi Alice!');

chatRoom3.leave('Alice');

chatRoom3.send('Alice', 'Am I still here?');
chatRoom3.send('Bob', '');
chatRoom3.send('Bob', 'Anyone there?');

chatRoom3.leave('Bob');

console.log(chalk.magenta('\nActive users:'), chatRoom3.getActiveUsers());
console.log(chalk.magenta('Total messages sent:'), chatRoom3.messageCount);

console.log(chalk.bold.green('\n🎉 Mini project complete!\n'));

// ============================================
//! 📝 REFLECTIONS / LEARNING NOTES
// ============================================

// 1. EventEmitter patterns
// - Emits are cheap
// - Memory leaks come from unmanaged listeners
// - If you add a listener dynamically, you must remove it dynamically

// 2. Maps vs Sets
// - Map: store relationships (e.g., username -> listener)
// - Set: track presence or uniqueness (e.g., active users)

// 3. Closures
// - Carry context across time
// - Useful when behavior needs private memory

// 4. Mental Models
// - Inheritance exposes behavior
// - Composition hides behavior
// - Node apps are fundamentally about:
//     Sets of active things
//     Maps of relationships
//     Closures carrying context over time

// 5. Production advice
// - Use composition for internal events
// - Only expose public API methods
// - Validate inputs to prevent unexpected behavior
