"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import Loader from "@/components/Loader"

const Avatar = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

const AvatarCanvas = () => {
  return (
    <Canvas className="w-full h-full">
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} />
        <Avatar />
        <OrbitControls enableZoom={false} autoRotate />
      </Suspense>
    </Canvas>
  )
}

export default AvatarCanvas
