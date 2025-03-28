import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())token) {
      return NextResponse.json({ message: 'Token não fornecido' }, { status: 400 });
    }

    // Busca o token de verificação
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())verificationToken) {
      return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 400 });
    }

    // Verifica se o token expirou
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token },
      });

      return NextResponse.json({ message: 'Token expirado' }, { status: 400 });
    }

    // Atualiza o usuário
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: true },
    });

    // Remove o token usado
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: 'Email verificado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return NextResponse.json({ message: 'Erro ao verificar email' }, { status: 500 });
  }
}