"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

// Dot matrix patterns for each character (5x7 grid)
const DOT_MATRIX: Record<string, number[][]> = {
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  A: [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  C: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  J: [
    [0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
}

interface DotMatrixCharProps {
  char: string
  dotSize?: number
  gap?: number
  activeColor?: string
  inactiveColor?: string
  className?: string
}

function DotMatrixChar({
  char,
  dotSize = 4,
  gap = 2,
  activeColor = "#b4f54e",
  inactiveColor = "rgba(180, 245, 78, 0.1)",
  className,
}: DotMatrixCharProps) {
  const matrix = DOT_MATRIX[char.toUpperCase()] ?? DOT_MATRIX["A"]!
  const width = 5 * dotSize + 4 * gap
  const height = 7 * dotSize + 6 * gap

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      {matrix!.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <rect
            key={`${rowIndex}-${colIndex}`}
            x={colIndex * (dotSize + gap)}
            y={rowIndex * (dotSize + gap)}
            width={dotSize}
            height={dotSize}
            rx={dotSize / 2}
            ry={dotSize / 2}
            fill={cell ? activeColor : inactiveColor}
            style={
              cell
                ? {
                    filter: "drop-shadow(0 0 3px rgba(180, 245, 78, 0.6))",
                  }
                : {}
            }
          />
        ))
      )}
    </svg>
  )
}

interface DotMatrixTextProps {
  text: string
  dotSize?: number
  gap?: number
  charGap?: number
  activeColor?: string
  inactiveColor?: string
  className?: string
}

function DotMatrixText({
  text,
  dotSize = 4,
  gap = 2,
  charGap = 8,
  activeColor = "#b4f54e",
  inactiveColor = "rgba(180, 245, 78, 0.1)",
  className,
}: DotMatrixTextProps) {
  return (
    <div className={cn("flex items-center", className)} style={{ gap: charGap }}>
      {text.split("").map((char, index) => (
        <DotMatrixChar
          key={index}
          char={char}
          dotSize={dotSize}
          gap={gap}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />
      ))}
    </div>
  )
}

function HalftonePattern({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 pointer-events-none", className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="halftone"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="rgba(180, 245, 78, 0.15)" />
        </pattern>
        <linearGradient id="halftone-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="50%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="halftone-mask">
          <rect width="100%" height="100%" fill="url(#halftone-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#halftone)"
        mask="url(#halftone-mask)"
      />
    </svg>
  )
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

function SwapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 16V4m0 0L3 8m4-4l4 4" />
      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  )
}

interface FlightStatusCardProps {
  departureCode?: string
  arrivalCode?: string
  departureCity?: string
  arrivalCity?: string
  departureTime?: string
  arrivalTime?: string
  eta?: string
  timezone?: string
  nextEvent?: string
  nextEventTime?: string
  progress?: number
  remainingTime?: string
  className?: string
}

function FlightStatusCard({
  departureCode = "YYZ",
  arrivalCode = "HND",
  departureCity = "Toronto",
  arrivalCity = "Tokyo",
  departureTime = "MON, 6:14 PM",
  arrivalTime = "TUE, 7:14 AM",
  eta = "ETA 2:15 PM",
  timezone = "Tokyo Time",
  nextEvent = "DINNER IN",
  nextEventTime = "2:34H",
  progress = 45,
  remainingTime = "-7H 01M",
  className,
}: FlightStatusCardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[480px] rounded-[28px] p-6 overflow-hidden",
        "bg-[#1a1a1a] dark:bg-[#1a1a1a]",
        "shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5),0_10px_30px_-5px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]",
        "dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7),0_10px_30px_-5px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]",
        "light:bg-[#f5f5f5] light:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15),0_10px_30px_-5px_rgba(0,0,0,0.1)]",
        className
      )}
      style={{
        background:
          "linear-gradient(145deg, #1e1e1e 0%, #1a1a1a 50%, #161616 100%)",
      }}
    >
      <HalftonePattern className="opacity-60" />

      <div className="relative z-10">
        {/* Airport codes and route */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="flex flex-col items-start">
              <DotMatrixText
                text={departureCode}
                dotSize={5}
                gap={2}
                charGap={6}
              />
              <span className="text-[#8a8a8a] text-sm mt-2 font-medium">
                {departureCity}
              </span>
              <span className="text-[#6a6a6a] text-xs mt-0.5 uppercase tracking-wide">
                {departureTime}
              </span>
            </div>

            {/* Arrow */}
            <div className="flex items-center px-2 mt-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-orange-500"
              >
                <path
                  d="M5 12h14m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Arrival */}
            <div className="flex flex-col items-start">
              <DotMatrixText
                text={arrivalCode}
                dotSize={5}
                gap={2}
                charGap={6}
              />
              <span className="text-[#8a8a8a] text-sm mt-2 font-medium">
                {arrivalCity}
              </span>
              <span className="text-[#6a6a6a] text-xs mt-0.5 uppercase tracking-wide">
                {arrivalTime}
              </span>
            </div>
          </div>

          {/* ETA Panel */}
          <div className="flex flex-col bg-[#252525] rounded-xl p-3 min-w-[130px] border border-[#333]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-semibold">{eta}</span>
              <button className="p-1 hover:bg-[#333] rounded-full transition-colors">
                <SwapIcon className="w-4 h-4 text-[#8a8a8a]" />
              </button>
            </div>
            <span className="text-[#6a6a6a] text-xs">{timezone}</span>
            <span className="text-orange-500 text-xs font-bold mt-1 tracking-wide">
              {nextEvent} {nextEventTime}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4">
          <div className="relative h-12 bg-[#252525] rounded-full overflow-hidden border border-[#333]">
            {/* Progress fill with gradient and glow */}
            <div
              className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
              style={{
                width: `${Math.max(progress, 15)}%`,
                background:
                  "linear-gradient(90deg, #7cb518 0%, #a4de02 50%, #b4f54e 100%)",
                boxShadow:
                  "0 0 20px rgba(180, 245, 78, 0.6), 0 0 40px rgba(180, 245, 78, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
              }}
            >
              {/* Plane icon */}
              <div
                className="relative flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.2)",
                }}
              >
                <PlaneIcon className="w-5 h-5 text-white transform rotate-45" />
              </div>
            </div>

            {/* Glow effect behind progress */}
            <div
              className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
              style={{
                width: `${Math.max(progress, 15)}%`,
                background:
                  "radial-gradient(ellipse at right, rgba(180, 245, 78, 0.4) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
          </div>

          {/* Remaining time */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6a6a6a] text-sm font-mono font-medium">
            {remainingTime}
          </div>
        </div>
      </div>
    </div>
  )
}

