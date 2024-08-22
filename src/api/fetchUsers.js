import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials

// Fetch all users from the database
export const fetchUsers = async () => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const usersCollection = mongodb.db("Login").collection("Users");
    return await usersCollection.find({});
};
