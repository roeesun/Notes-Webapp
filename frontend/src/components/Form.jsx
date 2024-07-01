import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { NavLink } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndictaor";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    setMsg("");
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        console.log(res.data);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("LoggedUser", res.data.username);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setMsg("Login failed. Make sure the details are correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-container">
        <form onSubmit={handleSubmit} className="form-container">
          <h1>{name}</h1>
          <input
            className="form-input"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="form-input"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {loading && <LoadingIndicator />}
          <button className="form-button" type="submit">
            {name}
          </button>
          <p>{msg}</p>
          {method === "login" ? (
            <NavLink to="/register/" title="">
              Don't have an account?
            </NavLink>
          ) : (
            <NavLink to="/login/" title="">
              Already registered?
            </NavLink>
          )}
        </form>
      </div>
    </>
  );
}

export default Form;
