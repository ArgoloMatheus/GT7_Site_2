'use client';

import { useState, useCallback } from 'react';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { TrackSelect } from '@/components/wizard/TrackSelect';
import { CarSelect } from '@/components/wizard/CarSelect';
import { StyleSelect } from '@/components/wizard/StyleSelect';
import { TelemetryDashboard } from '@/components/dashboard/TelemetryDashboard';
import type { TrackData } from '@/data/tracks';
import type { CarData } from '@/data/cars';
import type { EstiloPilotagem, SetupResult } from '@/contracts/setup.interface';

type WizardState = 'wizard' | 'loading' | 'dashboard';

const STEP_LABELS = ['Pista', 'Veículo', 'Estilo'];

export default function SetupAdvisorPage() {
  const [wizardState, setWizardState] = useState<WizardState>('wizard');
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<EstiloPilotagem | null>(null);

  const [setupResult, setSetupResult] = useState<SetupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canAdvance = useCallback(() => {
    if (currentStep === 1) return selectedTrack !== null;
    if (currentStep === 2) return selectedCar !== null;
    if (currentStep === 3) return selectedStyle !== null;
    return false;
  }, [currentStep, selectedTrack, selectedCar, selectedStyle]);

  const handleNext = useCallback(async () => {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
      return;
    }

    // Step 3: Submit to API
    if (!selectedTrack || !selectedCar || !selectedStyle) return;

    setWizardState('loading');
    setError(null);

    try {
      const payload = {
        veiculo: {
          nome: selectedCar.nome,
          categoria: selectedCar.categoria,
          tracao: selectedCar.tracao,
        },
        pista: {
          id: selectedTrack.id,
          zebrasAgressivas: selectedTrack.zebrasAgressivas,
          exigeDownforce: selectedTrack.exigeDownforce,
        },
        estilo: selectedStyle,
      };

      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || json.status === 'error') {
        throw new Error(json.message || json.code || 'Erro desconhecido');
      }

      setSetupResult(json.data);
      setWizardState('dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao gerar setup.');
      setWizardState('wizard');
    }
  }, [currentStep, selectedTrack, selectedCar, selectedStyle]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setSelectedTrack(null);
    setSelectedCar(null);
    setSelectedStyle(null);
    setSetupResult(null);
    setError(null);
    setWizardState('wizard');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="gt-glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gt-cyan to-gt-blue flex items-center justify-center text-sm font-black text-gt-black">
              GT
            </div>
            <div>
              <h1 className="text-base font-bold text-gt-text leading-none">
                Setup Advisor
              </h1>
              <span className="gt-mono text-[10px] text-gt-text-muted">
                PHYSICS v1.69
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gt-green animate-pulse" />
            <span className="gt-mono text-xs text-gt-text-muted">ONLINE</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────── */}
      <main className="flex-1 px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto">

          {/* Loading State */}
          {wizardState === 'loading' && (
            <div className="flex flex-col items-center justify-center py-24 gt-animate-fade-in">
              <div className="w-12 h-12 border-2 border-gt-border border-t-gt-cyan rounded-full mb-6"
                style={{ animation: 'gt-spin 1s linear infinite' }}
              />
              <p className="text-gt-text-secondary text-sm">Calculando setup otimizado...</p>
              <p className="gt-mono text-xs text-gt-text-muted mt-2">
                Motor v1.69 processando telemetria
              </p>
            </div>
          )}

          {/* Wizard */}
          {wizardState === 'wizard' && (
            <>
              <StepIndicator
                currentStep={currentStep}
                totalSteps={3}
                labels={STEP_LABELS}
              />

              {/* Error Banner */}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-gt-red/10 border border-gt-red/30 text-gt-red text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Step Content */}
              <div className="min-h-[420px]">
                {currentStep === 1 && (
                  <TrackSelect
                    selectedTrack={selectedTrack}
                    onSelect={setSelectedTrack}
                  />
                )}
                {currentStep === 2 && (
                  <CarSelect
                    selectedCar={selectedCar}
                    onSelect={setSelectedCar}
                  />
                )}
                {currentStep === 3 && (
                  <StyleSelect
                    selectedStyle={selectedStyle}
                    onSelect={setSelectedStyle}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gt-border">
                <button
                  id="wizard-back"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="
                    px-5 py-2.5 rounded-lg text-sm font-medium
                    bg-gt-card border border-gt-border text-gt-text-secondary
                    hover:border-gt-border-glow hover:text-gt-text
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                >
                  ← Voltar
                </button>

                <button
                  id="wizard-next"
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  className="
                    px-6 py-2.5 rounded-lg text-sm font-semibold
                    bg-gradient-to-r from-gt-cyan to-gt-blue text-gt-black
                    hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]
                    disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none
                    transition-all duration-200
                  "
                >
                  {currentStep === 3 ? 'Gerar Setup →' : 'Próximo →'}
                </button>
              </div>
            </>
          )}

          {/* Dashboard */}
          {wizardState === 'dashboard' && setupResult && (
            <TelemetryDashboard
              setup={setupResult}
              carName={selectedCar?.nome || ''}
              trackName={selectedTrack?.nome || ''}
              style={selectedStyle || ''}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-gt-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="gt-mono text-xs text-gt-text-muted">
            GT7 Setup Advisor — Motor de Física v1.69
          </p>
          <p className="text-xs text-gt-text-muted">
            Dados de setup são recomendações. Ajuste fino conforme seu estilo.
          </p>
        </div>
      </footer>
    </div>
  );
}
