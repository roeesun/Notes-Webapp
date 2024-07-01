import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import ColorConverter from "./pages/Color-Converter.jsx";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "./store/ThemeProvider.jsx";

function Logout() {
  const theme = localStorage.getItem("savedTheme");
  localStorage.clear();
  if (theme) {
    localStorage.setItem("savedTheme", theme);
  }
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  const theme = localStorage.getItem("savedTheme");
  localStorage.clear();
  if (theme) {
    localStorage.setItem("savedTheme", theme);
  }
  return <Register />;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <Layout pageName="Home">
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path={"/notes/"}
            element={
              <Layout pageName="Notes">
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path={"/color-converter/"}
            element={
              <Layout pageName="Color Converter">
                <ProtectedRoute>
                  <ColorConverter />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path={"/contact/"}
            element={
              <Layout pageName="Contact">
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route path="/login/" element={<Login />} />
          <Route path="/logout/" element={<Logout />} />
          <Route path="/register/" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
