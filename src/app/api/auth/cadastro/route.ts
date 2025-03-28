import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validações básicas
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())name || !email || !password) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'A senha deve ter no mínimo 6 caracteres' },
        { status: 400 }
      );
    }

    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Este email já está cadastrado' }, { status: 400 });
    }

    // Cria o usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: false,
      },
    });

    // Envia email de verificação
    await sendVerificationEmail(email);

    return NextResponse.json(
      { message: 'Conta criada com sucesso! Verifique seu email.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return NextResponse.json({ message: 'Erro ao criar conta' }, { status: 500 });
  }
}