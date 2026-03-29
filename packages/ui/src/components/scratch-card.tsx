"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  /** Content revealed after scratching */
  children: React.ReactNode;
  /** Width of the card */
  width?: number;
  /** Height of the card */
  height?: number;
  /** Brush radius for scratching */
  brushSize?: number;
  /** Percentage of area scratched to trigger full reveal (0-100) */
  revealThreshold?: number;
  /** Callback when card is fully revealed */
  onReveal?: () => void;
  /** Callback with current scratch percentage */
  onScratchProgress?: (percentage: number) => void;
  /** Overlay color or gradient preset */
  overlay?: "silver" | "gold" | "holographic" | "dark";
  /** Additional CSS classes */
  className?: string;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Particle intensity multiplier (0 = off, 1 = normal, 2 = intense) */
  particleIntensity?: number;
}

// ─── Overlay configs ───

const OVERLAY_CONFIGS = {
  silver: {
    gradient: [
      { offset: 0, color: "#e8e8e8" },
      { offset: 0.2, color: "#d4d4d8" },
      { offset: 0.4, color: "#c0c0c0" },
      { offset: 0.6, color: "#b8b8bc" },
      { offset: 0.8, color: "#d1d1d6" },
      { offset: 1, color: "#a8a8ad" },
    ],
    noiseOpacity: 0.12,
    shineColor: "rgba(255, 255, 255, 0.25)",
    particleColors: ["#e8e8e8", "#c0c0c0", "#d4d4d8", "#ffffff", "#a8a8ad", "#b0b0b5"],
    glowColor: "rgba(255, 255, 255, 0.6)",
  },
  gold: {
    gradient: [
      { offset: 0, color: "#f5e6a3" },
      { offset: 0.2, color: "#e6c84d" },
      { offset: 0.4, color: "#d4a84b" },
      { offset: 0.6, color: "#e8d068" },
      { offset: 0.8, color: "#c9a84c" },
      { offset: 1, color: "#b8942a" },
    ],
    noiseOpacity: 0.1,
    shineColor: "rgba(255, 248, 220, 0.3)",
    particleColors: ["#f5e6a3", "#e6c84d", "#ffd700", "#fff8dc", "#d4a84b", "#c9a84c"],
    glowColor: "rgba(255, 215, 0, 0.5)",
  },
  holographic: {
    gradient: [
      { offset: 0, color: "#c4b5fd" },
      { offset: 0.15, color: "#93c5fd" },
      { offset: 0.3, color: "#6ee7b7" },
      { offset: 0.5, color: "#fde68a" },
      { offset: 0.65, color: "#fca5a5" },
      { offset: 0.8, color: "#c4b5fd" },
      { offset: 1, color: "#93c5fd" },
    ],
    noiseOpacity: 0.08,
    shineColor: "rgba(255, 255, 255, 0.35)",
    particleColors: ["#c4b5fd", "#93c5fd", "#6ee7b7", "#fde68a", "#fca5a5", "#f0abfc"],
    glowColor: "rgba(196, 181, 253, 0.5)",
  },
  dark: {
    gradient: [
      { offset: 0, color: "#2a2a2e" },
      { offset: 0.2, color: "#3a3a3f" },
      { offset: 0.4, color: "#28282d" },
      { offset: 0.6, color: "#3d3d42" },
      { offset: 0.8, color: "#2f2f34" },
      { offset: 1, color: "#1f1f24" },
    ],
    noiseOpacity: 0.15,
    shineColor: "rgba(255, 255, 255, 0.08)",
    particleColors: ["#5a5a5f", "#4a4a4f", "#6a6a6f", "#8a8a8f", "#3a3a3f", "#7a7a7f"],
    glowColor: "rgba(150, 150, 160, 0.4)",
  },
};

type OverlayConfig = (typeof OVERLAY_CONFIGS)[keyof typeof OVERLAY_CONFIGS];

