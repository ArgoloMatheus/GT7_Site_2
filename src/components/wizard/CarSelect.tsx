'use client';

import { CARS, CATEGORIES, DRIVETRAINS, type CarData } from '@/data/cars';
import { useState, useMemo } from 'react';
import type { CategoriaVeiculo, TipoTracao } from '@/contracts/setup.interface';

interface CarSelectProps {
  selectedCar: CarData | null;
  onSelect: (car: CarData) => void;
}

export function CarSelect({ selectedCar, onSelect }: CarSelectProps) {
  const [activeCategory, setActiveCategory] = useState<CategoriaVeiculo>('Gr.3');
  const [activeDrivetrain, setActiveDrivetrain] = useState<TipoTracao | 'ALL'>('ALL');

  const filteredCars = useMemo(() => {
    return CARS.filter((c) => {
      const matchCat = c.categoria === activeCategory;
      const matchDt = activeDrivetrain === 'ALL' || c.tracao === activeDrivetrain;
      return matchCat && matchDt;
    });
  }, [activeCategory, activeDrivetrain]);

  const drivetrainColor: Record<string, string> = {
    FF: 'text-gt-yellow',
    FR: 'text-gt-green',
    MR: 'text-gt-orange',
    AWD: 'text-gt-cyan',
    '4WD': 'text-gt-purple',
  };

  return (
    <div className="gt-animate-fade-in">
      <h2 className="text-2xl font-bold text-gt-text mb-1">
        Selecione o Veículo
      </h2>
      <p className="text-gt-text-secondary text-sm mb-6">
        Filtre por categoria e tipo de tração.
      </p>

      {/* Category Pills */}
      <div className="mb-4">
        <span className="gt-label mb-2 block">Categoria</span>
        <div className="flex gap-2 flex-wrap" role="radiogroup" id="category-group">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="radio"
              id={`cat-${cat.id}`}
              aria-checked={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id as CategoriaVeiculo)}
              className={`
                px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${activeCategory === cat.id
                  ? 'bg-gt-cyan/15 text-gt-cyan border border-gt-cyan/40 shadow-[0_0_12px_rgba(0,229,255,0.15)]'
                  : 'bg-gt-card text-gt-text-muted border border-gt-border hover:border-gt-border-glow hover:text-gt-text'
                }
              `}
            >
              <span className="gt-mono">{cat.label}</span>
              <span className="ml-1.5 text-xs font-normal opacity-60">{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Drivetrain Filter */}
      <div className="mb-5">
        <span className="gt-label mb-2 block">Tração</span>
        <div className="flex gap-2 flex-wrap" role="radiogroup" id="drivetrain-group">
          <button
            role="radio"
            id="dt-ALL"
            aria-checked={activeDrivetrain === 'ALL'}
            onClick={() => setActiveDrivetrain('ALL')}
            className={`
              px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
              ${activeDrivetrain === 'ALL'
                ? 'bg-gt-text/10 text-gt-text border border-gt-text/30'
                : 'bg-gt-card text-gt-text-muted border border-gt-border hover:text-gt-text'
              }
            `}
          >
            TODAS
          </button>
          {DRIVETRAINS.map((dt) => (
            <button
              key={dt.id}
              role="radio"
              id={`dt-${dt.id}`}
              aria-checked={activeDrivetrain === dt.id}
              onClick={() => setActiveDrivetrain(dt.id as TipoTracao)}
              className={`
                px-3 py-1.5 rounded-md text-xs font-bold gt-mono transition-all duration-200
                ${activeDrivetrain === dt.id
                  ? `bg-gt-card border ${drivetrainColor[dt.id]} border-current/30`
                  : 'bg-gt-card text-gt-text-muted border border-gt-border hover:text-gt-text'
                }
              `}
            >
              {dt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
        {filteredCars.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gt-text-muted text-sm">
            Nenhum veículo encontrado com esses filtros.
          </div>
        ) : (
          filteredCars.map((car, idx) => {
            const isSelected = selectedCar?.nome === car.nome;
            return (
              <button
                key={car.nome}
                id={`car-card-${idx}`}
                onClick={() => onSelect(car)}
                className={`
                  gt-card p-4 text-left cursor-pointer
                  ${isSelected ? 'gt-card-selected' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`gt-mono text-xs font-bold ${drivetrainColor[car.tracao]}`}>
                    {car.tracao}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-gt-cyan/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-gt-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-gt-text leading-tight mb-1">
                  {car.nome}
                </h3>
                <span className="text-xs text-gt-text-muted">{car.fabricante}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
