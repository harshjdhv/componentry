"use client"

import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface ParticleGalaxyProps {
    className?: string
    /** Number of particles in the galaxy (affects performance) */
    particleCount?: number
    /** Base size of particles */
    particleSize?: number
    /** Speed of automatic rotation */
    rotationSpeed?: number
    /** Number of spiral arms */
    spiralArms?: number
    /** Array of 3 color values for the galaxy */
    colors?: [string, string, string]
    /** Strength of mouse interaction (0-1) */
    mouseInfluence?: number
    /** Enable automatic rotation */
    autoRotate?: boolean
    /** Blend mode: 'additive' for dark backgrounds, 'normal' for light backgrounds */
    blendMode?: "additive" | "normal"
    /** How spread out the galaxy is (1-5) */
    spread?: number
    /** Particle density/opacity (0-1) */
    density?: number
    /** Glow intensity (0-100) */
    glow?: number
    /** Enable gentle camera movement */
    cameraMovement?: boolean
    /** Concentration of particles toward center (0-1) */
    centerConcentration?: number
    /** Enable particle pulsation animation */
    pulsate?: boolean
    /** Speed of particle pulsation (0.1-2) */
    pulsateSpeed?: number
    /** Enable mouse wheel zoom */
    enableZoom?: boolean
    /** Enable click and drag rotation */
    enableDrag?: boolean
    /** Enable touch gestures on mobile */
    enableTouch?: boolean
    /** Rotation damping factor (0-1) - higher = more responsive */
    damping?: number
    /** Min zoom distance */
    minZoom?: number
    /** Max zoom distance */
    maxZoom?: number
}

