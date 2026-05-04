'use client';

const FEATURED = [
  {
    car: "Mazda 787B '91",
    track: 'Le Mans',
    category: 'Gr.1',
    style: 'Endurance',
    author: 'RacerX_BR',
    confidence: 0.94,
    color: 'gt-green',
    tags: ['Fuel Map 6', 'Racing Hard', '0 Pits'],
  },
  {
    car: "Ferrari 296 GT3 '23",
    track: 'Spa-Francorchamps',
    category: 'Gr.3',
    style: 'Agressivo',
    author: 'SpeedDemon',
    confidence: 0.91,
    color: 'gt-red',
    tags: ['Max Downforce', 'Fuel Map 1', 'Soft'],
  },
  {
    car: "Porsche 919 Hybrid '16",
    track: 'Nürburgring',
    category: 'Gr.1',
    style: 'Equilibrado',
    author: 'TurboLag42',
    confidence: 0.88,
    color: 'gt-cyan',
    tags: ['AWD Vector', 'Medium Aero', '1 Pit'],
  },
];

export function FeaturedSetups() {
  return (
    <section className="px-4 py-16 md:py-20 border-t border-gt-border/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="gt-section-header">
          <h3 className="gt-display text-2xl md:text-3xl">
            Featured <span className="text-gt-cyan">Setups</span>
          </h3>
        </div>
        <p className="text-gt-text-secondary text-sm mb-8 max-w-lg">
          Configurações em destaque geradas pela comunidade. Validadas pelo motor de física v1.69.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED.map((setup, i) => (
            <div
              key={i}
              className="gt-card-premium p-5 flex flex-col gap-4 gt-animate-fade-in"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`gt-mono text-[10px] font-bold text-${setup.color} uppercase`}>
                    {setup.category} • {setup.style}
                  </span>
                  <h4 className="text-base font-bold mt-1 text-gt-text leading-tight">{setup.car}</h4>
                </div>
                <div className="gt-indicator text-[8px]">{setup.track}</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {setup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="gt-mono text-[9px] px-2 py-0.5 rounded bg-gt-surface border border-gt-border text-gt-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom row */}
              <div className="mt-auto pt-3 border-t border-gt-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gt-card border border-gt-border flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gt-text-muted">
                      {setup.author[0]}
                    </span>
                  </div>
                  <span className="gt-mono text-[10px] text-gt-text-secondary">{setup.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="gt-mono text-[9px] text-gt-text-muted">SCORE</span>
                  <span className="gt-mono text-xs font-bold text-gt-green">
                    {(setup.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
