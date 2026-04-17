'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getVisitorId(): string {
  const key = '__visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function PageViewTracker() {
  const pathname = usePathname();
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (tracked.current === pathname) return;
    tracked.current = pathname;

    const visitorId = getVisitorId();

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
        visitorId,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
