// src/api/login.js

import { app } from './realm'; // Import the initialized Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web

export const loginUser = async (username, password) => {
    try {
        // Log in anonymously to MongoDB Realm
        const credentials = Credentials.anonymous(); // Correctly accessing the anonymous method
        const anonymousUser = await app.logIn(credentials);

        // Access the MongoDB database
        const mongodb = anonymousUser.mongoClient("mongodb-atlas");
        const usersCollection = mongodb.db("Login").collection("Users");

        // Query the Users collection for the provided username and password
        const user = await usersCollection.findOne({ username, password });

        // Return the user object if found, otherwise throw an error
        if (user) {
            return user;
        } else {
            throw new Error("Invalid username or password.");
        }
    } catch (err) {
        console.error("Failed to log in", err);
        throw err;
    }
};
