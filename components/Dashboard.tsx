/**
 * components/Dashboard.tsx
 * Client shell — hydration-safe, mode-reactive background.
 */
'use client';

import { useMindfulStore } from '@/store/mindfulStore';
import DailyDigest from '@/components/DailyDigest';
import VolunteerMatch from '@/components/VolunteerMatch';
import CharityFinder from '@/components/CharityFinder';

export default function Dashboard() {
  const { lowEnergyMode } = useMindfulStore();

  return (
    <main
      id="main-content"
      className={`min-h-screen transition-colors duration-500 ${
        lowEnergyMode ? 'bg-[#fdf8f0]' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero intro */}
        <div className="mb-10 text-center">
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 transition-colors duration-500 ${
              lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'
            }`}
          >
            {lowEnergyMode
              ? '🌿 Your Calm Space for Mindful Impact'
              : '⚡ Your Dashboard for Conscious Change'}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-600'
            }`}
          >
            {lowEnergyMode
              ? 'Gentle stories. Local actions. No overwhelm. Just you and your community.'
              : 'Vetted charities, local volunteer opportunities, and real-time impact data — all in one place.'}
          </p>

          {/* Mode pill */}
          <div
            className={`mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-500 ${
              lowEnergyMode
                ? 'bg-[#e8f0e8] text-[#4a8c6e]'
                : 'bg-brand-50 text-brand-700'
            }`}
          >
            {lowEnergyMode
              ? '🌱 Low Energy Mode — content filtered for calm'
              : '🌍 Full Capacity Mode — all data visible'}
          </div>
        </div>

        {/* Core Sections */}
        <DailyDigest />
        <VolunteerMatch />
        <CharityFinder />
      </div>
    </main>
  );
}
