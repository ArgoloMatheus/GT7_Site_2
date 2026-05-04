'use client';

import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TrackSelect } from './TrackSelect';
import { CarForm } from './CarForm';
import { StyleSelect } from './StyleSelect';
import { TelemetryDashboard } from '../dashboard/TelemetryDashboard';
import { StepIndicator } from '@/components/ui/StepIndicator';
import type { SetupRequest, SetupResult, EstiloPilotagem } from '@/contracts/setup.interface';
import { VALID_CATEGORIES, VALID_TRACTION, VALID_TRACKS, VALID_STYLES } from '@/api/setup.schema';

const schema = z.object({
  pista: z.object({
    id: z.enum(VALID_TRACKS, { errorMap: () => ({ message: 'Selecione uma pista válida' }) }).optional(),
  }),
  veiculo: z.object({
    nome: z.string().min(1, 'Nome do veículo é obrigatório').max(120),
    categoria: z.enum(VALID_CATEGORIES, { errorMap: () => ({ message: 'Categoria inválida' }) }),
    tracao: z.enum(VALID_TRACTION, { errorMap: () => ({ message: 'Tração inválida' }) }),
  }),
  estilo: z.enum(VALID_STYLES, {
    errorMap: () => ({ message: 'Selecione um estilo de pilotagem' }),
  }),
});

type FormData = z.infer<typeof schema>;

export function WizardForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SetupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pista: { id: undefined },
      veiculo: { nome: '', categoria: 'Gr.3', tracao: 'FR' },
      estilo: 'Equilibrado',
    },
    mode: 'onChange',
  });

  const { handleSubmit, trigger, watch, setValue } = methods;

  const currentPistaId = watch('pista.id');
  const currentVeiculo = watch('veiculo');
  const currentEstilo = watch('estilo');

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['pista.id'];
    if (step === 2) fieldsToValidate = ['veiculo.nome', 'veiculo.categoria', 'veiculo.tracao'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FormData) => {
    if (!data.pista.id) {
      setError('Selecione uma pista');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok || json.status === 'error') {
        throw new Error(json.message || 'Falha ao gerar setup');
      }

      setResult(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    methods.reset();
  };

  if (result) {
    return (
      <TelemetryDashboard
        setup={result}
        carName={currentVeiculo.nome}
        trackName={currentPistaId!}
        style={currentEstilo}
        onReset={handleReset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto rounded-[2rem] border border-gt-border bg-gt-surface/80 p-6 shadow-gt-card backdrop-blur-xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-gt-text-muted">Wizard</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-gt-text">Configuração GT7</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gt-text-secondary">
            Complete as etapas do setup para obter um ajuste preciso baseado em pista, carro e estilo de pilotagem.
          </p>
        </div>

        <StepIndicator
          currentStep={step}
          totalSteps={3}
          labels={['Pista', 'Veículo', 'Estilo']}
        />

        <div className="min-h-[420px] gt-animate-fade-in">
          {step === 1 && (
            <TrackSelect 
              selectedTrackId={currentPistaId} 
              onSelect={(id) => setValue('pista.id', id, { shouldValidate: true })} 
            />
          )}
          {step === 2 && <CarForm />}
          {step === 3 && (
            <StyleSelect 
              selectedStyle={currentEstilo} 
              onSelect={(style) => setValue('estilo', style as EstiloPilotagem, { shouldValidate: true })} 
            />
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-gt-red/10 border border-gt-red/30 rounded-lg text-gt-red text-sm gt-mono">
            [ERROR]: {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gt-border">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className="px-6 py-2 rounded-lg bg-gt-card border border-gt-border text-gt-text-secondary hover:text-gt-text transition-all disabled:opacity-30"
          >
            ← Voltar
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-2 rounded-lg bg-gradient-to-r from-gt-cyan to-gt-blue text-gt-black font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
              Próximo →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 rounded-lg bg-gt-green text-gt-black font-bold hover:shadow-[0_0_20px_rgba(0,230,118,0.3)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'GERANDO...' : 'FINALIZAR SETUP'}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
