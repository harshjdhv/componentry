"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@workspace/ui/lib/utils";

interface PixelCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Size of each pixel cell in pixels */
    gap?: number;
    /** Speed of the trailing decay (higher = faster fade) */
    speed?: number;
    /** Array of colors for pixels - will interpolate through them as trail fades */
    colors?: string[];
    /** Disable mouse tracking */
    noFocus?: boolean;
    /** Variant style */
    variant?: "default" | "trail" | "glow";
}

interface Pixel {
    x: number;
    y: number;
    size: number;
    intensity: number;
    targetIntensity: number;
    colorPhase: number;
}

// Helper to interpolate between two hex colors
function lerpColor(color1: string, color2: string, t: number): string {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    if (!c1 || !c2) return color1;

    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1]!, 16),
            g: parseInt(result[2]!, 16),
            b: parseInt(result[3]!, 16),
        }
        : null;
}

export function PixelCanvas({
    className,
    gap = 6,
    speed = 0.02,
    colors = ["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"],
    noFocus = false,
    variant = "default",
    ...props
}: PixelCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pixelsRef = useRef<Pixel[][]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    const getColorFromIntensity = useCallback((intensity: number, phase: number) => {
        if (colors.length === 0) return "#ffffff";
        if (colors.length === 1) return colors[0]!;

        // Use phase + intensity to create a shifting color effect
        const t = (phase + intensity) % 1;
        const index = Math.floor(t * (colors.length - 1));
        const nextIndex = Math.min(index + 1, colors.length - 1);
        const localT = (t * (colors.length - 1)) % 1;

        const color1 = colors[index];
        const color2 = colors[nextIndex];

        if (!color1) return "#ffffff";
        if (!color2) return color1!;

        return lerpColor(color1, color2, localT);
    }, [colors]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let cols = 0;
        let rows = 0;
        const pixelSize = Math.max(gap, 4);

        const initPixels = () => {
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);

            cols = Math.ceil(rect.width / pixelSize);
            rows = Math.ceil(rect.height / pixelSize);

            const newPixels: Pixel[][] = [];
            for (let i = 0; i < cols; i++) {
                const row: Pixel[] = [];
                for (let j = 0; j < rows; j++) {
                    // Preserve existing intensity if pixel exists
                    const existing = pixelsRef.current[i]?.[j];
                    row.push({
                        x: i * pixelSize,
                        y: j * pixelSize,
                        size: pixelSize - 1,
                        intensity: existing?.intensity ?? 0,
                        targetIntensity: 0,
                        colorPhase: Math.random(), // Random starting phase for color variety
                    });
                }
                newPixels.push(row);
            }
            pixelsRef.current = newPixels;
        };

        const draw = (timestamp: number) => {
            const deltaTime = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            const rect = container.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            const { x: mouseX, y: mouseY } = mouseRef.current;
            const pixels = pixelsRef.current;

            // Influence radius based on variant
            const radius = variant === "glow" ? 120 : 80;
            const glowPasses = variant === "glow" ? 2 : 1;

            // Update pixel states
            for (let i = 0; i < cols; i++) {
                const col = pixels[i];
                if (!col) continue;

                for (let j = 0; j < rows; j++) {
                    const pixel = col[j];
                    if (!pixel) continue;

                    // Calculate distance from mouse
                    const centerX = pixel.x + pixel.size / 2;
                    const centerY = pixel.y + pixel.size / 2;
                    const dx = mouseX - centerX;
                    const dy = mouseY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Set target intensity based on distance
                    if (distance < radius) {
                        const falloff = 1 - (distance / radius);
                        // Smooth falloff curve
                        pixel.targetIntensity = Math.pow(falloff, 1.5);
                    } else {
                        pixel.targetIntensity = 0;
                    }

                    // Smooth interpolation towards target
                    const lerpSpeed = pixel.targetIntensity > pixel.intensity
                        ? 0.3 // Quick light up
                        : speed; // Slow decay for trailing

                    pixel.intensity += (pixel.targetIntensity - pixel.intensity) * lerpSpeed;

                    // Shift color phase slowly for shimmer effect
                    pixel.colorPhase = (pixel.colorPhase + 0.001 * (deltaTime / 16)) % 1;

                    // Only draw if visible
                    if (pixel.intensity > 0.01) {
                        const color = getColorFromIntensity(pixel.intensity, pixel.colorPhase);

                        // Glow effect: draw larger, blurred version first
                        if (variant === "glow" && pixel.intensity > 0.2) {
                            for (let g = glowPasses; g > 0; g--) {
                                const glowSize = pixel.size + g * 4;
                                const glowOffset = (glowSize - pixel.size) / 2;
                                ctx.globalAlpha = pixel.intensity * 0.15 / g;
                                ctx.fillStyle = color;
                                ctx.fillRect(
                                    pixel.x - glowOffset,
                                    pixel.y - glowOffset,
                                    glowSize,
                                    glowSize
                                );
                            }
                        }

                        // Main pixel
                        ctx.globalAlpha = pixel.intensity * 0.9;
                        ctx.fillStyle = color;

                        if (variant === "trail") {
                            // Rounded pixels for trail variant
                            const cornerRadius = pixel.size * 0.3;
                            ctx.beginPath();
                            ctx.roundRect(pixel.x, pixel.y, pixel.size, pixel.size, cornerRadius);
                            ctx.fill();
                        } else {
                            ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
                        }
                    }
                }
            }

            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(draw);
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const onMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                if (touch) {
                    const rect = canvas.getBoundingClientRect();
                    mouseRef.current = {
                        x: touch.clientX - rect.left,
                        y: touch.clientY - rect.top,
                    };
                }
            }
        };

        const onTouchEnd = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        // Initialize
        initPixels();
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(draw);

        // Event listeners
        window.addEventListener("resize", initPixels);
        if (!noFocus) {
            container.addEventListener("mousemove", onMouseMove);
            container.addEventListener("mouseleave", onMouseLeave);
            container.addEventListener("touchmove", onTouchMove, { passive: true });
            container.addEventListener("touchend", onTouchEnd);
        }

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", initPixels);
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseleave", onMouseLeave);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onTouchEnd);
        };
    }, [gap, speed, noFocus, variant, getColorFromIntensity]);

    return (
        <div
            ref={containerRef}
            className={cn("h-full w-full relative overflow-hidden", className)}
            {...props}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
