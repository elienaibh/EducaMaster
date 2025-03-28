import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const updateProfileSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .optional(),
    confirmNewPassword: z.string().optional(),
    image: z.string().url('URL inválida').optional(),
  })
  .refine(
    data => {
      if (data.newPassword) {
        return data.currentPassword;
      }
      return true;
    },
    {
      message: 'A senha atual é necessária para alterar a senha',
      path: ['currentPassword'],
    }
  )
  .refine(
    data => {
      if (data.newPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmNewPassword'],
    }
  );
