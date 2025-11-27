"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.2
    }
  })

  return (
    <mesh ref={earthRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#4c1d95"
        emissive="#5b21b6"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.8}
      />
      <mesh scale={0.99}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </mesh>
  )
}

const MiniEarth = () => {
  return (
    <Canvas
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
        <Earth />
      </Suspense>
    </Canvas>
  )
}

export default MiniEarth
