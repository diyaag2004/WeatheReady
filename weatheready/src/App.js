import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Header from './components/Header';
import GlassMorphismCards from './components/GlassMorphismCards';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Header />
      <GlassMorphismCards />
    </div>
  );
}

export default App;
