"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { PRISM_ASSETS } from "./assets.js";
import { Reflect, type ReflectApi, type ReflectProps } from "./reflect.js";

export type BeamProps = ReflectProps & {
  isLightBackground?: boolean;
  stride?: number;
  width?: number;
};

export const Beam = forwardRef<ReflectApi, BeamProps>(
  (
    {
      children,
      position,
      isLightBackground = false,
      stride = 4,
      width = 8,
      ...props
    },
    forwardedRef,
  ) => {
    const streaks = useRef<THREE.InstancedMesh>(null!);
    const glow = useRef<THREE.InstancedMesh>(null!);
    const reflect = useRef<ReflectApi>(null!);
    const [streakTexture, glowTexture] = useTexture([
      PRISM_ASSETS.streak,
      PRISM_ASSETS.glow,
    ]);

    const obj = useMemo(() => new THREE.Object3D(), []);
    const from = useMemo(() => new THREE.Vector3(), []);
    const to = useMemo(() => new THREE.Vector3(), []);
    const normal = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
      const range = reflect.current.update() - 1;
      const stretch = isLightBackground ? 1 : stride;
      const beamWidth = isLightBackground ? 0.06 : width;

      for (let i = 0; i < range; i++) {
        from.fromArray(reflect.current.positions, i * 3);
        to.fromArray(reflect.current.positions, i * 3 + 3);
        normal.subVectors(to, from).normalize();
        obj.position.addVectors(from, to).divideScalar(2);
        obj.scale.set(to.distanceTo(from) * stretch, beamWidth, 1);
        obj.rotation.set(0, 0, Math.atan2(normal.y, normal.x));
        obj.updateMatrix();
        streaks.current.setMatrixAt(i, obj.matrix);
      }

      streaks.current.count = range;
      streaks.current.instanceMatrix.addUpdateRange(0, range * 16);
      streaks.current.instanceMatrix.needsUpdate = true;

      obj.scale.setScalar(0);
      obj.updateMatrix();
      glow.current.setMatrixAt(0, obj.matrix);

      for (let i = 1; i < range; i++) {
        obj.position.fromArray(reflect.current.positions, i * 3);
        obj.scale.setScalar(0.75);
        obj.rotation.set(0, 0, 0);
        obj.updateMatrix();
        glow.current.setMatrixAt(i, obj.matrix);
      }

      glow.current.count = range;
      glow.current.instanceMatrix.addUpdateRange(0, range * 16);
      glow.current.instanceMatrix.needsUpdate = true;
    });

    useImperativeHandle(forwardedRef, () => reflect.current, []);

    return (
      <group position={position}>
        <Reflect {...props} ref={reflect}>
          {children}
        </Reflect>
        <instancedMesh
          ref={streaks}
          args={[undefined, undefined, 100]}
          instanceMatrix-usage={THREE.DynamicDrawUsage}
        >
          <planeGeometry />
          {isLightBackground ? (
            <meshBasicMaterial
              color="#666666"
              depthWrite={false}
              opacity={0.7}
              toneMapped={false}
              transparent
            />
          ) : (
            <meshBasicMaterial
              map={streakTexture}
              color="#686868"
              opacity={1.5}
              transparent={false}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          )}
        </instancedMesh>
        <instancedMesh
          ref={glow}
          args={[undefined, undefined, 100]}
          instanceMatrix-usage={THREE.DynamicDrawUsage}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={glowTexture}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </instancedMesh>
      </group>
    );
  },
);

Beam.displayName = "Beam";
