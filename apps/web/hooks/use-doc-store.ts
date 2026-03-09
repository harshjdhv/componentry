import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DocStore {
  activeVariantIndex: number;
  setActiveVariantIndex: (index: number) => void;
  layout: "split" | "classic";
  setLayout: (layout: "split" | "classic") => void;
}

export const useDocStore = create<DocStore>()(
  persist(
    (set) => ({
      activeVariantIndex: -1,
      setActiveVariantIndex: (index) => set({ activeVariantIndex: index }),
      layout: "classic",
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: "doc-layout-storage",
      partialize: (state) => ({ layout: state.layout }),
    },
  ),
);
