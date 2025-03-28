import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    // Busca o progresso do usuário no curso
    const progress = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
        courseId: params.courseId,
      },
      select: {
        lessonId: true,
        completed: true,
      },
    });

    // Calcula o progresso total
    const totalLessons = await prisma.lesson.count({
      where: {
        courseId: params.courseId,
        published: true,
      },
    });

    const completedLessons = progress.filter(p => p.completed).length;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return NextResponse.json({
      totalLessons,
      completedLessons,
      percentage,
      progress,
    });
  } catch (error) {
    console.error('[COURSE_PROGRESS]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = await req.json();
    const { lessonId, completed } = body;

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
        id: lessonId,
        courseId: params.courseId,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())lesson) {
      return new NextResponse('Aula não encontrada', { status: 404 });
    }

    // Atualiza o progresso
    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      create: {
        userId: session.user.id,
        lessonId,
        courseId: params.courseId,
        completed,
      },
      update: {
        completed,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('[COURSE_PROGRESS]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}