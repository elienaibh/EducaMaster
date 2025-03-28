import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { path, elementId, elementText, timestamp } = await request.json();

    await prisma.eventoAnalytics.create({
      data: {
        tipo: 'CLICK',
        dados: {
          path,
          elementId,
          elementText,
          timestamp,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
