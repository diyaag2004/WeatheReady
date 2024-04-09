import React, { useState ,useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { WeatherContext } from '../contexts/WeatherContext';
import './WeatherWidget.css';
function VistingPlace() {
    
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { weatherData1 } = useContext(WeatherContext);
    
    useEffect(() => {
        const fetchSuggestions = async () => {
          try {
            setLoading(true);
            const weather = weatherData1.weather[0].description; // Assuming your API returns weather data in this format
    
            let newSuggestions = [];
            if (weather) {
              if (weather.includes('Clear')) {
                newSuggestions = ["Beach", "Park", "Hiking trail"];
                setLoading(false);
              } else if (weather.includes('Rain')) {
                newSuggestions = ["Museum", "Cafe", "Theater"];
                setLoading(false);
              } else if (weather.includes('Snow')) {
                newSuggestions = ["Skiing resort", "Cozy cabin"];
                setLoading(false);
              } else {
                newSuggestions = ["Explore the city", "Visit a restaurant", "Shopping"];
                setLoading(false);
              }
            } else {
                setError(true);
              console.error("Weather data not available");
            }
    
            setSuggestions(newSuggestions);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        };
    
        fetchSuggestions();
      }, []); // Empty dependency array to fetch only once on component mount
    
  

        
    return (
      <div>
       
      <div className="dress-widget-container">
        <h3>Places to vist according to climate condition 🌦️ </h3>

        {/* Display weather information */}
        {weatherData1 && (
          <div>
            <h4>City: {weatherData1.name}</h4>
            <h6>Temperature: {weatherData1.main.temp}°C</h6>
            <h6>Weather: {weatherData1.weather[0].description}</h6>
          </div>
        )}

        {/* Display loading message */}
        {loading ? <p className='loading'> Place Recommendation Loading 🌞...</p> : null}

       
         
       
       
        {/* Error handling and navigation */}
        {error && (
          <div>
            <p>An error occurred while fetching recommendations.</p>
            <p>Do you want to go back to the home screen?</p>
            <Link to="/"><button>Yes, go home</button></Link>
            <button onClick={() => setError(false)}>No, stay here</button>
          </div>
        )}

<p>------------------------------</p>
    {suggestions.length > 0 && (
          <ul className="city-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion} ><h4>{suggestion}</h4></li>
            ))}
          </ul>
        )}
      </div>
    
    
      </div>
    );
  }
  

export default VistingPlace