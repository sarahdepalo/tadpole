import { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    // Givs us access to the username of the user
    try {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      setName(parseRes.firstname);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  //removes the stored token and logs user out
  const logout = (event) => {
    <Redirect to="/" />
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out Successfully")

  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Hello, {name}</h2>
      <button type="button" onClick={(event) => logout(event)}>Logout</button>
    </>
  );
};

export default Dashboard;
