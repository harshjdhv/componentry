"use client";

import { useEffect, useMemo, useState } from "react";
import WebGLLiquid from "@workspace/ui/components/webgl-liquid";
import { cn } from "@/lib/utils";
import {
  WEBGL_LIQUID_DEFAULT_CONFIG,
  type WebGLLiquidConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";

const PRESETS: Array<{ name: string; config: WebGLLiquidConfig }> = [
  {
    name: "Default",
    config: WEBGL_LIQUID_DEFAULT_CONFIG,
  },
  {
    name: "Midnight",
    config: {
      ...WEBGL_LIQUID_DEFAULT_CONFIG,
      title: "Midnight Drift",
      subtitle: "Depth by Design",
      colorDeep: "#02040b",
      colorMid: "#11315e",
      colorHighlight: "#67d5ff",
      speed: 0.9,
      flowStrength: 0.9,
      contrast: 1.2,
    },
  },
  {
    name: "Aurora",
    config: {
      ...WEBGL_LIQUID_DEFAULT_CONFIG,
      title: "Aurora Pulse",
      subtitle: "Luminous Gradient",
      colorDeep: "#070519",
      colorMid: "#3954d9",
      colorHighlight: "#7dffe5",
      flowStrength: 1.3,
      grain: 0.06,
      contrast: 1.15,
    },
  },
  {
    name: "Rose Gold",
    config: {
      ...WEBGL_LIQUID_DEFAULT_CONFIG,
      title: "Rose Current",
      subtitle: "Luxury Atmosphere",
      colorDeep: "#1a0a12",
      colorMid: "#7f2f5d",
      colorHighlight: "#ffd9b5",
      speed: 0.85,
      flowStrength: 0.75,
      opacity: 0.92,
    },
  },
  {
    name: "Kinetic",
    config: {
      ...WEBGL_LIQUID_DEFAULT_CONFIG,
      title: "Kinetic Wave",
      subtitle: "Momentum Forward",
      colorDeep: "#040506",
      colorMid: "#146684",
      colorHighlight: "#c6ffff",
      speed: 1.55,
      flowStrength: 1.6,
      grain: 0.08,
      contrast: 1.25,
    },
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{children}</div>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "h-10 w-full rounded-md border border-border/70 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25",
      className,
    )}
    {...props}
  />
);

const TextArea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "min-h-24 w-full resize-none rounded-md border border-border/70 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25",
      className,
    )}
    {...props}
  />
);

const Slider = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
  unit = "",
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  label: string;
  unit?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground/90">{label}</span>
      <span className="font-mono text-muted-foreground">
        {Number(value).toFixed(step < 0.1 ? 2 : 1)}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-300/70 dark:bg-zinc-700/70
      [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border [&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:bg-zinc-100"
    />
  </div>
);

const Switch = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
}) => (
  <label className="flex items-center justify-between rounded-md border border-border/70 p-2.5">
    <span className="text-sm text-foreground/90">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex h-6 w-10 items-center rounded-full border border-border transition-colors",
        checked ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-800",
      )}
    >
      <span
        className={cn(
          "mx-[2px] h-5 w-5 rounded-full bg-white transition-transform dark:bg-zinc-900",
          checked ? "translate-x-4" : "translate-x-0.5",
        )}
      />
    </button>
  </label>
);

function normalizeHexColor(value: string) {
  const trimmed = value.trim();
  if (!/^#?[0-9a-fA-F]{6}$/.test(trimmed)) {
    return null;
  }
  return `#${trimmed.replace("#", "").toLowerCase()}`;
}

const ColorPicker = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  label: string;
}) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <label className="flex items-center gap-3 rounded-md border border-border/70 p-2.5">
      <span className="relative h-8 w-8 overflow-hidden rounded border border-border">
        <span aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} color picker`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 block text-xs font-semibold text-foreground/90">{label}</span>
        <input
          value={draft}
          onChange={(e) => {
            const next = e.target.value;
            setDraft(next);
            const normalized = normalizeHexColor(next);
            if (normalized) {
              onChange(normalized);
            }
          }}
          placeholder="#000000"
          className="h-8 w-full rounded border border-border/70 bg-transparent px-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25"
        />
      </span>
    </label>
  );
};

function generateCode(config: WebGLLiquidConfig) {
  const props = Object.entries(config)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`;
      }
      if (typeof value === "boolean") {
        return value ? `${key}` : `${key}={false}`;
      }
      return `${key}={${value}}`;
    })
    .join("\n    ");

  return `<WebGLLiquid \n    ${props}\n/>`;
}

