import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';
import { Link } from 'react-router-dom';
import '../App.css';
import './WeatherWidget.css';

function Activities() {

    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { weatherData1 } = useContext(WeatherContext);
    const [activites, setActivites] = useState('');
    const City = weatherData1.name;
    const Temperature = weatherData1.main.temp;
    const WeatherType = weatherData1.weather[0].description; // Assuming your API returns weather data in this format
    const Wind_speed = weatherData1.wind.speed;
    const Humidity = weatherData1.main.humidity;
   
      console.log(weatherData1);
        const fetchactivities = async () => {
          setLoading(true);
            setError(false);
          try {
            
          
            const response = await fetch('https://flask-sirt-jeans.onrender.com/recommend-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            City: City, 
            Temperature:Temperature,
            WeatherType: WeatherType,
            Wind_speed : Wind_speed,
            Humidity : Humidity
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(data.ActivitySuggestion);
        setActivites(parseActivites(data.ActivitySuggestion));   
        
      } else {
        setError(true);
      }
      
    
          
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
          finally{
            setLoading(false);
          }
        };
    
       
      
  const parseActivites = (text) => {
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

  return (
    <> <div className="dress-widget-container">
    <h3> 🛝Activities according to weather condition 🌦️ </h3>

    {/* Display weather information */}
    {weatherData1 && (
      <div>
        
        <h6>Temperature: {weatherData1.main.temp}°C</h6>
        <h6>Weather: {weatherData1.weather[0].description}</h6>
      
      </div>
    )}
{/* Button to trigger recommendations */}
<button onClick={fetchactivities} className="dressp">
          Get what to do 🎯�       
        </button>
    {/* Display loading message */}
    {loading ? <p className='loading'>Telling you Activities Recommendation 🌞...</p> : null}
    {!loading && activites && (
          <div className="recommendation-container">{activites}</div>
        )}
   
     
  
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
  )
}

export default Activities;