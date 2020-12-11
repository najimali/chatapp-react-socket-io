import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  // Contact Modal is array of object with each object contains id & name. for eg.
  // contacts =[{id: "1", name: "test 1"}, {id: "2", name: "test 2"}, {id: "3", name: "test 3"}]
  const createContact = (id, name) => {
    setContacts((prevContacts) => {
      // adding new contact with id & name as details.
      return [...prevContacts, { id, name }];
    });
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
