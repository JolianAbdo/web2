import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { fetchUsers } from "../api/fetchUsers"; // Import back-end function
import { updateEvent } from "../api/updateEvent"; // Import the API function for updating event details

const EventDetails = ({ event, onEdit, onDelete, isCreator, eventId }) => {
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

  // Handle saving the edited event details
  const handleSave = async () => {
    const updatedEvent = {
      ...event,
      ...editedEvent,
      attendees: selectedUsers,
      tags: selectedTags,
    };

    // Update the UI with the edited event details immediately
    onEdit(updatedEvent);
    setIsEditing(false);

    // Save the updated event to the database
    try {
      await updateEvent(eventId, updatedEvent); // Use eventId prop here
      console.log("Event details saved successfully");
    } catch (error) {
      console.error("Failed to save event details:", error);
    }
  };

  // Handle user selection for the attendees
  const handleUserSelection = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    if (!user) return;

    setSelectedUsers((prevSelected) =>
      prevSelected.includes(user.username)
        ? prevSelected.filter((username) => username !== user.username)
        : [...prevSelected, user.username]
    );
  };

  // Handle tag selection for the event
  const handleTagSelection = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  // Add a custom tag to the selected tags
  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag(""); // Reset custom tag input
    }
  };

  // Fetch users when the component mounts or the event changes
  useEffect(() => {
    const fetchAndSetUsers = async () => {
      if (!event || !event.id) return; // Ensure 'event' and 'event.id' are defined
      const users = await fetchUsers(); // Fetch all users from the database
      const filteredUsers = users.filter((u) => u._id !== event.creatorId);
      setAllUsers(filteredUsers);

      // Ensure the creator is in the selectedUsers array
      setSelectedUsers([event.creator, ...(event.attendees || [])]);
    };

    fetchAndSetUsers();
  }, [event]);

  return (
    <section class="bg-white p-6 dark:bg-slate-400 rounded-lg shadow-md mb-8">
      <h2 class="text-3xl font-semibold mb-4">Event Details</h2>
      {event ? (
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedEvent.name}
                onInput={(e) =>
                  setEditedEvent({ ...editedEvent, name: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <textarea
                value={editedEvent.details}
                onInput={(e) =>
                  setEditedEvent({ ...editedEvent, details: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="date"
                value={editedEvent.date}
                onInput={(e) =>
                  setEditedEvent({ ...editedEvent, date: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <input
                type="time"
                value={editedEvent.time}
                onInput={(e) =>
                  setEditedEvent({ ...editedEvent, time: e.target.value })
                }
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />

              {/* Attendees Section */}
              <div class="mb-4 ">
                <button
                  class="px-4 py-2 bg-gray-400 text-gray-800 rounded-md w-full dark:bg-slate-600"
                  onClick={() =>
                    setShowAttendeesSelection(!showAttendeesSelection)
                  }
                >
                  {showAttendeesSelection ? "Hide" : "Edit"} Attendees
                </button>
                {showAttendeesSelection && (
                  <div class="mt-4">
                    <ul class="space-y-2">
                      {allUsers.map((user) => (
                        <li key={user._id}>
                          <label class="flex items-center">
                            <input
                              type="checkbox"
                              value={user.username}
                              checked={selectedUsers.includes(user.username)}
                              onChange={() => handleUserSelection(user._id)}
                              class="form-checkbox h-5 w-5 text-blue-600"
                              disabled={user.username === event.creator} // Disable checkbox for the creator
                            />
                            <span
                              class={`ml-2 ${
                                user.username === event.creator
                                  ? "text-blue-500 font-semibold"
                                  : "text-blue-500"
                              }`}
                            >
                              {user.username}{" "}
                              {user.username === event.creator && "(Creator)"}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags Section */}
              <div class="mb-4">
                <button
                  class="px-4 py-2 bg-gray-400 text-gray-800 rounded-md w-full dark:bg-slate-600"
                  onClick={() => setShowTagsSelection(!showTagsSelection)}
                >
                  {showTagsSelection ? "Hide" : "Edit"} Tags
                </button>
                {showTagsSelection && (
                  <div class="mt-4">
                    <ul class="space-y-2">
                      {availableTags.map((tag) => (
                        <li key={tag}>
                          <label class="flex items-center">
                            <input
                              type="checkbox"
                              value={tag}
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagSelection(tag)}
                              class="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span class="ml-2 text-blue-500">{tag}</span>
                          </label>
                        </li>
                      ))}
                      {/* Render custom tags that are not part of availableTags */}
                      {selectedTags
                        .filter((tag) => !availableTags.includes(tag))
                        .map((customTag) => (
                          <li key={customTag}>
                            <label class="flex items-center">
                              <input
                                type="checkbox"
                                value={customTag}
                                checked={selectedTags.includes(customTag)}
                                onChange={() => handleTagSelection(customTag)}
                                class="form-checkbox h-5 w-5 text-blue-600"
                              />
                              <span class="ml-2 text-blue-500">
                                {customTag}
                              </span>
                            </label>
                          </li>
                        ))}
                    </ul>
                    <div class="mt-4">
                      <input
                        type="text"
                        value={customTag}
                        onInput={(e) => setCustomTag(e.target.value)}
                        placeholder="Add custom tag"
                        class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                      />
                      <button
                        onClick={handleAddCustomTag}
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleSave}
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                class="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h3 class="text-xl font-semibold">{event.name}</h3>
              <p>
                Date: {new Date(event.date).toLocaleDateString()} {event.time}
              </p>
              <p>{event.details}</p>
              {/* Display tags */}
              <div>
                <h4 class="font-semibold">Tags:</h4>
                <ul class="flex flex-wrap space-x-2">
                  {event.tags?.map((tag) => (
                    <li key={tag} class="bg-blue-200 text-blue-700 p-1 rounded">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              {isCreator && (
                <div class="mt-4">
                  <button
                    onClick={() => {
                      setEditedEvent({
                        name: event.name,
                        details: event.details,
                        date: event.date,
                        time: event.time,
                      });
                      setSelectedTags(event.tags || []); // Initialize tags for editing
                      setIsEditing(true);
                    }}
                    class="bg-yellow-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit event details
                  </button>
                  <button
                    onClick={onDelete}
                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete event
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </section>
  );
};

export default EventDetails;
