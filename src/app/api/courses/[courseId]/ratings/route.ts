import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = await req.json();
    const { rating, comment } = body;

    // Verifica se o usuário está matriculado no curso
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        courseId: params.courseId,
      },
    });

    if (!enrollment) {
      return new NextResponse('Usuário não matriculado neste curso', {
        status: 403,
      });
    }

    // Verifica se o usuário já avaliou o curso
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: session.user.id,
        courseId: params.courseId,
      },
    });

    if (existingRating) {
      return new NextResponse('Usuário já avaliou este curso', {
        status: 400,
      });
    }

    // Cria a avaliação
    const newRating = await prisma.rating.create({
      data: {
        userId: session.user.id,
        courseId: params.courseId,
        rating,
        comment,
      },
    });

    return NextResponse.json(newRating);
  } catch (error) {
    console.error('[COURSE_RATING]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        courseId: params.courseId,
      },
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

    return NextResponse.json(ratings);
  } catch (error) {
    console.error('[COURSE_RATINGS]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}
