"use client";

/**
 * Paper Shaders — Neuro Noise
 * Copyright 2026 Paper
 * SPDX-License-Identifier: Apache-2.0
 * https://github.com/paper-design/shaders
 *
 * Modified by Componentry: the upstream shader and presets are mounted through
 * a dependency-free React/WebGL2 canvas implementation in this file.
 */

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";

const VERTEX_SHADER = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_patternUV;

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  v_patternUV = uv;
  v_patternUV += graphicOffset;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV *= .01;
}`;

// Vendored verbatim from Paper Shaders 0.0.77, except template interpolation
// was expanded into ordinary GLSL so the component can run without the package.
const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;

in vec2 v_patternUV;

out vec4 fragColor;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuroShape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= (1.2);
  }
  return res.x + res.y;
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .13;

  float t = .5 * u_time;

  float noise = neuroShape(shape_uv, t);

  noise = (1. + u_brightness) * noise * noise;
  noise = pow(noise, .7 + 6. * u_contrast);
  noise = min(1.4, noise);

  float blend = smoothstep(0.7, 1.4, noise);

  vec4 frontC = u_colorFront;
  frontC.rgb *= frontC.a;
  vec4 midC = u_colorMid;
  midC.rgb *= midC.a;
  vec4 blendFront = mix(midC, frontC, blend);

  float safeNoise = max(noise, 0.0);
  vec3 color = blendFront.rgb * safeNoise;
  float opacity = clamp(blendFront.a * safeNoise, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  fragColor = vec4(color, opacity);
}`;

export type ShaderBackgroundVariant =
  | "default"
  | "sensation"
  | "bloodstream"
  | "ghost"
  | "water";

interface ShaderPreset {
  speed: number;
  frame: number;
  colorFront: string;
  colorMid: string;
  colorBack: string;
  brightness: number;
  contrast: number;
  scale: number;
}

export const SHADER_BACKGROUND_PRESETS: Record<
  ShaderBackgroundVariant,
  ShaderPreset
> = {
  default: {
    speed: 1,
    frame: 0,
    colorFront: "#ffffff",
    colorMid: "#47a6ff",
    colorBack: "#000000",
    brightness: 0.05,
    contrast: 0.3,
    scale: 1,
  },
  sensation: {
    speed: 1,
    frame: 0,
    colorFront: "#00c8ff",
    colorMid: "#fbff00",
    colorBack: "#8b42ff",
    brightness: 0.19,
    contrast: 0.12,
    scale: 3,
  },
  bloodstream: {
    speed: 1,
    frame: 0,
    colorFront: "#ff0000",
    colorMid: "#ff0000",
    colorBack: "#ffffff",
    brightness: 0.24,
    contrast: 0.17,
    scale: 0.7,
  },
  ghost: {
    speed: 1,
    frame: 0,
    colorFront: "#ffffff",
    colorMid: "#000000",
    colorBack: "#ffffff",
    brightness: 0,
    contrast: 1,
    scale: 0.55,
  },
  water: {
    speed: 0.42,
    frame: 0,
    colorFront: "#f2ffff",
    colorMid: "#5b9eaa",
    colorBack: "#06171b",
    brightness: 0.08,
    contrast: 0.52,
    scale: 0.72,
  },
};

export interface ShaderBackgroundProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  variant?: ShaderBackgroundVariant;
  speed?: number;
  frame?: number;
  colorFront?: string;
  colorMid?: string;
  colorBack?: string;
  brightness?: number;
  contrast?: number;
  scale?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  minPixelRatio?: number;
  maxPixelCount?: number;
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Shader compilation failed.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function parseColor(color: string, fallback: string): [number, number, number, number] {
  const value = /^#?[\da-f]{6}([\da-f]{2})?$/i.test(color.trim())
    ? color.replace("#", "")
    : fallback.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
    value.length === 8 ? parseInt(value.slice(6, 8), 16) / 255 : 1,
  ];
}

