import nodemailer from 'nodemailer';
import { emailTemplates } from './email-templates';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verifique seu email - EducaMaster',
      html: emailTemplates.verification(verificationUrl),
    });

    logger.info('Verification email sent', { email });
  } catch (error: unknown) {
    logger.error('Failed to send verification email', {
      error: error instanceof Error ? error.message : String(error),
      email,
    });
    throw new Error('Failed to send verification email');
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Redefinir senha - EducaMaster',
      html: emailTemplates.resetPassword(resetUrl),
    });

    logger.info('Password reset email sent', { email });
  } catch (error: unknown) {
    logger.error('Failed to send password reset email', {
      error: error instanceof Error ? error.message : String(error),
      email,
    });
    throw new Error('Failed to send password reset email');
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Bem-vindo ao EducaMaster!',
      html: emailTemplates.welcome(name),
    });

    logger.info('Welcome email sent', { email });
  } catch (error: unknown) {
    logger.error('Failed to send welcome email', {
      error: error instanceof Error ? error.message : String(error),
      email,
    });
    throw new Error('Failed to send welcome email');
  }
}

// Função para verificar a configuração do email
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error: unknown) {
    logger.error('Email configuration verification failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}
