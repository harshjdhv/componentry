import type { Metadata } from "next";

import { MorphingIconsPlayground } from "@/components/morphing-icons-playground";

export const metadata: Metadata = {
  title: "Morphing Icons Playground",
  description:
    "Choose two three-line icons and explore smooth, interruptible SVG morphs.",
};

export default function MorphingIconsPage() {
  return <MorphingIconsPlayground />;
}
