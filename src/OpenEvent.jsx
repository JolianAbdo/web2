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

const OpenEvent = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    // Fetch the event data when the component mounts
    const fetchAndSetEvent = async () => {
      const fetchedEvent = await fetchEvent(eventId); // Fetch event from the database
      setEvent(fetchedEvent);
      setIsCreator(
        fetchedEvent?.creator === localStorage.getItem("loggedInUsername")
      );
    };

    if (eventId) {
      fetchAndSetEvent();
    } else {
      route("/", true); // Redirect to home if no eventId
    }

    // Establish WebSocket connection
    const ws = new WebSocket(
      "wss://websocket-server-virtual-event-platform.fly.dev/"
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ type: "join", eventId })); // Notify server of the event room joined
    };

    ws.onmessage = async (event) => {
      try {
        let data;

        // Check if the data is a Blob
        if (event.data instanceof Blob) {
          data = await event.data.text();
        } else if (event.data instanceof ArrayBuffer) {
          const textDecoder = new TextDecoder();
          data = textDecoder.decode(new Uint8Array(event.data));
        } else {
          data = event.data; // Assume it's already a string
        }

        const parsedData = JSON.parse(data); // Parsing the received JSON data
        console.log("Received data:", parsedData);

        // Handle the parsed data based on the type of update
        switch (parsedData.type) {
          case "eventUpdate":
            setEvent(parsedData.event);
            break;

          case "liveLinkUpdate":
            setEvent((prev) => ({ ...prev, videoUrl: parsedData.videoUrl }));
            break;

          case "chatUpdate":
            // Chat updates handled within LiveChat component
            break;


          case "pollAdd":
            setEvent(prev => ({
              ...prev,
              polls: [...(prev.polls || []), parsedData.newPoll]
            }));
            break;

          case "pollDelete":
            setEvent((prev) => ({
              ...prev,
              polls: (prev.polls || []).filter(
                (_, index) => index !== parsedData.pollIndex
              ),
            }));
            break;


            case "qaAdd":
              setEvent(prev => ({
                  ...prev,
                  qaSessions: [...(prev.qaSessions || []), parsedData.newQA],
              }));
              break;

          case "qaDelete":
            setEvent((prev) => ({
              ...prev,
              qaSessions: (prev.qaSessions || []).filter(
                (_, index) => index !== parsedData.qaIndex
              ),
            }));
            break;


            case "opportunityAdd":
              setEvent(prev => ({
                  ...prev,
                  networkingOpportunities: [
                      ...(prev.networkingOpportunities || []),
                      parsedData.newOpportunity
                  ]
              }));
              break;
          

          case "opportunityDelete":
            setEvent((prev) => ({
              ...prev,
              networkingOpportunities: (
                prev.networkingOpportunities || []
              ).filter((_, index) => index !== parsedData.opportunityIndex),
            }));
            break;

          default:
            console.warn("Unknown update type:", parsedData.type);
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close(); // Clean up the WebSocket connection on component unmount
    };
  }, [eventId]);

  return (
    <div class="bg-gray-100 dark:bg-slate-600 font-sans leading-relaxed tracking-wide flex flex-col">
      <main class="container mx-auto p-6 flex-grow">
        {/* Event Details Component */}
        <EventDetails
          event={event}
          onEdit={setEvent}
          onDelete={() => route("/", true)}
          isCreator={isCreator}
          eventId={eventId}
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
