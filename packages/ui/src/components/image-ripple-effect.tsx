/* React Three Fiber elements use Three.js properties, not DOM attributes. */
/* eslint react/no-unknown-property: ["error", { "ignore": ["args", "vertexShader", "fragmentShader", "transparent", "uniforms"] }] */
"use client";

import { useFBO, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { cn } from "@workspace/ui/lib/utils";
import * as React from "react";
import * as THREE from "three";
import { WebGLErrorBoundary, WebGLFallback } from "@workspace/ui/components/webgl-error-boundary";

const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 winResolution;
uniform float uStrength;

const float PI = 3.141592653589793238;

void main() {
  vec2 vUvScreen = gl_FragCoord.xy / winResolution.xy;
  vec4 displacement = texture2D(uDisplacement, vUvScreen);
  float theta = displacement.r * 2.0 * PI;

  vec2 dir = vec2(sin(theta), cos(theta));
  vec2 uv = vUvScreen + dir * displacement.r * uStrength;
  vec4 color = texture2D(uTexture, uv);

  gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BRUSH_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="white" stop-opacity="1"/>
        <stop offset="65%" stop-color="white" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="128" height="128" fill="url(#g)"/>
  </svg>
`)}`;

function createDemoImage(title: string, colorA: string, colorB: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#g)"/>
      <circle cx="610" cy="180" r="130" fill="white" fill-opacity="0.12"/>
      <circle cx="180" cy="760" r="190" fill="white" fill-opacity="0.12"/>
      <text x="64" y="900" fill="white" font-size="64" font-family="system-ui, sans-serif" opacity="0.9">
        ${title}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_IMAGE_URLS = [createDemoImage("Aurora", "#0f172a", "#155e75")];

export interface RippleImageItem {
  src: string;
  x?: number;
  y?: number;
  widthScale?: number;
  heightScale?: number;
}

export interface ImageRippleEffectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  className?: string;
  images?: RippleImageItem[];
  brushTextureUrl?: string;
  distortionStrength?: number;
  waveCount?: number;
  waveSize?: number;
  waveRotationSpeed?: number;
  waveFadeMultiplier?: number;
  waveGrowth?: number;
  waveSpawnThreshold?: number;
  children?: React.ReactNode;
}

interface RippleSceneProps {
  pointerRef: React.MutableRefObject<PointerState>;
  images: RippleImageItem[];
  brushTextureUrl: string;
  distortionStrength: number;
  waveCount: number;
  waveSize: number;
  waveRotationSpeed: number;
  waveFadeMultiplier: number;
  waveGrowth: number;
  waveSpawnThreshold: number;
  onReady: () => void;
}

type PointerState = { x: number; y: number; active: boolean };

function RippleScene({
  pointerRef,
  images,
  brushTextureUrl,
  distortionStrength,
  waveCount,
  waveSize,
  waveRotationSpeed,
  waveFadeMultiplier,
  waveGrowth,
  waveSpawnThreshold,
  onReady,
}: RippleSceneProps) {
  // Everything is sized from R3F's own measurement so the camera frustum,
  // FBOs and the output plane always agree — no frame where they disagree.
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const { width, height } = size;

  const brushTexture = useTexture(brushTextureUrl);
  const imageSources = React.useMemo(() => images.map((item) => item.src), [images]);
  const imageTextures = useTexture(imageSources);
  const rippleScene = React.useMemo(() => new THREE.Scene(), []);
  const imageScene = React.useMemo(() => new THREE.Scene(), []);

  const waveMeshesRef = React.useRef<THREE.Mesh[]>([]);
  const prevPointerRef = React.useRef<{ x: number; y: number } | null>(null);
  const currentWaveRef = React.useRef(0);
  const framesRenderedRef = React.useRef(0);
  const drawingBufferSize = React.useMemo(() => new THREE.Vector2(), []);

  const uniforms = React.useMemo(
    () => ({
      uDisplacement: { value: null as THREE.Texture | null },
      uTexture: { value: null as THREE.Texture | null },
      winResolution: { value: new THREE.Vector2(1, 1) },
      uStrength: { value: distortionStrength },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Full drawing-buffer resolution (size * dpr), tracked automatically by drei.
  const fboBase = useFBO({ depthBuffer: false, stencilBuffer: false });
  const fboTexture = useFBO({ depthBuffer: false, stencilBuffer: false });

  React.useEffect(() => {
    uniforms.uStrength.value = distortionStrength;
  }, [distortionStrength, uniforms]);

  React.useEffect(() => {
    brushTexture.minFilter = THREE.LinearFilter;
    brushTexture.magFilter = THREE.LinearFilter;
    brushTexture.needsUpdate = true;
  }, [brushTexture]);

  React.useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    const geometry = new THREE.PlaneGeometry(waveSize, waveSize, 1, 1);
    for (let i = 0; i < waveCount; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        map: brushTexture,
        depthWrite: false,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.rotation.z = Math.random();
      rippleScene.add(mesh);
      meshes.push(mesh);
    }

    waveMeshesRef.current = meshes;
    currentWaveRef.current = 0;

    return () => {
      meshes.forEach((mesh) => {
        rippleScene.remove(mesh);
        (mesh.material as THREE.Material).dispose();
      });
      geometry.dispose();
      waveMeshesRef.current = [];
    };
  }, [brushTexture, rippleScene, waveCount, waveSize]);

  React.useEffect(() => {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const group = new THREE.Group();

    images.forEach((item, index) => {
      const texture = imageTextures[index];
      if (!texture) {
        return;
      }
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
      mesh.position.x = (item.x ?? (index - (images.length - 1) / 2) * 0.25) * width;
      mesh.position.y = (item.y ?? 0) * height;
      mesh.position.z = 1;
      mesh.scale.x = width * (item.widthScale ?? 0.22);
      mesh.scale.y = width * (item.heightScale ?? 0.28);
      group.add(mesh);
    });

    imageScene.add(group);

    return () => {
      imageScene.remove(group);
      group.children.forEach((child) => {
        ((child as THREE.Mesh).material as THREE.Material).dispose();
      });
      geometry.dispose();
    };
  }, [imageScene, imageTextures, images, width, height]);

  useFrame(() => {
    const pointer = pointerRef.current;

    if (pointer.active) {
      const x = pointer.x - width / 2;
      const y = -pointer.y + height / 2;
      const prev = prevPointerRef.current;
      // The first sample after the pointer enters only seeds the previous
      // position — otherwise a wave would spawn from a stale/origin point.
      const moved =
        prev !== null &&
        (Math.abs(x - prev.x) > waveSpawnThreshold ||
          Math.abs(y - prev.y) > waveSpawnThreshold);

      if (moved && waveMeshesRef.current.length > 0) {
        const waveIndex = currentWaveRef.current % waveMeshesRef.current.length;
        const mesh = waveMeshesRef.current[waveIndex];
        if (mesh) {
          mesh.position.x = x;
          mesh.position.y = y;
          mesh.visible = true;
          mesh.scale.set(1.75, 1.75, 1);
          mesh.rotation.z = Math.random() * Math.PI;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 1;
        }
        currentWaveRef.current = (waveIndex + 1) % waveMeshesRef.current.length;
      }
      prevPointerRef.current = { x, y };
    } else {
      prevPointerRef.current = null;
    }

    waveMeshesRef.current.forEach((mesh) => {
      if (!mesh.visible) {
        return;
      }
      mesh.rotation.z += waveRotationSpeed;
      mesh.scale.x = 0.98 * mesh.scale.x + waveGrowth;
      mesh.scale.y = 0.98 * mesh.scale.y + waveGrowth;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity *= waveFadeMultiplier;
      if (material.opacity <= 0.01) {
        mesh.visible = false;
      }
    });

    gl.getDrawingBufferSize(drawingBufferSize);
    uniforms.winResolution.value.copy(drawingBufferSize);
    uniforms.uTexture.value = fboTexture.texture;
    uniforms.uDisplacement.value = fboBase.texture;

    gl.setRenderTarget(fboBase);
    gl.clear();
    gl.render(rippleScene, camera);

    gl.setRenderTarget(fboTexture);
    gl.clear();
    // The default camera is a pixel-space orthographic camera (zoom = 1),
    // so both passes share its projection.
    gl.render(imageScene, camera);

    gl.setRenderTarget(null);

    // Reveal the canvas only after real frames have been drawn to screen.
    if (framesRenderedRef.current < 2) {
      framesRenderedRef.current += 1;
      if (framesRenderedRef.current === 2) {
        onReady();
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[Math.max(width, 1), Math.max(height, 1), 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ImageRippleEffect({
  className,
  images = DEFAULT_IMAGE_URLS.map((src) => ({ src })),
  brushTextureUrl = BRUSH_DATA_URI,
  distortionStrength = 0.075,
  waveCount = 100,
  waveSize = 60,
  waveRotationSpeed = 0.025,
  waveFadeMultiplier = 0.95,
  waveGrowth = 0.155,
  waveSpawnThreshold = 0.1,
  children,
  ...props
}: ImageRippleEffectProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pointerRef = React.useRef<PointerState>({ x: 0, y: 0, active: false });
  const [ready, setReady] = React.useState(false);
  const handleReady = React.useCallback(() => setReady(true), []);

  // Callers commonly pass inline arrays (`images={[...]}`); key on content so
  // the scene isn't rebuilt on every parent render.
  const imagesKey = JSON.stringify(images);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableImages = React.useMemo(() => images, [imagesKey]);

  const updatePointer = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    },
    [],
  );

  const handlePointerLeave = React.useCallback(() => {
    pointerRef.current = { ...pointerRef.current, active: false };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerEnter={updatePointer}
      onPointerMove={updatePointer}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative h-[560px] w-full overflow-hidden text-white",
        className,
      )}
      {...props}
    >
      <WebGLErrorBoundary fallback={<WebGLFallback className="absolute inset-0 h-full w-full" />}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 2], zoom: 1, near: -1000, far: 1000 }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0 }}
          className={cn(
            "transition-opacity duration-500 ease-out motion-reduce:transition-none",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Local boundary: without it, texture loading suspends the Canvas and
              bubbles up to the page's nearest Suspense boundary (R3F v9). */}
          <React.Suspense fallback={null}>
            <RippleScene
              pointerRef={pointerRef}
              images={stableImages}
              brushTextureUrl={brushTextureUrl}
              distortionStrength={distortionStrength}
              waveCount={waveCount}
              waveSize={waveSize}
              waveRotationSpeed={waveRotationSpeed}
              waveFadeMultiplier={waveFadeMultiplier}
              waveGrowth={waveGrowth}
              waveSpawnThreshold={waveSpawnThreshold}
              onReady={handleReady}
            />
          </React.Suspense>
        </Canvas>
      </WebGLErrorBoundary>
      {children ? (
        <div className="pointer-events-none absolute inset-0 z-10">{children}</div>
      ) : null}
    </div>
  );
}
