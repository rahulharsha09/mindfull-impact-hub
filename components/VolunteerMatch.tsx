/**
 * components/VolunteerMatch.tsx
 * "Act Local" — volunteer opportunity search, filter, and match modal.
 */
'use client';

import { useState, useMemo } from 'react';
import { useMindfulStore } from '@/store/mindfulStore';
import { VOLUNTEER_OPPORTUNITIES, VolunteerOpportunity } from '@/lib/data';
import {
  Search, MapPin, Clock, Tag, CheckCircle2, X, Users, Filter,
} from 'lucide-react';

// ─── Match Confirmation Modal ─────────────────────────────────────────────────

interface MatchModalProps {
  opportunity: VolunteerOpportunity;
  onClose: () => void;
  lowEnergy: boolean;
}

function MatchModal({ opportunity, onClose, lowEnergy }: MatchModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl p-6 animate-slide-up transition-colors duration-500 ${
          lowEnergy ? 'bg-[#fdf8f0]' : 'bg-white'
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
            lowEnergy ? 'hover:bg-[#e8f0e8] text-[#5a9060]' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X size={18} />
        </button>

        {confirmed ? (
          /* ── Success State ── */
          <div className="text-center py-4">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                lowEnergy ? 'bg-[#c9ddc9]' : 'bg-brand-100'
              }`}
            >
              <CheckCircle2
                size={32}
                className={lowEnergy ? 'text-[#4a8c6e]' : 'text-brand-500'}
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                lowEnergy ? 'text-[#3d6b52]' : 'text-gray-900'
              }`}
            >
              You're matched! 🎉
            </h3>
            <p className={`text-sm mb-1 ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-600'}`}>
              <strong>{opportunity.organization}</strong> will contact you at{' '}
              <strong>{email}</strong> within 2 business days with next steps.
            </p>
            <p className={`text-xs mt-3 ${lowEnergy ? 'text-[#7aab7a]' : 'text-gray-400'}`}>
              Thank you, {name}! Every hour of your time creates ripples. 🌊
            </p>
            <button
              onClick={onClose}
              className={`mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
                lowEnergy ? 'bg-[#4a8c6e] hover:bg-[#3d6b52]' : 'bg-brand-500 hover:bg-brand-600'
              }`}
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <div className="mb-5">
              <span className="text-3xl">{opportunity.icon}</span>
              <h3
                id="modal-title"
                className={`text-xl font-bold mt-2 ${
                  lowEnergy ? 'text-[#3d6b52]' : 'text-gray-900'
                }`}
              >
                Match Me with<br />
                <span className={lowEnergy ? 'text-[#4a8c6e]' : 'text-brand-600'}>
                  {opportunity.title}
                </span>
              </h3>
              <p className={`text-sm mt-1 ${lowEnergy ? 'text-[#7aab7a]' : 'text-gray-500'}`}>
                {opportunity.organization} · {opportunity.city}
              </p>
              <div
                className={`mt-3 p-3 rounded-xl text-sm ${
                  lowEnergy ? 'bg-[#e8f0e8] text-[#5a9060]' : 'bg-brand-50 text-brand-700'
                }`}
              >
                <Clock size={13} className="inline mr-1.5" />
                {opportunity.commitment}
              </div>
            </div>

            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label
                  htmlFor="vol-name"
                  className={`block text-sm font-medium mb-1.5 ${
                    lowEnergy ? 'text-[#5a9060]' : 'text-gray-700'
                  }`}
                >
                  Your Name
                </label>
                <input
                  id="vol-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    lowEnergy
                      ? 'bg-[#f4f7f4] border-[#c9ddc9] text-[#3d6b52] focus:ring-[#5a9060] placeholder-[#a3c4a3]'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-400 placeholder-gray-400'
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="vol-email"
                  className={`block text-sm font-medium mb-1.5 ${
                    lowEnergy ? 'text-[#5a9060]' : 'text-gray-700'
                  }`}
                >
                  Email Address
                </label>
                <input
                  id="vol-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    lowEnergy
                      ? 'bg-[#f4f7f4] border-[#c9ddc9] text-[#3d6b52] focus:ring-[#5a9060] placeholder-[#a3c4a3]'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-400 placeholder-gray-400'
                  }`}
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 active:scale-95 ${
                  lowEnergy
                    ? 'bg-[#4a8c6e] hover:bg-[#3d6b52]'
                    : 'bg-brand-500 hover:bg-brand-600'
                }`}
              >
                Confirm My Match 🌟
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Opportunity Card ─────────────────────────────────────────────────────────

interface OpportunityCardProps {
  opp: VolunteerOpportunity;
  lowEnergy: boolean;
  onMatch: (opp: VolunteerOpportunity) => void;
}

const intensityConfig = {
  low:    { label: 'Gentle',   color: 'text-green-600  bg-green-50  border-green-200' },
  medium: { label: 'Moderate', color: 'text-amber-600  bg-amber-50  border-amber-200' },
  high:   { label: 'Intensive', color: 'text-red-600    bg-red-50    border-red-200'   },
};

