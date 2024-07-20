import { createContext } from "react";

export const NotesContext = createContext({
  isLoading: false,
  notes: [],
  isNotesChanged: false,
  editedNote: {},
  showModal: false
});
