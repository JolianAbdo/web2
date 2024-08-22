import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import {
  EventDetails,
  LiveVideo,
  LiveChat,
  LivePolls,
  QASessions,
  NetworkingOpportunities,
} from "./components"; // Import all components from the components directory
import { fetchEvent } from "./api/fetchEvent"; // Import the fetchEvent function from the api directory
import { deleteEvent } from "./api/deleteEvent"; // Import the deleteEvent function

const OpenEvent = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  // Fetch the event data when the component mounts
  useEffect(() => {
    const fetchAndSetEvent = async () => {
      const fetchedEvent = await fetchEvent(eventId); // Fetch event from the database
      setEvent(fetchedEvent);
      setIsCreator(
        fetchedEvent?.creator === localStorage.getItem("loggedInUsername")
      );
    };

    if (eventId) fetchAndSetEvent();
    else route("/", true); // Redirect to home if no eventId
  }, [eventId]);

  // Handle the event deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId); // Call the API to delete the event
        route("/event-dashboard", true); // Redirect to the event-dashboard page after deletion
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  return (
    <div class="bg-gray-100 dark:bg-slate-600 font-sans leading-relaxed tracking-wide flex flex-col">
      <main class="container mx-auto p-6 flex-grow">
        {/* Event Details Component */}
        <EventDetails
          event={event}
          onEdit={setEvent}
          onDelete={handleDelete}
          isCreator={isCreator}
          eventId={eventId} // Pass the event ID here
        />

        {/* Live Video Component */}
        <LiveVideo event={event} isCreator={isCreator} />
        {/* Chat and Live Polls Section */}
        <section class="flex flex-col lg:flex-row bg-white dark:bg-slate-400 p-6 rounded-lg shadow-md mb-8">
          {/* Live Chat Component */}
          <LiveChat
            eventId={eventId}
            chatMessages={event?.chatHistory || []}
            username={localStorage.getItem("loggedInUsername") || "Guest"}
          />

          {/* Live Polls Component */}
          <LivePolls
            polls={event?.polls || []}
            isCreator={isCreator}
            eventId={eventId}
          />
        </section>
        {/* Q&A Sessions Component */}
        <QASessions
          qaSessions={event?.qaSessions || []}
          isCreator={isCreator}
          eventId={eventId}
        />

        {/* Networking Opportunities Component */}
        <NetworkingOpportunities
          opportunities={event?.networkingOpportunities || []}
          isCreator={isCreator}
          eventId={eventId}
        />
      </main>
    </div>
  );
};

export default OpenEvent;
