import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())token || !password) {
      return NextResponse.json({ message: 'Token e senha são obrigatórios' }, { status: 400 });
    }

    // Busca o token de redefinição
    const resetToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())resetToken) {
      return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 400 });
    }

    // Verifica se o token expirou
    if (resetToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token },
      });

      return NextResponse.json({ message: 'Token expirado' }, { status: 400 });
    }

    // Atualiza a senha do usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: resetToken.identifier },
      data: { password: hashedPassword },
    });

    // Remove o token usado
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: 'Senha redefinida com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    return NextResponse.json({ message: 'Erro ao redefinir senha' }, { status: 500 });
  }
}