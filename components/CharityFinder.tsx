/**
 * components/CharityFinder.tsx
 * "Give Smart" — vetted charity table + dynamic impact calculator.
 */
'use client';

import { useState, useMemo } from 'react';
import { useMindfulStore } from '@/store/mindfulStore';
import { CHARITIES, Charity } from '@/lib/data';
import {
  DollarSign, Shield, TrendingUp, ExternalLink, Calculator,
  ArrowUpDown, Info,
} from 'lucide-react';

// ─── Impact Calculator ────────────────────────────────────────────────────────

interface ImpactCalculatorProps {
  charities: Charity[];
  lowEnergy: boolean;
}

function ImpactCalculator({ charities, lowEnergy }: ImpactCalculatorProps) {
  const [amount, setAmount] = useState('');
  const [selectedId, setSelectedId] = useState(charities[0]?.id ?? '');

  const selected = charities.find((c) => c.id === selectedId) ?? charities[0];

  const computedUnits = useMemo(() => {
    const num = parseFloat(amount);
    if (!selected || isNaN(num) || num <= 0) return null;
    const units = Math.floor(num * selected.unitsPerDollar * 100) / 100;
    return units;
  }, [amount, selected]);

  const formatUnits = (units: number): string => {
    if (units >= 1000) return `${(units / 1000).toFixed(1)}k`;
    if (units % 1 === 0) return units.toString();
    return units.toFixed(1);
  };

  return (
    <div
      className={`rounded-2xl border p-6 mb-6 transition-all duration-500 ${
        lowEnergy
          ? 'bg-[#f4f7f4] border-[#c9ddc9]'
          : 'bg-gradient-to-br from-brand-50 to-white border-brand-200'
      }`}
    >
      <div className="flex items-center gap-2 mb-5">
        <Calculator size={18} className={lowEnergy ? 'text-[#4a8c6e]' : 'text-brand-600'} />
        <h3 className={`font-bold text-base ${lowEnergy ? 'text-[#3d6b52]' : 'text-gray-900'}`}>
          Impact Multiplier Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Amount input */}
        <div>
          <label
            htmlFor="impact-amount"
            className={`block text-sm font-medium mb-1.5 ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-700'}`}
          >
            Donation Amount (USD)
          </label>
          <div className="relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-500'}`}>
              $
            </span>
            <input
              id="impact-amount"
              type="number"
              min="0"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount…"
              className={`w-full pl-7 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                lowEnergy
                  ? 'bg-[#fdf8f0] border-[#c9ddc9] text-[#3d6b52] focus:ring-[#5a9060] placeholder-[#a3c4a3]'
                  : 'bg-white border-gray-200 text-gray-900 focus:ring-brand-400 placeholder-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Charity selector */}
        <div>
          <label
            htmlFor="impact-charity"
            className={`block text-sm font-medium mb-1.5 ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-700'}`}
          >
            Select Charity
          </label>
          <select
            id="impact-charity"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 cursor-pointer transition-colors ${
              lowEnergy
                ? 'bg-[#fdf8f0] border-[#c9ddc9] text-[#3d6b52] focus:ring-[#5a9060]'
                : 'bg-white border-gray-200 text-gray-900 focus:ring-brand-400'
            }`}
          >
            {charities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result display */}
      <div
        className={`mt-4 rounded-xl p-4 text-center transition-all duration-300 ${
          computedUnits !== null
            ? lowEnergy
              ? 'bg-[#e8f0e8] border border-[#c9ddc9]'
              : 'bg-brand-100 border border-brand-200'
            : lowEnergy
            ? 'bg-[#fdf8f0] border border-[#c9ddc9]'
            : 'bg-gray-50 border border-gray-200'
        }`}
      >
        {computedUnits !== null && selected ? (
          <>
            <p className={`text-3xl font-extrabold ${lowEnergy ? 'text-[#3d6b52]' : 'text-brand-700'}`}>
              ${parseFloat(amount).toLocaleString('en-US')} →{' '}
              <span className={lowEnergy ? 'text-[#4a8c6e]' : 'text-brand-500'}>
                {formatUnits(computedUnits)}
              </span>
            </p>
            <p className={`text-sm mt-1 font-medium ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-600'}`}>
              {selected.impactUnit}
            </p>
            <p className={`text-xs mt-2 ${lowEnergy ? 'text-[#7aab7a]' : 'text-gray-400'}`}>
              via {selected.name} · Program delivery rate: {selected.programDeliveryPct}%
            </p>
          </>
        ) : (
          <p className={`text-sm ${lowEnergy ? 'text-[#a3c4a3]' : 'text-gray-400'}`}>
            Enter an amount above to see your real-world impact instantly.
          </p>
        )}
      </div>

      {/* Quick preset buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        {[5, 10, 25, 50, 100, 250].map((preset) => (
          <button
            key={preset}
            onClick={() => setAmount(String(preset))}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
              amount === String(preset)
                ? lowEnergy
                  ? 'bg-[#4a8c6e] text-white border-[#4a8c6e]'
                  : 'bg-brand-500 text-white border-brand-500'
                : lowEnergy
                ? 'bg-transparent text-[#5a9060] border-[#c9ddc9] hover:bg-[#e8f0e8]'
                : 'bg-transparent text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            ${`$${preset}`}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Trust Score Badge ────────────────────────────────────────────────────────

function TrustBadge({ score, lowEnergy }: { score: number; lowEnergy: boolean }) {
  const color =
    score >= 95
      ? 'text-green-700 bg-green-100'
      : score >= 85
      ? 'text-blue-700 bg-blue-100'
      : 'text-amber-700 bg-amber-100';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      <Shield size={10} />
      {score}/100
    </span>
  );
}

// ─── Delivery Bar ─────────────────────────────────────────────────────────────

function DeliveryBar({ pct, lowEnergy }: { pct: number; lowEnergy: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 h-2 rounded-full overflow-hidden ${lowEnergy ? 'bg-[#c9ddc9]' : 'bg-gray-100'}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            pct >= 90
              ? lowEnergy ? 'bg-[#4a8c6e]' : 'bg-brand-500'
              : pct >= 75
              ? 'bg-blue-400'
              : 'bg-amber-400'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-semibold w-9 text-right ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-600'}`}>
        {pct}%
      </span>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

type SortKey = 'trustScore' | 'programDeliveryPct' | 'name';

export default function CharityFinder() {
  const { lowEnergyMode } = useMindfulStore();
  const [sortKey, setSortKey] = useState<SortKey>('trustScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = useMemo(() => {
    let list = lowEnergyMode
      ? CHARITIES.filter((c) => c.isLocalConservation)
      : CHARITIES;

    return [...list].sort((a, b) => {
      const aVal = typeof a[sortKey] === 'string'
        ? (a[sortKey] as string).toLowerCase()
        : (a[sortKey] as number);
      const bVal = typeof b[sortKey] === 'string'
        ? (b[sortKey] as string).toLowerCase()
        : (b[sortKey] as number);
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [lowEnergyMode, sortKey, sortDir]);

  const SortHeader = ({
    label,
    colKey,
  }: {
    label: string;
    colKey: SortKey;
  }) => (
    <th
      scope="col"
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide cursor-pointer select-none whitespace-nowrap transition-colors ${
        lowEnergyMode ? 'text-[#5a9060] hover:text-[#3d6b52]' : 'text-gray-500 hover:text-gray-800'
      }`}
      onClick={() => handleSort(colKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        <ArrowUpDown
          size={12}
          className={sortKey === colKey ? (lowEnergyMode ? 'text-[#4a8c6e]' : 'text-brand-500') : 'opacity-30'}
        />
      </span>
    </th>
  );

  return (
    <section aria-labelledby="charity-heading" className="mb-12">
      {/* Header */}
      <div className="mb-6">
        <h2
          id="charity-heading"
          className={`text-2xl font-bold mb-1 transition-colors duration-500 ${
            lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'
          }`}
        >
          💚 Give Smart — Vetted Charity Finder
        </h2>
        <p className={`text-sm transition-colors duration-500 ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
          {lowEnergyMode
            ? 'Showing local conservation & wellbeing charities only — positive, community-focused giving.'
            : 'All vetted charities with independent watchdog scores. Sort by trust or program delivery.'}
        </p>
      </div>

      {/* Impact Calculator */}
      <ImpactCalculator charities={filtered} lowEnergy={lowEnergyMode} />

      {/* Mode indicator */}
      {lowEnergyMode && (
        <div className="mb-4 flex items-center gap-2 text-sm text-[#4a8c6e] animate-fade-in">
          <Info size={14} />
          <span>Filtered to <strong>local conservation initiatives</strong> — {filtered.length} calming options shown.</span>
        </div>
      )}

      {/* Table — desktop */}
      <div className={`hidden md:block rounded-2xl border overflow-hidden transition-all duration-500 ${lowEnergyMode ? 'border-[#c9ddc9]' : 'border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`border-b transition-colors duration-500 ${lowEnergyMode ? 'bg-[#e8f0e8] border-[#c9ddc9]' : 'bg-gray-50 border-gray-200'}`}>
                <SortHeader label="Charity Name" colKey="name" />
                <th scope="col" className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
                  Domain Tag
                </th>
                <SortHeader label="Trust Score" colKey="trustScore" />
                <SortHeader label="Program Delivery" colKey="programDeliveryPct" />
                <th scope="col" className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
                  Watchdog
                </th>
                <th scope="col" className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
                  Mission
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Link</span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-500 ${lowEnergyMode ? 'divide-[#c9ddc9]' : 'divide-gray-100'}`}>
              {filtered.map((charity, i) => (
                <tr
                  key={charity.id}
                  className={`transition-colors duration-300 ${
                    lowEnergyMode
                      ? i % 2 === 0 ? 'bg-[#fdf8f0]' : 'bg-[#f4f7f4]'
                      : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  } hover:${lowEnergyMode ? 'bg-[#e8f0e8]' : 'bg-brand-50/40'}`}
                >
                  <td className="px-4 py-4">
                    <span className={`font-semibold text-sm ${lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'}`}>
                      {charity.name}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        lowEnergyMode ? 'bg-[#c9ddc9] text-[#3d6b52]' : 'bg-brand-50 text-brand-700'
                      }`}
                    >
                      {charity.domainTag}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <TrustBadge score={charity.trustScore} lowEnergy={lowEnergyMode} />
                  </td>
                  <td className="px-4 py-4 min-w-[160px]">
                    <DeliveryBar pct={charity.programDeliveryPct} lowEnergy={lowEnergyMode} />
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs ${lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-500'}`}>
                      {charity.watchdog}
                    </span>
                  </td>
                  <td className="px-4 py-4 max-w-[240px]">
                    <p className={`text-xs leading-relaxed line-clamp-2 ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-600'}`}>
                      {charity.missionSnippet}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`https://${charity.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${charity.name} website`}
                      className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                        lowEnergyMode ? 'text-[#4a8c6e] hover:text-[#3d6b52]' : 'text-brand-600 hover:text-brand-700'
                      }`}
                    >
                      <ExternalLink size={12} />
                      Visit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card fallback */}
      <div className="md:hidden space-y-3">
        {filtered.map((charity) => (
          <div
            key={charity.id}
            className={`rounded-2xl border p-4 transition-all duration-500 ${
              lowEnergyMode ? 'bg-[#f4f7f4] border-[#c9ddc9]' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={`font-bold text-sm ${lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'}`}>
                  {charity.name}
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${lowEnergyMode ? 'bg-[#c9ddc9] text-[#3d6b52]' : 'bg-brand-50 text-brand-700'}`}>
                  {charity.domainTag}
                </span>
              </div>
              <TrustBadge score={charity.trustScore} lowEnergy={lowEnergyMode} />
            </div>
            <p className={`text-xs mb-2 leading-relaxed ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-600'}`}>
              {charity.missionSnippet}
            </p>
            <div className="mb-2">
              <p className={`text-xs mb-1 ${lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-500'}`}>
                Program Delivery
              </p>
              <DeliveryBar pct={charity.programDeliveryPct} lowEnergy={lowEnergyMode} />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs ${lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-400'}`}>{charity.watchdog}</span>
              <a
                href={`https://${charity.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-xs font-semibold ${lowEnergyMode ? 'text-[#4a8c6e]' : 'text-brand-600'}`}
              >
                <ExternalLink size={11} /> Visit
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Stats summary */}
      <div className={`mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3`}>
        {[
          {
            icon: <Shield size={16} />,
            label: 'Avg Trust Score',
            value: Math.round(filtered.reduce((s, c) => s + c.trustScore, 0) / (filtered.length || 1)) + '/100',
          },
          {
            icon: <TrendingUp size={16} />,
            label: 'Avg Program Delivery',
            value: Math.round(filtered.reduce((s, c) => s + c.programDeliveryPct, 0) / (filtered.length || 1)) + '%',
          },
          {
            icon: <DollarSign size={16} />,
            label: 'Charities Listed',
            value: filtered.length,
          },
          {
            icon: <TrendingUp size={16} />,
            label: '100/100 Rated',
            value: filtered.filter((c) => c.trustScore === 100).length,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 text-center transition-all duration-500 ${
              lowEnergyMode ? 'bg-[#f4f7f4] border-[#c9ddc9]' : 'bg-white border-gray-200'
            }`}
          >
            <div className={`flex justify-center mb-1 ${lowEnergyMode ? 'text-[#4a8c6e]' : 'text-brand-500'}`}>
              {stat.icon}
            </div>
            <p className={`text-xl font-extrabold ${lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'}`}>
              {stat.value}
            </p>
            <p className={`text-xs mt-0.5 ${lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
