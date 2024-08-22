import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web


// Add a networking opportunity to the event
export const addOpportunity = async (eventId, newOpportunity) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    const updatedOpportunities = [
        { title: newOpportunity.title, link: newOpportunity.link }
    ];
    await eventsCollection.updateOne({ id: eventId }, { $push: { networkingOpportunities: updatedOpportunities } });
};

// Delete a networking opportunity from the event
export const deleteOpportunity = async (eventId, index) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    const event = await eventsCollection.findOne({ id: eventId });
    event.networkingOpportunities.splice(index, 1);
    await eventsCollection.updateOne({ id: eventId }, { $set: { networkingOpportunities: event.networkingOpportunities } });
};
