import { NextRequest, NextResponse } from 'next/server';
import { SetupRequestSchema, VALID_STYLES } from './setup.schema';
import { calcularSetup } from '../engine/recommendation-engine';
import { EstiloPilotagem } from '../contracts/setup.interface';

/**
 * SetupController - Controlador de API para Recomendações de Setup GT7
 * @author Senior Backend Engineer
 * @description Implementa validação estrita, cláusulas de guarda e tratamento de erros centralizado.
 */
export class SetupController {
  
  /**
   * POST /api/setup
   * Processa a solicitação de setup e retorna a recomendação otimizada.
   */
  static async handleRequest(req: NextRequest): Promise<NextResponse> {
    try {
      // 1. Extração segura do payload
      const body = await req.json();

      // 2. Validação Estrita com Zod (Camada 1: Estrutura e Enums Básicos)
      const parseResult = SetupRequestSchema.safeParse(body);
      
      if (!parseResult.success) {
        return NextResponse.json({
          status: "error",
          code: "INVALID_PAYLOAD",
          details: parseResult.error.format()
        }, { status: 400 });
      }

      const { veiculo, pista, estilo } = parseResult.data;

      // 3. Cláusula de Guarda (Guard Clause) para Estilo de Pilotagem (Camada 2: Regra de Negócio Específica)
      if (!VALID_STYLES.includes(estilo as any)) {
        return NextResponse.json({
          status: "error",
          code: "INVALID_DRIVING_STYLE",
          message: `O estilo '${estilo}' não é suportado pelo motor v1.69.`
        }, { status: 400 });
      }

      // 4. Invocação do Serviço (Padrão RORO: Receive an Object, Return an Object)
      const recommendation = calcularSetup({
        veiculo,
        pista: {
          nome: pista.id,
          regiao: "GT7_OFFICIAL",
          caracteristicas: {
            zebrasAgressivas: pista.zebrasAgressivas ?? false,
            exigeDownforce: pista.exigeDownforce ?? false,
          }
        },
        estilo: estilo as EstiloPilotagem
      });

      // 5. Retorno de Sucesso
      return NextResponse.json({
        status: "success",
        data: recommendation
      });

    } catch (error: any) {
      // 6. Tratamento de Erros Centralizado (Security First)
      // Logamos o erro internamente para debug, mas NUNCA expomos para o cliente.
      console.error(`[SetupController] Critical Failure: ${error.message}`);

      return NextResponse.json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Ocorreu um erro interno ao processar seu setup. Tente novamente mais tarde."
      }, { status: 500 });
    }
  }
}

// Exportação compatível com Next.js Route Handlers
export const POST = SetupController.handleRequest;
