/**
 * components/StoreHydration.tsx
 * Renders children only after Zustand has rehydrated from localStorage.
 * Prevents SSR/client hydration mismatch (white screen / React error #418).
 */
'use client';

import { useEffect, useState } from 'react';

export default function StoreHydration({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a minimal skeleton that matches server HTML to avoid mismatch
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <div className="w-10 h-10 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
          <p className="text-sm font-medium">Loading Mindful Impact Hub…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
