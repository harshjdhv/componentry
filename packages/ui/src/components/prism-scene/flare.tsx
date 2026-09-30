"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { forwardRef, useRef } from "react";
import { Instances, Instance, useTexture } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { PRISM_ASSETS } from "./assets.js";

export type FlareProps = Omit<ThreeElements["group"], "ref"> & {
  streak?: [number, number, number];
};

export const Flare = forwardRef<THREE.Group, FlareProps>(
  ({ streak = [12.5, 20, 1], visible, scale = 1.25, ...props }, forwardedRef) => {
    const dots = useRef<THREE.Group>(null!);
    const [streakTexture, dotTexture, glowTexture] = useTexture([
      PRISM_ASSETS.streak,
      PRISM_ASSETS.flareDot,
      PRISM_ASSETS.flareGlow,
    ]);

    const config = {
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    };

    useFrame((state) => {
      if (!visible) return;
      dots.current.children.forEach((instance) => {
        instance.position.x =
          (Math[instance.scale.x > 1 ? "sin" : "cos"](
            (state.clock.elapsedTime * instance.scale.x) / 2,
          ) *
            instance.scale.x) /
          8;
        instance.position.y =
          (Math[instance.scale.x > 1 ? "cos" : "atan"](
            state.clock.elapsedTime * instance.scale.x,
          ) *
            instance.scale.x) /
          5;
      });
    });

    return (
      <group
        ref={forwardedRef}
        {...props}
        scale={scale}
        visible={visible}
        renderOrder={10}
        dispose={null}
      >
        <Instances frames={visible ? Infinity : 1}>
          <planeGeometry />
          <meshBasicMaterial map={dotTexture} {...config} opacity={0.12} />
          <group ref={dots}>
            <Instance scale={0.5} />
            <Instance scale={1.25} />
            <Instance scale={0.75} />
            <Instance scale={1.5} />
            <Instance scale={2} position={[0, 0, -0.7]} />
          </group>
        </Instances>
        <mesh scale={0.12}>
          <planeGeometry />
          <meshBasicMaterial map={glowTexture} {...config} opacity={0.75} />
        </mesh>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial map={glowTexture} {...config} opacity={0.1} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} scale={streak}>
          <planeGeometry />
          <meshBasicMaterial map={streakTexture} {...config} opacity={0.08} />
        </mesh>
      </group>
    );
  },
);

Flare.displayName = "Flare";
