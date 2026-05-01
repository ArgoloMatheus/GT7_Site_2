'use client';

import type { EstiloPilotagem } from '@/contracts/setup.interface';

interface StyleSelectProps {
  selectedStyle: EstiloPilotagem | null;
  onSelect: (style: EstiloPilotagem) => void;
}

const STYLES: {
  id: EstiloPilotagem;
  title: string;
  desc: string;
  icon: string;
  color: string;
  borderColor: string;
  traits: string[];
}[] = [
  {
    id: 'Agressivo',
    title: 'Agressivo',
    desc: 'Máximo desempenho por volta. Foco em downforce e grip mecânico.',
    icon: '⚡',
    color: 'text-gt-red',
    borderColor: 'border-gt-red',
    traits: ['Downforce Máximo', 'Fuel Map 1', 'Brake Bias Frontal', 'Pneu Racing Soft/Medium'],
  },
  {
    id: 'Gerenciamento_Endurance',
    title: 'Endurance',
    desc: 'Estratégia de longo prazo. Conservação de pneus e combustível.',
    icon: '🛡️',
    color: 'text-gt-green',
    borderColor: 'border-gt-green',
    traits: ['Pneu Racing Hard', 'Fuel Map 6 (Lean)', 'Arrasto Reduzido', '1 Pit ou Sem Paradas'],
  },
];

export function StyleSelect({ selectedStyle, onSelect }: StyleSelectProps) {
  return (
    <div className="gt-animate-fade-in">
      <h2 className="text-2xl font-bold text-gt-text mb-1">
        Estilo de Pilotagem
      </h2>
      <p className="text-gt-text-secondary text-sm mb-8">
        Defina a filosofia que guiará toda a configuração do veículo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {STYLES.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              id={`style-${style.id}`}
              onClick={() => onSelect(style.id)}
              className={`
                relative gt-card p-6 text-left cursor-pointer group
                ${isSelected
                  ? `gt-card-selected ${style.borderColor}`
                  : ''
                }
              `}
            >
              {/* Icon */}
              <div className="text-3xl mb-3">{style.icon}</div>

              {/* Title */}
              <h3 className={`text-xl font-bold mb-2 ${isSelected ? style.color : 'text-gt-text'}`}>
                {style.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gt-text-secondary mb-4 leading-relaxed">
                {style.desc}
              </p>

              {/* Traits */}
              <div className="space-y-1.5">
                {style.traits.map((trait) => (
                  <div key={trait} className="flex items-center gap-2 text-xs text-gt-text-muted">
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-current ' + style.color : 'bg-gt-border-glow'}`} />
                    <span className="gt-mono">{trait}</span>
                  </div>
                ))}
              </div>

              {/* Selection Check */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gt-cyan/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gt-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
