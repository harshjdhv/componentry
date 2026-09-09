/* React Three Fiber elements use Three.js properties, not DOM attributes. */
/* eslint react/no-unknown-property: ["error", { "ignore": ["args", "vertexShader", "fragmentShader", "transparent", "uniforms"] }] */
"use client";

import { OrthographicCamera, useFBO, useTexture } from "@react-three/drei";
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

type ViewportDimensions = {
  width: number;
  height: number;
  pixelRatio: number;
};

function useContainerDimensions(
  ref: React.RefObject<HTMLElement | null>,
): ViewportDimensions {
  const [dimensions, setDimensions] = React.useState<ViewportDimensions>({
    width: 0,
    height: 0,
    pixelRatio: 1,
  });

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        pixelRatio:
          typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [ref]);

  return dimensions;
}

interface RippleSceneProps {
  width: number;
  height: number;
  pixelRatio: number;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  images: RippleImageItem[];
  brushTextureUrl: string;
  distortionStrength: number;
  waveCount: number;
  waveSize: number;
  waveRotationSpeed: number;
  waveFadeMultiplier: number;
  waveGrowth: number;
  waveSpawnThreshold: number;
}

function RippleScene({
  width,
  height,
  pixelRatio,
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
}: RippleSceneProps) {
  const { viewport } = useThree();
  const { gl, camera } = useThree();

  const brushTexture = useTexture(brushTextureUrl);
  const imageTextures = useTexture(images.map((item) => item.src));
  const rippleScene = React.useMemo(() => new THREE.Scene(), []);
  const imageScene = React.useMemo(() => new THREE.Scene(), []);

  const waveMeshesRef = React.useRef<THREE.Mesh[]>([]);
  const prevMouseRef = React.useRef({ x: 0, y: 0 });
  const currentWaveRef = React.useRef(0);

  const uniformsRef = React.useRef({
    uDisplacement: { value: null as THREE.Texture | null },
    uTexture: { value: null as THREE.Texture | null },
    winResolution: { value: new THREE.Vector2(1, 1) },
    uStrength: { value: distortionStrength },
  });

  const fboBase = useFBO(Math.max(width, 1), Math.max(height, 1), {
    depthBuffer: false,
    stencilBuffer: false,
  });
  const fboTexture = useFBO(Math.max(width, 1), Math.max(height, 1), {
    depthBuffer: false,
    stencilBuffer: false,
  });

  const imageCamera = React.useMemo(
    () =>
      new THREE.OrthographicCamera(
        viewport.width / -2,
        viewport.width / 2,
        viewport.height / 2,
        viewport.height / -2,
        -1000,
        1000,
      ),
    [viewport.height, viewport.width],
  );

  React.useEffect(() => {
    imageCamera.position.z = 2;
  }, [imageCamera]);

  React.useEffect(() => {
    uniformsRef.current.uStrength.value = distortionStrength;
  }, [distortionStrength]);

  React.useEffect(() => {
    brushTexture.minFilter = THREE.LinearFilter;
    brushTexture.magFilter = THREE.LinearFilter;
    brushTexture.needsUpdate = true;
  }, [brushTexture]);

  React.useEffect(() => {
    waveMeshesRef.current.forEach((mesh) => {
      rippleScene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => material.dispose());
      } else {
        mesh.material.dispose();
      }
    });

    const meshes: THREE.Mesh[] = [];
    for (let i = 0; i < waveCount; i += 1) {
      const geometry = new THREE.PlaneGeometry(waveSize, waveSize, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        map: brushTexture,
        depthWrite: false,
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
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, [brushTexture, rippleScene, waveCount, waveSize]);

  React.useEffect(() => {
    while (imageScene.children.length > 0) {
      imageScene.remove(imageScene.children[0] as THREE.Object3D);
    }

    imageScene.add(imageCamera);
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

      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: texture }),
      );
      mesh.position.x = (item.x ?? (index - (images.length - 1) / 2) * 0.25) * viewport.width;
      mesh.position.y = (item.y ?? 0) * viewport.height;
      mesh.position.z = 1;
      mesh.scale.x = viewport.width * (item.widthScale ?? 0.22);
      mesh.scale.y = viewport.width * (item.heightScale ?? 0.28);
      group.add(mesh);
    });

    imageScene.add(group);

    return () => {
      geometry.dispose();
      group.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose?.();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material?.dispose?.();
        }
      });
      imageScene.remove(group);
    };
  }, [imageCamera, imageScene, imageTextures, images, viewport.height, viewport.width]);

  useFrame(() => {
    const x = pointerRef.current.x - width / 2;
    const y = -pointerRef.current.y + height / 2;
    const prev = prevMouseRef.current;
    const moved =
      Math.abs(x - prev.x) > waveSpawnThreshold ||
      Math.abs(y - prev.y) > waveSpawnThreshold;

    if (moved && waveMeshesRef.current.length > 0) {
      const waveIndex = currentWaveRef.current % waveMeshesRef.current.length;
      const mesh = waveMeshesRef.current[waveIndex];
      if (mesh) {
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.visible = true;
        mesh.scale.set(1.75, 1.75, 1);
        mesh.rotation.z = Math.random() * Math.PI;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 1;
      }
      currentWaveRef.current = (waveIndex + 1) % waveMeshesRef.current.length;
    }
    prevMouseRef.current = { x, y };

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

    uniformsRef.current.uTexture.value = fboTexture.texture;
    uniformsRef.current.uDisplacement.value = fboBase.texture;
    uniformsRef.current.winResolution.value
      .set(width, height)
      .multiplyScalar(pixelRatio);

    gl.setRenderTarget(fboBase);
    gl.clear();
    gl.render(rippleScene, camera);

    gl.setRenderTarget(fboTexture);
    gl.clear();
    gl.render(imageScene, imageCamera);

    gl.setRenderTarget(null);
  });

  return (
    <mesh>
      <planeGeometry args={[Math.max(width, 1), Math.max(height, 1), 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniformsRef.current}
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
  const { width, height, pixelRatio } = useContainerDimensions(containerRef);
  const pointerRef = React.useRef({ x: 0, y: 0 });

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    [],
  );

  const frustumSize = height;
  const aspect = width > 0 && height > 0 ? width / height : 1;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={cn(
        "relative h-[560px] w-full overflow-hidden text-white",
        className,
      )}
      {...props}
    >
      {width > 0 && height > 0 && (
        <WebGLErrorBoundary fallback={<WebGLFallback className="absolute inset-0 h-full w-full" />}>
          <Canvas>
            <OrthographicCamera
              makeDefault
              args={[
                (frustumSize * aspect) / -2,
                (frustumSize * aspect) / 2,
                frustumSize / 2,
                frustumSize / -2,
                -1000,
                1000,
              ]}
              position={[0, 0, 2]}
            />
            <RippleScene
              width={width}
              height={height}
              pixelRatio={pixelRatio}
              pointerRef={pointerRef}
              images={images}
              brushTextureUrl={brushTextureUrl}
              distortionStrength={distortionStrength}
              waveCount={waveCount}
              waveSize={waveSize}
              waveRotationSpeed={waveRotationSpeed}
              waveFadeMultiplier={waveFadeMultiplier}
              waveGrowth={waveGrowth}
              waveSpawnThreshold={waveSpawnThreshold}
            />
          </Canvas>
        </WebGLErrorBoundary>
      )}
      {children ? (
        <div className="pointer-events-none absolute inset-0 z-10">{children}</div>
      ) : null}
    </div>
  );
}
