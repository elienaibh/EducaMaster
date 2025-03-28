import { auth } from '@/app/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';

export interface AuthError {
  code: string;
  message: string;
}

export const authService = {
  // Registro com email/senha
  async register(email: string, password: string, name: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      return user;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Login com email/senha
  async loginWithEmail(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await nextAuthSignIn('credentials', {
        email,
        password,
        redirect: false,
      });
      return user;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Login com Google
  async loginWithGoogle() {
    try {
      const result = await nextAuthSignIn('google', {
        redirect: false,
      });
      return result;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Logout
  async logout() {
    try {
      await Promise.all([firebaseSignOut(auth), nextAuthSignOut()]);
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Recuperação de senha
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Atualizar perfil do usuário
  async updateUserProfile(user: User, data: { displayName?: string; photoURL?: string }) {
    try {
      await updateProfile(user, data);
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  },

  // Tratamento de erros
  handleError(error: unknown): AuthError {
    const errorCode = error.code || 'unknown';
    let message = 'Ocorreu um erro inesperado.';

    switch (errorCode) {
      case 'auth/email-already-in-use':
        message = 'Este email já está em uso.';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Operação não permitida.';
        break;
      case 'auth/weak-password':
        message = 'A senha é muito fraca.';
        break;
      case 'auth/user-disabled':
        message = 'Esta conta foi desativada.';
        break;
      case 'auth/user-not-found':
        message = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        message = 'Senha incorreta.';
        break;
      case 'auth/too-many-requests':
        message = 'Muitas tentativas. Tente novamente mais tarde.';
        break;
    }

    return { code: errorCode, message };
  },
};
