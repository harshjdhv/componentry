"use client";

import * as THREE from "three";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { invalidate, type ThreeElements } from "@react-three/fiber";

export type ReflectIntersection = THREE.Intersection & {
  direction?: THREE.Vector3;
  reflect?: THREE.Vector3;
};

export type ReflectHit = {
  key: string;
  intersect: ReflectIntersection;
  stopped: boolean;
};

export type ReflectApi = {
  number: number;
  objects: THREE.Object3D[];
  hits: Map<string, ReflectHit>;
  start: THREE.Vector3;
  end: THREE.Vector3;
  raycaster: THREE.Raycaster;
  positions: Float32Array;
  setRay: (
    start?: [number, number, number],
    end?: [number, number, number],
  ) => void;
  update: () => number;
};

export type ReflectEvent = {
  api: ReflectApi;
  object: THREE.Object3D;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  reflect?: THREE.Vector3;
  normal?: THREE.Vector3;
  intersect: ReflectIntersection;
  intersects: ReflectIntersection[];
  stopPropagation: () => void;
};

type RayMesh = THREE.Mesh & {
  onRayOver?: (event: ReflectEvent) => void;
  onRayOut?: (event: ReflectEvent) => void;
  onRayMove?: (event: ReflectEvent) => void;
};

function isRayMesh(object: THREE.Object3D): object is RayMesh {
  return (
    (object as THREE.Mesh).isMesh &&
    Boolean(
      (object as RayMesh).onRayOver ||
        (object as RayMesh).onRayOut ||
        (object as RayMesh).onRayMove,
    )
  );
}

function createEvent(
  api: ReflectApi,
  hit: ReflectHit,
  intersect: ReflectIntersection,
  intersects: ReflectIntersection[],
): ReflectEvent {
  return {
    api,
    object: intersect.object,
    position: intersect.point,
    direction: intersect.direction ?? new THREE.Vector3(),
    reflect: intersect.reflect,
    normal: intersect.face?.normal,
    intersect,
    intersects,
    stopPropagation: () => {
      hit.stopped = true;
    },
  };
}

export type ReflectProps = Omit<ThreeElements["group"], "ref"> & {
  start?: [number, number, number];
  end?: [number, number, number];
  far?: number;
};

export const Reflect = forwardRef<ReflectApi, ReflectProps>(
  (
    { children, start: startProp = [0, 0, 0], end: endProp = [0, 0, 0], far = 20, ...props },
    forwardedRef,
  ) => {
    const scene = useRef<THREE.Group>(null!);
    const vStart = useMemo(() => new THREE.Vector3(), []);
    const vEnd = useMemo(() => new THREE.Vector3(), []);
    const vDir = useMemo(() => new THREE.Vector3(), []);

    const api: ReflectApi = useMemo(
      () => ({
        number: 0,
        objects: [],
        hits: new Map(),
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        raycaster: new THREE.Raycaster(),
        positions: new Float32Array(33),
        setRay: (start = [0, 0, 0], end = [0, 0, 0]) => {
          api.start.set(...start);
          api.end.set(...end);
        },
        update: () => {
          api.objects = [];
          scene.current.traverse((object) => {
            if (isRayMesh(object)) api.objects.push(object);
          });
          if (!api.objects.length) return 0;

          api.number = 0;
          const intersects: ReflectIntersection[] = [];
          vStart.copy(api.start);
          vEnd.copy(api.end);
          vDir.subVectors(vEnd, vStart).normalize();
          vStart.toArray(api.positions, api.number++ * 3);
          api.raycaster.set(vStart, vDir);

          const hit =
            api.raycaster.intersectObjects(api.objects, false)[0] ?? null;

          if (hit?.face) {
            const decorated = hit as ReflectIntersection;
            decorated.direction = vDir.clone();
            decorated.reflect = vDir.clone();
            intersects.push(decorated);
            decorated.point.toArray(api.positions, api.number++ * 3);
          } else {
            vEnd
              .addVectors(vStart, vDir.multiplyScalar(far))
              .toArray(api.positions, api.number++ * 3);
          }

          api.number = 1;
          api.hits.forEach((stored) => {
            if (
              !intersects.find(
                (intersect) => intersect.object.uuid === stored.key,
              )
            ) {
              api.hits.delete(stored.key);
              const mesh = stored.intersect.object as RayMesh;
              mesh.onRayOut?.(
                createEvent(api, stored, stored.intersect, intersects),
              );
              invalidate();
            }
          });

          for (const intersect of intersects) {
            api.number++;
            if (!api.hits.has(intersect.object.uuid)) {
              const stored = {
                key: intersect.object.uuid,
                intersect,
                stopped: false,
              };
              api.hits.set(intersect.object.uuid, stored);
              (intersect.object as RayMesh).onRayOver?.(
                createEvent(api, stored, intersect, intersects),
              );
              invalidate();
            }

            const stored = api.hits.get(intersect.object.uuid)!;
            (intersect.object as RayMesh).onRayMove?.(
              createEvent(api, stored, intersect, intersects),
            );
            invalidate();
            if (stored.stopped) break;
            if (intersect === intersects[intersects.length - 1]) api.number++;
          }

          return Math.max(2, api.number);
        },
      }),
      [far, vDir, vEnd, vStart],
    );

    useLayoutEffect(() => {
      api.setRay(startProp, endProp);
    }, [api, startProp, endProp]);

    useImperativeHandle(forwardedRef, () => api, [api]);

    useLayoutEffect(() => {
      scene.current.updateWorldMatrix(true, true);
    });

    return (
      <group ref={scene} {...props}>
        {children}
      </group>
    );
  },
);

Reflect.displayName = "Reflect";
