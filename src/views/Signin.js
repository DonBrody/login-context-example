import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signin = () => {
  /**
   * Notice how we store username and password state locally here. 
   * There isn't a reason for this state to be persisted at a higher 
   * level (unless we wanted these fields to remain populated when a 
   * user navigates away from this component and back to it - for this 
   * app we don't need that though). This ensures that the only component 
   * that updates on key stroke is this one (if we persisted this state 
   * in context everything inside of the provider would update on key stroke). 
   * This would also be true for prop drilling.
   */
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSignin() {
    authContext.signin(username, password);
  }

  return (
    <section>
      <h1>Sign In:</h1>
      <fieldset>
        <label for="signin-username">Username:</label>
        <input
          id="signin-username"
          name="signin-username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label for="signin-password" style={{ marginLeft: 15 }}>
          Password:
        </label>
        <input
          id="signin-password"
          name="signin-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          style={{ marginLeft: 15 }}
          type="button"
          onClick={handleSignin}
        >
          Sign In
        </button>
      </fieldset>
    </section>
  );
};

export default Signin;
