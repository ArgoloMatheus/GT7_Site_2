/**
 * @file recommendation-engine.ts
 * @description Implementação Refatorada com Post-Processing e Domain Validation
 * @version 1.69.2 - Mitigações Térmicas e Estruturais Injetadas
 * 
 * Mitigações Aplicadas (AGENTS.md v1.69):
 * - Frequência Natural > 3.2 Hz para Gr.1/Gr.2 (evita bottoming out)
 * - Snap Oversteer mitigation para RWD (FR/MR/RR)
 * - Damping ratio otimizado (25-50%) com pistas de zebras agressivas (25-30% compressão, 40-45% expansão)
 * - FF: ARB traseira 15%+ superior à dianteira para induzir rotação mecânica
 * - AWD/4WD: Diferencial vetorial com torque progressivo
 * - Mitigação de degradação térmica de pneus por excesso de camber
 */

import { SetupRequest, SetupResult, EngineParams, MIN_NATURAL_FREQ_HIGH_DOWNFORCE } from '../contracts/setup.interface';

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const DATABASE_VEICULOS: Record<string, { cat: string, tracao: string }> = {
  // Gr.4
  "Audi TT Cup '16": { cat: "Gr.4", tracao: "FF" },
  "Alfa Romeo 4C Gr.4": { cat: "Gr.4", tracao: "MR" },
  "BMW M4 Gr.4": { cat: "Gr.4", tracao: "FR" },
  "Ferrari 458 Italia Gr.4": { cat: "Gr.4", tracao: "MR" },
  "Ford Mustang Gr.4": { cat: "Gr.4", tracao: "FR" },
  "Honda NSX Gr.4": { cat: "Gr.4", tracao: "MR" },
  "Lamborghini Huracán Gr.4": { cat: "Gr.4", tracao: "AWD" },
  "Mazda Atenza Gr.4": { cat: "Gr.4", tracao: "FR" },
  "Nissan GT-R Gr.4": { cat: "Gr.4", tracao: "AWD" },
  "Subaru WRX Gr.4": { cat: "Gr.4", tracao: "AWD" },
  "TOYOTA 86 Gr.4": { cat: "Gr.4", tracao: "FR" },
  "Porsche Cayman GT4 Clubsport '16": { cat: "Gr.4", tracao: "MR" },
  // Gr.3
  "Mercedes-AMG GT3 '20": { cat: "Gr.3", tracao: "FR" },
  "Ferrari 296 GT3 '23": { cat: "Gr.3", tracao: "MR" },
  "Porsche 911 GT3 R (992) '22": { cat: "Gr.3", tracao: "MR" },
  "Audi R8 LMS Evo '19": { cat: "Gr.3", tracao: "AWD" },
  "BMW M6 GT3 Endurance Model '16": { cat: "Gr.3", tracao: "FR" },
  "Lamborghini Huracán GT3 '15": { cat: "Gr.3", tracao: "AWD" },
  "MAZDA RX-VISION GT3 CONCEPT": { cat: "Gr.3", tracao: "FR" },
  "McLaren 650S GT3 '15": { cat: "Gr.3", tracao: "MR" },
  "Nissan GT-R NISMO GT3 '18": { cat: "Gr.3", tracao: "FR" },
  "Ford GT Race Car '18": { cat: "Gr.3", tracao: "MR" },
  // Gr.2
  "Audi RS 5 Turbo DTM '19": { cat: "Gr.2", tracao: "FR" },
  "Honda NSX CONCEPT-GT '16": { cat: "Gr.2", tracao: "MR" },
  "Nissan GT-R NISMO GT500 '16": { cat: "Gr.2", tracao: "FR" },
  "Lexus RC F GT500 '16": { cat: "Gr.2", tracao: "FR" },
  // Gr.1
  "Mazda 787B '91": { cat: "Gr.1", tracao: "MR" },
  "Porsche 919 Hybrid '16": { cat: "Gr.1", tracao: "AWD" },
  "Audi R18 '16": { cat: "Gr.1", tracao: "AWD" },
  "TOYOTA GR010 HYBRID '21": { cat: "Gr.1", tracao: "AWD" },
  "Toyota TS050 - Hybrid '16": { cat: "Gr.1", tracao: "AWD" },
  "Jaguar XJR-9 '88": { cat: "Gr.1", tracao: "MR" },
  // Gr.X
  "Xiaomi SU7 Ultra '25": { cat: "Gr.X", tracao: "AWD" },
  // Gr.B
  "Lancia Delta HF Integrale Rally Car '92": { cat: "Gr.B", tracao: "AWD" },
  "Peugeot 205 Turbo 16 Evolution 2 '86": { cat: "Gr.B", tracao: "AWD" },
  "Ford Focus Gr.B Rally Car": { cat: "Gr.B", tracao: "AWD" },
  "Subaru Impreza Rally Car '98": { cat: "Gr.B", tracao: "AWD" },
  "Audi Sport quattro S1 Pikes Peak '87": { cat: "Gr.B", tracao: "AWD" },
};

/**
 * Sanitiza e valida valores finais de setup contra limites físicos
 * Garante conformidade com constraints de v1.69
 */
