"use client"

import { Suspense, useRef, useState, useEffect, useMemo, createContext, useContext, useCallback } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, useProgress, Html } from '@react-three/drei'
import * as THREE from "three"

// Keyboard context for letter activation
interface KeyboardContextType {
    activeLetter: string | null
    demogorgonMode: boolean
    typedSequence: string
}

const KeyboardContext = createContext<KeyboardContextType>({
    activeLetter: null,
    demogorgonMode: false,
    typedSequence: "",
})

export const useKeyboard = () => useContext(KeyboardContext)

// Loading screen component
function Loader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-amber-400/80 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-amber-200/60 text-sm font-light tracking-wider font-serif">
                    Entering the Upside Down... {Math.round(progress)}%
                </p>
            </div>
        </Html>
    )
}

// Scene Camera with Shake Effect
function SceneCamera({ lightsFlickering }: { lightsFlickering?: boolean }) {
    const cameraRef = useRef<THREE.Group>(null)

    // Shake animation
    useFrame((state) => {
        if (!cameraRef.current) return

        if (lightsFlickering) {
            // Violent earthquake shake using pseudo-random noise
            const time = state.clock.getElapsedTime()
            const intensity = 0.8 // High intensity shake

            // Jitter rotation slightly on all axes
            cameraRef.current.rotation.x = (Math.sin(time * 25) + Math.cos(time * 35)) * 0.02 * intensity
            cameraRef.current.rotation.y = (Math.cos(time * 30) + Math.sin(time * 40)) * 0.02 * intensity
            cameraRef.current.rotation.z = (Math.sin(time * 50)) * 0.01 * intensity

            // Jitter position slightly
            cameraRef.current.position.y = (Math.sin(time * 60)) * 0.05 * intensity
            cameraRef.current.position.x = (Math.cos(time * 45)) * 0.05 * intensity
        } else {
            // Smoothly recover to original state (damped spring-like)
            cameraRef.current.rotation.x = THREE.MathUtils.lerp(cameraRef.current.rotation.x, 0, 0.1)
            cameraRef.current.rotation.y = THREE.MathUtils.lerp(cameraRef.current.rotation.y, 0, 0.1)
            cameraRef.current.rotation.z = THREE.MathUtils.lerp(cameraRef.current.rotation.z, 0, 0.1)
            cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 0, 0.1)
            cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.1)
        }
    })

    return (
        <group ref={cameraRef}>
            <PerspectiveCamera makeDefault position={[0, 1.5, 2.5]} fov={50} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                target={[0, 0.5, -5]}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 2.5}
                maxAzimuthAngle={Math.PI / 4}
                minAzimuthAngle={-Math.PI / 4}
                rotateSpeed={0.5}
            />
        </group>
    )
}

// Worn wall with imperfections
function WornWall({
    position,
    rotation,
}: {
    position: [number, number, number]
    rotation: [number, number, number]
}) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Create worn wall texture procedurally
    const wallMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext("2d")!

        // Base off-white/beige color
        ctx.fillStyle = "#E8DCC8"
        ctx.fillRect(0, 0, 512, 512)

        // Add age marks and stains
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 512
            const y = Math.random() * 512
            const size = Math.random() * 30 + 5
            const alpha = Math.random() * 0.15 + 0.05
            ctx.fillStyle = `rgba(139, 119, 101, ${alpha})`
            ctx.beginPath()
            ctx.ellipse(x, y, size, size * 0.7, Math.random() * Math.PI, 0, Math.PI * 2)
            ctx.fill()
        }

        // Add tiny cracks
        ctx.strokeStyle = "rgba(100, 80, 60, 0.1)"
        ctx.lineWidth = 1
        for (let i = 0; i < 20; i++) {
            ctx.beginPath()
            const x = Math.random() * 512
            const y = Math.random() * 512
            ctx.moveTo(x, y)
            for (let j = 0; j < 5; j++) {
                ctx.lineTo(
                    x + (Math.random() - 0.5) * 40,
                    y + Math.random() * 30
                )
            }
            ctx.stroke()
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(2, 1)

        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.95,
            metalness: 0,
            bumpScale: 0.02,
        })
    }, [])

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            receiveShadow
            material={wallMaterial}
        >
            <planeGeometry args={[12, 6]} />
        </mesh>
    )
}

// Hand-painted alphabet letter
function AlphabetLetter({
    letter,
    position,
    color,
}: {
    letter: string
    position: [number, number, number]
    color: string
}) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Create hand-painted letter texture
    const letterMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext("2d")!

        // Transparent background
        ctx.clearRect(0, 0, 64, 64)

        // Hand-painted effect with slight variations
        ctx.font = "bold 48px Georgia, serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Multiple passes for brush stroke effect
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * 2
            const offsetY = (Math.random() - 0.5) * 2
            const alpha = 0.4 + Math.random() * 0.3
            ctx.fillStyle = color.replace(")", `, ${alpha})`).replace("rgb", "rgba")
            ctx.fillText(letter, 32 + offsetX, 34 + offsetY)
        }

        // Main letter
        ctx.fillStyle = color
        ctx.fillText(letter, 32, 34)

        // Add slight fade/wear
        ctx.globalCompositeOperation = "destination-out"
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
            ctx.beginPath()
            ctx.arc(
                Math.random() * 64,
                Math.random() * 64,
                Math.random() * 8 + 2,
                0,
                Math.PI * 2
            )
            ctx.fill()
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true

        return new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
        })
    }, [letter, color])

    // Slight random rotation for hand-painted effect
    const randomRotation = useMemo(
        () => (Math.random() - 0.5) * 0.15,
        []
    )

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={[0, 0, randomRotation]}
            material={letterMaterial}
        >
            <planeGeometry args={[0.35, 0.35]} />
        </mesh>
    )
}

