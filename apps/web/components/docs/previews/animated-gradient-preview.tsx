"use client";

import { AnimatedGradient } from "@workspace/ui/components/animated-gradient";
import type { GradientConfig } from "@workspace/ui/components/animated-gradient";

interface AnimatedGradientPreviewProps {
    config?: GradientConfig;
}

export function AnimatedGradientPreview({
    config = { preset: "Aurora" }
}: AnimatedGradientPreviewProps) {
    return (
        <div className="relative h-[55vh] lg:h-full w-full bg-[#f3f4f6] dark:bg-[#09090b]">
            <div className="relative h-full w-full overflow-hidden rounded-none border-none">
                <AnimatedGradient config={config} noise={{ opacity: 0.2, scale: 1 }} className="!min-h-full" style={{ minHeight: "100%" }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 text-center">
                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                        Animated
                    </h2>
                    <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] mt-2 pb-2 pr-4">
                        Gradient
                    </h2>
                </div>
            </div>
        </div>
    );
}
