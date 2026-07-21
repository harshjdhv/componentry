"use client"

import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef, type HTMLAttributes, type PointerEvent } from "react"

export interface AsciiEffectProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  imageSrc: string
  alt?: string
  variant?: "image" | "flow" | "glitch"
  chars?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: number | string
  lineHeight?: number
  characterSpacing?: number
  brightnessBoost?: number
  contrast?: number
  threshold?: number
  posterize?: number
  dither?: "none" | "floyd-steinberg" | "bayer"
  ditherStrength?: number
  flowSpeed?: number
  flowDirection?: number
  flowStrength?: number
  flowFrequency?: number
  mouseRadius?: number
  mouseStrength?: number
  mouseWaveSpeed?: number
  scale?: number
  fit?: "cover" | "contain" | "stretch"
  colors?: string[]
  colorMode?: "gradient" | "source"
  backgroundColor?: string
  invert?: boolean
  glitchIntensity?: number
  glitchFrequency?: number
  revealDuration?: number
}

export type AsciiPresetProps = Omit<AsciiEffectProps, "variant">

const IMAGE_COLORS = ["#f4f4f5", "#a1a1aa"]
const FLOW_COLORS = ["#e2e8f0", "#67e8f9", "#818cf8"]
const GLITCH_COLORS = ["#ecfccb", "#a3e635", "#22d3ee"]

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function parseHex(color: string) {
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color)
  return match
    ? [Number.parseInt(match[1]!, 16), Number.parseInt(match[2]!, 16), Number.parseInt(match[3]!, 16)]
    : null
}

function gradientColor(colors: string[], amount: number) {
  if (colors.length < 2) return colors[0] ?? "#ffffff"

  const position = clamp(amount) * (colors.length - 1)
  const index = Math.min(Math.floor(position), colors.length - 2)
  const mix = position - index
  const from = parseHex(colors[index]!)
  const to = parseHex(colors[index + 1]!)
  if (!from || !to) return colors[Math.round(position)] ?? colors[0]!

  return `rgb(${from.map((channel, i) => Math.round(channel + (to[i]! - channel) * mix)).join(", ")})`
}

