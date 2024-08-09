import React, { useEffect, useState } from 'react';
import { route } from 'preact-router'; // Ensure route is imported

const EventDashboard = ({ user }) => {
  const [events, setEvents] = useState([]);

  // Fetch events from MongoDB
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("EventsForUser");
        const fetchedEvents = await eventsCollection.find({}).toArray();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    const displayEvents = async (user) => {
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("EventsForUser");
      const fetchedEvents = await eventsCollection.find({});
      setEvents(fetchedEvents);
    };  
    displayEvents(user);
    fetchEvents();
  }, [user]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("EventsForUser");
      await eventsCollection.deleteOne({ _id: eventId });
      await fetchAndUpdateEvents(); // Refresh the events
    } catch (error) {
      console.error("Error deleting event:", error);
      alert('Failed to delete the event, please try again');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event Dashboard</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} class="bg-white p-4 rounded-md dark:bg-slate-300 shadow-md">
                <h4 class="text-md font-semibold">{event.name}</h4>
                <p class="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p class="text-sm text-gray-600">Time: {event.time}</p>
                <p class="text-sm text-gray-600">Attendees: {event.attendees.join(', ')}</p>
                <div class="flex space-x-2 mt-2">
                  {/* <button onClick={() => handleEditEvent(event.name)} class="px-3 py-1 bg-yellow-500 text-white rounded-md">Edit</button> */}
                  <button onClick={() => handleDeleteEvent(event._id)} class="px-3 py-1 bg-red-500 text-white rounded-md">Delete</button>
                </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDashboard;
