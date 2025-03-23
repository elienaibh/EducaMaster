# EducaMaster AI

EducaMaster AI é uma plataforma de educação adaptativa que utiliza inteligência artificial para personalizar a experiência de aprendizado de cada estudante.

## Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Material UI
- Firebase (Auth, Firestore, Storage)
- NextAuth.js
- Stripe
- Zustand

## Requisitos

- Node.js 18.17 ou superior
- npm ou yarn
- Conta no Firebase
- Conta no Stripe
- Conta no Google Cloud (para OAuth)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/educamaster-ai.git
cd educamaster-ai
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Configure as variáveis de ambiente no arquivo `.env.local` com suas credenciais:
- Firebase
- Google OAuth
- Stripe
- NextAuth

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
src/
  ├── app/
  │   ├── components/    # Componentes reutilizáveis
  │   ├── config/       # Configurações (Firebase, Stripe, etc.)
  │   ├── contexts/     # Contextos do React
  │   ├── hooks/        # Hooks personalizados
  │   ├── pages/        # Páginas da aplicação
  │   ├── services/     # Serviços e APIs
  │   ├── styles/       # Estilos globais
  │   ├── types/        # Tipos TypeScript
  │   └── utils/        # Funções utilitárias
```

## Funcionalidades Principais

- Autenticação de usuários (email/senha, Google)
- Sistema de pagamentos e assinaturas
- Cursos adaptativos com IA
- Sistema de gamificação
- Certificados verificáveis
- Dashboard personalizado
- Análise de progresso
- Comunidade e recursos colaborativos

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Website: [educamaster.ai](https://educamaster.ai)
- Email: contato@educamaster.ai
- Twitter: [@educamasterai](https://twitter.com/educamasterai)
- LinkedIn: [EducaMaster AI](https://linkedin.com/company/educamaster-ai) 