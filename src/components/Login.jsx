import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json(); //parse our json data

      if (parseRes.token) {
        console.log(parseRes);

        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successful!");
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
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(event) => onChange(event)}
                  data-testid="email"
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(event) => onChange(event)}
                  data-testid="password"
                  className="form-control"
                />
              </label>
            </div>
          </div>
          <button type="submit" data-testid="loginBtn" className="registerBtn">
            Login
          </button>
        </form>

        <Link to="/register">Not a user? Click Here to Register</Link>
      </div>
    </>
  );
};

export default Login;
