import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { fetchEvents } from '../../api/fetchEvents'; // Import the backend function
import EventDashboardHTML from './EventDashboard.html'; // Import the HTML structure

const EventDashboard = () => {
  // State variables for events, filtered events, search query, and username
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  // useEffect to initialize the dashboard by fetching events and setting the username
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

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredEvents(events);
      return;
    }

    // Process the search query to handle tags and text search
    const tagMatches = query.match(/"([^"]+)"/g)?.map(tag => tag.replace(/"/g, '').toLowerCase()) || [];
    const textQuery = query.replace(/"[^"]+"/g, '').trim();

    // Filter events based on the search query
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

  // Handle event joining
  const handleJoinEvent = (eventId) => {
    route(`/open-event/${eventId}`); // Redirect to the event details page
  };

  return EventDashboardHTML({
    searchQuery,
    filteredEvents,
    handleSearchChange,
    handleJoinEvent,
    username
  });
};

export default EventDashboard;
