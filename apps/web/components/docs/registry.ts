import type React from "react";
import { HyperTextDocs } from "@/components/docs/hyper-text";
import { AuthModalDocs } from "@/components/docs/auth-modal";
import { TextAnimateDocs } from "@/components/docs/text-animate";
import { TrueFocusDocs } from "@/components/docs/true-focus";
import { ScrollBasedVelocityDocs } from "@/components/docs/scroll-based-velocity";

export const docsRegistry: Record<string, React.ComponentType | undefined> = {
  "hyper-text": HyperTextDocs,
  "auth-modal": AuthModalDocs,
  "text-animate": TextAnimateDocs,
  "true-focus": TrueFocusDocs,
  "scroll-based-velocity": ScrollBasedVelocityDocs,
};
