'use client';

import { WizardForm } from '@/components/wizard/WizardForm';

export default function SetupAdvisorPage() {
  return (
    <div className="min-h-screen bg-gt-black text-gt-text overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(163,94,255,0.12),transparent_20%)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-gt-border/70 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gt-surface border border-gt-border shadow-[0_0_18px_rgba(0,229,255,0.12)]">
              <span className="text-lg font-black italic bg-gradient-to-br from-gt-cyan to-gt-blue bg-clip-text text-transparent">GT</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-gt-text-muted">GT7 Setup Advisor</p>
              <h1 className="text-xl font-black uppercase tracking-tight text-gt-text">Telemetry Performance Dashboard</h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="space-y-1 text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gt-text-muted">Latency</p>
              <p className="text-sm font-bold text-gt-cyan">12ms</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gt-text-muted">Physics</p>
              <p className="text-sm font-bold text-gt-green">v1.69</p>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 lg:pt-24">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1680px] flex-col gap-6 px-4 pb-10 md:px-6 lg:flex-row">
          <aside className="hidden lg:flex w-72 flex-col gap-6 rounded-3xl border border-gt-border bg-gt-surface/80 p-5 shadow-gt-card backdrop-blur-xl">
            <div className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-black/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gt-black border border-white/10 text-gt-cyan">
                  <span className="material-symbols-outlined">sports_motorsports</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gt-cyan">Squadra Corse</p>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">GT3 League</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gt-text">RACING OPS</p>
                <p className="text-xs text-gt-text-muted">Posto de comando para estratégia, telemetria e setup.</p>
              </div>
            </div>

            <nav className="space-y-2 text-sm font-medium">
              {[
                { label: 'Dashboard', icon: 'dashboard', active: false },
                { label: 'Car Setup', icon: 'precision_manufacturing', active: true },
                { label: 'Telemetry', icon: 'query_stats', active: false },
                { label: 'Community', icon: 'forum', active: false },
                { label: 'News', icon: 'newspaper', active: false },
              ].map((item) => (
                <a
                  key={item.label}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${item.active ? 'bg-gt-cyan/10 text-gt-cyan shadow-[inset_0_0_0_1px_rgba(0,229,255,0.14)]' : 'text-gt-text-muted hover:bg-white/5 hover:text-gt-text'}`}
                  href="#"
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="space-y-3 rounded-3xl border border-white/5 bg-black/40 p-4">
              <button className="w-full rounded-2xl bg-gt-cyan px-4 py-3 text-sm font-bold text-gt-black transition hover:bg-gt-cyan-dim">
                Go to Track
              </button>
              <a className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm text-gt-text-muted hover:border-gt-cyan/40 hover:text-gt-text" href="#">
                <span>System Log</span>
                <span className="material-symbols-outlined text-sm">terminal</span>
              </a>
            </div>
          </aside>

          <main className="flex-1 grid gap-6">
            <section className="grid gap-6 rounded-[2rem] border border-gt-border bg-gt-surface/80 p-6 shadow-gt-card backdrop-blur-xl">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-gt-text-muted">Circuit Selection</p>
                  <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-gt-text">Control Center for Race Strategy</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-gt-text-secondary">
                    Escolha o circuito, calibre seu setup e veja a telemetria instantânea com um painel inspirado em HUDs de alta performance.
                  </p>
                </div>
                <div className="hidden xl:grid grid-cols-3 gap-3">
                  {[
                    { label: 'Speed', value: '248 KPH' },
                    { label: 'Lateral G', value: '1.84 G' },
                    { label: 'PP Score', value: '845.2' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/40 p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gt-text-muted">{stat.label}</p>
                      <p className="mt-3 text-xl font-semibold text-gt-text">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: 'Selected Circuit', value: 'Spa-Francorchamps' },
                  { title: 'Current Model', value: '911 GT3 R (992)' },
                  { title: 'Tire Compound', value: 'Racing Hard' },
                  { title: 'Fuel Strategy', value: 'Lean (6)' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-black/40 p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">{item.title}</p>
                    <p className="mt-3 text-lg font-semibold text-gt-text">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
              <section className="grid gap-6 rounded-[2rem] border border-gt-border bg-gt-surface/80 p-6 shadow-gt-card backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gt-text-muted">Track Cards</p>
                    <h3 className="mt-2 text-2xl font-black text-gt-text">Target Circuits</h3>
                  </div>
                  <button className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gt-text-muted transition hover:border-gt-cyan/30 hover:text-gt-cyan">
                    View All
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Spa-Francorchamps', subtitle: 'Grand Prix Circuit', length: '7,004 m', effort: '20T' },
                    { title: 'Suzuka Circuit', subtitle: 'Technical Layout', length: '5,807 m', effort: '18T' },
                    { title: 'Monza', subtitle: 'High Speed', length: '5,793 m', effort: '11T' },
                    { title: 'Nürburgring', subtitle: 'Nordschleife', length: '20,832 m', effort: '170T' },
                  ].map((track) => (
                    <article key={track.title} className="group overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-5 transition hover:border-gt-cyan/30">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">{track.subtitle}</p>
                          <h4 className="mt-2 text-lg font-semibold text-gt-text">{track.title}</h4>
                        </div>
                        <span className="rounded-2xl border border-gt-cyan/30 bg-gt-cyan/10 px-3 py-1 text-[10px] uppercase text-gt-cyan">ACTIVO</span>
                      </div>
                      <div className="grid gap-2 text-sm text-gt-text-muted">
                        <div className="flex justify-between"><span>Length</span><span>{track.length}</span></div>
                        <div className="flex justify-between"><span>Effort</span><span>{track.effort}</span></div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="space-y-6 rounded-[2rem] border border-gt-border bg-gt-surface/80 p-6 shadow-gt-card backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-gt-text-muted">Quick Calibration</p>
                    <h3 className="mt-2 text-2xl font-black text-gt-text">Setup Control</h3>
                  </div>
                  <span className="rounded-2xl bg-gt-green/10 px-3 py-2 text-xs uppercase text-gt-green">Stable</span>
                </div>
                <div className="space-y-5 rounded-3xl border border-white/10 bg-black/40 p-4">
                  {[
                    { label: 'Front Downforce', value: '450', width: '65%' },
                    { label: 'Rear Downforce', value: '820', width: '85%' },
                    { label: 'Brake Balance', value: '-2', width: '40%' },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gt-text-muted">
                        <span>{stat.label}</span>
                        <span className="font-semibold text-gt-text">{stat.value}</span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-gt-border">
                        <div className="absolute inset-y-0 left-0 bg-gt-cyan" style={{ width: stat.width }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full rounded-2xl bg-gt-cyan px-4 py-3 text-sm font-bold text-gt-black transition hover:bg-gt-cyan-dim">
                  Apply to Telemetry
                </button>
              </aside>
            </div>

            <section className="rounded-[2rem] border border-gt-border bg-gt-surface/80 p-6 shadow-gt-card backdrop-blur-xl">
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">Live Network</p>
                      <h3 className="mt-2 text-2xl font-black text-gt-text">Telemetry Feed</h3>
                    </div>
                    <span className="rounded-2xl bg-gt-green/10 px-3 py-2 text-xs uppercase text-gt-green">Stable</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {[
                      {
                        label: 'SYS_UPDATE // 14:02 UTC',
                        title: 'Spa BOP Adjustment Applied',
                        description: "Weight penalty added to all MR drivetrains for the upcoming league endurance race.",
                      },
                      {
                        label: 'COMMUNITY // 09:45 UTC',
                        title: 'New Quali Record: 911 GT3 R',
                        description: "User 'ApexHunter' shattered the sector 2 benchmark. Download the telemetry ghost now.",
                      },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl border border-white/10 bg-gt-surface p-4 transition hover:border-gt-cyan/30">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">{item.label}</p>
                        <h4 className="mt-3 text-base font-semibold text-gt-text">{item.title}</h4>
                        <p className="mt-2 text-sm text-gt-text-secondary">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">Live Calibration</p>
                  <div className="mt-6 space-y-4">
                    {[
                      { label: 'Front Camber', value: '3.5°', percent: 35 },
                      { label: 'Rear Camber', value: '2.5°', percent: 25 },
                      { label: 'ARB Front', value: '6', percent: 60 },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex items-center justify-between text-sm text-gt-text-muted mb-2">
                          <span>{metric.label}</span>
                          <span className="font-semibold text-gt-text">{metric.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gt-border">
                          <div className="h-full bg-gt-cyan" style={{ width: `${metric.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4">
                    <button className="rounded-2xl border border-gt-border px-4 py-3 text-sm uppercase tracking-[0.28em] text-gt-text-muted transition hover:border-gt-cyan/30 hover:text-gt-cyan">
                      Reset Defaults
                    </button>
                    <button className="rounded-2xl bg-gt-cyan px-4 py-3 text-sm font-bold text-gt-black transition hover:bg-gt-cyan-dim">
                      Apply Setup
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-gt-border bg-gt-surface/80 p-6 shadow-gt-card backdrop-blur-xl">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gt-text-muted">Car Setup Wizard</p>
                  <h3 className="mt-2 text-2xl font-black text-gt-text">Integrated Setup Workflow</h3>
                </div>
                <div className="rounded-2xl bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.3em] text-gt-text-muted">
                  Real-time recommendations
                </div>
              </div>
              <div className="mt-6 rounded-3xl border border-white/10 bg-black/40 p-6">
                <WizardForm />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