function OpportunityCard({ opp, lowEnergy, onMatch }: OpportunityCardProps) {
  const cfg = intensityConfig[opp.intensity];
  return (
    <article
      className={`rounded-2xl border p-5 flex flex-col gap-4 animate-slide-up transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 ${
        lowEnergy
          ? 'bg-[#f4f7f4] border-[#c9ddc9]'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="text-3xl" role="img" aria-label={opp.title}>{opp.icon}</span>
          <div>
            <h3 className={`font-bold text-sm leading-snug ${lowEnergy ? 'text-[#3d6b52]' : 'text-gray-900'}`}>
              {opp.title}
            </h3>
            <p className={`text-xs mt-0.5 ${lowEnergy ? 'text-[#7aab7a]' : 'text-gray-500'}`}>
              {opp.organization}
            </p>
          </div>
        </div>
        <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>

      {/* Description */}
      <p className={`text-sm leading-relaxed ${lowEnergy ? 'text-[#5a9060]' : 'text-gray-600'}`}>
        {opp.description}
      </p>

      {/* Meta */}
      <div className={`flex flex-wrap gap-2 text-xs ${lowEnergy ? 'text-[#7aab7a]' : 'text-gray-500'}`}>
        <span className="flex items-center gap-1">
          <MapPin size={11} />
          {opp.city} · {opp.postalCode}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {opp.commitment}
        </span>
        <span className="flex items-center gap-1">
          <Tag size={11} />
          {opp.category}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {opp.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              lowEnergy
                ? 'bg-[#c9ddc9] text-[#4a8c6e]'
                : 'bg-brand-50 text-brand-600'
            }`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onMatch(opp)}
        className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 active:scale-95 ${
          lowEnergy
            ? 'bg-[#4a8c6e] hover:bg-[#3d6b52]'
            : 'bg-brand-500 hover:bg-brand-600'
        }`}
      >
        <Users size={14} className="inline mr-1.5" />
        Match Me
      </button>
    </article>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function VolunteerMatch() {
  const { lowEnergyMode } = useMindfulStore();
  const [postalQuery, setPostalQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedOpp, setSelectedOpp] = useState<VolunteerOpportunity | null>(null);

  const categories = ['All', ...Array.from(new Set(VOLUNTEER_OPPORTUNITIES.map((o) => o.category)))];

  const filtered = useMemo(() => {
    return VOLUNTEER_OPPORTUNITIES.filter((opp) => {
      const passEnergy = lowEnergyMode ? opp.intensity === 'low' : true;
      const passPostal = postalQuery
        ? opp.postalCode.startsWith(postalQuery.trim())
        : true;
      const passCategory = categoryFilter !== 'All' ? opp.category === categoryFilter : true;
      return passEnergy && passPostal && passCategory;
    });
  }, [lowEnergyMode, postalQuery, categoryFilter]);

  return (
    <section aria-labelledby="volunteer-heading" className="mb-12">
      {/* Section header */}
      <div className="mb-6">
        <h2
          id="volunteer-heading"
          className={`text-2xl font-bold mb-1 transition-colors duration-500 ${
            lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'
          }`}
        >
          🌍 Act Local — Volunteer Match Engine
        </h2>
        <p className={`text-sm transition-colors duration-500 ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
          {lowEnergyMode
            ? 'Showing gentle, low-intensity opportunities only — perfect for easy, mindful days.'
            : 'All community opportunities in your area — from gentle garden tasks to high-impact crisis work.'}
        </p>
      </div>

      {/* Filters */}
      <div
        className={`rounded-2xl border p-4 mb-6 flex flex-wrap gap-3 transition-all duration-500 ${
          lowEnergyMode ? 'bg-[#f4f7f4] border-[#c9ddc9]' : 'bg-gray-50 border-gray-200'
        }`}
      >
        {/* Postal search */}
        <div className="relative flex-1 min-w-[160px]">
          <Search
            size={15}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-400'
            }`}
          />
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={postalQuery}
            onChange={(e) => setPostalQuery(e.target.value)}
            placeholder="Search by postal code…"
            aria-label="Search by postal code"
            className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
              lowEnergyMode
                ? 'bg-[#fdf8f0] border-[#c9ddc9] text-[#3d6b52] focus:ring-[#5a9060] placeholder-[#a3c4a3]'
                : 'bg-white border-gray-200 text-gray-900 focus:ring-brand-400 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <Filter
            size={13}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              lowEnergyMode ? 'text-[#7aab7a]' : 'text-gray-400'
            }`}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className={`pl-8 pr-8 py-2.5 rounded-xl border text-sm appearance-none focus:outline-none focus:ring-2 cursor-pointer transition-colors ${
              lowEnergyMode
                ? 'bg-[#fdf8f0] border-[#c9ddc9] text-[#3d6b52] focus:ring-[#5a9060]'
                : 'bg-white border-gray-200 text-gray-900 focus:ring-brand-400'
            }`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Result count */}
        <div className={`flex items-center text-sm font-medium ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
          {filtered.length} {filtered.length === 1 ? 'opportunity' : 'opportunities'} found
        </div>
      </div>

      {/* Card Grid */}
      {filtered.length === 0 ? (
        <div
          className={`rounded-2xl border py-16 text-center transition-all duration-500 ${
            lowEnergyMode ? 'bg-[#f4f7f4] border-[#c9ddc9] text-[#5a9060]' : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}
        >
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold">No opportunities match your filters.</p>
          <p className="text-sm mt-1">Try a different postal code or clear the category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              lowEnergy={lowEnergyMode}
              onMatch={setSelectedOpp}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedOpp && (
        <MatchModal
          opportunity={selectedOpp}
          onClose={() => setSelectedOpp(null)}
          lowEnergy={lowEnergyMode}
        />
      )}
    </section>
  );
}
