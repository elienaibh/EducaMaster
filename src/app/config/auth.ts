import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { auth as firebaseAuth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email,
            credentials.password
          )

          const user = userCredential.user

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            image: user.photoURL
          }
        } catch (error) {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/entrar',
    signOut: '/sair',
    error: '/erro',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    }
  }
} 