import type { ReactElement } from 'react';
import './header.css';
import Logo from '../../assets/pikachu.png';
import { NavLink } from 'react-router';

const Header = (): ReactElement => {
  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <nav>
        <ul className="header-links-container">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'pink' : 'black',
            })}
            className="header-link"
          >
            home
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              color: isActive ? 'pink' : 'black',
            })}
            className="header-link"
          >
            about
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
