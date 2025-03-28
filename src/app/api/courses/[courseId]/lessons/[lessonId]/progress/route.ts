import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    // Verifica se o usuário está matriculado no curso
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        courseId: params.courseId,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())enrollment) {
      return new NextResponse('Usuário não matriculado neste curso', {
        status: 403,
      });
    }

    // Verifica se a aula pertence ao curso
    const lesson = await prisma.lesson.findFirst({
      where: {
        id: params.lessonId,
        courseId: params.courseId,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())lesson) {
      return new NextResponse('Aula não encontrada', { status: 404 });
    }

    // Cria ou atualiza o progresso
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: params.lessonId,
        },
      },
      create: {
        userId: session.user.id,
        lessonId: params.lessonId,
        courseId: params.courseId,
        completed: true,
      },
      update: {
        completed: true,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('[LESSON_PROGRESS]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}