"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Icosahedron, Octahedron, Torus, Sphere } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

const Shape = ({ type }: { type: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  const Material = (
    <meshStandardMaterial
      color="#8b5cf6"
      emissive="#5b21b6"
      emissiveIntensity={2}
      roughness={0.2}
      metalness={0.8}
    />
  )

  if (type === "starbucks") {
    return (
      <Octahedron ref={meshRef} args={[1, 0]}>
        {Material}
      </Octahedron>
    )
  } else if (type === "tesla") {
    return (
      <Icosahedron ref={meshRef} args={[1, 0]}>
        {Material}
      </Icosahedron>
    )
  } else if (type === "shopify") {
    return (
      <Torus ref={meshRef} args={[0.8, 0.3, 16, 32]}>
        {Material}
      </Torus>
    )
  } else {
    return (
      <Sphere ref={meshRef} args={[1, 16, 16]}>
        {Material}
      </Sphere>
    )
  }
}

const TimelineIcon = ({ icon }: { icon: string }) => {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Shape type={icon} />
      </Float>
    </Canvas>
  )
}

export default TimelineIcon
