import { app } from './realm'; // Import the initialized Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web

export const fetchEvents = async (filterForUser = false) => {
    try {
        const user = await app.logIn(Credentials.anonymous()); // Log in anonymously to MongoDB Realm
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        const loggedInUsername = localStorage.getItem("loggedInUsername");

        let query = {};
        if (filterForUser && loggedInUsername) {
            query = {
                attendees: loggedInUsername,
            };
        }

        const fetchedEvents = await eventsCollection.find(query); // Fetch events based on the query
        return fetchedEvents;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};
