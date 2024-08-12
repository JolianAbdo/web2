// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Events');

// Create a new document in the collection.
db.getCollection('messages').insertOne({
    "eventName": "big partyyy",
    "sender": "john_doe",
    "text": "Hello everyone!",
    "timestamp": { "$date": "2024-08-12T14:30:00Z" }
});
