import React from "react";
import { AppProvider } from "./context/AppContext";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <div className="container">
        <ContactList />
        <ChatWindow />
      </div>
    </AppProvider>
  );
}

export default App;
