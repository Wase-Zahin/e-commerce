import { useState } from "react";
import axios from "axios";
import loginIcon from "../images/6681204.png";
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get("http://localhost:8000/api/users/get_csrf/");
            const csrf_token = response.data.csrf_token;
            console.log(csrf_token)
            await axios.post("http://localhost:8000/api/users/signup/", {
                username,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-csrftoken": csrf_token,
                    'Access-Control-Allow-Origin': 'http://localhost:8000'
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="background">
            <form method="POST" onSubmit={handleSubmit} className="login-box">
                <img className="login-icon" src={loginIcon} alt="login-icon" />
                <h1>Sign Up</h1>
                <input
                    placeholder="First Name"
                    name="firstname"
                    id="firstname"
                    required
                />

                <input
                    placeholder="Last Name"
                    name="lastname"
                    id="lastname"
                    required
                />

                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
                    name="username"
                    id="username"
                    required
                />

                <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                />

                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
