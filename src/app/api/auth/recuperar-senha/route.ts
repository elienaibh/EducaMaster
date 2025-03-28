import { NextResponse } from 'next/server';
import { generateToken, hashToken, generateExpirationDate } from '@/utils/token';
import { sendPasswordResetEmail } from '@/services/email';

// TODO: Substituir por banco de dados real
const mockTokens = new Map<string, { email: string; expiresAt: Date }>();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // TODO: Verificar se o email existe no banco de dados
    // Por enquanto, vamos assumir que o email existe

    // Gerar token de recuperação
    const token = generateToken();
    const hashedToken = hashToken(token);
    const expiresAt = generateExpirationDate();

    // Salvar token (temporariamente em memória)
    mockTokens.set(hashedToken, {
      email,
      expiresAt,
    });

    // Enviar email com link de recuperação
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({
      success: true,
      message:
        'Se o email estiver cadastrado, você receberá as instruções para recuperação de senha.',
    });
  } catch (error) {
    console.error('Erro ao processar recuperação de senha:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
      },
      { status: 500 }
    );
  }
}
