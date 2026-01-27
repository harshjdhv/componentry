import type React from "react";
import { HyperTextDocs } from "@/components/docs/hyper-text";
import { AuthModalDocs } from "@/components/docs/auth-modal";
import { TextAnimateDocs } from "@/components/docs/text-animate";
import { TrueFocusDocs } from "@/components/docs/true-focus";
import { ScrollBasedVelocityDocs } from "@/components/docs/scroll-based-velocity";
import { CircuitBoardDocs } from "@/components/docs/circuit-board";
import { CollectionSurferDocs } from "@/components/docs/collection-surfer";
import { CommandMenuDocs } from "@/components/docs/command-menu";
import { FlightStatusCardDocs } from "@/components/docs/flight-status-card";
import { GithubCalendarDocs } from "@/components/docs/github-calendar";
import { ShowcaseCardDocs } from "@/components/docs/showcase-card";
import { SpotlightCardDocs } from "@/components/docs/spotlight-card";
import { TestimonialMarqueeDocs } from "@/components/docs/testimonial-marquee";
import { MagneticDockDocs } from "@/components/docs/magnetic-dock";
import { HeroGeometricDocs } from "@/components/docs/hero-geometric";
import { BorderBeamDocs } from "@/components/docs/border-beam";
import { DitherGradientDocs } from "@/components/docs/dither-gradient";
import { LiquidBlobDocs } from "@/components/docs/liquid-blob";

export const docsRegistry: Record<string, any> = {
  "hyper-text": HyperTextDocs,
  "auth-modal": AuthModalDocs,
  "text-animate": TextAnimateDocs,
  "true-focus": TrueFocusDocs,
  "scroll-based-velocity": ScrollBasedVelocityDocs,
  "circuit-board": CircuitBoardDocs,
  "collection-surfer": CollectionSurferDocs,
  "command-menu": CommandMenuDocs,
  "flight-status-card": FlightStatusCardDocs,
  "github-calendar": GithubCalendarDocs,
  "showcase-card": ShowcaseCardDocs,
  "spotlight-card": SpotlightCardDocs,
  "testimonial-marquee": TestimonialMarqueeDocs,
  "magnetic-dock": MagneticDockDocs,
  "hero-geometric": HeroGeometricDocs,
  "border-beam": BorderBeamDocs,
  "dither-gradient": DitherGradientDocs,
  "liquid-blob": LiquidBlobDocs,
};
