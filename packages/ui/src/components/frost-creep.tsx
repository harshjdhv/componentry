"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef } from "react";

interface FrostCreepProps {
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Animation speed multiplier. Default is 1.0 */
  speed?: number;
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
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    void main(){
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float t = u_time * 0.035;
      float n = noise(p * 3.0 + t);
      vec2 q = p * 2.4;
      float r1 = 1.0 - abs(noise(q + n) * 2.0 - 1.0);
      float r2 = 1.0 - abs(noise(q * 2.1 - n) * 2.0 - 1.0);
      float ridge = pow(r1 * r2, 5.0);
      float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
      float grow = smoothstep(0.38, 0.01, edge + noise(p * 1.6) * 0.18);
      float crystal = ridge * grow;
      vec3 col = vec3(0.010, 0.014, 0.021);
      col += vec3(0.70, 0.84, 1.0) * crystal * 1.15;
      col += vec3(0.05, 0.09, 0.15) * grow * 0.5;
      col *= 0.65 + 0.65 * smoothstep(1.5, 0.0, length(p * vec2(0.85, 1.0)));
      gl_FragColor = vec4(col, 1.0);
    }
`;

export function FrostCreep({ className, speed = 1.0 }: FrostCreepProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;

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
        console.error("FrostCreep shader error:", gl.getShaderInfoLog(shader));
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
      console.error("FrostCreep link error:", gl.getProgramInfoLog(program));
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
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = (time: number) => {
      draw(((time - startTime) * 0.001 * speedRef.current) % 600);
      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(7);
    });
    observer.observe(canvas);

    resize();

    if (reduceMotion) {
      draw(7);
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
      gl.getExtension("WEBGL_lose_context")?.loseContext();
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
