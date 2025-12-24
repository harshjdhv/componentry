"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  spotlightColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  glowIntensity?: number
}

function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(120, 119, 198, 0.3)",
  borderColor,
  borderWidth = 1,
  borderRadius = 16,
  glowIntensity = 0.15,
  ...props
}: SpotlightCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)
  const [opacity, setOpacity] = React.useState(0)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    []
  )

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true)
    setOpacity(1)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false)
    setOpacity(0)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900",
        "dark:from-neutral-950 dark:to-neutral-900",
        "transition-all duration-500",
        className
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      {...props}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          background: borderColor
            ? borderColor
            : `conic-gradient(
                from 225deg,
                rgba(120, 119, 198, 0.9),
                rgba(120, 119, 198, 0.1) 25%,
                rgba(255, 255, 255, 0.15) 50%,
                rgba(120, 119, 198, 0.1) 75%,
                rgba(120, 119, 198, 0.9)
              )`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Spotlight effect */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          width: "400px",
          height: "400px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          opacity: opacity * glowIntensity * 5,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          borderRadius: `${borderRadius}px`,
          opacity: isHovered ? 0.5 : 0,
          boxShadow: `inset 0 0 30px rgba(120, 119, 198, 0.1), 0 0 30px rgba(120, 119, 198, 0.1)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface SpotlightCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SpotlightCardContent({
  children,
  className,
  ...props
}: SpotlightCardContentProps) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
}

interface SpotlightCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SpotlightCardHeader({
  children,
  className,
  ...props
}: SpotlightCardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)} {...props}>
      {children}
    </div>
  )
}

interface SpotlightCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

function SpotlightCardTitle({
  children,
  className,
  ...props
}: SpotlightCardTitleProps) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold leading-none tracking-tight text-white",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

interface SpotlightCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

function SpotlightCardDescription({
  children,
  className,
  ...props
}: SpotlightCardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-neutral-400", className)}
      {...props}
    >
      {children}
    </p>
  )
}

// A more advanced variant with multiple spotlight sources
interface MultiSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  colors?: string[]
  borderRadius?: number
}

function MultiSpotlightCard({
  children,
  className,
  colors = [
    "rgba(120, 119, 198, 0.4)",
    "rgba(255, 77, 77, 0.3)",
    "rgba(77, 255, 174, 0.3)",
  ],
  borderRadius = 16,
  ...props
}: MultiSpotlightCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    []
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden bg-neutral-950",
        "border border-neutral-800",
        "transition-all duration-500",
        className
      )}
      style={{ borderRadius: `${borderRadius}px` }}
      {...props}
    >
      {/* Multiple spotlight layers */}
      {colors.map((color, index) => (
        <div
          key={index}
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            left: position.x + (index - 1) * 50,
            top: position.y + (index - 1) * 50,
            width: "300px",
            height: "300px",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Beam spotlight effect - creates a beam of light that follows cursor
interface BeamSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  beamColor?: string
  beamWidth?: number
  borderRadius?: number
}

function BeamSpotlightCard({
  children,
  className,
  beamColor = "rgba(120, 119, 198, 0.5)",
  beamWidth = 200,
  borderRadius = 16,
  ...props
}: BeamSpotlightCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    []
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden bg-neutral-950",
        "border border-neutral-800",
        "transition-all duration-500",
        className
      )}
      style={{ borderRadius: `${borderRadius}px` }}
      {...props}
    >
      {/* Vertical beam */}
      <div
        className="absolute pointer-events-none transition-all duration-150"
        style={{
          left: position.x - beamWidth / 2,
          top: 0,
          width: `${beamWidth}px`,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${beamColor}, transparent)`,
          opacity: isHovered ? 0.6 : 0,
          filter: "blur(20px)",
        }}
      />

      {/* Horizontal beam */}
      <div
        className="absolute pointer-events-none transition-all duration-150"
        style={{
          left: 0,
          top: position.y - beamWidth / 2,
          width: "100%",
          height: `${beamWidth}px`,
          background: `linear-gradient(180deg, transparent, ${beamColor}, transparent)`,
          opacity: isHovered ? 0.4 : 0,
          filter: "blur(20px)",
        }}
      />

      {/* Intersection glow */}
      <div
        className="absolute pointer-events-none transition-all duration-150"
        style={{
          left: position.x,
          top: position.y,
          width: "100px",
          height: "100px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${beamColor} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Gradient follow card - the background gradient follows the cursor
interface GradientFollowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  gradientColors?: [string, string, string]
  borderRadius?: number
}

function GradientFollowCard({
  children,
  className,
  gradientColors = ["#7877c6", "#5eead4", "#f472b6"],
  borderRadius = 16,
  ...props
}: GradientFollowCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPosition({ x, y })
    },
    []
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden",
        "transition-all duration-500",
        className
      )}
      style={{ borderRadius: `${borderRadius}px` }}
      {...props}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(
              600px circle at ${position.x}% ${position.y}%,
              ${gradientColors[0]}40,
              transparent 40%
            ),
            radial-gradient(
              400px circle at ${position.x + 10}% ${position.y - 10}%,
              ${gradientColors[1]}30,
              transparent 40%
            ),
            radial-gradient(
              300px circle at ${position.x - 10}% ${position.y + 10}%,
              ${gradientColors[2]}20,
              transparent 40%
            )
          `,
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      {/* Base background */}
      <div
        className="absolute inset-0 bg-neutral-950/90"
        style={{ borderRadius: `${borderRadius}px` }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          borderRadius: `${borderRadius}px`,
          border: "1px solid",
          borderColor: isHovered
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(255, 255, 255, 0.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Tilt card with 3D perspective
interface TiltSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxTilt?: number
  perspective?: number
  scale?: number
  borderRadius?: number
  glareOpacity?: number
}

function TiltSpotlightCard({
  children,
  className,
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  borderRadius = 16,
  glareOpacity = 0.2,
  ...props
}: TiltSpotlightCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [transform, setTransform] = React.useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })
  const [glarePosition, setGlarePosition] = React.useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const rotateY = ((mouseX - centerX) / centerX) * maxTilt
      const rotateX = -((mouseY - centerY) / centerY) * maxTilt

      setTransform({ rotateX, rotateY, scale })
      setGlarePosition({
        x: (mouseX / rect.width) * 100,
        y: (mouseY / rect.height) * 100,
      })
    },
    [maxTilt, scale]
  )

  const handleMouseLeave = React.useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 })
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden bg-neutral-950",
        "border border-neutral-800",
        "transition-[border-color] duration-500",
        isHovered && "border-neutral-700",
        className
      )}
      style={{
        borderRadius: `${borderRadius}px`,
        perspective: `${perspective}px`,
        transform: `
          perspective(${perspective}px)
          rotateX(${transform.rotateX}deg)
          rotateY(${transform.rotateY}deg)
          scale(${transform.scale})
        `,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
      }}
      {...props}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%,
              rgba(255, 255, 255, ${glareOpacity}) 0%,
              transparent 50%
            )
          `,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export {
  SpotlightCard,
  SpotlightCardContent,
  SpotlightCardHeader,
  SpotlightCardTitle,
  SpotlightCardDescription,
  MultiSpotlightCard,
  BeamSpotlightCard,
  GradientFollowCard,
  TiltSpotlightCard,
}
