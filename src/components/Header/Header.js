import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';

const Header = props => (
  <nav className="nav-header">
    <div className="d-flex container justify-content-between">
      <Logo />
      <ul className="d-flex mb-0 align-items-center">
        <li className="mr-3">
          <NavLink exact className="nav-link" to="/players">
            Players
          </NavLink>
        </li>
        <li>
          <NavLink exact className="nav-link" to="/games">
            Games
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
