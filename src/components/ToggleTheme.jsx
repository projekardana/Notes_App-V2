import React from 'react';
import ThemeContext from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        return (
          <button className="toggle-theme" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default ToggleTheme;
