"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import DitherPrismHero from "@workspace/ui/components/dither-prism-hero";
import { cn } from "@/lib/utils";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-serif",
});

interface DitherPrismHeroPreviewProps {
    title1?: string;
    title2?: string;
    description?: string;
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    ditherIntensity?: number;
    prismIntensity?: number;
    mouseIntensity?: number;
    showParticles?: boolean;
    particleCount?: number;
}

function DitherPrismHeroPreviewWrapper({
    title1 = "Experience",
    title2 = "The Future",
    description,
    color1,
    color2,
    color3,
    speed,
    ditherIntensity,
    prismIntensity,
    mouseIntensity,
    showParticles,
    particleCount,
}: DitherPrismHeroPreviewProps) {
    const [key, setKey] = useState(0);

    return (
        <div className="relative">
            <div
                className={cn(
                    "max-w-full overflow-hidden aspect-video w-full group relative",
                    instrumentSerif.variable
                )}
            >
                <button
                    onClick={() => setKey((prev) => prev + 1)}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:scale-110 transition-all cursor-pointer"
                    aria-label="Reload animation"
                >
                    <RotateCcw className="w-4 h-4 text-white" />
                </button>
                <DitherPrismHero
                    key={key}
                    title1={title1}
                    title2={title2}
                    description={description}
                    color1={color1}
                    color2={color2}
                    color3={color3}
                    speed={speed}
                    ditherIntensity={ditherIntensity}
                    prismIntensity={prismIntensity}
                    mouseIntensity={mouseIntensity}
                    showParticles={showParticles}
                    particleCount={particleCount}
                    className="min-h-full"
                />
            </div>
        </div>
    );
}

// Default demo - vibrant purple/pink theme
export function DitherPrismHeroDemo() {
    return (
        <DitherPrismHeroPreviewWrapper
            title1="Experience"
            title2="The Future"
            description="Move your cursor to interact"
        />
    );
}

// Cyberpunk theme - neon green/cyan
export function DitherPrismHeroCyberpunkDemo() {
    return (
        <DitherPrismHeroPreviewWrapper
            color1="#0a0a0a"
            color2="#00ff88"
            color3="#00ffff"
            title1="Cyber"
            title2="Punk"
            ditherIntensity={0.25}
            prismIntensity={0.7}
        />
    );
}

// Sunset theme - warm oranges and reds
export function DitherPrismHeroSunsetDemo() {
    return (
        <DitherPrismHeroPreviewWrapper
            color1="#1a0a0a"
            color2="#ff6b35"
            color3="#ffd93d"
            title1="Golden"
            title2="Hour"
            ditherIntensity={0.12}
            prismIntensity={0.4}
        />
    );
}

// Ocean theme - deep blues and teals
export function DitherPrismHeroOceanDemo() {
    return (
        <DitherPrismHeroPreviewWrapper
            color1="#0a1628"
            color2="#0ea5e9"
            color3="#22d3ee"
            title1="Deep"
            title2="Ocean"
            speed={0.7}
            showParticles={true}
            particleCount={100}
        />
    );
}

// Maximum intensity - for showcase
export function DitherPrismHeroIntenseDemo() {
    return (
        <DitherPrismHeroPreviewWrapper
            ditherIntensity={0.3}
            prismIntensity={0.9}
            mouseIntensity={1.0}
            speed={1.5}
            title1="Maximum"
            title2="Impact"
        />
    );
}
