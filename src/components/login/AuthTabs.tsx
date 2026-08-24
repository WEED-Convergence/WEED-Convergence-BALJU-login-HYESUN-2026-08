'use client';

import { useState } from 'react';

const TABS = [
  { key: 'seller', label: '판매사' },
  { key: 'admin', label: '관리자' },
] as const;

export default function AuthTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]['key']>('seller');

  return (
    <div className="flex justify-center gap-8 border-b border-gray-100 px-6">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActive(tab.key)}
          className={`relative py-3 text-sm font-semibold transition-colors ${
            active === tab.key ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {tab.label}
          {active === tab.key && (
            <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-gray-900" />
          )}
        </button>
      ))}
    </div>
  );
}
