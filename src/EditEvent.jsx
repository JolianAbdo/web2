import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { App as RealmApp, Credentials } from "realm-web";

// initialize the realm app with the application id
const app = new RealmApp({ id: "application-0-wjjnjup" });

const EditEvent = () => {
  // state management for event details and attendees
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [eventId, setEventId] = useState('');

  useEffect(() => {
    // retrieve the current event name from local storage
    const currentEventName = localStorage.getItem('currentEventName');
    if (!currentEventName) {
      console.error("no event name found in local storage");
      route('/event-page'); // redirect back if event name is not found
      return;
    }

    const fetchData = async () => {
      try {
        // log in anonymously to mongodb realm
        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("EventsForUser");

        // use the event name to fetch the event data
        const event = await eventsCollection.findOne({ name: currentEventName });
        if(event) {
          // set state with event details if found
          setEventName(event.name);
          setEventDate(event.date);
          setEventTime(event.time);
          setAttendees(event.attendees);
          setEventId(event._id);
          // fetch all users excluding the current one
          const usersCollection = mongodb.db("Login").collection("Users");
          const users = await usersCollection.find({});
          setAllUsers(users.map(user => user.username).filter(username => username !== localStorage.getItem("loggedInUsername")));
        } else {
          console.error("event not found");
          route('/event-page'); // redirect back if event is not found
        }
      } catch (error) {
        console.error("failed to fetch event or user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!eventId) {
      alert('event id is missing.');
      return;
    }
  
    try {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("EventsForUser");
  
      // update the event details in the database
      await eventsCollection.updateOne(
        { _id: eventId },
        {
          $set: {
            name: eventName,
            date: eventDate,
            time: eventTime,
            attendees,
          },
        }
      );
  
      // clean up local storage and navigate back to the main page
      localStorage.removeItem('currentEventName'); 
      route('/event-page'); 
    } catch (error) {
      console.error("failed to update the event:", error);
    }
  };
  

  const handleCancel = () => {
    // remove current event from local storage and navigate back
    localStorage.removeItem('currentEvent');
    route('/event-page');
  };

  const handleAttendeeChange = (username, isSelected) => {
    // update the list of attendees based on user selection
    if (isSelected) {
      setAttendees(prev => [...prev, username]);
    } else {
      setAttendees(prev => prev.filter(u => u !== username));
    }
  };

  return (
    <div class="container mx-auto p-6 bg-gray-100">
      <h2 class="text-xl font-semibold mb-4">Edit Event: {eventName}</h2>
      {/* Event Name Input */}
      <div class="mb-4">
        <label class="block text-black font-medium mb-2" htmlFor="eventName">Event Name</label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          class="w-full px-3 py-2 border dark:bg-slate-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Date Input */}
      <div class="mb-4">
        <label class="block text-black font-medium mb-2" htmlFor="eventDate">Event Date</label>
        <input
          type="date"
          id="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          class="w-full px-3 py-2 border dark:bg-slate-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Time Input */}
      <div class="mb-4">
        <label class="block text-black font-medium mb-2" htmlFor="eventTime">Event Time</label>
        <input
          type="time"
          id="eventTime"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          class="w-full px-3 py-2 border dark:bg-slate-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {/* Attendees Selection */}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Attendees
        </label>
        {allUsers.map(username => (
          <div key={username}>
            <input
              type="checkbox"
              id={`attendee-${username}`}
              checked={attendees.includes(username)}
              onChange={(e) => handleAttendeeChange(username, e.target.checked)}
            />
            <label htmlFor={`attendee-${username}`} class="ml-2">
              {username}
            </label>
          </div>
        ))}
      </div>
      {/* Save and Cancel Buttons */}
      <div class="flex justify-end mt-4">
        <button
          onClick={handleSave}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
