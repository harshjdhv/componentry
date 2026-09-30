"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  LUT3DEffect,
  LUTCubeLoader,
  RenderPass,
  type LookupTexture,
} from "postprocessing";
import { SSREffect } from "screen-space-reflections";
import { useReducedMotion } from "framer-motion";
import { cn } from "@workspace/ui/lib/utils";
import { WebGLErrorBoundary } from "@workspace/ui/components/webgl-error-boundary";
import { Beam } from "./prism-scene/beam.js";
import { Flare } from "./prism-scene/flare.js";
import { Prism } from "./prism-scene/prism.js";
import { Rainbow, type RainbowMesh } from "./prism-scene/rainbow.js";
import { StudioEnvironment } from "./prism-scene/studio-environment.js";
import { PrismTuningPanel } from "./prism-scene/panel.js";
import {
  aimRayFromPointer,
  cameraZoom,
  isLightColor,
  MOBILE_BREAKPOINT,
  PRISM_ASSETS,
  DEFAULT_RAY,
} from "./prism-scene/assets.js";
import {
  DARK_PRESET,
  type PrismSceneSettings,
} from "./prism-scene/settings.js";
import type { ReflectEvent } from "./prism-scene/reflect.js";
import { calculateRefractionAngle, lerp, lerpV3 } from "./prism-scene/util.js";

function AdaptiveCamera() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const orthographic = camera as THREE.OrthographicCamera;
    if (!orthographic.isOrthographicCamera) return;
    orthographic.zoom = cameraZoom(size.width);
    orthographic.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

function Scene({
  settings,
  ray,
  reducedMotion,
}: {
  settings: PrismSceneSettings;
  ray: { start: [number, number, number]; end: [number, number, number] };
  reducedMotion: boolean;
}) {
  const { size } = useThree();
  const [isPrismHit, setPrismHit] = useState(true);
  const firstHit = useRef(true);
  const flare = useRef<THREE.Group>(null!);
  const ambient = useRef<THREE.AmbientLight>(null!);
  const spot = useRef<THREE.SpotLight>(null!);
  const spotTarget = useRef<THREE.Object3D>(null!);
  const rainbow = useRef<RainbowMesh>(null!);
  const lightScale = Math.PI;
  const prismY = size.width <= MOBILE_BREAKPOINT ? -0.5 : 0;
  const lightBackground = isLightColor(settings.backgroundColor);

  const rayOut = useCallback(() => setPrismHit(false), []);
  const rayOver = useCallback((event: ReflectEvent) => {
    event.stopPropagation();
    setPrismHit(true);
    rainbow.current.material.speed = 1;
    rainbow.current.material.emissiveIntensity = firstHit.current
      ? 2.5 * (reducedMotion ? 1 : 20)
      : settings.rainbowIntensity;
    firstHit.current = false;
  }, [reducedMotion, settings.rainbowIntensity]);

  const rayMove = useCallback(({ api, position, direction, normal }: ReflectEvent) => {
    if (!normal) return;
    new THREE.Vector3().toArray(api.positions, api.number++ * 3);
    flare.current.position.set(position.x, position.y, -0.5);
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y));
    let angleScreenCenter = Math.atan2(-position.y, -position.x);
    const normalAngle = Math.atan2(normal.y, normal.x);
    const incidentAngle = angleScreenCenter - normalAngle;
    const refractionAngle = calculateRefractionAngle(incidentAngle) * 6;
    angleScreenCenter += refractionAngle;
    rainbow.current.rotation.z = angleScreenCenter;
    lerpV3(
      spotTarget.current.position,
      [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0],
      0.05,
    );
  }, []);

  useLayoutEffect(() => {
    if (spot.current && spotTarget.current) {
      spot.current.target = spotTarget.current;
    }
  }, []);

  useFrame(() => {
    lerp(rainbow.current.material, "speed", reducedMotion ? 0 : 1, 0.0025);
    lerp(
      rainbow.current.material,
      "emissiveIntensity",
      isPrismHit ? settings.rainbowIntensity : 0,
      0.1,
    );
    if (spot.current) {
      spot.current.intensity =
        rainbow.current.material.emissiveIntensity *
        settings.spotIntensityScale *
        lightScale;
    }
    if (ambient.current) {
      lerp(
        ambient.current,
        "intensity",
        settings.ambientIntensity * lightScale,
        0.025,
      );
    }
  });

  return (
    <>
      <AdaptiveCamera />
      <color attach="background" args={[settings.backgroundColor]} />
      <StudioEnvironment enabled={lightBackground} />
      <ambientLight ref={ambient} intensity={0} />
      <pointLight
        position={[10, -10, 0]}
        intensity={settings.pointLightIntensity * lightScale}
        decay={0}
      />
      <pointLight
        position={[0, 10, 0]}
        intensity={settings.pointLightIntensity * lightScale}
        decay={0}
      />
      <pointLight
        position={[-10, 0, 0]}
        intensity={settings.pointLightIntensity * lightScale}
        decay={0}
      />
      <spotLight
        ref={spot}
        intensity={lightScale}
        decay={0}
        distance={7}
        angle={1}
        penumbra={1}
        position={[0, 0, 1]}
      />
      <object3D ref={spotTarget} />
      <Beam
        start={ray.start}
        end={ray.end}
        far={20}
        isLightBackground={lightBackground}
      >
        <Prism
          position={[0, prismY, 0]}
          color={settings.prismColor}
          roughness={settings.prismRoughness}
          ior={settings.prismIor}
          thickness={settings.prismThickness}
          onRayOver={rayOver}
          onRayOut={rayOut}
          onRayMove={rayMove}
        />
      </Beam>
      <Rainbow
        ref={rainbow}
        startRadius={0}
        endRadius={0.5}
        fade={0}
        backgroundColor={settings.backgroundColor}
      />
      <Flare ref={flare} visible={isPrismHit} />
    </>
  );
}

