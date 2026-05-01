'use client';

import type { SetupResult } from '@/contracts/setup.interface';

interface TelemetryDashboardProps {
  setup: SetupResult;
  carName: string;
  trackName: string;
  style: string;
  onReset: () => void;
}

/* ── Helper: Telemetry Metric Row ─────────────────────────── */
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
        {value}{unit && <span className="text-gt-text-muted ml-1 text-xs">{unit}</span>}
      </span>
    </div>
  );
}

/* ── Helper: Dual-Axis Bar ────────────────────────────────── */
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
        <span className="gt-mono text-xs text-gt-text-muted">
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
          <span className="text-[10px] text-gt-text-muted mt-0.5 block">DIANT</span>
        </div>
        <div className="flex-1">
          <div className="gt-bar-track">
            <div
              className="gt-bar-fill bg-gradient-to-r from-gt-orange to-gt-red"
              style={{ width: `${rearPct}%` }}
            />
          </div>
          <span className="text-[10px] text-gt-text-muted mt-0.5 block">TRAS</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Dashboard ───────────────────────────────────────── */
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
    <div className="gt-animate-slide-up">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gt-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gt-green animate-pulse" />
            Setup Gerado
          </h2>
          <p className="text-sm text-gt-text-secondary mt-1">
            <span className="gt-mono text-gt-cyan">{carName}</span>
            <span className="mx-2 text-gt-border">|</span>
            <span>{trackName}</span>
            <span className="mx-2 text-gt-border">|</span>
            <span className="text-gt-text-muted">{style}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="gt-mono text-xs text-gt-text-muted bg-gt-surface px-3 py-1.5 rounded-md border border-gt-border">
            v{metadata.versaoFisica} — Confiança: {(metadata.scoreConfianca * 100).toFixed(0)}%
          </div>
          <button
            id="reset-wizard"
            onClick={onReset}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              bg-gt-card border border-gt-border text-gt-text-secondary
              hover:border-gt-cyan/40 hover:text-gt-cyan transition-all duration-200
            "
          >
            Novo Setup
          </button>
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Card: Suspensão ─────────────────────────────── */}
        <div className="gt-card-static p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gt-cyan via-gt-blue to-transparent" />
          <h3 className="text-sm font-bold text-gt-cyan mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
            </svg>
            SUSPENSÃO
          </h3>

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
          <DualBar
            label="Compressão"
            front={suspensao.dampingCompression.dianteira}
            rear={suspensao.dampingCompression.traseira}
            max={60}
            unit="%"
          />
          <DualBar
            label="Expansão"
            front={suspensao.dampingExpansion.dianteira}
            rear={suspensao.dampingExpansion.traseira}
            max={60}
            unit="%"
          />
        </div>

        {/* ── Card: Aerodinâmica & Diferencial ────────────── */}
        <div className="gt-card-static p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gt-orange via-gt-red to-transparent" />
          <h3 className="text-sm font-bold text-gt-orange mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AERODINÂMICA & DIFERENCIAL
          </h3>

          <DualBar
            label="Downforce"
            front={aerodinamica_diferencial.downforce.dianteira}
            rear={aerodinamica_diferencial.downforce.traseira}
            max={800}
            unit="pts"
          />

          <div className="mt-3 space-y-0">
            <Metric label="LSD Inicial" value={aerodinamica_diferencial.lsd.inicial} unit="%" color="text-gt-orange" />
            <Metric label="LSD Aceleração" value={aerodinamica_diferencial.lsd.aceleracao} unit="%" color="text-gt-orange" />
            <Metric label="LSD Frenagem" value={aerodinamica_diferencial.lsd.frenagem} unit="%" color="text-gt-orange" />
            <Metric
              label="Brake Bias"
              value={aerodinamica_diferencial.brakeBias > 0 ? `+${aerodinamica_diferencial.brakeBias}` : aerodinamica_diferencial.brakeBias}
              color={aerodinamica_diferencial.brakeBias < 0 ? 'text-gt-red' : 'text-gt-green'}
            />
          </div>
        </div>

        {/* ── Card: Pneus & Combustível ──────────────────── */}
        <div className="gt-card-static p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gt-green via-gt-cyan to-transparent" />
          <h3 className="text-sm font-bold text-gt-green mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            PNEUS & COMBUSTÍVEL
          </h3>

          <div className="flex items-center gap-4 mb-5 p-3 bg-gt-surface rounded-lg border border-gt-border">
            <div className="w-12 h-12 rounded-xl bg-gt-black flex items-center justify-center text-2xl">
              🏎️
            </div>
            <div>
              <span className="gt-label block mb-0.5">Pneu Recomendado</span>
              <span className={`gt-mono text-lg font-bold ${tireColors[transmissao_pneus.pneuRecomendado] || 'text-gt-text'}`}>
                {transmissao_pneus.pneuRecomendado}
              </span>
            </div>
          </div>

          <Metric label="Fuel Map" value={transmissao_pneus.fuelMap} color={fuelMapColor} />
          <Metric label="Estratégia de Pits" value={transmissao_pneus.estatregiaPits} color="text-gt-text" />
        </div>

        {/* ── Card: Metadados ────────────────────────────── */}
        <div className="gt-card-static p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gt-purple via-gt-blue to-transparent" />
          <h3 className="text-sm font-bold text-gt-purple mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            METADADOS DO MOTOR
          </h3>

          <Metric label="Versão Física" value={`v${metadata.versaoFisica}`} color="text-gt-purple" />
          <Metric label="Timestamp" value={new Date(metadata.timestamp).toLocaleString('pt-BR')} color="text-gt-text-secondary" />
          <Metric label="Score de Confiança" value={`${(metadata.scoreConfianca * 100).toFixed(0)}%`} color="text-gt-green" />

          {/* Confidence Bar */}
          <div className="mt-4">
            <div className="gt-bar-track h-2">
              <div
                className="gt-bar-fill h-2 bg-gradient-to-r from-gt-green to-gt-cyan"
                style={{ width: `${metadata.scoreConfianca * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