export function ShaderBackground({
  variant = "ghost",
  speed,
  frame,
  colorFront,
  colorMid,
  colorBack,
  brightness,
  contrast,
  scale,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  minPixelRatio = 2,
  maxPixelCount = 1920 * 1080 * 4,
  className,
  style,
  ...props
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const preset = SHADER_BACKGROUND_PRESETS[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let animationFrame = 0;

    try {
      vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      if (!program) throw new Error("Unable to create WebGL program.");
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Shader linking failed.");
      }
      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const uniforms = {
        resolution: gl.getUniformLocation(program, "u_resolution"),
        pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
        time: gl.getUniformLocation(program, "u_time"),
        scale: gl.getUniformLocation(program, "u_scale"),
        rotation: gl.getUniformLocation(program, "u_rotation"),
        offsetX: gl.getUniformLocation(program, "u_offsetX"),
        offsetY: gl.getUniformLocation(program, "u_offsetY"),
        colorFront: gl.getUniformLocation(program, "u_colorFront"),
        colorMid: gl.getUniformLocation(program, "u_colorMid"),
        colorBack: gl.getUniformLocation(program, "u_colorBack"),
        brightness: gl.getUniformLocation(program, "u_brightness"),
        contrast: gl.getUniformLocation(program, "u_contrast"),
      };

      const activeSpeed = speed ?? preset.speed;
      const initialFrame = frame ?? preset.frame;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const startedAt = performance.now();
      let renderScale = 1;

      const resize = () => {
        const width = Math.max(1, container.clientWidth);
        const height = Math.max(1, container.clientHeight);
        const targetScale = Math.max(window.devicePixelRatio || 1, minPixelRatio);
        const headroom = Math.sqrt(maxPixelCount / (width * height * targetScale * targetScale));
        renderScale = targetScale * Math.min(1, headroom);
        canvas.width = Math.round(width * renderScale);
        canvas.height = Math.round(height * renderScale);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();

      const front = parseColor(colorFront ?? preset.colorFront, preset.colorFront);
      const mid = parseColor(colorMid ?? preset.colorMid, preset.colorMid);
      const back = parseColor(colorBack ?? preset.colorBack, preset.colorBack);

      const render = (now: number) => {
        const elapsed = reduceMotion.matches ? 0 : (now - startedAt) * activeSpeed;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.pixelRatio, renderScale);
        gl.uniform1f(uniforms.time, (initialFrame + elapsed) * 0.001);
        gl.uniform1f(uniforms.scale, scale ?? preset.scale);
        gl.uniform1f(uniforms.rotation, rotation);
        gl.uniform1f(uniforms.offsetX, offsetX);
        gl.uniform1f(uniforms.offsetY, offsetY);
        gl.uniform4fv(uniforms.colorFront, front);
        gl.uniform4fv(uniforms.colorMid, mid);
        gl.uniform4fv(uniforms.colorBack, back);
        gl.uniform1f(uniforms.brightness, brightness ?? preset.brightness);
        gl.uniform1f(uniforms.contrast, contrast ?? preset.contrast);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (!reduceMotion.matches && activeSpeed !== 0 && !document.hidden) {
          animationFrame = requestAnimationFrame(render);
        }
      };

      const handleVisibility = () => {
        cancelAnimationFrame(animationFrame);
        if (!document.hidden) animationFrame = requestAnimationFrame(render);
      };

      document.addEventListener("visibilitychange", handleVisibility);
      animationFrame = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
        document.removeEventListener("visibilitychange", handleVisibility);
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
      };
    } catch {
      setFailed(true);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    }
  }, [
    brightness,
    colorBack,
    colorFront,
    colorMid,
    contrast,
    frame,
    maxPixelCount,
    minPixelRatio,
    offsetX,
    offsetY,
    preset,
    rotation,
    scale,
    speed,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative isolate h-full w-full overflow-hidden", className)}
      style={{ backgroundColor: colorBack ?? preset.colorBack, ...style }}
      {...props}
    >
      {!failed && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full"
        />
      )}
    </div>
  );
}
