import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import bcrypt from 'bcryptjs';
import { LoginCredentials, RegisterData, ResetPasswordData } from '@/app/types/auth';
import { EmailService } from './email.service';
import { generateRandomString } from '@/app/lib/utils';

export class AuthService {
  // Registrar novo usuário
  static async register(data: RegisterData) {
    const { name, email, password } = data;

    // Verificar se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Este email já está em uso');
    }

    // Criar usuário no Firebase
    const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Enviar email de boas-vindas
    await EmailService.sendWelcomeEmail(email, name);

    return user;
  }

  // Login com credenciais
  static async login(credentials: LoginCredentials) {
    const { email, password } = credentials;

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user || !user.password) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isValid = await bcrypt.compare(password, user.password);

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isValid) {
      throw new Error('Credenciais inválidas');
    }

    // Login no Firebase
    await signInWithEmailAndPassword(auth, email, password);

    return user;
  }

  // Solicitar redefinição de senha
  static async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user) {
      throw new Error('Usuário não encontrado');
    }

    // Gerar token
    const token = generateRandomString(32);
    const expires = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Enviar email
    await EmailService.sendPasswordResetEmail(email, token);
  }

  // Redefinir senha
  static async resetPassword(data: ResetPasswordData) {
    const { token, password } = data;

    // Verificar token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())verificationToken || verificationToken.expires < new Date()) {
      throw new Error('Token inválido ou expirado');
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Atualizar senha
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { password: hashedPassword },
    });

    // Remover token usado
    await prisma.verificationToken.delete({
      where: { token },
    });
  }

  // Atualizar perfil
  static async updateProfile(
    userId: string,
    data: {
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
      image?: string;
    }
  ) {
    const updateData: unknown = {};

    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.image) updateData.image = data.image;

    // Se estiver alterando a senha
    if (data.currentPassword && data.newPassword) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user || !user.password) {
        throw new Error('Usuário não encontrado');
      }

      const isValid = await bcrypt.compare(data.currentPassword, user.password);
      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isValid) {
        throw new Error('Senha atual incorreta');
      }

      updateData.password = await bcrypt.hash(data.newPassword, 12);
    }

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  // Excluir conta
  static async deleteAccount(userId: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())user || !user.password) {
      throw new Error('Usuário não encontrado');
    }

    const isValid = await bcrypt.compare(password, user.password);
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isValid) {
      throw new Error('Senha incorreta');
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  }
}