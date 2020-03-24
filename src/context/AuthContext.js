import React, { useReducer } from 'react';

const defaultState = {
  users: {},
  currentUser: null,
};

export const AuthContext = React.createContext(defaultState);
export const AuthConsumer = AuthContext.Consumer;

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
         * */
        setState(name, value) {
          dispatch({ type: name, payload: value });
        },
        signin(username, password) {
          console.log(`Sign in called: ${username} ${password}`);
          const foundUser = state.users[username];
          if (foundUser && foundUser.password === password) {
            dispatch({ type: 'signin', payload: username });
            return true;
          }
          return false;
        },
        signup(username, password) {
          console.log(`Sign up called: ${username} ${password}`);
          const foundUser = state.users[username];
          if (!foundUser) {
            dispatch({ type: 'signup', payload: { username, password } });
            return true;
          }
          return false;
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
