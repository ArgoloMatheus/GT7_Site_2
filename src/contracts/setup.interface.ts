/**
 * GT7 Setup Advisor - Core Contracts (v1.69)
 */

export type CategoriaVeiculo = 'Gr.4' | 'Gr.3' | 'Gr.2' | 'Gr.1' | 'Gr.B';
export type TipoTracao = 'FF' | 'FR' | 'MR' | 'AWD' | '4WD';
export type EstiloPilotagem = 'Agressivo' | 'Equilibrado' | 'Gerenciamento_Endurance';

export interface Veiculo {
  nome: string;
  categoria: CategoriaVeiculo;
  tracao: TipoTracao;
}

// Payload de entrada da API (conforme contrato do usuário)
export interface SetupRequest {
  veiculo: Veiculo;
  pista: { id: string };
  estilo: EstiloPilotagem;
}

// Objeto interno para o motor de recomendação
export interface EngineParams {
  veiculo: Veiculo;
  pista: {
    id: string;
    nome: string;
    zebrasAgressivas: boolean;
    exigeDownforce: boolean;
  };
  estilo: EstiloPilotagem;
}

export interface SetupResult {
  metadata: {
    versaoFisica: string;
    timestamp: string;
    scoreConfianca: number;
  };
  
  transmissao_pneus: {
    pneuRecomendado: 'Racing Hard' | 'Racing Medium' | 'Racing Soft' | 'Sports Soft';
    fuelMap: 1 | 2 | 3 | 4 | 5 | 6;
    estatregiaPits: string;
  };

  suspensao: {
    naturalFrequency: { dianteira: number; traseira: number };
    antiRollBar: { dianteira: number; traseira: number };
    dampingCompression: { dianteira: number; traseira: number };
    dampingExpansion: { dianteira: number; traseira: number };
  };

  aerodinamica_diferencial: {
    downforce: { dianteira: number; traseira: number };
    lsd: { inicial: number; aceleracao: number; frenagem: number };
    brakeBias: number;
  };
}

export const MIN_NATURAL_FREQ_HIGH_DOWNFORCE = 3.2;
