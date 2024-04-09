import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <div class="card" id="card1">
  <div class="content">
    <h2>01 👕👚</h2> 
    <h3>Outfit Recommendations</h3>
    <p>Discover the perfect outfit for today's weather! We'll suggest clothing and accessories to keep you comfortable and stylish. ☀️❄️🌧️</p>
    <Link to="/outfits">Get Outfit Ideas</Link> 
  </div>
</div>

<div class="card" id="card2">
  <div class="content">
    <h2>02 🍏🍽️</h2>
    <h3>Food & Nutrition Guide</h3>
    <p>Fuel your body right! Get personalized meal, snack, and intake recommendations based on today's weather and your dietary needs. 🥗🍔</p>
    <Link to="/food">See Today's Menu</Link> 
  </div>
</div>

<div class="card" id="card3">
  <div class="content">
    <h2>03 🩺🩹</h2>
    <h3>Your Personal Health Assistant</h3>
    <p>Get support for your well-being. Access period relief suggestions, dietary advice, and more, all in one place. 💪🧘‍♀️</p>
    <Link to="/health">Start Feeling Better</Link> 
  </div>
</div>

<div class="card" id="card4">
  <div class="content">
    <h2>04 🌍🏞️</h2>
    <h3>Places to Visit</h3>
    <p>Adventure awaits! Get suggestions for local attractions and sightseeing spots based on the current weather. 🏰🏖️</p>
    <Link to="/food">Discover Places</Link> 
  </div>
</div>

<div class="card" id="card5">
  <div class="content">
    <h2>05 🏄‍♀️🎭</h2>
    <h3>Activity Suggestions</h3>
    <p>Don't let the weather stop your fun! Discover indoor and outdoor activities tailored to today's forecast. 🌦️🌈</p>
    <Link to="/food">Explore Activities</Link> 
  </div>
</div>
</div>
  );
};

export default GlassMorphismCards;
