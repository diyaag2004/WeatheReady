import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link, useNavigate } from 'react-router-dom';
import './OutfitsPage.css';
const OutfitsPage = () => {
  const { weatherData1, setWeatherData1 } = useContext(WeatherContext);
  const navigate = useNavigate();

  const [shirtPrediction, setShirtPrediction] = useState('');
  const [jeansPrediction, setJeansPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 
  const temperature = weatherData1.main.temp;
  const humidity = weatherData1.main.humidity;
  const windSpeed = weatherData1.wind.speed;

  const fetchDressRecommendation = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://flask-sirt-jeans.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Temperature: temperature, Humidity: humidity, 'Wind speed': windSpeed
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShirtPrediction(data.Shirt);
        setJeansPrediction(data.Jeans);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDressRecommendation = () => {
    fetchDressRecommendation();
  };

  
  return (
    <>
    <div className="dress-widget-container">
    
      <h3>Lets dress you up according to this weather</h3>
      <img src="/assets/images/wardrobe2.png" alt="Wardrobe" className="wardrobe-image" style={{ width: '50%', height: 'auto' }}/>
      {weatherData1 && (
        <div>
          <h4>City: {weatherData1.name}</h4>
          <h6>Temperature: {weatherData1.main.temp}°C</h6>
          <h6>Humidity: {weatherData1.weather[0].description}%</h6>
          <h6>Wind Speed: {weatherData1.wind.speed} Km/s</h6>
        </div>
      )}

      {loading ? <p className='loading'>Telling you dress Recommendation...</p> : null}
      <div>
        {shirtPrediction && <h2>Predicted Shirt: {shirtPrediction}</h2>}
        {jeansPrediction && <h2>Predicted Jeans: {jeansPrediction}</h2>}
      </div>

      <button onClick={handleDressRecommendation} className='dressp'>Get Outfits Recommendations</button>

     
      {error && (
        <div>
          <p>An error occurred while fetching recommendations.</p>
          <p>Do you want to go back to the home screen?</p>
          <Link to="/"><button>Yes, go home</button></Link>
          <button onClick={() => setError(false)}>No, stay here</button>
        </div>
      )}
      </div>
    </>
  );
};

export default OutfitsPage;