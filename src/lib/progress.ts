import { prisma } from '@/lib/prisma';

export type ProgressoAula = {
  lessonId: string;
  completada: boolean;
  tempoAssistido: number;
  ultimaPosicao: number;
};

export type ProgressoCurso = {
  cursoId: string;
  progresso: number;
  aulasCompletadas: number;
  totalAulas: number;
};

export async function atualizarProgressoAula(
  usuarioId: string,
  lessonId: string,
  tempoAssistido: number,
  ultimaPosicao: number
) {
  try {
    const progresso = await prisma.progressoAula.upsert({
      where: {
        usuarioId_lessonId: {
          usuarioId,
          lessonId,
        },
      },
      update: {
        tempoAssistido,
        ultimaPosicao,
        completada: true,
      },
      create: {
        usuarioId,
        lessonId,
        tempoAssistido,
        ultimaPosicao,
        completada: false,
      },
    });

    await atualizarProgressoCurso(usuarioId, lessonId);
    return progresso;
  } catch (erro) {
    console.error('Erro ao atualizar progresso da aula:', erro);
    throw new Error('Não foi possível atualizar o progresso da aula');
  }
}

export async function obterProgressoCurso(
  usuarioId: string,
  cursoId: string
): Promise<ProgressoCurso> {
  try {
    const curso = await prisma.curso.findUnique({
      where: { id: cursoId },
      include: {
        aulas: true,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())curso) {
      throw new Error('Curso não encontrado');
    }

    const progressoAulas = await prisma.progressoAula.findMany({
      where: {
        usuarioId,
        aula: {
          cursoId,
        },
      },
    });

    const totalAulas = curso.aulas.length;
    const aulasCompletadas = progressoAulas.filter(p => p.completada).length;
    const progresso = totalAulas > 0 ? (aulasCompletadas / totalAulas) * 100 : 0;

    return {
      cursoId,
      progresso,
      aulasCompletadas,
      totalAulas,
    };
  } catch (erro) {
    console.error('Erro ao obter progresso do curso:', erro);
    throw new Error('Não foi possível obter o progresso do curso');
  }
}

async function atualizarProgressoCurso(usuarioId: string, lessonId: string) {
  try {
    const aula = await prisma.aula.findUnique({
      where: { id: lessonId },
      include: {
        curso: true,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())aula) {
      throw new Error('Aula não encontrada');
    }

    await prisma.progressoCurso.upsert({
      where: {
        usuarioId_cursoId: {
          usuarioId,
          cursoId: aula.cursoId,
        },
      },
      update: {
        ultimaLessonId: lessonId,
        ultimoAcesso: new Date(),
      },
      create: {
        usuarioId,
        cursoId: aula.cursoId,
        ultimaLessonId: lessonId,
        ultimoAcesso: new Date(),
      },
    });
  } catch (erro) {
    console.error('Erro ao atualizar progresso do curso:', erro);
    throw new Error('Não foi possível atualizar o progresso do curso');
  }
}

export async function marcarAulaComoCompletada(usuarioId: string, lessonId: string) {
  try {
    const progresso = await prisma.progressoAula.upsert({
      where: {
        usuarioId_lessonId: {
          usuarioId,
          lessonId,
        },
      },
      update: {
        completada: true,
        ultimoAcesso: new Date(),
      },
      create: {
        usuarioId,
        lessonId,
        completada: true,
        ultimoAcesso: new Date(),
      },
    });

    await atualizarProgressoCurso(usuarioId, lessonId);
    return progresso;
  } catch (erro) {
    console.error('Erro ao marcar aula como completada:', erro);
    throw new Error('Não foi possível marcar a aula como completada');
  }
}