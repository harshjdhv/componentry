"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useLayoutEffect, useState } from "react";

import { cn } from "@workspace/ui/lib/utils";

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity?: 0 | 1;
};

export type MorphingIconCategory =
  | "Actions"
  | "Media"
  | "Transfer"
  | "Arrows"
  | "Layout";

export type MorphingIconDefinition = {
  name: string;
  label: string;
  category: MorphingIconCategory;
  lines: readonly [Segment, Segment, Segment];
  group: string;
  rotation: number;
};

const hidden = {
  x1: 7,
  y1: 7,
  x2: 7,
  y2: 7,
  opacity: 0,
} as const;

const dot = (x: number, y: number): Segment => ({
  x1: x - 0.01,
  y1: y,
  x2: x + 0.01,
  y2: y,
});

const arrowLines = [
  { x1: 3, y1: 7, x2: 11, y2: 7 },
  { x1: 7, y1: 3, x2: 11, y2: 7 },
  { x1: 7, y1: 11, x2: 11, y2: 7 },
] as const satisfies MorphingIconDefinition["lines"];

const chevronLines = [
  hidden,
  { x1: 5, y1: 3, x2: 9, y2: 7 },
  { x1: 5, y1: 11, x2: 9, y2: 7 },
] as const satisfies MorphingIconDefinition["lines"];

const triangleLines = [
  { x1: 4, y1: 3.5, x2: 4, y2: 10.5 },
  { x1: 4, y1: 10.5, x2: 10.5, y2: 7 },
  { x1: 4, y1: 3.5, x2: 10.5, y2: 7 },
] as const satisfies MorphingIconDefinition["lines"];

const plusLines = [
  { x1: 7, y1: 3, x2: 7, y2: 11 },
  { x1: 3, y1: 7, x2: 11, y2: 7 },
  hidden,
] as const satisfies MorphingIconDefinition["lines"];

const moreLines = [
  dot(3.5, 7),
  dot(7, 7),
  dot(10.5, 7),
] as const satisfies MorphingIconDefinition["lines"];

