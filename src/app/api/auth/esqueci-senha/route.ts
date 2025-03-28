import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())email) {
      return NextResponse.json({ message: 'Email não fornecido' }, { status: 400 });
    }

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user) {
      // Retorna sucesso mesmo se o usuário não existir para evitar enumeração
      return NextResponse.json(
        { message: 'Se o email existir, você receberá as instruções de recuperação' },
        { status: 200 }
      );
    }

    // Envia email de recuperação
    await sendPasswordResetEmail(email);

    return NextResponse.json(
      { message: 'Se o email existir, você receberá as instruções de recuperação' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar recuperação de senha:', error);
    return NextResponse.json(
      { message: 'Erro ao processar recuperação de senha' },
      { status: 500 }
    );
  }
}