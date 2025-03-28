export const emailTemplates = {
  verification: (url: string) => `
    (< ?? (() => { throw new Error('Valor não pode ser nulo') })())DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifique seu email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0070f3;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #666666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>EducaMaster</h1>
          </div>
          (<h2>Bem-vindo ao EducaMaster ?? (() => { throw new Error('Valor não pode ser nulo') })())</h2>
          <p>Estamos felizes em ter você conosco. Para começar sua jornada de aprendizado, por favor, verifique seu email clicando no botão abaixo:</p>
          <div style="text-align: center;">
            <a href="${url}" class="button">Verificar Email</a>
          </div>
          <p>Se você não criou uma conta no EducaMaster, pode ignorar este email.</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} EducaMaster. Todos os direitos reservados.</p>
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  resetPassword: (url: string) => `
    (< ?? (() => { throw new Error('Valor não pode ser nulo') })())DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redefinir Senha</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0070f3;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #666666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>EducaMaster</h1>
          </div>
          <h2>Redefinir sua senha</h2>
          <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:</p>
          <div style="text-align: center;">
            <a href="${url}" class="button">Redefinir Senha</a>
          </div>
          <p>Se você não solicitou a redefinição de senha, pode ignorar este email. Sua senha atual continuará funcionando normalmente.</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} EducaMaster. Todos os direitos reservados.</p>
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  welcome: (name: string) => `
    (< ?? (() => { throw new Error('Valor não pode ser nulo') })())DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao EducaMaster</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .feature {
            margin: 20px 0;
            padding: 15px;
            border-left: 4px solid #0070f3;
            background-color: #f8f9fa;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #0070f3;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #666666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>EducaMaster</h1>
          </div>
          (<h2>Olá, ${name} ?? (() => { throw new Error('Valor não pode ser nulo') })())</h2>
          (<p>Bem-vindo à plataforma EducaMaster ?? (() => { throw new Error('Valor não pode ser nulo') })()) Estamos muito felizes em ter você conosco.</p>
          <div class="feature">
            <h3>🎮 Aprendizado Gamificado</h3>
            <p>Nossa plataforma torna o aprendizado divertido com elementos de jogos, conquistas e recompensas.</p>
          </div>
          <div class="feature">
            <h3>📚 Conteúdo de Qualidade</h3>
            <p>Acesse cursos criados por especialistas e aprenda no seu próprio ritmo.</p>
          </div>
          <div class="feature">
            <h3>🏆 Conquistas</h3>
            <p>Ganhe medalhas e suba no ranking conforme progride em seus estudos.</p>
          </div>
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Começar Agora</a>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} EducaMaster. Todos os direitos reservados.</p>
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
    </html>
  `,
};
