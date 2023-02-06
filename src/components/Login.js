import loginIcon from "../images/6681204.png";

const Login = () => {
    const onSubmit = () => {

    }
    return (
        <div className='background'>
            <form class="login-box" onSubmit={onSubmit}>
                <img class="login-icon" src={loginIcon} alt="login-icon"/>
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