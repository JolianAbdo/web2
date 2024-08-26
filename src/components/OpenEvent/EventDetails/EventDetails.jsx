import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchUsers } from "../../../api/fetchUsers"; // Import the function to fetch users
import { updateEvent } from "../../../api/updateEvent"; // Import the function to update event details
import { deleteEvent } from "../../../api/deleteEvent"; // Import the function to delete an event
import EventDetailsHTML from "./EventDetails.html"; // Import the HTML structure

const EventDetails = ({ event, onEdit, onDelete, isCreator, eventId }) => {
  // State variables for managing the event details and user selections
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    name: event?.name || "",
    details: event?.details || "",
    date: event?.date || "",
    time: event?.time || "",
  });
  const [showAttendeesSelection, setShowAttendeesSelection] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "Technology",
    "AI",
    "Machine Learning",
    "Summit",
    "Conference",
  ]);
  const [selectedTags, setSelectedTags] = useState(event?.tags || []);
  const [customTag, setCustomTag] = useState("");
  const [showTagsSelection, setShowTagsSelection] = useState(false);

  // Function to handle saving the edited event details
  const handleSave = async () => {
    const updatedEvent = {
      ...event,
      ...editedEvent,
      attendees: selectedUsers,
      tags: selectedTags,
    };

    onEdit(updatedEvent); // Update the parent component with the edited details
    setIsEditing(false);

    try {
      await updateEvent(eventId, updatedEvent); // Save the updated event details
      console.log("Event details saved successfully");

      // Notify via WebSocket
      const ws = new WebSocket(
        "wss://websocket-server-virtual-event-platform.fly.dev/"
      );
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "eventUpdate",
            eventId: eventId,
            event: updatedEvent,
          })
        );
        ws.close(); // Close the WebSocket connection
      };
    } catch (error) {
      console.error("Failed to save event details:", error);
    }
  };

  // Function to handle deleting the event
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId); // Delete the event from the database

        // Notify via WebSocket
        const ws = new WebSocket(
          "wss://websocket-server-virtual-event-platform.fly.dev/"
        );
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: "eventDelete",
              eventId: eventId,
            })
          );
          ws.close(); // Close the WebSocket connection
        };
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  // Function to handle the selection of users as attendees
  const handleUserSelection = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    if (!user) return;

    setSelectedUsers((prevSelected) =>
      prevSelected.includes(user.username)
        ? prevSelected.filter((username) => username !== user.username)
        : [...prevSelected, user.username]
    );
  };

  // Function to handle the selection of tags for the event
  const handleTagSelection = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  // Function to add a custom tag
  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag(""); // Reset the custom tag input
    }
  };

  // Fetch users and set the selected users when the component mounts or the event changes
  useEffect(() => {
    const fetchAndSetUsers = async () => {
      if (!event || !event.id) return;
      const filteredUsers = await fetchUsers(); // Fetch all users from the database
      setAllUsers(filteredUsers);
      setSelectedUsers(event.attendees || []);
    };

    fetchAndSetUsers();
  }, [event]);

  // Render the component using the imported HTML structure
  return EventDetailsHTML({
    event,
    isEditing,
    editedEvent,
    showAttendeesSelection,
    selectedUsers,
    allUsers,
    availableTags,
    selectedTags,
    customTag,
    showTagsSelection,
    setIsEditing,
    setEditedEvent,
    setShowAttendeesSelection,
    setShowTagsSelection,
    setCustomTag,
    handleSave,
    handleDelete,
    handleUserSelection,
    handleTagSelection,
    handleAddCustomTag,
    isCreator,
    setSelectedTags,
  });
};

export default EventDetails;
