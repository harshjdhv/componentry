"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef } from "react";

interface NewtonFringeProps {
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
    vec3 spectrum(float x){
      // compact visible-spectrum ramp
      vec3 c = vec3(0.5) + vec3(0.5) * cos(6.28318 * (vec3(0.00, 0.33, 0.67) + x));
      return c * c;
    }
    void main(){
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float t = u_time * 0.10;
      vec2 c1 = vec2(-0.28 + sin(t * 0.6) * 0.08, 0.10);
      vec2 c2 = vec2( 0.34, -0.06 + cos(t * 0.5) * 0.08);
      float r1 = length(p - c1);
      float r2 = length(p - c2);
      // optical path difference of the air film; two sources superpose
      float phase = (r1 * r1) * 9.0 - (r2 * r2) * 4.0 + t * 3.0;
      float fringe = 0.5 + 0.5 * cos(phase);
      vec3 tint = spectrum(fract(phase * 0.06));
      float rings = pow(fringe, 3.0);
      float fall = smoothstep(1.9, 0.05, min(r1, r2) * 1.1);
      vec3 col = vec3(0.008, 0.008, 0.010);
      col += tint * rings * 0.55 * fall;
      col += tint * fringe * 0.08 * fall;
      // contact shadows at the two centres
      col *= 0.55 + 0.65 * smoothstep(0.0, 0.12, min(r1, r2));
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
`;

export function NewtonFringe({ className, speed = 1.0 }: NewtonFringeProps) {
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
        console.error("NewtonFringe shader error:", gl.getShaderInfoLog(shader));
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
      console.error("NewtonFringe link error:", gl.getProgramInfoLog(program));
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
