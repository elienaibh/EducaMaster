import { logger } from './logger';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente do .env.development
dotenv.config({ path: '.env.development' });

interface ErrorCheck {
  type: 'firebase' | 'auth' | 'database' | 'component' | 'runtime';
  message: string;
  severity: 'high' | 'medium' | 'low';
  fix: () => Promise<void>;
}

const errorChecks: ErrorCheck[] = [
  {
    type: 'firebase',
    message: 'Verificando configuração do Firebase...',
    severity: 'high',
    fix: async () => {
      const requiredEnvVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
      ];

      // Debug: Verificar valores das variáveis
      logger.info('Valores das variáveis do Firebase:', {});
      requiredEnvVars.forEach(envVar => {
        logger.info(`${envVar}:`, { value: process.env[envVar] });
      });

      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
          throw new Error(`Missing required environment variable: ${envVar}`);
        }
      }
    },
  },
  {
    type: 'auth',
    message: 'Verificando configuração do NextAuth...',
    severity: 'high',
    fix: async () => {
      const requiredAuthVars = ['NEXTAUTH_URL', 'NEXTAUTH_SECRET'];

      // Debug: Verificar valores das variáveis
      logger.info('Valores das variáveis do NextAuth:', {});
      requiredAuthVars.forEach(envVar => {
        logger.info(`${envVar}:`, { value: process.env[envVar] });
      });

      for (const envVar of requiredAuthVars) {
        if (!process.env[envVar]) {
          throw new Error(`Missing required auth variable: ${envVar}`);
        }
      }
    },
  },
  {
    type: 'database',
    message: 'Verificando conexão com o banco de dados...',
    severity: 'high',
    fix: async () => {
      // Debug: Verificar valor da variável
      logger.info('Valor da variável DATABASE_URL:', { value: process.env.DATABASE_URL });

      if (!process.env.DATABASE_URL) {
        throw new Error('Missing DATABASE_URL environment variable');
      }
    },
  },
];

export async function checkErrors() {
  const errors: ErrorCheck[] = [];

  for (const check of errorChecks) {
    try {
      await check.fix();
      logger.info(`✅ ${check.message}`);
    } catch (error) {
      errors.push(check);
      logger.error(`❌ ${check.message}`, error as Error);
    }
  }

  return errors;
}