// ChristmasLightBulb component (individual light)
function ChristmasLightBulb({
    position,
    color,
    intensity = 1.0,
    isLit,
    flickerSeed,
}: {
    position: [number, number, number]
    color: string
    intensity?: number
    isLit: boolean
    flickerSeed: number
}) {
    // Generate glow texture programmatically
    const glowTexture = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext("2d")!

        // Radial gradient for soft glow
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)") // Transparent

        ctx.clearRect(0, 0, 64, 64)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [])

    const [currentIntensity, setCurrentIntensity] = useState(intensity)
    const { demogorgonMode } = useKeyboard()

    useFrame((state) => {
        if (!isLit) {
            setCurrentIntensity(0)
            return
        }

        // Base flicker calculation
        const time = state.clock.elapsedTime
        let flicker = 1.0

        if (demogorgonMode) {
            // Chaotic violent flicker
            const noise = Math.sin(time * 50 + flickerSeed * 13.0)
                + Math.sin(time * 30 + flickerSeed * 29.0) * 0.5
            flicker = 2.0 + noise // Much brighter base
        } else {
            // Gentle hum
            const noise = Math.sin(time * 3 + flickerSeed) * 0.1
            flicker = 1.0 + noise
        }

        setCurrentIntensity(Math.max(0.1, intensity * flicker))
    })

    return (
        <group position={position}>
            {/* Bulb mesh */}
            <mesh>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial
                    color={isLit ? color : "#222"}
                    emissive={isLit ? color : "#000"}
                    emissiveIntensity={isLit ? currentIntensity : 0}
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>

            {/* Glow sprite */}
            {isLit && (
                <sprite scale={[0.15 * currentIntensity, 0.15 * currentIntensity, 1]}>
                    <spriteMaterial
                        map={glowTexture}
                        color={color}
                        transparent
                        opacity={demogorgonMode ? 0.9 : 0.6}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            )}
            {isLit && (
                <pointLight
                    color={color}
                    intensity={currentIntensity * 0.3}
                    distance={1.5}
                    decay={2}
                />
            )}
        </group>
    )
}

// Christmas light wire
function LightWire({ points }: { points: THREE.Vector3[] }) {
    const curve = useMemo(() => {
        if (points.length < 2) return null
        return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2)
    }, [points])

    if (!curve) return null

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.008, 8, false]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
    )
}

// Hand-painted color palette
const paintColors = [
    "rgb(20, 15, 12)",     // almost black
    "rgb(25, 15, 15)",     // black with hint of red
    "rgb(15, 18, 25)",     // black with hint of blue
]

// Bulb Colors
const bulbColors = [
    "#FFB347", "#FFCC66", "#FF6B6B", "#77DD77", "#89CFF0", "#FFD700", "#FF9966", "#FFAA00"
]

// Complete alphabet wall with lights
function AlphabetWall() {
    const { activeLetter, demogorgonMode } = useKeyboard()

    const seededRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898) * 43758.5453
        return x - Math.floor(x)
    }

    // Generate Layout Data once
    const layoutData = useMemo(() => {
        const letters: { letter: string; pos: [number, number, number]; color: string; bulbPos: [number, number, number]; bulbColor: string }[] = []

        // Rows configuration
        const rows = [
            { chars: "ABCDEFGH", y: 0.8, xStart: -1.8, space: 0.55 },
            { chars: "IJKLMNOP", y: 0.0, xStart: -1.75, space: 0.55 }, // Offset slightly
            { chars: "QRSTUVWXYZ", y: -0.8, xStart: -2.0, space: 0.52 }
        ]

        let globalIndex = 0
        rows.forEach((row) => {
            row.chars.split('').forEach((char, i) => {
                const xBase = row.xStart + i * row.space
                // Humanize positions
                const x = xBase + (seededRandom(globalIndex * 13.2) - 0.5) * 0.1
                const y = row.y + (seededRandom(globalIndex * 17.5) - 0.5) * 0.15

                letters.push({
                    letter: char,
                    pos: [x, y, -5.94], // On wall
                    color: paintColors[globalIndex % paintColors.length] ?? '#000000',
                    bulbPos: [x, y + 0.25, -5.92], // Bulb above letter
                    bulbColor: bulbColors[globalIndex % bulbColors.length] ?? '#FFB347'
                })
                globalIndex++
            })
        })
        return letters
    }, [])

    // Generate Wires separately based on bulb positions
    const wirePath = useMemo(() => {
        const points: THREE.Vector3[] = []
        // Start off-screen left
        points.push(new THREE.Vector3(-4, 1.5, -5.9))

        layoutData.forEach((item, i) => {
            // Bulb location
            points.push(new THREE.Vector3(...item.bulbPos))

            // Interaction: Loop/sag between bulbs
            if (i < layoutData.length - 1) {
                const next = layoutData[i + 1]
                const curr = item

                if (!next) return

                // If dropping to new row, drape longer
                const isNewRow = Math.abs(curr.bulbPos[1] - next.bulbPos[1]) > 0.4

                if (isNewRow) {
                    // Drape down
                    points.push(new THREE.Vector3(
                        (curr.bulbPos[0] + next.bulbPos[0]) * 0.5,
                        Math.min(curr.bulbPos[1], next.bulbPos[1]) + 0.1, // Loop up then down? No, just drape
                        -5.9
                    ))
                } else {
                    // Small sag
                    points.push(new THREE.Vector3(
                        (curr.bulbPos[0] + next.bulbPos[0]) * 0.5,
                        curr.bulbPos[1] - 0.1, // Sag down
                        -5.88 // Come out from wall slightly
                    ))
                }
            }
        })

        // End off-screen right
        points.push(new THREE.Vector3(4, -1, -5.9))

        return points
    }, [layoutData])

    // Demogorgon flicker Logic
    const [demoFlickerState, setDemoFlickerState] = useState<boolean[]>(new Array(26).fill(false))

    useEffect(() => {
        if (!demogorgonMode) return

        const interval = setInterval(() => {
            // Randomly light up 50% of bulbs every 50ms
            setDemoFlickerState(prev => prev.map(() => Math.random() > 0.5))
        }, 50)
        return () => clearInterval(interval)
    }, [demogorgonMode])

    return (
        <group>
            {/* Wires */}
            <LightWire points={wirePath} />

            {layoutData.map((item, idx) => {
                const isLit = demogorgonMode
                    ? demoFlickerState[idx]
                    : activeLetter === item.letter

                return (
                    <group key={item.letter}>
                        <AlphabetLetter
                            letter={item.letter}
                            position={item.pos}
                            color={item.color}
                        />
                        <ChristmasLightBulb
                            position={item.bulbPos}
                            color={item.bulbColor}
                            isLit={!!isLit}
                            flickerSeed={idx * 123.4}
                        />
                    </group>
                )
            })}
        </group>
    )
}


