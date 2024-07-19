import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import NotesForm from "./components/NotesForm";
import Notes from "./components/Notes";
import { NotesContext } from "./context";

const App = () => {
  const initialState = useContext(NotesContext);
  const [globalState, setGlobalState] = useState(initialState);
  
  useEffect(() => {
    getAllNotes();
  }, [globalState.isNotesChanged]);

  const getAllNotes = async () => {
    setGlobalState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response = await axios.get(
      "https://doqbi8b2z5.execute-api.us-east-1.amazonaws.com/dev/notes"
    );
    if (response?.status == 200 && response?.data) {
      setGlobalState((prevState) => ({
        ...prevState,
        notes: response?.data,
        isLoading: false,
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
    <NotesContext.Provider value={{ globalState, setGlobalState }}>
      <div className="container">
        <div className="App">
          <h1 className="text-primary p-4">Welcome to Notes App</h1>
          <NotesForm />
          <hr className="separator" />
          {globalState.isLoading ? renderLoader() : <Notes notes={globalState.notes} />}
          <div></div>
        </div>
      </div>
    </NotesContext.Provider>
  );
};

export default App;