// Padding around the card where particles can drift
const PARTICLE_OVERFLOW = 60;

// ─── Particle system (realistic debris physics) ───

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  angularDrag: number;
  color: string;
  shape: "shaving" | "dust" | "flake" | "residue";
  shimmerPhase: number;
  shimmerSpeed: number;
  gravity: number;
  drag: number;
  settled: boolean; // has this particle come to rest?
  groundY: number; // y position where this particle "settles"
  opacity: number;
}

function pickColor(config: OverlayConfig): string {
  return config.particleColors[
    Math.floor(Math.random() * config.particleColors.length)
  ]!;
}

/**
 * Create a debris particle that behaves like real scratch-off material.
 *
 * Real scratch cards produce:
 * - Curled shavings that roll/tumble and settle nearby
 * - Fine dust that drifts slowly
 * - Flakes that peel and flutter down
 * - Residue that barely moves from the scratch point
 *
 * Most debris stays CLOSE to the scratch — it doesn't explode outward.
 */
function createParticle(
  x: number,
  y: number,
  scratchVx: number,
  scratchVy: number,
  scratchSpeed: number,
  brushRadius: number,
  config: OverlayConfig,
  cardHeight: number
): Particle {
  const scratchAngle = Math.atan2(scratchVy, scratchVx);

  // Most particles eject perpendicular to scratch direction (scraped aside)
  // with a bias in the scratch direction (pushed forward)
  const side = Math.random() > 0.5 ? 1 : -1;
  const perpAngle = scratchAngle + (Math.PI / 2) * side;
  const spread = (Math.random() - 0.5) * 1.2;
  const ejectAngle = perpAngle + spread;

  // Spawn near brush edge
  const edgeOffset = brushRadius * (0.3 + Math.random() * 0.7);
  const spawnAngle = ejectAngle + (Math.random() - 0.5) * 0.4;
  const sx = x + Math.cos(spawnAngle) * edgeOffset;
  const sy = y + Math.sin(spawnAngle) * edgeOffset;

  // Energy is LOW — real debris doesn't fly far
  const energy = Math.min(scratchSpeed, 25) * 0.3;

  // Weighted shape selection — mostly dust and residue (like real scratching)
  const roll = Math.random();
  let shape: Particle["shape"];
  if (roll < 0.30) shape = "residue"; // barely moves, stays at scratch site
  else if (roll < 0.60) shape = "dust"; // fine motes, drift slowly
  else if (roll < 0.82) shape = "flake"; // thin peels, flutter
  else shape = "shaving"; // curled strips, tumble and roll

  let size: number;
  let maxLife: number;
  let gravity: number;
  let drag: number;
  let ejectSpeed: number;
  let angularDrag: number;

  switch (shape) {
    case "residue":
      // Stays almost exactly where scratched — just slight displacement
      size = 0.5 + Math.random() * 1.5;
      maxLife = 80 + Math.random() * 120;
      gravity = 0.005;
      drag = 0.85; // high drag — barely moves
      ejectSpeed = (0.1 + energy * 0.05) * Math.random();
      angularDrag = 0.9;
      break;
    case "dust":
      // Fine motes — drift slowly, affected by air
      size = 0.3 + Math.random() * 1.0;
      maxLife = 60 + Math.random() * 80;
      gravity = 0.015 + Math.random() * 0.01;
      drag = 0.975;
      ejectSpeed = (0.3 + energy * 0.15) * (0.3 + Math.random() * 0.7);
      angularDrag = 0.99;
      break;
    case "flake":
      // Thin peels — flutter/leaf-like fall
      size = 1.5 + Math.random() * 3;
      maxLife = 50 + Math.random() * 60;
      gravity = 0.06 + Math.random() * 0.04;
      drag = 0.965;
      ejectSpeed = (0.8 + energy * 0.2) * (0.4 + Math.random() * 0.6);
      angularDrag = 0.96;
      break;
    case "shaving":
      // Curled metallic strips — heavier, tumble, settle
      size = 2 + Math.random() * 3.5;
      maxLife = 40 + Math.random() * 40;
      gravity = 0.18 + Math.random() * 0.12;
      drag = 0.955;
      ejectSpeed = (0.6 + energy * 0.15) * (0.5 + Math.random() * 0.5);
      angularDrag = 0.97;
      break;
  }

  // Where this particle will "settle" (come to rest) — near or below the scratch point
  const groundY = sy + 10 + Math.random() * (cardHeight - sy + 30);

  return {
    x: sx,
    y: sy,
    vx: Math.cos(ejectAngle) * ejectSpeed + scratchVx * 0.03, // slight drag from scratch motion
    vy: Math.sin(ejectAngle) * ejectSpeed * 0.5 - 0.2, // slight upward then falls
    life: maxLife,
    maxLife,
    size,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * (shape === "shaving" ? 0.4 : 0.15),
    angularDrag,
    color: pickColor(config),
    shape,
    shimmerPhase: Math.random() * Math.PI * 2,
    shimmerSpeed: 0.08 + Math.random() * 0.12,
    gravity,
    drag,
    settled: false,
    groundY,
    opacity: 1,
  };
}

