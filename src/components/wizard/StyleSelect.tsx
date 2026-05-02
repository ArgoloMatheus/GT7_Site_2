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
    id: 'Equilibrado',
    title: 'Equilibrado',
    desc: 'Compromisso entre velocidade e consistência. Ideal para corridas sprint.',
    icon: '⚖️',
    color: 'text-gt-cyan',
    borderColor: 'border-gt-cyan',
    traits: ['Downforce Médio', 'Fuel Map 2-3', 'Brake Bias Neutro', 'Pneu Racing Medium'],
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STYLES.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              type="button"
              id={`style-${style.id}`}
              onClick={() => onSelect(style.id)}
              className={`
                relative gt-card p-5 text-left cursor-pointer group flex flex-col h-full
                ${isSelected
                  ? `gt-card-selected ${style.borderColor}`
                  : ''
                }
              `}
            >
              <div className="text-2xl mb-2">{style.icon}</div>
              <h3 className={`text-lg font-bold mb-1 ${isSelected ? style.color : 'text-gt-text'}`}>
                {style.title}
              </h3>
              <p className="text-[11px] text-gt-text-secondary mb-4 leading-relaxed flex-grow">
                {style.desc}
              </p>
              <div className="space-y-1 mt-auto">
                {style.traits.map((trait) => (
                  <div key={trait} className="flex items-center gap-2 text-[10px] text-gt-text-muted">
                    <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-current ' + style.color : 'bg-gt-border-glow'}`} />
                    <span className="gt-mono">{trait}</span>
                  </div>
                ))}
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gt-cyan/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-gt-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
