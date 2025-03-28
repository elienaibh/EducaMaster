import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const achievements = await prisma.userAchievement.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        achievement: true,
      },
      orderBy: {
        unlockedAt: 'desc',
      },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('[USER_ACHIEVEMENTS]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = await req.json();
    const { achievementId } = body;

    if (!achievementId) {
      return new NextResponse('ID da conquista é obrigatório', { status: 400 });
    }

    // Verifica se o usuário já tem essa conquista
    const existingAchievement = await prisma.userAchievement.findFirst({
      where: {
        userId: session.user.id,
        achievementId,
      },
    });

    if (existingAchievement) {
      return new NextResponse('Usuário já possui esta conquista', { status: 400 });
    }

    // Cria a nova conquista para o usuário
    const achievement = await prisma.userAchievement.create({
      data: {
        userId: session.user.id,
        achievementId,
        unlockedAt: new Date(),
      },
      include: {
        achievement: true,
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('[USER_ACHIEVEMENT_CREATE]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}
