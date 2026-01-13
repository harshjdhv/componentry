"use client"

import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
    PerspectiveCamera,
    Html,
    useProgress,
} from "@react-three/drei"
import * as THREE from "three"

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

// Camera controller for mouse-based look around
function CameraController() {
    const { camera, gl } = useThree()
    const isDragging = useRef(false)
    const previousMousePosition = useRef({ x: 0, y: 0 })
    const spherical = useRef(new THREE.Spherical(1, Math.PI / 2, 0))
    const targetSpherical = useRef(new THREE.Spherical(1, Math.PI / 2, 0))

    useEffect(() => {
        const domElement = gl.domElement

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true
            previousMousePosition.current = { x: e.clientX, y: e.clientY }
            domElement.style.cursor = "grabbing"
        }

        const handleMouseUp = () => {
            isDragging.current = false
            domElement.style.cursor = "grab"
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return

            const deltaX = e.clientX - previousMousePosition.current.x
            const deltaY = e.clientY - previousMousePosition.current.y

            const rotationSpeed = 0.003

            targetSpherical.current.theta -= deltaX * rotationSpeed
            targetSpherical.current.phi += deltaY * rotationSpeed

            targetSpherical.current.phi = Math.max(
                0.1,
                Math.min(Math.PI - 0.1, targetSpherical.current.phi)
            )

            previousMousePosition.current = { x: e.clientX, y: e.clientY }
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                isDragging.current = true
                previousMousePosition.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                }
            }
        }

        const handleTouchEnd = () => {
            isDragging.current = false
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging.current || e.touches.length !== 1) return

            const deltaX = e.touches[0].clientX - previousMousePosition.current.x
            const deltaY = e.touches[0].clientY - previousMousePosition.current.y

            const rotationSpeed = 0.003

            targetSpherical.current.theta -= deltaX * rotationSpeed
            targetSpherical.current.phi += deltaY * rotationSpeed

            targetSpherical.current.phi = Math.max(
                0.1,
                Math.min(Math.PI - 0.1, targetSpherical.current.phi)
            )

            previousMousePosition.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            }
        }

        domElement.style.cursor = "grab"
        domElement.addEventListener("mousedown", handleMouseDown)
        domElement.addEventListener("mouseup", handleMouseUp)
        domElement.addEventListener("mouseleave", handleMouseUp)
        domElement.addEventListener("mousemove", handleMouseMove)
        domElement.addEventListener("touchstart", handleTouchStart)
        domElement.addEventListener("touchend", handleTouchEnd)
        domElement.addEventListener("touchmove", handleTouchMove)

        return () => {
            domElement.removeEventListener("mousedown", handleMouseDown)
            domElement.removeEventListener("mouseup", handleMouseUp)
            domElement.removeEventListener("mouseleave", handleMouseUp)
            domElement.removeEventListener("mousemove", handleMouseMove)
            domElement.removeEventListener("touchstart", handleTouchStart)
            domElement.removeEventListener("touchend", handleTouchEnd)
            domElement.removeEventListener("touchmove", handleTouchMove)
        }
    }, [gl])

    useFrame(() => {
        spherical.current.theta +=
            (targetSpherical.current.theta - spherical.current.theta) * 0.08
        spherical.current.phi +=
            (targetSpherical.current.phi - spherical.current.phi) * 0.08

        const lookAt = new THREE.Vector3()
        lookAt.setFromSpherical(spherical.current)

        camera.position.set(0, 0, 0)
        camera.lookAt(lookAt)
    })

    return null
}

// Worn wall with imperfections
function WornWall({
    position,
    rotation,
    isAlphabetWall = false,
}: {
    position: [number, number, number]
    rotation: [number, number, number]
    isAlphabetWall?: boolean
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

// Christmas light bulb with glow
function ChristmasLightBulb({
    position,
    color,
    intensity,
    isLit,
    flickerSeed,
}: {
    position: [number, number, number]
    color: string
    intensity: number
    isLit: boolean
    flickerSeed: number
}) {
    const lightRef = useRef<THREE.PointLight>(null)
    const bulbRef = useRef<THREE.Mesh>(null)
    const [currentIntensity, setCurrentIntensity] = useState(intensity)

    // Flicker effect
    useFrame(({ clock }) => {
        if (!isLit) {
            setCurrentIntensity(0)
            return
        }

        // Perlin-like noise for natural flicker
        const time = clock.getElapsedTime()
        const noise =
            Math.sin(time * 2 + flickerSeed) * 0.1 +
            Math.sin(time * 5 + flickerSeed * 2) * 0.05 +
            Math.sin(time * 11 + flickerSeed * 3) * 0.03

        const flicker = intensity * (0.85 + noise + Math.random() * 0.05)
        setCurrentIntensity(Math.max(0.1, flicker))
    })

    const bulbColor = useMemo(() => new THREE.Color(color), [color])
    const emissiveIntensity = isLit ? currentIntensity * 2 : 0

    return (
        <group position={position}>
            {/* Bulb glass */}
            <mesh ref={bulbRef} castShadow>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshStandardMaterial
                    color={bulbColor}
                    emissive={bulbColor}
                    emissiveIntensity={emissiveIntensity}
                    transparent
                    opacity={0.9}
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>

            {/* Bulb socket */}
            <mesh position={[0, 0.04, 0]} castShadow>
                <cylinderGeometry args={[0.015, 0.02, 0.03, 8]} />
                <meshStandardMaterial color="#2A2A2A" roughness={0.8} metalness={0.3} />
            </mesh>

            {/* Point light */}
            {isLit && (
                <pointLight
                    ref={lightRef}
                    color={color}
                    intensity={currentIntensity * 0.3}
                    distance={1.5}
                    decay={2}
                    castShadow={false}
                />
            )}

            {/* Glow sprite */}
            {isLit && (
                <sprite scale={[0.15 + currentIntensity * 0.1, 0.15 + currentIntensity * 0.1, 1]}>
                    <spriteMaterial
                        color={color}
                        transparent
                        opacity={0.3 + currentIntensity * 0.2}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            )}
        </group>
    )
}

// Christmas light wire
function LightWire({
    points,
}: {
    points: THREE.Vector3[]
}) {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(points)
    }, [points])

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.008, 8, false]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.9} metalness={0.1} />
        </mesh>
    )
}

