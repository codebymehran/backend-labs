# streams
**Date:** December 20, 2025
// Hyper + i → home (line start)

// Hyper + o → end (line end)

// Hyper + Command + i → select to home

// Hyper + Command + o → select to end

// Hyper + Option + Command + i → select whole line to head

// Hyper + Option + Command + o → select whole line

Node cannot directly touch hardware (disk, network card, etc.).
Only the operating system (OS) can do that.

Node sits in between sources and destinations.
It reads from one place and transfers data to another.
So Node is a coordinator / traffic controller. Node is always the middleman, coordinating movement of bytes safely.

Node.js is a byte-moving coordinator that safely transfers data between disk, memory, and network.

Why Node talks in “bytes”

Because:

Files are bytes

Memory is bytes

Networks send bytes

So Node operates at the byte level, not:

“text” “images” “videos”

// Node reads the file in small buffers (chunks) and sends them through streams. This prevents memory from filling up and allows backpressure to control the flow.



// Buffers store raw bytes temporarily. Streams move these buffers efficiently between source and destination. Backpressure pauses/resumes the flow to avoid piling up buffers in memory.



// Text files → use encoding if you want strings

//Binary files (images, videos, etc.) → don’t set encoding, work with buffers,



// highWaterMark = the size of the bucket your stream fills before pausing.



// Small bucket → more frequent reads, less memory



// Large bucket → fewer reads, more memory, Default is 64 KB for file streams (64 bytes * 1024)



// A Node.js server reads data from sources and writes data to destinations, often at the same time, using streams so it never reads or writes more than memory can handle.

❌ Wrong question

“Why is the server writing text here?”

✅ Correct question

“What destination is this writable stream connected to?”


## The last mental knot to untangle.

HOW does Node give bytes to the OS?

Node cannot directly touch hardware (disk, network card, etc.).
Only the operating system (OS) can do that.

So Node communicates with the OS using system calls (you don’t see them in JS).

### What this looks like conceptually

When you write:

`res.write('Hello');`


This is what really happens:

Your JS string "Hello" is converted into bytes

72 101 108 108 111


Node stores those bytes in a Buffer (RAM)

Node calls the OS and says (conceptually):

“Here are some bytes. Please send them over this network socket.”

The OS:

takes those bytes

breaks them into bits

sends electrical/light/radio signals

delivers them to the client

So Node doesn’t push signals itself — it hands bytes to the OS, and the OS does the physical work.

📌 This is what “Node gives bytes to the OS” really means.

thinking “Who is the destination?” is the single most important question.

Destination = disk → use fs.createWriteStream

Destination = client → use res.write (HTTP)

Destination = another server → pipe to a socket

Remember: an endpoint is simply where bytes come from or go to. Node just moves bytes between endpoints.

Disk → Disk Example: copying a file
Node reads bytes from disk, temporarily stores them in buffers, and writes them back to disk.



/**
 * WHY CAN WE WRITE reader.on(...).on(...) ?
 *
 * In JavaScript, method chaining works when a method
 * returns the SAME object it was called on.
 *
 * reader.on(event, handler):
 * - registers an event listener
 * - then returns `reader` again
 *
 * Because it returns the same stream object,
 * we can immediately call `.on()` again on it.
 *
 * These two are EXACTLY the same:
 *
 * reader.on('error', fn);
 * reader.on('end', fn);
 *
 * reader.on('error', fn).on('end', fn);
 *
 * Chaining does NOT mean events run in order.
 * It only means we are registering listeners in a cleaner way.
 */




/**
 * WHAT IS process.stdout ?
 *
 * process.stdout represents the terminal output (console).
 * It is NOT just text output — it is a Writable Stream.
 *
 * console.log() internally writes to process.stdout,
 * but console.log is slow and not stream-friendly.
 *
 * fs.createReadStream() creates a Readable Stream.
 * process.stdout is a Writable Stream.
 *
 * Using pipe():
 * reader.pipe(process.stdout)
 *
 * means:
 * - read data from the file
 * - send it directly to the terminal
 * - Node automatically handles flow and backpressure
 *
 * This is more efficient and is the correct way
 * to move data between streams in Node.js.
 */




## Progress
- [ ] Exercise 1
- [ ] Exercise 2
- [ ] Exercise 3
- [ ] Exercise 4
- [ ] Exercise 5
- [ ] Mini Project
