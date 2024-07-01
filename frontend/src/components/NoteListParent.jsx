import NotesList from "./NotesList";
import { useState, useEffect } from "react";
import api from "../api";

function NoteListParent() {
  const [notes, setNotes] = useState([]);

  const colors = [
    { name: "yellow", hex: "#FFFF00" },
    { name: "red", hex: "#FF0000" },
    { name: "green", hex: "#00FF00" },
    { name: "blue", hex: "#0000FF" },
    { name: "pink", hex: "#FFC0CB" },
  ];

  const tags = [
    ...new Set(notes.filter((note) => note.tag).map((note) => note.tag)),
  ];

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <NotesList
        notes={notes}
        getNotes={getNotes}
        colors={colors}
        tags={tags}
      />
    </div>
  );
}

export default NoteListParent;
