import type React from "react";
import {
  HyperTextDocs,
  hyperTextPageContext,
} from "@/components/docs/hyper-text";
import { AuthModalDocs } from "@/components/docs/auth-modal";

export const docsRegistry: Record<string, React.ComponentType | undefined> = {
  "hyper-text": HyperTextDocs,
  "auth-modal": AuthModalDocs,
};

export const docsContextRegistry: Record<string, string | undefined> = {
  "hyper-text": hyperTextPageContext,
};
