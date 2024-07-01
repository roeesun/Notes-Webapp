import React, { useContext } from "react";
import Navbar from "./Navbar.jsx";

import "../styles/Layout.css";
import { ThemeContext } from "../store/ThemeContext.jsx";

const Layout = ({ children, pageName }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container ${theme}`}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
