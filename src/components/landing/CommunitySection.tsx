'use client';

const COMMS = [
  { user: 'RacerX_BR', msg: 'O setup de Endurance pra Sardegna ficou perfeito. 0 pits, P1.', time: '2min', color: 'text-gt-green' },
  { user: 'DriftKingJP', msg: 'Alguém tem dica pra MR em Dragon Trail? A traseira escapa no S2.', time: '5min', color: 'text-gt-orange' },
  { user: 'TurboLag42', msg: 'Ferrari 296 GT3 em Spa: ARB traseira +2 fez toda diferença.', time: '8min', color: 'text-gt-cyan' },
  { user: 'PitCrewChief', msg: 'Update 1.69 mudou o cálculo de PP. Marchas não afetam mais.', time: '12min', color: 'text-gt-yellow' },
];

const GUIDES = [
  { track: 'Nürburgring Nordschleife', sectors: 17, difficulty: 'Expert', color: 'gt-red' },
  { track: 'Spa-Francorchamps', sectors: 8, difficulty: 'Advanced', color: 'gt-orange' },
  { track: 'Suzuka Circuit', sectors: 6, difficulty: 'Intermediate', color: 'gt-yellow' },
];

export function CommunitySection() {
  return (
    <section className="px-4 py-16 md:py-20 border-t border-gt-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="gt-section-header">
          <h3 className="gt-display text-2xl md:text-3xl">
            Community <span className="text-gt-purple">Hub</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Comms */}
          <div className="gt-card-static p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="gt-live-dot" />
                <span className="gt-label text-gt-green">Live Comms</span>
              </div>
              <span className="gt-mono text-[9px] text-gt-text-muted">{COMMS.length} ONLINE</span>
            </div>
            <div className="space-y-3">
              {COMMS.map((msg, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-gt-surface border border-gt-border flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-gt-text-muted">{msg.user[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`gt-mono text-[10px] font-bold ${msg.color}`}>{msg.user}</span>
                      <span className="gt-mono text-[8px] text-gt-text-muted">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gt-text-secondary leading-relaxed truncate">
                      {msg.msg}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track Guides */}
          <div className="gt-card-static p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="gt-label text-gt-purple">Track Guides</span>
              <span className="gt-mono text-[9px] text-gt-text-muted">{GUIDES.length} DISPONÍVEIS</span>
            </div>
            <div className="space-y-3">
              {GUIDES.map((guide, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gt-surface border border-gt-border hover:border-gt-border-glow transition-all cursor-pointer group"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gt-text group-hover:text-gt-purple transition-colors">
                      {guide.track}
                    </h4>
                    <span className="gt-mono text-[10px] text-gt-text-muted">
                      {guide.sectors} setores • {guide.difficulty}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-gt-text-muted group-hover:text-gt-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
