// Header.js
import React from 'react';
import './Header.css';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Header = () => {
  return (
    <header className="container-fluid text-center" id="header">
      <div className="row">
        <div className="col header-content">
        <img src="assets/images/WeatherIcon.png" height="160" width="200" alt="Logo image" className='cloud-img2' />
        <img src="assets/images/WeatherIcon.png" height="160" width="200" alt="Logo image" className='cloud-img1' />
        <img src="assets/images/WeatherIcon.png" height="160" width="200" alt="Logo image" className='cloud-img' />
          <h1 id="header-title" className="text-uppercase">
            WeatheReady
          </h1>
          <div className="line light" id="main-header-line"></div>
          
          <p className="header-paragraph">
          "Welcome to WeatherReady! Your ultimate destination for style, food, health tips, and adventure suggestions. Let's make to everyday extraordinary! 🌟🥗💬🗺️✨"
            <br />
            <img src="assets/images/sun.png" height="160" width="200" alt="Logo image" className='sun-img' />
            <TrackVisibility>
            {({ isVisible }) =>
            <div className={isVisible? "animated__animated animate__fadeIn": ""}>
            <span className="text-uppercase">Enter your location below!</span>
            </div>}
            </TrackVisibility>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
