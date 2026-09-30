export type PrismSceneSettings = {
  ambientIntensity: number;
  pointLightIntensity: number;
  spotIntensityScale: number;
  rainbowIntensity: number;
  bloomIntensity: number;
  backgroundColor: string;
  prismColor: string;
  prismRoughness: number;
  prismIor: number;
  prismThickness: number;
  ssrIntensity: number;
};

export const DARK_PRESET: PrismSceneSettings = {
  ambientIntensity: 0.015,
  pointLightIntensity: 0.05,
  spotIntensityScale: 1,
  rainbowIntensity: 2.5,
  bloomIntensity: 0.9,
  backgroundColor: "#000000",
  prismColor: "#ffffff",
  prismRoughness: 0,
  prismIor: 1.5,
  prismThickness: 0.9,
  ssrIntensity: 2.5,
};

export const LIGHT_PRESET: PrismSceneSettings = {
  ...DARK_PRESET,
  backgroundColor: "#ffffff",
  ssrIntensity: 0,
};

export type SliderControl = {
  key: keyof Pick<
    PrismSceneSettings,
    | "ambientIntensity"
    | "pointLightIntensity"
    | "spotIntensityScale"
    | "rainbowIntensity"
    | "bloomIntensity"
    | "ssrIntensity"
    | "prismRoughness"
    | "prismIor"
    | "prismThickness"
  >;
  label: string;
  min: number;
  max: number;
  step: number;
  decimals: number;
};

export const SLIDER_CONTROLS: SliderControl[] = [
  {
    key: "ambientIntensity",
    label: "Ambient light",
    min: 0,
    max: 0.2,
    step: 0.001,
    decimals: 3,
  },
  {
    key: "pointLightIntensity",
    label: "Point lights",
    min: 0,
    max: 0.5,
    step: 0.005,
    decimals: 3,
  },
  {
    key: "spotIntensityScale",
    label: "Spot intensity ×",
    min: 0,
    max: 3,
    step: 0.05,
    decimals: 2,
  },
  {
    key: "rainbowIntensity",
    label: "Rainbow glow",
    min: 0,
    max: 10,
    step: 0.1,
    decimals: 1,
  },
  {
    key: "bloomIntensity",
    label: "Bloom",
    min: 0,
    max: 5,
    step: 0.05,
    decimals: 2,
  },
  {
    key: "ssrIntensity",
    label: "Reflections (SSR)",
    min: 0,
    max: 10,
    step: 0.1,
    decimals: 1,
  },
  {
    key: "prismRoughness",
    label: "Prism roughness",
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2,
  },
  {
    key: "prismIor",
    label: "Prism IOR",
    min: 1,
    max: 2.33,
    step: 0.01,
    decimals: 2,
  },
  {
    key: "prismThickness",
    label: "Prism thickness",
    min: 0,
    max: 3,
    step: 0.05,
    decimals: 2,
  },
];
