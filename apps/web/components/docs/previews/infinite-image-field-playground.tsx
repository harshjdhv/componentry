"use client";

import { useDialKit } from "dialkit";
import { InfiniteImageField } from "@workspace/ui/components/infinite-image-field";
import { DocsPlayground, useLiveCode } from "@/components/docs-playground";

type Slider = [number, number, number, number];
const controls = {
  maxSpeed: [5, 1, 20, 0.5] as Slider,
  smoothing: [0.07, 0.01, 0.3, 0.01] as Slider,
  gap: [28, 4, 80, 2] as Slider,
  borderRadius: [0, 0, 40, 1] as Slider,
};

interface Config {
  maxSpeed: number;
  smoothing: number;
  gap: number;
  borderRadius: number;
}

function generateCode(config: Config): string {
  return [
    `<InfiniteImageField`,
    `  maxSpeed={${config.maxSpeed}}`,
    `  smoothing={${config.smoothing}}`,
    `  gap={${config.gap}}`,
    `  borderRadius={${config.borderRadius}}`,
    `  className="w-full h-[420px]"`,
    `/>`,
  ].join("\n");
}

export function InfiniteImageFieldPlayground() {
  const config = useDialKit("Infinite Image Field", controls, {
    id: "infinite-image-field",
  });

  useLiveCode(generateCode(config));

  return (
    <DocsPlayground>
      <InfiniteImageField
        gap={config.gap}
        maxSpeed={config.maxSpeed}
        smoothing={config.smoothing}
        borderRadius={config.borderRadius}
        className="h-full w-full"
      />
    </DocsPlayground>
  );
}
