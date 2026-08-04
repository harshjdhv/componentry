"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const FIRST_WORD = "CREATE";
const SECOND_WORD = "REFINE";

export function FlippingWordSwapCardPreview() {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const firstWord = gsap.utils.toArray<HTMLElement>(
        '[data-card-flip="first"]',
      );
      const secondWord = gsap.utils.toArray<HTMLElement>(
        '[data-card-flip="second"]',
      );

      gsap.set(secondWord, {
        rotationX: -82,
        opacity: 0,
        transformOrigin: "center bottom",
      });

      gsap
        .timeline({ repeat: -1, repeatDelay: 1, yoyo: true })
        .to(firstWord, {
          rotationX: 82,
          opacity: 0,
          duration: 0.4,
          stagger: 0.044,
          ease: "power2.in",
          transformOrigin: "center top",
        })
        .to(
          secondWord,
          {
            rotationX: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.044,
            ease: "power2.out",
          },
          "<0.25",
        );
    }, previewRef);

    return () => context.revert();
  }, []);

  const renderCharacters = (word: string, layer: "first" | "second") =>
    Array.from(word).map((character, index) => (
      <span
        key={`${layer}-${character}-${index}`}
        data-card-flip={layer}
        className="inline-block [backface-visibility:hidden] [will-change:transform,opacity]"
      >
        {character}
      </span>
    ));

  return (
    <div
      ref={previewRef}
      className="pointer-events-none flex size-full items-center justify-center overflow-hidden bg-black px-6"
      aria-hidden="true"
    >
      <span className="inline-grid overflow-hidden text-[clamp(2.5rem,5.8vw,4.25rem)] font-semibold leading-none tracking-[-0.035em] [perspective:800px]">
        <span className="col-start-1 row-start-1 inline-flex justify-center gap-[0.012em] whitespace-nowrap text-zinc-100">
          {renderCharacters(FIRST_WORD, "first")}
        </span>
        <span className="col-start-1 row-start-1 inline-flex justify-center gap-[0.012em] whitespace-nowrap text-violet-500">
          {renderCharacters(SECOND_WORD, "second")}
        </span>
      </span>
    </div>
  );
}
