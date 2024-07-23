import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import NotesForm from "./components/NotesForm";
import Notes from "./components/Notes";
import axiosInstance from "./axios-config";

const App = () => {
  const [store, setStore] = useState({
    isLoading: false,
    notes: [],
    isNotesChanged: false,
    editedNote: {},
    showModal: false,
  });

  useEffect(() => {
    getAllNotes();
  }, [store.isNotesChanged]);

  const getAllNotes = async () => {
    setStore((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response = await axiosInstance.get("/notes");
    if (response?.status == 200 && response?.data) {
      setStore((prevState) => ({
        ...prevState,
        notes: response?.data,
        isLoading: false,
      }));
    }
  };

  const addNote = async (title, description) => {
    setStore((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const response = await axiosInstance.post("/notes", {
      title: title,
      body: description,
    });
    if (response?.status == 200) {
      setStore((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  const deleteNote = async (noteId) => {
    setStore((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response = await axiosInstance.delete(`/notes/${noteId}`);
    if (response && response.status == 200) {
      setStore((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  const editNote = (note) => {
    const noteId = note.notesId;
    setStore((prevState) => ({
      ...prevState,
      showModal: true,
      editedNote: prevState.notes.find((note) => note.notesId === noteId),
    }));
  };

  const closeModal = () =>
    setStore((prevState) => ({ ...prevState, showModal: false }));

  const saveNote = async (editabledNote) => {
    closeModal();
    setStore((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const response = await axiosInstance.put(
      `/notes/${editabledNote.notesId}`,
      {
        title: editabledNote.title,
        body: editabledNote.body,
      }
    );

    if (response && response.status == 200) {
      setStore((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  const renderLoader = () => (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "40vh" }}
    >
      <BeatLoader
        color="#0275d8"
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );

  return (
    <div className="container">
      <div className="App">
        <h1 className="text-primary p-4">Welcome to Notes App</h1>
        <NotesForm addNote={addNote} />
        <hr className="separator" />
        {store.isLoading ? (
          renderLoader()
        ) : (
          <Notes
            notes={store.notes}
            showModal={store.showModal}
            deleteNote={deleteNote}
            editNoteHandler={editNote}
            editedNote={store.editedNote}
            saveNote={saveNote}
            closeModal={closeModal}
          />
        )}
        <div></div>
      </div>
    </div>
  );
};

export default App;