// Worn wooden floor
function WornFloor() {
    const floorMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext("2d")!

        // Dark wood base
        ctx.fillStyle = "#3D2817"
        ctx.fillRect(0, 0, 512, 512)

        // Wood grain lines
        for (let i = 0; i < 512; i += 32) {
            ctx.strokeStyle = `rgba(60, 40, 25, ${0.3 + Math.random() * 0.3})`
            ctx.lineWidth = 2 + Math.random() * 3
            ctx.beginPath()
            ctx.moveTo(0, i + Math.random() * 10)
            for (let x = 0; x < 512; x += 20) {
                ctx.lineTo(x, i + Math.sin(x * 0.02) * 5 + Math.random() * 3)
            }
            ctx.stroke()
        }

        // Wear marks and scratches
        for (let i = 0; i < 30; i++) {
            ctx.strokeStyle = `rgba(80, 60, 40, ${Math.random() * 0.4})`
            ctx.lineWidth = 1
            ctx.beginPath()
            const x = Math.random() * 512
            const y = Math.random() * 512
            ctx.moveTo(x, y)
            ctx.lineTo(x + (Math.random() - 0.5) * 50, y + (Math.random() - 0.5) * 50)
            ctx.stroke()
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(4, 4)

        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.85,
            metalness: 0.05,
        })
    }, [])

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow material={floorMaterial}>
            <planeGeometry args={[12, 12]} />
        </mesh>
    )
}

// Stained ceiling
function StainedCeiling() {
    const ceilingMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 256
        canvas.height = 256
        const ctx = canvas.getContext("2d")!

        // Off-white base
        ctx.fillStyle = "#D4C9B8"
        ctx.fillRect(0, 0, 256, 256)

        // Water stains
        for (let i = 0; i < 8; i++) {
            const gradient = ctx.createRadialGradient(
                Math.random() * 256,
                Math.random() * 256,
                0,
                Math.random() * 256,
                Math.random() * 256,
                Math.random() * 60 + 20
            )
            gradient.addColorStop(0, `rgba(139, 119, 101, ${Math.random() * 0.2})`)
            gradient.addColorStop(1, "rgba(139, 119, 101, 0)")
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 256, 256)
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(2, 2)

        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.95,
            metalness: 0,
        })
    }, [])

    return (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.5, 0]} receiveShadow material={ceilingMaterial}>
            <planeGeometry args={[12, 12]} />
        </mesh>
    )
}

// Old couch (1980s style)
function VintageCouch() {
    return (
        <group position={[-2, -1.3, 2]}>
            {/* Base/cushions */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.5, 0.5, 0.9]} />
                <meshStandardMaterial color="#5C4033" roughness={0.95} />
            </mesh>
            {/* Back */}
            <mesh position={[0, 0.4, -0.35]} castShadow receiveShadow>
                <boxGeometry args={[2.5, 0.7, 0.25]} />
                <meshStandardMaterial color="#4A3728" roughness={0.95} />
            </mesh>
            {/* Arms */}
            <mesh position={[-1.15, 0.15, 0]} castShadow>
                <boxGeometry args={[0.2, 0.5, 0.9]} />
                <meshStandardMaterial color="#4A3728" roughness={0.95} />
            </mesh>
            <mesh position={[1.15, 0.15, 0]} castShadow>
                <boxGeometry args={[0.2, 0.5, 0.9]} />
                <meshStandardMaterial color="#4A3728" roughness={0.95} />
            </mesh>
            {/* Worn cushions with fabric texture */}
            <mesh position={[-0.55, 0.32, 0.05]} castShadow>
                <boxGeometry args={[0.9, 0.15, 0.7]} />
                <meshStandardMaterial color="#6B5344" roughness={0.98} />
            </mesh>
            <mesh position={[0.55, 0.32, 0.05]} castShadow>
                <boxGeometry args={[0.9, 0.15, 0.7]} />
                <meshStandardMaterial color="#6B5344" roughness={0.98} />
            </mesh>
            {/* Throw blanket */}
            <mesh position={[0.8, 0.5, 0.2]} rotation={[0.1, 0.3, 0.2]} castShadow>
                <boxGeometry args={[0.8, 0.05, 0.6]} />
                <meshStandardMaterial color="#8B4513" roughness={0.99} />
            </mesh>
        </group>
    )
}

