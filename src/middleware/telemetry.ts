import pino from 'pino';
import { NextRequest, NextResponse } from 'next/server';

// Configuração do Logger Estruturado (JSON)
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Middleware para auditoria de requisições de Setup do GT7
export async function telemetryMiddleware(req: NextRequest) {
  const startTime = Date.now();
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();
  const latency = Date.now() - startTime;

  // Intercepta e loga exclusivamente as requisições ao motor de cálculo
  if (pathname.startsWith('/api/setup')) {
    logger.info({
      event: 'SETUP_REQUEST',
      path: pathname,
      method: req.method,
      latencyMs: latency,
      status: response.status,
      // Nota: Em produção, IDs de usuário/sessão seriam injetados aqui
    });
  }

  return response;
}