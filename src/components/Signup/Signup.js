import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../../images/6681204.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Retrieve the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');

    // Send a POST request to the server with the CSRF token in the headers
    const response = await fetch("http://localhost:8000/api/users/signup/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ username, email, password }),
    });

    // Handle the response from the server
    const data = await response.json();
    if (response.ok) {
      // Success
      navigate('/login');
      setError(null);
      console.log('User created:', data);
    } else {
      // Error
      setError(data.error);
      console.log('Error:', data.error);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="background">
      <form method="POST" onSubmit={handleSignUp} className="login-box">
        <img className="login-icon" src={loginIcon} alt="login-icon" />
        <h1>Sign Up</h1>
        <input
          placeholder="First Name"
          name="first_name"
          id="first_name"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />

        <input
          placeholder="Last Name"
          name="last_name"
          id="last_name"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />

        <input
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />

        <input
          placeholder="Email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
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
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

// Helper function to retrieve a cookie by name
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}


export default SignUp;
