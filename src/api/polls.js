import { app } from './realm'; // Import MongoDB Realm app
import { Credentials } from "realm-web"; // Import Credentials from realm-web


// Add a new poll to the event
export const addPoll = async (eventId, newPoll) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    const newPollData = {
        question: newPoll.question,
        options: newPoll.options.map((opt) => ({ option: opt, counter: 0 })),
    };
    await eventsCollection.updateOne({ id: eventId }, { $push: { polls: newPollData } });
};

// Delete a poll from the event
export const deletePoll = async (eventId, pollIndex) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    const event = await eventsCollection.findOne({ id: eventId });
    event.polls.splice(pollIndex, 1);
    await eventsCollection.updateOne({ id: eventId }, { $set: { polls: event.polls } });
};

// Update poll options in the database
export const updatePoll = async (eventId, pollIndex, selectedOptionIndex) => {
    const user = await app.logIn(Credentials.anonymous());
    const mongodb = user.mongoClient("mongodb-atlas");
    const eventsCollection = mongodb.db("Events").collection("Events");
    const event = await eventsCollection.findOne({ id: eventId });
    event.polls[pollIndex].options[selectedOptionIndex].counter += 1;
    await eventsCollection.updateOne({ id: eventId }, { $set: { polls: event.polls } });
};
