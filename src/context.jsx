import { createContext, useContext, useState } from "react";
import axiosInstance from "./axios-config";

export const NotesContext = createContext({
  isLoading: false,
  notes: [],
  isNotesChanged: false,
  editedNote: {},
  showModal: false
});

export const Context = ({ children }) => {
  const initialState = useContext(NotesContext);
  const [store, setStore] = useState(initialState);

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
  }

  const editNote = (note) => {
    const noteId = note.notesId;
    setStore((prevState) => ({
      ...prevState,
      showModal: true,
      editedNote: prevState.notes.find((note) => note.notesId === noteId),
    }));
  }

  const closeModal = () => setStore(prevState => ({...prevState, showModal: false}));

  const saveNote = async (editabledNote) => {
    closeModal();
    setStore((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const response = await axiosInstance.put(`/notes/${editabledNote.notesId}`, {
      title: editabledNote.title,
      body: editabledNote.body,
    });

    if (response && response.status == 200) {
      setStore((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  }
  return (
    <NotesContext.Provider value={{ store, getAllNotes, addNote, deleteNote, editNote, closeModal, saveNote }}>
      {children}
    </NotesContext.Provider>
  )
}