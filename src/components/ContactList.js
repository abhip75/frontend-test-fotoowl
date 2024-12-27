import React, { useContext } from "react";
import AppContext from "../context/AppContext";

export default function ContactList() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div
          key={contact.id}
          className={`contact ${state.selectedContact === contact.id ? "selected" : ""}`}
          onClick={() => dispatch({ type: "SET_SELECTED_CONTACT", payload: contact.id })}
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
}
