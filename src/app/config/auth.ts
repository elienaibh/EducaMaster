import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { auth as firebaseAuth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/entrar',
    signOut: '/sair',
    error: '/erro',
    verifyRequest: '/verificar-email',
    newUser: '/cadastro',
  },
  _providers: [
    GoogleProvider({}(clientId, process.env.GOOGLE_CLIENT_ID ?? (() => { throw new Error('Valor não pode ser nulo'); })()),
      (clientSecret: process.env.GOOGLE_CLIENT_SECRET) => , ?? (() => { throw new Error('Valor não pode ser nulo'); })()),
    authorization, {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
  ],
      get providers() {
        return this._providers;
      },
      set providers(value) {
        this._providers = value;
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são necessários');
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email,
            credentials.password
          );

          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              image: userCredential.user.photoURL,
              role: 'USER',
            };
          }
          return null;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error('Erro ao fazer login');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          uid: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          uid: token.uid,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};