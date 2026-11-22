"use client";

import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef } from "react";

interface MercuryBeadsProps {
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
    vec2 blob(float i, float t){
      float fi = i;
      return vec2(sin(t * (0.31 + fi * 0.017) + fi * 2.1) * 0.62,
                  cos(t * (0.27 + fi * 0.023) + fi * 1.7) * 0.42);
    }
    float fieldAt(vec2 p, float t, float radius){
      float f = 0.0;
      for (int i = 0; i < 9; i++) {
        float fi = float(i);
        vec2 b = blob(fi, t);
        float r = radius * (0.55 + 0.28 * sin(fi * 3.1 + t * 0.5));
        f += (r * r) / max(dot(p - b, p - b), 1e-4);
      }
      return f;
    }
    void main(){
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float t = u_time * 0.35;
      float f = fieldAt(p, t, 0.30);
      float surf = smoothstep(0.95, 1.12, f);
      float e = 0.012;
      float fx = fieldAt(p + vec2(e,0.0), t, 0.30) - fieldAt(p - vec2(e,0.0), t, 0.30);
      float fy = fieldAt(p + vec2(0.0,e), t, 0.30) - fieldAt(p - vec2(0.0,e), t, 0.30);
      vec2 nrm = normalize(vec2(fx, fy) + 1e-5);
      float spec = pow(max(0.0, dot(nrm, normalize(vec2(-0.55, 0.72)))), 22.0);
      float rim  = pow(1.0 - abs(nrm.y), 3.0);
      float env = mix(0.035, 0.42, smoothstep(-0.1, 0.55, nrm.y));
      env += 0.16 * exp(-pow((nrm.y - 0.35) * 4.0, 2.0));
      vec3 metal = vec3(env) * vec3(0.66, 0.70, 0.78);
      metal += vec3(1.0, 0.97, 0.92) * spec * 0.30;
      metal += vec3(0.30, 0.26, 0.34) * rim * 0.22;
      vec3 col = vec3(0.006, 0.007, 0.009);
      col = mix(col, metal, surf);
      col += vec3(0.06, 0.07, 0.09) * smoothstep(1.0, 0.45, f) * (1.0 - surf) * env;
      col *= 0.75 + 0.45 * smoothstep(1.8, 0.1, length(p));
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
`;

export function MercuryBeads({ className, speed = 1.0 }: MercuryBeadsProps) {
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
        console.error("MercuryBeads shader error:", gl.getShaderInfoLog(shader));
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
      console.error("MercuryBeads link error:", gl.getProgramInfoLog(program));
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
