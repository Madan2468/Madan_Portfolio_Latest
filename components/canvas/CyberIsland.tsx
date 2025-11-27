"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Preload, Float, Sparkles, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

const CrystalShard = ({ position, rotation, scale, color }: { position: [number, number, number], rotation: [number, number, number], scale: number, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
      // Gentle floating
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        backside
        samples={1} // Optimized: Reduced samples
        resolution={256} // Optimized: Reduced resolution
        thickness={2}
        chromaticAberration={1}
        anisotropy={0.1} // Optimized: Reduced anisotropy
        distortion={0.5}
        distortionScale={0.5}
        temporalDistortion={0.2}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        color={color}
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  )
}

const CrystalField = () => {
  const groupRef = useRef<THREE.Group>(null)

  // Generate random shards
  const shards = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({ // Optimized: Reduced count slightly
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: Math.random() * 1.5 + 0.5,
      color: i % 2 === 0 ? "#7c3aed" : "#a78bfa" // Purple variations
    }))
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation of the entire field
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <CrystalShard key={i} {...shard} />
      ))}
    </group>
  )
}

const MovingLight = () => {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 10
      lightRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 5
    }
  })

  return <pointLight ref={lightRef} intensity={5} color="#c4b5fd" distance={20} />
}

const CyberIsland = () => { // Keeping name for compatibility, but content is Crystal Matrix
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]} // Optimized: Cap pixel ratio
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, antialias: false, alpha: true }} // Optimized: Disable antialias (bloom handles it)
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 15],
      }}
    >
      <color attach="background" args={['#050505']} />

      <ambientLight intensity={0.2} />
      <MovingLight />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#4c1d95" />

      <CrystalField />

      <Environment preset="city" />
      <Sparkles count={30} scale={20} size={3} speed={0.4} opacity={0.5} color="#fff" /> {/* Optimized: Reduced count */}

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
      <Preload all />
    </Canvas>
  )
}

export default CyberIsland
