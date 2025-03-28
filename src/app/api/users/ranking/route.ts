import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RankingUser {
  id: string;
  name: string;
  image: string | null;
  points: number;
  position?: number;
}

export async function GET() {
  try {
    // Buscar todos os usuários com suas conquistas
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        achievements: {
          include: {
            achievement: {
              select: {
                id: true,
                title: true,
                description: true,
                icon: true,
                type: true,
                requirement: true,
                rarity: true,
              },
            },
          },
        },
      },
    });

    // Calcular pontos totais e criar array de ranking
    const ranking: RankingUser[] = users
      .map(user => {
        // Cada conquista vale 100 pontos
        const points = user.achievements.length * 100;
        return {
          id: user.id,
          name: user.name || 'Usuário Anônimo',
          image: user.image,
          points,
        };
      })
      // Ordenar por pontos (maior para menor)
      .sort((a, b) => b.points - a.points)
      // Adicionar posição no ranking
      .map((user, index) => ({
        ...user,
        position: index + 1,
      }))
      // Limitar aos top 10
      .slice(0, 10);

    return NextResponse.json(ranking);
  } catch (error) {
    console.error('[USER_RANKING]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}