// Old CRT TV
function CRTTelevision() {
    return (
        <group position={[3, -1, -3]} rotation={[0, -0.3, 0]}>
            {/* TV body */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.9, 0.7, 0.7]} />
                <meshStandardMaterial color="#3D3D3D" roughness={0.7} />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0.05, 0.35]}>
                <planeGeometry args={[0.6, 0.45]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    emissive="#0a0a15"
                    emissiveIntensity={0.1}
                    roughness={0.1}
                />
            </mesh>
            {/* Screen bezel */}
            <mesh position={[0, 0.05, 0.34]} castShadow>
                <boxGeometry args={[0.75, 0.55, 0.05]} />
                <meshStandardMaterial color="#2D2D2D" roughness={0.8} />
            </mesh>
            {/* Knobs */}
            <mesh position={[0.35, -0.15, 0.36]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
                <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
            </mesh>
            <mesh position={[0.35, -0.25, 0.36]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
                <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
            </mesh>
            {/* TV stand */}
            <mesh position={[0, -0.5, 0]} castShadow>
                <boxGeometry args={[1, 0.3, 0.5]} />
                <meshStandardMaterial color="#5C4033" roughness={0.85} />
            </mesh>
        </group>
    )
}

// Coffee table with clutter
function ClutteredCoffeeTable() {
    return (
        <group position={[-2, -1.6, 0]}>
            {/* Table */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.08, 0.6]} />
                <meshStandardMaterial color="#5C4033" roughness={0.8} />
            </mesh>
            {/* Legs */}
            {[[-0.5, -0.2, -0.2], [0.5, -0.2, -0.2], [-0.5, -0.2, 0.2], [0.5, -0.2, 0.2]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <boxGeometry args={[0.05, 0.35, 0.05]} />
                    <meshStandardMaterial color="#4A3728" roughness={0.8} />
                </mesh>
            ))}
            {/* Coffee mug */}
            <mesh position={[-0.3, 0.1, 0.1]} castShadow>
                <cylinderGeometry args={[0.04, 0.035, 0.1, 12]} />
                <meshStandardMaterial color="#DDD" roughness={0.6} />
            </mesh>
            {/* Scattered papers */}
            <mesh position={[0.2, 0.05, 0]} rotation={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[0.25, 0.01, 0.35]} />
                <meshStandardMaterial color="#F5F5DC" roughness={0.95} />
            </mesh>
            {/* Ashtray */}
            <mesh position={[0.4, 0.06, -0.15]} castShadow>
                <cylinderGeometry args={[0.06, 0.07, 0.03, 12]} />
                <meshStandardMaterial color="#4A4A4A" roughness={0.7} />
            </mesh>
            {/* Pack of cigarettes */}
            <mesh position={[0.35, 0.08, 0.1]} rotation={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[0.06, 0.09, 0.04]} />
                <meshStandardMaterial color="#CC0000" roughness={0.8} />
            </mesh>
        </group>
    )
}

// Phone on wall
function WallPhone() {
    return (
        <group position={[-5.95, 0.5, 2]}>
            {/* Phone body */}
            <mesh castShadow>
                <boxGeometry args={[0.08, 0.35, 0.15]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.7} />
            </mesh>
            {/* Handset */}
            <mesh position={[0.05, 0.1, 0]} rotation={[0, 0, 0.1]} castShadow>
                <boxGeometry args={[0.04, 0.2, 0.05]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.7} />
            </mesh>
            {/* Cord (curly) */}
            <mesh position={[0.05, -0.1, 0]} castShadow>
                <torusGeometry args={[0.02, 0.005, 8, 12, Math.PI * 3]} />
                <meshStandardMaterial color="#3D3D3D" roughness={0.8} />
            </mesh>
        </group>
    )
}

// Bookshelf with 80s items
function VintageBookshelf() {
    return (
        <group position={[4.5, -0.5, 1]}>
            {/* Shelf frame */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 2.2, 0.35]} />
                <meshStandardMaterial color="#5C4033" roughness={0.85} />
            </mesh>
            {/* Shelves */}
            {[-0.6, -0.1, 0.4, 0.9].map((y, i) => (
                <mesh key={i} position={[0, y, 0.05]} castShadow>
                    <boxGeometry args={[0.9, 0.04, 0.3]} />
                    <meshStandardMaterial color="#4A3728" roughness={0.8} />
                </mesh>
            ))}
            {/* Books */}
            {Array.from({ length: 6 }).map((_, i) => (
                <mesh
                    key={`book-${i}`}
                    position={[-0.3 + i * 0.12, -0.4, 0.05]}
                    castShadow
                >
                    <boxGeometry args={[0.08, 0.25 + Math.random() * 0.1, 0.2]} />
                    <meshStandardMaterial
                        color={["#8B4513", "#006400", "#00008B", "#8B0000", "#4B0082", "#2F4F4F"][i % 6]}
                        roughness={0.9}
                    />
                </mesh>
            ))}
            {/* Radio */}
            <mesh position={[0, 0.55, 0.08]} castShadow>
                <boxGeometry args={[0.35, 0.15, 0.12]} />
                <meshStandardMaterial color="#2F2F2F" roughness={0.6} />
            </mesh>
            {/* Framed photo */}
            <mesh position={[-0.25, 1.05, 0.12]} castShadow>
                <boxGeometry args={[0.15, 0.2, 0.02]} />
                <meshStandardMaterial color="#8B7355" roughness={0.7} />
            </mesh>
        </group>
    )
}

// Floor lamp (vintage) - responds to demogorgon mode
function VintageFloorLamp() {
    const { demogorgonMode } = useKeyboard()
    const [flicker, setFlicker] = useState(1)

    useEffect(() => {
        if (demogorgonMode) {
            const interval = setInterval(() => {
                setFlicker(Math.random() > 0.3 ? Math.random() * 2 : 0)
            }, 50)
            return () => clearInterval(interval)
        } else {
            setFlicker(1)
        }
    }, [demogorgonMode])

    return (
        <group position={[-4, -2, -3]}>
            {/* Base */}
            <mesh castShadow>
                <cylinderGeometry args={[0.15, 0.18, 0.08, 12]} />
                <meshStandardMaterial color="#B8860B" roughness={0.5} metalness={0.4} />
            </mesh>
            {/* Pole */}
            <mesh position={[0, 0.8, 0]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 1.5]} />
                <meshStandardMaterial color="#B8860B" roughness={0.5} metalness={0.4} />
            </mesh>
            {/* Shade - glows during demogorgon */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.25, 0.3, 12, 1, true]} />
                <meshStandardMaterial
                    color={demogorgonMode ? "#FFB347" : "#E8DCC8"}
                    emissive={demogorgonMode ? "#FF6B6B" : "#000000"}
                    emissiveIntensity={demogorgonMode ? flicker * 0.5 : 0}
                    roughness={0.95}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Warm light - flickers in demogorgon mode */}
            <pointLight
                position={[0, 1.4, 0]}
                intensity={demogorgonMode ? flicker * 0.6 : 0.4}
                color={demogorgonMode ? "#FF6B6B" : "#FFD4A3"}
                distance={5}
                decay={2}
            />
        </group>
    )
}

