import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { addOpportunity, deleteOpportunity } from '../../../api/opportunities'; // Import back-end functions
import NetworkingOpportunitiesHTML from "./NetworkingOpportunities.html"; // Import the HTML structure

const NetworkingOpportunities = ({ opportunities = [], isCreator, eventId }) => {
    // State to manage the list of networking opportunities and form inputs
    const [opportunityList, setOpportunityList] = useState([]);
    const [newOpportunity, setNewOpportunity] = useState({ title: "", link: "" });
    const [isAddingOpportunity, setIsAddingOpportunity] = useState(false);

    // Update the opportunity list when the prop changes
    useEffect(() => {
        setOpportunityList(opportunities);
    }, [opportunities]);

    // Function to send a message via WebSocket
    const sendWebSocketMessage = (message) => {
        const ws = new WebSocket('wss://websocket-server-virtual-event-platform.fly.dev/');
        ws.onopen = () => {
            ws.send(JSON.stringify(message));
            ws.close();
        };
    };

    // Add a new networking opportunity
    const handleSaveOpportunity = async () => {
        if (newOpportunity.title.trim() && newOpportunity.link.trim()) {
            const newOpportunityData = { ...newOpportunity };

            // Update the UI with the new opportunity
            setOpportunityList((prevOpportunities) => [...prevOpportunities, newOpportunityData]);
            setIsAddingOpportunity(false);

            // Save the new opportunity to the database
            await addOpportunity(eventId, newOpportunityData);

            // Notify all connected clients via WebSocket
            sendWebSocketMessage({
                type: 'opportunityAdd',
                eventId: eventId,
                newOpportunity: newOpportunityData,
            });

            // Reset the new opportunity form
            setNewOpportunity({ title: "", link: "" });
        }
    };

    // Delete a networking opportunity
    const handleDeleteOpportunity = async (index) => {
        // Remove opportunity from local state
        const updatedOpportunityList = opportunityList.filter((_, i) => i !== index);
        setOpportunityList(updatedOpportunityList);

        // Delete opportunity from the database
        await deleteOpportunity(eventId, index);

        // Notify all connected clients via WebSocket
        sendWebSocketMessage({
            type: 'opportunityDelete',
            eventId: eventId,
            opportunityIndex: index,
        });
    };

    // Render the component using the imported HTML structure
    return NetworkingOpportunitiesHTML({
        opportunityList,
        isCreator,
        isAddingOpportunity,
        newOpportunity,
        setNewOpportunity,
        setIsAddingOpportunity,
        handleSaveOpportunity,
        handleDeleteOpportunity,
    });
};

export default NetworkingOpportunities;
