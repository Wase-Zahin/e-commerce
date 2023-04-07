import { useState } from "react";
import loginIcon from "../../images/6681204.png";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ Authenticated, setAuthenticated }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message === 'Incorrect login credentials')
          setError(res.data.message)
        console.log(res.data);
        if (res.data.message === "login successful!") {
          setAuthenticated(true);
          localStorage.setItem("username", username);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="background">
      <form className="login-box" onSubmit={handleSubmit}>
        <img className="login-icon" src={loginIcon} alt="login-icon" />
        <h1>User Login</h1>
        <input
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;