// Worn rug
function WornRug() {
    const rugMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 256
        canvas.height = 256
        const ctx = canvas.getContext("2d")!

        // Base color - muted red/brown
        ctx.fillStyle = "#8B4513"
        ctx.fillRect(0, 0, 256, 256)

        // Pattern
        ctx.strokeStyle = "#6B3410"
        ctx.lineWidth = 8
        for (let i = 0; i < 256; i += 40) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(256, i)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, 256)
            ctx.stroke()
        }

        // Wear and fade
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `rgba(100, 80, 60, ${Math.random() * 0.3})`
            ctx.beginPath()
            ctx.ellipse(
                Math.random() * 256,
                Math.random() * 256,
                Math.random() * 40 + 10,
                Math.random() * 40 + 10,
                0,
                0,
                Math.PI * 2
            )
            ctx.fill()
        }

        const texture = new THREE.CanvasTexture(canvas)

        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.98,
            metalness: 0,
        })
    }, [])

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0.1]} position={[-1.5, -1.98, 0.5]} receiveShadow material={rugMaterial}>
            <planeGeometry args={[3, 2]} />
        </mesh>
    )
}

// Window with curtains (dim light)
function WindowWithCurtains() {
    return (
        <group position={[5.95, 0.3, -1]}>
            {/* Window frame */}
            <mesh castShadow>
                <boxGeometry args={[0.1, 1.8, 1.2]} />
                <meshStandardMaterial color="#F5F5DC" roughness={0.9} />
            </mesh>
            {/* Dark glass (night) */}
            <mesh position={[-0.03, 0, 0]}>
                <planeGeometry args={[0.08, 1.5, 1]} />
                <meshStandardMaterial color="#0a0a15" roughness={0.2} />
            </mesh>
            {/* Curtain left */}
            <mesh position={[-0.05, 0, -0.7]} castShadow>
                <boxGeometry args={[0.05, 2, 0.4]} />
                <meshStandardMaterial color="#4A3728" roughness={0.95} />
            </mesh>
            {/* Curtain right */}
            <mesh position={[-0.05, 0, 0.7]} castShadow>
                <boxGeometry args={[0.05, 2, 0.4]} />
                <meshStandardMaterial color="#4A3728" roughness={0.95} />
            </mesh>
            {/* Curtain rod */}
            <mesh position={[-0.08, 1.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, 1.6]} />
                <meshStandardMaterial color="#B8860B" roughness={0.4} metalness={0.5} />
            </mesh>
        </group>
    )
}

// Dark doorway - pitch black void inside
function DarkDoorway({ position, side }: { position: [number, number, number], side: 'left' | 'right' }) {
    return (
        <group position={position}>
            {/* Door frame - worn white painted wood */}
            {/* Top frame */}
            <mesh position={[0, 1.1, 0]} castShadow>
                <boxGeometry args={[0.9, 0.1, 0.15]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.9} />
            </mesh>
            {/* Left frame */}
            <mesh position={[-0.4, 0, 0]} castShadow>
                <boxGeometry args={[0.1, 2.2, 0.15]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.9} />
            </mesh>
            {/* Right frame */}
            <mesh position={[0.4, 0, 0]} castShadow>
                <boxGeometry args={[0.1, 2.2, 0.15]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.9} />
            </mesh>
            {/* Pitch black void inside - the darkness */}
            <mesh position={[0, 0, 0.05]}>
                <planeGeometry args={[0.7, 2.1]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
            {/* Subtle depth illusion - darker gradient */}
            <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[0.72, 2.12]} />
                <meshBasicMaterial color="#050505" />
            </mesh>
        </group>
    )
}

// Plaid armchair - 80s style
function PlaidArmchair() {
    return (
        <group position={[3.5, -1.4, 1.5]} rotation={[0, -0.8, 0]}>
            {/* Seat */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.25, 0.7]} />
                <meshStandardMaterial color="#4A3A2A" roughness={0.95} />
            </mesh>
            {/* Back */}
            <mesh position={[0, 0.5, -0.28]} castShadow>
                <boxGeometry args={[0.8, 0.75, 0.15]} />
                <meshStandardMaterial color="#3D3020" roughness={0.95} />
            </mesh>
            {/* Arms */}
            <mesh position={[-0.35, 0.2, 0]} castShadow>
                <boxGeometry args={[0.12, 0.35, 0.7]} />
                <meshStandardMaterial color="#3D3020" roughness={0.95} />
            </mesh>
            <mesh position={[0.35, 0.2, 0]} castShadow>
                <boxGeometry args={[0.12, 0.35, 0.7]} />
                <meshStandardMaterial color="#3D3020" roughness={0.95} />
            </mesh>
            {/* Cushion */}
            <mesh position={[0, 0.18, 0.05]} castShadow>
                <boxGeometry args={[0.65, 0.08, 0.55]} />
                <meshStandardMaterial color="#5C4A38" roughness={0.98} />
            </mesh>
        </group>
    )
}

// Side table with rotary phone
function SideTableWithPhone() {
    return (
        <group position={[-4.5, -1.5, 1]}>
            {/* Table */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.05, 0.4]} />
                <meshStandardMaterial color="#5C4033" roughness={0.8} />
            </mesh>
            {/* Legs */}
            {[[-0.2, -0.25, -0.15], [0.2, -0.25, -0.15], [-0.2, -0.25, 0.15], [0.2, -0.25, 0.15]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <boxGeometry args={[0.04, 0.45, 0.04]} />
                    <meshStandardMaterial color="#4A3728" roughness={0.8} />
                </mesh>
            ))}
            {/* Rotary phone */}
            <group position={[0, 0.12, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[0.2, 0.08, 0.25]} />
                    <meshStandardMaterial color="#2A2A2A" roughness={0.6} />
                </mesh>
                {/* Dial */}
                <mesh position={[0, 0.05, 0.03]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                    <meshStandardMaterial color="#D4C4A8" roughness={0.7} />
                </mesh>
                {/* Handset */}
                <mesh position={[0, 0.08, 0]} rotation={[0, 0.2, 0]} castShadow>
                    <boxGeometry args={[0.22, 0.04, 0.05]} />
                    <meshStandardMaterial color="#2A2A2A" roughness={0.6} />
                </mesh>
            </group>
            {/* Lamp - handled by TableLamp component */}
            <TableLamp position={[0.15, 0.25, -0.1]} />
        </group>
    )
}

