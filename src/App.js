import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import github from "./imgs/github.png";
import linkedin from "./imgs/linkedin.png";
import "./App.css";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("https://api.sarahdepalo.com/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  const openGitHub = () => {
    const newWindow = window.open(
      "https://github.com/sarahdepalo",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  const openLinkedIn = () => {
    const newWindow = window.open(
      "https://www.linkedin.com/in/sarahdepalo/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  //Render is used below so that that the component doesn't have to keep remounting
  return (
    <div className="App">
      <Router>
        <Navbar setAuth={setAuth} isAuthenticated={isAuthenticated} />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
      <footer>
        <div className="iconContainer">
          <img src={github} alt="github icon" onClick={openGitHub} />
          <img src={linkedin} alt="LinkedIn icon" onClick={openLinkedIn} />
        </div>
      </footer>
    </div>
  );
}

export default App;
