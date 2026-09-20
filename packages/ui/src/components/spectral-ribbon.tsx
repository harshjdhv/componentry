"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@workspace/ui/lib/utils";

export interface SpectralRibbonProps {
  /** Animation speed, 0 to 2. Default 1; zero freezes the current frame. */
  speed?: number;
  /** Ribbon brightness, 0.25 to 2. */
  intensity?: number;
  /** Ribbon thickness, 0.5 to 2. */
  thickness?: number;
  /** Film grain amount, 0 to 1. */
  grain?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const vertex = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0., 1.); }`;

const fragment = `precision highp float;
uniform vec2 u_resolution;
uniform float u_time, u_intensity, u_thickness, u_grain;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p * 2.02;
    a *= 0.5;
  }
  return v;
}

// Soft C/S light trail — enters bottom-left, arcs up-right, falls away.
vec2 ribbonPoint(float s, float time) {
  float sway = sin(time * 0.42 + s * 2.1) * 0.055;
  float lift = cos(time * 0.31 - s * 1.5) * 0.04;
  float x = mix(-1.2, 0.95, s) + sway * (0.55 + s * 0.5);
  float y = mix(-0.72, -0.55, s)
    + sin(s * 2.85 + 0.35) * 0.92
    + cos(s * 1.15) * 0.12
    - pow(max(s - 0.55, 0.0), 2.0) * 1.15
    + lift;
  return vec2(x, y);
}

