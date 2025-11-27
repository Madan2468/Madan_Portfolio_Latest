"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float, Stars, Sparkles } from "@react-three/drei"
import Loader from "@/components/Loader"
import * as THREE from "three"

const LiquidChrome = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  // Add subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.4}>
          <MeshDistortMaterial
            color="#2a1a4a"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0}
            metalness={1}
            reflectivity={1}
          />
        </Sphere>
      </Float>

      {/* Optimized ambient particles */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <points>
          <sphereGeometry args={[5, 32, 32]} />
          <pointsMaterial
            size={0.02}
            color="#8b5cf6"
            transparent
            opacity={0.4}
            sizeAttenuation
          />
        </points>
      </group>

      {/* Additional particle layer */}
      <group rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <points>
          <sphereGeometry args={[6, 24, 24]} />
          <pointsMaterial
            size={0.015}
            color="#a78bfa"
            transparent
            opacity={0.2}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  )
}

const HeroCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance"
      }}
      className="w-full h-full"
      dpr={[1, 1.5]}
    >
      <Suspense fallback={<Loader />}>
        {/* Environment for realistic reflections */}
        <Environment preset="city" />

        {/* Optimized lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#3b82f6" />

        <LiquidChrome />

        {/* Reduced star count */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        {/* Optimized sparkles */}
        <Sparkles count={40} scale={10} size={3} speed={0.4} opacity={0.6} color="#8b5cf6" />

        {/* Smoother auto-rotation */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          enableDamping={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Suspense>
    </Canvas>
  )
}

export default HeroCanvas
