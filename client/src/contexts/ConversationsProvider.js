import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext();

//Creating Custom Hook
export function useConversations() {
  return useContext(ConversationsContext);
}
export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  // recipients are array of ids
  // Conversations Modal
  // conversations =[
  //{"recipients":["1","2"],"messages":[]},
  //{"recipients":["1","3"],"messages":[]}}
  //]
  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    // Mapping  all recipients for single conversations
    //{"recipients":["id1","id2"],
    const recipients = conversation.recipients.map((recipient) => {
      // The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    const selected = index === selectedConversationIndex;
    return { ...conversation, recipients, selected };
  });
  // Adding Messages to Conversations
  const addMessageToConversation = ({ recipients, text, sender }) => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (madeChange) {
        return newConversations;
      } else {
        // We didnt have conversations that matches so we create new one
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  };

  // Handling send messages
  const sendMessage = (recipients, text) => {
    addMessageToConversation({ recipients, text, sender: id });
  };
  // formatting Value
  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

const arrayEquality = (firstArray, secondArray) => {
  if (firstArray.length !== secondArray.length) return false;
  firstArray.sort();
  secondArray.sort();
  return firstArray.every((element, index) => {
    return element === secondArray[index];
  });
};