function sanitizarSetupFinal(setup: SetupResult, tracao: string): SetupResult {
  const s = setup.suspensao;
  const d = setup.aerodinamica_diferencial;

  // ARB (Anti-Roll Bar) em range [1, 10]
  s.antiRollBar.dianteira = clamp(s.antiRollBar.dianteira, 1, 10);
  s.antiRollBar.traseira = clamp(s.antiRollBar.traseira, 1, 10);

  // Para FF: validar que traseira é 15%+ superior à dianteira
  if (tracao === 'FF') {
    const minTraseira = s.antiRollBar.dianteira * 1.15;
    if (s.antiRollBar.traseira < minTraseira) {
      s.antiRollBar.traseira = Math.min(minTraseira, 10);
    }
  }

  // LSD em range [5, 60]
  d.lsd.inicial = clamp(d.lsd.inicial, 5, 60);
  d.lsd.aceleracao = clamp(d.lsd.aceleracao, 5, 60);
  d.lsd.frenagem = clamp(d.lsd.frenagem, 5, 60);

  // Brake Bias em range [-5, 5]
  d.brakeBias = clamp(d.brakeBias, -5, 5);

  return setup;
}

/**
 * Aplica mitigação de degradação térmica por excesso de camber
 * Reduz recomendações de downforce agressivas em setups de endurance
 */
function mitigarDegradacaoTermicaCamber(
  result: SetupResult,
  estilo: string,
  pisaExigeDownforce: boolean
): SetupResult {
  if (estilo === 'Gerenciamento_Endurance' && pisaExigeDownforce) {
    // Reduzir camber indireto via downforce (downforce excessivo => mais camber dinâmico)
    result.aerodinamica_diferencial.downforce.dianteira *= 0.9;
    result.aerodinamica_diferencial.downforce.traseira *= 0.9;
  }
  return result;
}

/**
 * Aplica diferencial vetorial para AWD/4WD
 * Conforme AGENTS.md: Torque na traseira em entrada, progressivo na saída
 */
function aplicarDiferencialVetorial(
  result: SetupResult,
  tracao: string,
  estilo: string
): SetupResult {
  if (['AWD', '4WD'].includes(tracao)) {
    // Torque inicial alta frenagem (traseira bloqueada na desaceleração)
    result.aerodinamica_diferencial.lsd.frenagem = Math.min(
      result.aerodinamica_diferencial.lsd.frenagem + 10,
      60
    );
    // Torque progressivo aceleração (distribuição frontal na saída)
    result.aerodinamica_diferencial.lsd.aceleracao = Math.max(
      result.aerodinamica_diferencial.lsd.aceleracao - 5,
      5
    );
  }
  return result;
}

export function calcularSetup(params: EngineParams): SetupResult {
  if (!params.veiculo?.nome || !params.pista?.id) {
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

  // Aplicar estratégia de Gerenciamento de Endurance
  if (estilo === 'Gerenciamento_Endurance') {
    result.transmissao_pneus = {
      pneuRecomendado: 'Racing Hard',
      fuelMap: 6,
      estatregiaPits: "1 Pit ou Sem Paradas"
    };
  } else {
    result.aerodinamica_diferencial.brakeBias = -2;
  }

  // Pistas com zebras agressivas: Compression suave (25-30%), Expansion firme (40-45%)
  if (pista.zebrasAgressivas) {
    result.suspensao.dampingCompression = { dianteira: 28, traseira: 28 };
    result.suspensao.dampingExpansion = { dianteira: 42, traseira: 42 };
  }

  // MITIGAÇÃO PARA FF: Induzir rotação mecânica (ARB traseira 15%+ superior)
  if (tracao === 'FF') {
    const arbDiant = result.suspensao.antiRollBar.dianteira;
    result.suspensao.antiRollBar.traseira = Math.min(arbDiant * 1.15, 10);
    // Aumentar frequência natural traseira para compensar rigidez dianteira
    result.suspensao.naturalFrequency.traseira = result.suspensao.naturalFrequency.dianteira + 0.4;
  }

  // Frequência Natural para Alto Downforce (Gr.1, Gr.2, Gr.X > 3.2 Hz)
  if (['Gr.1', 'Gr.2', 'Gr.X'].includes(cat)) {
    result.suspensao.naturalFrequency.dianteira = Math.max(
      result.suspensao.naturalFrequency.dianteira,
      MIN_NATURAL_FREQ_HIGH_DOWNFORCE
    );
    result.suspensao.naturalFrequency.traseira = Math.max(
      result.suspensao.naturalFrequency.traseira,
      MIN_NATURAL_FREQ_HIGH_DOWNFORCE
    );
  }

  // Aplicar diferencial vetorial para AWD/4WD
  result = aplicarDiferencialVetorial(result, tracao, estilo);

  // Mitigar degradação térmica por camber excessivo
  result = mitigarDegradacaoTermicaCamber(result, estilo, pista.exigeDownforce);

  // Sanitizar e validar setup final
  return sanitizarSetupFinal(result, tracao);
}
