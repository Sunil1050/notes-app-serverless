import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { NotesContext } from "../context";
import { useContext, useState } from "react";
import axiosInstance from "../axios-config";

const NotesForm = () => {
  const { setGlobalState } = useContext(NotesContext);
  const [noteName, setNoteName] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(noteName, noteDescription);

    //Clear form data upon submission
    setNoteName("");
    setNoteDescription("");
  };

  const addNote = async (title, description) => {
    setGlobalState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const response = await axiosInstance.post("/notes", {
      title: title,
      body: description,
    });
    if (response?.status == 200) {
      setGlobalState((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  return (
    <div style={{ width: "30vw" }} className="m-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Note Title"
            onChange={(event) => setNoteName(event.target.value)}
            value={noteName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Note Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Note Description"
            onChange={(event) => setNoteDescription(event.target.value)}
            value={noteDescription}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default NotesForm;
