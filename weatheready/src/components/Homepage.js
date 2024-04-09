import React from 'react'
import Header from './Header';
import GlassMorphismCards from './GlassMorphismCards';
import WeatherWidget from './WeatherWidget';
function Homepage() {
  return (
    <>
        <Header />
        <WeatherWidget />
      <GlassMorphismCards />
    </>
  )
}

export default Homepage