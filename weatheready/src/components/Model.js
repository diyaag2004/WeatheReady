import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props){
    const { nodes, materials } = useGLTF("../model/model.glb", console.log)
    return (
        <mesh>
        <primitive object={Model.scene} />
        </mesh>
    )
}