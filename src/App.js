import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import { AuthContext } from './context/AuthContext';

const sharedStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0 25px',
  height: 59,
  color: '#444',
  background: '#EFEFEF',
  boxSizing: 'border-box',
};

function App() {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext.state;

  return (
    <BrowserRouter>
      <header style={{ ...sharedStyles, justifyContent: 'space-between', borderBottom: '1px solid #DDD' }}>
        <span>I'm a header</span>
        {!currentUser && (
          <div>
            <Link to="/signin">Sign In</Link>
            &nbsp;/&nbsp;
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        {currentUser && (
          <div>
            <span style={{ marginRight: 10 }}>
              {`Welcome, ${currentUser}!`}
            </span>
            <button type="button" onClick={authContext.signout}>Sign Out</button>
          </div>
        )}
      </header>
      <main style={{ padding: 25, height: 'calc(100vh - 120px)', boxSizing: 'border-box' }}>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/" component={Home}/>
        </Switch>
      </main>
      <footer style={{ ...sharedStyles, borderTop: '1px solid #DDD' }}>
        I'm a footer
      </footer>
    </BrowserRouter>
  );
}

export default App;
