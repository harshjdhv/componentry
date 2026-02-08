"use client";

import { useState, useEffect } from "react";
import { RotateCcw, Copy, Check, Type, Palette, Sparkles, Layers, Sliders } from "lucide-react";
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

const Label = ({ children, className, icon: Icon }: { children: React.ReactNode; className?: string; icon?: React.ElementType }) => (
    <label className={cn("text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1.5 mb-2", className)}>
        {Icon && <Icon className="w-3 h-3" />}
        {children}
    </label>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hover:bg-background/80",
            className
        )}
        {...props}
    />
);

const TextArea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none hover:bg-background/80",
            className
        )}
        {...props}
    />
);

const Slider = ({ value, min, max, step, onChange, label }: { value: number; min: number; max: number; step: number; onChange: (val: number) => void; label: string }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center bg-muted/30 px-2 py-1.5 rounded-md border border-border/50">
            <span className="text-xs font-medium text-foreground/80">{label}</span>
            <span className="text-[10px] font-mono text-muted-foreground">{Number(value).toFixed(2)}</span>
        </div>
        <div className="px-1">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
        </div>
    </div>
);

const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) => (
    <div className="flex items-center gap-3 p-1.5 pr-3 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-colors group">
        <div className="h-8 w-10 shrink-0 rounded border border-white/10 overflow-hidden relative shadow-sm group-hover:ring-1 group-hover:ring-ring/50 transition-all">
            <div className="absolute inset-0" style={{ backgroundColor: value }} />
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
        </div>
        <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-foreground/90 truncate">{label}</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase truncate opacity-70 group-hover:opacity-100 transition-opacity">{value}</span>
        </div>
    </div>
);

const Switch = ({ checked, onChange, label }: { checked: boolean; onChange: (val: boolean) => void; label: string }) => (
    <div className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/20">
        <span className="text-xs font-medium text-foreground/80">{label}</span>
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                checked ? "bg-primary" : "bg-input"
            )}
        >
            <span
                data-state={checked ? "checked" : "unchecked"}
                className={cn(
                    "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    checked ? "translate-x-4" : "translate-x-0"
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
        <div className="w-full h-full flex flex-col rounded-xl border border-border bg-background shadow-lg overflow-hidden">
            {/* ----------------------------------------------------------------------------- 
               TOP: PREVIEW AREA
            ----------------------------------------------------------------------------- */}
            <div className="relative w-full aspect-video min-h-[400px] border-b border-border bg-zinc-950 group overflow-hidden">

                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handleCopyCode}
                        className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all cursor-pointer hover:border-white/30"
                        title="Copy JSX"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/90" />}
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 hover:rotate-180 transition-all cursor-pointer hover:border-white/30"
                        title="Reload Animation"
                    >
                        <RotateCcw className="w-4 h-4 text-white/90" />
                    </button>
                </div>

                {/* The Component Wrapper */}
                <div className={cn("relative w-full h-full", instrumentSerif.variable)}>
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
            <div className="w-full bg-card/50 backdrop-blur-sm">

                {/* Header & Presets */}
                <div className="p-6 border-b border-border bg-card/30">
                    <div className="flex items-center gap-2 mb-4">
                        <Layers className="w-4 h-4 text-primary" />
                        <h2 className="text-sm font-semibold tracking-wide text-foreground">Select a Style</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => handlePresetChange(preset.name)}
                                className={cn(
                                    "group relative flex flex-col items-start justify-between gap-3 p-3 h-20 rounded-xl border transition-all duration-200 text-left hover:shadow-md",
                                    activePreset === preset.name
                                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                        : "border-border bg-background/50 hover:border-primary/50 hover:bg-accent/50"
                                )}
                            >
                                <div className="flex items-center gap-1.5 w-full">
                                    <div
                                        className="w-full h-8 rounded-md shadow-sm border border-white/10"
                                        style={{
                                            background: `linear-gradient(135deg, ${preset.config.color1} 0%, ${preset.config.color2} 50%, ${preset.config.color3} 100%)`
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className={cn(
                                        "text-xs font-medium transition-colors",
                                        activePreset === preset.name ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}>
                                        {preset.name}
                                    </span>
                                    {activePreset === preset.name && <Check className="w-3 h-3 text-primary" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Controls Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-border">

                    {/* COL 1: CONTENT */}
                    <div className="p-6 space-y-5">
                        <Label icon={Type} className="pb-2 border-b border-border/40 w-full text-primary">Content</Label>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <span className="text-xs text-muted-foreground">Headlines</span>
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
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs text-muted-foreground">Description</span>
                                <TextArea
                                    value={config.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    placeholder="Description text..."
                                    className="h-[100px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* COL 2: THEME */}
                    <div className="p-6 space-y-5">
                        <Label icon={Palette} className="pb-2 border-b border-border/40 w-full text-primary">Theme Colors</Label>
                        <div className="space-y-4">
                            <ColorPicker
                                label="Primary (Deep Background)"
                                value={config.color1}
                                onChange={(v) => handleChange("color1", v)}
                            />
                            <ColorPicker
                                label="Secondary (Mid Gradient)"
                                value={config.color2}
                                onChange={(v) => handleChange("color2", v)}
                            />
                            <ColorPicker
                                label="Accent (Highlights)"
                                value={config.color3}
                                onChange={(v) => handleChange("color3", v)}
                            />
                        </div>
                    </div>

                    {/* COL 3: EFFECTS */}
                    <div className="p-6 space-y-5">
                        <Label icon={Sparkles} className="pb-2 border-b border-border/40 w-full text-primary">Effects & Motion</Label>
                        <div className="space-y-6">
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
                                label="Mouse Reaction"
                                min={0}
                                max={2}
                                step={0.1}
                                value={config.mouseIntensity}
                                onChange={(v) => handleChange("mouseIntensity", v)}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Slider
                                    label="Speed"
                                    min={0}
                                    max={3}
                                    step={0.1}
                                    value={config.speed}
                                    onChange={(v) => handleChange("speed", v)}
                                />
                                {config.showParticles && (
                                    <Slider
                                        label="Count"
                                        min={0}
                                        max={200}
                                        step={10}
                                        value={config.particleCount}
                                        onChange={(v) => handleChange("particleCount", v)}
                                    />
                                )}
                            </div>

                            <div className="pt-2">
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
