"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { type ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { PRISM_ASSETS } from "./assets.js";
import type { ReflectEvent } from "./reflect.js";

type PrismGLTF = {
  nodes: { Cone: THREE.Mesh };
  materials: Record<string, THREE.Material>;
};

export type PrismProps = Omit<ThreeElements["group"], "ref"> & {
  color?: string;
  roughness?: number;
  ior?: number;
  thickness?: number;
  onRayOver?: (event: ReflectEvent) => void;
  onRayOut?: (event: ReflectEvent) => void;
  onRayMove?: (event: ReflectEvent) => void;
};

export function Prism({
  color = "#ffffff",
  roughness = 0,
  ior = 1.5,
  thickness = 0.9,
  onRayOver,
  onRayOut,
  onRayMove,
  ...props
}: PrismProps) {
  const { nodes } = useGLTF(PRISM_ASSETS.model) as unknown as PrismGLTF;

  return (
    <group {...props}>
      <mesh
        visible={false}
        scale={1.9}
        rotation={[Math.PI / 2, Math.PI, 0]}
        ref={(mesh) => {
          if (!mesh) return;
          Object.assign(mesh, { onRayOver, onRayOut, onRayMove });
        }}
      >
        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
      </mesh>
      <mesh
        name="prism-glass"
        position={[0, 0, 0.6]}
        renderOrder={10}
        scale={2}
        dispose={null}
        geometry={nodes.Cone.geometry}
      >
        <meshPhysicalMaterial
          color={color}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={roughness}
          metalness={0}
          transmission={1}
          thickness={thickness}
          ior={ior}
          envMapIntensity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(PRISM_ASSETS.model);