// Scattered newspapers and magazines
function ScatteredPapers() {
    return (
        <group>
            {/* Newspaper on floor */}
            <mesh position={[-1, -1.98, 1.5]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
                <planeGeometry args={[0.4, 0.55]} />
                <meshStandardMaterial color="#E8E0D0" roughness={0.95} />
            </mesh>
            {/* Magazine */}
            <mesh position={[-0.5, -1.97, 2]} rotation={[-Math.PI / 2, 0, -0.2]} receiveShadow>
                <planeGeometry args={[0.25, 0.35]} />
                <meshStandardMaterial color="#A0522D" roughness={0.9} />
            </mesh>
            {/* Another paper */}
            <mesh position={[0.8, -1.97, 1.8]} rotation={[-Math.PI / 2, 0, 0.8]} receiveShadow>
                <planeGeometry args={[0.3, 0.4]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.95} />
            </mesh>
        </group>
    )
}

// Wood stove - 80s heating
function WoodStove() {
    return (
        <group position={[-4.5, -1.3, -3]}>
            {/* Main body */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.9, 0.6]} />
                <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.3} />
            </mesh>
            {/* Door */}
            <mesh position={[0, -0.1, 0.31]} castShadow>
                <boxGeometry args={[0.35, 0.4, 0.02]} />
                <meshStandardMaterial color="#2A2A2A" roughness={0.6} metalness={0.4} />
            </mesh>
            {/* Handle */}
            <mesh position={[0.12, -0.1, 0.33]} castShadow>
                <boxGeometry args={[0.08, 0.03, 0.02]} />
                <meshStandardMaterial color="#4A4A4A" roughness={0.5} metalness={0.6} />
            </mesh>
            {/* Chimney pipe */}
            <mesh position={[0, 0.7, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.6]} />
                <meshStandardMaterial color="#2A2A2A" roughness={0.6} metalness={0.4} />
            </mesh>
            {/* Pipe going to wall */}
            <mesh position={[0, 1.1, -0.3]} rotation={[Math.PI / 4, 0, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.8]} />
                <meshStandardMaterial color="#2A2A2A" roughness={0.6} metalness={0.4} />
            </mesh>
            {/* Legs */}
            {[[-0.3, -0.55, -0.2], [0.3, -0.55, -0.2], [-0.3, -0.55, 0.2], [0.3, -0.55, 0.2]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <cylinderGeometry args={[0.03, 0.03, 0.2]} />
                    <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.3} />
                </mesh>
            ))}
            {/* Subtle warm glow from fire inside */}
            <pointLight position={[0, -0.1, 0.4]} intensity={0.1} color="#FF6B35" distance={2} decay={2} />
        </group>
    )
}

// Blanket draped over couch
function DrapedBlanket() {
    return (
        <group position={[-2, -0.85, 2.3]}>
            {/* Main blanket body */}
            <mesh rotation={[0.3, 0.1, 0.05]} castShadow>
                <boxGeometry args={[1.2, 0.04, 0.8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.98} />
            </mesh>
            {/* Draped edge */}
            <mesh position={[0.5, -0.15, 0.3]} rotation={[0.5, 0.2, 0.3]} castShadow>
                <boxGeometry args={[0.4, 0.03, 0.5]} />
                <meshStandardMaterial color="#7A3D12" roughness={0.98} />
            </mesh>
        </group>
    )
}

// Table lamp component - responds to demogorgon mode
function TableLamp({ position }: { position: [number, number, number] }) {
    const { demogorgonMode } = useKeyboard()
    const [flicker, setFlicker] = useState(1)

    useEffect(() => {
        if (demogorgonMode) {
            const interval = setInterval(() => {
                setFlicker(Math.random() > 0.4 ? Math.random() * 1.5 : 0)
            }, 60)
            return () => clearInterval(interval)
        } else {
            setFlicker(1)
        }
    }, [demogorgonMode])

    return (
        <group position={position}>
            <mesh castShadow>
                <cylinderGeometry args={[0.03, 0.05, 0.06, 12]} />
                <meshStandardMaterial color="#B8860B" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.12, 0]} castShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                <meshStandardMaterial color="#B8860B" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.25, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.12, 0.15, 12, 1, true]} />
                <meshStandardMaterial
                    color={demogorgonMode ? "#FFB347" : "#E8DCC8"}
                    emissive={demogorgonMode ? "#FF6B6B" : "#000000"}
                    emissiveIntensity={demogorgonMode ? flicker * 0.4 : 0}
                    roughness={0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <pointLight
                position={[0, 0.2, 0]}
                intensity={demogorgonMode ? flicker * 0.3 : 0.2}
                color={demogorgonMode ? "#FF6B6B" : "#FFD4A3"}
                distance={3}
                decay={2}
            />
        </group>
    )
}

// Room lighting - all ambient lights respond to demogorgon mode
function RoomLighting() {
    const { demogorgonMode } = useKeyboard()
    const [flicker1, setFlicker1] = useState(1)
    const [flicker2, setFlicker2] = useState(1)

    useEffect(() => {
        if (demogorgonMode) {
            const interval = setInterval(() => {
                setFlicker1(Math.random() > 0.3 ? Math.random() * 1.5 : 0.1)
                setFlicker2(Math.random() > 0.25 ? Math.random() * 2 : 0)
            }, 40)
            return () => clearInterval(interval)
        } else {
            setFlicker1(1)
            setFlicker2(1)
        }
    }, [demogorgonMode])

    return (
        <>
            {/* Minimal ambient - flickers red in demogorgon mode */}
            <ambientLight
                intensity={demogorgonMode ? flicker1 * 0.15 : 0.08}
                color={demogorgonMode ? "#FF4444" : "#E8DCC8"}
            />

            {/* Subtle fill light from the side - flickers */}
            <pointLight
                position={[4, 1, 0]}
                intensity={demogorgonMode ? flicker2 * 0.25 : 0.15}
                color={demogorgonMode ? "#FF6B6B" : "#FFD4A3"}
                distance={8}
                decay={2}
            />

            {/* Extra flickering red light during demogorgon mode */}
            {demogorgonMode && (
                <>
                    <pointLight
                        position={[-3, 1, -4]}
                        intensity={flicker1 * 0.4}
                        color="#FF0000"
                        distance={10}
                        decay={2}
                    />
                    <pointLight
                        position={[3, 0, 2]}
                        intensity={flicker2 * 0.3}
                        color="#880000"
                        distance={8}
                        decay={2}
                    />
                </>)}
        </>
    )
}

