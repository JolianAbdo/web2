import { app } from './realm'; // Import the initialized Realm app
import { Credentials,BSON } from "realm-web";

export const addEvent = async (eventDetails) => {
    try {
        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        // Generate a unique ID for the event
        const eventId = new BSON.ObjectId().toString();

        await eventsCollection.insertOne({
            _id: new BSON.ObjectId(),
            id: eventId,
            ...eventDetails,
        });

        return eventId;
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};
