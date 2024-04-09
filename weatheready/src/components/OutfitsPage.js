import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
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
      <h1>Outfits according to climate condition</h1>
      {weatherData1 && (
        <div>
          <h2>City: {weatherData1.name}</h2>
          <h3>Temperature: {weatherData1.main.temp}°C</h3>
          <h4>Humidity: {weatherData1.weather[0].description}%</h4>
          <h4>Wind Speed: {weatherData1.wind.speed} Km/s</h4>
        </div>
      )}

      {loading ? <p className='loading'>Telling you dress Recommendation...</p> : null}
      <div>
        {shirtPrediction && <h1>Predicted Shirt: {shirtPrediction}</h1>}
        {jeansPrediction && <h1>Predicted Jeans: {jeansPrediction}</h1>}
      </div>

      <button onClick={handleDressRecommendation}>Get Outfits Recommendations</button>

     
      {error && (
        <div>
          <p>An error occurred while fetching recommendations.</p>
          <p>Do you want to go back to the home screen?</p>
          <Link to="/"><button >Yes, go home</button></Link>
          <button onClick={() => setError(false)}>No, stay here</button>
        </div>
      )}
    </>
  );
};

export default OutfitsPage;