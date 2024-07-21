import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

import { NotesContext } from "../context";
import { useContext, useState } from "react";
import axiosInstance from "../axios-config";

const NotesForm = () => {
  const { setGlobalState } = useContext(NotesContext);
  const [noteName, setNoteName] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    if (data?.title && data?.description) {
      addNote(noteName, noteDescription);

      setNoteName("");
      setNoteDescription("");
    }
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
    <div className="m-4 notes-form">
      <Form
        onSubmit={handleSubmit((data) => {
          onSubmitHandler(data);
        })}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter Note Title"
            onChange={(event) => setNoteName(event.target.value)}
            value={noteName}
          />
          <p style={{ color: "red" }}>{errors.title?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Note Description</Form.Label>
          <Form.Control
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            placeholder="Enter Note Description"
            onChange={(event) => setNoteDescription(event.target.value)}
            value={noteDescription}
          />
          <p style={{ color: "red" }}>{errors.description?.message}</p>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default NotesForm;
