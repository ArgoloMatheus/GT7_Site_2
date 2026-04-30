/**
 * @file recommendation.test.ts
 * @description Suite de testes unitários para o Motor de Recomendação GT7
 * @version 1.69
 */

import { describe, it, expect } from 'vitest';
import { calcularSetup } from './recommendation-engine';
import { SetupRequest } from '../contracts/setup.interface';

describe('GT7 Recommendation Engine - Categories Gr.3 & Gr.4', () => {
  
  describe('FF Rotation Logic (Audi TT Cup \'16 - Gr.4)', () => {
    it('should recommend ARB Rear > 15% higher than Front for FF vehicles in Aggressive style', () => {
      const request: SetupRequest = {
        veiculo: { nome: "Audi TT Cup '16", categoria: 'Gr.4', tracao: 'FF' },
        pista: { 
          nome: "Dragon Trail", 
          regiao: "Europa", 
          caracteristicas: { zebrasAgressivas: true, exigeDownforce: false } 
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
      const request: SetupRequest = {
        veiculo: { nome: "Mercedes-AMG GT3 '20", categoria: 'Gr.3', tracao: 'FR' },
        pista: { 
          nome: "Sardegna Road Track", 
          regiao: "Europa", 
          caracteristicas: { zebrasAgressivas: false, exigeDownforce: true } 
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
      const request: SetupRequest = {
        veiculo: { nome: "Mazda 787B '91", categoria: 'Gr.1', tracao: 'MR' },
        pista: { 
          nome: "Circuit de la Sarthe", 
          regiao: "Europa", 
          caracteristicas: { zebrasAgressivas: false, exigeDownforce: true } 
        },
        estilo: 'Agressivo'
      };

      const result = calcularSetup(request);

      expect(result.suspensao.naturalFrequency.dianteira).toBeGreaterThanOrEqual(3.2);
      expect(result.suspensao.naturalFrequency.traseira).toBeGreaterThanOrEqual(3.2);
    });

    it('should provide smooth damping for tracks with aggressive kerbs (Monza)', () => {
      const request: SetupRequest = {
        veiculo: { nome: "Ferrari 296 GT3 '23", categoria: 'Gr.3', tracao: 'MR' },
        pista: { 
          nome: "Autodromo Nazionale Monza", 
          regiao: "Europa", 
          caracteristicas: { zebrasAgressivas: true, exigeDownforce: false } 
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
