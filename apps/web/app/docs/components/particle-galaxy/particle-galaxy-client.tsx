"use client"

import { useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"
import { ParticleGalaxy } from "@workspace/ui/components/particle-galaxy"

interface ParticleGalaxyDemoProps {
    particleCount?: number
    particleSize?: number
    rotationSpeed?: number
    spiralArms?: number
    colors?: [string, string, string]
    mouseInfluence?: number
    autoRotate?: boolean
    blendMode?: "additive" | "normal"
    spread?: number
    density?: number
    glow?: number
    cameraMovement?: boolean
    centerConcentration?: number
    pulsate?: boolean
    pulsateSpeed?: number
    enableZoom?: boolean
    enableDrag?: boolean
    enableTouch?: boolean
    damping?: number
    minZoom?: number
    maxZoom?: number
}

export function ParticleGalaxyDemo(props: ParticleGalaxyDemoProps) {
    const [key, setKey] = useState(0)
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Automatically switch to normal blend mode in light theme if not specified
    // ensuring visibility on white backgrounds
    const effectiveBlendMode = props.blendMode || (mounted && resolvedTheme === "light" ? "normal" : "additive")

    return (
        <div className="relative w-full h-full group">
            <button
                onClick={() => setKey((prev) => prev + 1)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:scale-110 transition-all cursor-pointer"
                aria-label="Reload galaxy"
            >
                <RotateCcw className="w-4 h-4 text-black dark:text-white" />
            </button>
            <ParticleGalaxy key={key} {...props} blendMode={effectiveBlendMode} />
        </div>
    )
}
