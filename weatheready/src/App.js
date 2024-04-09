import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Homepage />
    </div>
  );
}

export default App;
