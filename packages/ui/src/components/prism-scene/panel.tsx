"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import {
  DARK_PRESET,
  LIGHT_PRESET,
  SLIDER_CONTROLS,
  type PrismSceneSettings,
} from "./settings.js";
import { DEFAULT_RAY } from "./assets.js";

type PrismTuningPanelProps = {
  settings: PrismSceneSettings;
  ray: { start: [number, number, number]; end: [number, number, number] };
  onChange: (settings: PrismSceneSettings) => void;
  onReset: () => void;
};

export function PrismTuningPanel({
  settings,
  ray,
  onChange,
  onReset,
}: PrismTuningPanelProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const patch = <K extends keyof PrismSceneSettings>(
    key: K,
    value: PrismSceneSettings[K],
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const copySettings = async () => {
    const payload = JSON.stringify({ tuning: settings, beam: ray ?? DEFAULT_RAY }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        title="Scene tuning"
        aria-label="Open scene tuning"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed right-4 bottom-4 z-[1000] flex size-8 items-center justify-center rounded-full border border-white/20 bg-[#101010d1] text-[#ededed] backdrop-blur-md",
          "hover:border-white/50 max-[600px]:right-3 max-[600px]:bottom-3",
          open && "hidden",
        )}
      >
        <Settings className="size-4" strokeWidth={1.5} />
      </button>

      <aside
        aria-label="Scene tuning"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerMove={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        className={cn(
          "fixed right-4 bottom-4 z-[1000] w-[180px] select-none rounded-[10px] border border-white/12 bg-[#101010d1] px-3 py-2.5 text-[11px] text-[#ededed] backdrop-blur-md",
          "max-[600px]:inset-x-3 max-[600px]:bottom-3 max-[600px]:w-auto",
          !open && "hidden",
        )}
      >
        <div className="mb-1.5 flex items-center justify-between font-semibold tracking-[0.02em]">
          <span>Scene tuning</span>
          <span className="flex gap-1">
            <button
              type="button"
              onClick={onReset}
              className="rounded-[5px] border border-white/20 px-1.5 py-px hover:border-white/50"
            >
              Reset
            </button>
            <button
              type="button"
              aria-label="Close tuning panel"
              onClick={() => setOpen(false)}
              className="rounded-[5px] border border-white/20 px-1.5 py-px hover:border-white/50"
            >
              ×
            </button>
          </span>
        </div>

        <div className="mb-1.5 flex gap-1.5">
          <button
            type="button"
            onClick={() => onChange(DARK_PRESET)}
            className="flex-1 rounded-[5px] border border-white/20 px-1.5 py-0.5 hover:border-white/50"
          >
            Dark
          </button>
          <button
            type="button"
            onClick={() => onChange(LIGHT_PRESET)}
            className="flex-1 rounded-[5px] border border-white/20 px-1.5 py-0.5 hover:border-white/50"
          >
            Light
          </button>
        </div>

        {SLIDER_CONTROLS.map((control) => (
          <label key={control.key} className="my-1.5 block">
            <span className="mb-px flex justify-between">
              <span>{control.label}</span>
              <span className="font-variant-numeric tabular-nums text-[#888]">
                {settings[control.key].toFixed(control.decimals)}
              </span>
            </span>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              aria-label={control.label}
              value={settings[control.key]}
              onChange={(event) =>
                patch(control.key, event.target.valueAsNumber)
              }
              className="m-0 h-4 w-full accent-white"
            />
          </label>
        ))}

        {(
          [
            ["backgroundColor", "Background"],
            ["prismColor", "Prism tint"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="my-1.5 block">
            <span className="mb-px flex justify-between">
              <span>{label}</span>
              <span className="font-variant-numeric tabular-nums text-[#888]">
                {settings[key]}
              </span>
            </span>
            <input
              type="color"
              aria-label={label}
              value={settings[key]}
              onChange={(event) => patch(key, event.target.value)}
              className="h-4 w-full cursor-pointer rounded border border-white/20 bg-transparent p-0"
            />
          </label>
        ))}

        <button
          type="button"
          aria-label="Copy settings"
          onClick={() => void copySettings()}
          className="mt-2 w-full rounded-[5px] border border-white/20 px-1.5 py-0.5 hover:border-white/50"
        >
          {copied ? "Copied!" : "Copy settings"}
        </button>
      </aside>
    </>
  );
}
