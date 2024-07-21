import { useContext } from "react";
import Card from "react-bootstrap/Card";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { NotesContext } from "../context";
import EditModal from "./EditModal";
import axiosInstance from "../axios-config";

const Notes = ({ notes }) => {
  const { globalState, setGlobalState } = useContext(NotesContext);
  const handleShowModal = () =>
    setGlobalState((prevState) => ({ ...prevState, showModal: true }));

  let iconStyles = {
    background: "transparent",
    fontSize: "40px",
    margin: "0px 10px",
    cursor: "pointer",
  };

  const handleDeleteNote = async (noteId) => {
    setGlobalState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response = await axiosInstance.delete(`/notes/${noteId}`);
    if (response && response.status == 200) {
      setGlobalState((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  const onEditNote = (note) => {
    const noteId = note.notesId;
    handleShowModal();
    setGlobalState((prevState) => ({
      ...prevState,
      editedNote: prevState.notes.find((note) => note.notesId === noteId),
    }));
  };

  const renderNotes = () => {
    if (notes?.length) {
      return (
        <>
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.notesId}>
                <Card style={{ margin: "14px 0px" }}>
                  <Card.Body className="d-flex">
                    <div style={{width: '85%'}}>
                      <Card.Title>{note.title}</Card.Title>
                      <Card.Text>
                        {note.body}
                      </Card.Text>
                    </div>
                    <div className="align-self-center" style={{width: '15%'}}>
                      <CiEdit
                        style={iconStyles}
                        onClick={() => onEditNote(note)}
                      />
                      <MdDelete
                        style={iconStyles}
                        onClick={() => handleDeleteNote(note.notesId)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>

          {globalState.showModal && <EditModal />}
        </>
      );
    }
    return <h2>No Notes to Display</h2>;
  };

  return renderNotes();
};

export default Notes;
