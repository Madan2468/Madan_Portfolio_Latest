"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF, Float, Sparkles, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

const Globe = () => {
  const coreRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x += delta * 0.1
      ringsRef.current.rotation.y += delta * 0.15
      ringsRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <group scale={2.5}>
      {/* Core Globe - Holographic Glass */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={2} // Optimized: Reduced samples
          thickness={0.5}
          chromaticAberration={0.5}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#7c3aed"
          roughness={0.1}
          metalness={0.5}
          resolution={256} // Optimized: Added resolution limit
        />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh ref={coreRef} scale={1.01}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Armillary Rings */}
      <group ref={ringsRef}>
        <Ring radius={1.4} tube={0.02} color="#4c1d95" axis="x" speed={1} />
        <Ring radius={1.6} tube={0.02} color="#5b21b6" axis="y" speed={0.8} />
        <Ring radius={1.8} tube={0.01} color="#7c3aed" axis="z" speed={1.2} />
      </group>

      {/* Orbiting Particles */}
      <Sparkles count={40} scale={4} size={4} speed={0.4} opacity={0.5} color="#c4b5fd" />
    </group>
  )
}

const Ring = ({ radius, tube, color, axis, speed }: { radius: number, tube: number, color: string, axis: string, speed: number }) => {
  return (
    <mesh rotation={[axis === 'x' ? Math.PI / 2 : 0, axis === 'y' ? Math.PI / 2 : 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </mesh>
  )
}

const HologramGlobe = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#a78bfa" />
      <pointLight position={[-10, -10, -10]} intensity={5} color="#4c1d95" />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Globe />
      </Float>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Preload all />
    </Canvas>
  )
}

export default HologramGlobe
