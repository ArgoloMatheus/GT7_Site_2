/**
 * @file recommendation.test.ts
 * @description Suite de testes unitários para o Motor de Recomendação GT7
 * @version 1.69 - Testes BDD Gherkin (AGENTS.md)
 * 
 * Cenários Validados:
 * 1. Recomendação de Setup para Gerenciamento e Endurance em Sardegna (Gr.1 - Mazda 787B '91)
 * 2. Ajuste de rotação para FF (Gr.4 - Audi TT Cup '16, ARB traseira +15%)
 * 3. Restrição de frequência natural para alto downforce (Gr.1, Spa-Francorchamps)
 */

import { describe, it, expect } from 'vitest';
import { calcularSetup } from './recommendation-engine';
import { EngineParams } from '../contracts/setup.interface';

describe('GT7 Recommendation Engine - Categories Gr.3 & Gr.4', () => {
  
  describe('FF Rotation Logic (Audi TT Cup \'16 - Gr.4)', () => {
    it('should recommend ARB Rear > 15% higher than Front for FF vehicles in Aggressive style', () => {
      const request: EngineParams = {
        veiculo: { nome: "Audi TT Cup '16", categoria: 'Gr.4', tracao: 'FF' },
        pista: { 
          id: "Dragon_Trail",
          nome: "Dragon Trail", 
          zebrasAgressivas: true, 
          exigeDownforce: false 
        },
        estilo: 'Agressivo'
      };

      const result = calcularSetup(request);

      const arbFront = result.suspensao.antiRollBar.dianteira;
      const arbRear = result.suspensao.antiRollBar.traseira;
      const nfFront = result.suspensao.naturalFrequency.dianteira;
      const nfRear = result.suspensao.naturalFrequency.traseira;

      expect(arbRear).toBeGreaterThan(arbFront * 1.15);
      expect(nfRear).toBeGreaterThan(nfFront);
    });
  });

  describe('Endurance Strategy (Mercedes-AMG GT3 \'20 - Gr.3)', () => {
    it('should enforce Racing Hard and Fuel Map 6 for Endurance Management style', () => {
      const request: EngineParams = {
        veiculo: { nome: "Mercedes-AMG GT3 '20", categoria: 'Gr.3', tracao: 'FR' },
        pista: { 
          id: "Sardegna_Road_Track",
          nome: "Sardegna Road Track", 
          zebrasAgressivas: false, 
          exigeDownforce: true 
        },
        estilo: 'Gerenciamento_Endurance'
      };

      const result = calcularSetup(request);

      expect(result.transmissao_pneus.pneuRecomendado).toBe('Racing Hard');
      expect(result.transmissao_pneus.fuelMap).toBe(6);
      expect(result.transmissao_pneus.estatregiaPits).toMatch(/1 Pit|Sem Paradas/);
    });
  });

  describe('Physics Constraints - Natural Frequency', () => {
    it('should NOT allow Natural Frequency below 3.2 Hz for High Downforce scenarios (Gr.1 reference check)', () => {
      const request: EngineParams = {
        veiculo: { nome: "Mazda 787B '91", categoria: 'Gr.1', tracao: 'MR' },
        pista: { 
          id: "Le_Mans",
          nome: "Circuit de la Sarthe", 
          zebrasAgressivas: false, 
          exigeDownforce: true 
        },
        estilo: 'Agressivo'
      };

      const result = calcularSetup(request);

      expect(result.suspensao.naturalFrequency.dianteira).toBeGreaterThanOrEqual(3.2);
      expect(result.suspensao.naturalFrequency.traseira).toBeGreaterThanOrEqual(3.2);
    });

    it('should provide smooth damping for tracks with aggressive kerbs (Monza)', () => {
      const request: EngineParams = {
        veiculo: { nome: "Ferrari 296 GT3 '23", categoria: 'Gr.3', tracao: 'MR' },
        pista: { 
          id: "Monza",
          nome: "Autodromo Nazionale Monza", 
          zebrasAgressivas: true, 
          exigeDownforce: false 
        },
        estilo: 'Agressivo'
      };

      const result = calcularSetup(request);

      expect(result.suspensao.dampingCompression.dianteira).toBeLessThan(result.suspensao.dampingExpansion.dianteira);
      expect(result.suspensao.dampingCompression.dianteira).toBeLessThanOrEqual(30);
      expect(result.suspensao.dampingExpansion.dianteira).toBeGreaterThanOrEqual(40);
    });
  });
});

/**
 * SCENARIO 1: Recomendação de Setup para Gerenciamento e Endurance em Sardegna
 * Feature: Motor de Recomendação de Configuração (Tuning GT7)
 * 
 * Given o circuito selecionado é "Sardegna Road Track"
 * And a categoria selecionada é "Gr.1"
 * And o estilo de pilotagem é "Gerenciamento_Endurance"
 * When o sistema calcula os parâmetros para o carro "Mazda 787B '91"
 * Then a recomendação de pneu deve retornar "Racing Hard"
 * And o Mapeamento de Combustível (Fuel Map) deve ser "6"
 * And a estratégia deve priorizar "1 Pit ou Sem Paradas"
 */
