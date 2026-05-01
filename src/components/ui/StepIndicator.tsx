'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8" role="navigation" aria-label="Progresso do wizard">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isComplete = step < currentStep;

        return (
          <div key={step} className="flex items-center gap-2">
            {/* Step Circle */}
            <div className="flex items-center gap-3">
              <div
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-full
                  font-semibold text-sm transition-all duration-300
                  ${isActive
                    ? 'bg-gt-cyan/20 text-gt-cyan border-2 border-gt-cyan shadow-[0_0_16px_rgba(0,229,255,0.3)]'
                    : isComplete
                      ? 'bg-gt-green/20 text-gt-green border-2 border-gt-green'
                      : 'bg-gt-card text-gt-text-muted border border-gt-border'
                  }
                `}
                aria-current={isActive ? 'step' : undefined}
              >
                {isComplete ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`
                  hidden sm:block text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-gt-cyan' : isComplete ? 'text-gt-green' : 'text-gt-text-muted'}
                `}
              >
                {labels[i]}
              </span>
            </div>

            {/* Connector line */}
            {step < totalSteps && (
              <div
                className={`
                  w-12 md:w-20 h-px transition-colors duration-500
                  ${isComplete ? 'bg-gt-green' : 'bg-gt-border'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
