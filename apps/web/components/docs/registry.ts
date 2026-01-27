import type React from "react";
import { HyperTextDocs } from "@/components/docs/hyper-text";
import { AuthModalDocs } from "@/components/docs/auth-modal";

export const docsRegistry: Record<string, React.ComponentType | undefined> = {
  "hyper-text": HyperTextDocs,
  "auth-modal": AuthModalDocs,
};
