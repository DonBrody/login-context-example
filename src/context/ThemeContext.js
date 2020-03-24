import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Notice that no default state is required to create this context.
 */
export const ThemeContext = React.createContext(undefined);
export const ThemeConsumer = ThemeContext.Consumer;

const ThemeProvider = ({ children }) => {
  /**
   * Notice that because the ThemeProvider is inside of the AuthProvider 
   * in the App.js file we are able to subscribe to the AuthContext from 
   * inside of this provider.
   */
  const authContext = useContext(AuthContext);
  const [isSignedIn, setSignedIn] = useState(false);

  const { currentUser } = authContext.state;

  /**
   * We don't need to use the useEffect hook here, but this serves as 
   * an example of how to listen to context state changes the same way 
   * that we can listen to local state changes. We could have just as 
   * easily checked the currentUser state variable below (there's an 
   * example down there to show you what I mean).
   */
  useEffect(() => {
    setSignedIn(currentUser !== null);
  }, [currentUser]);

  return (
    <ThemeContext.Provider
    /**
     * Notice that we're not using the useReducer hook to manage state 
     * here. We always want to use the most minimalistic approach possible.
     */
      value={{
        sharedStyles: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '0 25px',
          height: 60,
          color: '#444',
          background: '#EFEFEF',
          boxSizing: 'border-box',    
        },
        /**
         * Example described above:
         * headerBackground: currentUser !== null ? 'cyan' : '#EFEFEF',
         * OR if we didn't decompose above:
         * headerBackground: context.currentUser !== null ? 'cyan' : '#EFEFEF',
         */
        headerBackground: isSignedIn ? 'cyan' : '#EFEFEF',
        footerBackground: isSignedIn ? 'magenta' : '#EFEFEF',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
