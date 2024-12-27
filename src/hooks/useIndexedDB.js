
import { useIndexedDB } from "../hooks/useIndexedDB";

export function useMessagesDB(dispatch) { 
  const addMessage = (message) => {
    const request = indexedDB.open("messagesDB", 1);  // Open IndexedDB with version 1

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("messages", "readwrite");  // Start transaction
      const store = transaction.objectStore("messages");

     
      store.add(message);  // Add message with valid id
    };

    request.onerror = (event) => {
      console.error("IndexedDB Error:", event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore("messages", { keyPath: "id" }); // Define id as the key path
    };
  };

  return { saveMessage: addMessage };
}
