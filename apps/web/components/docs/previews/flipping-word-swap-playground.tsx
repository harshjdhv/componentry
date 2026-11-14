"use client";

import type { CSSProperties } from "react";
import { useDialKit } from "dialkit";
import { FlippingWordSwap } from "@workspace/ui/components/flipping-word-swap";
import { DocsPlayground, useLiveCode } from "@/components/docs-playground";

interface FlippingWordSwapConfig {
  word1: string;
  word2: string;
  word1LightColor: string;
  word1DarkColor: string;
  word2LightColor: string;
  word2DarkColor: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  duration: number;
  stagger: number;
}

type Slider = [number, number, number, number];
const controls = {
  word1: { type: "text" as const, default: "Componentry", placeholder: "Componentry" },
  word2: { type: "text" as const, default: "Consistency", placeholder: "Consistency" },
  duration: [400, 220, 800, 20] as Slider,
  stagger: [44, 0, 100, 2] as Slider,
  typography: {
    fontSize: [48, 44, 128, 2] as Slider,
    fontWeight: {
      type: "select" as const,
      options: ["400", "500", "600", "700"],
      default: "700",
    },
    letterSpacing: [-0.025, -0.08, 0.08, 0.005] as Slider,
    _collapsed: true,
  },
  colors: {
    word1LightColor: { type: "color" as const, default: "#18181b" },
    word1DarkColor: { type: "color" as const, default: "#f5f5f5" },
    word2LightColor: { type: "color" as const, default: "#18181b" },
    word2DarkColor: { type: "color" as const, default: "#f5f5f5" },
    _collapsed: true,
  },
};

function generateCode(config: FlippingWordSwapConfig) {
  return `import { FlippingWordSwap } from "@/components/ui/flipping-word-swap"

<div className="flex min-h-[400px] items-center justify-center">
  <FlippingWordSwap
    word1=${JSON.stringify(config.word1)}
    word2=${JSON.stringify(config.word2)}
    duration={${config.duration}}
    stagger={${config.stagger}}
    className="text-[${config.word1LightColor}] dark:text-[${config.word1DarkColor}]"
    toClassName="text-[${config.word2LightColor}] dark:text-[${config.word2DarkColor}]"
    style={{
      fontSize: ${config.fontSize},
      fontWeight: ${config.fontWeight},
      lineHeight: 1,
      letterSpacing: "${config.letterSpacing}em",
    }}
  />
</div>`;
}

export function FlippingWordSwapPlayground() {
  const values = useDialKit("Flipping Word Swap", controls, {
    id: "flipping-word-swap",
  });
  const config: FlippingWordSwapConfig = {
    // Single-line words, capped at 24 characters like the old inputs.
    word1: values.word1.replace(/\n/g, "").slice(0, 24),
    word2: values.word2.replace(/\n/g, "").slice(0, 24),
    duration: values.duration,
    stagger: values.stagger,
    ...values.typography,
    fontWeight: Number(values.typography.fontWeight),
    ...values.colors,
  };

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground
      label="Customize"
      minWidth={280}
      className="flex min-h-[440px] items-center justify-center overflow-hidden px-8 py-16"
    >
      <FlippingWordSwap
        word1={config.word1}
        word2={config.word2}
        duration={config.duration}
        stagger={config.stagger}
        className="text-[var(--flip-word-light)] dark:text-[var(--flip-word-dark)]"
        toClassName="text-[var(--flip-word-to-light)] dark:text-[var(--flip-word-to-dark)]"
        style={
          {
            "--flip-word-light": config.word1LightColor || "#18181b",
            "--flip-word-dark": config.word1DarkColor || "#f5f5f5",
            "--flip-word-to-light": config.word2LightColor || "#18181b",
            "--flip-word-to-dark": config.word2DarkColor || "#f5f5f5",
            fontSize: `${config.fontSize}px`,
            fontWeight: config.fontWeight,
            lineHeight: 1,
            letterSpacing: `${config.letterSpacing}em`,
          } as CSSProperties
        }
      />
    </DocsPlayground>
  );
}
