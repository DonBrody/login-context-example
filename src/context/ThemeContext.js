import React, { useReducer } from 'react';

const defaultState = {};

export const ThemeContext = React.createContext(defaultState);
export const ThemeConsumer = ThemeContext.Consumer;

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <ThemeContext.Provider
      value={{
        state,
        setState(name, value) {
          dispatch({ type: name, payload: value });
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
