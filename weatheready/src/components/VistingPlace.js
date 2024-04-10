import React, { useState ,useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { WeatherContext } from '../contexts/WeatherContext';
import './WeatherWidget.css';
function VistingPlace() {
   
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
          
        
          const response = await fetch('https://flask-sirt-jeans.onrender.com/places-to-visit', {
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
      console.log(data.PlaceSuggestion);
      setActivites(parseActivities(data.PlaceSuggestion));   
      
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
  
     
      const parseActivities = (text) => {
        let lines = text.split('\n');
        let parsedLines = [];
      
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
      
          // Check for headings (levels 2 and 3)
          if (line.trim().startsWith('**') || line.trim().startsWith('##') || line.trim().startsWith('###')) {
            let headingLevel = 2; // Default to <h2>
            if (line.trim().startsWith('##')) headingLevel = 3; // <h3>
            if (line.trim().startsWith('###')) headingLevel = 4; // <h4>
      
            let startIndex = line.lastIndexOf('**') || line.lastIndexOf('##') || line.lastIndexOf('###');
            let endIndex = line.length - headingLevel; // Adjust for heading level
            if (startIndex !== endIndex) {
              line = `${line.substring(0, endIndex)}${line.substring(endIndex + headingLevel)}`;
            }
      
            // Use React.createElement to dynamically create heading elements
            parsedLines.push(React.createElement(`h${headingLevel}`, { key: i }, 
              React.createElement('strong', null, line.substring(headingLevel, endIndex))
            ));
      
          
          // Check for regular list items
          } else if (line.startsWith('*')) {
            parsedLines.push(<li key={i}>{line.substring(1)}</li>);
      
          // Treat remaining lines as paragraphs
          } else {
            parsedLines.push(<p key={i}>{line}</p>);
          }
        }
      
        return <div>{parsedLines}</div>;
      };

  

return (
  <> <div className="dress-widget-container">
  <h3> 🏞️ Places to visit in this weather🌦️ </h3>

  {/* Display weather information */}
  {weatherData1 && (
    <div>
      
      <h6>Temperature: {weatherData1.main.temp}°C</h6>
      <h6>Weather: {weatherData1.weather[0].description}</h6>
    
    </div>
  )}
{/* Button to trigger recommendations */}
<button onClick={fetchactivities} className="dressp">
        Find places to visit ! 🚵‍♂️      
      </button>
  {/* Display loading message */}
  {loading ? <p className='loading'>Telling you Places Recommendation 🌞...</p> : null}
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
  

export default VistingPlace