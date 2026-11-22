"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef } from "react";

interface ChladniPlateProps {
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Sand/particle colour as linear RGB, 0–1 per channel. Default is warm bone. */
  tint?: [number, number, number];
  /** Animation speed multiplier. Default is 1.0 */
  speed?: number;
  /** Sharpness of the nodal lines. Higher is finer sand. Default is 9 */
  focus?: number;
}

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_tint;
  uniform float u_focus;

  const float PI = 3.14159265;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // Standing-wave amplitude on a square plate; sand collects where this is zero.
  float mode(vec2 p, float n, float m) {
    return cos(n * PI * p.x) * cos(m * PI * p.y)
         - cos(m * PI * p.x) * cos(n * PI * p.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 q = p * 0.75;

    float t = u_time * 0.16;
    float s = sin(t) * 0.5 + 0.5;

    // Two plate modes cross-fade, so the figure morphs without snapping
    float a = mode(q, mix(2.0, 7.0, s), mix(3.0, 4.0, s));
    float b = mode(q, mix(5.0, 3.0, s), mix(2.0, 8.0, s));
    float z = mix(a, b, 0.5 + 0.5 * sin(t * 0.7));

    float node = exp(-abs(z) * u_focus);
    float grain = noise(gl_FragCoord.xy * 0.35 + t * 0.4);
    float sand = node * (0.55 + 0.45 * grain);

    float disc = smoothstep(1.05, 0.35, length(p * vec2(1.0, 0.92)));

    vec3 col = vec3(0.012, 0.012, 0.014);
    col += u_tint * sand * 0.70 * disc;
    col += vec3(0.16, 0.17, 0.20) * disc * 0.35;
    col *= 0.55 + 0.60 * disc;

    // dither the near-black field so the soft falloff does not band
    col += (hash(uv * 1024.0) - 0.5) * 0.004;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function ChladniPlate({
  className,
  tint = [0.86, 0.84, 0.78],
  speed = 1.0,
  focus = 9.0,
}: ChladniPlateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tintRef = useRef(tint);
  tintRef.current = tint;
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const focusRef = useRef(focus);
  focusRef.current = focus;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("ChladniPlate shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("ChladniPlate link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const tintLocation = gl.getUniformLocation(program, "u_tint");
    const focusLocation = gl.getUniformLocation(program, "u_focus");

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId = 0;
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    const draw = (elapsed: number) => {
      gl.uniform1f(timeLocation, elapsed);
      const [r, g, b] = tintRef.current;
      gl.uniform3f(tintLocation, r, g, b);
      gl.uniform1f(focusLocation, focusRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = (time: number) => {
      draw(((time - startTime) * 0.001 * speedRef.current) % 240);
      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(6);
    });
    observer.observe(canvas);

    resize();

    if (reduceMotion) {
      // a single representative frame; no animation loop at all
      draw(6);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      const lose = gl.getExtension("WEBGL_lose_context");
      lose?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block h-full w-full", className)}
      style={{ touchAction: "none" }}
      aria-hidden="true"
    />
  );
}
