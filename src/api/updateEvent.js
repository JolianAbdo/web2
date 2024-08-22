import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web

// Update event details in the database
export const updateEvent = async (eventId, updatedData) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");

    // Ensure the _id field is not included in the update operation
    const { _id, ...dataWithoutId } = updatedData;

    await eventsCollection.updateOne({ _id: eventId }, { $set: dataWithoutId });
};
