"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export function StudioEnvironment({ enabled }: { enabled: boolean }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    if (!enabled) {
      scene.environment = null;
      return;
    }

    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color("#000000");

    const addPanel = (
      intensity: number,
      position: [number, number, number],
      scale: [number, number, number],
    ) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(intensity, intensity, intensity),
          toneMapped: false,
          side: THREE.BackSide,
        }),
      );
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.lookAt(0, 0, 0);
      envScene.add(mesh);
    };

    addPanel(2.5, [0, 4, 5], [6, 3, 1]);
    addPanel(2, [-4, -1, 2], [6, 2, 1]);
    addPanel(2, [4, -1, 2], [6, 2, 1]);

    const target = pmrem.fromScene(envScene, 0.1, 100);
    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      envScene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
      });
    };
  }, [enabled, gl, scene]);

  return null;
}
