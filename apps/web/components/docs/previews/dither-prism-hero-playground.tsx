"use client";

import { useState, useEffect } from "react";
import { RotateCcw, Copy, Check, Type, Palette, Sparkles, Layers } from "lucide-react";
import DitherPrismHero from "@workspace/ui/components/dither-prism-hero";
import { cn } from "@/lib/utils";
import { Instrument_Serif } from "next/font/google";
import { usePlaygroundStore } from "@/hooks/use-playground-store";

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-serif",
});

const DEFAULT_CONFIG = {
    title1: "Experience",
    title2: "The Future",
    description: "Move your cursor to interact",
    color1: "#0f0f23",
    color2: "#6366f1",
    color3: "#ec4899",
    speed: 1,
    ditherIntensity: 0.15,
    prismIntensity: 0.5,
    mouseIntensity: 0.8,
    particleCount: 50,
    showParticles: true,
};

const PRESETS = [
    {
        name: "Default",
        config: DEFAULT_CONFIG
    },
    {
        name: "Cyberpunk",
        config: {
            ...DEFAULT_CONFIG,
            color1: "#0a0a0a",
            color2: "#00ff88",
            color3: "#00ffff",
            title1: "Cyber",
            title2: "Punk",
            ditherIntensity: 0.25,
            prismIntensity: 0.7,
        }
    },
    {
        name: "Sunset",
        config: {
            ...DEFAULT_CONFIG,
            color1: "#1a0a0a",
            color2: "#ff6b35",
            color3: "#ffd93d",
            title1: "Golden",
            title2: "Hour",
            ditherIntensity: 0.12,
            prismIntensity: 0.4,
        }
    },
    {
        name: "Ocean",
        config: {
            ...DEFAULT_CONFIG,
            color1: "#0a1628",
            color2: "#0ea5e9",
            color3: "#22d3ee",
            title1: "Deep",
            title2: "Ocean",
            speed: 0.7,
            particleCount: 100,
        }
    },
    {
        name: "Maximum",
        config: {
            ...DEFAULT_CONFIG,
            title1: "Maximum",
            title2: "Impact",
            ditherIntensity: 0.3,
            prismIntensity: 0.9,
            mouseIntensity: 1.0,
            speed: 1.5,
            particleCount: 80,
        }
    }
];

// -----------------------------------------------------------------------------
// Reusable Control Components
// -----------------------------------------------------------------------------

const Label = ({ children, className, icon: Icon }: { children: React.ReactNode; className?: string; icon?: React.ComponentType<{ className?: string }> }) => (
    <div className={cn("text-[11px] uppercase tracking-widest font-bold text-muted-foreground/70 flex items-center gap-1.5 mb-2.5", className)}>
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {children}
    </div>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={cn(
            "flex h-9 w-full rounded-lg border border-border/40 bg-background/50 px-3 py-1 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-background/80",
            className
        )}
        {...props}
    />
);

const TextArea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-border/40 bg-background/50 px-3 py-2 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none hover:bg-background/80",
            className
        )}
        {...props}
    />
);

const Slider = ({ value, min, max, step, onChange, label, unit = "" }: { value: number; min: number; max: number; step: number; onChange: (val: number) => void; label: string; unit?: string }) => (
    <div className="space-y-3 group">
        <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">{label}</span>
            <span className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-[4px] border border-border/20">{Number(value).toFixed(step < 0.1 ? 2 : 1)}{unit}</span>
        </div>
        <div className="relative flex items-center h-4">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_2px_5px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.1)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            />
        </div>
    </div>
);

const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) => (
    <div className="flex items-center gap-3 p-2 rounded-xl border border-border/40 bg-background/50 hover:bg-background/80 hover:border-border/60 transition-all group cursor-pointer shadow-sm">
        <div className="h-9 w-9 shrink-0 rounded-full border border-border/50 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0" style={{ backgroundColor: value }} />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-foreground/90 truncate group-hover:text-primary transition-colors">{label}</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase truncate opacity-70 group-hover:opacity-100 transition-opacity">{value}</span>
        </div>
    </div>
);

