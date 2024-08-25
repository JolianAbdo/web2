import { app } from './realm'; // Import the initialized Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web

export const registerUser = async (username, password) => {
    try {
        const credentials = Credentials.anonymous(); // Log in anonymously to MongoDB Realm
        const user = await app.logIn(credentials);
        const mongodb = user.mongoClient("mongodb-atlas");
        const usersCollection = mongodb.db("Login").collection("Users");

        // Check if the username already exists
        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists. Please choose another one.');
        }

        // Insert the new user into the collection
        await usersCollection.insertOne({
            username,
            password,
        });

        return { success: true };
    } catch (err) {
        console.error("Failed to register user:", err);
        throw err;
    }
};