export function WebGLLiquidPlayground() {
  const config = usePlaygroundStore((state) => state.webglLiquidConfig);
  const renderVersion = usePlaygroundStore((state) => state.webglLiquidRenderVersion);

  useEffect(() => {
    const code = generateCode(config);
    const timeoutId = setTimeout(() => {
      usePlaygroundStore.getState().setCode(code);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [config]);

  return (
    <div className="relative h-full w-full bg-[#f3f4f6] dark:bg-[#09090b]">
      <div className="relative h-full w-full overflow-hidden rounded-none">
        <WebGLLiquid
          key={renderVersion}
          {...config}
          className="h-full w-full !min-h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
    </div>
  );
}

export function WebGLLiquidPersonalizePanel() {
  const config = usePlaygroundStore((state) => state.webglLiquidConfig);
  const activePreset = usePlaygroundStore((state) => state.activeWebglLiquidPreset);
  const setConfig = usePlaygroundStore((state) => state.setWebglLiquidConfig);
  const setActivePreset = usePlaygroundStore((state) => state.setActiveWebglLiquidPreset);
  const updateConfig = usePlaygroundStore((state) => state.updateWebglLiquidConfig);
  const resetPreview = usePlaygroundStore((state) => state.resetWebglLiquidPreview);
  const resetConfig = usePlaygroundStore((state) => state.resetWebglLiquidConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = (key: keyof WebGLLiquidConfig, value: string | number | boolean) => {
    updateConfig({ [key]: value } as Partial<WebGLLiquidConfig>);

    if (activePreset === "Custom") {
      return;
    }

    const matchedPreset = PRESETS.find(
      (preset) => JSON.stringify(preset.config) === JSON.stringify({ ...config, [key]: value }),
    );
    setActivePreset(matchedPreset?.name ?? "Custom");
  };

  const handlePresetChange = (presetName: string) => {
    const preset = PRESETS.find((item) => item.name === presetName);
    if (!preset) {
      return;
    }

    setConfig({ ...preset.config });
    setActivePreset(presetName);
    resetPreview();
  };

  return (
    <div className="h-full overflow-auto bg-[#f3f4f6] dark:bg-[#09090b] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="space-y-6 px-4 pb-10 pt-20">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">Personalize</h2>
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            Craft premium liquid motion by tuning typography, palette, and shader dynamics.
          </p>
        </header>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground/90">
            Current preset: <span className="font-mono text-foreground">{activePreset}</span>
          </div>
          <button
            type="button"
            onClick={resetConfig}
            className="rounded-md border border-border/40 bg-white/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground dark:bg-white/[0.03]"
          >
            Reset
          </button>
        </div>

        <div>
          <SectionTitle>Presets</SectionTitle>
          <div className="grid grid-cols-5 gap-1.5">
            {PRESETS.map((preset) => {
              const isActive =
                activePreset === preset.name ||
                (activePreset !== "Custom" && selectedPresetConfig && preset.name === activePreset);

              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handlePresetChange(preset.name)}
                  className={cn(
                    "rounded-md border p-1.5 text-center transition-colors",
                    isActive
                      ? "border-zinc-500/70 bg-zinc-100 dark:border-zinc-500/80 dark:bg-zinc-900/70"
                      : "border-border/70 bg-transparent",
                  )}
                >
                  <div
                    className="mb-1.5 h-4 rounded-sm border border-white/20"
                    style={{
                      background: `linear-gradient(125deg, ${preset.config.colorDeep} 0%, ${preset.config.colorMid} 55%, ${preset.config.colorHighlight} 100%)`,
                    }}
                  />
                  <span className="block truncate text-[10px] font-mono uppercase tracking-widest text-foreground/90">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <SectionTitle>Typography</SectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            <Input
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Headline line one"
            />
            <Input
              value={config.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              placeholder="Headline line two"
            />
            <TextArea
              value={config.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Support text"
            />
          </div>
        </div>

        <div>
          <SectionTitle>Palette</SectionTitle>
          <div className="grid grid-cols-3 gap-2.5">
            <ColorPicker label="Deep Base" value={config.colorDeep} onChange={(v) => handleChange("colorDeep", v)} />
            <ColorPicker label="Mid Tone" value={config.colorMid} onChange={(v) => handleChange("colorMid", v)} />
            <ColorPicker
              label="Highlight"
              value={config.colorHighlight}
              onChange={(v) => handleChange("colorHighlight", v)}
            />
          </div>
        </div>

        <div>
          <SectionTitle>Motion</SectionTitle>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Slider
              label="Speed"
              min={0.2}
              max={2.5}
              step={0.1}
              value={config.speed}
              onChange={(v) => handleChange("speed", v)}
              unit="x"
            />
            <Slider
              label="Flow Strength"
              min={0.2}
              max={2}
              step={0.1}
              value={config.flowStrength}
              onChange={(v) => handleChange("flowStrength", v)}
            />
            <Slider
              label="Grain"
              min={0}
              max={0.16}
              step={0.01}
              value={config.grain}
              onChange={(v) => handleChange("grain", v)}
            />
            <Slider
              label="Contrast"
              min={0.8}
              max={1.8}
              step={0.05}
              value={config.contrast}
              onChange={(v) => handleChange("contrast", v)}
            />
            <Slider
              label="Opacity"
              min={0.4}
              max={1}
              step={0.01}
              value={config.opacity}
              onChange={(v) => handleChange("opacity", v)}
            />
            <Slider
              label="Delay"
              min={0}
              max={2400}
              step={100}
              value={config.delayMs}
              onChange={(v) => handleChange("delayMs", v)}
              unit="ms"
            />
            <div className="col-span-2">
              <Switch label="Reveal Wipe" checked={config.reveal} onChange={(v) => handleChange("reveal", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
