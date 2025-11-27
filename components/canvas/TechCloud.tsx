"use client"

import type React from "react"
import { useMemo, useState, useRef, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, TrackballControls, Html, Line, Sparkles, MeshTransmissionMaterial, Environment, Billboard } from "@react-three/drei"
import * as THREE from "three"
import { technologies } from "@/lib/constants"
import { FileCode, FileType, Database, Server, Cpu, Globe, Layout, Layers, Box } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  html: Globe,
  css: Layout,
  js: FileCode,
  ts: FileType,
  react: Cpu,
  redux: Layers,
  tailwind: Layout,
  node: Server,
  mongodb: Database,
  three: Box,
}

const Node = memo(({ position, name, icon, index }: { position: THREE.Vector3; name: string; icon: string; index: number }) => {
  const Icon = iconMap[icon] || FileCode
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + index) * 0.5
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5 + index) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Hyper-Glass Node */}
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <icosahedronGeometry args={[2.5, 0]} />
        <MeshTransmissionMaterial
          backside={false}
          samples={1} // Optimized: Reduced samples
          thickness={3}
          chromaticAberration={hovered ? 0.5 : 0.1}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          iridescence={0.5}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          resolution={128} // Optimized: Further reduced resolution
          color={hovered ? "#915eff" : "#ffffff"}
        />
      </mesh>

      {/* Icon Overlay */}
      <Billboard>
        <Html
          transform
          distanceFactor={15}
          style={{
            transition: 'all 0.3s',
            opacity: hovered ? 1 : 0.8,
            transform: `scale(${hovered ? 1.2 : 1})`,
            pointerEvents: 'none'
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <Icon className={`w-12 h-12 ${hovered ? 'text-[#915eff]' : 'text-white'} transition-colors duration-300 drop-shadow-[0_0_10px_rgba(145,94,255,0.5)]`} />
            <span className={`mt-2 text-sm font-bold ${hovered ? 'text-[#915eff]' : 'text-white/70'} transition-colors duration-300 whitespace-nowrap drop-shadow-md`}>
              {name}
            </span>
          </div>
        </Html>
      </Billboard>
    </group>
  )
})

const DataPulse = ({ start, end, speed = 1, delay = 0 }: { start: THREE.Vector3; end: THREE.Vector3; speed?: number; delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * speed + delay) % 1
      ref.current.position.lerpVectors(start, end, t)
      // Fade out at ends
      const opacity = Math.sin(t * Math.PI)
      if (ref.current.material instanceof THREE.MeshBasicMaterial) {
        ref.current.material.opacity = opacity
      }
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="#915eff" transparent />
    </mesh>
  )
}

const Connections = ({ positions }: { positions: THREE.Vector3[] }) => {
  const { lines, pairs } = useMemo(() => {
    const points: THREE.Vector3[] = []
    const connectionPairs: { start: THREE.Vector3; end: THREE.Vector3 }[] = []

    positions.forEach((pos1, i) => {
      positions.forEach((pos2, j) => {
        if (i < j) {
          const dist = pos1.distanceTo(pos2)
          if (dist < 15) {
            points.push(pos1)
            points.push(pos2)
            if (Math.random() > 0.7) { // Only add pulses to some connections
              connectionPairs.push({ start: pos1, end: pos2 })
            }
          }
        }
      })
    })
    return { lines: points, pairs: connectionPairs }
  }, [positions])

  return (
    <group>
      <Line
        points={lines}
        color="#915eff"
        opacity={0.15}
        transparent
        lineWidth={1}
      />
      {pairs.map((pair, i) => (
        <DataPulse key={i} start={pair.start} end={pair.end} speed={0.5 + Math.random()} delay={Math.random() * 2} />
      ))}
    </group>
  )
}

const Network = ({ count = 4, radius = 20 }) => {
  const { nodes, positions } = useMemo(() => {
    const tempNodes = []
    const tempPositions: THREE.Vector3[] = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count

    let idx = 0
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        const pos = new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j))
        tempPositions.push(pos)
        tempNodes.push({
          pos,
          data: technologies[idx % technologies.length],
          index: idx
        })
        idx++
      }
    }
    return { nodes: tempNodes, positions: tempPositions }
  }, [count, radius])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Slower, majestic rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <Connections positions={positions} />
      {nodes.map((node, i) => (
        <Node
          key={i}
          position={node.pos}
          name={node.data.name}
          icon={node.data.icon}
          index={node.index}
        />
      ))}
      <Sparkles count={10} scale={radius * 2.5} size={2} speed={0.2} opacity={0.4} color="#e2e8f0" />
    </group>
  )
}

const TechCloud = () => {
  return (
    <div className="w-full h-[600px]">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 35], fov: 60 }}>
        {/* Lighting setup for glass materials */}
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Environment preset="city" />

        <Network count={5} radius={18} />

        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </div>
  )
}

export default TechCloud
