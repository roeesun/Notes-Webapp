import { useState, useRef, useEffect } from "react";
import api from "../api.js";
import ColorPicker from "./ColorPicker.jsx";

function CreateNote({
  getNotes,
  setShowCreateNotes,
  colors,
  note,
  setCurrentlyEditing,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(colors[0].hex);
  const [tag, setTag] = useState("");

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setColor(note.color);
      setTag(note.tag);
    }
  }, [note]);

  const handleColorChange = (eachColor) => {
    setColor(eachColor.hex);
  };

  const clearFields = () => {
    setTitle("");
    setContent("");
    setColor("");
    setTag("");
    setMsg("");
    setCurrentlyEditing(null);
    setShowCreateNotes(false);
  };

  const createOrUpdateNote = (e) => {
    e.preventDefault();
    const method = note ? api.put : api.post;
    const url = note ? `/api/notes/${note.id}/` : "/api/notes/";
    let tagValue = tag.replace(/#/g, "");
    tagValue = tagValue.replace(/\s/g, "_");
    method(url, { content, title, color, tag: tagValue })
      .then((res) => {
        if (res.status === 201 || res.status == 200) {
          clearFields();
        } else {
          console.log("Failed to create or edit node.");
        }
        getNotes();
      })
      .catch(
        (err) => (
          setMsg("An error has occurred. " + err.message), console.log(err)
        )
      );
  };

  return (
    <div className={`create-note-modal-container`}>
      <div className={`note-form-container  `}>
        <div className="create-note-modal-header">
          <button className="create-note-modal-close" onClick={clearFields}>
            &times;
          </button>
          <h2 className="create-note-modal-title">
            {note ? "Edit Note" : "Create Note"}
          </h2>
        </div>
        <form onSubmit={createOrUpdateNote}>
          {/* Title Field */}
          <div className="note-form-field-container">
            <label htmlFor="title">Title</label>
            <input
              className="note-form-field"
              maxLength="100"
              type="text"
              id="title"
              name="title"
              placeholder="A title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {/* Content Field */}
          <div className="note-form-field-container">
            <label htmlFor="content">Content</label>
            <textarea
              className="note-form-field"
              id="content"
              name="content"
              required
              placeholder="Some content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          {/* Color Buttons */}
          <div className="note-form-field-container">
            <label>Color</label>
            <ColorPicker
              selectedColor={color}
              handleColorChange={handleColorChange}
              colors={colors}
            />
          </div>
          {/* Tag Field */}
          <div className="note-form-field-container">
            <label htmlFor="tag">Tag (optional)</label>

            <div className=" note-tag-field-container">
              <span>#</span>
              <input
                className="note-form-field note-tag-field"
                maxLength="10"
                type="text"
                id="tag"
                name="tag"
                placeholder="Add a tag?"
                onChange={(e) => setTag(e.target.value)}
                value={tag}
              />
            </div>
          </div>
          {/* Submit Button */}
          <input className="submit-note" type="submit" value="Submit" />
          <div className="create-note-msg"> {msg}</div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
