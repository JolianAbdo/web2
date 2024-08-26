import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { saveLiveLink } from '../../../api/liveVideo'; // Import back-end function
import LiveVideoHTML from "./LiveVideo.html"; // Import the HTML structure

const LiveVideo = ({ event, isCreator, eventId }) => {
    // State to manage the live video link and editing mode
    const [liveLink, setLiveLink] = useState(event?.liveLink || "");
    const [isEditingLiveLink, setIsEditingLiveLink] = useState(false);
    const [editedLiveLink, setEditedLiveLink] = useState(liveLink);

    // Update the live link when the event changes
    useEffect(() => {
        setLiveLink(event?.liveLink || "");
    }, [event]);

    // Function to save the new live video link
    const handleSaveLiveLink = async () => {
        // Update the live link in the UI immediately
        setLiveLink(editedLiveLink);
        setIsEditingLiveLink(false);

        try {
            // Save the new live link to the database
            await saveLiveLink(eventId, editedLiveLink);

            // Send the update to WebSocket server
            const ws = new WebSocket('wss://websocket-server-virtual-event-platform.fly.dev/');
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: 'liveLinkUpdate',
                    eventId: eventId,
                    liveLink: editedLiveLink
                }));
                ws.close(); // Close the WebSocket connection after sending
            };
        } catch (error) {
            console.error("Failed to save live link:", error);
        }
    };

    // Render the component using the imported HTML structure
    return LiveVideoHTML({
        liveLink,
        isCreator,
        isEditingLiveLink,
        editedLiveLink,
        setEditedLiveLink,
        setIsEditingLiveLink,
        handleSaveLiveLink,
    });
};

export default LiveVideo;
