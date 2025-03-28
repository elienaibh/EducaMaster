# EducaMaster

Plataforma de cursos online desenvolvida com Next.js, TypeScript, Tailwind CSS e Prisma.

## Tecnologias

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Pré-requisitos

- Node.js 18.x ou superior
- PostgreSQL 14.x ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/educamaster.git
cd educamaster
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Configure as variáveis no arquivo `.env` com suas credenciais.

5. Execute as migrações do banco de dados:

```bash
npm run prisma:migrate
# ou
yarn prisma:migrate
```

6. Gere o cliente Prisma:

```bash
npm run prisma:generate
# ou
yarn prisma:generate
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

## Testes

Para executar os testes:

```bash
npm test
# ou
yarn test
```

Para executar os testes em modo watch:

```bash
npm run test:watch
# ou
yarn test:watch
```

Para gerar relatório de cobertura:

```bash
npm run test:coverage
# ou
yarn test:coverage
```

## Build

Para criar uma build de produção:

```bash
npm run build
# ou
yarn build
```

Para iniciar o servidor de produção:

```bash
npm start
# ou
yarn start
```

## Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas da aplicação
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
├── hooks/                # Hooks personalizados
├── services/             # Serviços e APIs
├── types/                # Definições de tipos
└── utils/                # Funções utilitárias
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Email: seu-email@exemplo.com
- Website: [seu-site.com](https://seu-site.com)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-usuario)
