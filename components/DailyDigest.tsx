/**
 * components/DailyDigest.tsx
 * Mental Health Buffer — Daily Progress Digest banner.
 * Full mode: global macro progress. Low mode: gentle micro-local stories.
 */
'use client';

import { useState, useEffect } from 'react';
import { useMindfulStore } from '@/store/mindfulStore';
import { DIGEST_ITEMS, DigestItem } from '@/lib/data';
import { ChevronLeft, ChevronRight, Rss } from 'lucide-react';

export default function DailyDigest() {
  const { lowEnergyMode } = useMindfulStore();

  const filtered: DigestItem[] = DIGEST_ITEMS.filter((d) =>
    lowEnergyMode ? d.mode === 'low' : d.mode === 'full'
  );

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Reset to first item when mode changes
  useEffect(() => {
    setIndex(0);
  }, [lowEnergyMode]);

  const navigate = (dir: 'prev' | 'next') => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) =>
        dir === 'next'
          ? (prev + 1) % filtered.length
          : (prev - 1 + filtered.length) % filtered.length
      );
      setAnimating(false);
    }, 200);
  };

  const current = filtered[index] ?? filtered[0];
  if (!current) return null;

  return (
    <section
      aria-label="Daily Progress Digest"
      className={`rounded-2xl p-6 mb-8 border transition-all duration-500 ${
        lowEnergyMode
          ? 'bg-[#f4f7f4] border-[#c9ddc9]'
          : 'bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200'
      }`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Rss
            size={16}
            className={`transition-colors duration-500 ${
              lowEnergyMode ? 'text-[#4a8c6e]' : 'text-brand-600'
            }`}
          />
          <h2
            className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-500 ${
              lowEnergyMode ? 'text-[#5a9060]' : 'text-brand-700'
            }`}
          >
            {lowEnergyMode ? '🌿 Local Good-News Digest' : '📡 Global Progress Digest'}
          </h2>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-500 ${
              lowEnergyMode
                ? 'bg-[#c9ddc9] text-[#4a8c6e]'
                : 'bg-brand-200 text-brand-700'
            }`}
          >
            {index + 1} / {filtered.length}
          </span>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('prev')}
            aria-label="Previous digest item"
            className={`p-1.5 rounded-lg transition-colors duration-300 ${
              lowEnergyMode
                ? 'hover:bg-[#c9ddc9] text-[#5a9060]'
                : 'hover:bg-brand-200 text-brand-700'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => navigate('next')}
            aria-label="Next digest item"
            className={`p-1.5 rounded-lg transition-colors duration-300 ${
              lowEnergyMode
                ? 'hover:bg-[#c9ddc9] text-[#5a9060]'
                : 'hover:bg-brand-200 text-brand-700'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0" role="img" aria-label={current.headline}>
            {current.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-bold mb-2 leading-snug transition-colors duration-500 ${
                lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'
              }`}
            >
              {current.headline}
            </h3>
            <p
              className={`text-sm leading-relaxed transition-colors duration-500 ${
                lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-600'
              }`}
            >
              {current.detail}
            </p>
            <p
              className={`mt-2 text-xs transition-colors duration-500 ${
                lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-400'
              }`}
            >
              Source: {current.source}
            </p>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-4 justify-center">
        {filtered.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to digest item ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? `w-4 h-2 ${lowEnergyMode ? 'bg-[#5a9060]' : 'bg-brand-500'}`
                : `w-2 h-2 ${lowEnergyMode ? 'bg-[#c9ddc9]' : 'bg-brand-200'}`
            }`}
          />
        ))}
      </div>
    </section>
  );
}
