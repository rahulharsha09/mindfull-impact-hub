/**
 * components/Header.tsx
 * App header: branding + Low Energy Mode toggle switch.
 */
'use client';

import { useMindfulStore } from '@/store/mindfulStore';
import { Leaf, Zap, Heart } from 'lucide-react';

export default function Header() {
  const { lowEnergyMode, toggleLowEnergyMode } = useMindfulStore();

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b shadow-sm transition-all duration-500 ${
        lowEnergyMode
          ? 'bg-[#fdf8f0] border-[#c9ddc9]'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Branding ── */}
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl transition-colors duration-500 ${
                lowEnergyMode ? 'bg-[#c9ddc9]' : 'bg-brand-500'
              }`}
            >
              <Heart
                size={22}
                className={`transition-colors duration-500 ${
                  lowEnergyMode ? 'text-[#4a8c6e]' : 'text-white'
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-lg font-bold tracking-tight transition-colors duration-500 ${
                  lowEnergyMode ? 'text-[#4a8c6e]' : 'text-gray-900'
                }`}
              >
                Mindful Impact Hub
              </h1>
              <p
                className={`text-xs font-medium transition-colors duration-500 ${
                  lowEnergyMode ? 'text-[#7aab7a]' : 'text-brand-600'
                }`}
              >
                Give wisely · Act locally · Stay grounded
              </p>
            </div>
          </div>

          {/* ── Mode Toggle ── */}
          <div className="flex items-center gap-3">
            <span
              className={`hidden sm:block text-sm font-medium transition-colors duration-500 ${
                lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-600'
              }`}
            >
              {lowEnergyMode ? (
                <span className="flex items-center gap-1.5">
                  <Leaf size={14} className="text-[#4a8c6e]" />
                  Low Energy Mode Active
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Zap size={14} className="text-brand-500" />
                  Full Capacity Mode
                </span>
              )}
            </span>

            {/* Toggle Switch */}
            <button
              role="switch"
              aria-checked={lowEnergyMode}
              aria-label="Toggle between Full Capacity and Low Energy Mode"
              onClick={toggleLowEnergyMode}
              className={`relative inline-flex items-center h-8 w-16 rounded-full cursor-pointer transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                lowEnergyMode
                  ? 'bg-[#5a9060] focus-visible:ring-[#5a9060]'
                  : 'bg-brand-500 focus-visible:ring-brand-500'
              }`}
            >
              <span className="sr-only">
                {lowEnergyMode ? 'Switch to Full Capacity Mode' : 'Switch to Low Energy Mode'}
              </span>
              <span
                className={`inline-flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-400 ${
                  lowEnergyMode ? 'translate-x-9' : 'translate-x-1'
                }`}
              >
                {lowEnergyMode ? (
                  <Leaf size={12} className="text-[#4a8c6e]" />
                ) : (
                  <Zap size={12} className="text-brand-500" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mode Banner ── */}
      {lowEnergyMode && (
        <div className="bg-[#e8f0e8] border-t border-[#c9ddc9] py-1.5 px-4 text-center animate-fade-in">
          <p className="text-xs text-[#4a8c6e] font-medium">
            🌱 Low Energy Mode is active — content is filtered to calm, gentle, and locally-focused experiences.
          </p>
        </div>
      )}
    </header>
  );
}
