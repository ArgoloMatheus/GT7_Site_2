'use client';

import { useEffect, useState } from 'react';

const TICKER_ITEMS = [
  { label: 'PHYSICS ENGINE', value: 'v1.69 CALIBRATED', color: 'text-gt-green' },
  { label: 'FREQ. NAT. CONSTRAINT', value: '≥ 3.2 Hz', color: 'text-gt-cyan' },
  { label: 'PP CALC', value: 'GEAR RATIO DECOUPLED', color: 'text-gt-yellow' },
  { label: 'AERO DRAG', value: 'REAL-TIME COMPENSATION', color: 'text-gt-orange' },
  { label: 'LSD VECTOR', value: 'DYNAMIC TORQUE SPLIT', color: 'text-gt-cyan' },
  { label: 'DAMPING RATIO', value: 'KERB-OPTIMIZED', color: 'text-gt-purple' },
];

export function TelemetryBar() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('pt-BR'));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative border-b border-gt-border bg-gt-surface/60 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center h-8">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-2 px-4 border-r border-gt-border/50 shrink-0">
          <div className="gt-live-dot" />
          <span className="gt-mono text-[9px] text-gt-green font-bold">LIVE</span>
        </div>

        {/* Ticker */}
        <div className="flex-1 gt-ticker-wrapper">
          <div className="gt-ticker-content">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-6">
                <span className="gt-mono text-[9px] text-gt-text-muted">{item.label}:</span>
                <span className={`gt-mono text-[9px] font-bold ${item.color}`}>{item.value}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Clock */}
        <div className="hidden sm:flex items-center px-4 border-l border-gt-border/50 shrink-0">
          <span className="gt-mono text-[9px] text-gt-text-muted">{time}</span>
        </div>
      </div>
    </div>
  );
}
