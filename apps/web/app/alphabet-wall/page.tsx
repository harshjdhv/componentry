"use client"

import { Suspense, useRef, useState, useEffect, useMemo, createContext, useContext, useCallback } from "react"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, useProgress, Html } from '@react-three/drei'
import * as THREE from "three"

// Keyboard context for letter activation
interface KeyboardContextType {
    activeLetter: string | null
    demogorgonMode: boolean
    upsideDownMode: boolean
    typedSequence: string
    breachMode: boolean // Reality is fracturing
    impactMoment: boolean // Violent physical impact
    transitionPhase: 'none' | 'flip' | 'reveal' // transition states: flip=eyes closing, reveal=eyes opening
}

const KeyboardContext = createContext<KeyboardContextType>({
    activeLetter: null,
    demogorgonMode: false,
    upsideDownMode: false,
    typedSequence: "",
    breachMode: false,
    impactMoment: false,
    transitionPhase: 'none',
})

export const useKeyboard = () => useContext(KeyboardContext)

// Development flag to skip intro
const SKIP_INTRO = false



// Floating Particles Effect
function FloatingParticles() {
    const particles = useMemo(() =>
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        })),
        [])

    useEffect(() => {
        const styleId = 'floating-particles-keyframes'
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
                    25% { transform: translateY(-30px) translateX(10px) scale(1.2); opacity: 0.5; }
                    50% { transform: translateY(-60px) translateX(-5px) scale(0.8); opacity: 0.3; }
                    75% { transform: translateY(-30px) translateX(-15px) scale(1.1); opacity: 0.4; }
                }
            `
            document.head.appendChild(style)
        }
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-red-500/20"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    )
}

function CinematicIntro({ onComplete, onStart }: { onComplete: () => void, onStart: () => void }) {
    const [step, setStep] = useState<'start' | 'intro'>('start')
    const [textOpacity, setTextOpacity] = useState(0)
    const [subTextOpacity, setSubTextOpacity] = useState(0)

    // Logic adapted to prevent flash: We keep background black until component unmounts
    // const [finalFade, setFinalFade] = useState(false) 

    const handleStart = () => {
        onStart() // Trigger audio
        setStep('intro')
        // Request fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.log("Fullscreen request denied:", err)
            })
        }

        // Animation Timeline
        // 0s: Start
        // 1s: Hawkins fade in
        setTimeout(() => setTextOpacity(1), 1000)
        // 2.5s: Subtext fade in
        setTimeout(() => setSubTextOpacity(1), 2500)
        // 5s: Fade out everything (Text Only)
        setTimeout(() => {
            setTextOpacity(0)
            setSubTextOpacity(0)
            // setFinalFade(true) // DISABLED to prevent flash of room before eyes open
        }, 5500)
        // 7s: Complete
        setTimeout(() => {
            onComplete()
        }, 7000)
    }

    // Noise/Grain Overlay Component
    const GrainOverlay = () => (
        <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.15] mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
        />
    )

    if (step === 'start') {
        return (
            <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden select-none">
                <GrainOverlay />

                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div
                    className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center animate-in fade-in duration-1000"
                >
                    <div className="mb-8 tracking-[0.4em] text-red-500/50 font-serif text-xs md:text-sm uppercase animate-pulse flex flex-col items-center gap-2">
                        A Componentry Original
                    </div>

                    {/* HERO TITLE */}
                    <div className="relative mb-20 py-8 group cursor-default">
                        {/* Shadow/Glow Layer */}
                        <h1
                            className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-red-700/20 absolute inset-0 blur-xl scale-110 z-0 select-none"
                            style={{ fontFamily: 'serif' }}
                        >
                            STRANGER THINGS
                        </h1>

                        <div className="relative z-10 flex flex-col items-center">
                            <h1
                                className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent relative z-10 scale-y-110"
                                style={{
                                    fontFamily: 'serif',
                                    WebkitTextStroke: '2px #c21e1e',
                                    textShadow: '0 0 20px rgba(194, 30, 30, 0.4)'
                                }}
                            >
                                STRANGER
                            </h1>
                            <h1
                                className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent relative z-10 -mt-2 md:-mt-6 scale-y-110"
                                style={{
                                    fontFamily: 'serif',
                                    WebkitTextStroke: '2px #c21e1e',
                                    textShadow: '0 0 20px rgba(194, 30, 30, 0.4)'
                                }}
                            >
                                THINGS
                            </h1>
                        </div>

                        {/* Glow bloom behind text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-red-600/10 blur-[80px] pointer-events-none rounded-full" />
                    </div>

                    {/* Metadata / Instructions */}
                    <div className="flex flex-col items-center justify-center gap-4 mb-16 text-zinc-500">
                        <span className="text-xs tracking-[0.3em] uppercase text-zinc-500 hover:text-red-500/80 transition-colors">
                            Immersive Audio
                        </span>
                    </div>

                    {/* Play Button */}
                    <button
                        onClick={handleStart}
                        className="group relative flex items-center gap-4 px-12 py-4 bg-zinc-100 hover:bg-red-600 transition-all duration-500 rounded-sm overflow-hidden"
                    >
                        <div className="relative z-10 flex items-center gap-4 text-black group-hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="font-bold tracking-[0.2em] text-sm uppercase">Play Experience</span>
                        </div>
                        {/* Button Glow on Hover */}
                        <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                    </button>

                    <div className="mt-8 text-[10px] text-zinc-700 font-mono tracking-widest uppercase opacity-60">
                        Recommended: Full Screen & Headphones
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`absolute inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 opacity-100`}>
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Red Pulse from Center - 'The Rift' */}
                <div
                    className="absolute inset-0 opacity-20 animate-pulse"
                    style={{
                        background: 'radial-gradient(circle at center, #8B0000 0%, #000000 70%)',
                        animationDuration: '4s'
                    }}
                />

                {/* Subtle Scanlines */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                        backgroundSize: '100% 2px, 3px 100%'
                    }}
                />
            </div>

            <div className="text-center relative z-10">
                <h1
                    className="text-amber-500/90 text-4xl md:text-6xl font-bold font-serif tracking-widest uppercase mb-4 transition-all duration-[4000ms] ease-out"
                    style={{
                        opacity: textOpacity,
                        textShadow: "0 0 20px rgba(180, 50, 20, 0.5), 0 0 40px rgba(180, 50, 20, 0.2)",
                        transform: textOpacity ? 'scale(1.1)' : 'scale(0.9)',
                        letterSpacing: textOpacity ? '0.2em' : '0.1em'
                    }}
                >
                    Hawkins, Indiana
                </h1>
                <p
                    className="text-white/60 text-lg md:text-xl font-serif tracking-[0.5em] uppercase transition-all duration-[2000ms]"
                    style={{ opacity: subTextOpacity }}
                >
                    November 6th, 1983
                </p>
            </div>

            {/* Loading Spinner / Recorder Light */}
            <div className="absolute bottom-12 right-12 transition-opacity duration-500 flex items-center gap-3" style={{ opacity: subTextOpacity }}>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#ff0000]" />
                <span className="text-red-500/50 text-xs tracking-widest font-mono">REC</span>
            </div>
        </div>
    )
}


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
    const spherical = useRef(new THREE.Spherical(1, Math.PI / 2, Math.PI))
    const targetSpherical = useRef(new THREE.Spherical(1, Math.PI / 2, Math.PI))

    // Get context for camera effects
    const { demogorgonMode, impactMoment, upsideDownMode, transitionPhase } = useKeyboard()

    // Track when we entered Upside Down for animation timing
    const upsideDownStartRef = useRef(0)
    // Track when we entered Demogorgon Mode for delay
    const demoStartRef = useRef(0)

    // Reset view and start timer when entering Upside Down
    useEffect(() => {
        if (upsideDownMode) {
            // Reset timer
            upsideDownStartRef.current = 0; // Will be set in useFrame

            // Look slightly up and to the side (disoriented)
            spherical.current.set(1, Math.PI / 2.22, 0.5)
            targetSpherical.current.set(1, Math.PI / 2.22, 0.5)

            // Force reset position to floor immediately
            camera.position.set(0, -1.2, 0)
        }
    }, [upsideDownMode, camera])

    // Restore dragging functionality
    useEffect(() => {
        const handleDown = (e: MouseEvent | TouchEvent) => {
            if (transitionPhase !== 'none') return // Disable control only during transition events
            isDragging.current = true
            const clientX = 'touches' in e ? (e as unknown as TouchEvent).touches[0]!.clientX : (e as MouseEvent).clientX
            const clientY = 'touches' in e ? (e as unknown as TouchEvent).touches[0]!.clientY : (e as MouseEvent).clientY
            previousMousePosition.current = { x: clientX, y: clientY }
        }

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging.current) return

            const clientX = 'touches' in e ? (e as unknown as TouchEvent).touches[0]!.clientX : (e as MouseEvent).clientX
            const clientY = 'touches' in e ? (e as unknown as TouchEvent).touches[0]!.clientY : (e as MouseEvent).clientY

            const deltaMove = {
                x: clientX - previousMousePosition.current.x,
                y: clientY - previousMousePosition.current.y,
            }

            previousMousePosition.current = { x: clientX, y: clientY }

            // Update target rotation
            targetSpherical.current.theta -= deltaMove.x * 0.002
            targetSpherical.current.phi += deltaMove.y * 0.002

            // Clamp vertical rotation (phi)
            targetSpherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.current.phi))
        }

        const handleUp = () => {
            isDragging.current = false
        }

        const canvas = gl.domElement
        canvas.addEventListener('mousedown', handleDown)
        canvas.addEventListener('touchstart', handleDown)
        window.addEventListener('mousemove', handleMove)
        window.addEventListener('touchmove', handleMove)
        window.addEventListener('mouseup', handleUp)
        window.addEventListener('touchend', handleUp)

        return () => {
            canvas.removeEventListener('mousedown', handleDown)
            canvas.removeEventListener('touchstart', handleDown)
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('touchmove', handleMove)
            window.removeEventListener('mouseup', handleUp)
            window.removeEventListener('touchend', handleUp)
        }
    }, [gl.domElement, demogorgonMode, transitionPhase])

    useFrame((state) => {
        spherical.current.theta +=
            (targetSpherical.current.theta - spherical.current.theta) * 0.08
        spherical.current.phi +=
            (targetSpherical.current.phi - spherical.current.phi) * 0.08

        const lookAt = new THREE.Vector3()
        lookAt.setFromSpherical(spherical.current)

        let posX = 0
        let posY = 0
        let posZ = 0

        // === QUICK IMPACT JOLT ===
        if (impactMoment) {
            // Quick jolt - not dramatic, just a sudden shake
            posX = (Math.random() - 0.5) * 0.3
            posY = (Math.random() - 0.5) * 0.2
            camera.rotation.z = (Math.random() - 0.5) * 0.1
        }
        // === DEMOGORGON MODE - Desperate search ===
        else if (demogorgonMode) {
            const time = state.clock.getElapsedTime()
            if (demoStartRef.current === 0) demoStartRef.current = time

            const elapsed = time - demoStartRef.current
            const delay = 2.5 // 2.5s delay before panic sets in

            if (elapsed > delay) {
                const shakeTime = elapsed - delay
                // Fade in shake over 2 seconds (0 to 1)
                const intensity = Math.min(1, shakeTime / 2.0)

                // DESPERATE SEARCH: Wide, smooth sweeps (Looking "here and there")
                // Use shakeTime so waves start at 0 (sin(0)=0) to blend from current position
                // Note: We use sin for both to ensure they start at 0.
                const lookX = (Math.sin(shakeTime * 3) * 0.8 + Math.sin(shakeTime * 1.5) * 1.2) * intensity
                const lookY = (Math.sin(shakeTime * 2.5) * 0.5 + Math.sin(shakeTime * 1) * 0.3) * intensity

                lookAt.x += lookX
                lookAt.y += lookY

                // Body Sway - naturally low at 0
                posX = Math.sin(shakeTime * 2) * 0.1 * intensity
                posY = Math.sin(shakeTime * 1.5) * 0.05 * intensity
            }

            camera.rotation.z = 0
        } else {
            demoStartRef.current = 0
            camera.rotation.z = 0
        }

        // === UPSIDE DOWN - RECOVERY SEQUENCE ===
        if (upsideDownMode) {
            const now = state.clock.elapsedTime
            if (upsideDownStartRef.current === 0) {
                upsideDownStartRef.current = now
            }
            const elapsed = now - upsideDownStartRef.current

            // 1. WAKE UP (FLOOR) - 0s to 4s
            // Eyes opening, vision blurred. Lying flat.
            if (elapsed < 4.0) {
                posY = -1.2 // On floor

                // Slight groggy head drift
                const groggyX = Math.sin(elapsed * 0.5) * 0.05
                const groggyY = Math.cos(elapsed * 0.4) * 0.02
                lookAt.x += groggyX
                lookAt.y += groggyY + 0.2 // Tilt up slightly
            }
            // 2. RECOVERY / STAND UP - 4s to 12s
            // "Pushes themselves up... Kneels... Stands fully upright"
            else if (elapsed < 12.0) {
                // Ease out cubic for heavy lifting feel
                const t = (elapsed - 4.0) / 8.0 // Normalized 0 to 1 over 8s
                const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // EaseInOutQuad

                // Interpolate Height: Floor (-1.2) to Standing (0.0)
                posY = THREE.MathUtils.lerp(-1.2, 0.0, ease)

                // Camera Shake simulates struggle/movement
                // Shake decreases as we stabilize
                const struggle = (1.0 - t) * 0.03
                posX += (Math.random() - 0.5) * struggle
                posZ += (Math.random() - 0.5) * struggle

                // Tilt pitch from "Looking Up" towards "Level"
                // Although spherical controls lookAt, we can nudge the targetSpherical slightly
                // But it's better to just let the user control or naturally settle.
                // We'll just let the posY rise naturally.
            }
            // 3. STANDING / RECOVERED - 12s+
            else {
                posY = 0.0 // Fully standing
            }
        }

        camera.position.set(posX, posY, posZ)
        camera.lookAt(lookAt)
    })

    return null
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

    // Create worn 70s/80s wallpaper texture procedurally
    const wallMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext("2d")!

        // Base color - faded cream/yellow (old wallpaper)
        ctx.fillStyle = "#D4C9A8"
        ctx.fillRect(0, 0, 512, 512)

        // Subtle vertical stripe pattern (70s/80s wallpaper)
        ctx.strokeStyle = "rgba(180, 165, 130, 0.4)"
        ctx.lineWidth = 8
        for (let x = 0; x < 512; x += 24) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, 512)
            ctx.stroke()
        }

        // Faded floral/geometric pattern hint
        ctx.fillStyle = "rgba(160, 140, 100, 0.15)"
        for (let y = 20; y < 512; y += 80) {
            for (let x = 20; x < 512; x += 60) {
                const offsetX = (Math.floor(y / 80) % 2) * 30
                ctx.beginPath()
                ctx.arc(x + offsetX + (Math.random() - 0.5) * 5, y + (Math.random() - 0.5) * 5, 8 + Math.random() * 4, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Yellowing/aging discoloration patches
        for (let i = 0; i < 15; i++) {
            const gradient = ctx.createRadialGradient(
                Math.random() * 512, Math.random() * 512, 0,
                Math.random() * 512, Math.random() * 512, Math.random() * 100 + 40
            )
            gradient.addColorStop(0, `rgba(180, 160, 100, ${Math.random() * 0.15})`)
            gradient.addColorStop(1, "rgba(180, 160, 100, 0)")
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, 512, 512)
        }

        // Darker stains near edges and corners
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * 512
            const y = Math.random() * 512
            const size = Math.random() * 25 + 8
            const alpha = Math.random() * 0.12 + 0.03
            ctx.fillStyle = `rgba(100, 85, 60, ${alpha})`
            ctx.beginPath()
            ctx.ellipse(x, y, size, size * 0.6, Math.random() * Math.PI, 0, Math.PI * 2)
            ctx.fill()
        }

        // Tiny cracks and imperfections
        ctx.strokeStyle = "rgba(80, 65, 45, 0.08)"
        ctx.lineWidth = 0.5
        for (let i = 0; i < 40; i++) {
            ctx.beginPath()
            const x = Math.random() * 512
            const y = Math.random() * 512
            ctx.moveTo(x, y)
            for (let j = 0; j < 4; j++) {
                ctx.lineTo(x + (Math.random() - 0.5) * 30, y + Math.random() * 25)
            }
            ctx.stroke()
        }

        const texture = new THREE.CanvasTexture(canvas)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(2, 1)

        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.92,
            metalness: 0,
            bumpScale: 0.015,
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
    const { demogorgonMode, upsideDownMode } = useKeyboard()

    useFrame((state) => {
        if (!isLit || upsideDownMode) {
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
            {/* Socket Base */}
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.015, 0.02, 0.06, 8]} />
                <meshStandardMaterial color="#111" roughness={0.8} />
            </mesh>

            {/* Socket Connector */}
            <mesh position={[0, 0.025, 0]}>
                <cylinderGeometry args={[0.022, 0.02, 0.03, 8]} />
                <meshStandardMaterial color="#0a3a2a" roughness={0.6} />
            </mesh>

            {/* Bulb mesh */}
            <mesh position={[0, -0.01, 0]}>
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
        // Tighter curve tension for more detailed twists
        return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.1)
    }, [points])

    if (!curve) return null

    return (
        <mesh>
            <tubeGeometry args={[curve, 300, 0.007, 8, false]} />
            <meshStandardMaterial color="#111" roughness={0.9} />
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
// --- UPSIDE DOWN VISUALS ---

function UpsideDownVines() {
    // Generates "Spider Web" style vein networks covering the walls
    const vineGeometries = useMemo(() => {
        const geometries: { curve: THREE.CatmullRomCurve3; width: number }[] = []

        // Helper to recursively grow a vine vein on a wall plane
        const growVein = (
            startPoint: THREE.Vector3,
            direction: THREE.Vector3, // Initial direction to grow
            wallNormal: THREE.Vector3, // Away from wall
            wallU: THREE.Vector3, // Wall local axis 1
            wallV: THREE.Vector3, // Wall local axis 2
            generations: number,
            width: number,
            length: number
        ) => {
            const points = [startPoint.clone()]
            let currentPos = startPoint.clone()
            let currentDir = direction.clone().normalize()

            const segmentCount = Math.floor(length * 10) // density
            const stepSize = length / segmentCount

            for (let i = 0; i < segmentCount; i++) {
                // Wiggle direction: Rotate slightly around wall normal
                const angle = (Math.random() - 0.5) * 1.0 // Radians wiggle
                currentDir.applyAxisAngle(wallNormal, angle).normalize()

                // Move forward
                const move = currentDir.clone().multiplyScalar(stepSize)
                currentPos.add(move)

                // 3D Depth noise - REMOVED for strictly flat on wall
                // const depthOffset = wallNormal.clone().multiplyScalar(Math.sin(i * 0.6) * 0.01)

                points.push(currentPos.clone())

                // BRANCHING (The "Spider Web" effect)
                // Middle generations branch often
                if (generations > 0 && Math.random() < 0.08) { // Distinctly reduced branching
                    // Branch offsets by 45-90 degrees
                    const branchDir = currentDir.clone().applyAxisAngle(wallNormal, (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 3 + Math.random() * 0.5))
                    growVein(
                        currentPos.clone(),
                        branchDir,
                        wallNormal,
                        wallU,
                        wallV,
                        generations - 1,
                        width * 0.6, // thinner
                        length * 0.7 // shorter
                    )
                }
            }

            if (points.length > 2) {
                geometries.push({
                    curve: new THREE.CatmullRomCurve3(points),
                    width: width
                })
            }
        }

        // --- SPAWN CENTERS ---
        // We create "nodes" on the surfaces from which webs spread
        const spawnWebNode = (
            center: THREE.Vector3,
            wallNormal: THREE.Vector3,
            wallU: THREE.Vector3,
            wallV: THREE.Vector3
        ) => {
            // Spawn 1-2 main arteries (Reduced density)
            const arteryCount = 1 + Math.floor(Math.random() * 2)

            // Floor vines shouldn't grow as long to avoid crossing center
            const growLength = center.y < 0.5 ? 2.5 : 5.0

            for (let i = 0; i < arteryCount; i++) {
                const angle = (i / arteryCount) * Math.PI * 2 + (Math.random() * 1.0)
                const dir = new THREE.Vector3()
                    .addScaledVector(wallU, Math.cos(angle))
                    .addScaledVector(wallV, Math.sin(angle))

                // Thinner main vines (0.05 instead of 0.1)
                growVein(center, dir, wallNormal, wallU, wallV, 3, 0.05, growLength)
            }
        }

        // BACK WALL (Z = -6) - EDGE ONLY (Keep center text clean)
        // Top Corners
        growVein(
            new THREE.Vector3(-4, 2.2, -5.9),
            new THREE.Vector3(1, -0.2, 0).normalize(), // Grow right/down slightly
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            3, 0.05, 3.5
        )
        growVein(
            new THREE.Vector3(4, 2.2, -5.9),
            new THREE.Vector3(-1, -0.2, 0).normalize(), // Grow left/down slightly
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            3, 0.05, 3.5
        )

        // Bottom Corners
        growVein(
            new THREE.Vector3(-4, -1.8, -5.9),
            new THREE.Vector3(1, 0.2, 0).normalize(), // Grow right/up slightly
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            3, 0.05, 3.0
        )
        growVein(
            new THREE.Vector3(4, -1.8, -5.9),
            new THREE.Vector3(-1, 0.2, 0).normalize(), // Grow left/up slightly
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            3, 0.05, 3.0
        )

        // LEFT WALL (X = -6) - Avoid deep back corner (Z=-6)
        for (let i = 0; i < 2; i++) {
            spawnWebNode(
                new THREE.Vector3(-5.9, -1 + Math.random() * 6, -2 + Math.random() * 6), // Z from -2 to +4
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(0, 1, 0)
            )
        }

        // RIGHT WALL (X = 6) - Keep it simple
        for (let i = 0; i < 2; i++) {
            spawnWebNode(
                new THREE.Vector3(5.9, -1 + Math.random() * 6, -2 + Math.random() * 6),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(0, 0, -1),
                new THREE.Vector3(0, 1, 0)
            )
        }

        // FLOOR (Y = 0) - Only far end
        for (let i = 0; i < 1; i++) { // Reduced count
            spawnWebNode(
                new THREE.Vector3(-3 + Math.random() * 6, 0.05, -3.5 - Math.random() * 1.5), // Z: -3.5 to -5.0
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(0, 0, 1)
            )
        }

        return geometries
    }, [])

    return (
        <group>
            {vineGeometries.map((item, i) => (
                <mesh key={i} receiveShadow castShadow>
                    <tubeGeometry args={[item.curve, 32, item.width, 8, false]} />
                    <meshStandardMaterial
                        color="#050505"
                        roughness={0.2}
                        metalness={0.1}
                    />
                </mesh>
            ))}
        </group>
    )
}

function UpsideDownParticles() {
    // Floating "ash" / spores / dust
    const count = 1500 // Higher count for dust effect
    const mesh = useRef<THREE.InstancedMesh>(null!)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.002 + Math.random() / 500 // Very slow float
            const xFactor = -6 + Math.random() * 12
            const yFactor = 0 + Math.random() * 6
            const zFactor = -6 + Math.random() * 12
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    useFrame((state) => {
        if (!mesh.current) return

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            // Gentle floating motion
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )

            // Random micro-rotations and small size
            dummy.scale.setScalar(0.01 + Math.random() * 0.03)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.03, 0]} />
            <meshStandardMaterial
                color="#cccccc"
                transparent
                opacity={0.5}
                roughness={0.2} // Catch light better
                blending={THREE.NormalBlending}
            />
        </instancedMesh>
    )
}

// === REALITY BREACH EFFECTS ===
// This creates the visceral moment where reality fractures but hasn't fully flipped
// Walls behave like elastic membrane being pushed from the other side

function BreachingWall({
    position,
    rotation,
    side,
}: {
    position: [number, number, number]
    rotation: [number, number, number]
    side: 'back' | 'left' | 'right' | 'front'
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const { transitionPhase, impactMoment } = useKeyboard()
    const materialRef = useRef<THREE.ShaderMaterial>(null)

    // Shader for elastic membrane deformation
    const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            impactPoint: { value: new THREE.Vector2(0.5, 0.5) },
            impactStrength: { value: 0 },
            warpIntensity: { value: 0 },
            baseColor: { value: new THREE.Color('#D4C9A8') },
            tearColor: { value: new THREE.Color('#1a0505') },
        },
        vertexShader: `
            uniform float time;
            uniform vec2 impactPoint;
            uniform float impactStrength;
            uniform float warpIntensity;
            
            varying vec2 vUv;
            varying float vDisplacement;
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Calculate distance from impact point
                float dist = distance(uv, impactPoint);
                
                // Elastic membrane bulge - pushes out from impact point
                float bulge = exp(-dist * 3.0) * impactStrength;
                
                // Ripple effect spreading from impact
                float ripple = sin(dist * 20.0 - time * 8.0) * 0.1 * impactStrength * (1.0 - dist);
                
                // Random trembling during warp
                float tremble = sin(time * 50.0 + uv.x * 30.0) * sin(time * 40.0 + uv.y * 25.0) * warpIntensity * 0.05;
                
                // Apply displacement along normal (Z axis for planes)
                pos.z += bulge * 0.8 + ripple + tremble;
                
                vDisplacement = bulge + ripple * 0.5;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform float impactStrength;
            uniform float warpIntensity;
            uniform vec3 baseColor;
            uniform vec3 tearColor;
            uniform vec2 impactPoint;
            
            varying vec2 vUv;
            varying float vDisplacement;
            
            void main() {
                // Calculate tear effect near high displacement
                float tearAmount = smoothstep(0.3, 0.8, vDisplacement);
                
                // Flicker effect during warp
                float flicker = step(0.5, fract(time * 30.0 + vUv.x * 10.0)) * warpIntensity * 0.3;
                
                // Color shift towards darkness at impact point
                float distFromImpact = distance(vUv, impactPoint);
                float darkness = (1.0 - distFromImpact) * impactStrength * 0.5;
                
                // Mix base color with tear darkness
                vec3 finalColor = mix(baseColor, tearColor, tearAmount + darkness);
                finalColor -= flicker;
                
                // Vein-like cracks spreading from impact
                float crack = smoothstep(0.02, 0.0, abs(sin(distFromImpact * 40.0 + time * 5.0) * 0.1 - fract(vUv.x * 20.0 + vUv.y * 15.0))) * impactStrength * 0.5;
                finalColor = mix(finalColor, tearColor, crack);
                
                // Alpha based on activity - transparent where not displaced
                // This allows the Window and physical Wall behind to be seen until the breach occurs
                float alpha = smoothstep(0.01, 0.2, vDisplacement) + tearAmount;
                
                gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
            }
        `,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false, // Don't occlude if transparent
    }), [])

    useFrame((state) => {
        if (!materialRef.current || !materialRef.current.uniforms) return
        const time = state.clock.elapsedTime
        const uniforms = materialRef.current.uniforms

        if (uniforms.time) uniforms.time.value = time

        // Only animate on impact moment
        if (impactMoment) {
            // Sudden maximum displacement
            if (uniforms.impactStrength) uniforms.impactStrength.value = 1.2
            if (uniforms.warpIntensity) uniforms.warpIntensity.value = 0.8

            // Impact point on right wall (window side)
            if (side === 'right') {
                if (uniforms.impactPoint) uniforms.impactPoint.value.set(0.6, 0.5)
                if (uniforms.impactStrength) uniforms.impactStrength.value *= 1.5
            }
        } else {
            // Decay when not impacting
            if (uniforms.impactStrength) uniforms.impactStrength.value *= 0.9
            if (uniforms.warpIntensity) uniforms.warpIntensity.value *= 0.9
        }
    })

    // Only render during breach/transition, and NEVER in Upside Down (it's unlit and breaks immersion)
    const { demogorgonMode, upsideDownMode } = useKeyboard()
    if (upsideDownMode) return null
    if (!demogorgonMode && transitionPhase === 'none') return null

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
        >
            <planeGeometry args={[12, 6, 64, 32]} />
            <primitive object={shaderMaterial} ref={materialRef} attach="material" />
        </mesh>
    )
}

// Debris and dust explosion during impact
function ImpactDebris() {
    const { impactMoment, transitionPhase } = useKeyboard()
    const particles = useRef<THREE.InstancedMesh>(null!)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const count = 100

    const particleData = useMemo(() => {
        return Array.from({ length: count }, () => ({
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.3) * 6,
                (Math.random() - 0.5) * 8
            ),
            position: new THREE.Vector3(5, 0, 0), // Start from right wall (window)
            rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
            scale: 0.02 + Math.random() * 0.08,
            life: 1,
        }))
    }, [])

    const [active, setActive] = useState(false)

    useEffect(() => {
        if (impactMoment) {
            setActive(true)
            // Reset particle positions
            particleData.forEach(p => {
                p.position.set(5 + Math.random() * 0.5, Math.random() * 2 - 1, Math.random() * 4 - 2)
                p.life = 1
                p.velocity.set(
                    (Math.random() - 0.5) * 10 - 3, // Bias toward left (into room)
                    (Math.random() - 0.3) * 8,
                    (Math.random() - 0.5) * 6
                )
            })
        }
    }, [impactMoment, transitionPhase, particleData])

    useFrame((state, delta) => {
        if (!active || !particles.current) return

        let allDead = true

        particleData.forEach((p, i) => {
            if (p.life > 0) {
                allDead = false

                // Physics
                p.velocity.y -= 15 * delta // Gravity
                p.position.add(p.velocity.clone().multiplyScalar(delta))
                p.life -= delta * 0.5

                // Update matrix
                dummy.position.copy(p.position)
                dummy.rotation.x += delta * 5
                dummy.rotation.y += delta * 3
                dummy.scale.setScalar(p.scale * p.life)
                dummy.updateMatrix()
                particles.current.setMatrixAt(i, dummy.matrix)
            } else {
                dummy.scale.setScalar(0)
                dummy.updateMatrix()
                particles.current.setMatrixAt(i, dummy.matrix)
            }
        })

        particles.current.instanceMatrix.needsUpdate = true

        if (allDead) setActive(false)
    })

    if (!active) return null

    return (
        <instancedMesh ref={particles} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#8B7355"
                roughness={0.9}
            />
        </instancedMesh>
    )
}

// Light smearing effect during reality warp
function LightSmearEffect() {
    const { impactMoment } = useKeyboard()
    const groupRef = useRef<THREE.Group>(null)

    const smearData = useMemo(() => {
        return Array.from({ length: 20 }, () => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 8,
                Math.random() * 4 - 2,
                (Math.random() - 0.5) * 8
            ),
            scale: 0.1 + Math.random() * 0.3,
            speed: 2 + Math.random() * 3,
            offset: Math.random() * Math.PI * 2,
            direction: Math.random() > 0.5 ? 1 : -1,
        }))
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return
        const time = state.clock.elapsedTime

        groupRef.current.children.forEach((child, i) => {
            const data = smearData[i]
            if (!data) return

            // Smear motion - only during impact
            const smearAmount = impactMoment ? 2 : 0.1
            child.scale.x = data.scale + Math.sin(time * data.speed + data.offset) * smearAmount
            child.scale.y = data.scale * 0.3

            // Flicker intensity
            const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
            if (mat) {
                mat.opacity = impactMoment
                    ? 0.3 + Math.random() * 0.5
                    : 0
            }
        })
    })

    if (!impactMoment) return null

    return (
        <group ref={groupRef}>
            {smearData.map((data, i) => (
                <mesh key={i} position={data.position.toArray()}>
                    <planeGeometry args={[1, 0.1]} />
                    <meshBasicMaterial
                        color="#FFB347"
                        transparent
                        opacity={0.4}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    )
}

// Screen effects for the quick transition
function BreachScreenEffects() {
    const { transitionPhase, impactMoment } = useKeyboard()
    const [shake, setShake] = useState({ x: 0, y: 0 })

    // Quick violent shake on impact
    useEffect(() => {
        if (impactMoment) {
            const interval = setInterval(() => {
                setShake({
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 20,
                })
            }, 16)

            const timeout = setTimeout(() => {
                clearInterval(interval)
                setShake({ x: 0, y: 0 })
            }, 300) // Quick 300ms shake

            return () => {
                clearInterval(interval)
                clearTimeout(timeout)
            }
        }
    }, [impactMoment])

    return (
        <>
            {/* Screen shake on impact */}
            {impactMoment && (
                <div
                    className="fixed inset-0 pointer-events-none z-40"
                    style={{
                        transform: `translate(${shake.x}px, ${shake.y}px)`,
                    }}
                />
            )}

            {/* White flash on impact - quick BOOM */}
            {impactMoment && (
                <div
                    className="fixed inset-0 pointer-events-none z-50 bg-white"
                    style={{
                        animation: 'flashOut 0.2s ease-out forwards',
                    }}
                />
            )}

            {/* Fade to black - eyes closing */}
            {transitionPhase === 'flip' && (
                <div
                    className="fixed inset-0 pointer-events-none z-[100] bg-black"
                    style={{
                        animation: 'fadeToBlack 0.5s ease-in forwards',
                    }}
                />
            )}

            {/* Fade FROM black - eyes opening in Upside Down (With Blur) */}
            {transitionPhase === 'reveal' && (
                <div
                    className="fixed inset-0 pointer-events-none z-[100] bg-black"
                    style={{
                        animation: 'fadeFromBlack 4s ease-out forwards', // Slower, more hesitant
                    }}
                />
            )}

            {/* Separate Blur Overlay for the "Vision blurred" effect */}
            {transitionPhase === 'reveal' && (
                <div
                    className="fixed inset-0 pointer-events-none z-[90] backdrop-blur-md"
                    style={{
                        animation: 'blurClear 4s ease-out forwards'
                    }}
                />
            )}

            <style>{`
                @keyframes flashOut {
                    0% { opacity: 0.9; }
                    100% { opacity: 0; }
                }
                @keyframes fadeToBlack {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes fadeFromBlack {
                    0% { opacity: 1; }
                    20% { opacity: 1; } /* Hold black a bit longer */
                    100% { opacity: 0; }
                }
                @keyframes blurClear {
                    0% { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
                    100% { backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
                }
            `}</style>
        </>
    )
}

function AlphabetWall({ isUpsideDown = false }: { isUpsideDown?: boolean }) {
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

    // Generate MESSY Wires connected to bulbs
    const wirePath = useMemo(() => {
        const points: THREE.Vector3[] = []

        // Start off-screen left, draped over something maybe
        points.push(new THREE.Vector3(-4, 1.5, -5.85))
        points.push(new THREE.Vector3(-3, 1.2, -5.88))

        layoutData.forEach((item, i) => {
            // Calculate "socket top" attachment point
            const attachPoint = new THREE.Vector3(
                item.bulbPos[0],
                item.bulbPos[1] + 0.08,
                item.bulbPos[2]
            )

            // Add point AT the socket
            points.push(attachPoint)

            // Add connection to NEXT bulb (or end)
            if (i < layoutData.length - 1) {
                const nextItem = layoutData[i + 1]
                if (!nextItem) return

                const nextAttach = new THREE.Vector3(
                    nextItem.bulbPos[0],
                    nextItem.bulbPos[1] + 0.08,
                    nextItem.bulbPos[2]
                )

                // Detect if we are jumping rows (large Y difference) or just moving sideways
                const isNewRow = Math.abs(attachPoint.y - nextAttach.y) > 0.4

                if (isNewRow) {
                    // COMPLEX ROW TRANSITION (H -> I)
                    // We need a multi-point detailed path to go Right -> Down -> Left -> Hook

                    const gutterY = (attachPoint.y + nextAttach.y) * 0.5

                    // 1. Extend RIGHT from the current bulb
                    points.push(new THREE.Vector3(
                        attachPoint.x + 0.4,
                        attachPoint.y - 0.1, // Start dropping earlier
                        attachPoint.z + 0.02 // Stay on wall
                    ))

                    // 2. Loop Out and Down
                    points.push(new THREE.Vector3(
                        attachPoint.x + 0.8, // Far right
                        gutterY - 0.1, // Lower start of loop
                        attachPoint.z + 0.02 // Stay on wall
                    ))

                    // 3. Traverse Left across the room (hanging LOW but ON WALL)
                    points.push(new THREE.Vector3(
                        0, // Center of room x-wise
                        gutterY - 0.45, // Significantly lower to clear text
                        attachPoint.z + 0.05 // Tiny offset to avoid z-fighting
                    ))

                    // 4. Loop Far Left (past the target)
                    points.push(new THREE.Vector3(
                        nextAttach.x - 0.8, // Far left
                        gutterY - 0.05, // Start coming up
                        nextAttach.z + 0.02 // Stay on wall
                    ))

                    // 5. Hook into the new bulb from left
                    points.push(new THREE.Vector3(
                        nextAttach.x - 0.4,
                        nextAttach.y,
                        nextAttach.z + 0.02
                    ))

                } else {
                    // STANDARD CONNECTION (A -> B)
                    // Simple 3-point catmull rom for messiness

                    let mid1 = new THREE.Vector3().lerpVectors(attachPoint, nextAttach, 0.25)
                    let mid2 = new THREE.Vector3().lerpVectors(attachPoint, nextAttach, 0.5)
                    let mid3 = new THREE.Vector3().lerpVectors(attachPoint, nextAttach, 0.75)

                    // Standard drape between letters
                    const sagFactor = 0.05 + seededRandom(i * 55) * 0.2

                    mid1.y -= sagFactor * 0.5
                    mid1.z += (seededRandom(i * 12) - 0.5) * 0.05

                    mid2.y -= sagFactor
                    // Random twist
                    mid2.x += (seededRandom(i * 99) - 0.5) * 0.05
                    mid2.z += 0.02 + seededRandom(i * 88) * 0.05

                    mid3.y -= sagFactor * 0.5
                    mid3.z += (seededRandom(i * 23) - 0.5) * 0.05

                    points.push(mid1)
                    points.push(mid2)
                    points.push(mid3)
                }
            }
        })

        // End off-screen right
        points.push(new THREE.Vector3(2.5, -0.9, -5.88))
        points.push(new THREE.Vector3(4, -1.2, -5.9))

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
                            // Disable lights in Upside Down
                            isLit={isUpsideDown ? false : !!isLit}
                            flickerSeed={idx * 123.4}
                        />
                    </group>
                )
            })}

            {/* Cryptic Message in Upside Down - REMOVED for canon accuracy */}
            {isUpsideDown && null}
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
                <meshStandardMaterial color="#8B6914" roughness={0.6} metalness={0.5} />
            </mesh>
            {/* Pole */}
            <mesh position={[0, 0.8, 0]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 1.5]} />
                <meshStandardMaterial color="#8B6914" roughness={0.6} metalness={0.5} />
            </mesh>
            {/* Shade - glows during demogorgon */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.25, 0.3, 12, 1, true]} />
                <meshStandardMaterial
                    color={demogorgonMode ? "#FFB347" : "#E2D4B7"} // Aged parchment
                    emissive={demogorgonMode ? "#FF6B6B" : "#FF9E5E"} // Slight warm emission always
                    emissiveIntensity={demogorgonMode ? flicker * 0.5 : 0.3} // Gentle self-illumination
                    roughness={0.9}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            {/* Warm light - flickers in demogorgon mode */}
            <pointLight
                position={[0, 1.4, 0]}
                intensity={demogorgonMode ? flicker * 0.6 : 0.8}
                color={demogorgonMode ? "#FF6B6B" : "#FFD0A0"} // Soft warm light
                distance={6}
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

function UpsideDownWindowOverlay() {
    const { upsideDownMode } = useKeyboard()
    if (!upsideDownMode) return null
    return (
        <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.2, 1.6]} />
            <meshBasicMaterial color="#001133" opacity={0.6} transparent />
        </mesh>
    )
}

// Large window looking out to dark forest - RIGHT SIDE
function ForestWindow() {
    // Create forest scene texture procedurally
    const forestMaterial = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 512
        canvas.height = 384
        const ctx = canvas.getContext("2d")!

        // Night sky gradient - deep dark blue/black
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 384)
        skyGrad.addColorStop(0, "#020408")
        skyGrad.addColorStop(0.4, "#0a0c15")
        skyGrad.addColorStop(1, "#050608")
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, 512, 384)

        // Dense tree silhouettes in layers (back to front)
        const drawTree = (x: number, height: number, width: number, darkness: number) => {
            ctx.fillStyle = `rgba(5, 8, 12, ${darkness})`
            ctx.beginPath()
            ctx.moveTo(x, 384)
            ctx.lineTo(x + width / 2, 384 - height)
            ctx.lineTo(x + width, 384)
            ctx.fill()
            // Trunk
            ctx.fillRect(x + width * 0.4, 384 - height * 0.3, width * 0.2, height * 0.3)
        }

        // Back layer - distant trees (lighter/more gray)
        for (let i = 0; i < 25; i++) {
            drawTree(
                Math.random() * 520 - 10,
                80 + Math.random() * 60,
                20 + Math.random() * 15,
                0.5 + Math.random() * 0.2
            )
        }

        // Middle layer
        for (let i = 0; i < 15; i++) {
            drawTree(
                Math.random() * 520 - 10,
                120 + Math.random() * 80,
                25 + Math.random() * 20,
                0.7 + Math.random() * 0.2
            )
        }

        // Front layer - closest trees (darkest)
        for (let i = 0; i < 10; i++) {
            drawTree(
                Math.random() * 520 - 10,
                180 + Math.random() * 100,
                35 + Math.random() * 25,
                0.85 + Math.random() * 0.15
            )
        }

        // Distant streetlamp (isolated, ominous)
        const lampX = 380
        const lampY = 200
        // Lamp glow (amber/warm)
        const glowGrad = ctx.createRadialGradient(lampX, lampY, 0, lampX, lampY, 80)
        glowGrad.addColorStop(0, "rgba(255, 180, 80, 0.3)")
        glowGrad.addColorStop(0.3, "rgba(255, 160, 60, 0.15)")
        glowGrad.addColorStop(0.6, "rgba(255, 140, 40, 0.05)")
        glowGrad.addColorStop(1, "rgba(255, 140, 40, 0)")
        ctx.fillStyle = glowGrad
        ctx.fillRect(lampX - 80, lampY - 80, 160, 160)

        // Lamp post silhouette
        ctx.fillStyle = "#0a0a0a"
        ctx.fillRect(lampX - 2, lampY, 4, 184) // Post
        ctx.fillRect(lampX - 8, lampY - 5, 16, 12) // Lamp head

        // Lamp light source
        ctx.fillStyle = "#FFB366"
        ctx.beginPath()
        ctx.arc(lampX, lampY + 2, 4, 0, Math.PI * 2)
        ctx.fill()

        // Subtle ground fog
        const fogGrad = ctx.createLinearGradient(0, 340, 0, 384)
        fogGrad.addColorStop(0, "rgba(40, 50, 60, 0)")
        fogGrad.addColorStop(1, "rgba(40, 50, 60, 0.4)")
        ctx.fillStyle = fogGrad
        ctx.fillRect(0, 340, 512, 44)

        const texture = new THREE.CanvasTexture(canvas)
        return new THREE.MeshBasicMaterial({ map: texture })
    }, [])

    return (
        <group position={[5.9, 0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Window frame - worn white painted wood */}
            {/* Outer frame */}
            <mesh position={[0, 0, -0.08]} castShadow>
                <boxGeometry args={[2.4, 1.8, 0.12]} />
                <meshStandardMaterial color="#C4B4A0" roughness={0.92} />
            </mesh>

            {/* Window glass with forest view - Blue tint in Upside Down */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2.2, 1.6]} />
                <primitive object={forestMaterial} attach="material" />
            </mesh>
            {/* Upside Down Tint Overlay */}
            {/* UpsideDownWindowOverlay is rendered here */}
            <UpsideDownWindowOverlay />

            {/* Glass reflection overlay - subtle */}
            <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[2.2, 1.6]} />
                <meshStandardMaterial
                    color="#445566"
                    transparent
                    opacity={0.08}
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>

            {/* Window muntins (thin wooden dividers) */}
            {/* Vertical center */}
            <mesh position={[0, 0, 0.02]} castShadow>
                <boxGeometry args={[0.04, 1.6, 0.03]} />
                <meshStandardMaterial color="#B0A090" roughness={0.9} />
            </mesh>
            {/* Horizontal center */}
            <mesh position={[0, 0, 0.02]} castShadow>
                <boxGeometry args={[2.2, 0.04, 0.03]} />
                <meshStandardMaterial color="#B0A090" roughness={0.9} />
            </mesh>

            {/* Curtains - heavy, slightly open */}
            {/* Left curtain */}
            <mesh position={[-1.0, 0, 0.05]} castShadow>
                <boxGeometry args={[0.5, 2, 0.08]} />
                <meshStandardMaterial color="#4A3A28" roughness={0.98} />
            </mesh>
            {/* Right curtain */}
            <mesh position={[1.0, 0, 0.05]} castShadow>
                <boxGeometry args={[0.5, 2, 0.08]} />
                <meshStandardMaterial color="#4A3A28" roughness={0.98} />
            </mesh>

            {/* Curtain rod */}
            <mesh position={[0, 1.05, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 2.8]} />
                <meshStandardMaterial color="#8B7355" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Subtle ambient light from window (moonlight) */}
            <pointLight
                position={[0, 0, 0.5]}
                intensity={0.03}
                color="#667788"
                distance={4}
                decay={2}
            />
        </group >
    )
}

// Dark doorway - larger, more realistic proportions
function DarkDoorway({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Door frame - worn white painted wood, realistic proportions */}
            {/* Larger frame for realistic suburban door */}
            {/* Top frame (header) */}
            <mesh position={[0, 1.25, 0]} castShadow>
                <boxGeometry args={[1.1, 0.12, 0.18]} />
                <meshStandardMaterial color="#C8BCA8" roughness={0.92} />
            </mesh>
            {/* Left frame jamb */}
            <mesh position={[-0.5, 0, 0]} castShadow>
                <boxGeometry args={[0.12, 2.5, 0.18]} />
                <meshStandardMaterial color="#C8BCA8" roughness={0.92} />
            </mesh>
            {/* Right frame jamb */}
            <mesh position={[0.5, 0, 0]} castShadow>
                <boxGeometry args={[0.12, 2.5, 0.18]} />
                <meshStandardMaterial color="#C8BCA8" roughness={0.92} />
            </mesh>

            {/* Pitch black void inside - the darkness beyond */}
            <mesh position={[0, 0, 0.02]}>
                <planeGeometry args={[0.88, 2.38]} />
                <meshBasicMaterial color="#010101" />
            </mesh>

            {/* Door slightly ajar - adds depth and unease */}
            <mesh position={[0.35, 0, 0.08]} rotation={[0, 0.15, 0]} castShadow>
                <boxGeometry args={[0.88, 2.35, 0.04]} />
                <meshStandardMaterial color="#3D3428" roughness={0.9} />
            </mesh>

            {/* Door handle/knob */}
            <mesh position={[0.08, 0, 0.12]} castShadow>
                <sphereGeometry args={[0.025, 12, 12]} />
                <meshStandardMaterial color="#8B7355" roughness={0.4} metalness={0.6} />
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

// Scattered newspapers, magazines, and household clutter
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

            {/* Joyce's scattered notes - desperate handwriting */}
            <mesh position={[1.5, -1.97, 0.5]} rotation={[-Math.PI / 2, 0, 0.15]} receiveShadow>
                <planeGeometry args={[0.2, 0.25]} />
                <meshStandardMaterial color="#F5F0E0" roughness={0.98} />
            </mesh>
            <mesh position={[1.3, -1.97, 0.8]} rotation={[-Math.PI / 2, 0, -0.4]} receiveShadow>
                <planeGeometry args={[0.15, 0.2]} />
                <meshStandardMaterial color="#FFF8DC" roughness={0.98} />
            </mesh>

            {/* Old coffee mug on floor */}
            <mesh position={[0.3, -1.93, 2.2]} castShadow>
                <cylinderGeometry args={[0.035, 0.03, 0.09, 12]} />
                <meshStandardMaterial color="#8B7355" roughness={0.8} />
            </mesh>

            {/* Pencils/pens scattered */}
            <mesh position={[1.2, -1.97, 0.3]} rotation={[-Math.PI / 2, 0, 0.6]}>
                <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
                <meshStandardMaterial color="#FFD700" roughness={0.6} />
            </mesh>
            <mesh position={[1.35, -1.97, 0.45]} rotation={[-Math.PI / 2, 0, -0.3]}>
                <cylinderGeometry args={[0.004, 0.004, 0.12, 8]} />
                <meshStandardMaterial color="#222222" roughness={0.8} />
            </mesh>

            {/* Kids' crayon drawing (Will's drawing) */}
            <mesh position={[-3.5, -1.97, 0]} rotation={[-Math.PI / 2, 0, 0.1]} receiveShadow>
                <planeGeometry args={[0.35, 0.28]} />
                <meshStandardMaterial color="#FFFAFA" roughness={0.95} />
            </mesh>

            {/* Photo fallen on ground */}
            <mesh position={[2.8, -1.97, 2.5]} rotation={[-Math.PI / 2, 0, 0.5]} receiveShadow>
                <planeGeometry args={[0.12, 0.09]} />
                <meshStandardMaterial color="#D4C4A8" roughness={0.85} />
            </mesh>

            {/* Crumpled paper ball near trash */}
            <mesh position={[-3.8, -1.9, 1.2]} castShadow>
                <icosahedronGeometry args={[0.04, 0]} />
                <meshStandardMaterial color="#E8E0D0" roughness={0.99} />
            </mesh>
            <mesh position={[-3.6, -1.92, 1.4]} castShadow>
                <icosahedronGeometry args={[0.035, 0]} />
                <meshStandardMaterial color="#F5F0E0" roughness={0.99} />
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
            {/* Minimal ambient - Cool-neutral shadows as per grading brief (not warm beige) */}
            <ambientLight
                intensity={demogorgonMode ? flicker1 * 0.15 : 2.5}
                color={demogorgonMode ? "#FF4444" : "#14161A"} // Cool dark grey-blue
            />

            {/* Subtle fill light from the side - Warm Incandescent but soft (not orange) */}
            <pointLight
                position={[4, 1, 0]}
                intensity={demogorgonMode ? flicker2 * 0.25 : 3.5}
                color={demogorgonMode ? "#FF6B6B" : "#FFD8B0"} // Softer warm
                distance={15}
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
    const { upsideDownMode } = useKeyboard()

    return (
        <group>
            {/* UPSIDE DOWN ATMOSPHERE */}
            {upsideDownMode && (
                <>
                    <UpsideDownVines />
                    <UpsideDownParticles />
                    {/* Directionless air light */}
                    <hemisphereLight
                        args={['#2a3244', '#000000', 1.5]}
                    />
                    {/* Blue moonlight / dimension light for definition */}
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={2}
                        color="#445588"
                    />
                    {/* Fog pushed back to reveal room */}
                    <fog attach="fog" args={['#020408', 2, 20]} />
                </>
            )}

            {/* Walls */}
            <WornWall position={[0, 0.25, -6]} rotation={[0, 0, 0]} />
            <WornWall position={[0, 0.25, 6]} rotation={[0, Math.PI, 0]} />
            <WornWall position={[-6, 0.25, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WornWall position={[6, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]} />

            <WornFloor />
            <StainedCeiling />
            <WornRug />

            {/* Dark doorways on either side of alphabet wall */}
            <DarkDoorway position={[-4, -0.9, -5.93]} />
            <DarkDoorway position={[4, -0.9, -5.93]} />

            {/* The iconic alphabet wall with lights */}
            <AlphabetWall isUpsideDown={upsideDownMode} />

            {/* Authentic 80s Byers home furniture */}
            <VintageCouch />
            <PlaidArmchair />
            <CRTTelevision />
            <ClutteredCoffeeTable />
            <SideTableWithPhone />
            <VintageBookshelf />
            <VintageFloorLamp />
            <WoodStove />
            <ForestWindow />
            <WallPhone />
            <ScatteredPapers />
            <DrapedBlanket />

            {/* Room lighting - responds to demogorgon mode but OFF in Upside Down */}
            {!upsideDownMode && <RoomLighting />}

            {/* === REALITY BREACH EFFECTS === */}
            {/* These render during the transition phases to create the visceral breach moment */}

            {/* Breaching walls - elastic membrane deformation effect */}
            {/* Right wall (window area) is the primary breach point */}
            <BreachingWall position={[5.95, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]} side="right" />

            {/* Debris explosion from impact */}
            <ImpactDebris />

            {/* Light smearing during reality warp */}
            <LightSmearEffect />
        </group>
    )
}

// Film grain overlay
function FilmGrain() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.05]"
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
    const [introFinished, setIntroFinished] = useState(SKIP_INTRO)
    const [activeLetter, setActiveLetter] = useState<string | null>(null)
    const [typedSequence, setTypedSequence] = useState("")

    // Split states for the sequenced event
    const [lightsFlickering, setLightsFlickering] = useState(false)
    const [showAttackRed, setShowAttackRed] = useState(false)
    const [upsideDownMode, setUpsideDownMode] = useState(false)

    // NEW: Breach transition states
    const [breachMode, setBreachMode] = useState(false) // Reality is fracturing
    const [impactMoment, setImpactMoment] = useState(false) // Violent physical impact
    const [transitionPhase, setTransitionPhase] = useState<'none' | 'flip' | 'reveal'>('none')

    const [showTyped, setShowTyped] = useState(false)

    // Audio refs
    const bgAudioRef = useRef<HTMLAudioElement | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const vecnaBufferRef = useRef<AudioBuffer | null>(null)
    const punchBufferRef = useRef<AudioBuffer | null>(null)

    // Active sources ref to kill them instantly
    const activeSourcesRef = useRef<AudioBufferSourceNode[]>([])

    // Initialize Audio
    useEffect(() => {
        console.log("🔊 Initializing Audio Setup...")
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

    // Manage Audio for Upside Down Awakening
    useEffect(() => {
        if (upsideDownMode && transitionPhase === 'reveal') {
            if (bgAudioRef.current) {
                // Reset and start silent
                bgAudioRef.current.currentTime = 0;
                bgAudioRef.current.volume = 0;
                bgAudioRef.current.play().catch(() => { });

                // Fade in over 5 seconds
                const fadeIn = setInterval(() => {
                    if (bgAudioRef.current && bgAudioRef.current.volume < 0.4) {
                        bgAudioRef.current.volume = Math.min(0.4, bgAudioRef.current.volume + 0.02);
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 200); // 25 steps * 200ms = 5000ms

                return () => clearInterval(fadeIn);
            }
        }
    }, [upsideDownMode, transitionPhase]);

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

    // Intro Synth Drone Generator (Deep 80s Horror Swell)
    const playIntroDrone = useCallback(() => {
        if (!audioContextRef.current) return
        const ctx = audioContextRef.current
        if (ctx.state === 'suspended') ctx.resume()

        const t = ctx.currentTime

        // 1. Low Drone (Sawtooth)
        const osc1 = ctx.createOscillator()
        osc1.type = 'sawtooth'
        osc1.frequency.setValueAtTime(36.71, t) // D1

        // 2. Detuned Oscillator for Thickness
        const osc2 = ctx.createOscillator()
        osc2.type = 'sawtooth'
        osc2.frequency.setValueAtTime(36.71 * 1.01, t) // Detuned slightly

        // 3. Sub Oscillator (Sine)
        const subOsc = ctx.createOscillator()
        subOsc.type = 'sine'
        subOsc.frequency.setValueAtTime(36.71 / 2, t) // D0 (Sub)

        // Filter Sweep (Lowpass opening up)
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(100, t)
        filter.frequency.exponentialRampToValueAtTime(2000, t + 5) // Swell open over 5s

        // Master Gain envelope
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.3, t + 2) // Fade in
        gain.gain.setValueAtTime(0.3, t + 5)
        gain.gain.linearRampToValueAtTime(0, t + 6.5) // Cut for transition

        // Connections
        osc1.connect(filter)
        osc2.connect(filter)
        subOsc.connect(gain) // Sub bypasses filter to keep bottom end
        filter.connect(gain)
        gain.connect(ctx.destination)

        // Start/Stop
        osc1.start(t)
        osc1.stop(t + 7)
        osc2.start(t)
        osc2.stop(t + 7)
        subOsc.start(t)
        subOsc.stop(t + 7)

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

        // Track the source
        activeSourcesRef.current.push(source);
        source.onended = () => {
            activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
        };

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

                    // TIMELINE - Simple and effective
                    // The random flickering IS the vibe - don't mess with it
                    // Just add a quick BOOM at the end before transitioning

                    const vecnaDuration = vecnaBufferRef.current?.duration || 5;

                    // 0. HEAVY SPARKING SOUNDS during flickering
                    // Random electrical sparks and crackles throughout
                    const sparkInterval = setInterval(() => {
                        if (Math.random() > 0.3) { // 70% chance each tick
                            playSpark();
                        }
                    }, 150 + Math.random() * 250); // Random interval 150-400ms

                    // 1. Play Vecna Audio after 1s
                    setTimeout(() => {
                        console.log("🔊 Playing Vecna (LOUD)");
                        if (vecnaBufferRef.current) {
                            playBuffer(vecnaBufferRef.current, 4.0, true);
                        }
                    }, 1000)


                    // 2. When vecna audio has ~1s remaining: BOOM + Punch
                    const boomTime = 1000 + (vecnaDuration * 1000) - 1500; // 1.5s before end
                    setTimeout(() => {
                        console.log("💥 BOOM - Quick impact!");
                        setShowAttackRed(true);
                        setImpactMoment(true); // This triggers the quick screen shake
                        if (punchBufferRef.current) {
                            playBuffer(punchBufferRef.current, 2.0, false);
                        }

                        // Impact only lasts 300ms - quick and violent
                        setTimeout(() => {
                            setImpactMoment(false);
                        }, 300);
                    }, Math.max(2000, boomTime));

                    // 3. COMPLETE SILENCE (Unconsciousness)
                    // The blackout happens right after impact/during the impact tail
                    const blackoutTime = 1000 + (vecnaDuration * 1000) - 500; // 0.5s before end of audio
                    setTimeout(() => {
                        console.log("🌑 UNCONSCIOUSNESS - Cut everything");
                        clearInterval(sparkInterval); // Stop spark sounds

                        // CUT ALL AUDIO INSTANTLY
                        activeSourcesRef.current.forEach(source => {
                            try { source.stop(); } catch (e) { }
                        });
                        activeSourcesRef.current = []; // Clear list
                        if (bgAudioRef.current) bgAudioRef.current.pause();

                        // FINAL THUMP - The knockout blow
                        // Played AFTER others are cut so it rings into the silence
                        if (punchBufferRef.current) {
                            playBuffer(punchBufferRef.current, 1.5, false);
                        }

                        setTransitionPhase('flip'); // Triggers fade to black (eyes closing)
                        setLightsFlickering(false);
                        setShowAttackRed(false); // Remove "RUN" overlay instantly for pitch black

                        // 4. AWAKENING (In the Upside Down)
                        // Hold the silence and darkness for a moment (Scene 4: Mandatory Silence)
                        setTimeout(() => {
                            console.log("👻 Switching to Upside Down & Waking Up");

                            // Transform world state while dark
                            setUpsideDownMode(true);
                            setTypedSequence("");

                            // Start slow eye open
                            setTransitionPhase('reveal');

                            // End reveal animation after it completes
                            setTimeout(() => {
                                console.log("👁️ Eyes fully open");
                                setTransitionPhase('none');
                            }, 4000); // Match slower fadeFromBlack animation
                        }, 3000); // 3 SECONDS OF SILENCE/DARKNESS (Disorientation)
                    }, Math.max(3000, blackoutTime));
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



    const contextValue = useMemo(() => ({
        activeLetter,
        typedSequence,
        demogorgonMode: lightsFlickering,
        upsideDownMode,
        breachMode,
        impactMoment,
        transitionPhase,
    }), [activeLetter, typedSequence, lightsFlickering, upsideDownMode, breachMode, impactMoment, transitionPhase])

    return (
        <KeyboardContext.Provider value={contextValue}>
            <div className="w-full h-screen bg-black relative overflow-hidden select-none cursor-grab active:cursor-grabbing">
                {!introFinished && (
                    <CinematicIntro
                        onStart={playIntroDrone}
                        onComplete={() => {
                            setIntroFinished(true)
                            // Trigger "Wake Up" eyes effect
                            setTransitionPhase('reveal')
                            setTimeout(() => {
                                setTransitionPhase('none')
                            }, 4000)
                        }}
                    />
                )}

                {/* Vintage overlay effects - Only show after intro or fade them in */}
                <div className={`transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
                    <FilmGrain />
                    <Vignette />
                    <UIOverlay />
                </div>

                {/* Breach transition screen effects - shake, chromatic aberration, flashes */}
                <BreachScreenEffects />

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

                {/* Type hint - Standard Mode Only */}
                {!upsideDownMode && (
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                        <p className="text-amber-200/40 text-xs tracking-wider font-serif text-center">
                            Type letters to communicate • Type &quot;RUN&quot; for a surprise
                        </p>
                    </div>
                )}

                {/* UPSIDE DOWN LOCATION CAPTION (Documentary Style) */}
                {upsideDownMode && (
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-center">
                        <p
                            className="text-[#aeb1b5] text-sm font-sans tracking-[0.2em] font-medium opacity-80"
                            style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }} // Subtle shadow for readability against dark floor
                        >
                            Right here in the Upside down
                        </p>
                    </div>
                )}

                <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
                    {/* Bridge the context into the Canvas */}
                    <KeyboardContext.Provider value={contextValue}>
                        <Suspense fallback={<Loader />}>
                            <PerspectiveCamera
                                makeDefault
                                position={[0, 0, 0]}
                                fov={70}
                                near={0.1}
                                far={100}
                            />
                            {/* Scene Background - Cool Dark Lifted Black matching Fog */}
                            <color attach="background" args={["#101215"]} />
                            <CameraController />
                            <JoyceBayersRoom />

                            {/* Fog for atmosphere - Cool/Dark per grading brief */}
                            <fog attach="fog" args={["#101215", 3, 12]} />
                        </Suspense>
                    </KeyboardContext.Provider>
                </Canvas>
            </div>
        </KeyboardContext.Provider>
    )
}
