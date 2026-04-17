'use client';

import { useEffect, useState } from 'react';

export function ViewCounter({ path }: { path: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/analytics/stats?type=page&path=${encodeURIComponent(path)}`)
      .then((r) => r.json())
      .then((d) => setViews(d.views ?? 0))
      .catch(() => {});
  }, [path]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views.toLocaleString()} {views === 1 ? 'lectura' : 'lecturas'}
    </span>
  );
}
