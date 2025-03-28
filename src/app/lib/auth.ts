import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      (clientId: process.env.GOOGLE_CLIENT_ID ?? (() => { throw new Error('Valor não pode ser nulo') })()),
      (clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? (() => { throw new Error('Valor não pode ser nulo') })()),
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'USER',
        };
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())credentials?.email || !credentials?.password) {
          throw new Error('Credenciais inválidas');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user || !user.password) {
          throw new Error('Credenciais inválidas');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isValid) {
          throw new Error('Credenciais inválidas');
        }

        return {
          id: user.id,
          name: user.name || null,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/entrar',
    error: '/entrar',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};