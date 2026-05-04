'use client';

interface SiteHeaderProps {
  onStartSetup: () => void;
}

export function SiteHeader({ onStartSetup }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 gt-glass px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gt-cyan to-gt-blue rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500" />
            <div className="relative w-10 h-10 rounded-lg bg-gt-black border border-gt-border flex items-center justify-center">
              <span className="text-lg font-black italic tracking-tighter bg-gradient-to-br from-gt-cyan to-gt-blue bg-clip-text text-transparent">
                GT
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight leading-none">
              Setup <span className="text-gt-cyan">Advisor</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="gt-mono text-[9px] text-gt-text-muted">PHYSICS</span>
              <span className="gt-mono text-[9px] text-gt-cyan font-semibold">v1.69</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink label="Dashboard" active />
          <NavLink label="Circuitos" />
          <NavLink label="Comunidade" />
        </nav>

        {/* CTA + Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <StatusPill label="STATUS" value="ONLINE" color="green" />
            <div className="w-px h-6 bg-gt-border/50" />
            <StatusPill label="LATENCY" value="12ms" color="cyan" />
          </div>
          <button onClick={onStartSetup} className="gt-btn-primary text-xs py-2 px-4">
            Novo Setup
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`text-sm font-medium transition-colors ${
        active ? 'text-gt-cyan' : 'text-gt-text-muted hover:text-gt-text'
      }`}
    >
      {label}
    </button>
  );
}

function StatusPill({ label, value, color }: { label: string; value: string; color: string }) {
  const colorClass = color === 'green' ? 'text-gt-green' : 'text-gt-cyan';
  const dotClass = color === 'green' ? 'bg-gt-green' : 'bg-gt-cyan';
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${dotClass} animate-pulse`} />
      <div className="flex flex-col">
        <span className="gt-mono text-[8px] text-gt-text-muted leading-none">{label}</span>
        <span className={`gt-mono text-[10px] font-bold leading-none mt-0.5 ${colorClass}`}>{value}</span>
      </div>
    </div>
  );
}
