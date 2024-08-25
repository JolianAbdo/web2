import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { fetchEvents } from './api/fetchEvents'; // Import the backend function

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setUsername(localStorage.getItem("loggedInUsername"));

        // Fetch events from the backend
        const eventsList = await fetchEvents();
        setEvents(eventsList);
        setFilteredEvents(eventsList);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initializeDashboard();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredEvents(events);
      return;
    }

    const tagMatches = query.match(/"([^"]+)"/g)?.map(tag => tag.replace(/"/g, '').toLowerCase()) || [];
    const textQuery = query.replace(/"[^"]+"/g, '').trim();

    const filtered = events.filter(event => {
      const matchesTextQuery = textQuery && (
        event.name.toLowerCase().includes(textQuery) ||
        event.details.toLowerCase().includes(textQuery) ||
        event.creator.toLowerCase().includes(textQuery) ||
        new Date(event.date).toLocaleDateString().toLowerCase().includes(textQuery) ||
        event.time.toLowerCase().includes(textQuery) ||
        (textQuery === 'join event' && event.attendees.includes(username)) ||
        (textQuery === 'not invited' && !event.attendees.includes(username))
      );

      const matchesTags = tagMatches.length > 0 ? tagMatches.every(tag => event.tags?.some(eTag => eTag.toLowerCase() === tag)) : true;

      if (tagMatches.length > 0 && textQuery !== '') {
        return matchesTextQuery && matchesTags;
      } else if (tagMatches.length > 0) {
        return matchesTags;
      } else {
        return matchesTextQuery;
      }
    });

    setFilteredEvents(filtered);
  };

  const handleJoinEvent = (eventId) => {
    // Redirect to the event details page using event ID
    route(`/open-event/${eventId}`);
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">All Events</h2>

      <input
        type="text"
        placeholder='Search events... (e.g., conference. use double quotes to search in tags, like "AI". type join event to see events you can join)'
        value={searchQuery}
        onInput={handleSearchChange}
        class="w-full px-4 py-2 mb-4 border rounded-md dark:bg-slate-700 dark:text-gray-200"
      />

      <ul class="space-y-4 h-screen overflow-y-auto">
        {filteredEvents.map((event) => (
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
