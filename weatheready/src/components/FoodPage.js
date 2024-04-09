import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link } from 'react-router-dom';
import '../App.css';

const FoodPage = () => {
  // Get weather data from context
  const { weatherData1 } = useContext(WeatherContext);

  // State variables for recommendations, loading, and error
  const [foodRecommendation, setFoodRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false); // Additional loading state

  // Extract weather parameters
  const city = weatherData1.name;
  const temperature = weatherData1.main.temp;

  // Function to fetch food recommendations from the backend API
  const fetchFoodRecommendation = async () => {
    setLoading(true);
    setError(false);
    setIsLoading2(true);
    try {
      const response = await fetch('https://flask-sirt-jeans.onrender.com/recommend-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ City: city, Temperature: temperature }),
      });

      const data = await response.json();
      if (response.ok) {
        setFoodRecommendation(parseFoodRecommendation(data.FoodRecommendation));
        setIsLoading2(false);
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

  // Function to parse food recommendation text
  const parseFoodRecommendation = (text) => {
    let lines = text.split('\n');
    let parsedLines = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.trim().startsWith('**')) {
        let startIndex = line.lastIndexOf('**');
        let endIndex = line.length - 2;
        if (startIndex !== endIndex) {
          line = `**${line.substring(0, endIndex)}**${line.substring(endIndex + 2)}`;
        }
        parsedLines.push(<h3 key={i}><strong>{line.substring(2)}</strong></h3>);
      } else if (line.startsWith('* ')) {
        parsedLines.push(<li key={i}>{line.substring(2)}</li>);
      } else if (line.startsWith('*')) {
        parsedLines.push(<li key={i}>{line.substring(1)}</li>);
      } else {
        parsedLines.push(<p key={i}>{line}</p>);
      }
    }

    return <div>{parsedLines}</div>;
  };

  // Event handler for the "Get Food Recommendations" button
  const handleFoodRecommendation = () => {
    fetchFoodRecommendation();
  };

  return (
    <>
      <div className="dress-widget-container">
        <h3>Food Recommendations based on Weather</h3>

        {/* Display weather information */}
        {weatherData1 && (
          <div>
            <h4>City: {weatherData1.name}</h4>
            <h6>Temperature: {weatherData1.main.temp}°C</h6>
          </div>
        )}

        {/* Display loading message */}
        {loading ? (
          <p className="loading">Finding delicious recommendations...</p>
        ) : null}

        {/* Display parsed food recommendations */}
        {!isLoading2 && foodRecommendation && (
          <div className="recommendation-container">{foodRecommendation}</div>
        )}

        {/* Button to trigger recommendations */}
        <button onClick={handleFoodRecommendation} className="dressp">
          Get Food Recommendations
        </button>

        {/* Error handling and navigation */}
        {error && (
          <div>
            <p>An error occurred while fetching recommendations.</p>
            <p>Do you want to go back to the home screen?</p>
            <Link to="/">
              <button>Yes, go home</button>
            </Link>
            <button onClick={() => setError(false)}>No, stay here</button>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodPage;