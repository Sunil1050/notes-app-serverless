import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NotesContext } from "../context";

const EditModal = () => {
  const { store, closeModal, saveNote } = useContext(NotesContext);
  const [editabledNote, setEditedNote] = useState(store.editedNote);

  return (
    <Modal
      show={store.showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Note Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) =>
                setEditedNote((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              value={editabledNote.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Note Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) =>
                setEditedNote((prevState) => ({
                  ...prevState,
                  body: e.target.value,
                }))
              }
              value={editabledNote.body}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => saveNote(editabledNote)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
