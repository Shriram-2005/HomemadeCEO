import { create } from "zustand";

interface JamiStore {
  isOpen: boolean;
  pendingCommand: string | null;
  openWithCommand: (cmd: string) => void;
  open: () => void;
  close: () => void;
  clearPendingCommand: () => void;
}

/**
 * Global store for controlling the Jami Chat Widget from any page.
 * Allows the seller/ai page tool cards to open the widget and send a command.
 */
export const useJamiStore = create<JamiStore>((set) => ({
  isOpen: false,
  pendingCommand: null,

  openWithCommand: (cmd: string) =>
    set({ isOpen: true, pendingCommand: cmd }),

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false, pendingCommand: null }),

  clearPendingCommand: () => set({ pendingCommand: null }),
}));
