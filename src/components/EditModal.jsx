import { useContext, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NotesContext } from "../context";

const EditModal = ({ note, showModal, handleCloseModal }) => {
  const { setGlobalState } = useContext(NotesContext);
  const [editabledNote, setEditedNote] = useState({
    title: note.title,
    body: note.body,
  });

  const handleSave = async () => {
    handleCloseModal();
    setGlobalState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const response = await axios.put(
      `https://doqbi8b2z5.execute-api.us-east-1.amazonaws.com/dev/notes/${note.notesId}`,
      {
        title: editabledNote.title,
        body: editabledNote.body,
      }
    );

    if (response && response.status == 200) {
      setGlobalState((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
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
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
