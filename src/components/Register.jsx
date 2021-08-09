import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from 'react-router';

const Register = ({ setAuth }) => {
  const [inputs, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    primaryLocationCity: "",
    primaryLocationState: "",
    primaryLocationZip: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    primaryLocationCity,
    primaryLocationState,
    primaryLocationZip,
  } = inputs;

  const onChange = (event) => {
    setInput({ ...inputs, [event.target.name]: event.target.value });
  };

  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = {
      firstName,
      lastName,
      email,
      password,
      primaryLocationCity,
      primaryLocationState,
      primaryLocationZip,
    };

    try {
      //have to set this up as a post since the default is a get
      const response = await fetch("https://api.sarahdepalo.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      localStorage.clear();

      if (response.status !== 401) {
        const parseRes = await response.json(); //need this so we can use the data. Should give us our jwt token

        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token); //sets our jwt token in our local storage!
          // setAuth(true);
          //added this to redirect to login page instead
          history.push("/login")
          toast.success("Registered Successfully!");
        }
      } else {
        setAuth(false);
        toast.error("A user with that email already exists");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="registerContainer">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(event) => onChange(event)}
                  className="form-control"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(event) => onChange(event)}
                  className="form-control lastName"
                  required
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@email.com"
                  value={email}
                  onChange={(event) => onChange(event)}
                  className="form-control"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(event) => onChange(event)}
                  className="form-control password"
                  required
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>
              City
                <input
                  type="text"
                  name="primaryLocationCity"
                  placeholder="Buffalo"
                  value={primaryLocationCity}
                  onChange={(event) => onChange(event)}
                  className="form-control"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                State
                <input
                  type="text"
                  name="primaryLocationState"
                  placeholder="New York"
                  value={primaryLocationState}
                  onChange={(event) => onChange(event)}
                  className="form-control"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Zipcode
                <input
                  type="number"
                  name="primaryLocationZip"
                  placeholder="14211"
                  value={primaryLocationZip}
                  onChange={(event) => onChange(event)}
                  className="form-control"
                  required
                />
              </label>
            </div>
          </div>
          <button type="submit" className="registerBtn">Register</button>
        </form>
        <Link to="/login">Already Registered? Click here to login.</Link>
      </div>
      
    </>
  );
};

export default Register;