const Switch = ({ checked, onChange, label }: { checked: boolean; onChange: (val: boolean) => void; label: string }) => (
    <div className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-background/50">
        <span className="text-xs font-medium text-foreground/80">{label}</span>
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                checked ? "bg-primary shadow-[0_2px_5px_rgba(0,0,0,0.2)]" : "bg-input shadow-inner"
            )}
        >
            <span
                data-state={checked ? "checked" : "unchecked"}
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    </div>
);

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function DitherPrismHeroPlayground() {
    const [key, setKey] = useState(0);
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [activePreset, setActivePreset] = useState("Default");
    const [copied, setCopied] = useState(false);

    const handleReset = () => {
        setKey((prev) => prev + 1);
    };

    const handleChange = (key: keyof typeof config, value: string | number | boolean) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
        if (activePreset !== "Custom") setActivePreset("Custom");
    };

    const handlePresetChange = (presetName: string) => {
        const preset = PRESETS.find(p => p.name === presetName);
        if (preset) {
            setConfig(preset.config);
            setActivePreset(presetName);
            setKey(prev => prev + 1);
        }
    };

    const generateCode = () => {
        const props = Object.entries(config)
            .filter(([, value]) => value !== undefined && value !== null)
            .map(([key, value]) => {
                if (key === 'description' || key === 'title1' || key === 'title2' || key.startsWith('color')) {
                    return `${key}="${value}"`;
                }
                if (typeof value === 'boolean') {
                    return value ? `${key}` : `${key}={false}`;
                }
                return `${key}={${value}}`;
            })
            .join('\n    ');

        return `<DitherPrismHero \n    ${props}\n/>`;
    };

    useEffect(() => {
        const code = generateCode();
        const timeoutId = setTimeout(() => {
            usePlaygroundStore.getState().setCode(code);
        }, 500);
        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    const handleCopyCode = () => {
        const code = generateCode();
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col">
            {/* ----------------------------------------------------------------------------- 
               TOP: PREVIEW AREA
            ----------------------------------------------------------------------------- */}
            <div className="w-full rounded-t-xl border border-border/40 border-b-0 bg-zinc-950 overflow-hidden relative group ring-0">

                {/* Overlay Controls */}
                <div className="absolute top-6 right-6 z-50 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white/90 hover:bg-white/10 transition-all cursor-pointer hover:border-white/30 hover:shadow-lg hover:shadow-primary/10"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy JSX"}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/90 hover:bg-white/10 hover:rotate-180 transition-all cursor-pointer hover:border-white/30"
                        title="Reload Animation"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* The Component Wrapper */}
                <div className={cn("relative w-full aspect-video min-h-[400px]", instrumentSerif.variable)}>
                    <DitherPrismHero
                        key={key}
                        {...config}
                        className="!min-h-0 h-full w-full"
                        style={{ minHeight: "100%" }}
                    />
                </div>
            </div>

            {/* ----------------------------------------------------------------------------- 
               BOTTOM: CONFIGURATION PANEL
            ----------------------------------------------------------------------------- */}
            <div className="w-full flex flex-col rounded-b-xl rounded-t-none border border-border/40 bg-card/30 backdrop-blur-xl overflow-hidden ring-0">

                {/* Header & Presets */}
                <div className="p-5 border-b border-border/40 bg-background/20 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                            <Layers className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-sm font-semibold text-foreground tracking-tight">Design System</h2>
                    </div>

                    <div
                        className="flex gap-3 pb-4 overflow-x-auto scrollbar-hide -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none"
                        style={{
                            maskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)"
                        }}
                    >
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => handlePresetChange(preset.name)}
                                className={cn(
                                    "group relative flex-none w-24 snap-start flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-300",
                                    activePreset === preset.name
                                        ? "border-primary/50 bg-primary/5 shadow-sm"
                                        : "border-border/40 bg-background/40 hover:border-primary/30 hover:bg-background/60"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-full aspect-[2/1] rounded-lg shadow-sm border border-white/10 transition-transform duration-500",
                                        activePreset === preset.name ? "scale-105" : "group-hover:scale-105"
                                    )}
                                    style={{
                                        background: `linear-gradient(135deg, ${preset.config.color1} 0%, ${preset.config.color2} 50%, ${preset.config.color3} 100%)`
                                    }}
                                />
                                <span className={cn(
                                    "text-[10px] font-medium transition-colors whitespace-nowrap",
                                    activePreset === preset.name ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}>
                                    {preset.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Controls Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* SECTION: CONTENT */}
                    <div className="space-y-4">
                        <Label icon={Type}>Typography & Content</Label>
                        <div className="space-y-3 pl-1">
                            <Input
                                value={config.title1}
                                onChange={(e) => handleChange("title1", e.target.value)}
                                placeholder="Headline Line 1"
                            />
                            <Input
                                value={config.title2}
                                onChange={(e) => handleChange("title2", e.target.value)}
                                placeholder="Headline Line 2"
                            />
                            <TextArea
                                value={config.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Description text..."
                                className="h-[70px]"
                            />
                        </div>
                    </div>

                    {/* SECTION: THEME */}
                    <div className="space-y-4">
                        <Label icon={Palette}>Color Palette</Label>
                        <div className="space-y-2 pl-1">
                            <ColorPicker
                                label="Primary Base"
                                value={config.color1}
                                onChange={(v) => handleChange("color1", v)}
                            />
                            <ColorPicker
                                label="Secondary Flow"
                                value={config.color2}
                                onChange={(v) => handleChange("color2", v)}
                            />
                            <ColorPicker
                                label="Accent Highlight"
                                value={config.color3}
                                onChange={(v) => handleChange("color3", v)}
                            />
                        </div>
                    </div>

                    {/* SECTION: VISUALS */}
                    <div className="space-y-5">
                        <Label icon={Sparkles}>Visual Effects</Label>
                        <div className="space-y-5 pl-1">
                            <Slider
                                label="Dither Grain"
                                min={0}
                                max={1}
                                step={0.01}
                                value={config.ditherIntensity}
                                onChange={(v) => handleChange("ditherIntensity", v)}
                            />
                            <Slider
                                label="Prism Refraction"
                                min={0}
                                max={2}
                                step={0.1}
                                value={config.prismIntensity}
                                onChange={(v) => handleChange("prismIntensity", v)}
                            />
                            <Slider
                                label="Mouse Interaction"
                                min={0}
                                max={2}
                                step={0.1}
                                value={config.mouseIntensity}
                                onChange={(v) => handleChange("mouseIntensity", v)}
                            />
                            <div className="pt-2 border-t border-border/30">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <Slider
                                        label="Speed"
                                        min={0}
                                        max={3}
                                        step={0.1}
                                        value={config.speed}
                                        onChange={(v) => handleChange("speed", v)}
                                        unit="x"
                                    />
                                    {config.showParticles && (
                                        <Slider
                                            label="Particles"
                                            min={0}
                                            max={200}
                                            step={10}
                                            value={config.particleCount}
                                            onChange={(v) => handleChange("particleCount", v)}
                                        />
                                    )}
                                </div>
                                <Switch
                                    label="Floating Particles"
                                    checked={config.showParticles}
                                    onChange={(v) => handleChange("showParticles", v)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
