import React from "react";
import { useState } from "react";
import "../styles/Note.css";

const ColorOptions = () => {
  const colors = [
    { name: "yellow", hex: "#FFFF00" },
    { name: "red", hex: "#FF0000" },
    { name: "green", hex: "#00FF00" },
    { name: "blue", hex: "#0000FF" },
    { name: "pink", hex: "#FFC0CB" },
  ];

  const [selectedColorButton, setSelectedColorButton] = useState(colors[0].hex);

  const [color, setColor] = useState(colors[0].hex);

  const handleColorChange = (eachColor) => {
    setColor(eachColor.hex);
    setSelectedColorButton(eachColor.hex);
  };

  return (
    <div className="color-button-container">
      {colors.map((eachColor) => (
        <button
          key={eachColor.name}
          type="button"
          style={{ backgroundColor: eachColor.hex }}
          className={`color-button ${
            selectedColorButton === eachColor.hex ? "selected" : ""
          }`}
          onClick={() => handleColorChange(eachColor)}
        ></button>
      ))}
    </div>
  );
};

export default ColorOptions;
