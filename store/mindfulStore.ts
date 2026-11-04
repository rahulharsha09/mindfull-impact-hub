/**
 * store/mindfulStore.ts
 * Zustand global state store — fully type-safe, SSR-safe.
 * No 'use client' here — Zustand stores are plain JS modules.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MindfulState {
  /** When true, UI shifts to calming pastel aesthetics and hides stressful content */
  lowEnergyMode: boolean;
  /** True after the store has hydrated from localStorage — prevents SSR flash */
  _hasHydrated: boolean;
  /** Toggle lowEnergyMode on/off */
  toggleLowEnergyMode: () => void;
  /** Explicitly set the mode */
  setLowEnergyMode: (value: boolean) => void;
  /** Mark store as hydrated */
  setHasHydrated: (value: boolean) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useMindfulStore = create<MindfulState>()(
  persist(
    (set) => ({
      lowEnergyMode: false,
      _hasHydrated: false,

      toggleLowEnergyMode: () =>
        set((state) => ({ lowEnergyMode: !state.lowEnergyMode })),

      setLowEnergyMode: (value: boolean) =>
        set({ lowEnergyMode: value }),

      setHasHydrated: (value: boolean) =>
        set({ _hasHydrated: value }),
    }),
    {
      name: 'mindful-impact-hub-storage',
      storage: createJSONStorage(() => {
        // Guard for SSR — return a no-op storage during server render
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
