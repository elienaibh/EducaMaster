import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { lessonId: string } }) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        lessonId: params.lessonId,
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

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return NextResponse.json({ error: 'Erro ao buscar comentários' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { lessonId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { content } = await request.json();

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())content?.trim()) {
      return NextResponse.json({ error: 'Conteúdo do comentário é obrigatório' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        lessonId: params.lessonId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return NextResponse.json({ error: 'Erro ao criar comentário' }, { status: 500 });
  }
}