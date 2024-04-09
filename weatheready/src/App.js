import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Homepage from './components/Homepage';
import { WeatherProvider } from './contexts/WeatherContext';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Homepage />
      <WeatherProvider />
     
    </div>
  );
}

export default App;
