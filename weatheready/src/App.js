import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Header from './components/Header';

import OutfitsPage from './components/OutfitsPage';
import Homepage from './components/Homepage';

function App() {
  return (
    <WeatherProvider>
    <Router>
    <div className="App">
      <Navbar /> 
     
      
      <Routes>
        <Route path="/outfits" element={<OutfitsPage/>} />
        <Route path="/"  element={<Homepage />} />
       
      </Routes>
    </div>
  </Router>
  </WeatherProvider>
  );
}

export default App;
