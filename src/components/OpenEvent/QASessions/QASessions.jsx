import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { addQA, deleteQA } from '../../../api/qa'; // Import back-end functions
import QASessionsHTML from "./QASessions.html"; // Import the HTML structure

const QASessions = ({ qaSessions = [], isCreator, eventId }) => {
    // State to manage the list of Q&A sessions and form inputs
    const [qaList, setQaList] = useState([]);
    const [newQA, setNewQA] = useState({ question: "", answer: "" });
    const [isAddingQA, setIsAddingQA] = useState(false);

    // Update the Q&A list when the prop changes
    useEffect(() => {
        setQaList(qaSessions);
    }, [qaSessions]);

    // Function to send a message via WebSocket
    const sendWebSocketMessage = (message) => {
        const ws = new WebSocket('wss://websocket-server-virtual-event-platform.fly.dev/');
        ws.onopen = () => {
            ws.send(JSON.stringify(message));
            ws.close();
        };
    };

    // Add a new Q&A session
    const handleSaveQA = async () => {
        if (newQA.question.trim() && newQA.answer.trim()) {
            const newQAData = { ...newQA };

            // Update the UI with the new Q&A session
            setQaList((prevQaList) => [...prevQaList, newQAData]);
            setIsAddingQA(false);

            // Save the new Q&A session to the database
            await addQA(eventId, newQAData);

            // Notify all connected clients via WebSocket
            sendWebSocketMessage({
                type: 'qaAdd',
                eventId: eventId,
                newQA: newQAData,
            });

            // Reset the new Q&A form
            setNewQA({ question: "", answer: "" });
        }
    };

    // Delete a Q&A session
    const handleDeleteQA = async (qaIndex) => {
        // Remove Q&A from local state
        const updatedQaList = qaList.filter((_, index) => index !== qaIndex);
        setQaList(updatedQaList);

        // Delete Q&A from the database
        await deleteQA(eventId, qaIndex);

        // Notify all connected clients via WebSocket
        sendWebSocketMessage({
            type: 'qaDelete',
            eventId: eventId,
            qaIndex: qaIndex,
        });
    };

    // Render the component using the imported HTML structure
    return QASessionsHTML({
        qaList,
        isCreator,
        isAddingQA,
        newQA,
        setNewQA,
        setIsAddingQA,
        handleSaveQA,
        handleDeleteQA,
    });
};

export default QASessions;
