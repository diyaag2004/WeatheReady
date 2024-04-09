import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Header from './components/Header';

import OutfitsPage from './components/OutfitsPage';
import Homepage from './components/Homepage';
import FoodPage from './components/FoodPage';
import HealthPage from './components/HealthPage';
import Modelcont from './components/Modelcont';
import VistingPlace from './components/VistingPlace';

function App() {
  return (
    <WeatherProvider>
    <Router>
    <div className="App">
      <Navbar /> 
     
      
      <Routes>
       
        <Route path="/"  element={<Homepage />} />
        <Route path="/outfits" element={<OutfitsPage/>} />
        <Route path="/food" element={<FoodPage/>} />
        <Route path="/health" element={<HealthPage/>} />
        <Route path="/try-on" element={<Modelcont/>} />
        <Route path="/visting-place" element={<VistingPlace/>} />

       
      </Routes>
    </div>
  </Router>
  </WeatherProvider>
  );
}

export default App;
