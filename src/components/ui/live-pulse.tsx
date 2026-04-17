'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LivePulse() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function fetchActive() {
      fetch('/api/analytics/stats?type=active')
        .then((r) => r.json())
        .then((d) => setActive(d.active ?? 0))
        .catch(() => {});
    }

    fetchActive();
    const interval = setInterval(fetchActive, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (active === null || active === 0) return null;

  return (
    <motion.div
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-muted-foreground">
        {active} {active === 1 ? 'visitante' : 'visitantes'} en línea
      </span>
    </motion.div>
  );
}
