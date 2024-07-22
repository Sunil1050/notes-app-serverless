import { useEffect, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import NotesForm from "./components/NotesForm";
import Notes from "./components/Notes";
import { NotesContext } from "./context";

const App = () => {
  const { store, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    console.log("useEffect triggered !!");
    getAllNotes();
  }, [store.isNotesChanged]);


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
        <NotesForm />
        <hr className="separator" />
        {store.isLoading ? (
          renderLoader()
        ) : (
          <Notes notes={store.notes} />
        )}
        <div></div>
      </div>
    </div>
  );
};

export default App;
