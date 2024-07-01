import { useState } from "react";
import ColorPicker from "./ColorPicker.jsx";
import search_icon from "../assets/search.png";
import "../styles/Layout.css";
import pin from "../assets/pin.png";
import pingray from "../assets/pinGray.png";

const Tag = ({
  tag,
  isPinned,
  handlePin,
  handleRemovePin,
  selectedTag,
  handleFilters,
}) => (
  <button
    key={tag}
    type="button"
    className={`notes-navbar-button notes-filter-tag ${
      selectedTag === tag ? "active" : ""
    }`}
    onClick={() => handleFilters("tag", tag)}
  >
    #{tag}
    <img
      className="notes-filter-tag-pin-icon"
      src={isPinned ? pin : pingray}
      type="button"
      onClick={isPinned ? () => handleRemovePin(tag) : () => handlePin(tag)}
    ></img>
  </button>
);

const NotesListNavbar = ({
  searchBy,
  setSearchBy,
  notes,
  colors,
  tags,
  showCreateNote,
  setShowCreateNotes,
  setSelectedColorButton,
  selectedColorButton,
  selectedTag,
  setSelectedTag,
}) => {
  const [pinnedTags, setPinnedTags] = useState([]);

  const handlePin = (tag) => {
    setPinnedTags([...pinnedTags, tag]);
  };

  const handleRemovePin = (tag) => {
    setPinnedTags(pinnedTags.filter((pTag) => pTag !== tag));
  };

  const handleCreateNoteButton = () => {
    setShowCreateNotes(!showCreateNote);
  };
  const handleFilters = (type, name) => {
    if (type == "tag") {
      name !== selectedTag ? setSelectedTag(name) : setSelectedTag(null);
    }
    if (type == "color") {
      name.hex !== selectedColorButton
        ? setSelectedColorButton(name.hex)
        : setSelectedColorButton(null);
    }
  };
  const clearFilters = () => {
    setSearchBy("");
    setSelectedTag(null);
    setSelectedColorButton(null);
  };
  const orderedTags = [
    ...pinnedTags,
    ...tags.filter((tag) => !pinnedTags.includes(tag)),
  ];

  const orderedColors = [
    ...new Set(
      notes.map((note) => {
        return colors.find((color) => color.hex === note.color);
      })
    ),
  ];

  return (
    <div className={`notes-navbar`}>
      <button
        className="notes-navbar-button"
        type="button"
        onClick={handleCreateNoteButton}
      >
        + New
      </button>
      <button
        className={`notes-navbar-button notes-filter-all ${
          selectedTag === null && selectedColorButton === null && "active"
        }`}
        type="button"
        onClick={() => clearFilters()}
      >
        All
      </button>
      <div className="notes-tags-container">
        {orderedTags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            isPinned={pinnedTags.includes(tag)}
            handlePin={handlePin}
            handleRemovePin={handleRemovePin}
            selectedTag={selectedTag}
            handleFilters={handleFilters}
          />
        ))}
      </div>
      <ColorPicker
        selectedColor={selectedColorButton}
        handleFilters={handleFilters}
        colors={orderedColors}
      />
      <div
        className="search-notes-container"
        title="Search by title or content"
      >
        <input
          className="search-notes"
          placeholder="Search..."
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        />
        {searchBy && (
          <button
            className="clear-search-notes-button"
            alt="Button for clearing the search"
            type="button"
            onClick={() => setSearchBy("")}
          >
            ×
          </button>
        )}
        <img
          src={search_icon}
          alt="Search bar icon"
          className="search-notes-icon"
        />
      </div>
    </div>
  );
};

export default NotesListNavbar;
