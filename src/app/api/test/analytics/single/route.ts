import { NextResponse } from 'next/server';
import { rastrearVisualizacaoCurso } from '@/lib/tracking';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const evento = await rastrearVisualizacaoCurso('curso_teste_123', 'usuario_teste_456');

    return NextResponse.json({
      success: true,
      message: 'Evento de visualização registrado com sucesso',
      evento,
    });
  } catch (erro: unknown) {
    logger.error('Erro ao registrar visualização:', {
      message: erro.message,
      name: erro.name,
      code: erro.code,
      stack: erro.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          message: erro.message,
          name: erro.name,
          code: erro.code,
        },
      },
      { status: 500 }
    );
  }
}
