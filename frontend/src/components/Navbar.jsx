import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../store/ThemeContext.jsx";

import "../styles/Navbar.css";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import logo from "../assets/logo.png";
import logout from "../assets/logout.png";

const Navbar = () => {
  const username = localStorage.getItem("LoggedUser");

  const { theme, setTheme } = useContext(ThemeContext);

  const toggle_theme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`navbar`}>
      <NavLink to="/">
        <img src={logo} alt="image of logo" className="logo" />
      </NavLink>

      <ul className="nav-ul">
        <li>
          <NavLink to="/" title="Our home page!">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/notes/" title="Create and view your own notes.">
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink to="/color-converter/" title="Convert colors">
            Color Converter
          </NavLink>
        </li>
        <li>
          <NavLink to="/Contact/" title="Need to contact us?">
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="nav-action-items">
        <img
          src={theme === "light" ? toggle_light : toggle_dark}
          title="Change theme"
          alt="toggle theme button"
          className="toggle-icon"
          onClick={toggle_theme}
        />
        <p>Logged: {username}</p>
        <NavLink to="/Logout/" title="Logout" className="logout-icon">
          <img src={logout} alt="logout-icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