export const morphingIcons = [
  {
    name: "menu",
    label: "Menu",
    category: "Actions",
    group: "menu",
    rotation: 0,
    lines: [
      { x1: 2.5, y1: 4, x2: 11.5, y2: 4 },
      { x1: 2.5, y1: 7, x2: 11.5, y2: 7 },
      { x1: 2.5, y1: 10, x2: 11.5, y2: 10 },
    ],
  },
  {
    name: "cross",
    label: "Close",
    category: "Actions",
    group: "plus-cross",
    rotation: 45,
    lines: plusLines,
  },
  {
    name: "plus",
    label: "Plus",
    category: "Actions",
    group: "plus-cross",
    rotation: 0,
    lines: plusLines,
  },
  {
    name: "minus",
    label: "Minus",
    category: "Actions",
    group: "minus",
    rotation: 0,
    lines: [hidden, { x1: 3, y1: 7, x2: 11, y2: 7 }, hidden],
  },
  {
    name: "equals",
    label: "Equals",
    category: "Actions",
    group: "bars",
    rotation: 0,
    lines: [
      { x1: 3, y1: 9, x2: 11, y2: 9 },
      hidden,
      { x1: 3, y1: 5, x2: 11, y2: 5 },
    ],
  },
  {
    name: "asterisk",
    label: "Asterisk",
    category: "Actions",
    group: "asterisk",
    rotation: 0,
    lines: [
      { x1: 7, y1: 2.5, x2: 7, y2: 11.5 },
      { x1: 3, y1: 4.5, x2: 11, y2: 9.5 },
      { x1: 3, y1: 9.5, x2: 11, y2: 4.5 },
    ],
  },
  {
    name: "more-horizontal",
    label: "More horizontal",
    category: "Actions",
    group: "more",
    rotation: 0,
    lines: moreLines,
  },
  {
    name: "more-vertical",
    label: "More vertical",
    category: "Actions",
    group: "more",
    rotation: 90,
    lines: moreLines,
  },
  {
    name: "check",
    label: "Check",
    category: "Actions",
    group: "check",
    rotation: 0,
    lines: [
      { x1: 2.5, y1: 7, x2: 5.5, y2: 10.5 },
      { x1: 5.5, y1: 10.5, x2: 11.5, y2: 4 },
      hidden,
    ],
  },
  {
    name: "slash",
    label: "Slash",
    category: "Actions",
    group: "slash",
    rotation: 0,
    lines: [hidden, { x1: 3, y1: 11, x2: 11, y2: 3 }, hidden],
  },
  {
    name: "play",
    label: "Play",
    category: "Media",
    group: "triangle",
    rotation: 0,
    lines: triangleLines,
  },
  {
    name: "pause",
    label: "Pause",
    category: "Media",
    group: "pause",
    rotation: 0,
    lines: [
      { x1: 4.5, y1: 3.5, x2: 4.5, y2: 10.5 },
      hidden,
      { x1: 9.5, y1: 3.5, x2: 9.5, y2: 10.5 },
    ],
  },
  {
    name: "volume",
    label: "Volume",
    category: "Media",
    group: "volume",
    rotation: 0,
    lines: [
      { x1: 3, y1: 6, x2: 5.5, y2: 6 },
      { x1: 5.5, y1: 6, x2: 8.5, y2: 3.5 },
      { x1: 8.5, y1: 3.5, x2: 8.5, y2: 10.5 },
    ],
  },
  {
    name: "volume-off",
    label: "Volume off",
    category: "Media",
    group: "volume-off",
    rotation: 0,
    lines: [
      { x1: 3, y1: 6, x2: 5.5, y2: 6 },
      { x1: 5.5, y1: 6, x2: 8.5, y2: 3.5 },
      { x1: 4, y1: 3, x2: 11, y2: 11 },
    ],
  },
  {
    name: "download",
    label: "Download",
    category: "Transfer",
    group: "download",
    rotation: 0,
    lines: [
      { x1: 3.5, y1: 11, x2: 10.5, y2: 11 },
      { x1: 10, y1: 6, x2: 7, y2: 9 },
      { x1: 4, y1: 6, x2: 7, y2: 9 },
    ],
  },
  {
    name: "upload",
    label: "Upload",
    category: "Transfer",
    group: "upload",
    rotation: 0,
    lines: [
      { x1: 3.5, y1: 11, x2: 10.5, y2: 11 },
      { x1: 4, y1: 8, x2: 7, y2: 5 },
      { x1: 10, y1: 8, x2: 7, y2: 5 },
    ],
  },
  {
    name: "external",
    label: "External",
    category: "Transfer",
    group: "external",
    rotation: 0,
    lines: [
      { x1: 4, y1: 10, x2: 10, y2: 4 },
      { x1: 5.5, y1: 4, x2: 10, y2: 4 },
      { x1: 10, y1: 4, x2: 10, y2: 8.5 },
    ],
  },
  {
    name: "arrow-right",
    label: "Arrow right",
    category: "Arrows",
    lines: arrowLines,
    group: "arrow",
    rotation: 0,
  },
  {
    name: "arrow-down",
    label: "Arrow down",
    category: "Arrows",
    lines: arrowLines,
    group: "arrow",
    rotation: 90,
  },
  {
    name: "arrow-left",
    label: "Arrow left",
    category: "Arrows",
    lines: arrowLines,
    group: "arrow",
    rotation: 180,
  },
  {
    name: "arrow-up",
    label: "Arrow up",
    category: "Arrows",
    lines: arrowLines,
    group: "arrow",
    rotation: 270,
  },
  {
    name: "chevron-right",
    label: "Chevron right",
    category: "Arrows",
    lines: chevronLines,
    group: "chevron",
    rotation: 0,
  },
  {
    name: "chevron-down",
    label: "Chevron down",
    category: "Arrows",
    lines: chevronLines,
    group: "chevron",
    rotation: 90,
  },
  {
    name: "chevron-left",
    label: "Chevron left",
    category: "Arrows",
    lines: chevronLines,
    group: "chevron",
    rotation: 180,
  },
  {
    name: "chevron-up",
    label: "Chevron up",
    category: "Arrows",
    lines: chevronLines,
    group: "chevron",
    rotation: 270,
  },
  {
    name: "triangle-right",
    label: "Triangle right",
    category: "Arrows",
    lines: triangleLines,
    group: "triangle",
    rotation: 0,
  },
  {
    name: "triangle-down",
    label: "Triangle down",
    category: "Arrows",
    lines: triangleLines,
    group: "triangle",
    rotation: 90,
  },
  {
    name: "triangle-left",
    label: "Triangle left",
    category: "Arrows",
    lines: triangleLines,
    group: "triangle",
    rotation: 180,
  },
  {
    name: "triangle-up",
    label: "Triangle up",
    category: "Arrows",
    lines: triangleLines,
    group: "triangle",
    rotation: 270,
  },
  {
    name: "align-left",
    label: "Align left",
    category: "Layout",
    group: "align",
    rotation: 0,
    lines: [
      { x1: 3, y1: 4, x2: 11, y2: 4 },
      { x1: 3, y1: 7, x2: 8.5, y2: 7 },
      { x1: 3, y1: 10, x2: 10, y2: 10 },
    ],
  },
  {
    name: "align-center",
    label: "Align center",
    category: "Layout",
    group: "align",
    rotation: 0,
    lines: [
      { x1: 3, y1: 4, x2: 11, y2: 4 },
      { x1: 4.25, y1: 7, x2: 9.75, y2: 7 },
      { x1: 3.5, y1: 10, x2: 10.5, y2: 10 },
    ],
  },
  {
    name: "align-right",
    label: "Align right",
    category: "Layout",
    group: "align",
    rotation: 0,
    lines: [
      { x1: 3, y1: 4, x2: 11, y2: 4 },
      { x1: 5.5, y1: 7, x2: 11, y2: 7 },
      { x1: 4, y1: 10, x2: 11, y2: 10 },
    ],
  },
  {
    name: "sort-ascending",
    label: "Sort ascending",
    category: "Layout",
    group: "sort",
    rotation: 0,
    lines: [
      { x1: 5.5, y1: 4, x2: 8.5, y2: 4 },
      { x1: 4.25, y1: 7, x2: 9.75, y2: 7 },
      { x1: 3, y1: 10, x2: 11, y2: 10 },
    ],
  },
  {
    name: "sort-descending",
    label: "Sort descending",
    category: "Layout",
    group: "sort",
    rotation: 180,
    lines: [
      { x1: 5.5, y1: 4, x2: 8.5, y2: 4 },
      { x1: 4.25, y1: 7, x2: 9.75, y2: 7 },
      { x1: 3, y1: 10, x2: 11, y2: 10 },
    ],
  },
  {
    name: "list",
    label: "List",
    category: "Layout",
    group: "list",
    rotation: 0,
    lines: [
      { x1: 4, y1: 4, x2: 11, y2: 4 },
      { x1: 4, y1: 7, x2: 11, y2: 7 },
      { x1: 4, y1: 10, x2: 11, y2: 10 },
    ],
  },
  {
    name: "filter",
    label: "Filter",
    category: "Layout",
    group: "filter",
    rotation: 0,
    lines: [
      { x1: 2.5, y1: 4, x2: 11.5, y2: 4 },
      { x1: 4, y1: 7, x2: 10, y2: 7 },
      { x1: 5.5, y1: 10, x2: 8.5, y2: 10 },
    ],
  },
] as const satisfies readonly MorphingIconDefinition[];

