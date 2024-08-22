import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web


// Add a new Q&A session to the event
export const addQA = async (eventId, newQA) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    await eventsCollection.updateOne(
        { id: eventId },
        { $push: { qaSessions: { question: newQA.question, answer: newQA.answer } } }
    );
};

// Delete a Q&A session from the event
export const deleteQA = async (eventId, qaIndex) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    const event = await eventsCollection.findOne({ id: eventId });
    event.qaSessions.splice(qaIndex, 1);
    await eventsCollection.updateOne({ id: eventId }, { $set: { qaSessions: event.qaSessions } });
};
