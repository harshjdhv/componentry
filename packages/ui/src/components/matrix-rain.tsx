"use client"

import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef } from "react"

interface MatrixRainProps {
    className?: string
    variant?: "default" | "cyan" | "rainbow"
    width?: number
    height?: number
    fontSize?: number
    speed?: number
    fixedColor?: string
}

export function MatrixRain({
    className,
    variant = "default",
    width,
    height,
    fontSize = 16,
    speed = 50,
    fixedColor,
}: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // If specific dimensions are provided, use them. Otherwise observe parent.
        const resizeObserver = new ResizeObserver(() => {
            if (!width && !height) {
                canvas.width = canvas.offsetWidth
                canvas.height = canvas.offsetHeight
            }
        })
        resizeObserver.observe(canvas)

        // Initial size setup
        if (width) canvas.width = width
        if (height) canvas.height = height
        if (!width && !height) {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const w = canvas.width
        const h = canvas.height

        // Columns config
        const columns = Math.floor(w / fontSize)
        const drops = new Array(columns).fill(1)

        // Character set: Katakana + Numbers
        const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890"

        const colors: Record<string, string> = {
            default: "#0F0",
            cyan: "#0FF",
            rainbow: ""
        }

        const draw = () => {
            // Semi-transparent black for trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)] || ""

                // Color selection
                if (variant === "rainbow" && !fixedColor) {
                    const hue = (Date.now() / 20 + i * 10) % 360
                    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
                } else {
                    ctx.fillStyle = fixedColor || colors[variant] || "#0F0"
                }

                const x = i * fontSize
                const y = drops[i] * fontSize

                ctx.fillText(text, x, y)

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                drops[i]++
            }
        }

        const interval = setInterval(draw, speed)

        return () => {
            clearInterval(interval)
            resizeObserver.disconnect()
        }
    }, [variant, fontSize, speed, fixedColor, width, height])

    return (
        <canvas
            ref={canvasRef}
            className={cn("size-full bg-black block rounded-[inherit]", className)}
            style={{ width, height }}
        />
    )
}