export function ParticleGalaxy({
    className,
    particleCount = 10000,
    particleSize = 0.02,
    rotationSpeed = 0.001,
    spiralArms = 3,
    colors: colorProp = ["#4f46e5", "#8b5cf6", "#ec4899"],
    mouseInfluence = 0.5,
    autoRotate = true,
    blendMode = "additive",
    spread = 2.5,
    density = 0.7,
    glow = 60,
    cameraMovement = true,
    centerConcentration = 0.5,
    pulsate = true,
    pulsateSpeed = 1,
    enableZoom = true,
    enableDrag = true,
    enableTouch = true,
    damping = 0.1,
    minZoom = 1.5,
    maxZoom = 10,
}: ParticleGalaxyProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const particlesRef = useRef<THREE.Points | null>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const frameRef = useRef<number | undefined>(undefined)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    // 3D interaction state
    const isDraggingRef = useRef(false)
    const previousMouseRef = useRef({ x: 0, y: 0 })
    const targetRotationRef = useRef({ x: 0, y: 0 })
    const currentRotationRef = useRef({ x: 0, y: 0 })
    const currentTiltRef = useRef({ x: 0, y: 0 })
    const targetZoomRef = useRef(3)
    const currentZoomRef = useRef(3)

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return

        const container = containerRef.current

        // Get initial dimensions
        const updateDimensions = () => {
            const rect = container.getBoundingClientRect()
            setDimensions({ width: rect.width, height: rect.height })
        }

        updateDimensions()

        // Setup ResizeObserver
        const resizeObserver = new ResizeObserver(updateDimensions)
        resizeObserver.observe(container)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current || dimensions.width === 0 || dimensions.height === 0)
            return

        const canvas = canvasRef.current
        const container = containerRef.current

        // Scene
        const scene = new THREE.Scene()
        sceneRef.current = scene

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            dimensions.width / dimensions.height,
            0.1,
            1000
        )
        camera.position.z = 3
        cameraRef.current = camera

        // Renderer with transparent background
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true, // Transparent background
            antialias: true,
        })
        renderer.setSize(dimensions.width, dimensions.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        rendererRef.current = renderer

        // Create galaxy particles
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const scales = new Float32Array(particleCount)

        // Convert hex colors to RGB
        const colorPalette = [
            new THREE.Color(colorProp[0]),
            new THREE.Color(colorProp[1]),
            new THREE.Color(colorProp[2]),
        ]

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3

            // Spiral galaxy distribution with customizable spread
            const radius = Math.pow(Math.random(), centerConcentration) * spread
            const spinAngle = radius * spiralArms
            const branchAngle =
                ((i % spiralArms) / spiralArms) * Math.PI * 2 + spinAngle

            // Randomness for organic feel
            const randomnessStrength = 0.3 * (spread / 2.5)
            const randomX =
                Math.pow(Math.random(), 3) *
                (Math.random() < 0.5 ? 1 : -1) *
                randomnessStrength
            const randomY =
                Math.pow(Math.random(), 3) *
                (Math.random() < 0.5 ? 1 : -1) *
                randomnessStrength
            const randomZ =
                Math.pow(Math.random(), 3) *
                (Math.random() < 0.5 ? 1 : -1) *
                randomnessStrength

            positions[i3] = Math.cos(branchAngle) * radius + randomX
            positions[i3 + 1] = randomY
            positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

            // Colors - mix based on distance from center
            const mixedColor = colorPalette[i % 3]!.clone()
            const centerDistance = radius / spread

            // For normal blend mode (light backgrounds), darken colors
            if (blendMode === "normal") {
                mixedColor.lerp(new THREE.Color("#000000"), centerDistance * 0.5)
            } else {
                // For additive blend mode (dark backgrounds), brighten toward center
                mixedColor.lerp(new THREE.Color("#ffffff"), 1 - centerDistance)
            }

            colors[i3] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            // Variable scale for depth
            scales[i] = Math.random()
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1))

        // Custom shader material for better particle rendering
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: particleSize * 100 },
                uGlow: { value: glow / 100 },
                uDensity: { value: density },
                uPulsate: { value: pulsate ? 1.0 : 0.0 },
                uPulsateSpeed: { value: pulsateSpeed },
            },
            vertexShader: `
        uniform float uTime;
        uniform float uSize;
        uniform float uPulsate;
        uniform float uPulsateSpeed;
        attribute float scale;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Pulsate particles if enabled
          if (uPulsate > 0.5) {
            float pulsateValue = sin(uTime * uPulsateSpeed + position.x * 10.0) * 0.5 + 0.5;
            modelPosition.y += pulsateValue * 0.02;
          }
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
          
          gl_PointSize = uSize * scale * (1.0 / -viewPosition.z);
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        uniform float uGlow;
        uniform float uDensity;
        
        void main() {
          // Circular particles with customizable glow
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = uGlow / distanceToCenter - (uGlow * 2.0);
          strength = max(0.0, strength);
          
          gl_FragColor = vec4(vColor, strength * uDensity);
        }
      `,
            transparent: true,
            blending:
                blendMode === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
            depthWrite: false,
            vertexColors: true,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)
        particlesRef.current = particles

        // ===== 3D INTERACTION CONTROLS =====

        // Mouse hover for subtle tilt (only when not dragging)
        const handleMouseMove = (event: MouseEvent) => {
            if (isDraggingRef.current) return
            const rect = container.getBoundingClientRect()
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouseRef.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
        }

        const handleMouseLeave = () => {
            if (!isDraggingRef.current) {
                mouseRef.current.x = 0
                mouseRef.current.y = 0
            }
        }

        // Drag to rotate
        const handleMouseDown = (event: MouseEvent) => {
            if (!enableDrag) return
            isDraggingRef.current = true
            previousMouseRef.current = { x: event.clientX, y: event.clientY }
            container.style.cursor = "grabbing"
        }

        const handleMouseMoveGlobal = (event: MouseEvent) => {
            if (!isDraggingRef.current || !enableDrag) return

            const deltaX = event.clientX - previousMouseRef.current.x
            const deltaY = event.clientY - previousMouseRef.current.y

            targetRotationRef.current.y += deltaX * 0.005
            targetRotationRef.current.x += deltaY * 0.005

            // Clamp vertical rotation
            targetRotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationRef.current.x))

            previousMouseRef.current = { x: event.clientX, y: event.clientY }
        }

        const handleMouseUp = () => {
            if (!enableDrag) return
            isDraggingRef.current = false
            container.style.cursor = enableDrag ? "grab" : "default"
        }

        // Mouse wheel zoom
        const handleWheel = (event: WheelEvent) => {
            if (!enableZoom) return
            event.preventDefault()

            const zoomSpeed = 0.001
            targetZoomRef.current += event.deltaY * zoomSpeed
            targetZoomRef.current = Math.max(minZoom, Math.min(maxZoom, targetZoomRef.current))
        }

        // Touch support
        let touchStartDistance = 0
        let touchStartZoom = 3

        const getTouchDistance = (touches: TouchList) => {
            if (touches.length < 2) return 0
            const dx = touches[0]!.clientX - touches[1]!.clientX
            const dy = touches[0]!.clientY - touches[1]!.clientY
            return Math.sqrt(dx * dx + dy * dy)
        }

        const handleTouchStart = (event: TouchEvent) => {
            if (!enableTouch) return

            if (event.touches.length === 2) {
                // Pinch zoom
                touchStartDistance = getTouchDistance(event.touches)
                touchStartZoom = targetZoomRef.current
            } else if (event.touches.length === 1 && enableDrag) {
                // Single touch drag
                isDraggingRef.current = true
                previousMouseRef.current = {
                    x: event.touches[0]!.clientX,
                    y: event.touches[0]!.clientY,
                }
            }
        }

        const handleTouchMove = (event: TouchEvent) => {
            if (!enableTouch) return

            if (event.touches.length === 2 && enableZoom) {
                // Pinch to zoom
                event.preventDefault()
                const currentDistance = getTouchDistance(event.touches)
                const zoomFactor = touchStartDistance / currentDistance
                targetZoomRef.current = touchStartZoom * zoomFactor
                targetZoomRef.current = Math.max(minZoom, Math.min(maxZoom, targetZoomRef.current))
            } else if (event.touches.length === 1 && isDraggingRef.current && enableDrag) {
                // Drag to rotate
                const deltaX = event.touches[0]!.clientX - previousMouseRef.current.x
                const deltaY = event.touches[0]!.clientY - previousMouseRef.current.y

                targetRotationRef.current.y += deltaX * 0.005
                targetRotationRef.current.x += deltaY * 0.005
                targetRotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationRef.current.x))

                previousMouseRef.current = {
                    x: event.touches[0]!.clientX,
                    y: event.touches[0]!.clientY,
                }
            }
        }

        const handleTouchEnd = () => {
            if (!enableTouch) return
            isDraggingRef.current = false
            touchStartDistance = 0
        }

        // Add event listeners
        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)
        container.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mousemove", handleMouseMoveGlobal)
        document.addEventListener("mouseup", handleMouseUp)
        container.addEventListener("wheel", handleWheel, { passive: false })
        container.addEventListener("touchstart", handleTouchStart, { passive: false })
        container.addEventListener("touchmove", handleTouchMove, { passive: false })
        container.addEventListener("touchend", handleTouchEnd)

        // Set cursor style
        container.style.cursor = enableDrag ? "grab" : "default"

        // Animation
        const clock = new THREE.Clock()
        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update material uniforms
            if (material.uniforms && material.uniforms.uTime) {
                material.uniforms.uTime.value = elapsedTime
            }

            if (particles) {
                // Smooth damping for rotation
                currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * damping
                currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * damping

                // Auto-rotate when enabled and not being dragged
                if (autoRotate && !isDraggingRef.current) {
                    targetRotationRef.current.y += rotationSpeed
                }

                // Calculate target tilt based on mouse position
                const targetTiltX = (!isDraggingRef.current && mouseInfluence > 0) ? mouseRef.current.y * mouseInfluence * 0.3 : 0
                const targetTiltY = (!isDraggingRef.current && mouseInfluence > 0) ? mouseRef.current.x * mouseInfluence * 0.3 : 0

                // Smoothly interpolate current tilt
                const tiltDamping = 0.05
                currentTiltRef.current.x += (targetTiltX - currentTiltRef.current.x) * tiltDamping
                currentTiltRef.current.y += (targetTiltY - currentTiltRef.current.y) * tiltDamping

                // Apply rotation + tilt
                particles.rotation.x = currentRotationRef.current.x + currentTiltRef.current.x
                particles.rotation.y = currentRotationRef.current.y + currentTiltRef.current.y
            }

            // Smooth zoom damping
            currentZoomRef.current += (targetZoomRef.current - currentZoomRef.current) * damping
            camera.position.z = currentZoomRef.current

            // Optional gentle camera movement
            if (cameraMovement && !isDraggingRef.current) {
                camera.position.x = Math.sin(elapsedTime * 0.1) * 0.2
                camera.position.y = Math.cos(elapsedTime * 0.15) * 0.2
            } else if (isDraggingRef.current) {
                // Smoothly return camera to center when dragging
                camera.position.x += (0 - camera.position.x) * 0.1
                camera.position.y += (0 - camera.position.y) * 0.1
            }

            camera.lookAt(scene.position)

            renderer.render(scene, camera)
            frameRef.current = requestAnimationFrame(animate)
        }

        animate()

        // Cleanup
        return () => {
            container.removeEventListener("mousemove", handleMouseMove)
            container.removeEventListener("mouseleave", handleMouseLeave)
            container.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mousemove", handleMouseMoveGlobal)
            document.removeEventListener("mouseup", handleMouseUp)
            container.removeEventListener("wheel", handleWheel)
            container.removeEventListener("touchstart", handleTouchStart)
            container.removeEventListener("touchmove", handleTouchMove)
            container.removeEventListener("touchend", handleTouchEnd)
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [
        dimensions,
        particleCount,
        particleSize,
        rotationSpeed,
        spiralArms,
        colorProp,
        mouseInfluence,
        autoRotate,
        blendMode,
        spread,
        density,
        glow,
        cameraMovement,
        centerConcentration,
        pulsate,
        pulsateSpeed,
        enableZoom,
        enableDrag,
        enableTouch,
        damping,
        minZoom,
        maxZoom,
    ])

    return (
        <div ref={containerRef} className={cn("relative w-full h-full", className)}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    )
}
