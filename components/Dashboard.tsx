/**
 * components/Dashboard.tsx
 * Client shell that wraps all interactive sections with mode-reactive background.
 */
'use client';

import { useMindfulStore } from '@/store/mindfulStore';
import DailyDigest from '@/components/DailyDigest';
import VolunteerMatch from '@/components/VolunteerMatch';
import CharityFinder from '@/components/CharityFinder';

export default function Dashboard() {
  const { lowEnergyMode } = useMindfulStore();

  const heroBg = lowEnergyMode ? 'bg-[#fdf8f0]' : 'bg-white';
  const heroHeading = lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900';
  const heroSub = lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-600';
  const pillBg = lowEnergyMode ? 'bg-[#e8f0e8]' : 'bg-brand-50';
  const pillText = lowEnergyMode ? 'text-[#4a8c6e]' : 'text-brand-700';

  return (
    <main
      id="main-content"
      className={`min-h-screen transition-colors duration-500 ${heroBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero intro */}
        <div className="mb-10 text-center">
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 transition-colors duration-500 ${heroHeading}`}
          >
            {lowEnergyMode
              ? '\u{1F33F} Your Calm Space for Mindful Impact'
              : '\u26A1 Your Dashboard for Conscious Change'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${heroSub}`}>
            {lowEnergyMode
              ? 'Gentle stories. Local actions. No overwhelm. Just you and your community.'
              : 'Vetted charities, local volunteer opportunities, and real-time impact data -- all in one place.'}
          </p>

          {/* Mode pill */}
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-fade-in ${pillBg} ${pillText}`}>
            {lowEnergyMode
              ? '\u{1F331} Low Energy Mode \u2014 content filtered for calm'
              : '\u{1F30D} Full Capacity Mode \u2014 all data visible'}
          </div>
        </div>

        {/* Sections */}
        <DailyDigest />
        <VolunteerMatch />
        <CharityFinder />
      </div>
    </main>
  );
}
