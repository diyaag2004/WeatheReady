import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Homepage from './components/Homepage';
import OutfitsPage from './components/OutfitsPage';
import { WeatherProvider } from './contexts/WeatherContext';
import WeatherWidget from './components/WeatherWidget';

function App() {
  return (
    <div className='App'>
          <Navbar />
          <Homepage />
    </div>
  );
}

export default App;
