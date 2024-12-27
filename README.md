## Set Up Of The Applicatiton.

First clone this application in your local machine.

then inside that run nmp install and after installing run npm start.

# Chat Application Documentation

## Design Choices

### Component-based Architecture
The application follows a component-based architecture where each distinct functionality is divided into smaller, reusable components. This allows us to build an organized and maintainable codebase. The key components include:
- **ChatWindow**: Handles the display of the chat window for the selected contact.
- **MessageInput**: Provides an input field for the user to type and send messages.
- **ContactList**: Displays a list of contacts that the user can interact with.



### State Management
State management in the application is handled using **React's Context API** combined with **useReducer**. 
- **Context API** is used to provide a global state accessible across the components. 
- **useReducer** is used for managing the state of contacts, messages, and selected contact in a more predictable and scalable way, especially for actions that may result in complex state updates.



## Challenges Faced During Development

1. **Managing Multiple Chat Windows**  
   The main challenge was managing multiple chat windows for different contacts. Initially, when a user selected a contact, all messages were being sent to the same chat window. To solve this, we ensured that each contact’s messages are stored in a unique array under the `messages` object, with the key being the contact’s ID. This way, each contact has its own separate chat window, and messages are fetched and sent accordingly.

2. **Data Persistence**  
   Another challenge was maintaining data persistence, especially when the user is offline. To handle this, we integrated **IndexedDB** for storing unsent messages while the user is offline. When the user comes online, the saved messages are automatically synced with the main database (InstantDB). This ensures that the app works seamlessly, even with network disruptions, and the user can continue their conversations without losing any messages.

## Usage of Hooks, Context, Custom Hooks, useReducer, InstantDB, and IndexedDB

### React Hooks
- **useState**: Used for managing local component state, such as the `text` in the message input field. This allows the component to keep track of the input value as the user types their message.

### Context API

- The Context API is used to share global state across the components without having to pass props down manually. This simplifies state management and provides a clean structure for the application.
- **Example** : const { state, dispatch } = useContext(AppContext);

### useReducer

- The useReducer hook is used to handle more complex state changes, especially for managing actions that modify multiple pieces of state simultaneously, such as setting contacts or messages. This makes the state management more predictable and scalable.
- **Example**: const [state, dispatch] = useReducer(appReducer, initialState);

### customHook

- Custom hooks, such as useMessagesDB and useInstantDB, abstract away the logic for interacting with IndexedDB and InstantDB. These custom hooks encapsulate the logic for saving and fetching messages, ensuring that components remain focused on rendering UI and handling user interactions.

**useMessagesDB**: Provides methods to save and fetch messages from IndexedDB.
**useInstantDB**: Provides methods to interact with InstantDB for real-time syncing of messages when the user is online.

### InstantDB and IndexedDB

### InstantDB
InstantDB is used as the primary database for storing messages when the user is online. It is used to sync messages in real-time across all devices when the user is connected to the internet. InstantDB ensures that all messages are sent and received without delay while the user is online.

**Example**: const { sendMessage, fetchMessages } = useInstantDB(dispatch);

### IndexedDB
IndexedDB is used to store unsent messages when the user is offline. It provides a local storage mechanism that is more robust than traditional localStorage, allowing for larger data storage and indexing of data for quicker access. When the user comes back online, messages stored in IndexedDB are synced to the InstantDB database.

**Example**: const { saveMessage } = useMessagesDB(dispatch);


