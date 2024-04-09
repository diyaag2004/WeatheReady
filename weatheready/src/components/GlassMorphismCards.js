import React, { useEffect } from 'react';
import './GlassMorphismCards.css';
import VanillaTilt from 'vanilla-tilt';


const GlassMorphismCards = () => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 1,
    });
  }, []);

  return (
    <div className="container">
      <div className="card" id="card1">
        <div className="content">
          <h2>01</h2>
          <h3>Card One</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum tempore ratione odit libero facere unde temporibus vel consequuntur quae ad, distinctio tenetur dicta dolorem aliquam, voluptatibus repudiandae, fuga ducimus corrupti.</p>

        </div>
      </div>
      <div className="card" id="card2">
        <div className="content" >
          <h2>02</h2>
          <h3>Card Two</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum tempore ratione odit libero facere unde temporibus vel consequuntur quae ad, distinctio tenetur dicta dolorem aliquam, voluptatibus repudiandae, fuga ducimus corrupti.</p>
  
        </div>
      </div>
      <div className="card" id="card3">
        <div className="content">
          <h2>03</h2>
          <h3>Card Three</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum tempore ratione odit libero facere unde temporibus vel consequuntur quae ad, distinctio tenetur dicta dolorem aliquam, voluptatibus repudiandae, fuga ducimus corrupti.</p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default GlassMorphismCards;
