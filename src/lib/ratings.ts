import { prisma } from '@/lib/prisma';
import { Rating } from '@prisma/client';

export type DadosAvaliacao = {
  userId: string;
  courseId: string;
  rating: number;
  comment?: string;
};

export async function criarAvaliacao(dados: DadosAvaliacao): Promise<Rating> {
  try {
    // Verifica se o usuário já avaliou o curso
    const avaliacaoExistente = await prisma.rating.findFirst({
      where: {
        userId: dados.userId,
        courseId: dados.courseId,
      },
    });

    if (avaliacaoExistente) {
      throw new Error('Você já avaliou este curso');
    }

    // Verifica se o usuário está matriculado no curso
    const matricula = await prisma.enrollment.findFirst({
      where: {
        userId: dados.userId,
        courseId: dados.courseId,
      },
    });

    if (!matricula) {
      throw new Error('Você precisa estar matriculado no curso para avaliá-lo');
    }

    // Cria a avaliação
    const avaliacao = await prisma.rating.create({
      data: {
        userId: dados.userId,
        courseId: dados.courseId,
        rating: dados.rating,
        comment: dados.comment,
      },
    });

    // Atualiza a média do curso
    await atualizarMediaCurso(dados.courseId);

    return avaliacao;
  } catch (erro) {
    console.error('Erro ao criar avaliação:', erro);
    throw new Error('Não foi possível criar a avaliação');
  }
}

export async function atualizarAvaliacao(
  id: string,
  dados: Partial<DadosAvaliacao>
): Promise<Rating> {
  try {
    const avaliacao = await prisma.rating.update({
      where: { id },
      data: {
        rating: dados.rating,
        comment: dados.comment,
      },
    });

    // Atualiza a média do curso
    await atualizarMediaCurso(avaliacao.courseId);

    return avaliacao;
  } catch (erro) {
    console.error('Erro ao atualizar avaliação:', erro);
    throw new Error('Não foi possível atualizar a avaliação');
  }
}

export async function excluirAvaliacao(id: string): Promise<Rating> {
  try {
    const avaliacao = await prisma.rating.delete({
      where: { id },
    });

    // Atualiza a média do curso
    await atualizarMediaCurso(avaliacao.courseId);

    return avaliacao;
  } catch (erro) {
    console.error('Erro ao excluir avaliação:', erro);
    throw new Error('Não foi possível excluir a avaliação');
  }
}

export type AvaliacaoComUsuario = Rating & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export async function listarAvaliacoesCurso(courseId: string): Promise<AvaliacaoComUsuario[]> {
  try {
    const avaliacoes = await prisma.rating.findMany({
      where: { courseId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return avaliacoes;
  } catch (erro) {
    console.error('Erro ao listar avaliações:', erro);
    throw new Error('Não foi possível listar as avaliações');
  }
}

async function atualizarMediaCurso(courseId: string): Promise<void> {
  try {
    const avaliacoes = await prisma.rating.findMany({
      where: { courseId },
      select: { rating: true },
    });

    const media =
      avaliacoes.length === 0
        ? 0
        : avaliacoes.reduce((acc, curr) => acc + curr.rating, 0) / avaliacoes.length;

    await prisma.$executeRaw`
      UPDATE "Course"
      SET "averageRating" = ${media}
      WHERE id = ${courseId}
    `;
  } catch (erro) {
    console.error('Erro ao atualizar média do curso:', erro);
    throw new Error('Não foi possível atualizar a média do curso');
  }
}
