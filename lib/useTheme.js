import React from "react";
export const ThemeContext = React.createContext();

const initialState = {
  isDark: false,
};

export function accordionReducer(state, { type, index }) {
  switch (type) {
    case "toggle":
      state.isDark = !state.isDark;
      return { ...state };
    default:
      throw new Error();
  }
}

export const ThemeProvider = ({ children }) => {
  const contextValue = React.useReducer(accordionReducer, initialState);
  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const contextValue = React.useContext(ThemeContext);
  return contextValue;
};
