import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { NotesContext } from "../context";
import EditModal from "./EditModal";
import axiosInstance from "../axios-config";

const Notes = ({ notes }) => {
  const { globalState, setGlobalState } = useContext(NotesContext);
  const [showMore, setShowMore] = useState(true);
  const handleShowModal = () => setGlobalState((prevState) => ({...prevState, showModal: true}));

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
      editedNote: prevState.notes.find((note) => note.notesId === noteId)
    }))
  }

  const renderNotes = () => {
    if (notes?.length) {
      return (
        <>
          <ul style={{ listStyleType: "none" }}>
            {notes.map((note) => (
              <li key={note.notesId}>
                <Card style={{ width: "50vw", margin: "14px 0px" }}>
                  <Card.Body className="d-flex justify-content-between">
                    <div>
                      <Card.Title>{note.title}</Card.Title>
                      <Card.Text>
                        {showMore ? note.body.substring(0, 80) : note.body}
                        <button
                          className="show-more-button"
                          onClick={() => setShowMore(!showMore)}
                        >
                          {showMore ? "more" : "less"}
                        </button>
                      </Card.Text>
                    </div>
                    <div className="align-self-center">
                      <CiEdit style={iconStyles} onClick={() => onEditNote(note)} />
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
