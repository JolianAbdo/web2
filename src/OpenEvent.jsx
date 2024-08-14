import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { App as RealmApp, Credentials } from "realm-web";
import { route } from "preact-router";

// MongoDB auth
const app = new RealmApp({ id: "application-0-wjjnjup" });

const EventDetails = ({ event, onEdit, onDelete, isCreator }) => {
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

  const handleSave = () => {
    // Merge existing event data with the edited data and selected attendees
    const updatedEvent = {
      ...event,
      ...editedEvent,
      attendees: selectedUsers      // Add the selected attendees

    };
    onEdit(updatedEvent);
    setIsEditing(false);
  };



  const handleUserSelection = (userId) => {
    // Find the username corresponding to the userId
    const user = allUsers.find(user => user._id === userId);
    if (!user) return; // Exit if user not found

    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(user.username)) {
        // If already selected, remove the username from the selection
        return prevSelected.filter(username => username !== user.username);
      } else {
        // Otherwise, add the username to the selection
        return [...prevSelected, user.username];
      }
    });
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
        // Fetch all users excluding the current one
        const user = await app.logIn(Credentials.anonymous());

        const mongodb = user.mongoClient("mongodb-atlas");
        const usersCollection = mongodb.db("Login").collection("Users");
        const fetchedUsers = await usersCollection.find({});
        const filteredUsers = fetchedUsers.filter((u) => u._id !== user.id);
        setAllUsers(filteredUsers);

        // Initialize selected users with current attendees once event and users are available
        if (event) {
            setSelectedUsers(event.attendees || []);
        }
    };

    fetchUsers();
}, [event]); // Include 'event' as a dependency


  return (
    <section id="event-details" class="bg-white p-6 rounded-lg shadow-md mb-8">
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
              <div class="mb-4">
                <button
                  class="px-4 py-2 bg-gray-400 text-gray-800 rounded-md w-full"
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
                            />
                            <span class="ml-2 text-blue-500">
                              {user.username}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
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

const OpenEvent = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [polls, setPolls] = useState([]);
  const [qaSessions, setQASessions] = useState([]);
  const [networkingOpportunities, setNetworkingOpportunities] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [username, setUsername] = useState("");
  const [pollSelections, setPollSelections] = useState({});
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditingLiveLink, setIsEditingLiveLink] = useState(false);
  const [editedLiveLink, setEditedLiveLink] = useState(event?.liveLink || "");
  const [isAddingPoll, setIsAddingPoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", "", "", ""],
  });
  const [isAddingQA, setIsAddingQA] = useState(false);
  const [newQA, setNewQA] = useState({ question: "", answer: "" });
  const [isAddingOpportunity, setIsAddingOpportunity] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({ title: "", link: "" });

  useEffect(() => {
    const storedUsername = localStorage.getItem("loggedInUsername");
    setUsername(storedUsername || "Guest");

    if (eventId) {
      fetchEvent(eventId);
    } else {
      route("/", true); // Redirect to home if no eventId
    }
  }, [eventId]);

  const fetchEvent = async (eventId) => {
    try {
      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      const fetchedEvent = await eventsCollection.findOne({ id: eventId });
      setEvent(fetchedEvent);
      const loggedInUser = localStorage.getItem("loggedInUsername");
      if (fetchedEvent?.creator === loggedInUser) {
        setIsCreator(true);
      }

      if (fetchedEvent?.chatHistory) {
        setChatMessages(fetchedEvent.chatHistory);
      }
      if (fetchedEvent?.polls) {
        setPolls(fetchedEvent.polls);
      }
      if (fetchedEvent?.qaSessions) {
        setQASessions(fetchedEvent.qaSessions);
      }
      if (fetchedEvent?.networkingOpportunities) {
        setNetworkingOpportunities(fetchedEvent.networkingOpportunities);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleChatSend = async () => {
    if (chatMessage.trim()) {
      const now = new Date();
      const timestamp = `${now
        .getDate()
        .toString()
        .padStart(2, "0")}-${now.toLocaleString("en-US", {
        month: "short",
      })}-${now.getFullYear().toString().slice(-2)} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const newMessage = `${timestamp} ${username}: ${chatMessage}`;

      // Immediately update the chat messages state with the username
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatMessage("");

      // Perform the database update in the background
      try {
        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        await eventsCollection.updateOne(
          { id: eventId },
          { $push: { chatHistory: newMessage } }
        );
      } catch (error) {
        console.error("Error updating chat history:", error);
      }
    }
  };

  const handleOptionSelect = async (pollIndex, selectedOptionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].options[selectedOptionIndex].counter += 1;

    setPollSelections({
      ...pollSelections,
      [pollIndex]: selectedOptionIndex,
    });

    setPolls(updatedPolls);

    try {
      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      await eventsCollection.updateOne(
        { id: eventId },
        { $set: { polls: updatedPolls } }
      );
    } catch (error) {
      console.error("Error updating poll:", error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      // Merge the existing event with the updated data
      const mergedEvent = { ...event,
         ...updatedEvent,
        chatHistory: chatMessages, // Preserve the chat history
        polls: polls,             // Preserve the polls
        qaSessions: qaSessions,   // Preserve the Q&A sessions
        networkingOpportunities: networkingOpportunities, // Preserve the networking opportunities
         };
      await eventsCollection.updateOne({ id: eventId }, { $set: mergedEvent });
      setEvent(mergedEvent); // Update local state
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        await eventsCollection.deleteOne({ id: eventId });
        route("/", true); // Redirect to home after deletion
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // Handle save live link
  const handleSaveLiveLink = async () => {
    try {
      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      await eventsCollection.updateOne(
        { id: eventId },
        { $set: { liveLink: newLiveLink } }
      );

      setEvent((prevEvent) => ({ ...prevEvent, liveLink: newLiveLink }));
      setIsEditingLiveLink(false);
    } catch (error) {
      console.error("Error updating live link:", error);
    }
  };

  const handleSavePoll = async () => {
    try {
      const newPollData = {
        question: newPoll.question,
        options: newPoll.options.map((opt) => ({ option: opt, counter: 0 })),
      };

      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      await eventsCollection.updateOne(
        { id: eventId },
        { $push: { polls: newPollData } }
      );

      setPolls([...polls, newPollData]);
      setNewPoll({ question: "", options: ["", "", "", ""] });
      setIsAddingPoll(false);
    } catch (error) {
      console.error("Error adding poll:", error);
    }
  };

  const handleDeletePoll = async (pollIndex) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      try {
        const updatedPolls = [...polls];
        updatedPolls.splice(pollIndex, 1); // Remove poll from the array

        setPolls(updatedPolls);

        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        await eventsCollection.updateOne(
          { id: eventId },
          { $set: { polls: updatedPolls } }
        );
      } catch (error) {
        console.error("Error deleting poll:", error);
      }
    }
  };

  const handleSaveQA = async () => {
    try {
      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      const newQAData = { question: newQA.question, answer: newQA.answer };

      setQASessions([...qaSessions, newQAData]);
      setNewQA({ question: "", answer: "" });

      await eventsCollection.updateOne(
        { id: eventId },
        { $push: { qaSessions: newQAData } }
      );

      setIsAddingQA(false);
    } catch (error) {
      console.error("Error adding Q&A:", error);
    }
  };

  const handleDeleteQA = async (qaIndex) => {
    if (window.confirm("Are you sure you want to delete this Q&A?")) {
      try {
        const updatedQASessions = [...qaSessions];
        updatedQASessions.splice(qaIndex, 1);

        setQASessions(updatedQASessions);

        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        await eventsCollection.updateOne(
          { id: eventId },
          { $set: { qaSessions: updatedQASessions } }
        );
      } catch (error) {
        console.error("Error deleting Q&A:", error);
      }
    }
  };

  const handleSaveOpportunity = async () => {
    try {
      const user = await app.logIn(Credentials.anonymous());
      const mongodb = user.mongoClient("mongodb-atlas");
      const eventsCollection = mongodb.db("Events").collection("Events");

      const updatedOpportunities = [
        ...networkingOpportunities,
        { title: newOpportunity.title, link: newOpportunity.link },
      ];

      setNetworkingOpportunities(updatedOpportunities);
      setNewOpportunity({ title: "", link: "" });

      await eventsCollection.updateOne(
        { id: eventId },
        { $set: { networkingOpportunities: updatedOpportunities } }
      );

      setIsAddingOpportunity(false);
    } catch (error) {
      console.error("Error adding opportunity:", error);
    }
  };

  const handleDeleteOpportunity = async (index) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      try {
        const updatedOpportunities = [...networkingOpportunities];
        updatedOpportunities.splice(index, 1);

        setNetworkingOpportunities(updatedOpportunities);

        const user = await app.logIn(Credentials.anonymous());
        const mongodb = user.mongoClient("mongodb-atlas");
        const eventsCollection = mongodb.db("Events").collection("Events");

        await eventsCollection.updateOne(
          { id: eventId },
          { $set: { networkingOpportunities: updatedOpportunities } }
        );
      } catch (error) {
        console.error("Error deleting opportunity:", error);
      }
    }
  };

  return (
    <div class="bg-gray-100 font-sans leading-relaxed tracking-wide flex flex-col">
      <main class="container mx-auto p-6 flex-grow">
        {/* Event Details */}
        <EventDetails
          event={event}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          isCreator={isCreator}
        />

        {/* Live Video */}
        <section id="live-video" class="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 class="text-3xl font-semibold mb-4">Live Video</h2>
          <div class="w-full h-[32rem]">
            <iframe
              src={event?.liveLink}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-full rounded-lg shadow-md"
            ></iframe>
          </div>

          {isCreator && !isEditingLiveLink && (
            <button
              onClick={() => {
                setEditedLiveLink(event.liveLink);
                setIsEditingLiveLink(true);
              }}
              class="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit Live Link
            </button>
          )}

          {isEditingLiveLink && (
            <div class="mt-4">
              <input
                type="text"
                value={editedLiveLink}
                onInput={(e) => setEditedLiveLink(e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-lg mb-2"
              />
              <button
                onClick={async () => {
                  await handleEditEvent({ liveLink: editedLiveLink });
                  setIsEditingLiveLink(false);
                }}
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingLiveLink(false)}
                class="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </section>

        {/* Chat and Live Polls Section */}
        <section class="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md mb-8">
          {/* Live Chat */}
          <div id="chat-section" class="lg:w-1/2 p-2">
            <h2 class="text-3xl font-semibold mb-4">Live Chat</h2>
            <div
              id="chat-container"
              class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4"
            >
              {chatMessages.map((msg, index) => {
                const isCurrentUser = msg.includes(`${username}:`);
                const formattedMessage = isCurrentUser
                  ? msg.replace(`${username}:`, "You:")
                  : msg;
                return (
                  <div
                    key={index}
                    class={`mb-2 p-2 rounded-lg ${
                      isCurrentUser ? "bg-green-200" : "bg-blue-200"
                    }`}
                  >
                    <span>{formattedMessage}</span>
                  </div>
                );
              })}
            </div>

            <div class="flex">
              <input
                type="text"
                id="chat-input"
                value={chatMessage}
                onInput={(e) => setChatMessage(e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Type your message..."
              />
              <button
                id="chat-send"
                onClick={handleChatSend}
                class="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>

          {/* Live Polls */}
          <div id="live-polls" class="lg:w-1/2 p-2">
            <h2 class="text-3xl font-semibold mb-4">Live Polls</h2>
            <div
              id="polls-container"
              class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner"
            >
              {polls.length ? (
                polls.map((poll, pollIndex) => (
                  <div
                    key={pollIndex}
                    class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md"
                  >
                    <div class="flex justify-between items-center">
                      <h3
                        class="text-xl font-semibold cursor-pointer"
                        onClick={() =>
                          setSelectedPoll(
                            selectedPoll === pollIndex ? null : pollIndex
                          )
                        }
                      >
                        {poll.question}
                      </h3>
                      {isCreator && (
                        <button
                          onClick={() => handleDeletePoll(pollIndex)}
                          class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    {selectedPoll === pollIndex && (
                      <div class="mt-4">
                        {poll.options.map((option, optionIndex) => {
                          const totalVotes = poll.options.reduce(
                            (acc, opt) => acc + opt.counter,
                            0
                          );
                          const isOptionSelected =
                            pollSelections[pollIndex] === optionIndex;
                          const percentage =
                            ((option.counter + (isOptionSelected ? 1 : 0)) /
                              (totalVotes +
                                (pollSelections[pollIndex] !== undefined
                                  ? 1
                                  : 0))) *
                            100;
                          return (
                            <button
                              key={optionIndex}
                              class={`w-full p-2 mb-2 rounded-lg ${
                                isOptionSelected
                                  ? "bg-green-500 text-white"
                                  : pollSelections[pollIndex] !== undefined
                                  ? "bg-gray-400"
                                  : "bg-blue-500 text-white"
                              } ${
                                !isOptionSelected &&
                                !pollSelections[pollIndex] &&
                                "hover:bg-blue-600"
                              }`}
                              onClick={() =>
                                handleOptionSelect(pollIndex, optionIndex)
                              }
                              disabled={pollSelections[pollIndex] !== undefined}
                            >
                              {option.option}{" "}
                              {pollSelections[pollIndex] === optionIndex
                                ? `- ${percentage.toFixed(2)}%`
                                : ""}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No polls available.</p>
              )}
            </div>

            {isCreator && (
              <>
                {!isAddingPoll && (
                  <button
                    onClick={() => setIsAddingPoll(true)}
                    class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
                  >
                    Add Poll
                  </button>
                )}

                {isAddingPoll && (
                  <div class="mt-4">
                    <input
                      type="text"
                      placeholder="Poll Question"
                      value={newPoll.question}
                      onInput={(e) =>
                        setNewPoll({ ...newPoll, question: e.target.value })
                      }
                      class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    />
                    {newPoll.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onInput={(e) =>
                          setNewPoll({
                            ...newPoll,
                            options: newPoll.options.map((opt, i) =>
                              i === index ? e.target.value : opt
                            ),
                          })
                        }
                        class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                      />
                    ))}
                    <div class="flex justify-between">
                      <button
                        onClick={handleSavePoll}
                        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Save Poll
                      </button>
                      <button
                        onClick={() => setIsAddingPoll(false)}
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Q&A Sessions */}
        <section
          id="qa-sessions"
          class="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 class="text-3xl font-semibold mb-4">Q&A Sessions</h2>
          <div id="qa-container">
            {qaSessions.length ? (
              qaSessions.map((qa, index) => (
                <div
                  key={index}
                  class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <h3 class="text-xl font-semibold">{qa.question}</h3>
                      <p>{qa.answer}</p>
                    </div>
                    {isCreator && (
                      <button
                        onClick={() => handleDeleteQA(index)}
                        class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No Q&A sessions available.</p>
            )}
          </div>
          {isCreator && (
            <>
              {!isAddingQA && (
                <button
                  onClick={() => setIsAddingQA(true)}
                  class="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Q&A
                </button>
              )}
              {isAddingQA && (
                <div class="mt-4">
                  <input
                    type="text"
                    placeholder="Question"
                    value={newQA.question}
                    onInput={(e) =>
                      setNewQA({ ...newQA, question: e.target.value })
                    }
                    class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  />
                  <textarea
                    placeholder="Answer"
                    value={newQA.answer}
                    onInput={(e) =>
                      setNewQA({ ...newQA, answer: e.target.value })
                    }
                    class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  />
                  <div class="flex justify-between">
                    <button
                      onClick={handleSaveQA}
                      class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Save Q&A
                    </button>
                    <button
                      onClick={() => setIsAddingQA(false)}
                      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Networking Opportunities */}
        <section
          id="networking-opportunities"
          class="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 class="text-3xl font-semibold mb-4">Networking Opportunities</h2>
          <div class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
            {networkingOpportunities.length > 0 ? (
              networkingOpportunities.map((opportunity, index) => (
                <div
                  key={index}
                  class="mb-4 p-4 bg-gray-200 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 class="text-xl font-semibold">{opportunity.title}</h3>
                    <a
                      href={opportunity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-500 hover:underline"
                    >
                      {opportunity.link}
                    </a>
                  </div>
                  {isCreator && (
                    <button
                      onClick={() => handleDeleteOpportunity(index)}
                      class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No networking opportunities available.</p>
            )}
          </div>

          {isCreator && (
            <>
              {!isAddingOpportunity ? (
                <button
                  onClick={() => setIsAddingOpportunity(true)}
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Opportunity
                </button>
              ) : (
                <div class="mt-4">
                  <input
                    type="text"
                    value={newOpportunity.title}
                    onInput={(e) =>
                      setNewOpportunity({
                        ...newOpportunity,
                        title: e.target.value,
                      })
                    }
                    class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Opportunity Title"
                  />
                  <input
                    type="text"
                    value={newOpportunity.link}
                    onInput={(e) =>
                      setNewOpportunity({
                        ...newOpportunity,
                        link: e.target.value,
                      })
                    }
                    class="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Opportunity Link"
                  />
                  <button
                    onClick={handleSaveOpportunity}
                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAddingOpportunity(false)}
                    class="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default OpenEvent;
