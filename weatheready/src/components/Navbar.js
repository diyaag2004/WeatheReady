import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-light fixed-top" id="navbar">
      <a className="navbar-brand" href="/">
        <img src="assets/images/WeatheReady.jpg" height="50" width="200" alt="Logo image" />
      </a>
    </nav>
  );
};

export default Navbar;
