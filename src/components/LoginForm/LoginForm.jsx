import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import  TextField from '@mui/material/TextField';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      nav("/");
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div>
      <div className="form-container">
        <form className="signUpForm" autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
              className="authInputs" 
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              label="Email"
              variant="outlined"
              placeholder="Email"
          />
          <TextField 
              className="authInputs" 
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              label="Password"
              variant="outlined"
              placeholder="Password"
          />
          <button className="authBtns btmAuthBtns" type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
