import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import { AuthService } from '../services/auth.service';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
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
      async authorize(credentials, req) {
        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())credentials?.email || !credentials?.password) {
          throw new Error('Credenciais inválidas');
        }

        try {
          const user = await AuthService.login({
            email: credentials.email,
            password: credentials.password,
          });

          (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user) return null;

          return {
            id: user.id,
            name: user.name || '',
            email: user.email || '',
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          throw new Error('Credenciais inválidas');
        }
      },
    }),
  ],
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
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};