'use client';

interface HeroSectionProps {
  onStartSetup: () => void;
}

export function HeroSection({ onStartSetup }: HeroSectionProps) {
  return (
    <section className="relative px-4 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Wireframe vehicle render decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden lg:block">
        <svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 200 L120 180 L180 160 L220 120 L280 100 L340 95 L400 100 L440 110 L480 130 L520 160 L560 190 L580 200" stroke="currentColor" strokeWidth="1" className="text-gt-cyan"/>
          <path d="M120 180 L120 220 M220 120 L200 220 M340 95 L340 220 M440 110 L460 220 M520 160 L530 220" stroke="currentColor" strokeWidth="0.5" className="text-gt-cyan" strokeDasharray="4 4"/>
          <ellipse cx="160" cy="220" rx="30" ry="30" stroke="currentColor" strokeWidth="0.8" className="text-gt-cyan"/>
          <ellipse cx="490" cy="220" rx="30" ry="30" stroke="currentColor" strokeWidth="0.8" className="text-gt-cyan"/>
          <path d="M50 220 L580 220" stroke="currentColor" strokeWidth="0.3" className="text-gt-cyan" strokeDasharray="2 6"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className="gt-indicator">
              <div className="w-1.5 h-1.5 rounded-full bg-gt-cyan animate-pulse" />
              SISTEMA ATIVO
            </div>
            <div className="gt-indicator-green">
              ENGINE CALIBRADA
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="gt-display text-4xl md:text-6xl lg:text-7xl mb-6">
            Engineered for{' '}
            <span className="bg-gradient-to-r from-gt-cyan via-gt-blue to-gt-cyan bg-clip-text text-transparent">
              Performance.
            </span>
          </h2>

          <p className="text-gt-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-10">
            Otimize seu tempo de volta com cálculos precisos baseados na telemetria oficial do 
            Gran Turismo 7. Suspensão, aerodinâmica, diferencial e estratégia de pits — tudo 
            calibrado pelo motor de física v1.69.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button onClick={onStartSetup} className="gt-btn-primary text-sm py-3 px-8">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Gerar Meu Setup
            </button>
            <button className="gt-btn-secondary text-sm py-3 px-8">
              Ver Guias de Pista
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QuickStat label="CIRCUITOS" value="40+" />
            <QuickStat label="VEÍCULOS" value="150+" />
            <QuickStat label="CATEGORIAS" value="6" />
            <QuickStat label="PRECISÃO" value="97.3%" accent />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="gt-data-cell">
      <span className="gt-mono text-[9px] text-gt-text-muted">{label}</span>
      <span className={`gt-mono text-lg font-bold ${accent ? 'text-gt-green' : 'text-gt-cyan'}`}>
        {value}
      </span>
    </div>
  );
}
