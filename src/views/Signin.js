import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signin = () => {
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
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <label style={{ marginLeft: 15 }}>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
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
