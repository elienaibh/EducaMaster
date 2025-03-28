import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { Adapter } from 'next-auth/adapters';

export type UserRole = 'ADMIN' | 'USER' | 'INSTRUCTOR';

export interface CustomUser extends Omit<AdapterUser, 'role'> {
  role: UserRole;
}

export interface CustomSession extends Omit<Session, 'user'> {
  user: {
    id: string;
    role: UserRole;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    id: string;
  }
}

declare module 'next-auth' {
  interface User {
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('Usuário não encontrado');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Senha incorreta');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role as UserRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
    verifyRequest: '/verificar-email',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
