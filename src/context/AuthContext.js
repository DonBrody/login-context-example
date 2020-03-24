import React, { useReducer } from 'react';

const defaultState = {
  users: {},
  currentUser: null,
};

export const AuthContext = React.createContext(defaultState);
export const AuthConsumer = AuthContext.Consumer;
/**
 * With complex object state is generally a good approach to utilize 
 * the useReducer hook. This ensures that our objects are immutable, 
 * and provides us with a simple way to handle complex object changes.
 * 
 * Notice that the signup action will add a user to the users object 
 * using the username as the key. This ensures that only one user with 
 * the same username can be stored as a user in this simple example.
 * 
 * We're keeping track of whether or not a user is authenticated by 
 * storing the authenticated user's username in the currentUser variable.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.username]: {
            password: action.payload.password,
          },
        },
      };
    case 'signin':
      return {
        ...state,
        currentUser: [action.payload],
      };
    case 'signout':
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AuthContext.Provider
      value={{
        state,
        /**
         * We're not using this here, but this function is a way to
         * allow sub components to dispatch any action on their own.
         * This may or may not be desirable based on your application's 
         * needs. In this application, we generally wouldn't expose a 
         * function like this.
         * */
        setState(name, value) {
          dispatch({ type: name, payload: value });
        },
        signin(username, password) {
          console.log(`Sign in called: ${username} ${password}`);
          const foundUser = state.users[username];
          if (foundUser && foundUser.password === password) {
            dispatch({ type: 'signin', payload: username });
          }
        },
        signup(username, password) {
          console.log(`Sign up called: ${username} ${password}`);
          const foundUser = state.users[username];
          if (!foundUser) {
            dispatch({ type: 'signup', payload: { username, password } });
          }
        },
        signout() {
          console.log('Sign out called');
          dispatch({ type: 'signout', payload: null });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
