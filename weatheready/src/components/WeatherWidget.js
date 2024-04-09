import React, { useState, useContext } from 'react';
import './WeatherWidget.css';

import { WeatherContext } from '../contexts/WeatherContext';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const { weatherData1, setWeatherData1 } = useContext(WeatherContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const api_key = "94978dafad02672046620496f81cc592";
  
  const fetchWeather = async () => {
    setLoading(true);
    setError(false);

    try {
        let url;
        if(city){
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        } else{
            const { coords } = await getCurrentLocation();
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${api_key}&units=metric`;
      }

    const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '404') {
        setError(true);
      } else {
        setWeatherData(data);
        setWeatherData1(data);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          error => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const handleCitySearch = () => {
    fetchWeather();
  };

  const handleLocationSearch = () => {
    setCity('');
    fetchWeather();
  };

  return (
    <div className="weather-widget-container">
    <h2 className="widget-title">Weather Widget</h2>
    <div className="input-group">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name" 
      />
      <button onClick={handleCitySearch}>Search by city</button>
      <button onClick={handleLocationSearch}>Search by location</button>
    </div>
    {loading && <div>Loading...</div>}
    {error && <div>Error fetching weather data</div>}
    {weatherData && (
      <div className="weather-info">
        <h2>Current Weather</h2>
        <p>Location: {weatherData.name}</p>
        <p>Temperature: {weatherData.main.temp} °C</p>
        <p>Humidity: {weatherData.weather[0].description}</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    )}
  </div>
  );
};

export default WeatherWidget;