// Complete alphabet wall with lights
function AlphabetWall() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    // Hand-painted color palette (reds, blues, greens, yellows - vintage paint)
    const paintColors = [
        "rgb(180, 50, 50)",    // faded red
        "rgb(50, 80, 140)",    // dusty blue
        "rgb(60, 110, 60)",    // muted green
        "rgb(170, 140, 50)",   // ochre yellow
        "rgb(140, 60, 90)",    // mauve
        "rgb(80, 60, 120)",    // dusty purple
        "rgb(160, 90, 50)",    // rust orange
        "rgb(50, 100, 100)",   // teal
    ]

    // Christmas light colors (warm tungsten variations)
    const lightColors = [
        "#FFB347", // warm orange
        "#FFCC66", // yellow
        "#FF6B6B", // soft red
        "#77DD77", // soft green
        "#89CFF0", // soft blue
        "#FFD700", // gold
        "#FF9966", // peach
        "#FFAA00", // amber
    ]

    // Letter positions - uneven, hand-painted style
    const letterPositions = useMemo(() => {
        const positions: { letter: string; pos: [number, number, number]; color: string }[] = []

        // First row: A-I
        for (let i = 0; i <= 8; i++) {
            const x = -3.5 + i * 0.8 + (Math.random() - 0.5) * 0.1
            const y = 1.2 + (Math.random() - 0.5) * 0.08
            positions.push({
                letter: alphabet[i],
                pos: [x, y, -5.95],
                color: paintColors[i % paintColors.length],
            })
        }

        // Second row: J-Q
        for (let i = 9; i <= 16; i++) {
            const x = -3.2 + (i - 9) * 0.8 + (Math.random() - 0.5) * 0.1
            const y = 0.5 + (Math.random() - 0.5) * 0.08
            positions.push({
                letter: alphabet[i],
                pos: [x, y, -5.95],
                color: paintColors[i % paintColors.length],
            })
        }

        // Third row: R-Z
        for (let i = 17; i <= 25; i++) {
            const x = -3.5 + (i - 17) * 0.8 + (Math.random() - 0.5) * 0.1
            const y = -0.2 + (Math.random() - 0.5) * 0.08
            positions.push({
                letter: alphabet[i],
                pos: [x, y, -5.95],
                color: paintColors[i % paintColors.length],
            })
        }

        return positions
    }, [])

    // Light positions above letters with sagging wire effect
    const lightBulbs = useMemo(() => {
        const bulbs: {
            position: [number, number, number]
            color: string
            intensity: number
            flickerSeed: number
        }[] = []

        letterPositions.forEach((letterData, index) => {
            const [x, y, z] = letterData.pos
            // Position light above letter with slight sag
            const sagAmount = Math.sin(index * 0.5) * 0.08
            bulbs.push({
                position: [x + (Math.random() - 0.5) * 0.1, y + 0.25 + sagAmount, z + 0.05],
                color: lightColors[index % lightColors.length],
                intensity: 0.6 + Math.random() * 0.4,
                flickerSeed: index * 7.3,
            })
        })

        return bulbs
    }, [letterPositions])

    // Generate wire paths
    const wirePaths = useMemo(() => {
        const paths: THREE.Vector3[][] = []

        // Main wire connecting all lights with sag
        const mainWire: THREE.Vector3[] = []

        // Start from left wall
        mainWire.push(new THREE.Vector3(-5.5, 2, -5.9))

        lightBulbs.forEach((bulb, i) => {
            // Add slight randomness and sag between bulbs
            if (i > 0) {
                const prevBulb = lightBulbs[i - 1]
                const midX = (prevBulb.position[0] + bulb.position[0]) / 2
                const midY = Math.min(prevBulb.position[1], bulb.position[1]) - 0.05 - Math.random() * 0.08
                mainWire.push(new THREE.Vector3(midX, midY, -5.9))
            }
            mainWire.push(new THREE.Vector3(bulb.position[0], bulb.position[1] + 0.04, bulb.position[2]))
        })

        // End at right wall
        mainWire.push(new THREE.Vector3(5, 1.5, -5.9))

        paths.push(mainWire)

        // Add some tangled extra wires
        for (let i = 0; i < 3; i++) {
            const tangledWire: THREE.Vector3[] = []
            const startIndex = Math.floor(Math.random() * (lightBulbs.length - 3))
            for (let j = 0; j < 4; j++) {
                const bulb = lightBulbs[startIndex + j]
                if (bulb) {
                    tangledWire.push(
                        new THREE.Vector3(
                            bulb.position[0] + (Math.random() - 0.5) * 0.3,
                            bulb.position[1] + 0.04 + (Math.random() - 0.5) * 0.15,
                            bulb.position[2] + 0.02
                        )
                    )
                }
            }
            if (tangledWire.length >= 2) {
                paths.push(tangledWire)
            }
        }

        return paths
    }, [lightBulbs])

    // Lit state for each bulb (some random flickering off)
    const [litBulbs, setLitBulbs] = useState<boolean[]>(
        () => lightBulbs.map(() => Math.random() > 0.1)
    )

    // Random flicker effect - some bulbs occasionally go out
    useEffect(() => {
        const interval = setInterval(() => {
            setLitBulbs((prev) =>
                prev.map((isLit, i) => {
                    if (Math.random() < 0.02) return !isLit // 2% chance to toggle
                    return isLit
                })
            )
        }, 200)
        return () => clearInterval(interval)
    }, [])

    return (
        <group>
            {/* Letters */}
            {letterPositions.map((data, i) => (
                <AlphabetLetter
                    key={data.letter}
                    letter={data.letter}
                    position={data.pos}
                    color={data.color}
                />
            ))}

            {/* Wires */}
            {wirePaths.map((points, i) => (
                <LightWire key={i} points={points} />
            ))}

            {/* Light bulbs */}
            {lightBulbs.map((bulb, i) => (
                <ChristmasLightBulb
                    key={i}
                    position={bulb.position}
                    color={bulb.color}
                    intensity={bulb.intensity}
                    isLit={litBulbs[i]}
                    flickerSeed={bulb.flickerSeed}
                />
            ))}
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
            <mesh position={[0.35, -0.15, 0.36]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
            </mesh>
            <mesh position={[0.35, -0.25, 0.36]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} rotation={[Math.PI / 2, 0, 0]} />
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

// Floor lamp (vintage)
function VintageFloorLamp() {
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
            {/* Shade */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.25, 0.3, 12, 1, true]} />
                <meshStandardMaterial
                    color="#E8DCC8"
                    roughness={0.95}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Warm light */}
            <pointLight
                position={[0, 1.4, 0]}
                intensity={0.4}
                color="#FFD4A3"
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
            <mesh position={[-0.08, 1.05, 0]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, 1.6]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#B8860B" roughness={0.4} metalness={0.5} />
            </mesh>
        </group>
    )
}

