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
};
