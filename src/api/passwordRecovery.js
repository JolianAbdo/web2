import { app } from './realm'; // Import the initialized Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web

export const recoverPassword = async (username, newPassword) => {
    try {
        const credentials = Credentials.anonymous(); // Log in anonymously to MongoDB Realm
        const user = await app.logIn(credentials);
        const mongodb = user.mongoClient("mongodb-atlas");
        const usersCollection = mongodb.db("Login").collection("Users");

        // Update the password for the specified username
        const result = await usersCollection.updateOne(
            { username: username },
            { $set: { password: newPassword } }
        );

        if (result.matchedCount > 0) {
            return { success: true };
        } else {
            throw new Error("Username not found.");
        }
    } catch (err) {
        console.error("Failed to recover password:", err);
        throw err;
    }
};
