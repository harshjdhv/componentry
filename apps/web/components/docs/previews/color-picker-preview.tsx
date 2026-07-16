"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ColorPickerPreviewProps {
  src: string;
  title: string;
  className?: string;
}

export function ColorPickerPreview({ src, title, className }: ColorPickerPreviewProps) {
  return (
    <div className={cn("relative w-screen h-screen overflow-hidden", className)}>
      <iframe
        src={src}
        className="w-full h-full border-0"
        title={title}
        loading="lazy"
      />
    </div>
  );
}