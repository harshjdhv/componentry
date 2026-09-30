export const PRISM_ASSETS = {
  model: "/prism-testing/gltf/prism.glb",
  lut: "/prism-testing/lut/F-6800-STD.cube",
  streak: "/prism-testing/textures/lensflare/lensflare2.png",
  glow: "/prism-testing/textures/lensflare/lensflare0_bw.jpg",
  flareDot: "/prism-testing/textures/lensflare/lensflare3.png",
  flareGlow: "/prism-testing/textures/lensflare/lensflare0_bw.png",
} as const;

export const DEFAULT_RAY = {
  start: [-10, -0.05, 0] as [number, number, number],
  end: [0, 0, 0] as [number, number, number],
};

export const RAY_LENGTH = 10;
export const MOBILE_BREAKPOINT = 600;
export const TABLET_BREAKPOINT = 960;

export function cameraZoom(width: number) {
  if (width <= MOBILE_BREAKPOINT) return 50;
  if (width <= TABLET_BREAKPOINT) return 70;
  return 100;
}

export function isLightColor(hex: string) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5;
}

export function aimRayFromPointer(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  zoom: number,
  prismY: number,
): { start: [number, number, number]; end: [number, number, number] } | null {
  const x = (clientX - rect.left - rect.width / 2) / zoom;
  const y = (rect.height / 2 - (clientY - rect.top)) / zoom;
  let dx = 0 - x;
  let dy = prismY - y;
  const length = Math.hypot(dx, dy);
  if (length < 0.01) return null;
  dx /= length;
  dy /= length;
  return {
    start: [0 - dx * RAY_LENGTH, prismY - dy * RAY_LENGTH, 0],
    end: [0, prismY, 0],
  };
}