function PostFx({
  bloomIntensity,
  ssrIntensity,
}: {
  bloomIntensity: number;
  ssrIntensity: number;
}) {
  const { gl, scene, camera, size } = useThree();
  const lut = useLoader(LUTCubeLoader, PRISM_ASSETS.lut) as LookupTexture;
  const composer = useRef<EffectComposer>(null);
  const bloom = useRef<BloomEffect>(null);
  const reflections = useRef<SSREffect>(null);
  const reflectionPass = useRef<EffectPass>(null);
  const mobile = size.width <= MOBILE_BREAKPOINT;
  const sizeRef = useRef(size);
  sizeRef.current = size;

  useLayoutEffect(() => {
    const next = new EffectComposer(gl, {
      frameBufferType: THREE.HalfFloatType,
      multisampling: 0,
      stencilBuffer: false,
    });
    const bloomEffect = new BloomEffect({
      intensity: 0.9,
      luminanceSmoothing: 1,
      luminanceThreshold: 1,
      mipmapBlur: true,
      levels: 9,
    });
    next.addPass(new RenderPass(scene, camera));
    const prism = scene.getObjectByName("prism-glass");
    const reflectionEffect =
      !mobile && prism
        ? new SSREffect(scene, camera, {
            intensity: 2.5,
            exponent: 1.6,
            distance: 0.5,
            fade: 0,
            roughnessFade: 1,
            thickness: 10,
            ior: 2.09,
            maxRoughness: 1,
            maxDepthDifference: 10,
            blend: 0.9,
            correction: 1,
            correctionRadius: 1,
            blur: 0,
            jitter: 2.8,
            jitterRoughness: 0,
            steps: 1,
            refineSteps: 1,
            missedRays: true,
            useNormalMap: false,
            useRoughnessMap: false,
            resolutionScale: 1,
          })
        : null;
    if (reflectionEffect && prism) {
      reflectionEffect.selection.set([prism]);
      reflectionEffect.blendMode.opacity.value = 0.5;
      reflectionPass.current = new EffectPass(camera, reflectionEffect);
      next.addPass(reflectionPass.current);
    }
    reflections.current = reflectionEffect;
    next.addPass(
      new EffectPass(camera, bloomEffect, new LUT3DEffect(lut.clone())),
    );
    next.setSize(sizeRef.current.width, sizeRef.current.height);
    composer.current = next;
    bloom.current = bloomEffect;
    return () => {
      next.dispose();
      composer.current = null;
      bloom.current = null;
      reflections.current = null;
      reflectionPass.current = null;
    };
  }, [camera, gl, lut, scene, mobile]);

  useLayoutEffect(() => {
    composer.current?.setSize(size.width, size.height);
  }, [size.height, size.width]);

  useFrame(() => {
    if (bloom.current) bloom.current.intensity = bloomIntensity;
    if (reflections.current) reflections.current.intensity = ssrIntensity;
    if (reflectionPass.current)
      reflectionPass.current.enabled = ssrIntensity > 0;
    composer.current?.render();
  }, 1);

  return null;
}

function WebGLContextGuard({ onRestore }: { onRestore: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (event: Event) => {
      event.preventDefault();
    };
    const onRestored = () => onRestore();
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [gl, onRestore]);
  return null;
}

export type PrismSceneProps = {
  className?: string;
};

export function PrismScene({ className }: PrismSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reducedMotion = useReducedMotion() ?? false;
  const [settings, setSettings] = useState<PrismSceneSettings>(DARK_PRESET);
  const [ray, setRay] = useState(DEFAULT_RAY);
  const [canvasKey, setCanvasKey] = useState(0);

  const updateAim = (clientX: number, clientY: number) => {
    const rect = wrapper.current?.getBoundingClientRect();
    if (!rect) return;
    const next = aimRayFromPointer(
      clientX,
      clientY,
      rect,
      cameraZoom(rect.width),
      rect.width <= MOBILE_BREAKPOINT ? -0.5 : 0,
    );
    if (next) setRay(next);
  };

  return (
    <div
      ref={wrapper}
      className={cn(
        "relative isolate h-[100dvh] w-full overflow-hidden bg-black font-sans text-[#ededed]",
        className,
      )}
      style={{ height: "var(--100vh, 100dvh)" }}
    >
      <p className="sr-only">
        Click or drag anywhere to aim the light beam at the prism.
      </p>
      <div
        className="absolute inset-0 z-10 cursor-crosshair touch-none"
        onPointerDown={(event) => {
          if (event.button !== 0 || !event.isPrimary) return;
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          updateAim(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          updateAim(event.clientX, event.clientY);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      />
      <WebGLErrorBoundary>
        <Canvas
          key={canvasKey}
          orthographic
          dpr={[1, 2]}
          gl={{
            antialias: false,
            premultipliedAlpha: false,
            stencil: false,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          camera={{ position: [0, 0, 100], zoom: 70 }}
          className="absolute inset-0 h-full w-full"
        >
          <WebGLContextGuard onRestore={() => setCanvasKey((k) => k + 1)} />
          {/* Keep asset loading inside Canvas so it does not tear down the renderer. */}
          <Suspense fallback={null}>
            <Scene
              settings={settings}
              ray={ray}
              reducedMotion={reducedMotion}
            />
            <PostFx
              bloomIntensity={settings.bloomIntensity}
              ssrIntensity={settings.ssrIntensity}
            />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
      <PrismTuningPanel
        settings={settings}
        ray={ray}
        onChange={setSettings}
        onReset={() => setSettings(DARK_PRESET)}
      />
    </div>
  );
}
