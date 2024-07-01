import { useState } from "react";
import api from "../api.js";
import Note from "./Note.jsx";
import CreateNote from "./CreateNote.jsx";
import NotesListNavbar from "./NotesListNavbar.jsx";
import useFilteredNotes from "./useFilteredNotes";

function NotesList({ notes, getNotes, colors, tags }) {
  const [showCreateNote, setShowCreateNotes] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [selectedColorButton, setSelectedColorButton] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [expandedNote, setExpandedNote] = useState(null);

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          console.log(`Deleted ${id}`);
        } else {
          alert("Failed to delete note.");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const handleEdit = (note) => {
    setExpandedNote(false);
    setShowCreateNotes(true);
    setCurrentlyEditing(note);
  };

  const filteredNotes = useFilteredNotes(
    notes,
    searchBy,
    selectedTag,
    selectedColorButton
  );

  return (
    <div>
      <NotesListNavbar
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        colors={colors}
        tags={tags}
        notes={notes}
        showCreateNote={showCreateNote}
        setShowCreateNotes={setShowCreateNotes}
        setSelectedColorButton={setSelectedColorButton}
        selectedColorButton={selectedColorButton}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="notes-list-container">
        {notes.length === 0 ? (
          <p>No current notes</p>
        ) : (
          filteredNotes.map((note) => (
            <Note
              note={note}
              handleDelete={deleteNote}
              setExpandedNote={setExpandedNote}
              key={note.id}
              handleEdit={handleEdit}
              isExpanded={note === expandedNote}
            />
          ))
        )}
      </div>
      <div className="create-container">
        {showCreateNote && (
          <CreateNote
            getNotes={getNotes}
            setShowCreateNotes={setShowCreateNotes}
            colors={colors}
            note={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
          />
        )}
      </div>
      {expandedNote && (
        <div className="overlay" onClick={() => setExpandedNote(null)}></div>
      )}
    </div>
  );
}

export default NotesList;
