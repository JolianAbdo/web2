import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import OpenEventHTML from "./OpenEvent.html"; // Import the HTML structure
import { fetchEvent } from "../../api/fetchEvent"; // Import the fetchEvent function from the api directory

const OpenEvent = ({ eventId }) => {
  const [event, setEvent] = useState(null); // State to manage the event data
  const [isCreator, setIsCreator] = useState(false); // State to determine if the logged-in user is the event creator

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

          case "eventDelete":
            // Perform any additional cleanup if needed, then redirect
            route("/events-dashboard", true);
            break;

          case "liveLinkUpdate":
            setEvent((prev) => ({ ...prev, liveLink: parsedData.liveLink }));
            break;

          case "chatUpdate":
            // Chat updates handled within LiveChat component
            break;

          case "pollUpdate":
            setEvent((prev) => ({
              ...prev,
              polls: prev.polls.map((poll, index) =>
                index === parsedData.pollIndex ? parsedData.updatedPoll : poll
              ),
            }));
            break;

          case "pollAdd":
            setEvent((prev) => ({
              ...prev,
              polls: [...(prev.polls || []), parsedData.newPoll],
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
            setEvent((prev) => ({
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
            setEvent((prev) => ({
              ...prev,
              networkingOpportunities: [
                ...(prev.networkingOpportunities || []),
                parsedData.newOpportunity,
              ],
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

  // Render the component using the imported HTML structure
  return OpenEventHTML({
    event,
    isCreator,
    eventId,
    setEvent,
  });
};

export default OpenEvent;
