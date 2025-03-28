import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface TimeAnalyticsRequest {
  path: string;
  timeSpent: number;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const body = (await request.json()) as TimeAnalyticsRequest;
    const { path, timeSpent, timestamp } = body;

    if (!path || typeof timeSpent !== 'number' || !timestamp) {
      return new NextResponse('Dados inválidos', { status: 400 });
    }

    const evento = await prisma.eventoAnalytics.create({
      data: {
        userId: session.user.id,
        tipo: 'TIME_SPENT',
        dados: {
          path,
          timeSpent,
          timestamp,
        } as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ success: true, evento });
  } catch (error) {
    console.error('Erro ao registrar tempo:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