function updateParticle(p: Particle): boolean {
  p.life--;
  if (p.life <= 0) return false;

  if (p.settled) {
    // Settled particles just fade out slowly
    p.opacity -= 0.003;
    p.shimmerPhase += p.shimmerSpeed * 0.3;
    return p.opacity > 0;
  }

  // Apply drag (air resistance)
  p.vx *= p.drag;
  p.vy *= p.drag;

  // Gravity
  p.vy += p.gravity;

  // Shape-specific behaviors
  if (p.shape === "dust") {
    // Brownian motion — random air currents
    p.vx += (Math.random() - 0.5) * 0.08;
    p.vy += (Math.random() - 0.5) * 0.04;
  } else if (p.shape === "flake") {
    // Flutter — sinusoidal horizontal drift (like a leaf)
    p.vx += Math.sin(p.shimmerPhase * 2.5) * 0.06;
    // Air resistance causes oscillation in fall speed
    p.vy += Math.sin(p.shimmerPhase * 1.7) * 0.02;
  } else if (p.shape === "shaving") {
    // Tumbling creates slight lateral drift
    p.vx += Math.sin(p.rotation) * 0.02;
  }

  // Move
  p.x += p.vx;
  p.y += p.vy;

  // Settle when reaching ground level and moving slowly
  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  if (p.y >= p.groundY && speed < 1.5) {
    p.settled = true;
    p.y = p.groundY;
    p.vx = 0;
    p.vy = 0;
  }

  // Rotation with angular drag (tumbling slows over time)
  p.rotationSpeed *= p.angularDrag;
  p.rotation += p.rotationSpeed;

  // Shimmer
  p.shimmerPhase += p.shimmerSpeed;

  return true;
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  _glowColor: string
) {
  const lifeRatio = p.life / p.maxLife;
  // Fade out in last 20% of life
  const lifeFade = lifeRatio < 0.2 ? lifeRatio / 0.2 : 1;
  // Fade in over first 2 frames
  const fadeIn = Math.min(1, (p.maxLife - p.life) / 2);
  const finalAlpha = lifeFade * fadeIn * p.opacity;
  if (finalAlpha <= 0.01) return;

  const shimmer = 0.5 + Math.sin(p.shimmerPhase) * 0.5;

  ctx.save();
  ctx.globalAlpha = finalAlpha;

  switch (p.shape) {
    case "shaving": {
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Curled metallic strip — irregular elongated shape
      const s = p.size;
      const curl = Math.sin(p.shimmerPhase * 0.5) * 0.3; // simulates 3D curl

      ctx.beginPath();
      // Draw a curved strip shape
      ctx.moveTo(-s * 0.15, -s * 0.8);
      ctx.quadraticCurveTo(s * 0.5 + curl * s, -s * 0.3, s * 0.3, s * 0.1);
      ctx.quadraticCurveTo(s * 0.1, s * 0.6, -s * 0.2, s * 0.7);
      ctx.quadraticCurveTo(-s * 0.5 - curl * s, s * 0.2, -s * 0.35, -s * 0.3);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.fill();

      // Subtle metallic highlight on one edge
      ctx.globalAlpha = finalAlpha * (0.2 + shimmer * 0.3);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-s * 0.15, -s * 0.8);
      ctx.quadraticCurveTo(s * 0.5 + curl * s, -s * 0.3, s * 0.3, s * 0.1);
      ctx.stroke();
      break;
    }

    case "flake": {
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // 3D tumble — squash factor simulates viewing angle
      const squash = 0.15 + Math.abs(Math.cos(p.rotation * 1.3)) * 0.85;
      ctx.scale(1, squash);

      // Thin irregular shape
      ctx.fillStyle = p.color;
      ctx.globalAlpha = finalAlpha * (0.6 + shimmer * 0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight
      ctx.globalAlpha = finalAlpha * shimmer * 0.35;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(
        -p.size * 0.1,
        -p.size * 0.05,
        p.size * 0.3,
        p.size * 0.12,
        -0.2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      break;
    }

    case "dust": {
      // Soft tiny dot — almost invisible
      ctx.globalAlpha = finalAlpha * 0.4;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "residue": {
      // Tiny smudge that stays at the scratch site
      ctx.globalAlpha = finalAlpha * 0.25;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

// ─── Overlay drawing ───

function drawOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: OverlayConfig,
  borderRadius: number
) {
  ctx.save();

  if (borderRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, borderRadius);
    ctx.clip();
  }

  const baseGradient = ctx.createLinearGradient(0, 0, width, height);
  for (const stop of config.gradient) {
    baseGradient.addColorStop(stop.offset, stop.color);
  }
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  // Diagonal shine band
  const shineGradient = ctx.createLinearGradient(0, 0, width, 0);
  shineGradient.addColorStop(0, "transparent");
  shineGradient.addColorStop(0.3, "transparent");
  shineGradient.addColorStop(0.5, config.shineColor);
  shineGradient.addColorStop(0.7, "transparent");
  shineGradient.addColorStop(1, "transparent");
  ctx.fillStyle = shineGradient;
  ctx.fillRect(0, 0, width, height);

  // Noise grain texture
  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.width = width;
  noiseCanvas.height = height;
  const noiseCtx = noiseCanvas.getContext("2d")!;
  const imageData = noiseCtx.createImageData(width, height);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = config.noiseOpacity * 255;
  }
  noiseCtx.putImageData(imageData, 0, 0);
  ctx.drawImage(noiseCanvas, 0, 0);

  // Brushed metal lines
  ctx.globalAlpha = 0.04;
  for (let y = 0; y < height; y += 2) {
    ctx.strokeStyle = y % 4 === 0 ? "#fff" : "#000";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y + Math.random() * 0.5);
    ctx.lineTo(width, y + Math.random() * 0.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // "SCRATCH HERE" text
  ctx.globalCompositeOperation = "source-over";
  const fontSize = Math.min(width, height) * 0.06;
  ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillText("SCRATCH HERE", width / 2, height / 2 + 1.5);
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fillText("SCRATCH HERE", width / 2, height / 2);

  // Inner border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  if (borderRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, height - 2, borderRadius - 1);
    ctx.stroke();
  } else {
    ctx.strokeRect(1, 1, width - 2, height - 2);
  }

  ctx.restore();
}

// ─── Realistic scratch brush ───

/**
 * Draws a directional, textured scratch mark.
 *
 * Real coin-scratch behavior:
 * - The erased area is elongated in the direction of movement
 * - Edges are rough and irregular (not a clean circle)
 * - Slow scratching gives a wider, more thorough removal
 * - Fast scratching gives a narrower streak with rough edges
 * - Multiple passes over the same area clean it up further
 */
function drawBrush(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  angle: number, // direction of scratch movement
  speed: number // how fast the scratch is moving
) {
  ctx.globalCompositeOperation = "destination-out";

  // Speed affects shape: slow = rounder (more pressure), fast = elongated streak
  const speedFactor = Math.min(speed / 15, 1);
  const elongation = 1 + speedFactor * 0.8; // up to 1.8x longer in movement direction
  const squeeze = 1 - speedFactor * 0.25; // slightly narrower when fast

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Main scratch area — elongated ellipse with soft edges
  const rx = radius * elongation;
  const ry = radius * squeeze;

  // Core removal (strong)
  const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
  coreGrad.addColorStop(0, "rgba(0,0,0,1)");
  coreGrad.addColorStop(0.5, "rgba(0,0,0,0.97)");
  coreGrad.addColorStop(0.75, "rgba(0,0,0,0.6)");
  coreGrad.addColorStop(0.9, "rgba(0,0,0,0.15)");
  coreGrad.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rough edge spatter — irregular dots around the edge for that "scraped" look
  const numDots = 4 + Math.floor(Math.random() * 5);
  for (let i = 0; i < numDots; i++) {
    const a = Math.random() * Math.PI * 2;
    const dist = (0.5 + Math.random() * 0.6) * Math.max(rx, ry);
    const dotR = 0.5 + Math.random() * 2;
    const dotAlpha = 0.2 + Math.random() * 0.5;

    ctx.fillStyle = `rgba(0,0,0,${dotAlpha})`;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * dist, Math.sin(a) * dist, dotR, 0, Math.PI * 2);
    ctx.fill();
  }

  // Scratch grain lines — thin lines in scratch direction for texture
  if (speed > 3) {
    const numLines = 2 + Math.floor(Math.random() * 3);
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    for (let i = 0; i < numLines; i++) {
      const ly = (Math.random() - 0.5) * ry * 1.2;
      const lx1 = -rx * (0.3 + Math.random() * 0.5);
      const lx2 = rx * (0.3 + Math.random() * 0.5);
      ctx.lineWidth = 0.3 + Math.random() * 0.8;
      ctx.beginPath();
      ctx.moveTo(lx1, ly);
      ctx.lineTo(lx2, ly + (Math.random() - 0.5) * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

// ─── Component ───

export function ScratchCard({
  children,
  width = 360,
  height = 200,
  brushSize = 30,
  revealThreshold = 70,
  onReveal,
  onScratchProgress,
  overlay = "silver",
  className,
  borderRadius = 16,
  particleIntensity = 1,
}: ScratchCardProps) {
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const hasRevealedRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const particleRafRef = useRef<number | null>(null);
  const calcRafRef = useRef<number | null>(null);

  // Track accumulated scratch velocity for smooth direction
  const velocityRef = useRef({ vx: 0, vy: 0, speed: 0 });

  const config = OVERLAY_CONFIGS[overlay];

  const pCanvasW = width + PARTICLE_OVERFLOW * 2;
  const pCanvasH = height + PARTICLE_OVERFLOW * 2;

  // ─── Init scratch canvas ───
  useEffect(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.scale(dpr, dpr);
    drawOverlay(ctx, width, height, config, borderRadius);
  }, [width, height, config, borderRadius]);

  // ─── Init particle canvas ───
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = pCanvasW * dpr;
    canvas.height = pCanvasH * dpr;
  }, [pCanvasW, pCanvasH]);

  // ─── Particle animation loop ───
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d")!;
    let running = true;

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(PARTICLE_OVERFLOW, PARTICLE_OVERFLOW);

      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        if (updateParticle(p)) {
          if (
            p.x > -PARTICLE_OVERFLOW &&
            p.x < pCanvasW &&
            p.y > -PARTICLE_OVERFLOW &&
            p.y < pCanvasH
          ) {
            drawParticle(ctx, p, config.glowColor);
          }
          alive.push(p);
        }
      }
      particlesRef.current = alive;

      ctx.restore();
      particleRafRef.current = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      running = false;
      if (particleRafRef.current) cancelAnimationFrame(particleRafRef.current);
    };
  }, [config.glowColor, pCanvasW, pCanvasH]);

  // ─── Scratch percentage ───
  const calculateScratchPercentage = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i]! < 128) transparent++;
    }
    return (transparent / (data.length / 16)) * 100;
  }, []);

  // ─── Haptic feedback ───
  const triggerHaptic = useCallback((intensity: "light" | "medium") => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(intensity === "light" ? 1 : 3);
    }
  }, []);

  // ─── Spawn particles ───
  const spawnParticles = useCallback(
    (x: number, y: number, vx: number, vy: number) => {
      if (particleIntensity <= 0) return;

      const speed = Math.sqrt(vx * vx + vy * vy);
      // Fewer particles than before — real debris is subtle
      const count = Math.floor(
        Math.max(1, (1 + speed * 0.3) * particleIntensity)
      );

      for (let i = 0; i < count; i++) {
        particlesRef.current.push(
          createParticle(x, y, vx, vy, speed, brushSize, config, height)
        );
      }

      // Cap total particles
      if (particlesRef.current.length > 600) {
        particlesRef.current = particlesRef.current.slice(-400);
      }
    },
    [brushSize, config, particleIntensity, height]
  );

  // ─── Handle scratch ───
  const handleScratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = scratchCanvasRef.current;
      if (!canvas || isRevealed) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      lastTimeRef.current = now;

      let vx = 0;
      let vy = 0;

      if (lastPointRef.current) {
        const rawVx = x - lastPointRef.current.x;
        const rawVy = y - lastPointRef.current.y;
        const dist = Math.sqrt(rawVx * rawVx + rawVy * rawVy);

        if (dist < 0.3) {
          // Barely moved — press in place, heavier removal
          drawBrush(ctx, x, y, brushSize * 1.1, 0, 0);
          lastPointRef.current = { x, y };
          return;
        }

        // Smooth velocity using exponential moving average
        const smoothing = 0.3;
        vx = velocityRef.current.vx * smoothing + rawVx * (1 - smoothing);
        vy = velocityRef.current.vy * smoothing + rawVy * (1 - smoothing);
        const speed = Math.sqrt(vx * vx + vy * vy);
        velocityRef.current = { vx, vy, speed };

        const angle = Math.atan2(vy, vx);

        // Interpolate brush along stroke for continuous coverage
        const steps = Math.max(1, Math.floor(dist / (brushSize * 0.25)));
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          drawBrush(
            ctx,
            lastPointRef.current.x + rawVx * t,
            lastPointRef.current.y + rawVy * t,
            brushSize,
            angle,
            speed
          );
        }

        // Spawn debris along stroke — not every pixel, realistically spaced
        const pSpacing = 8 + Math.random() * 4;
        const pSteps = Math.max(1, Math.floor(dist / pSpacing));
        for (let i = 0; i <= pSteps; i++) {
          const t = i / pSteps;
          spawnParticles(
            lastPointRef.current.x + rawVx * t,
            lastPointRef.current.y + rawVy * t,
            vx,
            vy
          );
        }

        // Haptic: light feedback proportional to speed
        if (speed > 2 && dt > 30) {
          triggerHaptic("light");
        }
      } else {
        // First touch — single press
        drawBrush(ctx, x, y, brushSize, 0, 0);
        // Small amount of residue from initial press
        for (let i = 0; i < Math.ceil(2 * particleIntensity); i++) {
          const a = Math.random() * Math.PI * 2;
          particlesRef.current.push(
            createParticle(x, y, Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0.5, brushSize, config, height)
          );
        }
        triggerHaptic("medium");
      }

      lastPointRef.current = { x, y };

      // Throttled percentage check
      if (calcRafRef.current) cancelAnimationFrame(calcRafRef.current);
      calcRafRef.current = requestAnimationFrame(() => {
        const pct = calculateScratchPercentage();
        onScratchProgress?.(pct);

        if (pct >= revealThreshold && !hasRevealedRef.current) {
          hasRevealedRef.current = true;
          // Gentle reveal — debris falls from remaining overlay, not an explosion
          for (let i = 0; i < Math.ceil(25 * particleIntensity); i++) {
            const bx = Math.random() * width;
            const by = Math.random() * height * 0.6; // mostly from upper portion
            const fallAngle = Math.PI / 2 + (Math.random() - 0.5) * 0.4; // mostly downward
            particlesRef.current.push(
              createParticle(
                bx, by,
                Math.cos(fallAngle) * 0.5,
                Math.sin(fallAngle) * 0.5,
                0.5,
                brushSize, config, height
              )
            );
          }
          triggerHaptic("medium");
          setIsRevealed(true);
          onReveal?.();
        }
      });
    },
    [
      brushSize,
      isRevealed,
      revealThreshold,
      calculateScratchPercentage,
      onReveal,
      onScratchProgress,
      spawnParticles,
      particleIntensity,
      width,
      height,
      config,
      triggerHaptic,
    ]
  );

  // ─── Input handlers ───

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDrawingRef.current = true;
      lastPointRef.current = null;
      lastTimeRef.current = performance.now();
      velocityRef.current = { vx: 0, vy: 0, speed: 0 };
      handleScratch(e.clientX, e.clientY);
    },
    [handleScratch]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawingRef.current) return;
      handleScratch(e.clientX, e.clientY);
    },
    [handleScratch]
  );

  const handleMouseUp = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      isDrawingRef.current = true;
      lastPointRef.current = null;
      lastTimeRef.current = performance.now();
      velocityRef.current = { vx: 0, vy: 0, speed: 0 };
      const touch = e.touches[0];
      if (!touch) return;
      handleScratch(touch.clientX, touch.clientY);
    },
    [handleScratch]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;
      handleScratch(touch.clientX, touch.clientY);
    },
    [handleScratch]
  );

  const handleTouchEnd = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (calcRafRef.current) cancelAnimationFrame(calcRafRef.current);
    };
  }, []);

  // Global up listeners
  useEffect(() => {
    const up = () => {
      isDrawingRef.current = false;
      lastPointRef.current = null;
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      className={cn("relative inline-block select-none overflow-visible", className)}
      style={{ width, height, borderRadius }}
    >
      {/* Content layer */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius }}>
        <div className="flex h-full w-full items-center justify-center">
          {children}
        </div>
      </div>

      {/* Scratch overlay canvas */}
      <canvas
        ref={scratchCanvasRef}
        className={cn(
          "absolute inset-0 touch-none transition-opacity duration-700",
          isRevealed && "pointer-events-none opacity-0"
        )}
        style={{
          width,
          height,
          borderRadius,
          cursor: isRevealed ? "default" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Particle canvas — extends beyond card bounds for debris overflow */}
      <canvas
        ref={particleCanvasRef}
        className="pointer-events-none absolute"
        style={{
          width: pCanvasW,
          height: pCanvasH,
          top: -PARTICLE_OVERFLOW,
          left: -PARTICLE_OVERFLOW,
        }}
      />

      {/* Premium shadow overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius,
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.1),
            0 2px 8px rgba(0,0,0,0.12),
            0 8px 24px rgba(0,0,0,0.08)
          `,
        }}
      />
    </div>
  );
}
