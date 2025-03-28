import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

export async function errorMiddleware(request: NextRequest) {
  const requestId = uuidv4();
  const startTime = Date.now();

  try {
    // Adicionar o requestId ao cabeçalho da resposta
    const response = await NextResponse.next();
    response.headers.set('X-Request-ID', requestId);

    // Log de sucesso
    const duration = Date.now() - startTime;
    logger.info('Requisição completada', {
      requestId,
      method: request.method,
      url: request.url,
      duration,
      status: response.status,
    });

    return response;
  } catch (error) {
    // Log de erro
    logger.error('Erro na requisição', error as Error, {
      requestId,
      method: request.method,
      url: request.url,
      duration: Date.now() - startTime,
    });

    // Retornar erro 500 para erros não tratados
    return new NextResponse(
      JSON.stringify({
        error: 'Erro interno do servidor',
        requestId,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': requestId,
        },
      }
    );
  }
}

// Middleware para API routes
export async function withErrorHandling(handler: Function) {
  return async (req: NextRequest) => {
    const requestId = uuidv4();
    const startTime = Date.now();

    try {
      const response = await handler(req);

      // Log de sucesso
      const duration = Date.now() - startTime;
      logger.info('API request completada', {
        requestId,
        method: req.method,
        url: req.url,
        duration,
        status: response.status,
      });

      response.headers.set('X-Request-ID', requestId);
      return response;
    } catch (error) {
      // Log de erro
      logger.error('Erro na API request', error as Error, {
        requestId,
        method: req.method,
        url: req.url,
        duration: Date.now() - startTime,
      });

      return new NextResponse(
        JSON.stringify({
          error: 'Erro interno do servidor',
          message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
          requestId,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': requestId,
          },
        }
      );
    }
  };
}
