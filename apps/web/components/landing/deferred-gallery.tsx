"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Keep the gallery's canvas renderers out of the hero's initial frame budget. */
export function DeferredGallery({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "-96px 0px" },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className={ready ? undefined : "min-h-[1000px]"}>
      {ready ? children : null}
    </div>
  );
}
