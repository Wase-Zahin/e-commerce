import { useState, useEffect } from "react";
import loginIcon from "../images/6681204.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/", {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.data.message === 'Login successful') {
                    navigate.push('/home');
                } else {
                    setError('Incorrect login credentials');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="background">
            <form className="login-box" onSubmit={handleSubmit}>
                <img className="login-icon" src={loginIcon} alt="login-icon" />
                <h1>User Login</h1>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    name="username"
                    id="username"
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;