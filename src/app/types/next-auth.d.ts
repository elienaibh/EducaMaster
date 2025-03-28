import NextAuth from 'next-auth';
import { User as PrismaUser, UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      image: string | null;
      role: UserRole;
    };
  }

  interface User
    extends Omit<PrismaUser, 'emailVerified' | 'password' | 'createdAt' | 'updatedAt'> {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string | null;
    name: string | null;
    role: UserRole;
    accessToken?: string;
  }
}
