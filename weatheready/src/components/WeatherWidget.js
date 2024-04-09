import React, { useState, useContext } from 'react';
import './WeatherWidget.css';

import { WeatherContext } from '../contexts/WeatherContext';
import Header from './Header';
const WeatherWidget = () => {
  // State variables for city input, weather data, loading state, and error state
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const { weatherData1, setWeatherData1 } = useContext(WeatherContext); // Accessing context for data sharing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingW, setLoadingW] = useState(true);
  const api_key = "94978dafad02672046620496f81cc592"; // Replace with your actual API key

  // Function to fetch weather data based on city or current location
  const fetchWeather = async () => {
    setLoading(true);
    setError(false);

    try {
      let url;
      if (city) {
        // Fetch weather data by city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
      } else {
        // Fetch weather data by current location coordinates
        const { coords } = await getCurrentLocation();
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${api_key}&units=metric`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '404') {
        setError(true);
      } else {
        setWeatherData(data);
        setWeatherData1(data); // Update weather data in context
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      setLoadingW(false);
    }
  };

  // Function to get current location using browser's geolocation API
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

  // Event handler for city search button
  const handleCitySearch = () => {
    fetchWeather();
  };

  // Event handler for location search button
  const handleLocationSearch = () => {
    setCity('');
    fetchWeather();
  };

  return (
    <>
      <Header />
      <div className="weather-widget-container">
        <h2 className="widget-title">See weather in you Area🌞</h2>
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
        {loadingW && <p>🌸 "Blossoming with excitement! But first, let's see what the weather has in store 🌦️🌸"</p>}
        {loading && <div>Loading...</div>}
        {error && <div>Error fetching weather data</div>}

        {weatherData && (
          <div className="weather-info">
            <h2>Current Weather 🌦️</h2>
            <p>Location: {weatherData.name}</p>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} Km/s</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherWidget;