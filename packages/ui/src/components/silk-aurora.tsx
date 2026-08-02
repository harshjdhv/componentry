"use client";

import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { WebGLErrorBoundary } from "@workspace/ui/components/webgl-error-boundary";

const VERTEX_SHADER = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_res;
uniform vec2 u_pointer;
uniform vec2 u_flowDirection;
uniform float u_time;
uniform float u_speed;
uniform float u_animationSpeed;
uniform float u_intensity;
uniform float u_opacity;
uniform float u_blur;
uniform float u_contrast;
uniform float u_brightness;
uniform float u_layers;
uniform float u_flowScale;
uniform float u_flowStrength;
uniform float u_pointerStrength;
uniform float u_scroll;
uniform float u_parallaxStrength;
uniform float u_grainOpacity;
uniform float u_noiseOpacity;
uniform float u_noiseScale;
uniform float u_lighting;
uniform float u_lightingIntensity;
uniform float u_lightingRadius;
uniform float u_lightingSpeed;
uniform float u_ambientGlow;
uniform float u_ambientOpacity;
uniform float u_vignette;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.52;
  mat2 turn = mat2(0.84, 0.54, -0.54, 0.84);

  for (int i = 0; i < 7; i++) {
    float enabled = step(float(i) + 0.5, u_layers);
    value += amplitude * valueNoise(p) * enabled;
    p = turn * p * 2.03 + 0.17;
    amplitude *= 0.5;
  }

  return value;
}

vec3 grade(vec3 color, float contrast, float brightness) {
  color = (color - 0.5) * contrast + 0.5;
  return color * brightness;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.075 * u_speed * u_animationSpeed;
  vec2 direction = normalize(u_flowDirection + vec2(0.0001));
  vec2 crossDirection = vec2(-direction.y, direction.x);

  vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0);
  vec2 pointerDelta = pointer - p;
  float pointerFalloff = smoothstep(0.68, 0.0, length(pointerDelta));
  p += crossDirection * pointerDelta.x * pointerFalloff * 0.035 * u_pointerStrength;
  p += direction * pointerDelta.y * pointerFalloff * 0.022 * u_pointerStrength;

  p.y += u_scroll * 0.045 * u_parallaxStrength;
  p.x -= u_scroll * 0.018 * u_parallaxStrength;

  float scale = max(0.2, u_flowScale);
  vec2 broadP = p * scale;
  float warpA = fbm(broadP * 0.82 + direction * t * 0.71 + vec2(2.7, -1.3));
  float warpB = fbm(rotate2d(0.73) * broadP * 1.08 - crossDirection * t * 0.53 + vec2(-4.1, 3.6));
  float warpC = fbm(rotate2d(-0.46) * broadP * 1.42 + vec2(-t * 0.31, t * 0.43) + 8.2);

  vec2 silk = broadP;
  silk += vec2(warpA - 0.5, warpB - 0.5) * 0.72 * u_flowStrength;
  silk += direction * (warpC - 0.5) * 0.28 * u_flowStrength;

  float fieldA = fbm(rotate2d(0.28) * silk * 0.74 + direction * t * 0.83 + 1.9);
  float fieldB = fbm(rotate2d(-0.81) * silk * 0.91 - crossDirection * t * 0.61 + 5.4);
  float fieldC = fbm(rotate2d(1.17) * silk * 1.16 + vec2(t * 0.37, -t * 0.29) + 9.7);

  float softness = clamp(u_blur * 0.08, 0.025, 0.2);
  float veilA = smoothstep(0.28 - softness, 0.76 + softness, fieldA + (warpB - 0.5) * 0.28);
  float veilB = smoothstep(0.34 - softness, 0.82 + softness, fieldB + (warpC - 0.5) * 0.24);
  float veilC = smoothstep(0.42 - softness, 0.86 + softness, fieldC + (fieldA - 0.5) * 0.18);

  float folded = 0.5 + 0.5 * sin(
    silk.y * 2.7 + silk.x * 0.72 + warpA * 3.1 - warpB * 1.9 + t * 0.47
  );
  float silkFold = smoothstep(0.18, 0.92, folded) * smoothstep(0.12, 0.94, fieldB);

  vec3 color = mix(u_color0, u_color1, clamp(0.22 + veilA * 0.62, 0.0, 1.0));
  color = mix(color, u_color2, veilB * 0.58 * u_intensity);
  color = mix(color, u_color3, veilC * 0.42 * u_intensity);
  color += u_color4 * silkFold * 0.13 * u_intensity;

  vec2 lightCenter = vec2(
    0.5 + sin(t * 0.37 * u_lightingSpeed + 1.4) * 0.24,
    0.48 + cos(t * 0.29 * u_lightingSpeed - 0.8) * 0.18
  );
  vec2 lightDelta = uv - lightCenter;
  lightDelta = rotate2d(0.42 + warpA * 0.22) * lightDelta;
  lightDelta *= vec2(0.74, 1.32);
  float lightRadius = max(0.08, u_lightingRadius * 0.34);
  float bloom = exp(-dot(lightDelta, lightDelta) / (lightRadius * lightRadius));
  bloom *= 0.76 + fieldC * 0.24;
  color += mix(u_color3, u_color4, 0.58) * bloom * 0.22 * u_lightingIntensity * u_lighting;

  vec2 ambientDelta = uv - vec2(0.52, 0.47);
  ambientDelta *= vec2(0.72, 1.0);
  float ambient = exp(-dot(ambientDelta, ambientDelta) / 0.34);
  color += mix(u_color2, u_color4, 0.5) * ambient * 0.12 * u_ambientOpacity * u_ambientGlow;

  float haze = fbm(p * max(0.5, u_noiseScale) * 2.6 + vec2(-t * 0.18, t * 0.14));
  color += (haze - 0.5) * u_noiseOpacity * 0.16;

  float vignetteMask = smoothstep(0.18, 1.08, length((uv - 0.5) * vec2(1.0, 0.86)));
  color *= 1.0 - vignetteMask * 0.52 * u_vignette;

  float grain = hash(gl_FragCoord.xy + floor(u_time * 12.0) * 17.0) - 0.5;
  color += grain * u_grainOpacity * 0.16;
  color = grade(color, u_contrast, u_brightness);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), clamp(u_opacity, 0.0, 1.0));
}
`;

const HEX_COLOR_REGEX = /^#?[0-9a-fA-F]{6}$/;

export const SILK_AURORA_PRESETS = {
  ocean: ["#020817", "#062a55", "#0b62b4", "#39bfe6", "#d9f6ff"],
  aurora: ["#07051a", "#25105e", "#4d43c7", "#20a7a0", "#c3f5eb"],
  sky: ["#071425", "#16456e", "#4d9acb", "#9edbf0", "#eefaff"],
  cloud: ["#20242c", "#4b5360", "#8c98a7", "#ced5dc", "#f7f8fa"],
  sunset: ["#1d0812", "#6d1e3e", "#d95b48", "#f2a35b", "#ffe2a6"],
  midnight: ["#010206", "#080d1c", "#17264d", "#304d7f", "#a8c6ef"],
  ice: ["#07141b", "#123b49", "#3e8796", "#a6e4e7", "#f1ffff"],
  dream: ["#10091c", "#3b1d58", "#8d4ca0", "#df91bd", "#ffe7f1"],
  nebula: ["#090512", "#32104a", "#813b8f", "#315fa8", "#e2b7ff"],
  emerald: ["#03120e", "#073c2c", "#0e7358", "#53c89f", "#d9fff0"],
  lavender: ["#100b20", "#30205d", "#6252a6", "#b58bc6", "#f4dff4"],
  mono: ["#020202", "#171717", "#414141", "#8a8a8a", "#f2f2f2"],
} as const;

export type SilkAuroraPreset = keyof typeof SILK_AURORA_PRESETS;

export interface SilkAuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: readonly string[];
  preset?: SilkAuroraPreset;
  speed?: number;
  intensity?: number;
  opacity?: number;
  blur?: number;
  contrast?: number;
  brightness?: number;
  grain?: boolean;
  grainOpacity?: number;
  layers?: number;
  flowScale?: number;
  flowStrength?: number;
  flowDirection?: number;
  animationSpeed?: number;
  pointerInteraction?: boolean;
  pointerStrength?: number;
  scrollInteraction?: boolean;
  parallaxStrength?: number;
  lighting?: boolean;
  lightingIntensity?: number;
  lightingRadius?: number;
  lightingSpeed?: number;
  ambientGlow?: boolean;
  ambientOpacity?: number;
  noise?: boolean;
  noiseOpacity?: number;
  noiseScale?: number;
  vignette?: boolean;
  vignetteStrength?: number;
  borderRadius?: React.CSSProperties["borderRadius"];
  children?: React.ReactNode;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function sanitizeHexColor(value: string | undefined, fallback: string) {
  const trimmed = value?.trim() ?? "";
  if (!HEX_COLOR_REGEX.test(trimmed)) return fallback;
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function hexToRgb01(hex: string): [number, number, number] {
  const normalized = hex.slice(1);
  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255,
  ];
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function SilkAurora({
  colors,
  preset = "ocean",
  speed = 1,
  intensity = 1,
  opacity = 1,
  blur = 1,
  contrast = 1.04,
  brightness = 1,
  grain = true,
  grainOpacity = 0.22,
  layers = 6,
  flowScale = 1,
  flowStrength = 1,
  flowDirection = -18,
  animationSpeed = 1,
  pointerInteraction = true,
  pointerStrength = 0.7,
  scrollInteraction = false,
  parallaxStrength = 0.5,
  lighting = true,
  lightingIntensity = 0.8,
  lightingRadius = 1,
  lightingSpeed = 0.8,
  ambientGlow = true,
  ambientOpacity = 0.7,
  noise = true,
  noiseOpacity = 0.16,
  noiseScale = 1,
  vignette = true,
  vignetteStrength = 0.55,
  borderRadius = 0,
  className,
  style,
  children,
  ...props
}: SilkAuroraProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const drawStaticRef = React.useRef<(() => void) | null>(null);
  const pointerRef = React.useRef({ x: 0.5, y: 0.5 });
  const targetPointerRef = React.useRef({ x: 0.5, y: 0.5 });
  const scrollRef = React.useRef(0);
  const targetScrollRef = React.useRef(0);
  const [hasWebGLError, setHasWebGLError] = React.useState(false);
  const reducedMotion = useReducedMotion();

  const palette = React.useMemo(() => {
    const fallback = SILK_AURORA_PRESETS[preset];
    return fallback.map((color, index) =>
      sanitizeHexColor(colors?.[index], color),
    ) as [string, string, string, string, string];
  }, [colors, preset]);

  const settings = React.useMemo(
    () => ({
      palette: palette.map(hexToRgb01),
      speed: clamp(speed, 0, 3),
      intensity: clamp(intensity, 0, 2),
      opacity: clamp(opacity, 0, 1),
      blur: clamp(blur, 0.25, 2),
      contrast: clamp(contrast, 0.6, 1.6),
      brightness: clamp(brightness, 0.5, 1.5),
      grainOpacity: grain ? clamp(grainOpacity, 0, 1) : 0,
      layers: clamp(Math.round(layers), 3, 7),
      flowScale: clamp(flowScale, 0.35, 2.5),
      flowStrength: clamp(flowStrength, 0, 2),
      flowDirection,
      animationSpeed: clamp(animationSpeed, 0, 3),
      pointerStrength: pointerInteraction ? clamp(pointerStrength, 0, 1.5) : 0,
      scrollInteraction,
      parallaxStrength: clamp(parallaxStrength, 0, 1.5),
      lighting: lighting ? 1 : 0,
      lightingIntensity: clamp(lightingIntensity, 0, 2),
      lightingRadius: clamp(lightingRadius, 0.3, 2),
      lightingSpeed: clamp(lightingSpeed, 0, 2),
      ambientGlow: ambientGlow ? 1 : 0,
      ambientOpacity: clamp(ambientOpacity, 0, 1.5),
      noiseOpacity: noise ? clamp(noiseOpacity, 0, 1) : 0,
      noiseScale: clamp(noiseScale, 0.4, 3),
      vignette: vignette ? clamp(vignetteStrength, 0, 1.5) : 0,
      pointerInteraction,
    }),
    [
      ambientGlow,
      ambientOpacity,
      animationSpeed,
      blur,
      brightness,
      contrast,
      flowDirection,
      flowScale,
      flowStrength,
      grain,
      grainOpacity,
      intensity,
      layers,
      lighting,
      lightingIntensity,
      lightingRadius,
      lightingSpeed,
      noise,
      noiseOpacity,
      noiseScale,
      opacity,
      palette,
      parallaxStrength,
      pointerInteraction,
      pointerStrength,
      scrollInteraction,
      speed,
      vignette,
      vignetteStrength,
    ],
  );
  const settingsRef = React.useRef(settings);
  settingsRef.current = settings;

  React.useEffect(() => {
    if (hasWebGLError) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setHasWebGLError(true);
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      setHasWebGLError(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      setHasWebGLError(true);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      setHasWebGLError(true);
      return;
    }

    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    if (position < 0 || !buffer) {
      setHasWebGLError(true);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniformNames = [
      "u_res",
      "u_pointer",
      "u_flowDirection",
      "u_time",
      "u_speed",
      "u_animationSpeed",
      "u_intensity",
      "u_opacity",
      "u_blur",
      "u_contrast",
      "u_brightness",
      "u_layers",
      "u_flowScale",
      "u_flowStrength",
      "u_pointerStrength",
      "u_scroll",
      "u_parallaxStrength",
      "u_grainOpacity",
      "u_noiseOpacity",
      "u_noiseScale",
      "u_lighting",
      "u_lightingIntensity",
      "u_lightingRadius",
      "u_lightingSpeed",
      "u_ambientGlow",
      "u_ambientOpacity",
      "u_vignette",
      "u_color0",
      "u_color1",
      "u_color2",
      "u_color3",
      "u_color4",
    ] as const;
    const uniforms = Object.fromEntries(
      uniformNames.map((name) => [name, gl.getUniformLocation(program, name)]),
    ) as Record<(typeof uniformNames)[number], WebGLUniformLocation | null>;

    if (uniformNames.some((name) => uniforms[name] === null)) {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      setHasWebGLError(true);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!settingsRef.current.pointerInteraction || reducedMotion) return;
      const rect = container.getBoundingClientRect();
      targetPointerRef.current = {
        x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
        y: clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1),
      };
    };
    const handlePointerLeave = () => {
      targetPointerRef.current = { x: 0.5, y: 0.5 };
    };
    const handleScroll = () => {
      if (!settingsRef.current.scrollInteraction || reducedMotion) return;
      targetScrollRef.current =
        window.scrollY / Math.max(window.innerHeight, 1);
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let elapsed = reducedMotion ? 7.25 : 0;
    let lastNow = performance.now();
    let rafId = 0;
    let running = false;

    const draw = (now: number, scheduleNext = true) => {
      const current = settingsRef.current;
      if (!reducedMotion) {
        elapsed += Math.min((now - lastNow) / 1000, 0.05);
      }
      lastNow = now;

      pointerRef.current.x +=
        (targetPointerRef.current.x - pointerRef.current.x) * 0.035;
      pointerRef.current.y +=
        (targetPointerRef.current.y - pointerRef.current.y) * 0.035;
      scrollRef.current +=
        (targetScrollRef.current - scrollRef.current) * 0.025;

      const radians = (current.flowDirection * Math.PI) / 180;
      gl.uniform2f(
        uniforms.u_pointer!,
        pointerRef.current.x,
        pointerRef.current.y,
      );
      gl.uniform2f(
        uniforms.u_flowDirection!,
        Math.cos(radians),
        Math.sin(radians),
      );
      gl.uniform1f(uniforms.u_time!, elapsed);
      gl.uniform1f(uniforms.u_speed!, current.speed);
      gl.uniform1f(uniforms.u_animationSpeed!, current.animationSpeed);
      gl.uniform1f(uniforms.u_intensity!, current.intensity);
      gl.uniform1f(uniforms.u_opacity!, current.opacity);
      gl.uniform1f(uniforms.u_blur!, current.blur);
      gl.uniform1f(uniforms.u_contrast!, current.contrast);
      gl.uniform1f(uniforms.u_brightness!, current.brightness);
      gl.uniform1f(uniforms.u_layers!, current.layers);
      gl.uniform1f(uniforms.u_flowScale!, current.flowScale);
      gl.uniform1f(uniforms.u_flowStrength!, current.flowStrength);
      gl.uniform1f(
        uniforms.u_pointerStrength!,
        reducedMotion ? 0 : current.pointerStrength,
      );
      gl.uniform1f(
        uniforms.u_scroll!,
        reducedMotion || !current.scrollInteraction ? 0 : scrollRef.current,
      );
      gl.uniform1f(uniforms.u_parallaxStrength!, current.parallaxStrength);
      gl.uniform1f(uniforms.u_grainOpacity!, current.grainOpacity);
      gl.uniform1f(uniforms.u_noiseOpacity!, current.noiseOpacity);
      gl.uniform1f(uniforms.u_noiseScale!, current.noiseScale);
      gl.uniform1f(uniforms.u_lighting!, current.lighting);
      gl.uniform1f(uniforms.u_lightingIntensity!, current.lightingIntensity);
      gl.uniform1f(uniforms.u_lightingRadius!, current.lightingRadius);
      gl.uniform1f(uniforms.u_lightingSpeed!, current.lightingSpeed);
      gl.uniform1f(uniforms.u_ambientGlow!, current.ambientGlow);
      gl.uniform1f(uniforms.u_ambientOpacity!, current.ambientOpacity);
      gl.uniform1f(uniforms.u_vignette!, current.vignette);
      current.palette.forEach((color, index) => {
        const location = uniforms[`u_color${index}` as "u_color0"]!;
        gl.uniform3f(location, color[0], color[1], color[2]);
      });
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (running && scheduleNext) rafId = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_res!, canvas.width, canvas.height);
      draw(performance.now(), false);
    };

    const start = () => {
      if (running || reducedMotion || document.hidden) return;
      running = true;
      lastNow = performance.now();
      rafId = window.requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    resize();
    drawStaticRef.current = () => draw(performance.now(), false);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(container);
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (reducedMotion) draw(performance.now(), false);

    return () => {
      stop();
      drawStaticRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [hasWebGLError, reducedMotion]);

  React.useEffect(() => {
    if (reducedMotion) drawStaticRef.current?.();
  }, [reducedMotion, settings]);

  const staticBackground = {
    background: [
      `radial-gradient(ellipse at 18% 28%, ${palette[2]}99, transparent 52%)`,
      `radial-gradient(ellipse at 78% 34%, ${palette[3]}66, transparent 48%)`,
      `radial-gradient(ellipse at 52% 82%, ${palette[1]}aa, transparent 58%)`,
      palette[0],
    ].join(", "),
  } satisfies React.CSSProperties;

  const fallback = (
    <div
      className={cn("relative min-h-[420px] w-full overflow-hidden", className)}
      style={{ ...style, borderRadius }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={staticBackground}
      />
      {children && <div className="relative z-10 size-full">{children}</div>}
    </div>
  );

  return (
    <WebGLErrorBoundary fallback={fallback}>
      <div
        ref={containerRef}
        className={cn(
          "relative min-h-[420px] w-full overflow-hidden",
          className,
        )}
        style={{ ...style, borderRadius }}
        {...props}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={staticBackground}
        />
        {!hasWebGLError && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full"
          />
        )}
        {children && <div className="relative z-10 size-full">{children}</div>}
      </div>
    </WebGLErrorBoundary>
  );
}

export default SilkAurora;
