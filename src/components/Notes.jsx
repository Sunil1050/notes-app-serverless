import { useContext } from "react";
import Card from "react-bootstrap/Card";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { NotesContext } from "../context";
import EditModal from './EditModal';

const Notes = ({ notes }) => {
  const { store, deleteNote, editNote } = useContext(NotesContext);

  let iconStyles = {
    background: "transparent",
    fontSize: "40px",
    margin: "0px 10px",
    cursor: "pointer",
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
                    <div style={{ width: "85%" }}>
                      <Card.Title>{note.title}</Card.Title>
                      <Card.Text>{note.body}</Card.Text>
                    </div>
                    <div className="align-self-center" style={{ width: "15%" }}>
                      <CiEdit
                        style={iconStyles}
                        onClick={() => editNote(note)}
                      />
                      <MdDelete
                        style={iconStyles}
                        onClick={() => deleteNote(note.notesId)}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>

          {store.showModal && <EditModal />}
        </>
      );
    }
    return <h2>No Notes to Display</h2>;
  };

  return renderNotes();
};

export default Notes;
