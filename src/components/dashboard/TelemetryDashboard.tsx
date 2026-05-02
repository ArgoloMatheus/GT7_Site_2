'use client';

import type { SetupResult } from '@/contracts/setup.interface';

interface TelemetryDashboardProps {
  setup: SetupResult;
  carName: string;
  trackName: string;
  style: string;
  onReset: () => void;
}

function Metric({ label, value, unit, color = 'text-gt-cyan' }: {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gt-border/50 last:border-b-0">
      <span className="gt-label">{label}</span>
      <span className={`gt-mono text-sm font-semibold ${color}`}>
        {value}{unit && <span className="text-gt-text-muted ml-1 text-[10px]">{unit}</span>}
      </span>
    </div>
  );
}

function DualBar({ label, front, rear, max, unit }: {
  label: string;
  front: number;
  rear: number;
  max: number;
  unit: string;
}) {
  const frontPct = Math.min((front / max) * 100, 100);
  const rearPct = Math.min((rear / max) * 100, 100);

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <span className="gt-label">{label}</span>
        <span className="gt-mono text-[10px] text-gt-text-muted">
          F: {front.toFixed(2)} / R: {rear.toFixed(2)} {unit}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="gt-bar-track">
            <div
              className="gt-bar-fill bg-gradient-to-r from-gt-cyan to-gt-blue"
              style={{ width: `${frontPct}%` }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="gt-bar-track">
            <div
              className="gt-bar-fill bg-gradient-to-r from-gt-orange to-gt-red"
              style={{ width: `${rearPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TelemetryDashboard({ setup, carName, trackName, style, onReset }: TelemetryDashboardProps) {
  const { metadata, transmissao_pneus, suspensao, aerodinamica_diferencial } = setup;

  const fuelMapColor = transmissao_pneus.fuelMap >= 5 ? 'text-gt-green' : transmissao_pneus.fuelMap <= 2 ? 'text-gt-red' : 'text-gt-yellow';
  const tireColors: Record<string, string> = {
    'Racing Hard': 'text-gt-blue',
    'Racing Medium': 'text-gt-yellow',
    'Racing Soft': 'text-gt-red',
    'Sports Soft': 'text-gt-orange',
  };

  return (
    <div className="gt-animate-slide-up space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gt-text italic uppercase tracking-tighter">
            Tuning <span className="text-gt-cyan">Telemetria</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="gt-mono text-[10px] px-1.5 py-0.5 rounded bg-gt-card border border-gt-border text-gt-text-muted uppercase">
              {carName}
            </span>
            <span className="text-gt-border">/</span>
            <span className="gt-mono text-[10px] text-gt-text-secondary uppercase">{trackName}</span>
            <span className="text-gt-border">/</span>
            <span className="gt-mono text-[10px] text-gt-cyan uppercase">{style}</span>
          </div>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-2 rounded-lg bg-gt-card border border-gt-border text-gt-text hover:border-gt-cyan/50 transition-all text-xs font-bold uppercase tracking-widest"
        >
          Novo Cálculo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bloco 1: Suspensão */}
        <div className="gt-card-static p-6 border-t-2 border-t-gt-cyan">
          <h3 className="gt-label text-gt-cyan mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gt-cyan" />
            Suspensão
          </h3>
          <div className="space-y-6">
            <DualBar
              label="Frequência Natural"
              front={suspensao.naturalFrequency.dianteira}
              rear={suspensao.naturalFrequency.traseira}
              max={5}
              unit="Hz"
            />
            <DualBar
              label="Anti-Roll Bar"
              front={suspensao.antiRollBar.dianteira}
              rear={suspensao.antiRollBar.traseira}
              max={10}
              unit=""
            />
            <div className="space-y-1">
              <div className="flex justify-between gt-label opacity-50 mb-1">
                <span>Compressão %</span>
                <span>Expansão %</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Metric label="F" value={suspensao.dampingCompression.dianteira} color="text-gt-text" />
                  <Metric label="R" value={suspensao.dampingCompression.traseira} color="text-gt-text" />
                </div>
                <div className="space-y-2">
                  <Metric label="F" value={suspensao.dampingExpansion.dianteira} color="text-gt-text" />
                  <Metric label="R" value={suspensao.dampingExpansion.traseira} color="text-gt-text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloco 2: Aerodinâmica e Diferencial */}
        <div className="gt-card-static p-6 border-t-2 border-t-gt-orange">
          <h3 className="gt-label text-gt-orange mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gt-orange" />
            Aerodinâmica & Diferencial
          </h3>
          <div className="space-y-6">
            <DualBar
              label="Downforce"
              front={aerodinamica_diferencial.downforce.dianteira}
              rear={aerodinamica_diferencial.downforce.traseira}
              max={1000}
              unit="pts"
            />
            <div className="pt-4 border-t border-gt-border/30 space-y-2">
              <Metric label="LSD Inicial" value={aerodinamica_diferencial.lsd.inicial} color="text-gt-orange" />
              <Metric label="LSD Aceleração" value={aerodinamica_diferencial.lsd.aceleracao} color="text-gt-orange" />
              <Metric label="LSD Frenagem" value={aerodinamica_diferencial.lsd.frenagem} color="text-gt-orange" />
              <Metric 
                label="Brake Bias" 
                value={aerodinamica_diferencial.brakeBias > 0 ? `+${aerodinamica_diferencial.brakeBias}` : aerodinamica_diferencial.brakeBias} 
                color={aerodinamica_diferencial.brakeBias < 0 ? 'text-gt-red' : 'text-gt-green'} 
              />
            </div>
          </div>
        </div>

        {/* Bloco 3: Estratégia (Pneus/Transmissão) */}
        <div className="gt-card-static p-6 border-t-2 border-t-gt-green">
          <h3 className="gt-label text-gt-green mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gt-green" />
            Estratégia (Pneus/Transmissão)
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-gt-surface border border-gt-border rounded-lg text-center">
              <span className="gt-label block mb-2">Composto Sugerido</span>
              <span className={`gt-mono text-xl font-black ${tireColors[transmissao_pneus.pneuRecomendado] || 'text-gt-text'}`}>
                {transmissao_pneus.pneuRecomendado.toUpperCase()}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="gt-label">Fuel Map</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6].map(m => (
                    <div 
                      key={m} 
                      className={`w-6 h-6 rounded flex items-center justify-center gt-mono text-[10px] font-bold border transition-all
                        ${transmissao_pneus.fuelMap === m 
                          ? `bg-gt-cyan text-gt-black border-gt-cyan shadow-[0_0_10px_rgba(0,229,255,0.4)]` 
                          : 'bg-gt-surface border-gt-border text-gt-text-muted'}
                      `}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="gt-label">Estratégia de Paradas</span>
                <p className="gt-mono text-xs text-gt-text-secondary leading-relaxed bg-gt-surface p-3 border border-gt-border rounded">
                  {transmissao_pneus.estatregiaPits}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info / Metadata */}
      <div className="flex justify-between items-center px-4 py-2 bg-gt-surface/30 rounded-lg border border-gt-border">
        <span className="gt-mono text-[10px] text-gt-text-muted">
          ENGINE: v{metadata.versaoFisica}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="gt-label text-[9px]">Confiança</span>
            <div className="w-24 h-1.5 bg-gt-card border border-gt-border rounded-full overflow-hidden">
              <div className="h-full bg-gt-green" style={{ width: `${metadata.scoreConfianca * 100}%` }} />
            </div>
          </div>
          <span className="gt-mono text-[10px] text-gt-text-muted">
            {new Date(metadata.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
