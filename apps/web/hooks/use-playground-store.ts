import { create } from "zustand";

interface PlaygroundStore {
  code: string;
  setCode: (code: string) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  code: "",
  setCode: (code) => set({ code }),
}));
