

import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useMessagesDB } from "../hooks/useIndexedDB"; 
import { useInstantDB } from "../hooks/useInstantDB"; 

export default function MessageInput() {
  const [text, setText] = useState("");
  const { state, dispatch } = useContext(AppContext); // Access state and dispatch
  const { saveMessage } = useMessagesDB(dispatch); 
  const { sendMessage, fetchMessages } = useInstantDB(dispatch); 

  const [messages, setMessages] = useState([]); // Store messages locally

  useEffect(() => {
    const loadMessages = async () => {
      if (state.selectedContact) {
        const fetchedMessages = await fetchMessages(state.selectedContact); // Fetch messages for the selected contact
        setMessages(fetchedMessages); // Update local state
      }
    };
    loadMessages();
  }, [state.selectedContact, dispatch]); // Re-fetch when selectedContact changes

  // Check for online/offline status
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSend = async () => {
    if (text.trim() && state.selectedContact) {
      const message = {
        id: Date.now().toString(),
        contactId: state.selectedContact,
        text,
        sender: "me",
        timestamp: Date.now(),
      };

      try {
        if (isOnline) {
          // Send the message to InstantDB if online
          await sendMessage(message);
          console.log("Message sent via InstantDB:", message);
        } else {
          // Save the message locally in IndexedDB if offline
          await saveMessage(message);
          console.log("Message saved locally:", message);
        }

        setText(""); // Clear input field

        // Update messages for the selected contact
        const updatedMessages = await fetchMessages(state.selectedContact);
        dispatch({
          type: "SET_MESSAGES",
          payload: {
            contactId: state.selectedContact,
            messages: updatedMessages,
          },
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      console.warn("Cannot send empty or unlinked message.");
    }
  };

  return (
    <div className="message-input">
      <div className="messages">
       
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <p>{msg.text}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
