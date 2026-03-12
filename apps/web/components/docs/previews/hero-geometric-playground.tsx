"use client";

import { useEffect, useMemo, useState } from "react";
import HeroGeometric from "@workspace/ui/components/hero-geometric";
import { cn } from "@/lib/utils";
import {
  HERO_GEOMETRIC_DEFAULT_CONFIG,
  type HeroGeometricConfig,
  usePlaygroundStore,
} from "@/hooks/use-playground-store";

const PRESETS: Array<{ name: string; config: HeroGeometricConfig }> = [
  {
    name: "Default",
    config: HERO_GEOMETRIC_DEFAULT_CONFIG,
  },
  {
    name: "Editorial",
    config: {
      ...HERO_GEOMETRIC_DEFAULT_CONFIG,
      title1: "Shape",
      title2: "Authority",
      description: "High-contrast geometry with restrained motion and premium editorial rhythm.",
      color1: "#0f172a",
      color2: "#e2e8f0",
      speed: 0.8,
    },
  },
  {
    name: "Warm",
    config: {
      ...HERO_GEOMETRIC_DEFAULT_CONFIG,
      title1: "Human",
      title2: "Energy",
      description: "A warm palette with crisp typography for product launches and storytelling pages.",
      color1: "#ea580c",
      color2: "#fff7ed",
      speed: 1,
    },
  },
  {
    name: "Ice",
    config: {
      ...HERO_GEOMETRIC_DEFAULT_CONFIG,
      title1: "Glacial",
      title2: "Precision",
      description: "Cool chroma gradients and subtle turbulence built for enterprise-first visual systems.",
      color1: "#0c4a6e",
      color2: "#ecfeff",
      speed: 1.25,
    },
  },
  {
    name: "Kinetic",
    config: {
      ...HERO_GEOMETRIC_DEFAULT_CONFIG,
      title1: "Motion",
      title2: "Driven",
      description: "Turn up energy with faster shader flow while preserving legibility and hierarchy.",
      color1: "#1d4ed8",
      color2: "#dbeafe",
      speed: 2,
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

function generateCode(config: HeroGeometricConfig) {
  const props = Object.entries(config)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (key === "title1" || key === "title2" || key === "description" || key.startsWith("color")) {
        return `${key}="${value}"`;
      }

      return `${key}={${value}}`;
    })
    .join("\n    ");

  return `<HeroGeometric \n    ${props}\n/>`;
}

export function HeroGeometricPlayground() {
  const config = usePlaygroundStore((state) => state.heroGeometricConfig);
  const renderVersion = usePlaygroundStore((state) => state.heroGeometricRenderVersion);

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
        <HeroGeometric
          key={renderVersion}
          {...config}
          className="h-full w-full !min-h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
    </div>
  );
}

export function HeroGeometricPersonalizePanel() {
  const config = usePlaygroundStore((state) => state.heroGeometricConfig);
  const activePreset = usePlaygroundStore((state) => state.activeHeroGeometricPreset);
  const setConfig = usePlaygroundStore((state) => state.setHeroGeometricConfig);
  const setActivePreset = usePlaygroundStore((state) => state.setActiveHeroGeometricPreset);
  const updateConfig = usePlaygroundStore((state) => state.updateHeroGeometricConfig);
  const resetPreview = usePlaygroundStore((state) => state.resetHeroGeometricPreview);
  const resetConfig = usePlaygroundStore((state) => state.resetHeroGeometricConfig);

  const selectedPresetConfig = useMemo(
    () => PRESETS.find((preset) => preset.name === activePreset)?.config,
    [activePreset],
  );

  const handleChange = (key: keyof HeroGeometricConfig, value: string | number) => {
    updateConfig({ [key]: value } as Partial<HeroGeometricConfig>);

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
            Shape your premium hero with custom typography, palette, and shader tempo.
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
                      background: `linear-gradient(125deg, ${preset.config.color1} 0%, ${preset.config.color2} 100%)`,
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
          <div className="grid grid-cols-2 gap-2.5">
            <Input
              value={config.title1}
              onChange={(e) => handleChange("title1", e.target.value)}
              placeholder="Primary headline"
            />
            <Input
              value={config.title2}
              onChange={(e) => handleChange("title2", e.target.value)}
              placeholder="Secondary headline"
            />
          </div>
          <div className="mt-2.5">
            <TextArea
              value={config.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Narrative subheadline"
            />
          </div>
        </div>

        <div>
          <SectionTitle>Palette</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            <ColorPicker label="Primary" value={config.color1} onChange={(v) => handleChange("color1", v)} />
            <ColorPicker label="Secondary" value={config.color2} onChange={(v) => handleChange("color2", v)} />
          </div>
        </div>

        <div>
          <SectionTitle>Motion</SectionTitle>
          <div className="grid grid-cols-1 gap-3">
            <Slider
              label="Speed"
              min={0.2}
              max={3}
              step={0.1}
              value={config.speed}
              onChange={(v) => handleChange("speed", v)}
              unit="x"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