// Prismatic fringe: warm belly → green → cyan → blue → magenta rim.
vec3 prism(float across, float along) {
  float h = clamp(0.5 + across * 0.52 + along * 0.18, 0.0, 1.0);
  vec3 warm = vec3(1.0, 0.72, 0.28);
  vec3 lime = vec3(0.55, 1.0, 0.35);
  vec3 cyan = vec3(0.2, 0.85, 1.0);
  vec3 blue = vec3(0.25, 0.4, 1.0);
  vec3 mag = vec3(0.85, 0.25, 1.0);
  vec3 c = mix(warm, lime, smoothstep(0.0, 0.28, h));
  c = mix(c, cyan, smoothstep(0.22, 0.48, h));
  c = mix(c, blue, smoothstep(0.42, 0.68, h));
  c = mix(c, mag, smoothstep(0.62, 0.95, h));
  // Slight cool push on the outer (positive) side.
  c = mix(c, mag, smoothstep(0.2, 0.9, across) * 0.35);
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  // Zoom out on square/portrait so the full arc stays in frame.
  float portrait = smoothstep(1.35, 0.85, aspect);
  p *= mix(1.0, 1.32, portrait);
  float time = u_time;

  // Soft domain warp — liquid, not mechanical.
  float warp = fbm(p * 1.2 + vec2(time * 0.1, -time * 0.07));
  p += (warp - 0.5) * 0.14;

  float minDist = 1e5;
  float closestT = 0.0;
  float side = 0.0;
  vec2 prev = ribbonPoint(0.0, time);

  for (int i = 1; i <= 56; i++) {
    float s = float(i) / 56.0;
    vec2 cur = ribbonPoint(s, time);
    vec2 pa = p - prev;
    vec2 ba = cur - prev;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
    vec2 closest = prev + ba * h;
    float d = length(p - closest);
    if (d < minDist) {
      minDist = d;
      closestT = mix(s - 1.0 / 56.0, s, h);
      side = pa.x * ba.y - pa.y * ba.x;
    }
    prev = cur;
  }

  float thick = 0.055 * u_thickness;
  float across = clamp((minDist * sign(side)) / (thick * 2.8), -1.2, 1.2);

  // Heavy soft glow — thin bright core, wide spectral bloom.
  float core = exp(-pow(minDist / (thick * 0.7), 2.0));
  float body = exp(-pow(minDist / (thick * 1.8), 2.0));
  float bloom = exp(-pow(minDist / (thick * 4.2), 2.0));
  float haze = exp(-pow(minDist / (thick * 7.5), 2.0));

  vec3 spectral = prism(across, closestT);
  // Desaturate only the very center; keep fringe vivid.
  spectral = mix(vec3(0.95, 0.9, 0.82), spectral, smoothstep(0.0, 0.55, abs(across)));

  // Hot cream core near the start of the trail.
  float hot = exp(-closestT * 4.5) * pow(core, 0.85);

  vec3 col = spectral * (body * 0.55 + bloom * 0.85 + haze * 0.4);
  col += spectral * core * 0.35;
  col += vec3(1.0, 0.96, 0.88) * hot * 1.1;
  col *= u_intensity * 1.15;

  float mask = clamp(body * 0.7 + bloom + haze * 0.55 + hot, 0.0, 1.6);
  col *= mask;

  float grain = (hash(gl_FragCoord.xy + time * 40.0) - 0.5) * 0.06 * u_grain;
  col += grain * mask;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

function bounded(value: number, min: number, max: number, fallback: number) {
  return Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

/** Soft spectral light ribbon on black. Give the container an explicit height. */
export function SpectralRibbon({
  speed = 1,
  intensity = 1,
  thickness = 1,
  grain = 0.45,
  className,
  style,
  children,
}: SpectralRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateRef = useRef<(() => void) | null>(null);
  const settings = useRef({ speed, intensity, thickness, grain });

  useEffect(() => {
    settings.current = { speed, intensity, thickness, grain };
    updateRef.current?.();
  }, [speed, intensity, thickness, grain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
    });
    if (!gl) return;

    let dispose = () => {};

    const initialize = () => {
      const shaders: WebGLShader[] = [];
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
      };

      const vs = compile(gl.VERTEX_SHADER, vertex);
      const fs = compile(gl.FRAGMENT_SHADER, fragment);
      const program = gl.createProgram();
      const buffer = gl.createBuffer();
      const release = () => {
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        shaders.forEach((shader) => gl.deleteShader(shader));
      };

      if (!vs || !fs || !program || !buffer) {
        release();
        return;
      }

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        release();
        return;
      }

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const attribute = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

      const uniforms = {
        resolution: gl.getUniformLocation(program, "u_resolution"),
        time: gl.getUniformLocation(program, "u_time"),
        intensity: gl.getUniformLocation(program, "u_intensity"),
        thickness: gl.getUniformLocation(program, "u_thickness"),
        grain: gl.getUniformLocation(program, "u_grain"),
      };

      const motion = matchMedia("(prefers-reduced-motion: reduce)");
      let visible = true;
      let frame = 0;
      let previous = 0;
      let elapsed = 0;

      const draw = (now: number) => {
        frame = 0;
        const config = settings.current;
        const rate = bounded(config.speed, 0, 2, 1);
        if (previous && !motion.matches) {
          elapsed += Math.min((now - previous) / 1000, 0.05) * rate;
        }
        previous = now;

        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, elapsed);
        gl.uniform1f(
          uniforms.intensity,
          bounded(config.intensity, 0.25, 2, 1),
        );
        gl.uniform1f(
          uniforms.thickness,
          bounded(config.thickness, 0.5, 2, 1),
        );
        gl.uniform1f(uniforms.grain, bounded(config.grain, 0, 1, 0.45));
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        canvas.style.opacity = "1";

        if (rate > 0 && !motion.matches && visible && !document.hidden) {
          frame = requestAnimationFrame(draw);
        }
      };

      const refresh = () => {
        cancelAnimationFrame(frame);
        previous = 0;
        if (visible && !document.hidden) frame = requestAnimationFrame(draw);
      };

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
        canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
        gl.viewport(0, 0, canvas.width, canvas.height);
        refresh();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? false;
        refresh();
      });
      intersection.observe(canvas);
      document.addEventListener("visibilitychange", refresh);
      motion.addEventListener("change", refresh);
      updateRef.current = refresh;
      resize();

      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        intersection.disconnect();
        document.removeEventListener("visibilitychange", refresh);
        motion.removeEventListener("change", refresh);
        updateRef.current = null;
        release();
      };
    };

    const lost = (event: Event) => {
      event.preventDefault();
      dispose();
      canvas.style.opacity = "0";
    };
    const restored = () => initialize();
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    initialize();

    return () => {
      dispose();
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative h-full min-h-0 w-full overflow-hidden bg-black",
        className,
      )}
      style={style}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block size-full"
        style={{ opacity: 0 }}
      />
      {children ? (
        <div className="relative z-10 h-full min-h-0 w-full">{children}</div>
      ) : null}
    </div>
  );
}
