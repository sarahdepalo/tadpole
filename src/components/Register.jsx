import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    primaryLocationState: "",
    primaryLocationCity: "",
    primaryLocationZip: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    primaryLocationState,
    primaryLocationCity,
    primaryLocationZip,
  } = inputs;

  const onChange = (event) => {
    setInput({ ...inputs, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = {
      firstName,
      lastName,
      email,
      password,
      primaryLocationState,
      primaryLocationCity,
      primaryLocationZip,
    };

    try {
      //have to set this up as a post since the default is a get
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json(); //need this so we can use the data. Should give us our jwt token

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); //sets our jwt token in our local storage!
        setAuth(true);
        toast.success("Registered Successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <label>
            Enter Your First Name:
          <input
            type="text"
            name="firstName"
            placeholder="John"
            value={firstName}
            onChange={(event) => onChange(event)}
          />
        </label>

        <br />
        <label>
            Enter Your Last Name:
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(event) => onChange(event)}
          />
        </label>
        <br />
        <label>
            Enter Your Email:
          <input
            type="email"
            name="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={(event) => onChange(event)}
          />
        </label>
        <br/>
        <label>
            Enter a Password:
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(event) => onChange(event)}
          />
        </label>
        <br />
        <label>
            Enter the information for your default location:
            State:
          <input
            type="text"
            name="primaryLocationState"
            placeholder="New York"
            value={primaryLocationState}
            onChange={(event) => onChange(event)}
          />
        </label>
        <label>
            City:
          <input
            type="text"
            name="primaryLocationCity"
            placeholder="Buffalo"
            value={primaryLocationCity}
            onChange={(event) => onChange(event)}
          />
        </label>
        <label>
            City:
          <input
            type="number"
            name="primaryLocationZip"
            placeholder="14211"
            value={primaryLocationZip}
            onChange={(event) => onChange(event)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already Registered? Click here to login.</Link>
    </>
  );
};

export default Register;
