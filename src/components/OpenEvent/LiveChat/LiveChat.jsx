import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { updateChat } from "../../../api/updateChat"; // Import the back-end function
import LiveChatHTML from "./LiveChat.html"; // Import the HTML structure

const LiveChat = ({ eventId, chatMessages, username }) => {
  // State to manage the chat input and messages
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages || []); // Initialize with chatMessages

  useEffect(() => {
    // Setup WebSocket connection
    const websocket = new WebSocket('wss://websocket-server-virtual-event-platform.fly.dev/');
  
    websocket.onmessage = async (event) => {
      try {
        let messageData;
  
        // Check if the received data is a Blob
        if (event.data instanceof Blob) {
          messageData = await event.data.text();
        } else if (event.data instanceof ArrayBuffer) {
          const textDecoder = new TextDecoder();
          messageData = textDecoder.decode(new Uint8Array(event.data));
        } else {
          messageData = event.data; // Assume it's already a string
        }
  
        const parsedData = JSON.parse(messageData);
        processMessage(parsedData);
      } catch (error) {
        console.error('Failed to process WebSocket message:', error);
      }
    };
  
    // Function to process received messages
    const processMessage = (messageData) => {
      try {
        if (messageData.type === 'chatUpdate') {
          setMessages((prevMessages) => [...prevMessages, messageData.message]);
        }
      } catch (error) {
        console.error('Failed to process message:', error);
      }
    };
  
    // Load the initial chat messages from the prop
    setMessages(chatMessages);
  
    return () => websocket.close();
  }, [chatMessages]);

  // Function to handle sending a chat message
  const handleChatSend = async () => {
    if (chatMessage.trim()) {
      const now = new Date();
      const timestamp = formatDate(now);
      const newMessage = `${timestamp} ${username}: ${chatMessage}`;

      setChatMessage(""); // Clear the input field

      // Save the new message to the database
      await updateChat(eventId, newMessage);
    }
  };

  // Function to format the date as "21-Aug-24 20:07"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Render the component using the imported HTML structure
  return LiveChatHTML({
    messages,
    chatMessage,
    setChatMessage,
    handleChatSend,
    username
  });
};

export default LiveChat;
