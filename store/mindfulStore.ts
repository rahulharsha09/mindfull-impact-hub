/**
 * store/mindfulStore.ts
 * Zustand global state store — fully type-safe.
 * Manages the lowEnergyMode boolean and provides toggle action.
 */
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// Compatible with zustand v4.x

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MindfulState {
  /** When true, UI shifts to calming pastel aesthetics and hides stressful content */
  lowEnergyMode: boolean;
  /** Toggle lowEnergyMode on/off */
  toggleLowEnergyMode: () => void;
  /** Explicitly set the mode */
  setLowEnergyMode: (value: boolean) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useMindfulStore = create<MindfulState>()(
  persist(
    (set) => ({
      lowEnergyMode: false,

      toggleLowEnergyMode: () =>
        set((state) => ({ lowEnergyMode: !state.lowEnergyMode })),

      setLowEnergyMode: (value: boolean) =>
        set({ lowEnergyMode: value }),
    }),
    {
      name: 'mindful-impact-hub-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : ({} as Storage)
      ),
    }
  )
);
