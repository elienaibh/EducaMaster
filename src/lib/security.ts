import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { getClientIp } from 'request-ip';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const redis = new Redis({
  url: process.env.REDIS_URL ?? '',
  token: process.env.REDIS_TOKEN ?? '',
});

// Rate Limiting
export async function rateLimit(ip: string, limit = 60, window = 60) {
  const key = `rate-limit:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, window);
  }

  if (count > limit) {
    return false;
  }

  return true;
}

// Rate Limiting Middleware
export async function rateLimitMiddleware(req: Request) {
  const ip = getClientIp(req as unknown as { headers: Record<string, string> }) || 'unknown';
  const isAllowed = await rateLimit(ip);

  if (!isAllowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  return null;
}

// Proteção contra ataques de força bruta
export async function bruteForceProtection(
  identifier: string,
  maxAttempts = 5,
  window = 900 // 15 minutos
) {
  const key = `brute-force:${identifier}`;
  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(key, window);
  }

  if (attempts > maxAttempts) {
    return false;
  }

  return true;
}

// Limpar tentativas de login
export async function clearLoginAttempts(identifier: string) {
  const key = `brute-force:${identifier}`;
  await redis.del(key);
}

// Hash de senha
export async function hashPassword(password: string) {
  return hash(password, 12);
}

// Validação de entrada
export function validateInput(input: string, pattern: RegExp): boolean {
  return pattern.test(input);
}

// Padrões de validação comuns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
  phone: /^\+?[1-9]\d{1,14}$/,
};

// Sanitização de entrada
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove tags HTML
    .trim(); // Remove espaços extras
}

// Log de segurança
export async function logSecurityEvent(event: string, details: Record<string, unknown>) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
  };

  // TODO: Implementar sistema de logging real (ex: CloudWatch, Datadog)
  console.log('Security Event:', logEntry);
}

// Proteção contra XSS
export function xssProtection(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Proteção contra CSRF
export async function generateCsrfToken(): Promise<string> {
  const token = crypto.randomUUID();
  await redis.set(`csrf:${token}`, '1', { ex: 3600 }); // Expira em 1 hora
  return token;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  const isValid = await redis.get(`csrf:${token}`);
  if (isValid) {
    await redis.del(`csrf:${token}`);
    return true;
  }
  return false;
}

// Headers de segurança
export const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class Security {
  private static readonly algorithm = 'aes-256-cbc';
  private static readonly key = Buffer.from(process.env.ENCRYPTION_KEY ?? '', 'hex');
  private static readonly iv = Buffer.from(process.env.ENCRYPTION_IV ?? '', 'hex');

  static async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  static generateToken(payload: TokenPayload): string {
    return sign(payload, process.env.JWT_SECRET ?? '', {
      expiresIn: '7d',
    });
  }

  static verifyToken(token: string): TokenPayload {
    return verify(token, process.env.JWT_SECRET ?? '') as TokenPayload;
  }

  static encrypt(text: string): string {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decrypt(encrypted: string): string {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static generateRandomString(length: number): string {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
}
