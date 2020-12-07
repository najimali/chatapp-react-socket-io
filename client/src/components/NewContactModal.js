import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
function NewContactsModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();

  const { createContact } = useContacts();
  const handleSubmit = (e) => {
    e.preventDefault();
    // creating new contacts.
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };
  return (
    <>
      <Modal.Header closeButton>Create New Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type="submit"> Create New Contact</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewContactsModal;
