import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls,Environment } from '@react-three/drei'
import GirlModel from './GirlModel'
import { RotatingLines } from "react-loader-spinner";
import './model.css'

function Modelcont() {

 

function Loader() {
  return (
    <RotatingLines
      strokeColor="cornflowerblue"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  )
}
  return (
    <div className='canva'>
      <h4>It is Under Progess 🏗️ See you Soon 🌞....</h4>
     <div>
      {/* <GirlModel /> */}
      
      <Loader/>
      <p>Loading 3D Model...</p>
    </div>
    </div>
  )
}

export default Modelcont