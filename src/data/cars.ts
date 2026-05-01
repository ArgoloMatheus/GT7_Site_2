/**
 * GT7 Setup Advisor — Vehicle Database (v1.69)
 * Subset of homologated vehicles from the recommendation engine
 */
import type { CategoriaVeiculo, TipoTracao } from '@/contracts/setup.interface';

export interface CarData {
  nome: string;
  categoria: CategoriaVeiculo;
  tracao: TipoTracao;
  fabricante: string;
}

export const CARS: CarData[] = [
  // Gr.4
  { nome: "Audi TT Cup '16", categoria: 'Gr.4', tracao: 'FF', fabricante: 'Audi' },
  { nome: 'Alfa Romeo 4C Gr.4', categoria: 'Gr.4', tracao: 'MR', fabricante: 'Alfa Romeo' },
  { nome: 'BMW M4 Gr.4', categoria: 'Gr.4', tracao: 'FR', fabricante: 'BMW' },
  { nome: 'Ferrari 458 Italia Gr.4', categoria: 'Gr.4', tracao: 'MR', fabricante: 'Ferrari' },
  { nome: 'Ford Mustang Gr.4', categoria: 'Gr.4', tracao: 'FR', fabricante: 'Ford' },
  { nome: 'Honda NSX Gr.4', categoria: 'Gr.4', tracao: 'MR', fabricante: 'Honda' },
  { nome: 'Lamborghini Huracán Gr.4', categoria: 'Gr.4', tracao: 'AWD', fabricante: 'Lamborghini' },
  { nome: 'Mazda Atenza Gr.4', categoria: 'Gr.4', tracao: 'FR', fabricante: 'Mazda' },
  { nome: 'Nissan GT-R Gr.4', categoria: 'Gr.4', tracao: 'AWD', fabricante: 'Nissan' },
  { nome: 'Subaru WRX Gr.4', categoria: 'Gr.4', tracao: 'AWD', fabricante: 'Subaru' },
  { nome: 'TOYOTA 86 Gr.4', categoria: 'Gr.4', tracao: 'FR', fabricante: 'Toyota' },
  { nome: 'Porsche Cayman GT4 Clubsport \'16', categoria: 'Gr.4', tracao: 'MR', fabricante: 'Porsche' },

  // Gr.3
  { nome: "Mercedes-AMG GT3 '20", categoria: 'Gr.3', tracao: 'FR', fabricante: 'Mercedes' },
  { nome: "Ferrari 296 GT3 '23", categoria: 'Gr.3', tracao: 'MR', fabricante: 'Ferrari' },
  { nome: "Porsche 911 GT3 R (992) '22", categoria: 'Gr.3', tracao: 'MR', fabricante: 'Porsche' },
  { nome: "Audi R8 LMS Evo '19", categoria: 'Gr.3', tracao: 'AWD', fabricante: 'Audi' },
  { nome: "BMW M6 GT3 Endurance Model '16", categoria: 'Gr.3', tracao: 'FR', fabricante: 'BMW' },
  { nome: "Lamborghini Huracán GT3 '15", categoria: 'Gr.3', tracao: 'AWD', fabricante: 'Lamborghini' },
  { nome: 'MAZDA RX-VISION GT3 CONCEPT', categoria: 'Gr.3', tracao: 'FR', fabricante: 'Mazda' },
  { nome: "McLaren 650S GT3 '15", categoria: 'Gr.3', tracao: 'MR', fabricante: 'McLaren' },
  { nome: "Nissan GT-R NISMO GT3 '18", categoria: 'Gr.3', tracao: 'FR', fabricante: 'Nissan' },
  { nome: "Ford GT Race Car '18", categoria: 'Gr.3', tracao: 'MR', fabricante: 'Ford' },

  // Gr.2
  { nome: "Audi RS 5 Turbo DTM '19", categoria: 'Gr.2', tracao: 'FR', fabricante: 'Audi' },
  { nome: "Honda NSX CONCEPT-GT '16", categoria: 'Gr.2', tracao: 'MR', fabricante: 'Honda' },
  { nome: "Nissan GT-R NISMO GT500 '16", categoria: 'Gr.2', tracao: 'FR', fabricante: 'Nissan' },
  { nome: "Lexus RC F GT500 '16", categoria: 'Gr.2', tracao: 'FR', fabricante: 'Lexus' },

  // Gr.1
  { nome: "Mazda 787B '91", categoria: 'Gr.1', tracao: 'MR', fabricante: 'Mazda' },
  { nome: "Porsche 919 Hybrid '16", categoria: 'Gr.1', tracao: 'AWD', fabricante: 'Porsche' },
  { nome: "Audi R18 '16", categoria: 'Gr.1', tracao: 'AWD', fabricante: 'Audi' },
  { nome: "TOYOTA GR010 HYBRID '21", categoria: 'Gr.1', tracao: 'AWD', fabricante: 'Toyota' },
  { nome: "Toyota TS050 - Hybrid '16", categoria: 'Gr.1', tracao: 'AWD', fabricante: 'Toyota' },
  { nome: "Jaguar XJR-9 '88", categoria: 'Gr.1', tracao: 'MR', fabricante: 'Jaguar' },

  // Gr.B
  { nome: "Lancia Delta HF Integrale Rally Car '92", categoria: 'Gr.B', tracao: 'AWD', fabricante: 'Lancia' },
  { nome: "Peugeot 205 Turbo 16 Evolution 2 '86", categoria: 'Gr.B', tracao: 'AWD', fabricante: 'Peugeot' },
  { nome: 'Ford Focus Gr.B Rally Car', categoria: 'Gr.B', tracao: 'AWD', fabricante: 'Ford' },
  { nome: "Subaru Impreza Rally Car '98", categoria: 'Gr.B', tracao: 'AWD', fabricante: 'Subaru' },
  { nome: "Audi Sport quattro S1 Pikes Peak '87", categoria: 'Gr.B', tracao: 'AWD', fabricante: 'Audi' },
];

export const CATEGORIES = [
  { id: 'Gr.4', label: 'Gr.4', desc: 'GT4 / Touring' },
  { id: 'Gr.3', label: 'Gr.3', desc: 'GT3 / GTE' },
  { id: 'Gr.2', label: 'Gr.2', desc: 'GT500 / DTM' },
  { id: 'Gr.1', label: 'Gr.1', desc: 'LMP / Group C' },
  { id: 'Gr.B', label: 'Gr.B', desc: 'Rally / Group B' },
] as const;

export const DRIVETRAINS = [
  { id: 'FF', label: 'FF', desc: 'Front Engine / Front Drive' },
  { id: 'FR', label: 'FR', desc: 'Front Engine / Rear Drive' },
  { id: 'MR', label: 'MR', desc: 'Mid Engine / Rear Drive' },
  { id: 'AWD', label: 'AWD', desc: 'All-Wheel Drive' },
  { id: '4WD', label: '4WD', desc: 'Four-Wheel Drive' },
] as const;
