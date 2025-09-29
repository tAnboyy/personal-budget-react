import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/hero">Hero</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;