import { prisma } from '@/lib/prisma';
import { logger } from './logger';

export type EventoAnalytics = {
  id: string;
  tipo: string;
  usuarioId?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
};

export async function rastrearEvento(evento: Omit<EventoAnalytics, 'id' | 'createdAt'>) {
  try {
    await prisma.$queryRaw`
      INSERT INTO eventos_analytics (id, tipo, usuario_id, metadata, timestamp, created_at, updated_at)
      VALUES (
        gen_random_uuid(),
        ${evento.tipo},
        ${evento.usuarioId},
        ${JSON.stringify(evento.metadata)}::jsonb,
        NOW(),
        NOW(),
        NOW()
      )
    `;
  } catch (error) {
    logger.error(
      'Erro ao rastrear evento:',
      error instanceof Error ? error : new Error('Erro desconhecido')
    );
    logger.info('Detalhes do evento:', { evento });
    throw new Error('Falha ao registrar evento de analytics');
  }
}

// Eventos predefinidos
export const EVENTOS = {
  VISUALIZACAO_CURSO: 'visualizacao_curso',
  INICIO_AULA: 'inicio_aula',
  CONCLUSAO_AULA: 'conclusao_aula',
  CONCLUSAO_CURSO: 'conclusao_curso',
  INSCRICAO_CURSO: 'inscricao_curso',
  AVALIACAO_CURSO: 'avaliacao_curso',
  BUSCA_REALIZADA: 'busca_realizada',
  DOWNLOAD_CERTIFICADO: 'download_certificado',
  COMPARTILHAMENTO: 'compartilhamento',
  ERRO_SISTEMA: 'erro_sistema',
} as const;

// Funções de rastreamento específicas
export async function rastrearVisualizacaoCurso(cursoId: string, usuarioId?: string) {
  await rastrearEvento({
    tipo: EVENTOS.VISUALIZACAO_CURSO,
    usuarioId,
    metadata: { cursoId },
  });
}

export async function rastrearInicioAula(lessonId: string, courseId: string, usuarioId: string) {
  await rastrearEvento({
    tipo: EVENTOS.INICIO_AULA,
    usuarioId,
    metadata: { lessonId, courseId },
  });
}

export async function rastrearConclusaoAula(lessonId: string, courseId: string, usuarioId: string) {
  await rastrearEvento({
    tipo: EVENTOS.CONCLUSAO_AULA,
    usuarioId,
    metadata: { lessonId, courseId },
  });
}

export async function rastrearConclusaoCurso(courseId: string, usuarioId: string) {
  await rastrearEvento({
    tipo: EVENTOS.CONCLUSAO_CURSO,
    usuarioId,
    metadata: { courseId },
  });
}

export async function rastrearInscricaoCurso(courseId: string, usuarioId: string, valor: number) {
  await rastrearEvento({
    tipo: EVENTOS.INSCRICAO_CURSO,
    usuarioId,
    metadata: { courseId, valor },
  });
}

export async function rastrearAvaliacaoCurso(courseId: string, usuarioId: string, nota: number) {
  await rastrearEvento({
    tipo: EVENTOS.AVALIACAO_CURSO,
    usuarioId,
    metadata: { courseId, nota },
  });
}

export async function rastrearBusca(termo: string, resultados: number, usuarioId?: string) {
  await rastrearEvento({
    tipo: EVENTOS.BUSCA_REALIZADA,
    usuarioId,
    metadata: { termo, resultados },
  });
}

export async function rastrearDownloadCertificado(certificadoId: string, usuarioId: string) {
  await rastrearEvento({
    tipo: EVENTOS.DOWNLOAD_CERTIFICADO,
    usuarioId,
    metadata: { certificadoId },
  });
}

export async function rastrearCompartilhamento(
  tipo: 'curso' | 'certificado' | 'conquista',
  itemId: string,
  plataforma: string,
  usuarioId?: string
) {
  await rastrearEvento({
    tipo: EVENTOS.COMPARTILHAMENTO,
    usuarioId,
    metadata: { tipo, itemId, plataforma },
  });
}

export async function rastrearErro(mensagem: string, stack?: string, usuarioId?: string) {
  await rastrearEvento({
    tipo: EVENTOS.ERRO_SISTEMA,
    usuarioId,
    metadata: { mensagem, stack },
  });
}

interface TrackingEvent extends Record<string, unknown> {
  type: string;
  userId?: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export class TrackingService {
  private static events: TrackingEvent[] = [];

  static async saveEvent(event: EventoAnalytics): Promise<void> {
    try {
      await prisma.eventoAnalytics.create({
        data: event,
      });
    } catch (error) {
      logger.error(
        'Erro ao salvar evento:',
        error instanceof Error ? error : new Error('Erro desconhecido')
      );
    }
  }

  static track(type: string, userId?: string, metadata: Record<string, unknown> = {}): void {
    const event: TrackingEvent = {
      type,
      userId,
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);
    logger.info('Event tracked:', { ...event });
  }

  static getEvents(): TrackingEvent[] {
    return this.events;
  }

  static clearEvents(): void {
    this.events = [];
  }
}
