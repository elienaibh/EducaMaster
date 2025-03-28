import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { path, timestamp } = await request.json();

    await prisma.eventoAnalytics.create({
      data: {
        tipo: 'PAGE_VIEW',
        dados: {
          path,
          timestamp,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar visualização:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
