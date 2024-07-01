import React from "react";

const ColorPicker = ({
  selectedColor,
  handleColorChange,
  handleFilters,
  colors,
}) => {
  return (
    <div className="color-button-container">
      {colors.map((eachColor) => (
        <button
          key={eachColor.name}
          type="button"
          style={{ backgroundColor: eachColor.hex }}
          className={`color-button ${
            selectedColor === eachColor.hex ? "selected" : ""
          }`}
          onClick={
            handleFilters
              ? () => handleFilters("color", eachColor)
              : () => handleColorChange(eachColor)
          }
        ></button>
      ))}
    </div>
  );
};

export default ColorPicker;
