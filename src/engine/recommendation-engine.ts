/**
 * @file recommendation-engine.ts
 * @description Implementação Refatorada com Post-Processing e Domain Validation
 * @version 1.69.1
 */

import { SetupRequest, SetupResult, MIN_NATURAL_FREQ_HIGH_DOWNFORCE } from '../contracts/setup.interface';

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const DATABASE_VEICULOS: Record<string, { cat: string, tracao: string }> = {
  "Audi TT Cup '16": { cat: "Gr.4", tracao: "FF" },
  "Mercedes-AMG GT3 '20": { cat: "Gr.3", tracao: "FR" },
  "Mazda 787B '91": { cat: "Gr.1", tracao: "MR" },
  "Ferrari 296 GT3 '23": { cat: "Gr.3", tracao: "MR" },
  "Porsche 911 GT3 R (992) '22": { cat: "Gr.3", tracao: "MR" }
};

function sanitizarSetupFinal(setup: SetupResult): SetupResult {
  const s = setup.suspensao;
  const d = setup.aerodinamica_diferencial;

  s.antiRollBar.dianteira = clamp(s.antiRollBar.dianteira, 1, 10);
  s.antiRollBar.traseira = clamp(s.antiRollBar.traseira, 1, 10);
  d.lsd.inicial = clamp(d.lsd.inicial, 5, 60);
  d.lsd.frenagem = clamp(d.lsd.frenagem, 5, 60);
  d.brakeBias = clamp(d.brakeBias, -5, 5);

  return setup;
}

export function calcularSetup(params: SetupRequest): SetupResult {
  if (!params.veiculo?.nome || !params.pista?.nome) {
    throw new Error("ERRO_SEGURANCA: Payload de entrada incompleto.");
  }

  const veiculoReal = DATABASE_VEICULOS[params.veiculo.nome];
  if (!veiculoReal) {
    throw new Error(`ERRO_DOMINIO: Veículo '${params.veiculo.nome}' não homologado.`);
  }

  const { cat, tracao } = veiculoReal;
  const { pista, estilo } = params;

  let result: SetupResult = {
    metadata: { versaoFisica: "1.69", timestamp: new Date().toISOString(), scoreConfianca: 1.0 },
    transmissao_pneus: { pneuRecomendado: 'Racing Medium', fuelMap: 1, estatregiaPits: "Padrão" },
    suspensao: {
      naturalFrequency: { dianteira: 2.5, traseira: 2.5 },
      antiRollBar: { dianteira: 5, traseira: 5 },
      dampingCompression: { dianteira: 35, traseira: 35 },
      dampingExpansion: { dianteira: 45, traseira: 45 }
    },
    aerodinamica_diferencial: {
      downforce: { dianteira: 300, traseira: 500 },
      lsd: { inicial: 10, aceleracao: 25, frenagem: 15 },
      brakeBias: 0
    }
  };

  if (estilo === 'Gerenciamento_Endurance') {
    result.transmissao_pneus = {
      pneuRecomendado: 'Racing Hard',
      fuelMap: 6,
      estatregiaPits: "1 Pit ou Sem Paradas"
    };
  } else {
    result.aerodinamica_diferencial.brakeBias = -2;
  }

  if (pista.caracteristicas.zebrasAgressivas) {
    result.suspensao.dampingCompression = { dianteira: 28, traseira: 28 };
    result.suspensao.dampingExpansion = { dianteira: 42, traseira: 42 };
  }

  if (tracao === 'FF') {
    result.suspensao.antiRollBar.traseira = result.suspensao.antiRollBar.dianteira + 2; 
    result.suspensao.naturalFrequency.traseira = result.suspensao.naturalFrequency.dianteira + 0.3;
  }

  if (['Gr.1', 'Gr.2'].includes(cat)) {
    result.suspensao.naturalFrequency.dianteira = Math.max(result.suspensao.naturalFrequency.dianteira, MIN_NATURAL_FREQ_HIGH_DOWNFORCE);
    result.suspensao.naturalFrequency.traseira = Math.max(result.suspensao.naturalFrequency.traseira, MIN_NATURAL_FREQ_HIGH_DOWNFORCE);
  }

  return sanitizarSetupFinal(result);
}
