"use client";

import { useEffect, useMemo, useState } from "react";
import ClosingPlasma from "@workspace/ui/components/closing-plasma";
import { cn } from "@/lib/utils";
import {
  CLOSING_PLASMA_DEFAULT_CONFIG,
  type ClosingPlasmaConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";

const PRESETS: Array<{ name: string; config: ClosingPlasmaConfig }> = [
  {
    name: "Default",
    config: {
      ...CLOSING_PLASMA_DEFAULT_CONFIG,
      darkColorA: "#0d0d14",
      darkColorB: "#1f2540",
      darkColorC: "#4a6191",
    },
  },
  {
    name: "Nocturne",
    config: {
      ...CLOSING_PLASMA_DEFAULT_CONFIG,
      speed: 0.85,
      turbulence: 0.9,
      darkColorA: "#07040f",
      darkColorB: "#2a1047",
      darkColorC: "#8d4fd1",
    },
  },
  {
    name: "Pearl",
    config: {
      ...CLOSING_PLASMA_DEFAULT_CONFIG,
      speed: 0.7,
      sparkle: 0.65,
      grain: 0.8,
      darkColorA: "#071217",
      darkColorB: "#0e3f4b",
      darkColorC: "#63d8d2",
    },
  },
  {
    name: "Kinetic",
    config: {
      ...CLOSING_PLASMA_DEFAULT_CONFIG,
      speed: 1.5,
      turbulence: 1.35,
      mouseInfluence: 1.4,
      sparkle: 1.2,
      grain: 1.15,
      darkColorA: "#050708",
      darkColorB: "#143929",
      darkColorC: "#72ff88",
    },
  },
  {
    name: "Still",
    config: {
      ...CLOSING_PLASMA_DEFAULT_CONFIG,
      speed: 0.5,
      turbulence: 0.7,
      mouseInfluence: 0,
      interactive: false,
      sparkle: 0.45,
      grain: 0.75,
      darkColorA: "#111214",
      darkColorB: "#2a2d33",
      darkColorC: "#6b7280",
    },
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{children}</div>
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

function generateCode(config: ClosingPlasmaConfig) {
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

  return `<div className="w-full h-screen">\n  <ClosingPlasma \n    ${props}\n  />\n</div>`;
}

export function ClosingPlasmaPlayground() {
  const config = usePlaygroundStore((state) => state.closingPlasmaConfig);
  const renderVersion = usePlaygroundStore((state) => state.closingPlasmaRenderVersion);

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
        <ClosingPlasma key={renderVersion} {...config} className="h-full w-full" />
      </div>
    </div>
  );
}

export function ClosingPlasmaPersonalizePanel() {
  const config = usePlaygroundStore((state) => state.closingPlasmaConfig);
  const activePreset = usePlaygroundStore((state) => state.activeClosingPlasmaPreset);
  const setConfig = usePlaygroundStore((state) => state.setClosingPlasmaConfig);
  const setActivePreset = usePlaygroundStore((state) => state.setActiveClosingPlasmaPreset);
  const updateConfig = usePlaygroundStore((state) => state.updateClosingPlasmaConfig);
  const resetPreview = usePlaygroundStore((state) => state.resetClosingPlasmaPreview);
  const resetConfig = usePlaygroundStore((state) => state.resetClosingPlasmaConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = (key: keyof ClosingPlasmaConfig, value: string | number | boolean) => {
    updateConfig({ [key]: value } as Partial<ClosingPlasmaConfig>);

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
            Shape the closing plasma mood with theme, palette, and atmospheric motion controls.
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
                      background: `linear-gradient(125deg, ${preset.config.darkColorA} 0%, ${preset.config.darkColorB} 55%, ${preset.config.darkColorC} 100%)`,
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
          <SectionTitle>Palette</SectionTitle>
          <div className="grid grid-cols-3 gap-2.5">
            <ColorPicker label="Dark A" value={config.darkColorA} onChange={(v) => handleChange("darkColorA", v)} />
            <ColorPicker label="Dark B" value={config.darkColorB} onChange={(v) => handleChange("darkColorB", v)} />
            <ColorPicker label="Dark C" value={config.darkColorC} onChange={(v) => handleChange("darkColorC", v)} />
            <ColorPicker label="Light A" value={config.lightColorA} onChange={(v) => handleChange("lightColorA", v)} />
            <ColorPicker label="Light B" value={config.lightColorB} onChange={(v) => handleChange("lightColorB", v)} />
            <ColorPicker label="Light C" value={config.lightColorC} onChange={(v) => handleChange("lightColorC", v)} />
          </div>
        </div>

        <div>
          <SectionTitle>Motion</SectionTitle>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Slider label="Speed" min={0.2} max={2} step={0.1} value={config.speed} onChange={(v) => handleChange("speed", v)} />
            <Slider
              label="Turbulence"
              min={0.2}
              max={2}
              step={0.1}
              value={config.turbulence}
              onChange={(v) => handleChange("turbulence", v)}
            />
            <Slider
              label="Mouse Influence"
              min={0}
              max={2}
              step={0.1}
              value={config.mouseInfluence}
              onChange={(v) => handleChange("mouseInfluence", v)}
            />
            <Slider label="Sparkle" min={0} max={2} step={0.1} value={config.sparkle} onChange={(v) => handleChange("sparkle", v)} />
            <Slider label="Grain" min={0} max={2} step={0.1} value={config.grain} onChange={(v) => handleChange("grain", v)} />
            <Slider
              label="Vignette"
              min={0}
              max={2}
              step={0.1}
              value={config.vignette}
              onChange={(v) => handleChange("vignette", v)}
            />
            <Slider
              label="Opacity"
              min={0.1}
              max={1}
              step={0.05}
              value={config.opacity}
              onChange={(v) => handleChange("opacity", v)}
            />
            <div className="col-span-2">
              <Switch label="Pointer Interaction" checked={config.interactive} onChange={(v) => handleChange("interactive", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
