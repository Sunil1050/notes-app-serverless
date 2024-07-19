import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { NotesContext } from "../context";
import EditModal from "./EditModal";

const Notes = ({ notes }) => {
  const { setGlobalState } = useContext(NotesContext);
  const [showMore, setShowMore] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
    const response = await axios.delete(
      `https://doqbi8b2z5.execute-api.us-east-1.amazonaws.com/dev/notes/${noteId}`
    );
    if (response && response.status == 200) {
      setGlobalState((prevState) => ({
        ...prevState,
        isNotesChanged: !prevState.isNotesChanged,
      }));
    }
  };

  return (
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
                <CiEdit style={iconStyles} onClick={handleShowModal} />
                <MdDelete
                  style={iconStyles}
                  onClick={() => handleDeleteNote(note.notesId)}
                />
              </div>
            </Card.Body>
          </Card>
          <EditModal
            note={note}
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default Notes;
