'use client';

import { WizardForm } from '@/components/wizard/WizardForm';

export default function SetupAdvisorPage() {
  return (
    <div className="min-h-screen bg-gt-black text-gt-text selection:bg-gt-cyan selection:text-gt-black overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gt-blue/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] bg-gt-cyan/5 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-gt-purple/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 gt-glass px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gt-cyan to-gt-blue rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-10 h-10 rounded-lg bg-gt-black border border-gt-border flex items-center justify-center text-xl font-black italic tracking-tighter">
                <span className="bg-gradient-to-br from-gt-cyan to-gt-blue bg-clip-text text-transparent">GT</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black italic uppercase tracking-tighter leading-none">
                Setup <span className="text-gt-cyan">Advisor</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="gt-mono text-[9px] text-gt-text-muted">SYSTEM STATUS:</span>
                <span className="gt-mono text-[9px] text-gt-green animate-pulse font-bold">OPTIMIZED</span>
                <span className="w-1 h-1 rounded-full bg-gt-border-glow mx-1" />
                <span className="gt-mono text-[9px] text-gt-text-muted">PHYSICS v1.69</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="gt-mono text-[10px] text-gt-text-muted leading-none">LATENCY</span>
              <span className="gt-mono text-xs text-gt-cyan font-bold leading-none mt-1">12ms</span>
            </div>
            <div className="w-[1px] h-8 bg-gt-border/50" />
            <div className="flex flex-col items-end">
              <span className="gt-mono text-[10px] text-gt-text-muted leading-none">VERIFIED</span>
              <span className="gt-mono text-xs text-gt-green font-bold leading-none mt-1">SSL SECURE</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Text - Hidden when dashboard is active (managed by WizardForm internals) */}
          <section className="mb-12 text-center gt-animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-gt-text">
              Engineered for <span className="text-gt-cyan">Performance.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gt-text-secondary text-sm md:text-base leading-relaxed">
              Otimize seu tempo de volta com cálculos precisos baseados na telemetria oficial do Gran Turismo 7. 
              Siga o wizard abaixo para gerar sua configuração personalizada.
            </p>
          </section>

          {/* The Wizard */}
          <section className="relative">
            <div className="absolute -inset-4 bg-gradient-to-b from-gt-cyan/5 to-transparent rounded-[2rem] blur-2xl -z-10" />
            <WizardForm />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gt-border bg-gt-surface/50 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gt-cyan/20 flex items-center justify-center text-gt-cyan text-xs font-bold">GT</div>
              <span className="text-sm font-bold uppercase tracking-widest italic">Setup Advisor</span>
            </div>
            <p className="text-xs text-gt-text-muted leading-relaxed">
              Desenvolvido para entusiastas de simracing. Os cálculos utilizam algoritmos de dinâmica veicular 
              homologados para o patch 1.69 do GT7.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="gt-label text-gt-text">Protocolos de Física</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-[10px] gt-mono text-gt-text-muted">
                <div className="w-1 h-1 rounded-full bg-gt-cyan" />
                RESTRIÇÃO FREQ. NATURAL {'>'} 3.2HZ
              </li>
              <li className="flex items-center gap-2 text-[10px] gt-mono text-gt-text-muted">
                <div className="w-1 h-1 rounded-full bg-gt-cyan" />
                VETORIZAÇÃO DE TORQUE DINÂMICA
              </li>
              <li className="flex items-center gap-2 text-[10px] gt-mono text-gt-text-muted">
                <div className="w-1 h-1 rounded-full bg-gt-cyan" />
                COMPENSAÇÃO DE ARRASTO AERO
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="gt-label text-gt-text">Legal</h4>
            <p className="text-[10px] text-gt-text-muted leading-relaxed">
              Este projeto não é afiliado à Polyphony Digital ou Sony Interactive Entertainment. 
              Gran Turismo 7 é marca registrada.
            </p>
            <div className="pt-2 flex gap-4">
              <div className="w-8 h-8 rounded-full border border-gt-border flex items-center justify-center text-gt-text-muted hover:text-gt-cyan cursor-pointer transition-colors">
                <span className="text-xs">GH</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-gt-border flex items-center justify-center text-gt-text-muted hover:text-gt-cyan cursor-pointer transition-colors">
                <span className="text-xs">X</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gt-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="gt-mono text-[9px] text-gt-text-muted">© 2026 GT7 SETUP ADVISOR | ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <span className="gt-mono text-[9px] text-gt-green">LATENCY: OPTIMAL</span>
            <span className="gt-mono text-[9px] text-gt-cyan">ENGINE: v1.69.0-STABLE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