export type MorphingIconName = (typeof morphingIcons)[number]["name"];

const iconMap = new Map<string, MorphingIconDefinition>(
  morphingIcons.map((icon) => [icon.name, icon]),
);

export function getMorphingIcon(name: MorphingIconName) {
  return iconMap.get(name) ?? morphingIcons[0];
}

function rotateLines(
  lines: MorphingIconDefinition["lines"],
  degrees: number,
): MorphingIconDefinition["lines"] {
  if (degrees === 0) return lines;

  const radians = (degrees * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const rotatePoint = (x: number, y: number) => ({
    x: 7 + (x - 7) * cosine - (y - 7) * sine,
    y: 7 + (x - 7) * sine + (y - 7) * cosine,
  });

  return lines.map((line) => {
    const start = rotatePoint(line.x1, line.y1);
    const end = rotatePoint(line.x2, line.y2);
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      opacity: line.opacity,
    };
  }) as unknown as MorphingIconDefinition["lines"];
}

type RenderState = {
  name: MorphingIconName;
  group: string;
  iconRotation: number;
  bakedRotation: number;
  rotation: number;
  lines: MorphingIconDefinition["lines"];
};

function createRenderState(definition: MorphingIconDefinition): RenderState {
  return {
    name: definition.name as MorphingIconName,
    group: definition.group,
    iconRotation: definition.rotation,
    bakedRotation: definition.rotation,
    rotation: 0,
    lines: rotateLines(definition.lines, definition.rotation),
  };
}

export interface MorphingIconProps {
  icon: MorphingIconName;
  size?: number;
  duration?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function MorphingIcon({
  icon,
  size = 24,
  duration = 0.28,
  strokeWidth = 1.8,
  label,
  className,
}: MorphingIconProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const definition = getMorphingIcon(icon);
  const [renderState, setRenderState] = useState<RenderState>(() =>
    createRenderState(definition),
  );

  useLayoutEffect(() => {
    setRenderState((current) => {
      if (current.name === definition.name) return current;

      if (current.group === definition.group) {
        let delta = definition.rotation - current.iconRotation;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        return {
          name: definition.name as MorphingIconName,
          group: definition.group,
          iconRotation: definition.rotation,
          bakedRotation: current.bakedRotation,
          rotation: current.rotation + delta,
          lines: rotateLines(definition.lines, current.bakedRotation),
        };
      }

      return {
        name: definition.name as MorphingIconName,
        group: definition.group,
        iconRotation: definition.rotation,
        bakedRotation: definition.rotation,
        rotation: 360 * Math.round(current.rotation / 360),
        lines: rotateLines(definition.lines, definition.rotation),
      };
    });
  }, [definition]);

  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration, ease: [0.32, 0.72, 0, 1] };

  return (
    <motion.svg
      viewBox="0 0 14 14"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("block overflow-visible", className)}
      initial={false}
      animate={{ rotate: renderState.rotation }}
      transition={transition}
    >
      {renderState.lines.map((line, index) => (
        <motion.line
          key={index}
          initial={false}
          animate={{
            x1: line.x1,
            y1: line.y1,
            x2: line.x2,
            y2: line.y2,
            opacity: line.opacity === 0 ? 0 : 1,
          }}
          transition={transition}
        />
      ))}
    </motion.svg>
  );
}
