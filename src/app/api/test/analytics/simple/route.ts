import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const evento = await prisma.$queryRaw`
      INSERT INTO eventos_analytics (id, tipo, usuario_id, dados, timestamp, created_at, updated_at)
      VALUES (
        gen_random_uuid(),
        'teste_simples',
        'teste_123',
        '{"mensagem": "Teste de conexão"}'::jsonb,
        NOW(),
        NOW(),
        NOW()
      )
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      evento,
    });
  } catch (erro: unknown) {
    logger.error('Erro ao criar evento:', {
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
