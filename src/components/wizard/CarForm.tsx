'use client';

import { useFormContext } from 'react-hook-form';
import { CATEGORIES, DRIVETRAINS, CARS } from '@/data/cars';

export function CarForm() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  
  const currentCategoria = watch('veiculo.categoria');
  const currentTracao = watch('veiculo.tracao');
  const veiculoErrors = errors.veiculo as any;

  return (
    <div className="gt-animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gt-text mb-1">Configuração do Veículo</h2>
        <p className="text-gt-text-secondary text-sm">Insira os detalhes técnicos da sua máquina.</p>
      </div>

      <div className="space-y-4">
        {/* Vehicle Name */}
        <div className="space-y-2">
          <label className="gt-label">Nome do Veículo</label>
          <input
            {...register('veiculo.nome')}
            placeholder="Ex: Mazda 787B '91"
            className="w-full bg-gt-card border border-gt-border rounded-lg px-4 py-3 text-gt-text focus:border-gt-cyan/50 focus:ring-1 focus:ring-gt-cyan/20 outline-none transition-all"
            list="car-suggestions"
          />
          <datalist id="car-suggestions">
            {CARS.map(car => <option key={car.nome} value={car.nome} />)}
          </datalist>
          {veiculoErrors?.nome && (
            <p className="text-gt-red text-[10px] gt-mono">{veiculoErrors.nome.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-2">
            <label className="gt-label">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setValue('veiculo.categoria', cat.id, { shouldValidate: true })}
                  className={`
                    py-2 rounded-md text-xs font-bold gt-mono border transition-all
                    ${currentCategoria === cat.id 
                      ? 'bg-gt-cyan/10 border-gt-cyan text-gt-cyan' 
                      : 'bg-gt-surface border-gt-border text-gt-text-muted hover:border-gt-border-glow'}
                  `}
                >
                  {cat.id}
                </button>
              ))}
            </div>
            {veiculoErrors?.categoria && (
              <p className="text-gt-red text-[10px] gt-mono">{veiculoErrors.categoria.message}</p>
            )}
          </div>

          {/* Drivetrain */}
          <div className="space-y-2">
            <label className="gt-label">Tração</label>
            <div className="grid grid-cols-3 gap-2">
              {DRIVETRAINS.map((dt) => (
                <button
                  key={dt.id}
                  type="button"
                  onClick={() => setValue('veiculo.tracao', dt.id, { shouldValidate: true })}
                  className={`
                    py-2 rounded-md text-xs font-bold gt-mono border transition-all
                    ${currentTracao === dt.id 
                      ? 'bg-gt-orange/10 border-gt-orange text-gt-orange' 
                      : 'bg-gt-surface border-gt-border text-gt-text-muted hover:border-gt-border-glow'}
                  `}
                >
                  {dt.id}
                </button>
              ))}
            </div>
            {veiculoErrors?.tracao && (
              <p className="text-gt-red text-[10px] gt-mono">{veiculoErrors.tracao.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gt-surface/50 border border-gt-border rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-gt-blue/20 flex items-center justify-center text-gt-blue text-lg">ℹ️</div>
          <div>
            <p className="text-xs text-gt-text-secondary leading-relaxed">
              A categoria e tração definem os limites de ajuste da suspensão e aerodinâmica de acordo com o motor de física v1.69.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
