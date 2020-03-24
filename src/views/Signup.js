import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  /**
   * The comment in the Signin component also applies here.
   */
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSignup() {
    authContext.signup(username, password);
  }

  return (
    <section>
      <h1>Sign Up:</h1>
      <fieldset>
        <label for="signup-username">Username:</label>
        <input
          id="signup-username"
          name="signup-username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label for="signup-password" style={{ marginLeft: 15 }}>
          Password:
        </label>
        <input
          id="signup-password"
          name="signup-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          style={{ marginLeft: 15 }}
          type="button"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </fieldset>
    </section>
  );
};

export default Signup;
