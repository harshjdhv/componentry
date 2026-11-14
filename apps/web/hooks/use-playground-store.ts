import { create } from "zustand";

/**
 * Generated usage code for the current docs page. DocsPlayground writes it via
 * `useLiveCode`; LiveCodeBlock in the Usage section reads it.
 */
interface PlaygroundStore {
  code: string;
  setCode: (code: string) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  code: "",
  setCode: (code) => set({ code }),
}));
