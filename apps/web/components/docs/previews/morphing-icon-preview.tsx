"use client";

import { useState } from "react";

import {
  MorphingIcon,
  type MorphingIconName,
} from "@workspace/ui/components/morphing-icon";
import { cn } from "@/lib/utils";

type IconPair = {
  from: MorphingIconName;
  to: MorphingIconName;
  fromLabel: string;
  toLabel: string;
};

function MorphingIconButton({
  pair,
  large = false,
}: {
  pair: IconPair;
  large?: boolean;
}) {
  const [active, setActive] = useState(false);
  const label = active ? pair.toLabel : pair.fromLabel;

  return (
    <button
      type="button"
      onClick={() => setActive((current) => !current)}
      aria-label={`${label}. Activate to show ${
        active ? pair.fromLabel : pair.toLabel
      }.`}
      className={cn(
        "group flex items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 active:scale-[0.97]",
        large ? "size-40 sm:size-48" : "size-20",
      )}
    >
      <MorphingIcon
        icon={active ? pair.to : pair.from}
        size={large ? 96 : 36}
        duration={0.28}
        className="transition-transform duration-200 group-hover:scale-105"
      />
    </button>
  );
}

export function MorphingIconPreview() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <MorphingIconButton
        large
        pair={{
          from: "menu",
          to: "cross",
          fromLabel: "Menu",
          toLabel: "Close",
        }}
      />
      <p className="text-xs text-muted-foreground">Click the icon</p>
    </div>
  );
}

export function MorphingIconPairsPreview() {
  const pairs: IconPair[] = [
    {
      from: "plus",
      to: "cross",
      fromLabel: "Add",
      toLabel: "Close",
    },
    {
      from: "play",
      to: "pause",
      fromLabel: "Play",
      toLabel: "Pause",
    },
    {
      from: "chevron-right",
      to: "chevron-down",
      fromLabel: "Collapsed",
      toLabel: "Expanded",
    },
    {
      from: "more-horizontal",
      to: "more-vertical",
      fromLabel: "Horizontal menu",
      toLabel: "Vertical menu",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 py-6 sm:grid-cols-4">
      {pairs.map((pair) => (
        <MorphingIconButton key={`${pair.from}-${pair.to}`} pair={pair} />
      ))}
    </div>
  );
}
