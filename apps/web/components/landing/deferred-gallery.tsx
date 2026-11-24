"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Keep the gallery's canvas renderers out of the hero's initial frame budget.
 *
 * The gallery mounts when it scrolls into view — but an IntersectionObserver can
 * stay silent when the element sits inside a clipping ancestor (`overflow: clip`
 * on the page shell), which leaves the slot permanently empty. A short timer is
 * the fallback: if the observer has not reported shortly after mount, mount the
 * gallery anyway. The canvas work still misses the first frame, which was the
 * point of deferring it.
 */
export function DeferredGallery({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "-96px 0px" },
    );

    if (root.current) observer.observe(root.current);

    // Fallback: never leave the slot empty if the observer stays silent.
    const timer = window.setTimeout(() => setReady(true), 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [ready]);

  return (
    <div ref={root} className={ready ? undefined : "min-h-[1000px]"}>
      {ready ? children : null}
    </div>
  );
}
