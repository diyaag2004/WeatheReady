import React,{ startTransition } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const GirlModel = () => {
  const girl = useGLTF('./model/scene.gltf');

  return (
    <Canvas frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}>
      <OrbitControls 
        autoRotate 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2} 
        enablePan={true} 
      />
      {startTransition(() => ( // Wrap the potentially suspending component
        <primitive object={girl.scene} />
      ))}
    </Canvas>
  );
};

export default GirlModel;