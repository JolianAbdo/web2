import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { updateChat } from "../api/updateChat"; // Import back-end function

const LiveChat = ({ eventId, chatMessages, username }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]); // Start with an empty array

  // Format the date as "21-Aug-24 20:07"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Load the initial chat messages from the prop
  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages]);

  // Send a chat message
  const handleChatSend = async () => {
    if (chatMessage.trim()) {
      const now = new Date();
      const timestamp = formatDate(now);
      const newMessage = `${timestamp} ${username}: ${chatMessage}`;

      // Update the local state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatMessage(""); // Clear the input field

      // Save to the database
      await updateChat(eventId, newMessage);

    }
  };

  return (
    <div id="chat-section" class="lg:w-1/2 p-2">
      <h2 class="text-3xl font-semibold mb-4">Live Chat</h2>
      <div
        id="chat-container"
        class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4"
      >
        {messages.map((msg, index) => {
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
  );
};

export default LiveChat;
