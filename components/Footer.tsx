/**
 * components/Footer.tsx
 * Accessible, themed footer.
 */
'use client';

import { useMindfulStore } from '@/store/mindfulStore';
import { Heart, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { lowEnergyMode } = useMindfulStore();

  return (
    <footer
      className={`mt-16 border-t py-10 transition-all duration-500 ${
        lowEnergyMode
          ? 'bg-[#f4f7f4] border-[#c9ddc9]'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className={`font-bold text-base mb-2 ${lowEnergyMode ? 'text-[#3d6b52]' : 'text-gray-900'}`}>
              Mindful Impact Hub
            </h3>
            <p className={`text-sm leading-relaxed ${lowEnergyMode ? 'text-[#5a9060]' : 'text-gray-500'}`}>
              A free, open-source dashboard combining verified charity data,
              local volunteer matching, and mental health-aware design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className={`font-semibold text-sm mb-3 ${lowEnergyMode ? 'text-[#4a8c6e]' : 'text-gray-700'}`}>
              Data Sources
            </h4>
            <ul className="space-y-1.5">
              {[
                { label: 'Charity Navigator', href: 'https://www.charitynavigator.org' },
                { label: 'BBB Wise Giving Alliance', href: 'https://www.give.org' },
                { label: 'GuideStar / Candid', href: 'https://www.candid.org' },
                { label: 'VolunteerMatch', href: 'https://www.volunteermatch.org' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      lowEnergyMode
                        ? 'text-[#5a9060] hover:text-[#3d6b52]'
                        : 'text-gray-500 hover:text-brand-600'
                    }`}
                  >
                    <ExternalLink size={11} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h4 className={`font-semibold text-sm mb-3 ${lowEnergyMode ? 'text-[#4a8c6e]' : 'text-gray-700'}`}>
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Lucide Icons'].map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    lowEnergyMode
                      ? 'bg-[#e8f0e8] border-[#c9ddc9] text-[#4a8c6e]'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            lowEnergyMode ? 'border-[#c9ddc9] text-[#7aab7a]' : 'border-gray-200 text-gray-400'
          }`}
        >
          <p className="flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-400" /> for mindful changemakers · Open source
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 transition-colors ${
              lowEnergyMode ? 'hover:text-[#4a8c6e]' : 'hover:text-gray-700'
            }`}
          >
            <Github size={14} />
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
