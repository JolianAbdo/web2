import { app } from './realm'; // Assuming you have a MongoDB Realm app setup
import { Credentials } from "realm-web"; // Import Credentials if needed

export const saveLiveLink = async (eventId, liveLink) => {
    try {
        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        await eventsCollection.updateOne(
            { id: eventId },
            { $set: { liveLink: liveLink } }
        );

        console.log("Live link updated successfully");
    } catch (error) {
        console.error("Failed to update live link:", error);
        throw error;
    }
};
