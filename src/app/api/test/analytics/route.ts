import { NextResponse } from 'next/server';
import {
  rastrearVisualizacaoCurso,
  rastrearInicioAula,
  rastrearConclusaoAula,
  rastrearBusca,
  rastrearErro,
} from '@/lib/tracking';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const eventos = await Promise.all([
      // Simulando visualização de curso
      rastrearVisualizacaoCurso('curso_teste_123', 'usuario_teste_456'),

      // Simulando início de aula
      rastrearInicioAula('aula_teste_789', 'curso_teste_123', 'usuario_teste_456'),

      // Simulando conclusão de aula
      rastrearConclusaoAula('aula_teste_789', 'curso_teste_123', 'usuario_teste_456'),

      // Simulando busca
      rastrearBusca('javascript avançado', 15, 'usuario_teste_456'),

      // Simulando erro
      rastrearErro('Teste de registro de erro', 'Error: Teste simulado', 'usuario_teste_456'),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Eventos de teste registrados com sucesso',
      eventos,
    });
  } catch (erro: unknown) {
    logger.error('Erro ao testar eventos:', {
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
