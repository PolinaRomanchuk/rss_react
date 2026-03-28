import type { ReactElement } from 'react';
import Logo from '../../assets/pikachu.png';
import { NavLink } from 'react-router';

import Sun from '../../assets/sun.svg?react';
import Moon from '../../assets/moon.svg?react';
import { useTheme } from '../context/ThemeContext';

const Header = (): ReactElement => {
  const { isDark, setIsDark } = useTheme();
  return (
    <header className="flex justify-between items-center m-5">
      <div className="size-10">
        <img className="size-full" src={Logo} alt="logo" />
      </div>
      <div className="flex items-center gap-3">
        {isDark ? (
          <Moon
            className="size-5 cursor-pointer fill-main hover:fill-main-contrast transition-colors duration-300"
            onClick={() => setIsDark((previous) => !previous)}
          />
        ) : (
          <Sun
            className="size-5 cursor-pointer fill-main hover:fill-main-contrast transition-colors duration-300"
            onClick={() => setIsDark((previous) => !previous)}
          />
        )}
        <nav>
          <ul className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? 'text-accent-orange' : 'text-main hover:text-main-contrast transition-colors duration-300'}`
              }
            >
              home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? 'text-accent-orange' : 'text-main hover:text-main-contrast transition-colors duration-300'}`
              }
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
