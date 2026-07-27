"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { getBlockTheme } from "@/lib/blocks/theme";

export function PreviewThemeProvider({
  theme,
  children,
}: {
  theme?: string | null;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const selectedTheme = getBlockTheme(searchParams.get("theme") ?? theme);

  React.useEffect(() => {
    if (selectedTheme.name === "system") return;

    document.documentElement.classList.toggle(
      "dark",
      selectedTheme.className === "dark",
    );
  }, [selectedTheme.className, selectedTheme.name]);

  return (
    <div
      className={selectedTheme.className}
      style={selectedTheme.style as React.CSSProperties}
    >
      {children}
    </div>
  );
}
