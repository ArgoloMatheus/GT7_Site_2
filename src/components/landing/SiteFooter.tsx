'use client';

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-gt-border bg-gt-surface/40 px-4 md:px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gt-cyan/15 flex items-center justify-center text-gt-cyan text-xs font-bold">
              GT
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Setup Advisor</span>
          </div>
          <p className="text-[11px] text-gt-text-muted leading-relaxed">
            Desenvolvido para entusiastas de simracing. Algoritmos de dinâmica veicular 
            homologados para o patch 1.69 do GT7.
          </p>
        </div>

        {/* Physics Protocols */}
        <div className="space-y-3">
          <h4 className="gt-label text-gt-text text-[10px]">Protocolos de Física</h4>
          <ul className="space-y-2">
            {[
              'FREQ. NATURAL > 3.2HZ',
              'VETORIZAÇÃO TORQUE DINÂMICA',
              'COMPENSAÇÃO ARRASTO AERO',
              'PP DECOUPLED DE MARCHAS',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[10px] gt-mono text-gt-text-muted">
                <div className="w-1 h-1 rounded-full bg-gt-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="gt-label text-gt-text text-[10px]">Links</h4>
          <ul className="space-y-2">
            {['Dashboard', 'Circuitos', 'Comunidade', 'Changelog'].map((link) => (
              <li key={link}>
                <button className="text-[11px] text-gt-text-muted hover:text-gt-cyan transition-colors">
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h4 className="gt-label text-gt-text text-[10px]">Legal</h4>
          <p className="text-[10px] text-gt-text-muted leading-relaxed">
            Este projeto não é afiliado à Polyphony Digital ou Sony Interactive Entertainment. 
            Gran Turismo 7 é marca registrada.
          </p>
          <div className="flex gap-3 pt-1">
            <SocialIcon label="GH" />
            <SocialIcon label="X" />
            <SocialIcon label="DC" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gt-border/30 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="gt-mono text-[9px] text-gt-text-muted">
          © 2026 GT7 SETUP ADVISOR — ALL RIGHTS RESERVED
        </p>
        <div className="flex gap-6">
          <span className="gt-mono text-[9px] text-gt-green">STATUS: OPERATIONAL</span>
          <span className="gt-mono text-[9px] text-gt-cyan">ENGINE: v1.69.0-STABLE</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <div className="w-7 h-7 rounded-full border border-gt-border flex items-center justify-center text-gt-text-muted hover:text-gt-cyan hover:border-gt-cyan/40 cursor-pointer transition-all">
      <span className="text-[9px] font-bold">{label}</span>
    </div>
  );
}
