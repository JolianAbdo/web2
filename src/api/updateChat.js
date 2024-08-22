import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web


// Update chat history in the database
export const updateChat = async (eventId, newMessage) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    await eventsCollection.updateOne(
        { id: eventId },
        { $push: { chatHistory: newMessage } }
    );
};