// Main Scene
function JoyceBayersRoom() {
    return (
        <group>
            {/* Walls */}
            <WornWall position={[0, 0.25, -6]} rotation={[0, 0, 0]} />
            <WornWall position={[0, 0.25, 6]} rotation={[0, Math.PI, 0]} />
            <WornWall position={[-6, 0.25, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WornWall position={[6, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]} />

            <WornFloor />
            <StainedCeiling />
            <WornRug />

            {/* Dark doorways on either side of alphabet wall */}
            <DarkDoorway position={[-4, -0.9, -5.93]} side="left" />
            <DarkDoorway position={[4, -0.9, -5.93]} side="right" />

            {/* The iconic alphabet wall with lights */}
            <AlphabetWall />

            {/* Authentic 80s Byers home furniture */}
            <VintageCouch />
            <PlaidArmchair />
            <CRTTelevision />
            <ClutteredCoffeeTable />
            <SideTableWithPhone />
            <VintageBookshelf />
            <VintageFloorLamp />
            <WoodStove />
            <WindowWithCurtains />
            <WallPhone />
            <ScatteredPapers />
            <DrapedBlanket />

            {/* Room lighting - responds to demogorgon mode */}
            <RoomLighting />
        </group>
    )
}

// Film grain overlay
function FilmGrain() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.08]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
            }}
        />
    )
}

// Vignette effect
function Vignette() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
                background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
        />
    )
}

// UI Overlay
function UIOverlay() {
    const [showInstructions, setShowInstructions] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShowInstructions(false), 6000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            {/* Title - 80s horror movie style */}
            <div className="absolute top-6 left-6">
                <h1
                    className="text-amber-200/80 text-xl tracking-[0.3em] font-light"
                    style={{ fontFamily: "Georgia, serif", textShadow: "0 0 20px rgba(255, 180, 100, 0.3)" }}
                >
                    HAWKINS, INDIANA
                </h1>
                <p
                    className="text-amber-200/40 text-xs tracking-[0.2em] mt-1"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    November 1983
                </p>
            </div>

            {/* Instructions */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${showInstructions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
            >
                <div
                    className="bg-black/40 backdrop-blur-sm rounded-md px-5 py-2.5 border border-amber-900/30"
                    style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
                >
                    <p
                        className="text-amber-200/70 text-sm tracking-wider"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Drag to look around
                    </p>
                </div>
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-6 right-6">
                <div className="flex items-center gap-2 text-amber-200/30 text-xs tracking-wider">
                    <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                            backgroundColor: "#FFB347",
                            boxShadow: "0 0 8px #FFB347, 0 0 16px #FFB347",
                        }}
                    />
                    <span style={{ fontFamily: "Georgia, serif" }}>THE UPSIDE DOWN</span>
                </div>
            </div>
        </div>
    )
}



