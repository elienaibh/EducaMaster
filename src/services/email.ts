import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/redefinir-senha?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
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
  });
}