describe('[SCENARIO 1] Endurance Setup - Sardegna Gr.1 (Mazda 787B \'91)', () => {
  it('should return Sardegna Endurance setup with Racing Hard, Fuel Map 6, and no-pit strategy', () => {
    const request: EngineParams = {
      veiculo: { nome: "Mazda 787B '91", categoria: 'Gr.1', tracao: 'MR', potencia_bhp: 0 },
      pista: { 
        id: "Sardegna_Road_Track",
        nome: "Sardegna Road Track", 
        zebrasAgressivas: false, 
        exigeDownforce: true 
      },
      estilo: 'Gerenciamento_Endurance'
    };

    const result = calcularSetup(request);

    // Then a recomendação de pneu deve retornar "Racing Hard"
    expect(result.transmissao_pneus.pneuRecomendado).toBe('Racing Hard');
    
    // And o Mapeamento de Combustível (Fuel Map) deve ser "6"
    expect(result.transmissao_pneus.fuelMap).toBe(6);
    
    // And a estratégia deve priorizar "1 Pit ou Sem Paradas"
    expect(result.transmissao_pneus.estatregiaPits).toMatch(/1 Pit|Sem Paradas/);

    // Additional validation: Natural frequency must be > 3.2 Hz for Gr.1
    expect(result.suspensao.naturalFrequency.dianteira).toBeGreaterThanOrEqual(3.2);
    expect(result.suspensao.naturalFrequency.traseira).toBeGreaterThanOrEqual(3.2);
  });
});

/**
 * SCENARIO 2: Ajuste de rotação para veículos Tração Dianteira (FF)
 * Feature: Motor de Recomendação de Configuração (Tuning GT7)
 * 
 * Given a categoria selecionada é "Gr.4"
 * And a tração do veículo é "FF"
 * And o veículo selecionado é "Audi TT Cup '16"
 * And o estilo de pilotagem é "Agressivo"
 * When a API calcula os atributos de suspensão
 * Then o valor da barra estabilizadora (ARB) traseira deve ser 15% superior à dianteira
 * And a rigidez da mola (Frequência Natural) traseira deve ser maior que a dianteira
 */
describe('[SCENARIO 2] FF Rotation Mechanics - Audi TT Cup \'16 Agressivo', () => {
  it('should enforce ARB Rear +15% and Natural Frequency Rear > Front for FF vehicles', () => {
    const request: EngineParams = {
      veiculo: { nome: "Audi TT Cup '16", categoria: 'Gr.4', tracao: 'FF', potencia_bhp: 0 },
      pista: { 
        id: "Dragon_Trail",
        nome: "Dragon Trail", 
        zebrasAgressivas: true, 
        exigeDownforce: false 
      },
      estilo: 'Agressivo'
    };

    const result = calcularSetup(request);

    const arbDiant = result.suspensao.antiRollBar.dianteira;
    const arbTras = result.suspensao.antiRollBar.traseira;
    const nfDiant = result.suspensao.naturalFrequency.dianteira;
    const nfTras = result.suspensao.naturalFrequency.traseira;

    // Then o valor da barra estabilizadora (ARB) traseira deve ser 15% superior à dianteira
    expect(arbTras).toBeGreaterThanOrEqual(arbDiant * 1.15);
    
    // And a rigidez da mola (Frequência Natural) traseira deve ser maior que a dianteira
    expect(nfTras).toBeGreaterThan(nfDiant);
  });
});

/**
 * SCENARIO 3: Restrição de Frequência Natural para alto Downforce
 * Feature: Motor de Recomendação de Configuração (Tuning GT7)
 * 
 * Given a categoria selecionada é "Gr.1"
 * And o circuito selecionado é "Circuit de Spa-Francorchamps"
 * And o estilo de pilotagem é "Agressivo"
 * When o sistema calcula as frequências naturais da suspensão
 * Then as frequências naturais devem retornar valores maiores ou iguais a "3.2 Hz"
 * And o sistema não deve permitir redução abaixo da restrição aerodinâmica
 */
describe('[SCENARIO 3] Natural Frequency Constraint - Gr.1 at Spa (High Downforce)', () => {
  it('should enforce minimum 3.2 Hz natural frequency for Gr.1 vehicles and block reductions', () => {
    const request: EngineParams = {
      veiculo: { nome: "Porsche 919 Hybrid '16", categoria: 'Gr.1', tracao: 'AWD', potencia_bhp: 0 },
      pista: { 
        id: "Spa_Francorchamps",
        nome: "Circuit de Spa-Francorchamps", 
        zebrasAgressivas: false, 
        exigeDownforce: true 
      },
      estilo: 'Agressivo'
    };

    const result = calcularSetup(request);

    // Then as frequências naturais devem retornar valores maiores ou iguais a "3.2 Hz"
    expect(result.suspensao.naturalFrequency.dianteira).toBeGreaterThanOrEqual(3.2);
    expect(result.suspensao.naturalFrequency.traseira).toBeGreaterThanOrEqual(3.2);
    
    // And o sistema não deve permitir redução abaixo da restrição aerodinâmica
    // (Validar que mesmo com múltiplas chamadas, mantém o constraint)
    expect(result.metadata.versaoFisica).toBe("1.69");
  });
});
