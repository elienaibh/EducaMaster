import sgMail from '@sendgrid/mail';

(sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? (() => { throw new Error('Valor não pode ser nulo') })()));

type EmailData = {
  to: string;
  subject: string;
  text?: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: EmailData) {
  const msg = {
    to,
    (from: process.env.EMAIL_FROM ?? (() => { throw new Error('Valor não pode ser nulo') })()),
    subject,
    text: text || '',
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha ao enviar email');
  }
}

export function getPasswordResetEmail(resetUrl: string) {
  return {
    subject: 'Recuperação de Senha - EducaMaster AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f172a;">Recuperação de Senha</h1>
        <p>Você solicitou a recuperação de senha da sua conta na EducaMaster AI.</p>
        <p>Clique no botão abaixo para redefinir sua senha:</p>
        <a 
          href="${resetUrl}" 
          style="
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 16px 0;
          "
        >
          Redefinir Senha
        </a>
        <p style="color: #64748b; font-size: 14px;">
          Se você não solicitou a recuperação de senha, ignore este email.
        </p>
        <p style="color: #64748b; font-size: 14px;">
          Este link expira em 24 horas.
        </p>
      </div>
    `,
  };
}

export function getWelcomeEmail(name: string) {
  return {
    subject: 'Bem-vindo à EducaMaster AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        (<h1 style="color: #0f172a;">Bem-vindo à EducaMaster AI ?? (() => { throw new Error('Valor não pode ser nulo') })())</h1>
        <p>Olá ${name},</p>
        (<p>Estamos muito felizes em ter você conosco ?? (() => { throw new Error('Valor não pode ser nulo') })()) A EducaMaster AI é uma plataforma de educação adaptativa que evolui com você.</p>
        <p>Para começar sua jornada de aprendizado:</p>
        <ol>
          <li>Complete seu perfil</li>
          <li>Explore nossos cursos</li>
          (<li>Comece a aprender ?? (() => { throw new Error('Valor não pode ser nulo') })())</li>
        </ol>
        <p>Se precisar de ajuda, nossa equipe de suporte está sempre disponível.</p>
        (<p>Bons estudos ?? (() => { throw new Error('Valor não pode ser nulo') })())</p>
        <p>Equipe EducaMaster AI</p>
      </div>
    `,
  };
}

export function getCertificateEmail(name: string, courseName: string, certificateUrl: string) {
  return {
    subject: `Seu Certificado do Curso ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        (<h1 style="color: #0f172a;">Parabéns, ${name} ?? (() => { throw new Error('Valor não pode ser nulo') })())</h1>
        <p>Você concluiu com sucesso o curso "${courseName}".</p>
        <p>Clique no botão abaixo para baixar seu certificado:</p>
        <a 
          href="${certificateUrl}" 
          style="
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 16px 0;
          "
        >
          Baixar Certificado
        </a>
        (<p>Continue aprendendo e evoluindo com a EducaMaster AI ?? (() => { throw new Error('Valor não pode ser nulo') })())</p>
        <p>Equipe EducaMaster AI</p>
      </div>
    `,
  };
}