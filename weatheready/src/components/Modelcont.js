import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls,Environment } from '@react-three/drei'
import {Model} from './Model'
function Modelcont() {
  return (
    <div className='canva'>
      <Canvas>
        <Environment preset='sunset' background />
     
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default Modelcont