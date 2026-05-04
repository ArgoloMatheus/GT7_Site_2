import { NextRequest, NextResponse } from 'next/server';
import { SetupRequestSchema } from './setup.schema';
import { calcularSetup } from '../engine/recommendation-engine';
import { EstiloPilotagem, EngineParams, SetupResult } from '../contracts/setup.interface';
import { TRACKS } from '../data/tracks';

/**
 * SetupController - Controlador de API para Recomendações de Setup GT7 (v1.69)
 * 
 * Mitigações Injetadas:
 * 1. Bloqueio de exploits de transmissão (PP manipulation)
 * 2. Processamento de Snap Oversteer para RWD (FR, MR, RR)
 * 3. Validação de frequência natural para alto downforce
 * 4. Constraints de aerodinâmica e térmicos por categoria
 */
export class SetupController {

  /**
   * Detecta tentativas de explorar a transmissão para contornar limites de PP
   * Segundo AGENTS.md v1.69: "escalonamento de marchas não afeta mais o cálculo de PP"
   */
  private static validarExploitTransmissao(veiculo: any): boolean {
    if (!veiculo.parametros_transmissao) {
      return true; // Permitir se não há parametros
    }

    // Bloquear qualquer tentativa de manipular gearing para contornar PP
    const transmissaoObj = veiculo.parametros_transmissao;
    if (typeof transmissaoObj === 'object' && Object.keys(transmissaoObj).length > 0) {
      console.warn(`[SECURITY] Exploit de transmissão detectado para ${veiculo.nome}`);
      return false;
    }
    return true;
  }

  /**
   * Aplica mitigação de Snap Oversteer para veículos RWD
   * Conforme AGENTS.md: MR exige LSD altamente bloqueado na desaceleração
   */
  private static aplicarMitigacaoSnapOversteer(
    recommendation: SetupResult,
    tracao: string,
    estilo: EstiloPilotagem
  ): SetupResult {
    if (['FR', 'MR', 'RR'].includes(tracao)) {
      // Aumentar damping de expansão para transição progressiva lateral
      recommendation.suspensao.dampingExpansion.dianteira = Math.min(
        recommendation.suspensao.dampingExpansion.dianteira + 5,
        50
      );
      recommendation.suspensao.dampingExpansion.traseira = Math.min(
        recommendation.suspensao.dampingExpansion.traseira + 8,
        50
      );

      // Para MR especificamente: bloqueio agressivo de LSD na frenagem
      if (tracao === 'MR') {
        recommendation.aerodinamica_diferencial.lsd.frenagem = Math.min(
          recommendation.aerodinamica_diferencial.lsd.frenagem + 15,
          60
        );
      }

      // Ajuste de brake bias frontal em estilos agressivos
      if (estilo === 'Agressivo') {
        recommendation.aerodinamica_diferencial.brakeBias = Math.max(
          recommendation.aerodinamica_diferencial.brakeBias - 2,
          -5
        );
      }
    }

    return recommendation;
  }

  /**
   * Valida e reforça constraints de frequência natural para categorias de alto downforce
   */
  private static validarFrequenciaNaturalHighDownforce(
    recommendation: SetupResult,
    categoria: string,
    pista: any
  ): SetupResult {
    const MIN_FREQ_THRESHOLD = 3.2;
    
    if (['Gr.1', 'Gr.2', 'Gr.X'].includes(categoria)) {
      if (recommendation.suspensao.naturalFrequency.dianteira < MIN_FREQ_THRESHOLD) {
        recommendation.suspensao.naturalFrequency.dianteira = MIN_FREQ_THRESHOLD;
      }
      if (recommendation.suspensao.naturalFrequency.traseira < MIN_FREQ_THRESHOLD) {
        recommendation.suspensao.naturalFrequency.traseira = MIN_FREQ_THRESHOLD;
      }
      recommendation.metadata.scoreConfianca = 0.95; // Restrição ativa
    }

    return recommendation;
  }

  /**
   * Processa constraints de aerodinâmica conforme categoria
   */
  private static aplicarConstraintsAerodinamicos(
    recommendation: SetupResult,
    categoria: string,
    estilo: EstiloPilotagem,
    pista: any
  ): SetupResult {
    // Regra de Agressividade: Downforce máximo
    if (estilo === 'Agressivo') {
      recommendation.aerodinamica_diferencial.downforce.dianteira = Math.max(
        recommendation.aerodinamica_diferencial.downforce.dianteira,
        350
      );
      recommendation.aerodinamica_diferencial.downforce.traseira = Math.max(
        recommendation.aerodinamica_diferencial.downforce.traseira,
        550
      );
    }

    // Para Gr.X (hipercarros elétricos): downforce compensatório
    if (categoria === 'Gr.X') {
      recommendation.aerodinamica_diferencial.downforce.dianteira = 450;
      recommendation.aerodinamica_diferencial.downforce.traseira = 650;
    }

    return recommendation;
  }

