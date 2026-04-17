'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RollingDigit({ digit, delay }: { digit: string; delay: number }) {
  return (
    <div className="relative h-[1.2em] w-[0.65em] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay,
          }}
          className="absolute inset-0 flex items-center justify-center font-mono font-bold"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function SiteVisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [showGlow, setShowGlow] = useState(false);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const sessionKey = '__home_tracked';
    const alreadyTracked = sessionStorage.getItem(sessionKey);

    if (alreadyTracked) {
      fetch('/api/analytics/stats?type=total')
        .then((r) => r.json())
        .then((d) => setCount(d.total ?? 0))
        .catch(() => {});
      hasTracked.current = true;
      return;
    }

    hasTracked.current = true;

    function getVisitorId(): string {
      const key = '__visitor_id';
      let id = localStorage.getItem(key);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(key, id);
      }
      return id;
    }

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: '/',
        referrer: document.referrer,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
        visitorId: getVisitorId(),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const prev = data.previousCount ?? 0;
        setCount(prev);

        setTimeout(() => {
          setCount(data.newCount ?? prev + 1);
          setShowGlow(true);
          setTimeout(() => setShowGlow(false), 1200);
        }, 1000);

        sessionStorage.setItem(sessionKey, '1');
      })
      .catch(() => {});
  }, []);

  if (count === null) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-32 animate-pulse rounded-lg bg-white/5" />
      </div>
    );
  }

  const digits = formatNumber(count).split('');

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
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
        <span>Visitas totales</span>
      </div>

      <motion.div
        className={`relative flex items-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-4xl font-bold tracking-tight backdrop-blur-sm transition-shadow duration-500 sm:text-5xl ${
          showGlow ? 'shadow-[0_0_30px_rgba(59,130,246,0.5)]' : ''
        }`}
        animate={showGlow ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {digits.map((d, i) =>
          d === ',' ? (
            <span key={`sep-${i}`} className="mx-0.5 text-muted-foreground">
              ,
            </span>
          ) : (
            <RollingDigit key={`d-${i}`} digit={d} delay={i * 0.05} />
          ),
        )}
      </motion.div>
    </motion.div>
  );
}
