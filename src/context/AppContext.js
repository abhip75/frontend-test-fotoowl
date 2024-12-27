
import React, { createContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  contacts: [], 
  messages: {}, 
  selectedContact: null, 
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.contactId]: action.payload.messages,
        },
      };
    case "SET_SELECTED_CONTACT":
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const defaultContacts = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    dispatch({ type: "SET_CONTACTS", payload: defaultContacts });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

