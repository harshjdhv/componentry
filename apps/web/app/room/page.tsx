"use client"

import { Suspense, useRef, useState, useEffect, useMemo, createContext, useContext, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
    PerspectiveCamera,
    Html,
    useProgress,
} from "@react-three/drei"
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

const useKeyboard = () => useContext(KeyboardContext)

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
            const touch = e.touches[0]
            if (e.touches.length === 1 && touch) {
                isDragging.current = true
                previousMousePosition.current = {
                    x: touch.clientX,
                    y: touch.clientY,
                }
            }
        }

        const handleTouchEnd = () => {
            isDragging.current = false
        }

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0]
            if (!isDragging.current || e.touches.length !== 1 || !touch) return

            const deltaX = touch.clientX - previousMousePosition.current.x
            const deltaY = touch.clientY - previousMousePosition.current.y

            const rotationSpeed = 0.003

            targetSpherical.current.theta -= deltaX * rotationSpeed
            targetSpherical.current.phi += deltaY * rotationSpeed

            targetSpherical.current.phi = Math.max(
                0.1,
                Math.min(Math.PI - 0.1, targetSpherical.current.phi)
            )

            previousMousePosition.current = {
                x: touch.clientX,
                y: touch.clientY,
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

// Christmas light bulb with diffused glow
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
            Math.sin(time * 2.3 + flickerSeed) * 0.08 +
            Math.sin(time * 4.7 + flickerSeed * 2.1) * 0.04 +
            Math.sin(time * 9.3 + flickerSeed * 3.2) * 0.02

        const flicker = intensity * (0.9 + noise)
        setCurrentIntensity(Math.max(0.2, flicker))
    })

    const bulbColor = useMemo(() => new THREE.Color(color), [color])
    const emissiveIntensity = isLit ? currentIntensity * 3 : 0

    // Create a radial gradient texture for soft glow
    const glowTexture = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext("2d")!

        // Radial gradient for soft, round glow
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)")
        gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.1)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [])

    return (
        <group position={position}>
            {/* Bulb glass - classic Christmas light shape */}
            <mesh>
                <sphereGeometry args={[0.032, 16, 16]} />
                <meshStandardMaterial
                    color={bulbColor}
                    emissive={bulbColor}
                    emissiveIntensity={emissiveIntensity}
                    transparent
                    opacity={isLit ? 0.95 : 0.6}
                    roughness={0.15}
                    metalness={0.05}
                />
            </mesh>

            {/* Bulb socket/cap */}
            <mesh position={[0, 0.038, 0]}>
                <cylinderGeometry args={[0.012, 0.016, 0.025, 8]} />
                <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Point light for illumination */}
            {isLit && (
                <pointLight
                    color={color}
                    intensity={currentIntensity * 0.5}
                    distance={2}
                    decay={2}
                />
            )}

            {/* Inner bright glow - small and intense */}
            {isLit && (
                <sprite scale={[0.1 * currentIntensity, 0.1 * currentIntensity, 1]}>
                    <spriteMaterial
                        map={glowTexture}
                        color={color}
                        transparent
                        opacity={0.9}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            )}

            {/* Middle glow layer - softer spread */}
            {isLit && (
                <sprite scale={[0.2 * currentIntensity, 0.2 * currentIntensity, 1]}>
                    <spriteMaterial
                        map={glowTexture}
                        color={color}
                        transparent
                        opacity={0.5}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            )}

            {/* Outer glow layer - very soft ambient */}
            {isLit && (
                <sprite scale={[0.35 * currentIntensity, 0.35 * currentIntensity, 1]}>
                    <spriteMaterial
                        map={glowTexture}
                        color={color}
                        transparent
                        opacity={0.25}
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

    // Hand-painted color palette - VERY dark, nearly black like original Stranger Things
    // Joyce painted these in the dark with old paint - they should be scary and almost invisible
    const paintColors = [
        "rgb(20, 15, 12)",     // almost black
        "rgb(25, 15, 15)",     // black with hint of red
        "rgb(15, 18, 25)",     // black with hint of blue
        "rgb(22, 18, 14)",     // charcoal black
        "rgb(28, 12, 15)",     // very dark dried blood
        "rgb(18, 15, 22)",     // black with purple tint
        "rgb(30, 18, 12)",     // very dark rust black
        "rgb(15, 22, 22)",     // black with teal hint
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

    // Define stable random offsets using seeded approach (deterministic based on index)
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898) * 43758.5453
        return x - Math.floor(x)
    }

    // Letter positions organized by rows
    const letterData = useMemo(() => {
        const row1: { letter: string; pos: [number, number, number]; color: string }[] = []
        const row2: { letter: string; pos: [number, number, number]; color: string }[] = []
        const row3: { letter: string; pos: [number, number, number]; color: string }[] = []

        // Row 1: A-I (9 letters)
        for (let i = 0; i <= 8; i++) {
            const x = -3.2 + i * 0.72
            const y = 1.1 + (seededRandom(i * 3.7) - 0.5) * 0.06
            row1.push({
                letter: alphabet[i] ?? '',
                pos: [x, y, -5.94],
                color: paintColors[i % paintColors.length] ?? 'rgb(20, 15, 12)',
            })
        }

        // Row 2: J-Q (8 letters)
        for (let i = 0; i <= 7; i++) {
            const letterIndex = 9 + i
            const x = -2.9 + i * 0.72
            const y = 0.45 + (seededRandom(letterIndex * 4.3) - 0.5) * 0.06
            row2.push({
                letter: alphabet[letterIndex] ?? '',
                pos: [x, y, -5.94],
                color: paintColors[letterIndex % paintColors.length] ?? 'rgb(20, 15, 12)',
            })
        }

        // Row 3: R-Z (9 letters)
        for (let i = 0; i <= 8; i++) {
            const letterIndex = 17 + i
            const x = -3.2 + i * 0.72
            const y = -0.2 + (seededRandom(letterIndex * 5.1) - 0.5) * 0.06
            row3.push({
                letter: alphabet[letterIndex] ?? '',
                pos: [x, y, -5.94],
                color: paintColors[letterIndex % paintColors.length] ?? 'rgb(20, 15, 12)',
            })
        }

        return { row1, row2, row3 }
    }, [])

    // Generate light bulbs per row
    const lightBulbsData = useMemo(() => {
        const createRowBulbs = (
            row: typeof letterData.row1,
            rowIndex: number
        ) => {
            return row.map((letter, i) => ({
                position: [
                    letter.pos[0],
                    letter.pos[1] + 0.22,
                    letter.pos[2] + 0.03
                ] as [number, number, number],
                color: lightColors[(rowIndex * 3 + i) % lightColors.length] ?? '#FFB347',
                intensity: 0.7 + seededRandom(rowIndex * 10 + i) * 0.3,
                flickerSeed: rowIndex * 100 + i * 7.3,
            }))
        }

        return {
            row1Bulbs: createRowBulbs(letterData.row1, 0),
            row2Bulbs: createRowBulbs(letterData.row2, 1),
            row3Bulbs: createRowBulbs(letterData.row3, 2),
        }
    }, [letterData])

    // Generate a single serpentine wire path flowing through all rows
    // Pattern: Left→Right (A-I), drop down, Right→Left (Q-J), drop down, Left→Right (R-Z)
    const wirePaths = useMemo(() => {
        const wire: THREE.Vector3[] = []

        const row1 = lightBulbsData.row1Bulbs // A-I, left to right
        const row2 = [...lightBulbsData.row2Bulbs].reverse() // Q-J, right to left (reversed)
        const row3 = lightBulbsData.row3Bulbs // R-Z, left to right

        // Helper to add messy sag points between bulbs
        const addBulbConnection = (
            prevPos: [number, number, number],
            currPos: [number, number, number],
            index: number
        ) => {
            // Messy sag - varies quite a bit
            const sagAmount = 0.03 + seededRandom(index * 3.14) * 0.06
            const midX = (prevPos[0] + currPos[0]) / 2 + (seededRandom(index * 7.7) - 0.5) * 0.08
            const midY = Math.min(prevPos[1], currPos[1]) - sagAmount

            // Add sag point
            wire.push(new THREE.Vector3(midX, midY, -5.92 + (seededRandom(index) - 0.5) * 0.02))

            // Add bulb position
            wire.push(new THREE.Vector3(
                currPos[0] + (seededRandom(index * 2.3) - 0.5) * 0.02,
                currPos[1] + 0.035,
                -5.92
            ))
        }

        // === START: Wire comes in from the left wall ===
        wire.push(new THREE.Vector3(-5.8, 1.6, -5.92)) // enters from left, high
        wire.push(new THREE.Vector3(-5.2, 1.45 + seededRandom(0.1) * 0.1, -5.92)) // droop down
        wire.push(new THREE.Vector3(-4.5, 1.38, -5.92)) // slight sag

        // === ROW 1: A to I (left to right) ===
        if (row1.length > 0 && row1[0]) {
            // Connect to first bulb (A)
            wire.push(new THREE.Vector3(
                row1[0].position[0],
                row1[0].position[1] + 0.035,
                -5.92
            ))

            // Go through A-I
            for (let i = 1; i < row1.length; i++) {
                const prev = row1[i - 1]
                const curr = row1[i]
                if (prev && curr) {
                    addBulbConnection(prev.position, curr.position, i)
                }
            }
        }

        // === TRANSITION: Drop from I (row1 end) to Q (row2 start, which is rightmost) ===
        const row1Last = row1[row1.length - 1]
        const row2First = row2[0] // This is Q (rightmost of second row)

        if (row1Last && row2First) {
            // Messy drop down - wire sags and curves
            const dropMidX = (row1Last.position[0] + row2First.position[0]) / 2 + (seededRandom(100) - 0.5) * 0.15
            const dropMidY = (row1Last.position[1] + row2First.position[1]) / 2 + 0.05

            wire.push(new THREE.Vector3(
                row1Last.position[0] + 0.1,
                row1Last.position[1] - 0.05,
                -5.91
            ))
            wire.push(new THREE.Vector3(
                dropMidX + 0.15,
                dropMidY + (seededRandom(101) - 0.5) * 0.1,
                -5.90
            ))
            wire.push(new THREE.Vector3(
                row2First.position[0] + 0.05,
                row2First.position[1] + 0.1,
                -5.91
            ))
            wire.push(new THREE.Vector3(
                row2First.position[0],
                row2First.position[1] + 0.035,
                -5.92
            ))
        }

        // === ROW 2: Q to J (right to left) ===
        for (let i = 1; i < row2.length; i++) {
            const prev = row2[i - 1]
            const curr = row2[i]
            if (prev && curr) {
                addBulbConnection(prev.position, curr.position, 20 + i)
            }
        }

        // === TRANSITION: Drop from J (row2 end, leftmost) to R (row3 start, leftmost) ===
        const row2Last = row2[row2.length - 1] // This is J (leftmost of second row)
        const row3First = row3[0] // This is R (leftmost of third row)

        if (row2Last && row3First) {
            // Messy drop down to third row
            const drop2MidY = (row2Last.position[1] + row3First.position[1]) / 2 + 0.08

            wire.push(new THREE.Vector3(
                row2Last.position[0] - 0.08,
                row2Last.position[1] - 0.06,
                -5.91
            ))
            wire.push(new THREE.Vector3(
                row2Last.position[0] - 0.2 + (seededRandom(200) - 0.5) * 0.1,
                drop2MidY + (seededRandom(201) - 0.5) * 0.12,
                -5.90
            ))
            wire.push(new THREE.Vector3(
                row3First.position[0] - 0.1,
                row3First.position[1] + 0.12,
                -5.91
            ))
            wire.push(new THREE.Vector3(
                row3First.position[0],
                row3First.position[1] + 0.035,
                -5.92
            ))
        }

        // === ROW 3: R to Z (left to right) ===
        for (let i = 1; i < row3.length; i++) {
            const prev = row3[i - 1]
            const curr = row3[i]
            if (prev && curr) {
                addBulbConnection(prev.position, curr.position, 40 + i)
            }
        }

        // === END: Wire exits or dangles after Z ===
        const row3Last = row3[row3.length - 1]
        if (row3Last) {
            // Wire droops and dangles off after Z
            wire.push(new THREE.Vector3(
                row3Last.position[0] + 0.15,
                row3Last.position[1] - 0.08,
                -5.91
            ))
            wire.push(new THREE.Vector3(
                row3Last.position[0] + 0.35,
                row3Last.position[1] - 0.2,
                -5.90
            ))
            wire.push(new THREE.Vector3(
                row3Last.position[0] + 0.5,
                row3Last.position[1] - 0.35,
                -5.89
            ))
        }

        return [wire]
    }, [lightBulbsData])

    // Combine all bulbs for rendering
    const allBulbs = useMemo(() => [
        ...lightBulbsData.row1Bulbs,
        ...lightBulbsData.row2Bulbs,
        ...lightBulbsData.row3Bulbs,
    ], [lightBulbsData])

    const allLetters = useMemo(() => [
        ...letterData.row1,
        ...letterData.row2,
        ...letterData.row3,
    ], [letterData])

    // Get keyboard context
    const { activeLetter, demogorgonMode } = useKeyboard()

    // Map letters to bulb indices
    const letterToBulbIndex = useMemo(() => {
        const map: Record<string, number> = {}
        allLetters.forEach((data, idx) => {
            map[data.letter] = idx
        })
        return map
    }, [allLetters])

    // Demogorgon mode flickering state
    const [demogorgonFlicker, setDemogorgonFlicker] = useState<boolean[]>(
        () => allBulbs.map(() => false)
    )

    // Demogorgon chaotic flickering effect
    useEffect(() => {
        if (!demogorgonMode) {
            setDemogorgonFlicker(allBulbs.map(() => false))
            return
        }

        // Chaotic, rapid flickering when Demogorgon is coming!
        const interval = setInterval(() => {
            setDemogorgonFlicker(
                allBulbs.map(() => Math.random() > 0.3) // 70% chance each bulb is lit
            )
        }, 50) // Very fast flickering

        return () => clearInterval(interval)
    }, [demogorgonMode, allBulbs])

    // Calculate which bulbs should be lit
    const litBulbs = useMemo(() => {
        if (demogorgonMode) {
            return demogorgonFlicker
        }

        // Normal mode - only the typed letter lights up
        return allBulbs.map((_, idx) => {
            if (activeLetter) {
                const letterIdx = letterToBulbIndex[activeLetter.toUpperCase()]
                return letterIdx === idx
            }
            return false // All off by default
        })
    }, [activeLetter, demogorgonMode, demogorgonFlicker, allBulbs, letterToBulbIndex])

    return (
        <group>
            {/* Letters */}
            {allLetters.map((data) => (
                <AlphabetLetter
                    key={data.letter}
                    letter={data.letter}
                    position={data.pos}
                    color={data.color}
                />
            ))}

            {/* Wires - 3 separate rows */}
            {wirePaths.map((points, i) => (
                <LightWire key={`wire-${i}`} points={points} />
            ))}

            {/* Light bulbs */}
            {allBulbs.map((bulb, i) => (
                <ChristmasLightBulb
                    key={`bulb-${i}`}
                    position={bulb.position}
                    color={bulb.color}
                    intensity={demogorgonMode ? 1.5 : bulb.intensity}
                    isLit={litBulbs[i] ?? false}
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
            <WornWall position={[0, 0.25, -6]} rotation={[0, 0, 0]} isAlphabetWall />
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
    const [demogorgonMode, setDemogorgonMode] = useState(false)
    const [showTyped, setShowTyped] = useState(false)

    // Handle keyboard events
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.key.toUpperCase()

        // Only respond to alphabet keys
        if (/^[A-Z]$/.test(key)) {
            setActiveLetter(key)
            setShowTyped(true)

            // Add to typed sequence (keep last 10 chars)
            setTypedSequence(prev => {
                const newSeq = (prev + key).slice(-10)

                // Check for "RUN" sequence
                if (newSeq.includes("RUN")) {
                    setDemogorgonMode(true)
                    // Demogorgon mode lasts 5 seconds
                    setTimeout(() => {
                        setDemogorgonMode(false)
                        setTypedSequence("")
                    }, 5000)
                }

                return newSeq
            })
        }
    }, [])

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

    // Scary sound effect for Demogorgon mode
    const audioContextRef = useRef<AudioContext | null>(null)

    useEffect(() => {
        if (demogorgonMode) {
            // Create scary sound using Web Audio API
            try {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
                }
                const ctx = audioContextRef.current

                // Create oscillators for scary rumbling sound
                const oscillator1 = ctx.createOscillator()
                const oscillator2 = ctx.createOscillator()
                const oscillator3 = ctx.createOscillator()
                const gainNode = ctx.createGain()

                // Low ominous rumble
                oscillator1.type = 'sine'
                oscillator1.frequency.value = 40 // Very low rumble

                // Unsettling mid-frequency
                oscillator2.type = 'sawtooth'
                oscillator2.frequency.value = 80

                // High eerie tone
                oscillator3.type = 'sine'
                oscillator3.frequency.value = 220

                // Connect and set gain
                oscillator1.connect(gainNode)
                oscillator2.connect(gainNode)
                oscillator3.connect(gainNode)
                gainNode.connect(ctx.destination)

                // Scary crescendo effect
                gainNode.gain.setValueAtTime(0, ctx.currentTime)
                gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.5)
                gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2)
                gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 3)
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 5)

                // Add frequency modulation for eeriness
                oscillator1.frequency.linearRampToValueAtTime(30, ctx.currentTime + 2)
                oscillator1.frequency.linearRampToValueAtTime(50, ctx.currentTime + 4)
                oscillator2.frequency.linearRampToValueAtTime(60, ctx.currentTime + 1)
                oscillator2.frequency.linearRampToValueAtTime(100, ctx.currentTime + 3)
                oscillator3.frequency.linearRampToValueAtTime(180, ctx.currentTime + 2)
                oscillator3.frequency.linearRampToValueAtTime(260, ctx.currentTime + 4)

                // Start and stop
                oscillator1.start(ctx.currentTime)
                oscillator2.start(ctx.currentTime)
                oscillator3.start(ctx.currentTime)
                oscillator1.stop(ctx.currentTime + 5)
                oscillator2.stop(ctx.currentTime + 5)
                oscillator3.stop(ctx.currentTime + 5)
            } catch (e) {
                console.log('Audio not available:', e)
            }
        }
    }, [demogorgonMode])

    const keyboardValue = useMemo(() => ({
        activeLetter,
        demogorgonMode,
        typedSequence,
    }), [activeLetter, demogorgonMode, typedSequence])

    return (
        <KeyboardContext.Provider value={keyboardValue}>
            <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden" tabIndex={0}>
                <FilmGrain />
                <Vignette />
                <UIOverlay />

                {/* Typed message display - positioned lower on screen */}
                {showTyped && typedSequence && !demogorgonMode && (
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                        <p
                            className="text-amber-300/70 text-3xl tracking-[0.4em] font-serif animate-pulse"
                            style={{ textShadow: "0 0 30px rgba(255, 180, 100, 0.6)" }}
                        >
                            {typedSequence}
                        </p>
                    </div>
                )}

                {/* DEMOGORGON WARNING */}
                {demogorgonMode && (
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
                        {/* Red vignette overlay during demogorgon mode */}
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
        </KeyboardContext.Provider>
    )
}
