import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("savedTheme");
  const [theme, setTheme] = useState(savedTheme ? savedTheme : "light");

  useEffect(() => {
    localStorage.setItem("savedTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
