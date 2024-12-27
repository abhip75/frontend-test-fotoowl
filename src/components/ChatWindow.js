

import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const { state } = useContext(AppContext);

  // If no contact is selected, display a message
  if (!state.selectedContact) {
    return <div className="chat-window">Select a contact to start chatting</div>;
  }

  // Ensure messages are correctly fetched for the selected contact
  const messages = state.messages[state.selectedContact] || []; // Default to empty array if no messages for contact

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

