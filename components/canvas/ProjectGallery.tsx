"use client"

import type React from "react"
import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Image, Environment, ScrollControls, useScroll, Html, RoundedBox, Stars, Sparkles, Float, MeshReflectorMaterial, Text } from "@react-three/drei"
import * as THREE from "three"
import { projects } from "@/lib/constants"
import { Github, ExternalLink, Tv } from "lucide-react"

const RetroTV = ({ index, position, project, isHovered, onHover }: { index: number; position: [number, number, number]; project: any; isHovered: boolean; onHover: (hover: boolean) => void }) => {
  const ref = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  const handleClick = (e: any) => {
    e.stopPropagation()
    onHover(!isHovered) // Toggle on click
  }

  // Smooth hover animation & Orientation
  useFrame((state, delta) => {
    if (ref.current) {
      const targetScale = isHovered ? 1.2 : 1
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5)

      // Orientation Logic
      if (isHovered) {
        const worldPos = new THREE.Vector3()
        ref.current.getWorldPosition(worldPos)
        const angle = Math.atan2(camera.position.x - worldPos.x, camera.position.z - worldPos.z)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, angle, delta * 5)
      } else {
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, delta * 5)
      }

      // Subtle pulse
      if (isHovered && screenRef.current) {
        (screenRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      }
    }
  })

  return (
    <group
      ref={ref}
      position={position}
    >
      <Float speed={isHovered ? 0 : 2} rotationIntensity={isHovered ? 0 : 0.2} floatIntensity={isHovered ? 0 : 0.5} floatingRange={isHovered ? [0, 0] : undefined}>

        {/* --- CLICK HIT BOX --- */}
        {/* Click to open/close overlay */}
        <mesh
          position={[0, 0, 1]}
          onClick={handleClick}
        >
          <boxGeometry args={[5, 4, 2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* --- TV CHASSIS --- */}
        <RoundedBox args={[4.5, 3.2, 1.5]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.6} />
        </RoundedBox>

        <mesh position={[0, 0, 0.76]}>
          <boxGeometry args={[4.2, 2.8, 0.1]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>

        <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1, 1, 0.1, 6]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Antennas */}
        <group position={[0, 1.6, 0]} rotation={[0, 0, 0.5]}>
          <mesh position={[0.5, 0.8, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
            <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0.5, 1.8, 0]}>
            <sphereGeometry args={[0.1]} />
            <meshBasicMaterial color="red" />
          </mesh>
        </group>
        <group position={[0, 1.6, 0]} rotation={[0, 0, -0.5]}>
          <mesh position={[-0.5, 0.8, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
            <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[-0.5, 1.8, 0]}>
            <sphereGeometry args={[0.1]} />
            <meshBasicMaterial color="red" />
          </mesh>
        </group>

        {/* --- SCREEN --- */}
        <Image
          url={project.image}
          scale={[3.8, 2.4]}
          position={[0, 0, 0.82]}
          transparent
          opacity={1}
        />

        <mesh position={[0, 0, 0.83]} ref={screenRef}>
          <planeGeometry args={[3.8, 2.4]} />
          <meshBasicMaterial color="#000" transparent opacity={0.1} />
        </mesh>

        {/* --- PROJECT TITLE & CLICK TO OPEN TEXT ON SCREEN --- */}
        {!isHovered && (
          <Html
            center
            distanceFactor={8}
            position={[0, 0, 0.84]}
            style={{
              pointerEvents: 'none',
              width: '500px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px] animate-scanline" />

              {/* Glitch effect container */}
              <div className="relative animate-glitch-pulse px-6">
                {/* Project Title */}
                <h3
                  className="text-5xl font-black text-white mb-6 uppercase tracking-tight text-center glitch-text leading-tight"
                  data-text={project.name}
                  style={{
                    textShadow: '0 0 15px rgba(139, 92, 246, 1), 0 0 30px rgba(139, 92, 246, 0.7)',
                    animation: 'glitch-text 3s infinite'
                  }}
                >
                  {project.name}
                </h3>

                {/* Click to Open */}
                <div className="flex items-center justify-center gap-3 text-primary">
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                  <span
                    className="text-xl font-black uppercase tracking-widest"
                    style={{
                      textShadow: '0 0 15px rgba(139, 92, 246, 1), 0 0 25px rgba(139, 92, 246, 0.8)',
                    }}
                  >
                    CLICK TO OPEN
                  </span>
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                </div>
              </div>

              {/* RGB Split Effect */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
                style={{
                  background: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.1) 0px, rgba(0,255,0,0.1) 1px, rgba(0,0,255,0.1) 2px)',
                  animation: 'rgb-split 2s infinite'
                }}
              />
            </div>
          </Html>
        )}

        {/* --- HOLOGRAPHIC OVERLAY --- */}
        <Html
          center
          distanceFactor={8}
          position={[0, 0, 3]}
          style={{
            pointerEvents: isHovered ? 'auto' : 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            width: '600px'
          }}
        >
          <div className="flex flex-col items-center justify-center text-center p-8 bg-black/95 backdrop-blur-2xl border-4 border-primary/50 rounded-3xl shadow-[0_0_80px_rgba(124,58,237,0.6)]"
          >
            <button
              onClick={(e) => { e.stopPropagation(); onHover(false); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              ✕
            </button>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 rounded-full text-sm font-black text-white uppercase tracking-[0.2em] shadow-lg border border-white/20">
              Click to View
            </div>

            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] leading-none">
              {project.name}
            </h3>

            <p className="text-base text-gray-100 mb-6 font-medium leading-relaxed drop-shadow-md max-w-lg">
              {project.description}
            </p>

            <div className="flex gap-4 mb-6">
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-black text-sm transition-all hover:scale-105 cursor-pointer shadow-xl"
              >
                <Github size={20} />
                <span>CODE</span>
              </a>
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/80 rounded-full font-black text-sm transition-all hover:scale-105 cursor-pointer shadow-[0_0_30px_rgba(124,58,237,0.6)]"
              >
                <ExternalLink size={20} />
                <span>LIVE DEMO</span>
              </a>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {project.tags.map((tag: any) => (
                <span key={tag.name} className={`text-xs px-3 py-1.5 rounded-full ${tag.color} bg-white/10 border border-white/20 font-bold font-mono tracking-wider uppercase`}>
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

const BackgroundShapes = () => {
  return (
    <group>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-10, 5, -10]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#7c3aed" wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[10, -2, -15]}>
          <torusGeometry args={[3, 0.2, 16, 100]} />
          <meshStandardMaterial color="#2563eb" wireframe />
        </mesh>
      </Float>
    </group>
  )
}

const GalleryContent = () => {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Auto-scroll logic - only move when NO TV is hovered
  useFrame((state, delta) => {
    if (groupRef.current && hoveredIndex === null) {
      groupRef.current.position.x -= delta * 1.5
      if (groupRef.current.position.x < -((projects.length * 8) - 2)) {
        groupRef.current.position.x = 8
      }
    }
  })

  return (
    <group ref={groupRef} position={[8, 0, 0]}>
      {projects.map((project, i) => (
        <RetroTV
          key={i}
          index={i}
          position={[i * 8, 0, 0]}
          project={project}
          isHovered={hoveredIndex === i}
          onHover={(hover) => setHoveredIndex(hover ? i : null)}
        />
      ))}
    </group>
  )
}

const ProjectGallery = () => {
  return (
    <div className="w-full h-[800px]"> {/* Increased height for bigger elements */}
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 14], fov: 45 }}>
        <color attach="background" args={['#030014']} />
        <fog attach="fog" args={['#030014', 10, 40]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#a78bfa" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#3b82f6" />

        <Environment preset="city" />

        <GalleryContent />
        <BackgroundShapes />

        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={25} scale={15} size={3} speed={0.4} opacity={0.5} color="#a78bfa" />

        {/* Cyber Grid Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={256} // Optimized: Reduced resolution
            mixBlur={1}
            mixStrength={60}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.8}
            mirror={0.5}
          />
        </mesh>
      </Canvas>
    </div>
  )
}

export default ProjectGallery
