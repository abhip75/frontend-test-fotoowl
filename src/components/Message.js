import React from "react";

export default function Message({ message }) {
  return (
    <div className={`message ${message.sender === "me" ? "sent" : "received"}`}>
      {message.text}
    </div>
  );
}
