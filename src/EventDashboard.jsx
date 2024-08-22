import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { App as RealmApp, Credentials } from "realm-web";
import { route } from 'preact-router';

// MongoDB auth
const app = new RealmApp({ id: "application-0-wjjnjup" });

const EventDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const user = await app.logIn(Credentials.anonymous());
        setLoggedInUser(user);
        setUsername(localStorage.getItem("loggedInUsername"));

        // Fetch events
        await displayEvents(user);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    }
    init();
  }, []);

  const displayEvents = async (user) => {
    try {
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");
      const fetchedEvents = await eventsCollection.find({});
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleJoinEvent = (eventId) => {
    // Redirect to the event details page using event ID
    route(`/open-event/${eventId}`);
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">All Events</h2>
      <ul class="space-y-4 h-screen overflow-y-auto">
        {events.map((event) => (
          <li key={event.id} class="bg-white p-4 rounded-md dark:bg-slate-300 shadow-md">
            <h4 class="text-lg font-semibold">{event.name}</h4>
            <p class="text-md text-gray-800">{event.details}</p>
            <p class="text-sm text-gray-600">Creator: {event.creator}</p>
            <p class="text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}, {event.time}</p>
            {/* Display tags */}
            <div>
                <ul class="flex flex-wrap space-x-2">
                  {event.tags?.map((tag) => (
                    <li key={tag} class="bg-blue-200 text-blue-700 p-1 rounded">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            <div class="flex space-x-2 mt-2">
              {event.attendees.includes(username) ? (
                <button onClick={() => handleJoinEvent(event.id)} class="px-3 py-1 bg-blue-500 text-white rounded-md">Join Event</button>
              ) : (
                <button disabled class="px-3 py-1 bg-gray-300 text-gray-600 rounded-md">Not Invited</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDashboard;
