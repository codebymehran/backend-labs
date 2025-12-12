// Date: December 10, 2025
// ### Exercise 5: Event Listener Memory Management
// Create a subscription system that properly manages listener lifecycle.
// - Build a 'PubSub' class where users can subscribe/unsubscribe to topics
// - Each subscription should track its listener reference
// - Implement an unsubscribe method that removes the correct listener
// - Create 5 subscribers, unsubscribe 2 specific ones, emit an event
// - Log active listener count before and after unsubscribing
// - Expected output: Verify exactly 3 listeners remain active and receive the event

console.log('\n📂 Running: modules/events/exercise-05.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ WORKING SOLUTION
// ============================================

// ============================================
// PSEUDOCODE - Exercise 5: Memory Management
// ============================================

// 1. Import EventEmitter
import { EventEmitter } from 'events'

// 2. Define a PubSub Class extending EventEmitter
class PubSub extends EventEmitter {
    // Constructor (optional, as no new properties are needed yet)

    // Method to subscribe
    subscribe(topic, handlerFunction) {
        console.log("Subscribing to topic:", topic)
        // Use the inherited .on() method to attach the handler function
        this.on(topic, handlerFunction)
    }

    // Method to unsubscribe
    unsubscribe(topic, handlerFunction) {
        console.log("Unsubscribing from topic:", topic)
        // Use the inherited .off() or .removeListener() method
        // Must provide both the topic name AND the exact function reference to remove it
        this.off(topic, handlerFunction)
    }

    // Method to publish (emit) an event
    publish(topic, message) {
        console.log("Publishing to topic:", topic);
        // Use the inherited .emit() method
        this.emit(topic, message)
    }
}

// 3. Create an instance of PubSub
const manager = new PubSub()
const TOPIC_NAME = 'user:update'

// 4. Define 5 unique handler functions (named functions recommended for removal)
function handlerA(msg) { console.log("A received:"), msg }
function handlerB(msg) { console.log("B received:"), msg }
function handlerC(msg) { console.log("C received:"), msg }
function handlerD(msg) { console.log("D received:"), msg }
function handlerE(msg) { console.log("E received:"), msg }


// 5. Subscribe all 5 handlers to the TOPIC_NAME
manager.subscribe(TOPIC_NAME, handlerA)
manager.subscribe(TOPIC_NAME, handlerB)
manager.subscribe(TOPIC_NAME, handlerC)
manager.subscribe(TOPIC_NAME, handlerD)
manager.subscribe(TOPIC_NAME, handlerE)


// 6. Log the active listener count (use the listenerCount() method)
print "\nActive listeners BEFORE unsubscribe:", manager.listenerCount(TOPIC_NAME)
// Expected count: 5


// 7. Unsubscribe 2 specific handlers (e.g., B and D)
manager.unsubscribe(TOPIC_NAME, handlerB)
manager.unsubscribe(TOPIC_NAME, handlerD)


// 8. Log the active listener count AGAIN
print "Active listeners AFTER unsubscribe:", manager.listenerCount(TOPIC_NAME)
// Expected count: 3


// 9. Publish an event to the topic
print "\n--- Publishing Event ---"
manager.publish(TOPIC_NAME, "System Update 4.1.0")

// Expected output: Handlers A, C, and E should log the message.


// ============================================
//! 📝 REFACTORING NOTES
// ============================================
// What I learned:
// -
//
// What I'd change if I came back:
// -
//
// Questions I still have:
// -

