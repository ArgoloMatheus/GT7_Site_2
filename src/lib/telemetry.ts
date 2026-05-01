import pino from 'pino';
import { NextRequest, NextResponse } from 'next/server';

// Inicialização do Logger Pino de alta performance
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export interface TelemetrySetupPayload {
  track: string;
  category: string;
  vehicle: string;
  drivingStyle: string;
}

/**
 * Middleware de telemetria para interceptar requisições de configuração (Setup)
 * Registra dados de entrada (Pista, Categoria, Veículo, Estilo) e o tempo de execução.
 * Padrão RORO (Receive an Object, Return an Object) para handlers de API Next.js.
 */
export async function withTelemetry(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const startTime = performance.now();
  const requestId = crypto.randomUUID();

  // Extrair e estruturar payload, se aplicável, sem travar a request principal
  let setupData: Partial<TelemetrySetupPayload> = {};
  
  try {
    // Clonamos o request para poder ler o body sem consumir a stream do request original
    const clonedReq = req.clone();
    if (clonedReq.method === 'POST' || clonedReq.method === 'PUT') {
      const body = await clonedReq.json();
      setupData = {
        track: body.track,
        category: body.category,
        vehicle: body.vehicle,
        drivingStyle: body.drivingStyle,
      };
    }
  } catch (error) {
    // Se não for possível fazer parse, ignora de forma segura
  }

  logger.info({
    event: 'setup_request_started',
    requestId,
    method: req.method,
    url: req.nextUrl.pathname,
    setupData: Object.keys(setupData).length > 0 ? setupData : undefined,
  }, 'Processando solicitação de configuração de Setup');

  try {
    // Processamento da request
    const response = await handler(req);
    
    const durationMs = performance.now() - startTime;
    
    logger.info({
      event: 'setup_request_completed',
      requestId,
      status: response.status,
      latencyMs: Number(durationMs.toFixed(2)),
    }, 'Solicitação processada com sucesso');

    return response;
  } catch (error) {
    const durationMs = performance.now() - startTime;
    
    logger.error({
      event: 'setup_request_failed',
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      latencyMs: Number(durationMs.toFixed(2)),
    }, 'Falha ao processar solicitação de configuração');

    // Propagar o erro para os handlers centralizados da API
    throw error;
  }
}
