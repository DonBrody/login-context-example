import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Signin from './views/Signin';
import Signup from './views/Signup';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';

function App() {
  /**
   * Notice that we're able to access two separate context's from
   * this component.
   */
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const { currentUser } = authContext.state;
  const { sharedStyles, headerBackground, footerBackground } = themeContext;

  return (
    <BrowserRouter>
      <header style={{
        ...sharedStyles,
        justifyContent: 'space-between',
        borderBottom: '1px solid #DDD',
        background: headerBackground,
      }}>
        <span>I'm a header</span>
        {/* 
          Notice that the currentUser context state variable reacts to
          state changes the same way that a local state variable would.
        */}
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
      <footer
        style={{
          ...sharedStyles,
          borderTop: '1px solid #DDD',
          background: footerBackground,
        }}
      >
        I'm a footer
      </footer>
    </BrowserRouter>
  );
}

export default App;