// Light mode variant
function FlightStatusCardLight({
  departureCode = "YYZ",
  arrivalCode = "HND",
  departureCity = "Toronto",
  arrivalCity = "Tokyo",
  departureTime = "MON, 6:14 PM",
  arrivalTime = "TUE, 7:14 AM",
  eta = "ETA 2:15 PM",
  timezone = "Tokyo Time",
  nextEvent = "DINNER IN",
  nextEventTime = "2:34H",
  progress = 45,
  remainingTime = "-7H 01M",
  className,
}: FlightStatusCardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[480px] rounded-[28px] p-6 overflow-hidden",
        "bg-[#f8f8f8]",
        "shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15),0_10px_30px_-5px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]",
        className
      )}
      style={{
        background:
          "linear-gradient(145deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)",
      }}
    >
      <HalftoneLightPattern className="opacity-40" />

      <div className="relative z-10">
        {/* Airport codes and route */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="flex flex-col items-start">
              <DotMatrixText
                text={departureCode}
                dotSize={5}
                gap={2}
                charGap={6}
                activeColor="#2d7a2d"
                inactiveColor="rgba(45, 122, 45, 0.15)"
              />
              <span className="text-[#555] text-sm mt-2 font-medium">
                {departureCity}
              </span>
              <span className="text-[#888] text-xs mt-0.5 uppercase tracking-wide">
                {departureTime}
              </span>
            </div>

            {/* Arrow */}
            <div className="flex items-center px-2 mt-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-orange-600"
              >
                <path
                  d="M5 12h14m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Arrival */}
            <div className="flex flex-col items-start">
              <DotMatrixText
                text={arrivalCode}
                dotSize={5}
                gap={2}
                charGap={6}
                activeColor="#2d7a2d"
                inactiveColor="rgba(45, 122, 45, 0.15)"
              />
              <span className="text-[#555] text-sm mt-2 font-medium">
                {arrivalCity}
              </span>
              <span className="text-[#888] text-xs mt-0.5 uppercase tracking-wide">
                {arrivalTime}
              </span>
            </div>
          </div>

          {/* ETA Panel */}
          <div className="flex flex-col bg-white rounded-xl p-3 min-w-[130px] border border-[#e0e0e0] shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#222] text-sm font-semibold">{eta}</span>
              <button className="p-1 hover:bg-[#f0f0f0] rounded-full transition-colors">
                <SwapIcon className="w-4 h-4 text-[#666]" />
              </button>
            </div>
            <span className="text-[#888] text-xs">{timezone}</span>
            <span className="text-orange-600 text-xs font-bold mt-1 tracking-wide">
              {nextEvent} {nextEventTime}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4">
          <div className="relative h-12 bg-[#e8e8e8] rounded-full overflow-hidden border border-[#ddd]">
            {/* Progress fill with gradient */}
            <div
              className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
              style={{
                width: `${Math.max(progress, 15)}%`,
                background:
                  "linear-gradient(90deg, #4a9c4a 0%, #5cb85c 50%, #7ed17e 100%)",
                boxShadow:
                  "0 0 15px rgba(92, 184, 92, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
              }}
            >
              {/* Plane icon */}
              <div
                className="relative flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.3)",
                }}
              >
                <PlaneIcon className="w-5 h-5 text-white transform rotate-45" />
              </div>
            </div>
          </div>

          {/* Remaining time */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] text-sm font-mono font-medium">
            {remainingTime}
          </div>
        </div>
      </div>
    </div>
  )
}

function HalftoneLightPattern({ className }: { className?: string }) {
  return (
    <svg
      className={cn("absolute inset-0 pointer-events-none", className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="halftone-light"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="rgba(45, 122, 45, 0.12)" />
        </pattern>
        <linearGradient
          id="halftone-fade-light"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="halftone-mask-light">
          <rect width="100%" height="100%" fill="url(#halftone-fade-light)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#halftone-light)"
        mask="url(#halftone-mask-light)"
      />
    </svg>
  )
}

// Adaptive component that switches based on theme
function FlightStatusCardAdaptive(props: FlightStatusCardProps) {
  return (
    <>
      <div className="hidden dark:block">
        <FlightStatusCard {...props} />
      </div>
      <div className="block dark:hidden">
        <FlightStatusCardLight {...props} />
      </div>
    </>
  )
}

export {
  FlightStatusCard,
  FlightStatusCardLight,
  FlightStatusCardAdaptive,
  DotMatrixText,
  DotMatrixChar,
}
