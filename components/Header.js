import Switch from "react-switch";
import React, { useState, useEffect } from "react";
const DARK_CLASS = "dark";
import { useTheme } from "../lib/useTheme";
function Header () {
   const [state, dispatch] = useTheme();

  const [isDark, setIsDark] = useState(state.isDark);

  useEffect(() => {
    if (state.isDark && isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [isDark]);

  function onChange() {
    setIsDark(!state.isDark);
    dispatch({ type: "toggle"})
  }

  return (
    <>
      <header className="header">
        <h3 id="logo">Where in the world?</h3>
        <nav>
          <ul>
            <li>
              <Switch
                checkedIcon={<span>🔆</span>}
                uncheckedIcon={<span>🌙</span>}
                checked={state.isDark}
                onChange={() => onChange()}
              />
              {state.isDark ? "Light Mode" : "Dark Mode"}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header
