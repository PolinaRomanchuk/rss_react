import type { ReactElement } from 'react';
import './header.css';
import { NavLink } from 'react-router';

import Sun from '../../assets/sun.svg';
import Moon from '../../assets/moon.svg';
import { useTheme } from '../context/ThemeContext';

const Header = (): ReactElement => {
  const { isDark, setIsDark } = useTheme();
  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src="/pikachu.png" alt="logo" />
      </div>
      <div className="header_actions">
        {isDark ? (
          <Moon
            className="theme-icon dark"
            onClick={() => setIsDark((previous) => !previous)}
          />
        ) : (
          <Sun
            className="theme-icon"
            onClick={() => setIsDark((previous) => !previous)}
          />
        )}
        <nav>
          <ul className="header-links-container">
            <NavLink
              to="/"
              style={({ isActive }) => {
                const themeColor = isDark ? 'white' : 'black';
                return {
                  color: isActive ? 'pink' : themeColor,
                };
              }}
              className="header-link"
            >
              home
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => {
                const themeColor = isDark ? 'white' : 'black';
                return {
                  color: isActive ? 'pink' : themeColor,
                };
              }}
              className="header-link"
            >
              about
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
