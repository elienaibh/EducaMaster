import { User } from '@prisma/client';

export type AuthUser = Omit<User, 'password'> & {
  isAdmin?: boolean;
  isInstructor?: boolean;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  image?: string;
}
