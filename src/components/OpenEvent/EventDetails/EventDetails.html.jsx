const EventDetailsHTML = ({
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
}) => (
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
            <div class="mb-4">
              <button
                class="px-4 py-2 bg-gray-400 text-gray-800 rounded-md w-full dark:bg-slate-600"
                onClick={() => setShowAttendeesSelection(!showAttendeesSelection)}
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
                  onClick={handleDelete}
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

export default EventDetailsHTML;