export default function RoomPage() {
    const [activeLetter, setActiveLetter] = useState<string | null>(null)
    const [typedSequence, setTypedSequence] = useState("")

    // Split states for the sequenced event
    // lightsFlickering: triggers the 3D lights chaos immediately
    const [lightsFlickering, setLightsFlickering] = useState(false)
    // showAttackRed: triggers the red screen and "RUN" text after delay
    const [showAttackRed, setShowAttackRed] = useState(false)

    const [showTyped, setShowTyped] = useState(false)

    // Audio refs
    const bgAudioRef = useRef<HTMLAudioElement | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const vecnaBufferRef = useRef<AudioBuffer | null>(null)
    const punchBufferRef = useRef<AudioBuffer | null>(null)

    // Initialize Audio
    useEffect(() => {
        console.log("🔊 Initializing Audio Setup...")

        // initialize AudioContext immediately
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Load Audio Buffers
        const loadBuffer = async (url: string, ref: React.MutableRefObject<AudioBuffer | null>) => {
            try {
                const response = await fetch(url)
                const arrayBuffer = await response.arrayBuffer()
                const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
                ref.current = audioBuffer
                console.log(`🔊 Loaded buffer: ${url}`)
            } catch (e) {
                console.error(`🔊 Failed to load ${url}:`, e)
            }
        }

        loadBuffer('/audio/strangerthings/vecnaattack.mp3', vecnaBufferRef)
        loadBuffer('/audio/strangerthings/rockpunchcinematic.mp3', punchBufferRef)

        // Background Ambient Loop
        const bgAudio = new Audio('/audio/strangerthings/strangerthingsbg.mp3')
        bgAudio.loop = true
        bgAudio.volume = 0.4

        bgAudioRef.current = bgAudio

        // Try to play background audio on first interaction
        const startAudio = () => {
            if (bgAudioRef.current) {
                if (bgAudioRef.current.paused) {
                    bgAudioRef.current.play()
                        .catch(e => console.error("🔊 BG Audio autoplay blocked/failed", e))
                }
            }

            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume()
            }
        }

        window.addEventListener('click', startAudio)
        window.addEventListener('keydown', startAudio)

        return () => {
            if (bgAudioRef.current) {
                bgAudioRef.current.pause()
                bgAudioRef.current.src = ''
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            window.removeEventListener('click', startAudio)
            window.removeEventListener('keydown', startAudio)
        }
    }, [])

    // Spark Sound Effect
    const playSpark = useCallback(() => {
        try {
            if (!audioContextRef.current) return;
            const ctx = audioContextRef.current

            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            osc.type = 'sawtooth'
            osc.frequency.value = 100 + Math.random() * 50

            filter.type = 'highpass'
            filter.frequency.value = 800

            const now = ctx.currentTime
            gain.gain.setValueAtTime(0.08, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

            osc.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            osc.start(now)
            osc.stop(now + 0.1)
        } catch (e) {
            console.error("⚡ Spark sound failed", e)
        }
    }, [])

    // Play helper
    const playBuffer = useCallback((buffer: AudioBuffer, volume: number = 1.0, duckBg: boolean = false) => {
        if (!audioContextRef.current || !buffer) return;
        const ctx = audioContextRef.current;

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;

        // Compressor for safety if volume is high
        const compressor = ctx.createDynamicsCompressor();

        source.connect(gainNode);
        gainNode.connect(compressor);
        compressor.connect(ctx.destination);

        source.start(0);

        if (duckBg && bgAudioRef.current) {
            const originalVolume = bgAudioRef.current.volume;
            // Fade out
            const fadeOut = setInterval(() => {
                if (bgAudioRef.current && bgAudioRef.current.volume > 0.05) {
                    bgAudioRef.current.volume -= 0.05;
                } else {
                    clearInterval(fadeOut);
                }
            }, 50);

            // Restore after buffer duration
            setTimeout(() => {
                const fadeIn = setInterval(() => {
                    if (bgAudioRef.current && bgAudioRef.current.volume < originalVolume) {
                        bgAudioRef.current.volume += 0.05;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
            }, buffer.duration * 1000);
        }
    }, [])

    // Handle keyboard events
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.key.toUpperCase()

        if (/^[A-Z]$/.test(key)) {
            playSpark()
            setActiveLetter(key)
            setShowTyped(true)

            setTypedSequence(prev => {
                const newSeq = (prev + key).slice(-10)

                if (newSeq.includes("RUN")) {
                    console.log("👻 RUN sequence detected!")
                    setLightsFlickering(true)

                    // TIMELINE
                    // T=0: Flicker Starts + Camera Shake
                    // T=1s: Vecna Audio Starts
                    // T=(1s + VecnaDuration - 2s): Punch Audio + Red Screen

                    const vecnaDuration = vecnaBufferRef.current?.duration || 5;


                    // 1. Play Vecna Audio after 1s
                    setTimeout(() => {
                        console.log("🔊 Playing Vecna (LOUD)");
                        if (vecnaBufferRef.current) {
                            playBuffer(vecnaBufferRef.current, 4.0, true);
                        }
                    }, 1000)

                    // 2. Schedule Punch + Red Screen
                    const triggerTime = 1000 + (vecnaDuration * 1000) - 2000;

                    setTimeout(() => {
                        console.log("👊 PUNCH + 🚨 RED SCREEN");
                        setShowAttackRed(true);
                        if (punchBufferRef.current) {
                            playBuffer(punchBufferRef.current, 2.0, false);
                        }
                    }, Math.max(1000, triggerTime));

                    // 3. Reset everything after it's all done
                    const resetTime = 1000 + (vecnaDuration * 1000) + 1000; // 1s after Vecna ends
                    setTimeout(() => {
                        console.log("👻 Effect sequence ending");
                        setLightsFlickering(false);
                        setShowAttackRed(false);
                        setTypedSequence("");
                    }, resetTime);
                }

                return newSeq
            })
        }
    }, [playSpark, playBuffer])

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        const key = e.key.toUpperCase()
        if (/^[A-Z]$/.test(key) && activeLetter === key) {
            // Keep the letter lit for a moment after release
            setTimeout(() => {
                setActiveLetter(null)
            }, 400)
        }
    }, [activeLetter])

    // Set up keyboard listeners
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    // Hide typed message after inactivity
    useEffect(() => {
        if (showTyped) {
            const timer = setTimeout(() => setShowTyped(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showTyped, typedSequence])



    return (
        <KeyboardContext.Provider
            value={{
                activeLetter,
                typedSequence,
                demogorgonMode: lightsFlickering, // Map lightsFlickering to demogorgonMode for context consumers
            }}
        >
            <div className="w-full h-screen bg-black relative overflow-hidden select-none cursor-grab active:cursor-grabbing">
                {/* Vintage overlay effects */}
                <FilmGrain />
                <Vignette />
                <UIOverlay />

                {/* Typed message display - positioned lower on screen */}
                {showTyped && typedSequence && !lightsFlickering && (
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                        <p
                            className="text-amber-300/70 text-3xl tracking-[0.4em] font-serif animate-pulse"
                            style={{ textShadow: "0 0 30px rgba(255, 180, 100, 0.6)" }}
                        >
                            {typedSequence}
                        </p>
                    </div>
                )}

                {/* DEMOGORGON WARNING - Controlled by showAttackRed */}
                {showAttackRed && (
                    <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                        <div className="text-center animate-pulse">
                            <p
                                className="text-red-500 text-6xl font-bold tracking-[0.3em] font-serif mb-4"
                                style={{
                                    textShadow: "0 0 40px rgba(255, 0, 0, 0.8), 0 0 80px rgba(255, 0, 0, 0.4)",
                                    animation: "pulse 0.1s infinite"
                                }}
                            >
                                RUN
                            </p>
                            <p
                                className="text-red-400/70 text-xl tracking-wider font-serif"
                                style={{ textShadow: "0 0 20px rgba(255, 0, 0, 0.5)" }}
                            >
                                THE DEMOGORGON IS COMING
                            </p>
                        </div>
                        {/* Red vignette overlay during attack mode */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "radial-gradient(ellipse at center, transparent 20%, rgba(139, 0, 0, 0.4) 100%)",
                                animation: "pulse 0.15s infinite"
                            }}
                        />
                    </div>
                )}

                {/* Type hint */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <p className="text-amber-200/40 text-xs tracking-wider font-serif text-center">
                        Type letters to communicate • Type &quot;RUN&quot; for a surprise
                    </p>
                </div>

                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
                    <Suspense fallback={<Loader />}>
                        <SceneCamera lightsFlickering={lightsFlickering} />
                        <JoyceBayersRoom />

                        {/* Fog for atmosphere */}
                        <fog attach="fog" args={["#1a1510", 3, 12]} />
                    </Suspense>
                </Canvas>
            </div>
        </KeyboardContext.Provider>
    )
}
