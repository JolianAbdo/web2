import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web

// Update chat history in the database and notify via WebSocket
export const updateChat = async (eventId, newMessage) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");

    // Update the chat history in the database
    await eventsCollection.updateOne(
        { id: eventId },
        { $push: { chatHistory: newMessage } }
    );

    // Notify all connected clients via WebSocket
    const ws = new WebSocket('wss://websocket-server-virtual-event-platform.fly.dev/');

    ws.onopen = () => {
        // Send a message to the WebSocket server, indicating a new chat message
        ws.send(JSON.stringify({
            type: 'chatUpdate',
            eventId: eventId,
            message: newMessage
        }));
        ws.close(); // Close the connection after sending the message
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};
