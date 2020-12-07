import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

function NewConversationsModal({ closeModal }) {
  const [selectedContactIds, setselectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const handleCheckboxChange = (contactId) => {
    setselectedContactIds((prevSelectedContactIds) => {
      // if id is already in the list then return a list that doesnt have it
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        // Add the id to the list
        return [...prevSelectedContactIds, contactId];
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };
  return (
    <>
      <Modal.Header closeButton>Create New Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                // it return true or false
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationsModal;
