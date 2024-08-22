import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web


// Update event details in the database
export const updateEvent = async (eventId, updatedData) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    await eventsCollection.updateOne({ id: eventId }, { $set: updatedData });
};
