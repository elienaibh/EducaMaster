import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export class EmailService {
  // Enviar email de boas-vindas
  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const msg = {
      from: `"LatamTreasure" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: 'Bem-vindo ao LatamTreasure!',
      (text: `Olá ${name}, seja bem-vindo ao LatamTreasure ?? (() => { throw new Error('Valor não pode ser nulo') })()) Estamos muito felizes em ter você conosco.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          (<h1 style="color: #2563eb;">Bem-vindo ao LatamTreasure ?? (() => { throw new Error('Valor não pode ser nulo') })())</h1>
          <p>Olá ${name},</p>
          (<p>Estamos muito felizes em ter você conosco ?? (() => { throw new Error('Valor não pode ser nulo') })()) Com o LatamTreasure, você terá acesso a:</p>
          <ul>
            <li>Cursos de alta qualidade</li>
            <li>Sistema de conquistas</li>
            <li>Comunidade ativa</li>
            <li>Suporte personalizado</li>
          </ul>
          (<p>Comece sua jornada de aprendizado agora mesmo ?? (() => { throw new Error('Valor não pode ser nulo') })())</p>
          <a href="${process.env.NEXTAUTH_URL}/dashboard" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">
            Acessar Plataforma
          </a>
        </div>
      `,
    };

    await transporter.sendMail(msg);
  }

  // Enviar email de recuperação de senha
  static async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.NEXTAUTH_URL}/redefinir-senha?token=${token}`;

    const msg = {
      from: `"LatamTreasure" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: 'Redefinição de Senha - LatamTreasure',
      text: `Você solicitou a redefinição de senha. Acesse o link: ${resetUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Redefinição de Senha</h1>
          <p>Você solicitou a redefinição de sua senha no LatamTreasure.</p>
          <p>Clique no botão abaixo para criar uma nova senha:</p>
          <a href="${resetUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">
            Redefinir Senha
          </a>
          <p style="margin-top: 20px; color: #666;">
            Se você não solicitou esta redefinição, ignore este email.
          </p>
          <p style="color: #666;">
            Este link expira em 1 hora.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(msg);
  }

  // Enviar email de conclusão de curso
  static async sendCourseCompletionEmail(
    email: string,
    name: string,
    courseName: string
  ): Promise<void> {
    const msg = {
      from: `"LatamTreasure" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      (subject: `Parabéns ?? (() => { throw new Error('Valor não pode ser nulo') })()) Você completou o curso ${courseName}`,
      (text: `Parabéns ${name} ?? (() => { throw new Error('Valor não pode ser nulo') })()) Você completou o curso ${courseName}.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          (<h1 style="color: #2563eb;">🎉 Parabéns ?? (() => { throw new Error('Valor não pode ser nulo') })())</h1>
          <p>Olá ${name},</p>
          (<p>Você acaba de completar o curso <strong>${courseName}</strong> ?? (() => { throw new Error('Valor não pode ser nulo') })())</p>
          <p>Continue sua jornada de aprendizado explorando nossos outros cursos.</p>
          <a href="${process.env.NEXTAUTH_URL}/cursos" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">
            Explorar Mais Cursos
          </a>
        </div>
      `,
    };

    await transporter.sendMail(msg);
  }

  // Enviar email de nova conquista
  static async sendAchievementUnlockedEmail(
    email: string,
    name: string,
    achievementName: string
  ): Promise<void> {
    const msg = {
      from: `"LatamTreasure" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: `Nova Conquista Desbloqueada: ${achievementName}`,
      (text: `Parabéns ${name} ?? (() => { throw new Error('Valor não pode ser nulo') })()) Você desbloqueou a conquista ${achievementName}.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          (<h1 style="color: #2563eb;">🏆 Nova Conquista ?? (() => { throw new Error('Valor não pode ser nulo') })())</h1>
          <p>Olá ${name},</p>
          (<p>Você acaba de desbloquear a conquista <strong>${achievementName}</strong> ?? (() => { throw new Error('Valor não pode ser nulo') })())</p>
          <p>Continue se dedicando para desbloquear mais conquistas.</p>
          <a href="${process.env.NEXTAUTH_URL}/perfil/conquistas" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 20px;">
            Ver Minhas Conquistas
          </a>
        </div>
      `,
    };

    await transporter.sendMail(msg);
  }
}