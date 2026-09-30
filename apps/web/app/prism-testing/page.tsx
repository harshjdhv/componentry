"use client";

import { useEffect } from "react";
import { PrismScene } from "@workspace/ui/components/prism-scene";

export default function PrismTestingPage() {
  useEffect(() => {
    const setVh = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--100vh", `${height}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.visualViewport?.addEventListener("resize", setVh);
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBg = html.style.backgroundColor;
    const previousBodyBg = body.style.backgroundColor;
    html.style.backgroundColor = "#000";
    body.style.backgroundColor = "#000";
    html.classList.add("route-hide-scrollbar");
    body.classList.add("route-hide-scrollbar");
    return () => {
      window.removeEventListener("resize", setVh);
      window.visualViewport?.removeEventListener("resize", setVh);
      html.style.backgroundColor = previousHtmlBg;
      body.style.backgroundColor = previousBodyBg;
      html.classList.remove("route-hide-scrollbar");
      body.classList.remove("route-hide-scrollbar");
    };
  }, []);

  return <PrismScene />;
}
