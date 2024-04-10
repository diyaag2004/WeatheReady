import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link, useNavigate } from 'react-router-dom';
import './OutfitsPage.css';



const OutfitsPage = () => {
  // Get weather data from context
  const { weatherData1, setWeatherData1 } = useContext(WeatherContext);
  const navigate = useNavigate();

  // State variables for predictions, loading, and error
  const [shirtPrediction, setShirtPrediction] = useState('');
  const [jeansPrediction, setJeansPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Extract weather parameters
  const temperature = weatherData1.main.temp;
  const humidity = weatherData1.main.humidity;
  const windSpeed = weatherData1.wind.speed;

  // Function to fetch dress recommendations from the backend API
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
          Temperature: temperature, 
          Humidity: humidity, 
          'Wind speed': windSpeed 
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

  // Event handler for the "Get Outfits Recommendations" button
  const handleDressRecommendation = () => {
    fetchDressRecommendation();
  };

  return (
    <>
      <div className="dress-widget-container">
      <h3>👗 Lets dress you up according to this weather🌦️</h3>
<img src="/assets/images/wardrobe2.png" alt="Wardrobe" className="wardrobe-image" style={{ width: '50%', height: 'auto' }}/>

        {/* Display weather information */}
        {weatherData1 && (
          <div>
            <h6>City: {weatherData1.name}</h6>
            <h6>Temperature: {weatherData1.main.temp}°C</h6>
            <h6>Weather: {weatherData1.weather[0].description}</h6>
            <h6>Humidity: {weatherData1.main.humidity}%</h6>
            <h6>Wind Speed: {weatherData1.wind.speed} Km/s</h6>
          </div>
        )}

        {/* Display loading message */}
        {loading ? <p className='loading'>Telling you dress Recommendation 🌞...</p> : null}

        {/* Display predicted shirt and jeans images */}
        <div className="image-container">
          <div>
            {shirtPrediction && (
              <div className="image-wrapper">
              <img src={require(`../images/shirt/${shirtPrediction}.png`)} alt={shirtPrediction} className='rounded-image' />
              </div>
            )}
            {jeansPrediction && (
               <div className="image-wrapper">
               <img src={require(`../images/jeans/${jeansPrediction}.png`)} alt={jeansPrediction} className='rounded-image' />
              </div>
            )}
          </div>
        </div>
         
        {/* Button to trigger recommendations */}
        <button onClick={handleDressRecommendation} className='dressbutt'>
          Get Outfits Recommendations
        </button>
        <Link to="/try-on"> <button className='dressbutt'>
         3D try On
        </button> </Link> 
        {/* Error handling and navigation */}
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