// Main Scene
function JoyceBayersRoom() {
    return (
        <group>
            {/* Walls */}
            <WornWall position={[0, 0.25, -6]} rotation={[0, 0, 0]} isAlphabetWall />
            <WornWall position={[0, 0.25, 6]} rotation={[0, Math.PI, 0]} />
            <WornWall position={[-6, 0.25, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WornWall position={[6, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]} />

            <WornFloor />
            <StainedCeiling />
            <WornRug />

            {/* The iconic alphabet wall with lights */}
            <AlphabetWall />

            {/* Furniture */}
            <VintageCouch />
            <CRTTelevision />
            <ClutteredCoffeeTable />
            <VintageBookshelf />
            <VintageFloorLamp />
            <WindowWithCurtains />
            <WallPhone />

            {/* Minimal ambient - very dim room */}
            <ambientLight intensity={0.08} color="#E8DCC8" />

            {/* Subtle fill light from the side */}
            <pointLight
                position={[4, 1, 0]}
                intensity={0.15}
                color="#FFD4A3"
                distance={8}
                decay={2}
            />
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
    return (
        <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
            <FilmGrain />
            <Vignette />
            <UIOverlay />
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
                <Suspense fallback={<Loader />}>
                    <PerspectiveCamera
                        makeDefault
                        position={[0, 0, 0]}
                        fov={70}
                        near={0.1}
                        far={100}
                    />
                    <CameraController />

                    {/* The room */}
                    <JoyceBayersRoom />

                    {/* Fog for atmosphere */}
                    <fog attach="fog" args={["#1a1510", 3, 12]} />
                </Suspense>
            </Canvas>
        </div>
    )
}
