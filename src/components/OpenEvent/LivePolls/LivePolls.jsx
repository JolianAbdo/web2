import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { addPoll, deletePoll, updatePoll } from "../../../api/polls"; // Import back-end functions
import LivePollsHTML from "./LivePolls.html.jsx"; // Import the HTML structure

const LivePolls = ({ polls = [], isCreator, eventId }) => {
  // State to manage poll list, new poll data, selected poll, poll selections, and poll creation state
  const [pollList, setPollList] = useState([]);
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", "", "", ""],
  });
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [pollSelections, setPollSelections] = useState({});
  const [isAddingPoll, setIsAddingPoll] = useState(false);

  // Effect to initialize the poll list when the component mounts or polls prop changes
  useEffect(() => {
    setPollList(polls);
  }, [polls]);

  // Function to send a message via WebSocket
  const sendWebSocketMessage = (message) => {
    const ws = new WebSocket(
      "wss://websocket-server-virtual-event-platform.fly.dev/"
    );
    ws.onopen = () => {
      ws.send(JSON.stringify(message));
      ws.close();
    };
  };

  // Function to handle poll option selection and update the UI immediately
  const handleOptionSelect = async (pollIndex, selectedOptionIndex) => {
    const updatedPolls = [...pollList];
    updatedPolls[pollIndex].options[selectedOptionIndex].counter += 1;

    setPollSelections({
      ...pollSelections,
      [pollIndex]: selectedOptionIndex,
    });

    setPollList(updatedPolls); // Update the state immediately to show the result

    // Save the updated poll to the database
    await updatePoll(eventId, pollIndex, selectedOptionIndex);

    // Notify all connected clients via WebSocket
    sendWebSocketMessage({
      type: "pollUpdate",
      eventId: eventId,
      pollIndex: pollIndex,
      selectedOptionIndex: selectedOptionIndex,
    });
  };

  // Function to add a new poll and show it immediately in the UI
  const handleSavePoll = async () => {
    if (!newPoll.question.trim() || !newPoll.options.every(opt => opt.trim())) {
      console.warn("Cannot add poll: invalid data");
      return;
    }

    const newPollData = {
      question: newPoll.question,
      options: newPoll.options.map((opt) => ({ option: opt, counter: 0 })),
    };

    setPollList((prevPolls) => [...prevPolls, newPollData]);
    setIsAddingPoll(false);

    await addPoll(eventId, newPollData);

    sendWebSocketMessage({
      type: "pollAdd",
      eventId: eventId,
      newPoll: newPollData,
    });

    setNewPoll({ question: "", options: ["", "", "", ""] });
  };

  // Function to delete a poll
  const handleDeletePoll = async (pollIndex) => {
    const updatedPollList = pollList.filter((_, index) => index !== pollIndex);
    setPollList(updatedPollList);

    await deletePoll(eventId, pollIndex);

    sendWebSocketMessage({
      type: "pollDelete",
      eventId: eventId,
      pollIndex: pollIndex,
    });

    if (selectedPoll === pollIndex) {
      setSelectedPoll(null);
    } else if (selectedPoll > pollIndex) {
      setSelectedPoll(selectedPoll - 1);
    }
  };

  // Render the component using the imported HTML structure
  return LivePollsHTML({
    pollList,
    newPoll,
    selectedPoll,
    pollSelections,
    isAddingPoll,
    isCreator,
    handleOptionSelect,
    handleSavePoll,
    handleDeletePoll,
    setNewPoll,
    setIsAddingPoll,
    setSelectedPoll,
  });
};

export default LivePolls;