  /**
   * Aplicar pós-processamento de mitigação térmica e estrutural
   */
  private static aplicarPosProcessamentoTermico(
    recommendation: SetupResult,
    veiculo: any,
    pista: any,
    estilo: EstiloPilotagem
  ): SetupResult {
    // Mitigação térmica: Reduzir downforce em estratégias de endurance
    if (estilo === 'Gerenciamento_Endurance' && pista.exigeDownforce) {
      recommendation.aerodinamica_diferencial.downforce.dianteira = Math.max(
        recommendation.aerodinamica_diferencial.downforce.dianteira * 0.85,
        250
      );
      recommendation.aerodinamica_diferencial.downforce.traseira = Math.max(
        recommendation.aerodinamica_diferencial.downforce.traseira * 0.85,
        350
      );
    }

    // Validação: Garantir damping ratio dentro de limites (25-50%)
    const clampDamping = (val: number) => Math.min(Math.max(val, 25), 50);
    recommendation.suspensao.dampingCompression.dianteira = clampDamping(
      recommendation.suspensao.dampingCompression.dianteira
    );
    recommendation.suspensao.dampingCompression.traseira = clampDamping(
      recommendation.suspensao.dampingCompression.traseira
    );
    recommendation.suspensao.dampingExpansion.dianteira = clampDamping(
      recommendation.suspensao.dampingExpansion.dianteira
    );
    recommendation.suspensao.dampingExpansion.traseira = clampDamping(
      recommendation.suspensao.dampingExpansion.traseira
    );

    return recommendation;
  }

  static async handleRequest(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();

      const parseResult = SetupRequestSchema.safeParse(body);
      
      if (!parseResult.success) {
        return NextResponse.json({
          status: "error",
          code: "INVALID_PAYLOAD",
          details: parseResult.error.format()
        }, { status: 400 });
      }

      const { veiculo, pista: pistaInput, estilo } = parseResult.data;

      // SECURITY: Bloqueio de Exploit de Transmissão (v1.69)
      if (!SetupController.validarExploitTransmissao(veiculo)) {
        return NextResponse.json({
          status: "error",
          code: "EXPLOIT_ATTEMPT_BLOCKED",
          message: "Manipulação de marchas para redução de PP artificial não é permitida. Foco no equilíbrio mecânico."
        }, { status: 400 });
      }

      const trackData = TRACKS.find(t => t.id === pistaInput.id);
      
      if (!trackData) {
        return NextResponse.json({
          status: "error",
          code: "TRACK_NOT_FOUND",
          message: `A pista '${pistaInput.id}' não foi encontrada na base oficial.`
        }, { status: 404 });
      }

      const params: EngineParams = {
        veiculo: {
          nome: veiculo.nome,
          categoria: veiculo.categoria,
          tracao: veiculo.tracao,
          potencia_bhp: veiculo.potencia_bhp || 0
        },
        pista: {
          id: trackData.id,
          nome: trackData.nome,
          zebrasAgressivas: trackData.zebrasAgressivas,
          exigeDownforce: trackData.exigeDownforce,
        },
        estilo: estilo as EstiloPilotagem
      };

      // Calcular setup base
      let recommendation = calcularSetup(params);

      // INJEÇÃO DE MITIGAÇÕES (Constraint First Pattern)
      // 1. Snap Oversteer mitigation para RWD
      recommendation = SetupController.aplicarMitigacaoSnapOversteer(
        recommendation,
        veiculo.tracao,
        estilo as EstiloPilotagem
      );

      // 2. Validação de Frequência Natural para Alto Downforce
      recommendation = SetupController.validarFrequenciaNaturalHighDownforce(
        recommendation,
        veiculo.categoria,
        trackData
      );

      // 3. Constraints Aerodinâmicos por Categoria/Estilo
      recommendation = SetupController.aplicarConstraintsAerodinamicos(
        recommendation,
        veiculo.categoria,
        estilo as EstiloPilotagem,
        trackData
      );

      // 4. Pós-Processamento Térmico e Estrutural
      recommendation = SetupController.aplicarPosProcessamentoTermico(
        recommendation,
        veiculo,
        trackData,
        estilo as EstiloPilotagem
      );

      return NextResponse.json({
        status: "success",
        data: recommendation,
        metadata: {
          mitigacoesAplicadas: [
            "exploit_transmissao_bloqueado",
            "snap_oversteer_mitigado",
            "frequencia_natural_validada",
            "constraints_aerodinamicos",
            "posprocessamento_termico"
          ]
        }
      });

    } catch (error: any) {
      console.error(`[SetupController] Critical Failure: ${error.message}`);
      return NextResponse.json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Erro interno ao processar setup."
      }, { status: 500 });
    }
  }
}

export const POST = SetupController.handleRequest;
