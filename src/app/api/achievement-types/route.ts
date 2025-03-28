import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AchievementType, Prisma } from '@prisma/client';

interface AchievementCreateRequest {
  title: string;
  description: string;
  icon?: string;
  type: AchievementType;
  requirement: Prisma.JsonValue;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
}

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('[ACHIEVEMENTS]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = (await req.json()) as AchievementCreateRequest;
    const { title, description, icon, type, requirement, rarity } = body;

    if (!title || !description || !type || !rarity) {
      return new NextResponse('Título, descrição, tipo e raridade são obrigatórios', {
        status: 400,
      });
    }

    if (!Object.values(AchievementType).includes(type)) {
      return new NextResponse('Tipo de conquista inválido', { status: 400 });
    }

    const achievement = await prisma.achievement.create({
      data: {
        title,
        description,
        icon: icon || '🏆',
        type,
        requirement: requirement || {},
        rarity,
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('[ACHIEVEMENT_CREATE]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}
