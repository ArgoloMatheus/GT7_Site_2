import { NextRequest, NextResponse } from 'next/server';
import { SetupRequestSchema } from './setup.schema';
import { calcularSetup } from '../engine/recommendation-engine';
import { EstiloPilotagem, EngineParams } from '../contracts/setup.interface';
import { TRACKS } from '../data/tracks';

/**
 * SetupController - Controlador de API para Recomendações de Setup GT7
 */
export class SetupController {
  
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
          tracao: veiculo.tracao
        },
        pista: {
          id: trackData.id,
          nome: trackData.nome,
          zebrasAgressivas: trackData.zebrasAgressivas,
          exigeDownforce: trackData.exigeDownforce,
        },
        estilo: estilo as EstiloPilotagem
      };

      const recommendation = calcularSetup(params);

      return NextResponse.json({
        status: "success",
        data: recommendation
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
