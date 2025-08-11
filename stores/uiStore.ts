import { create } from "zustand";

interface UiData {
  isLoading?: boolean;
  isLoggedIn?: boolean;
  isSignedUp?: boolean;
}

interface UiStore {
  ui: UiData;
  setUi: (partialUi: Partial<UiData>) => void;
}

const useUiStore = create<UiStore>((set) => ({
  ui: {
    isLoading: true,
    isLoggedIn: true,
    isSignedUp: true,
  },
  setUi: (partialUi) =>
    set((state) => ({
      ui: { ...state.ui, ...partialUi },
    })),
}));

export default useUiStore;
