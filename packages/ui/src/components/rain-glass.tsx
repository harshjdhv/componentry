"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef } from "react";

interface RainGlassProps {
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
    // the out-of-focus city behind the glass
    vec3 backdrop(vec2 uv, float t){
      vec3 col = vec3(0.010, 0.011, 0.014);
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec2 c = vec2(0.12 + 0.20 * fi + sin(t * 0.3 + fi) * 0.05, 0.45 + 0.22 * sin(fi * 2.3 + t * 0.2));
        float d = length((uv - c) * vec2(1.6, 1.0));
        vec3 tint = i == 0 ? vec3(0.95, 0.42, 0.18)
                  : i == 1 ? vec3(0.20, 0.55, 0.95)
                  : i == 2 ? vec3(0.85, 0.30, 0.55)
                  : i == 3 ? vec3(0.95, 0.75, 0.30)
                           : vec3(0.30, 0.85, 0.65);
        col += tint * exp(-d * d * 22.0) * 0.35;
      }
      return col;
    }
    void main(){
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float t = u_time * 0.25;
      vec2 g = uv * vec2(9.0, 6.0);
      g.y += t * 0.35;
      vec2 id = floor(g), f = fract(g) - 0.5;
      // each cell may hold a drop, with its own radius and position
      vec2 rnd = vec2(hash(id), hash(id + 5.7));
      vec2 c = (rnd - 0.5) * 0.55;
      float radius = 0.16 + 0.20 * hash(id + 2.3);
      vec2 d = f - c;
      float dist = length(d);
      float drop = smoothstep(radius, radius * 0.72, dist);
      // droplet acts as a lens: sample the backdrop shifted toward its centre
      vec2 refr = uv - normalize(d + 1e-5) * (radius - dist) * 0.11;
      vec3 behind = backdrop(refr, t);
      vec3 col = backdrop(uv, t) * 0.55;
      vec3 lensed = behind * 1.35;
      lensed += pow(1.0 - drop, 2.0) * vec3(0.10, 0.11, 0.13);      // rim
      lensed += smoothstep(0.55, 0.0, length(d + vec2(0.05, 0.07))) * 0.10; // highlight
      col = mix(col, lensed, drop);
      // vertical streaks between drops
      float streak = smoothstep(0.90, 1.0, hash(floor(vec2(uv.x * 60.0, 0.0))));
      col += vec3(0.05, 0.06, 0.08) * streak * 0.25;
      col *= 0.80 + 0.30 * smoothstep(1.2, 0.0, abs(uv.y - 0.5));
      gl_FragColor = vec4(col, 1.0);
    }
`;

export function RainGlass({ className, speed = 1.0 }: RainGlassProps) {
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
        console.error("RainGlass shader error:", gl.getShaderInfoLog(shader));
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
      console.error("RainGlass link error:", gl.getProgramInfoLog(program));
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
