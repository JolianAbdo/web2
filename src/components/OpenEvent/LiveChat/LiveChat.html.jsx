const LiveChatHTML = ({
  messages,
  chatMessage,
  setChatMessage,
  handleChatSend,
  username,
}) => (
  <div id="chat-section" class="lg:w-1/2 p-2">
    <h2 class="text-3xl font-semibold mb-4">Live Chat</h2>
    <div
      id="chat-container"
      class="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner mb-4"
    >
      {/* Display chat messages */}
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
      {/* Input field for typing a message */}
      <input
        type="text"
        id="chat-input"
        value={chatMessage}
        onInput={(e) => setChatMessage(e.target.value)}
        class="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Type your message..."
      />
      {/* Send button to send the message */}
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

export default LiveChatHTML;
