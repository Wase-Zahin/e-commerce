import { useState, useEffect } from "react";
import loginIcon from "../images/6681204.png";
import axios from "axios";

const Login = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:8000/api/users/");
            setUsers(result.users);
            console.log(users);
        };

        fetchData();
    }, []);
    return (
        <div className='background'>
            <form className="login-box">
                <img className="login-icon" src={loginIcon} alt="login-icon" />
                <h1>User Login</h1>
                <input
                    v-model="username"
                    placeholder="Username"
                    name="username"
                    id="username" required />

                <input
                    v-model="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password" required />
                <button type="submit">Login</button>
            </form>
        </div >
    )
}

export default Login;