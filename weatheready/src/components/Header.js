// Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="container-fluid text-center" id="header">
      <div className="row">
        <div className="col header-content">
        <img src="assets/images/WeatherIcon.png" height="160" width="200" alt="Logo image" className='cloud-img2' />
        <img src="assets/images/WeatherIcon.png" height="160" width="200" alt="Logo image" className='cloud-img1' />
        <img src="assets/images/WeatherIcon.png" height="160" width="200" alt="Logo image" className='cloud-img' />
              <div>
                <h1 id="header-title" className="text-uppercase">
            WeatheReady
          </h1>
          <div className="line light" id="main-header-line"></div>
          
          <p className="header-paragraph">
<<<<<<< HEAD
          "Welcome to WeatherReady! Your ultimate destination for style, food, health tips, and adventure suggestions. Let's make to everyday extraordinary! 🌟🥗💬🗺️✨"
            <br />
            <TrackVisibility>
            {({ isVisible }) =>
            <div className={isVisible? "animated__animated animate__fadeIn": ""}>
=======
          WeatheReady is a web app that helps you stay stylish and healthy everyday based on the weather in your area.
            <br />        
>>>>>>> 80e504b5d83058c0fba1b2f0c6ac09ad914ed172
            <span className="text-uppercase">Enter your location below!</span>
            </p>
            </div>
       
        </div>
      </div>
    </header>
  );
};

export default Header;
