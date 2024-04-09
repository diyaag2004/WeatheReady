import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import jeans1 from '..//images/jeans/jeans1.png';
import jeans2 from '../images/jeans/jeans2.png';
import jeans3 from '../images/jeans/jeans3.png';
import jeans4 from '../images/jeans/jeans4.png';
import jeans5 from '../images/jeans/jeans5.png';
import jeans6 from '../images/jeans/jeans6.png';
import jeans7 from '../images/jeans/jeans7.png';
import jeans8 from '../images/jeans/jeans8.png';
import shirt1 from '../images/shirt/shirt1.png';
import shirt2 from '../images/shirt/shirt2.png';
import shirt3 from '../images/shirt/shirt3.png';
import shirt4 from '../images/shirt/shirt4.png';
import shirt5 from '../images/shirt/shirt5.png';
import shirt6 from '../images/shirt/shirt6.png';
import shirt7 from '../images/shirt/shirt7.png';
import shirt8 from '../images/shirt/shirt8.png';
import shirt9 from '../images/shirt/shirt9.png';
import shirt10 from '../images/shirt/shirt10.png';
import shirt11 from '../images/shirt/shirt11.png';

import shirt13 from '../images/shirt/shirt13.png';
import shirt14 from '../images/shirt/shirt14.png';


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
      <h3>Outfits according to climate condition</h3>
      {weatherData1 && (
        <div>
          <h4>City: {weatherData1.name}</h4>
          <h6>Temperature: {weatherData1.main.temp}°C</h6>
          <h6>Weather: {weatherData1.weather[0].description}%</h6>
          <h6>Humidity: {weatherData1.main.humidity}%</h6>
          <h6>Wind Speed: {weatherData1.wind.speed} Km/s</h6>
        </div>
      )}

      {loading ? <p className='loading'>Telling you dress Recommendation...</p> : null}
     <div class="image-container">
      <div>
        {shirtPrediction && (
          <div className="image-container">
            {/* <h2>Predicted Shirt: {shirtPrediction}</h2> */}
            <img src={require(`../images/shirt/${shirtPrediction}.png`)} alt={shirtPrediction} />
        
            
          </div>
        )}
        {jeansPrediction && (
          <div className="image-container">
            {/* <h2>Predicted Jeans: {jeansPrediction}</h2> */}
            <img src={require(`../images/jeans/${jeansPrediction}.png`)} alt={jeansPrediction} />
          </div>
        )}
      </div>
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