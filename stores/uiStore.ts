import { UiData } from "@/types";
import { create } from "zustand";

interface UiStore {
  ui: UiData;
  setUi: (partialUi: Partial<UiData>) => void;
}

const useUiStore = create<UiStore>((set) => ({
  ui: {
    isLoading: true,
    isLoggedIn: true,
    isSignedUp: true,
    isBoardEmpty: false,
    colorTheme: "orange",
  },
  setUi: (partialUi) =>
    set((state) => ({
      ui: { ...state.ui, ...partialUi },
    })),
}));

export default useUiStore;
