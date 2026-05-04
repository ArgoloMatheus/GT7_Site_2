'use client';

import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TrackSelect } from './TrackSelect';
import { CarForm } from './CarForm';
import { StyleSelect } from './StyleSelect';
import { TelemetryDashboard } from '../dashboard/TelemetryDashboard';
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
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1 relative">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold gt-mono transition-all duration-300 z-10
                  ${step >= s ? 'bg-gt-cyan text-gt-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-gt-card border border-gt-border text-gt-text-muted'}
                `}
              >
                {s}
              </div>
              <span className={`text-[10px] mt-2 uppercase gt-label ${step >= s ? 'text-gt-cyan' : 'text-gt-text-muted'}`}>
                {s === 1 ? 'Pista' : s === 2 ? 'Veículo' : 'Estilo'}
              </span>
              {s < 3 && (
                <div className={`absolute top-5 left-1/2 w-full h-[1px] -z-0 ${step > s ? 'bg-gt-cyan' : 'bg-gt-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="min-h-[400px] gt-animate-fade-in">
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
