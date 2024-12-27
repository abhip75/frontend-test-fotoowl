

import { openDB } from "idb";

let db;

const initializeDB = async () => {
  try {
    db = await openDB("InstantDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("messages")) {
          db.createObjectStore("messages", { keyPath: "id" });
        }
      },
    });
    console.log("Database initialized:", db);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};

export const useInstantDB = (dispatch) => {
  // Fetch messages from InstantDB
  const fetchMessages = async () => {
    if (!db) await initializeDB();
    const tx = db.transaction("messages", "readonly");
    const store = tx.objectStore("messages");
    const allMessages = await store.getAll(); // Get all messages
    return allMessages;
  };

  const sendMessage = async (message) => {
    try {
      if (!db) {
        await initializeDB();
      }

      if (!db.objectStoreNames.contains("messages")) {
        throw new Error("Messages entity is not initialized.");
      }

      const tx = db.transaction("messages", "readwrite");
      const store = tx.objectStore("messages");
      await store.add(message);

      // Fetch the updated messages after adding the new message
      const updatedMessages = await fetchMessages();

      // Dispatch the updated messages to your app state
      dispatch({ type: "SET_MESSAGES", payload: updatedMessages });

      console.log("Message sent successfully:", message);
    } catch (err) {
      console.error("Failed to send message:", err);
      throw err;
    }
  };

  return { sendMessage, fetchMessages };
};
