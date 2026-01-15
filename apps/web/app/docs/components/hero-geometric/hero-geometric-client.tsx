"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import HeroGeometric from "@workspace/ui/components/hero-geometric"
import { cn } from "@/lib/utils"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-serif",
})

interface HeroGeometricDemoProps {
    title1?: string;
    title2?: string;
    description?: string;
    color1?: string;
    color2?: string;
    speed?: number;
}

export function HeroGeometricDemo({
    title1,
    title2,
    description,
    color1,
    color2,
    speed,
}: HeroGeometricDemoProps) {
    const [key, setKey] = useState(0)

    return (
        <div className="relative">
            <div className={cn("max-w-full rounded-xl rounded-b-none overflow-hidden aspect-video w-full border border-black/5 dark:border-white/5 shadow-2xl group relative", instrumentSerif.variable)}>
                <button
                    onClick={() => setKey((prev) => prev + 1)}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-black hover:scale-110 transition-all cursor-pointer"
                    aria-label="Reload animation"
                >
                    <RotateCcw className="w-4 h-4 text-black dark:text-white" />
                </button>
                <HeroGeometric
                    key={key}
                    title1={title1}
                    title2={title2}
                    description={description}
                    color1={color1}
                    color2={color2}
                    speed={speed}
                    className="min-h-full"
                />
            </div>
        </div>
    )
}