export function AsciiEffect({
  imageSrc,
  alt = "ASCII rendering",
  variant = "image",
  chars = " .:-=+*#%@",
  fontSize = 9,
  fontFamily = "Arial, Helvetica, sans-serif",
  fontWeight = 400,
  lineHeight = 1,
  characterSpacing = 1,
  brightnessBoost = 2.2,
  contrast = 1.1,
  threshold = 0.06,
  posterize = 32,
  dither = "floyd-steinberg",
  ditherStrength = 0.8,
  flowSpeed = 0.22,
  flowDirection = 0,
  flowStrength = 12,
  flowFrequency = 0.018,
  mouseRadius = 150,
  mouseStrength = 22,
  mouseWaveSpeed = 1.2,
  scale = 1.15,
  fit = "cover",
  colors = IMAGE_COLORS,
  colorMode = "gradient",
  backgroundColor = "#07090d",
  invert = false,
  glitchIntensity = 0.65,
  glitchFrequency = 1.4,
  revealDuration = 1400,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: AsciiEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas || chars.length === 0) return

    const context = canvas.getContext("2d")
    const sampleCanvas = document.createElement("canvas")
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true })
    if (!context || !sampleContext) return

    const image = new Image()
    image.crossOrigin = "anonymous"
    let frame = 0
    let width = 0
    let height = 0
    let startedAt = 0
    let nextGlitchAt = 0
    let glitchUntil = 0
    let glitchBands = new Map<number, number>()
    let loaded = false
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (loaded) draw(performance.now())
    }

    const updateGlitch = (now: number, rows: number) => {
      if (variant !== "glitch" || reduceMotion || glitchFrequency <= 0 || now < nextGlitchAt) return

      glitchBands = new Map()
      const bandCount = Math.max(1, Math.round(clamp(glitchIntensity) * 4))
      for (let band = 0; band < bandCount; band++) {
        const start = Math.floor(Math.random() * rows)
        const size = 1 + Math.floor(Math.random() * 3)
        const offset = (Math.random() - 0.5) * fontSize * 12 * clamp(glitchIntensity)
        for (let row = start; row < Math.min(rows, start + size); row++) glitchBands.set(row, offset)
      }
      glitchUntil = now + 70 + 90 * clamp(glitchIntensity)
      nextGlitchAt = now + 1000 / glitchFrequency
    }

    const draw = (now: number) => {
      if (!loaded || width === 0 || height === 0) return

      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.08
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.08

      const cellHeight = Math.max(4, fontSize * Math.max(0.5, lineHeight))
      context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      const cellWidth = Math.max(2, context.measureText("M").width * Math.max(0.5, characterSpacing))
      const columns = Math.ceil(width / cellWidth) + 2
      const rows = Math.ceil(height / cellHeight) + 2
      const radians = flowDirection * Math.PI / 180
      const directionX = Math.cos(radians)
      const directionY = Math.sin(radians)
      sampleCanvas.width = columns
      sampleCanvas.height = rows

      const imageScale = fit === "stretch"
        ? 1
        : (fit === "contain"
            ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
            : Math.max(width / image.naturalWidth, height / image.naturalHeight)) * Math.max(0.1, scale)
      const drawWidth = fit === "stretch" ? columns : image.naturalWidth * imageScale / cellWidth
      const drawHeight = fit === "stretch" ? rows : image.naturalHeight * imageScale / cellHeight
      sampleContext.clearRect(0, 0, columns, rows)
      sampleContext.drawImage(
        image,
        (columns - drawWidth) / 2,
        (rows - drawHeight) / 2,
        drawWidth,
        drawHeight,
      )

      const pixels = sampleContext.getImageData(0, 0, columns, rows).data
      const steps = Math.max(2, Math.round(posterize))
      const luminanceField = new Float32Array(columns * rows)
      for (let index = 0; index < luminanceField.length; index++) {
        const pixel = index * 4
        const alpha = pixels[pixel + 3]! / 255
        let luminance = (pixels[pixel]! * 0.2126 + pixels[pixel + 1]! * 0.7152 + pixels[pixel + 2]! * 0.0722) / 255
        luminance = clamp((luminance - 0.5) * Math.max(0, contrast) + 0.5)
        luminance = clamp(luminance * brightnessBoost * alpha)
        luminanceField[index] = luminance <= threshold ? 0 : (luminance - threshold) / Math.max(0.001, 1 - threshold)
      }

      if (dither === "floyd-steinberg") {
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            const index = row * columns + column
            const oldValue = clamp(luminanceField[index]!)
            const quantized = Math.round(oldValue * (steps - 1)) / (steps - 1)
            const value = oldValue + (quantized - oldValue) * clamp(ditherStrength)
            const error = oldValue - value
            luminanceField[index] = value
            if (column + 1 < columns) luminanceField[index + 1]! += error * 7 / 16
            if (row + 1 < rows) {
              if (column > 0) luminanceField[index + columns - 1]! += error * 3 / 16
              luminanceField[index + columns]! += error * 5 / 16
              if (column + 1 < columns) luminanceField[index + columns + 1]! += error / 16
            }
          }
        }
      } else if (dither === "bayer") {
        const matrix = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            const index = row * columns + column
            const offset = (matrix[(row % 4) * 4 + column % 4]! / 16 - 0.5) * clamp(ditherStrength) / 4
            luminanceField[index] = clamp(luminanceField[index]! + offset)
          }
        }
      } else {
        for (let index = 0; index < luminanceField.length; index++) {
          luminanceField[index] = Math.round(clamp(luminanceField[index]!) * (steps - 1)) / (steps - 1)
        }
      }

      const reveal = variant === "glitch" && !reduceMotion && revealDuration > 0
        ? clamp((now - startedAt) / revealDuration)
        : 1

      updateGlitch(now, rows)
      if (now > glitchUntil) glitchBands.clear()

      context.fillStyle = backgroundColor
      context.fillRect(0, 0, width, height)
      context.textBaseline = "top"

      for (let row = 0; row < rows; row++) {
        const rowOffset = glitchBands.get(row) ?? 0
        for (let column = 0; column < columns; column++) {
          const dx = column / Math.max(1, columns - 1) - 0.5
          const dy = row / Math.max(1, rows - 1) - 0.5
          if (Math.hypot(dx, dy) > reveal * 0.72) continue

          let sourceColumn = column
          let sourceRow = row
          let mouseInfluence = 0
          if (variant === "flow" && !reduceMotion) {
            const x = column * cellWidth
            const y = row * cellHeight
            const phase = (x * directionX + y * directionY) * flowFrequency + now * flowSpeed * Math.PI * 0.002
            const crossPhase = (-x * directionY + y * directionX) * flowFrequency * 0.65
            const drift = (Math.sin(phase) + Math.sin(phase * 0.61 + crossPhase) * 0.45) * flowStrength
            let mouseDisplacement = 0

            if (pointer.current.active && mouseRadius > 0) {
              const mouseX = x - pointer.current.x
              const mouseY = y - pointer.current.y
              const distance = Math.hypot(mouseX, mouseY)
              mouseInfluence = clamp(1 - distance / mouseRadius)
              if (distance > 0 && mouseInfluence > 0) {
                const ripple = Math.sin(distance * 0.055 - now * mouseWaveSpeed * Math.PI * 0.002)
                mouseDisplacement = mouseInfluence ** 2 * mouseStrength * ripple
                sourceColumn -= mouseX / distance * mouseDisplacement / cellWidth
                sourceRow -= mouseY / distance * mouseDisplacement / cellHeight
              }
            }

            sourceColumn -= directionX * drift / cellWidth
            sourceRow -= directionY * drift / cellHeight
          }

          const sampledColumn = Math.round(clamp(sourceColumn, 0, columns - 1))
          const sampledRow = Math.round(clamp(sourceRow, 0, rows - 1))
          const sampleIndex = sampledRow * columns + sampledColumn
          const pixel = sampleIndex * 4
          let luminance = clamp(luminanceField[sampleIndex]! + mouseInfluence * 0.08)
          if (invert) luminance = 1 - luminance

          const character = chars[Math.min(chars.length - 1, Math.floor(luminance * (chars.length - 1)))]
          if (!character?.trim()) continue

          context.fillStyle = colorMode === "source"
            ? `rgb(${pixels[pixel]}, ${pixels[pixel + 1]}, ${pixels[pixel + 2]})`
            : gradientColor(colors, luminance)
          context.fillText(character, column * cellWidth - cellWidth + rowOffset, row * cellHeight - cellHeight)
        }
      }
    }

    const animate = (now: number) => {
      draw(now)
      if (!reduceMotion && variant !== "image") frame = requestAnimationFrame(animate)
    }

    const start = () => {
      if (loaded) return
      loaded = true
      startedAt = performance.now()
      resize()
      if (!reduceMotion && variant !== "image") frame = requestAnimationFrame(animate)
    }
    image.onload = start
    image.src = imageSrc
    if (image.complete) start()

    const observer = new ResizeObserver(resize)
    observer.observe(container)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      image.onload = null
    }
  }, [backgroundColor, brightnessBoost, characterSpacing, chars, colorMode, colors, contrast, dither, ditherStrength, fit, flowDirection, flowFrequency, flowSpeed, flowStrength, fontFamily, fontSize, fontWeight, glitchFrequency, glitchIntensity, imageSrc, invert, lineHeight, mouseRadius, mouseStrength, mouseWaveSpeed, posterize, revealDuration, scale, threshold, variant])

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event)
    if (variant !== "flow") return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (!pointer.current.active) {
      pointer.current.x = x
      pointer.current.y = y
    }
    pointer.current.active = true
    pointer.current.targetX = x
    pointer.current.targetY = y
  }

  const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event)
    pointer.current.active = false
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative size-full overflow-hidden", className)}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      {...props}
    >
      <canvas ref={canvasRef} role="img" aria-label={alt} className="block size-full" />
    </div>
  )
}

export function AsciiImage(props: AsciiPresetProps) {
  return <AsciiEffect {...props} variant="image" colors={props.colors ?? IMAGE_COLORS} />
}

export function AsciiFlow(props: AsciiPresetProps) {
  return <AsciiEffect {...props} variant="flow" colors={props.colors ?? FLOW_COLORS} />
}

export function AsciiGlitch(props: AsciiPresetProps) {
  return <AsciiEffect {...props} variant="glitch" colors={props.colors ?? GLITCH_COLORS} />
}
