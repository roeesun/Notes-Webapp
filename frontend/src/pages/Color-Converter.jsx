import { useState } from "react";
import "../styles/color-converter.css";

function ColorConverter() {
  const [color, setColor] = useState({
    r: 255,
    g: 0,
    b: 0,
    a: 0.5,
    bgR: 255,
    bgG: 255,
    bgB: 255,
  });

  const rgbaToRgb = ({ r, g, b, a, bgR, bgG, bgB }) => ({
    r: Math.round((1 - a) * bgR + a * r),
    g: Math.round((1 - a) * bgG + a * g),
    b: Math.round((1 - a) * bgB + a * b),
  });

  const handleChange = (e) => {
    setColor({ ...color, [e.target.name]: parseFloat(e.target.value) });
  };

  return (
    <div className={`color-converter-container`}>
      <div className="color-input-field">
        <label>
          RGBA Color
          <div
            className="color-cube-preview"
            style={{
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            }}
          />
        </label>
        {["r", "g", "b", "a"].map((channel) => (
          <input
            key={channel}
            type="number"
            name={channel}
            min={channel === "a" ? "0" : "0"}
            max={channel === "a" ? "1" : "255"}
            step={channel === "a" ? "0.01" : "1"}
            value={color[channel]}
            onChange={handleChange}
            required
          />
        ))}
      </div>
      <div className="color-input-field">
        <label>
          Background RGB Color
          <div
            className="color-cube-preview"
            style={{
              backgroundColor: `rgb(${color.bgR}, ${color.bgG}, ${color.bgB})`,
            }}
          />
        </label>

        {["bgR", "bgG", "bgB"].map((channel) => (
          <input
            key={channel}
            type="number"
            name={channel}
            min="0"
            max="255"
            value={color[channel]}
            onChange={handleChange}
            required
          />
        ))}
      </div>
      <div
        className="color-display"
        style={{
          backgroundColor: `rgb(${rgbaToRgb(color).r}, ${rgbaToRgb(color).g}, ${
            rgbaToRgb(color).b
          })`,
          color: `rgb(${255 - rgbaToRgb(color).r}, ${
            255 - rgbaToRgb(color).g
          }, ${255 - rgbaToRgb(color).b})`,
        }}
      >
        Converted Color: rgb( {rgbaToRgb(color).r}, {rgbaToRgb(color).g},
        {rgbaToRgb(color).b})
      </div>
    </div>
  );
}

export default ColorConverter;
