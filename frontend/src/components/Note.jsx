import React, { useState } from "react";

import expand_note from "..//assets/expand.png";
import edit_note from "../assets/edit-note.png";

function Note({ note, handleDelete, setExpandedNote, handleEdit, isExpanded }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  const handleExpand = (note) => {
    setExpandedNote(note);
  };
  return (
    <div
      className={`note-container ${isExpanded ? "expanded" : ""}`}
      style={{ backgroundColor: note.color }}
    >
      <div className="note-actions-bar">
        <img
          src={edit_note}
          className="edit-note-button"
          title="edit note"
          alt="edit note button"
          onClick={() => handleEdit(note)}
        ></img>
        <div className="note-action-bar-right">
          {!isExpanded ? (
            <>
              <img
                src={expand_note}
                className="expand-note-button"
                title="Expand note"
                onClick={() => handleExpand(note)}
              />
              <button
                className="note-action-button delete-button"
                title="Delete note?"
                onClick={() => handleDelete(note.id)}
              >
                &times;
              </button>
            </>
          ) : (
            <button
              className="note-action-button minimize-note-button"
              title="minimize?"
              onClick={() => setExpandedNote(null)}
            >
              -
            </button>
          )}
        </div>
      </div>
      <p className="note-title">{note.title}</p>
      <div className="note-content-container">
        <p className="note-content">{note.content}</p>
      </div>
      {note.tag && <p className="note-tag">#{note.tag}</p>}
      <p className="note-date">{formattedDate}</p>
    </div>
  );
}

export default Note;
