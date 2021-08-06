import {Link} from 'react-router-dom';
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const NavBar = ({ setAuth }) => {
  //if authenticated show seachbar for the zipcode and logout.
  //Display login and register if not authenticated

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={(event) => logout(event)}>Logout</button>
        </li>
      </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
